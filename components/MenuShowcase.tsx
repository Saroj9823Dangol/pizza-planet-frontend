"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AddToCartModal from "./AddToCartModal";
import { ApiMenuItem, rs } from "@/lib/api";

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

        <ul className="divide-y divide-rule border-y border-rule">
          {items.map((item, i) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <button
                type="button"
                onClick={() => setModalItem(item)}
                className="group flex w-full items-start gap-5 py-7 text-left transition hover:bg-cream"
              >
                <span className="mt-1 font-serif text-2xl font-light text-ink-faint/70 transition group-hover:text-tomato">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-serif text-xl font-semibold text-ink lg:text-2xl">
                      {item.name}
                    </span>
                    {item.isVeg && (
                      <span className="inline-block size-2.5 rounded-full bg-basil" />
                    )}
                  </span>
                  {item.description && (
                    <span className="mt-1 block max-w-[46ch] font-sans text-[0.82rem] leading-relaxed text-ink-soft">
                      {item.description}
                    </span>
                  )}
                </span>
                <span className="shrink-0 text-right">
                  <span className="block font-mono text-sm font-bold text-tomato">
                    {rs(item.basePrice)}
                    {item.variants.length > 1 && (
                      <span className="block text-[0.55rem] font-normal text-ink-faint">
                        {item.variants.length} SIZES
                      </span>
                    )}
                  </span>
                  <span className="mt-2 inline-flex size-8 items-center justify-center rounded-full border-[1.5px] border-ink font-sans text-base leading-none text-ink transition group-hover:bg-tomato group-hover:text-white">
                    +
                  </span>
                </span>
              </button>
            </motion.li>
          ))}
        </ul>

        <p className="mt-6 font-mono text-[0.55rem] tracking-[0.18em] text-ink-faint">
          ✦ PRICES INCLUSIVE OF KITCHEN LOVE · LIVE FROM THE PASS
        </p>
      </div>

      {modalItem && <AddToCartModal item={modalItem} onClose={() => setModalItem(null)} />}
    </section>
  );
}