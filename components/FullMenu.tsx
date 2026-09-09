"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import AddToCartModal from "./AddToCartModal";
import { ApiCategory, ApiMenuItem, fetchCategories, fetchMenuItems, fetchMenuPage, rs } from "@/lib/api";

const SKELETON_CARDS = 6;

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=88",
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1200&q=88",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=88",
  "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1200&q=88",
  "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=1200&q=88",
  "https://images.unsplash.com/photo-1593560708920-61dd98c8c8c8?w=1200&q=88",
];

const CATEGORY_INTROS: Record<string, { title: string; body: string }> = {
  "pre-pizza": {
    title: "Aperitivo, the Kathmandu way.",
    body: "Start your meal with something refreshing and something tasty to pick at. Perfect for sharing — or not.",
  },
  bites: {
    title: "Small plates, big attitude.",
    body: "Bold flavours, warm plates, and just enough to get things started.",
  },
  pizza: {
    title: "All rise — sourdough in session.",
    body: "Freshly made pizzas with honest ingredients. Our pizzaioli are waiting.",
  },
  salads: {
    title: "Only overdress on Sundays.",
    body: "Fresh salads with understated, rich flavour. Consume liberally.",
  },
  drinks: {
    title: "Never count years or glasses.",
    body: "Cold drinks, Italian-inspired cocktails, coffee, and something good for every table.",
  },
  desserts: {
    title: "Dolce makes you live longer.",
    body: "A sweet finish with a Pizza Planet touch. Do not be bitter — have dessert.",
  },
};

function priceRange(item: ApiMenuItem) {
  const prices = item.variants.map((variant) => variant.price);
  return prices.length > 1
    ? `${rs(Math.min(...prices))} – ${rs(Math.max(...prices))}`
    : rs(item.basePrice);
}

