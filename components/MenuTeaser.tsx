"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AddToCartModal from "./AddToCartModal";
import { ApiMenuItem, fetchMenuItems, rs } from "@/lib/api";

export default function MenuTeaser() {
  const [items, setItems] = useState<ApiMenuItem[]>([]);
  const [modalItem, setModalItem] = useState<ApiMenuItem | null>(null);

  useEffect(() => {
    let live = true;
    fetchMenuItems({ bestseller: true }).then((data) => {
      if (live) setItems(data.slice(0, 4));
    });
    return () => {
      live = false;
    };
  }, []);

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1440px] px-4 py-16 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          {/* Left: statement */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-mono text-[0.6rem] tracking-[0.35em] text-tomato">
              NO CORNERS CUT. JUST CRUSTS.
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4.2rem)] uppercase leading-[0.95] text-ink">
              Straight from a Napoli trattoria —{" "}
              <em className="font-serif font-light normal-case italic text-tomato">
                via Kathmandu.
              </em>
            </h2>
            <p className="mt-6 max-w-[44ch] font-sans text-[0.95rem] leading-relaxed text-ink-soft">
              Radically simple, affordable pies made from honest ingredients
              and fresh handmade dough. If you know bresaola from burrata and
              like large pizzas followed by small bills — you&apos;ve found
              your place.
            </p>
            <Link
              href="/menu"
              className="mt-8 inline-block rounded-full bg-ink px-9 py-4 font-mono text-[0.7rem] font-bold tracking-[0.2em] text-paper transition hover:bg-tomato"
            >
              VIEW THE FULL MENU →
            </Link>
          </div>

          {/* Right: numbered live dishes */}
          <div>
            {items.length === 0 ? (
              <p className="font-mono text-xs tracking-[0.2em] text-ink-faint">
                WARMING UP THE OVEN…
              </p>
            ) : (
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
            )}
            <p className="mt-6 font-mono text-[0.55rem] tracking-[0.18em] text-ink-faint">
              ✦ PRICES INCLUSIVE OF KITCHEN LOVE · LIVE FROM THE PASS
            </p>
          </div>
        </div>
      </div>

      {modalItem && <AddToCartModal item={modalItem} onClose={() => setModalItem(null)} />}
    </section>
  );
}
