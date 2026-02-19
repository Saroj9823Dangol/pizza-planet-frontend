"use client";
import { motion } from "framer-motion";
import { todaysSpecials } from "@/lib/data";

export default function TodaysSpecial() {
  const repeated = [
    ...todaysSpecials,
    ...todaysSpecials,
    ...todaysSpecials,
    ...todaysSpecials,
  ];

  return (
    <section
      style={{
        background: "#000",
        padding: "clamp(3rem, 6vw, 5rem) 0",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Section heading */}
      <div
        style={{
          padding: "0 clamp(1rem, 5vw, 5rem)",
          marginBottom: "clamp(2rem, 4vw, 3rem)",
        }}
      >
        <div
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "0.4rem",
          }}
        >
          TODAY&apos;S
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "Righteous, sans-serif",
              fontSize: "clamp(2rem, 6vw, 6rem)",
              color: "#fff",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
            }}
          >
            SPECIAL
          </span>
          <span
            style={{
              fontSize: "clamp(1.5rem, 3vw, 3rem)",
              color: "#FFB830",
            }}
          >
            ✦
          </span>
        </div>
      </div>

      {/* Scrolling strip */}
      <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          {repeated.map((item, i) => (
            <SpecialItem key={i} name={item.name} price={item.price} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SpecialItem({ name, price }: { name: string; price: number }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "clamp(1rem, 2vw, 2rem)",
        padding: "0 clamp(1.5rem, 4vw, 4rem)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <span
        style={{
          fontFamily: "Righteous, sans-serif",
          fontSize: "clamp(1.2rem, 3vw, 3rem)",
          color: "#fff",
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontFamily: "Space Mono, monospace",
          fontSize: "clamp(1rem, 2vw, 1.8rem)",
          color: "#FFB830",
          whiteSpace: "nowrap",
        }}
      >
        Rs. {price.toLocaleString()}
      </span>
      <div
        style={{
          position: "relative",
          transform: "rotate(-8deg)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            display: "block",
            fontFamily: "Space Mono, monospace",
            fontSize: "clamp(0.5rem, 0.8vw, 0.6rem)",
            letterSpacing: "0.15em",
            color: "#FF3C3C",
            border: "2px solid #FF3C3C",
            padding: "2px 6px",
            whiteSpace: "nowrap",
          }}
        >
          LIMITED
        </span>
      </div>
    </div>
  );
}
