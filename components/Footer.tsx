"use client";
import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [signedUp, setSignedUp] = useState(false);

  return (
    <footer className="bg-ink text-paper">
      {/* Newsletter band */}
      <div className="border-b border-paper/15">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-16 lg:grid-cols-2 lg:px-10 lg:py-20">
          <div>
            <p className="font-mono text-[0.6rem] tracking-[0.35em] text-mustard">
              ~ FRIENDS OF PIZZA PLANET ~
            </p>
            <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2rem,4.5vw,3.6rem)] uppercase leading-[0.95]">
              Occasional slices of news.{" "}
              <em className="font-serif font-light normal-case italic text-tomato">
                No spam, just sourdough goodness.
              </em>
            </h2>
          </div>
          <div className="flex flex-col justify-center">
            {signedUp ? (
              <p className="font-serif text-2xl italic text-mustard">
                You&apos;re on the list. See you at the oven. ✦
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.includes("@")) setSignedUp(true);
                }}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="YOUR@EMAIL.COM"
                  className="w-full border-b-2 border-paper/40 bg-transparent py-4 font-mono text-sm tracking-[0.1em] text-paper outline-none transition placeholder:text-paper/30 focus:border-tomato"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-tomato px-8 py-4 font-mono text-[0.65rem] font-bold tracking-[0.2em] text-white transition hover:bg-paper hover:text-ink"
                >
                  SIGN UP
                </button>
              </form>
            )}
            <p className="mt-4 font-mono text-[0.5rem] tracking-[0.2em] text-paper/40">
              BIRTHDAY PERKS · SEASONAL MENUS · FIRST DIBS ON SPECIALS
            </p>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-14 sm:grid-cols-3 lg:px-10">
        <div>
          <h3 className="font-mono text-[0.6rem] tracking-[0.3em] text-paper/50">EAT</h3>
          <ul className="mt-5 flex flex-col gap-3">
            {[
              { label: "The Menu", href: "/menu" },
              { label: "Build Your Slice", href: "/order" },
              { label: "Book a Table", href: "/book" },
            ].map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="font-serif text-lg text-paper transition hover:text-tomato">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-mono text-[0.6rem] tracking-[0.3em] text-paper/50">EXPLORE</h3>
          <ul className="mt-5 flex flex-col gap-3">
            {[
              { label: "Our Story", href: "/about" },
              { label: "The Journal", href: "/about" },
              { label: "Work With Us", href: "/about" },
            ].map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="font-serif text-lg text-paper transition hover:text-tomato">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-mono text-[0.6rem] tracking-[0.3em] text-paper/50">FOLLOW</h3>
          <ul className="mt-5 flex flex-col gap-3">
            {["Instagram", "Facebook", "TikTok"].map((label) => (
              <li key={label}>
                <a href="#" className="font-serif text-lg text-paper transition hover:text-tomato">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="overflow-hidden border-t border-paper/15">
        <p className="mx-auto max-w-[1440px] select-none px-4 pt-10 font-display text-[clamp(3rem,11vw,10rem)] uppercase leading-[0.85] tracking-tight text-paper/10 lg:px-10">
          Pizza Planet
        </p>
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-4 py-6 font-mono text-[0.55rem] tracking-[0.2em] text-paper/40 lg:px-10">
          <span>© {new Date().getFullYear()} PIZZA PLANET · KATHMANDU, NEPAL</span>
          <span className="flex items-center gap-4">
            <Link href="/admin/login" className="transition hover:text-tomato">
              STAFF LOGIN
            </Link>
            <span className="text-mustard">SERVING THE GALAXY SINCE 2022 ✦</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
