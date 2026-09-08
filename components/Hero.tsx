"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="fm-hero relative isolate min-h-[100svh] overflow-hidden bg-ink text-white">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero.png"
        aria-label="Pizza Planet sourdough pizza being prepared"
        className="absolute inset-0 -z-20 size-full object-cover object-center"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(12,10,8,.38)_0%,rgba(12,10,8,.16)_36%,rgba(12,10,8,.42)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-black/10" />

      <div className="mx-auto flex min-h-[100svh] max-w-[1600px] flex-col items-center justify-center px-5 pb-24 pt-28 text-center sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="mb-6 font-mono text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white/90 sm:text-xs"
        >
          WOOD-FIRED · SOURDOUGH SPIRIT · KATHMANDU
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1220px] text-4xl font-hand uppercase text-white [text-shadow:0_2px_22px_rgba(0,0,0,.22)]"
        >
          <span className="block">Sourdough pizza.</span>
          <span className="block">As it should be.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="mt-9 flex flex-col items-center gap-5 sm:mt-11"
        >
          <Link
            href="/locations"
            className="fm-hero-cta inline-flex items-center gap-2 rounded-full bg-tomato px-7 py-3.5 font-sans text-sm font-bold text-white shadow-[0_8px_24px_rgba(198,54,44,.28)] transition duration-300 hover:scale-[1.03] hover:bg-tomato-deep"
          >
            <span aria-hidden="true">●</span>
            Find your local pizzeria
          </Link>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 font-mono text-[0.52rem] font-bold uppercase tracking-[0.18em] text-white/85 sm:text-[0.58rem]">
            <span>Walk-ins welcome</span>
            <span aria-hidden="true">✦</span>
            <span>Bookings available</span>
            <span aria-hidden="true">✦</span>
            <span>Open daily 10am–10pm</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-1/2 h-10 w-[115%] -translate-x-1/2 translate-y-1/2 rounded-[50%] bg-paper sm:h-16" />

      <div className="absolute bottom-10 right-5 flex size-24 rotate-[-12deg] items-center justify-center rounded-full bg-tomato text-center sm:bottom-14 sm:right-10 sm:size-28">
        <span className="font-mono text-[0.5rem] font-bold uppercase leading-[1.2] tracking-[0.18em] text-white sm:text-[0.58rem]">
          Hot out
          <br />of the
          <br />oven ✦
        </span>
      </div>
    </section>
  );
}
