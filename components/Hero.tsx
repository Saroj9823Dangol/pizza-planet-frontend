"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100dvh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "100px clamp(1rem, 5dvw, 5rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "clamp(2rem, 5vw, 4rem)",
          alignItems: "center",
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* LEFT: Heading + CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ zIndex: 2 }}
        >
          {/* PIZZA */}
          <div>
            <span
              style={{
                fontFamily: "Righteous, sans-serif",
                fontSize: "clamp(35px, 12vw, 150px)",
                color: "#fff",
                display: "block",
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
                wordBreak: "break-word",
              }}
            >
              PIZZA
            </span>
          </div>

          {/* PLANET */}
          <div style={{ marginBottom: "1rem" }}>
            <span
              style={{
                fontFamily: "Righteous, sans-serif",
                fontSize: "clamp(35px, 12vw, 150px)",
                color: "#FFB830",
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
                display: "block",
                wordBreak: "break-word",
              }}
            >
              PLANET.
            </span>
          </div>

          {/* Curved tagline */}
          <div
            style={{
              marginBottom: "2.5rem",
              marginTop: "0.5rem",
              maxWidth: "100%",
            }}
          >
            <svg
              viewBox="0 0 400 80"
              width="100%"
              style={{ maxWidth: "400px", overflow: "visible" }}
            >
              <defs>
                <path id="curve" d="M 20 60 Q 200 0 380 60" />
              </defs>
              <text fontFamily="Pacifico, cursive" fontSize="24" fill="#FF3C3C">
                <textPath href="#curve">I&apos;m Lovin&apos; It</textPath>
              </text>
            </svg>
          </div>

          {/* <p
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "450px",
              marginBottom: "3rem",
              lineHeight: 1.6,
              letterSpacing: "0.05em",
            }}
          >
            Mastering the art of 48-hour slow fermentation and wood-fired
            perfection. From our brick oven to your table.
          </p> */}

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <a
              href="#menu"
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                color: "#fff",
                textDecoration: "none",
                borderBottom: "2px solid #FFB830",
                paddingBottom: "4px",
                display: "inline-block",
                transition: "opacity 0.2s",
              }}
            >
              VIEW MENU
            </a>

            <a
              href="#order"
              style={{
                display: "inline-block",
                padding: "1rem 2.5rem",
                background: "#FF3C3C",
                fontFamily: "Space Mono, monospace",
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "0px",
                transition: "transform 0.2s",
              }}
            >
              ORDER NOW →
            </a>
          </div>
        </motion.div>

        {/* RIGHT: Real pizza photo + Logo Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "650px",
              aspectRatio: "1/1",
            }}
          >
            <Image
              src="/images/hero.png"
              alt="Artisanal Hand-tossed Pizza"
              fill
              style={{ objectFit: "contain" }}
              priority
            />

            {/* Logo Badge overlay - ROUNDED */}
            <div
              style={{
                position: "absolute",
                bottom: "10%",
                right: "10%",
                width: "clamp(60px, 15vw, 120px)",
                height: "clamp(60px, 15vw, 120px)",
                borderRadius: "50%",
                border: "2px solid #fff",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                zIndex: 10,
              }}
            >
              <Image
                src="/logo/logo.jpg"
                alt="Pizza Planet Authentic"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee strip */}
      <MarqueeTicker />
    </section>
  );
}

function MarqueeTicker() {
  const text =
    " 🪵 WOOD FIRED · 🍅 FRESH TOMATOES · 🥖 HANDMADE DOUGH · 🌿 FRESH BASIL · 🧀 BUFFALO MOZZARELLA · 🔥 HAND TOSSED · 🤌 FRESHLY BAKED · ";

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#FF3C3C",
        overflow: "hidden",
        padding: "0.8rem 0",
        zIndex: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "marquee 40s linear infinite",
        }}
      >
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              color: "#fff",
              whiteSpace: "nowrap",
              paddingRight: "2rem",
            }}
          >
            {text}
          </span>
        ))}
      </div>
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
