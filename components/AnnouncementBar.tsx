"use client";
import { useEffect, useState } from "react";

const PROMOS = [
  "WOOD-FIRED DAILY · OPEN 10AM–10PM",
  "STUDENT WEDNESDAYS · PAN PIZZA Rs 350",
  "FREE DELIVERY OVER RS 1,500",
  "JUG LEMONADE Rs 540 — SHARE THE PLANET",
];

export default function AnnouncementBar() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % PROMOS.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-ink text-paper overflow-hidden">
      <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-center px-4">
        <p
          key={i}
          className="font-mono text-[0.6rem] tracking-[0.25em] animate-[slide-up_0.5s_ease-out]"
        >
          {PROMOS[i]}
        </p>
      </div>
    </div>
  );
}