function itemImage(item: ApiMenuItem, index: number) {
  return item.image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

function groupByCategory(items: ApiMenuItem[]): Record<string, ApiMenuItem[]> {
  const grouped: Record<string, ApiMenuItem[]> = {};
  for (const item of items) {
    const slug = item.category?.slug ?? "other";
    (grouped[slug] ??= []).push(item);
  }
  return grouped;
}

export default function FullMenu({
  initialItems,
  initialCategories,
}: {
  /** Server-fetched first slice (async server component) — keeps SSR + SEO. */
  initialItems?: ApiMenuItem[];
  initialCategories?: ApiCategory[];
}) {
  const [categories, setCategories] = useState<ApiCategory[]>(initialCategories ?? []);
  const [byCategory, setByCategory] = useState<Record<string, ApiMenuItem[]>>(() =>
    groupByCategory(initialItems ?? []),
  );
  const [empty, setEmpty] = useState<Set<string>>(() => new Set());
  const [loading, setLoading] = useState(!initialItems || !initialCategories);
  const [modalItem, setModalItem] = useState<ApiMenuItem | null>(null);

  // Client-side cache of sections that have been requested — prevents
  // duplicate fetches when the observer re-fires or re-renders happen.
  const loadedRef = useRef<Set<string>>(new Set(Object.keys(byCategory)));
  const pendingRef = useRef<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Only used when the server didn't provide data (API outage). Otherwise the
  // first slice is already server-rendered and nothing extra is fetched.
  useEffect(() => {
    if (initialItems && initialCategories) return;
    let live = true;
    Promise.all([fetchCategories(), fetchMenuPage(1, 300)]).then(
      ([nextCategories, firstPage]) => {
        if (!live) return;
        setCategories(nextCategories);
        setByCategory(groupByCategory(firstPage.items));
        loadedRef.current = new Set(
          Object.keys(groupByCategory(firstPage.items)),
        );
        setLoading(false);
      },
    );
    return () => {
      live = false;
    };
  }, [initialItems, initialCategories]);

  /** Fetches one category's items exactly once (cached client-side). */
  const loadCategory = useCallback(async (slug: string) => {
    if (loadedRef.current.has(slug) || pendingRef.current.has(slug)) return;
    pendingRef.current.add(slug);
    try {
      // The endpoint returns every item of the category (a category tops out
      // at ~24 items, well under the 100 limit the client helper sends).
      const items = await fetchMenuItems({ category: slug });
      if (!items.length) {
        setEmpty((prev) => new Set(prev).add(slug));
      } else {
        setByCategory((prev) => ({ ...prev, [slug]: items }));
      }
      loadedRef.current.add(slug);
    } finally {
      pendingRef.current.delete(slug);
    }
  }, []);

  /**
   * Resolves every unloaded section in parallel. Used when the visitor clicks a
   * category pill: the page height must be final BEFORE we smooth-scroll, or
   * mid-flight section loads shift the target and the jump lands short.
   */
  const preloadAll = useCallback(async () => {
    const missing = categories.filter(
      (category) =>
        !loadedRef.current.has(category.slug) &&
        !pendingRef.current.has(category.slug),
    );
    if (!missing.length) return;
    await Promise.all(missing.map((category) => loadCategory(category.slug)));
  }, [categories, loadCategory]);

  /** Pill click: resolve the layout, then glide to the section heading. */
  const handlePillClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
      event.preventDefault();
      const target = document.getElementById(`menu-${slug}`);
      if (!target) return;
      preloadAll().then(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    [preloadAll],
  );

  // One observer watches every unloaded section. Sections are prefetched when
  // they come within 500px of the viewport, so the items are ready by the time
  // the visitor actually scrolls there — no waiting, no layout shift.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const slug = (entry.target as HTMLElement).dataset.slug;
          if (slug) loadCategory(slug);
        }
      },
      { rootMargin: "500px 0px" },
    );
    for (const category of categories) {
      const el = sectionRefs.current[category.slug];
      if (el && !loadedRef.current.has(category.slug)) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [categories, byCategory, loadCategory]);

  return (
    <section className="fm-menu-page fm-menu-page--reference">
      <header className="fm-menu-intro-spread">
        <div className="fm-menu-intro-copy">
          <p className="fm-kicker">Pizza Planet · Handmade every day</p>
          <h1>Whatever the question.<br />The answer is pizza.</h1>
          <p>
            Like what&apos;s the best use of handmade, slow-rising sourdough? Or what makes a good pizza worth coming back for? Fresh dough, honest toppings, and a hot oven have a lot to say.
          </p>
          <p>
            Our menu changes with the seasons while keeping the things that matter: generous food, small bills, and room at the table for one more.
          </p>
          <a href="/order" className="fm-red-button">Order &amp; collect</a>
        </div>
        <div className="fm-menu-intro-image fm-organic-b">
          <img src={FALLBACK_IMAGES[0]} alt="Fresh Pizza Planet sourdough pizza" />
          <span className="fm-menu-doodle-arrow" aria-hidden="true">↙</span>
          <p>Find our specials on the blackboard of your local pizzeria.</p>
        </div>
      </header>

      <nav className="fm-menu-explore" aria-label="Explore menu categories">
        {categories.map((category) => (
          <a
            key={category.id}
            href={`#menu-${category.slug}`}
            className="fm-explore-pill"
            onClick={(event) => handlePillClick(event, category.slug)}
          >
            {category.name}
          </a>
        ))}
      </nav>

      {loading ? (
        <p className="fm-menu-loading">Warming up the oven…</p>
      ) : (
        <div className="fm-reference-categories">
          {categories.map((category, categoryIndex) => {
            const items = byCategory[category.slug];
            const isPending = !items && !empty.has(category.slug);
            if (empty.has(category.slug)) return null;
            const intro = CATEGORY_INTROS[category.slug] ?? {
              title: `${category.name}, made properly.`,
              body: "Fresh from the Pizza Planet kitchen and ready for the table.",
            };
            const featured = items?.[0];
            return (
              <section
                id={`menu-${category.slug}`}
                data-slug={category.slug}
                ref={(el) => {
                  sectionRefs.current[category.slug] = el;
                }}
                className="fm-reference-category fm-wave-section fm-wave-section--paper"
                key={category.id}
              >
                <header className="fm-reference-category-heading">
                  <h2>{category.name}<span>+</span></h2>
                </header>

                <div className="fm-reference-category-intro">
                  <div className="fm-reference-category-copy">
                    <h3>{intro.title}</h3>
                    <p>{intro.body}</p>
                    <p className="fm-reference-note">Vegan and vegetarian options available, naturally.</p>
                  </div>
                  <div className={`fm-reference-feature fm-organic-${String.fromCharCode(97 + (categoryIndex % 3))}`}>
                    {featured ? (
                      <img src={itemImage(featured, categoryIndex)} alt={featured.name} />
                    ) : (
                      <div className="fm-menu-skeleton-img" />
                    )}
                  </div>
                </div>

                {items ? (
                  <div className="fm-reference-item-grid">
                    {items.map((item, itemIndex) => {
                      const soldOut = item.isAvailable === false || item.canMake === false;
                      return (
                        <motion.button
                          key={item.id}
                          type="button"
                          disabled={soldOut}
                          onClick={() => setModalItem(item)}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.35, delay: (itemIndex % 3) * 0.06 }}
                          className={`fm-reference-item ${soldOut ? "fm-reference-item--sold" : ""}`}
                        >
                          <span className={`fm-reference-item-image fm-organic-${String.fromCharCode(97 + (itemIndex % 3))}`}>
                            <img src={itemImage(item, itemIndex + categoryIndex)} alt={item.name} />
                          </span>
                          <span className="fm-reference-item-copy">
                            {item.isBestseller && <small>Favourite</small>}
                            <strong>{item.name}</strong>
                            <span>{item.description || "Made fresh to order."}</span>
                            <em>{soldOut ? "Sold out" : priceRange(item)}</em>
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="fm-menu-skeleton-grid" aria-label={`Loading ${category.name} menu…`} role="status">
                    {Array.from({ length: SKELETON_CARDS }).map((_, index) => (
                      <div className="fm-menu-skeleton-card" key={index}>
                        <span className="fm-menu-skeleton-img" />
                        <span className="fm-menu-skeleton-line" />
                      </div>
                    ))}
                    <p className="fm-menu-skeleton-loading">Fetching {category.name}…</p>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}

      <p className="fm-menu-footer-note">Gluten-free and vegan options available, naturally. Eat your crusts.</p>
      {modalItem && <AddToCartModal item={modalItem} onClose={() => setModalItem(null)} />}
    </section>
  );
}