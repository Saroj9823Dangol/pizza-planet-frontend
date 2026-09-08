"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import AddToCartModal from "./AddToCartModal";
import { ApiCategory, ApiMenuItem, fetchCategories, fetchMenuItems, rs } from "@/lib/api";

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

export default function FullMenu({
  initialItems,
  initialCategories,
}: {
  /** Server-fetched data (async server component) — skips the client fetch. */
  initialItems?: ApiMenuItem[];
  initialCategories?: ApiCategory[];
}) {
  const [items, setItems] = useState<ApiMenuItem[]>(initialItems ?? []);
  const [categories, setCategories] = useState<ApiCategory[]>(initialCategories ?? []);
  const [loading, setLoading] = useState(!initialItems || !initialCategories);
  const [modalItem, setModalItem] = useState<ApiMenuItem | null>(null);

  useEffect(() => {
    if (initialItems && initialCategories) return; // already server-rendered
    let live = true;
    Promise.all([fetchMenuItems(), fetchCategories()]).then(([nextItems, nextCategories]) => {
      if (!live) return;
      setItems(nextItems);
      setCategories(nextCategories);
      setLoading(false);
    });
    return () => {
      live = false;
    };
  }, [initialItems, initialCategories]);

  const grouped = useMemo(() => {
    return categories
      .map((category) => ({
        category,
        items: items.filter((item) => item.category.slug === category.slug),
      }))
      .filter(({ items: categoryItems }) => categoryItems.length > 0);
  }, [categories, items]);

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
        <span className="fm-explore-label">Explore <b aria-hidden="true">↘</b></span>
        {categories.map((category) => (
          <a key={category.id} href={`#menu-${category.slug}`} className="fm-explore-pill">
            {category.name}
          </a>
        ))}
      </nav>

      {loading ? (
        <p className="fm-menu-loading">Warming up the oven…</p>
      ) : (
        <div className="fm-reference-categories">
          {grouped.map(({ category, items: categoryItems }, categoryIndex) => {
            const intro = CATEGORY_INTROS[category.slug] ?? {
              title: `${category.name}, made properly.`,
              body: "Fresh from the Pizza Planet kitchen and ready for the table.",
            };
            const featured = categoryItems[0];
            return (
              <section id={`menu-${category.slug}`} className="fm-reference-category fm-wave-section fm-wave-section--paper" key={category.id}>
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
                    <img src={itemImage(featured, categoryIndex)} alt={featured.name} />
                  </div>
                </div>

                <div className="fm-reference-item-grid">
                  {categoryItems.map((item, itemIndex) => {
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
