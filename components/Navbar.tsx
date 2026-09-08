"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "@/lib/store";
import Link from "next/link";
import { usePathname } from "next/navigation";

const allLinks = [
  { label: "Pizzerias", href: "/locations" },
  { label: "Menu", href: "/menu" },
  { label: "Our story", href: "/about" },
  { label: "Journal", href: "/journal" },
];

type NavbarProps = { overlay?: boolean };

export default function Navbar({ overlay = false }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCartStore((state) => state.itemCount());
  const toggleCart = useCartStore((state) => state.toggleCart);
  const pathname = usePathname();
  const shell = overlay
    ? "absolute inset-x-0 top-0 z-[1000] border-b border-white/20 text-white"
    : "relative z-[1000] border-b border-ink/15 bg-paper text-ink";
  const muted = overlay ? "text-white/90" : "text-ink-soft";

  return (
    <>
      <header className={shell}>
        <nav className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between gap-5 px-5 sm:px-8 lg:h-[88px] lg:px-12">
          <button className={`order-2 flex flex-col gap-[5px] p-2 lg:hidden ${overlay ? "text-white" : "text-ink"}`} onClick={() => setMobileOpen((open) => !open)} aria-label="Toggle menu">
            <span className={`h-[2px] w-6 bg-current transition ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-[2px] w-6 bg-current transition ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`h-[2px] w-6 bg-current transition ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>

          <Link href="/" className="order-1 shrink-0" aria-label="Pizza Planet home">
            <Image src="/logo/logo.jpg" alt="Pizza Planet" width={58} height={58} className={`fm-logo ${overlay ? "fm-logo--overlay" : ""}`} priority />
          </Link>

          <div className="order-2 hidden items-center gap-6 lg:flex xl:gap-8">
            {allLinks.map(({ label, href }) => <Link key={href} href={href} className={`font-sans text-[0.78rem] font-bold transition hover:opacity-70 ${pathname === href ? "underline underline-offset-8" : muted}`}>{label}</Link>)}
          </div>

          <div className="order-3 flex items-center gap-2 sm:gap-3">
            <button onClick={toggleCart} className={`relative flex size-10 items-center justify-center rounded-full border transition ${overlay ? "border-white text-white hover:bg-white hover:text-ink" : "border-ink text-ink hover:bg-ink hover:text-paper"}`} aria-label="Open cart">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
              {itemCount > 0 && <span className="absolute -right-1.5 -top-1.5 flex size-[18px] items-center justify-center rounded-full bg-tomato font-mono text-[0.55rem] font-bold text-white">{itemCount}</span>}
            </button>
            <Link href="/book" className="hidden rounded-full bg-tomato !block !px-6 !py-3 font-sans text-[0.78rem] font-bold text-white transition hover:bg-tomato-deep sm:inline-block">Book a table</Link>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 top-[76px] z-[999] bg-paper lg:hidden"><div className="flex flex-col gap-6 p-8">{allLinks.map(({ label, href }) => <Link key={href} href={href} onClick={() => setMobileOpen(false)} className="font-hand text-4xl uppercase leading-none text-ink transition hover:text-tomato">{label}</Link>)}<Link href="/book" onClick={() => setMobileOpen(false)} className="mt-4 rounded-full bg-tomato px-8 py-4 text-center font-sans text-sm font-bold text-white">Book a table</Link></div></motion.div>}
      </AnimatePresence>
    </>
  );
}
