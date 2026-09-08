"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AddToCartModal from "./AddToCartModal";
import {
  ApiMenuItem,
  ApiCategory,
  fetchMenuItems,
  fetchCategories,
  rs,
} from "@/lib/api";

// ─────────────────────────────────────────────────────────────
// THE MENU BOARD — heritage pizzeria price-list style.
// Live data from the backend; falls back to bundled data offline.
// ─────────────────────────────────────────────────────────────

const priceRange = (item: ApiMenuItem) => {
  if (item.variants.length > 1) {
    const prices = item.variants.map((v) => v.price);
    return `${rs(Math.min(...prices))} – ${rs(Math.max(...prices))}`;
  }
  return rs(item.basePrice);
};

function VegMark({ isVeg }: { isVeg: boolean }) {
  return <span className={`veg-dot ${isVeg ? "" : "veg-dot--nonveg"}`} />;
}

function BoardRow({ item, onSelect }: { item: ApiMenuItem; onSelect: () => void }) {
  const soldOut = item.isAvailable === false || item.canMake === false;

  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.35 }}
      onClick={onSelect}
      disabled={soldOut}
      style={{
        display: "flex",
        width: "100%",
        alignItems: "flex-start",
        gap: "1rem",
        padding: "1.1rem 0.4rem",
        background: "none",
        border: "none",
        borderBottom: "1px solid var(--rule)",
        textAlign: "left",
        cursor: soldOut ? "not-allowed" : "pointer",
        opacity: soldOut ? 0.55 : 1,
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(198,54,44,0.035)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
    >
      {/* name + description + leader */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem" }}>
          <VegMark isVeg={item.isVeg} />
          <span
            className="serif"
            style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.3rem)",
              fontWeight: 600,
              color: "var(--ink)",
              letterSpacing: "-0.01em",
            }}
          >
            {item.name}
          </span>
          {item.isBestseller && <span className="stamp" style={{ fontSize: "0.45rem", padding: "1px 6px" }}>★ BEST</span>}
          <span className="leader" />
        </div>
        {item.description && (
          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: "0.78rem",
              color: "var(--ink-soft)",
              lineHeight: 1.5,
              margin: "0.25rem 0 0",
              maxWidth: "52ch",
            }}
          >
            {item.description}
          </p>
        )}
        {soldOut && (
          <span className="stamp" style={{ fontSize: "0.45rem", padding: "1px 6px", marginTop: "0.35rem" }}>
            SOLD OUT
          </span>
        )}
      </div>

      {/* price */}
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div
          className="serif"
          style={{
            fontSize: "clamp(1rem, 1.6vw, 1.25rem)",
            fontWeight: 600,
            color: "var(--tomato)",
            whiteSpace: "nowrap",
          }}
        >
          {priceRange(item)}
        </div>
        {item.variants.length > 1 && (
          <div className="eyebrow" style={{ fontSize: "0.48rem", marginTop: "2px" }}>
            {item.variants.map((v) => v.name.split(" ")[0]).join(" · ")}
          </div>
        )}
      </div>
    </motion.button>
  );
}

