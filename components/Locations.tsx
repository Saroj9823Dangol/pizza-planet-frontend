"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ApiBranch } from "@/lib/api-server";
import { mockBranches } from "@/lib/locations-fallback";

export default function Locations({ branches }: { branches?: ApiBranch[] }) {
  const locs = branches && branches.length ? branches : mockBranches;

  return (
    <section className="border-t-[3px] border-ink bg-paper">
      <div className="mx-auto max-w-[1440px] px-4 py-16 lg:px-10 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-[0.6rem] tracking-[0.35em] text-tomato">
            ~ FIND A PIZZERIA NEAR YOU. THEN EAT YOUR CRUSTS. ~
          </p>
          <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(2.2rem,5.5vw,4.5rem)] uppercase leading-[0.95] text-ink">
            Bringing Napoli eating culture{" "}
            <em className="font-serif font-light normal-case italic text-tomato">
              closer to you.
            </em>
          </h2>
        </motion.div>

        <div className="mt-12 border-t border-rule">
          {locs.map((loc, i) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                href={`/locations/${loc.slug}`}
                className="group grid grid-cols-[1fr_auto] items-center gap-4 border-b border-rule py-8 transition hover:bg-cream lg:grid-cols-[auto_1fr_auto_auto] lg:gap-10"
              >
                <span className="hidden font-serif text-2xl font-light text-ink-faint/60 lg:block lg:text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl uppercase tracking-tight text-ink transition group-hover:text-tomato lg:text-4xl">
                    {loc.name}
                  </h3>
                  <p className="mt-1 font-mono text-[0.58rem] tracking-[0.2em] text-ink-faint">
                    {(loc.tagline ?? "").toUpperCase()}
                  </p>
                </div>
                <span className="hidden font-mono text-[0.6rem] tracking-[0.15em] text-ink-soft lg:block">
                  {loc.hours ?? "10:00 – 22:00"}
                </span>
                <span className="font-mono text-[0.62rem] tracking-[0.2em] text-tomato transition group-hover:translate-x-2">
                  VIEW →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/book"
            className="rounded-full bg-ink px-9 py-4 font-mono text-[0.7rem] font-bold tracking-[0.2em] text-paper transition hover:bg-tomato"
          >
            BOOK A TABLE →
          </Link>
        </div>
      </div>
    </section>
  );
}