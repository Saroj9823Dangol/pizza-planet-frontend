"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AddToCartModal from "./AddToCartModal";
import { ApiMenuItem, rs } from "@/lib/api";

function priceOf(item: ApiMenuItem): string {
  if (item.variants.length > 1) {
    const prices = item.variants.map((v) => v.price);
    return `From ${rs(Math.min(...prices))}`;
  }
  return rs(item.basePrice);
}

export default function MenuShowcase({
  kicker,
  title,
  items,
  tone = "paper",
}: {
  kicker: string;
  title: string;
  items: ApiMenuItem[];
  tone?: "paper" | "paper-deep";
}) {
  const [modalItem, setModalItem] = useState<ApiMenuItem | null>(null);

  if (items.length === 0) return null;

  return (
    <section className={tone === "paper-deep" ? "bg-paper-deep" : "bg-paper"}>
      <div className="mx-auto max-w-[1440px] px-4 py-16 lg:px-10 lg:py-24">
        <div className="fm-section-heading fm-section-heading--journal">
          <div>
            <p className="fm-kicker">{kicker}</p>
            <h2 className="fm-hand-title">
              {title}
              <span className="fm-red-dash">—</span>
            </h2>
          </div>
          <Link href="/menu" className="fm-outline-button">
            Full menu
          </Link>
        </div>

        <div className="fm-showcase-grid">
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setModalItem(item)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              className="fm-showcase-card"
            >
              <span className={`fm-showcase-image fm-organic-${String.fromCharCode(97 + (i % 3))}`}>
                {item.image ? <img src={item.image} alt={item.name} /> : null}
                {item.isBestseller && <small className="fm-showcase-badge">Favourite</small>}
              </span>
              <span className="fm-showcase-body">
                <span className="fm-showcase-name">
                  {item.name}
                  {item.isVeg && <span className="fm-veg-dot" aria-label="Veg" />}
                </span>
                <span className="fm-showcase-desc">{item.description || "Made fresh to order."}</span>
                <span className="fm-showcase-foot">
                  <strong className="fm-showcase-price">{priceOf(item)}</strong>
                  <span className="fm-showcase-add" aria-hidden="true">+</span>
                </span>
              </span>
            </motion.button>
          ))}
        </div>

        <p className="mt-6 font-mono text-[0.55rem] tracking-[0.18em] text-ink-faint">
          ✦ PRICES INCLUSIVE OF KITCHEN LOVE · LIVE FROM THE PASS
        </p>
      </div>

      {modalItem && <AddToCartModal item={modalItem} onClose={() => setModalItem(null)} />}
    </section>
  );
}