export default function Menu() {
  const [items, setItems] = useState<ApiMenuItem[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [activeCat, setActiveCat] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState<ApiMenuItem | null>(null);

  useEffect(() => {
    let live = true;
    Promise.all([fetchMenuItems(), fetchCategories()]).then(([items, cats]) => {
      if (!live) return;
      setItems(items);
      setCategories(cats);
      setLoading(false);
    });
    return () => {
      live = false;
    };
  }, []);

  const visible = useMemo(
    () => (activeCat === "all" ? items : items.filter((i) => i.category.slug === activeCat)),
    [items, activeCat],
  );

  const bestsellers = useMemo(
    () => items.filter((i) => i.isBestseller).slice(0, 6),
    [items],
  );

  return (
    <section
      id="menu"
      style={{
        background: "var(--paper)",
        borderTop: "3px double var(--ink)",
        padding: "clamp(4rem, 10vw, 8rem) clamp(1rem, 5vw, 5rem)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header — editorial */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          <div className="eyebrow" style={{ marginBottom: "0.75rem" }}>
            ~ Kitchen Open Daily · 10 AM – 10 PM ~
          </div>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(2.6rem, 8vw, 5.5rem)",
              fontWeight: 500,
              lineHeight: 1,
              color: "var(--ink)",
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            The <em style={{ color: "var(--tomato)" }}>Menu</em>
          </h2>
          <div
            style={{
              width: "64px",
              height: "3px",
              background: "var(--tomato)",
              margin: "1.2rem auto 0",
            }}
          />
        </motion.div>

        {/* BESTSELLER STRIP */}
        {!loading && bestsellers.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            <div className="eyebrow" style={{ textAlign: "center", marginBottom: "1.25rem" }}>
              ✦ What Kathmandu Keeps Ordering ✦
            </div>
            <div
              className="no-scrollbar"
              style={{
                display: "flex",
                gap: "1rem",
                overflowX: "auto",
                paddingBottom: "0.5rem",
                justifyContent: "center",
              }}
            >
              {bestsellers.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setModalItem(item)}
                  className="board-card"
                  style={{
                    flexShrink: 0,
                    width: "200px",
                    padding: "0",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "box-shadow 0.2s",
                  }}
                >
                  <div style={{ position: "relative", width: "100%", aspectRatio: "5/4" }}>
                    {item.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    )}
                  </div>
                  <div style={{ padding: "0.7rem 0.9rem 0.9rem" }}>
                    <div
                      className="serif"
                      style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--ink)" }}
                    >
                      {item.name}
                    </div>
                    <div
                      className="serif"
                      style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--tomato)", marginTop: "2px" }}
                    >
                      {priceRange(item)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* CATEGORY TABS — heritage type rules */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.25rem 1.4rem",
            marginBottom: "clamp(2rem, 4vw, 3rem)",
            borderBottom: "1px solid var(--rule)",
            paddingBottom: "1rem",
          }}
        >
          {[{ id: "all", name: "All", slug: "all" }, ...categories].map((cat) => {
            const active = activeCat === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.slug)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.3rem 0",
                  fontFamily: '"Space Mono", monospace',
                  fontSize: "0.68rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: active ? "var(--tomato)" : "var(--ink-faint)",
                  borderBottom: active ? "2px solid var(--tomato)" : "2px solid transparent",
                  transition: "all 0.2s",
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* BOARD */}
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          {loading ? (
            <div className="eyebrow" style={{ textAlign: "center", padding: "3rem 0" }}>
              Warming up the oven…
            </div>
          ) : visible.length === 0 ? (
            <div className="eyebrow" style={{ textAlign: "center", padding: "3rem 0" }}>
              Nothing on this board yet.
            </div>
          ) : (
            visible.map((item) => (
              <BoardRow key={item.id} item={item} onSelect={() => setModalItem(item)} />
            ))
          )}
        </div>

        {/* Footer note */}
        <div style={{ textAlign: "center", marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: "0.85rem",
              color: "var(--ink-soft)",
              marginBottom: "1.5rem",
            }}
          >
            Prices inclusive of kitchen love. <span style={{ color: "var(--basil)" }}>●</span> veg,{" "}
            <span style={{ color: "var(--tomato)" }}>●</span> non-veg.
          </p>
          <Link
            href="/order"
            className="serif"
            style={{
              display: "inline-block",
              background: "var(--ink)",
              color: "var(--paper)",
              padding: "1rem 2.6rem",
              fontSize: "1.05rem",
              fontWeight: 600,
              textDecoration: "none",
              border: "2px solid var(--ink)",
              boxShadow: "5px 5px 0 var(--tomato)",
              transition: "all 0.2s",
            }}
          >
            Build your slice →
          </Link>
        </div>
      </div>

      {modalItem && <AddToCartModal item={modalItem} onClose={() => setModalItem(null)} />}
    </section>
  );
}
