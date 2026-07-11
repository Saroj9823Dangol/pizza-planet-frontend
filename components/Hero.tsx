"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100dvh",
        background: "linear-gradient(180deg, #fff8f0 0%, #ffedd5 50%, #fff8f0 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "100px clamp(1rem, 5dvw, 5rem) 0",
        position: "relative",
      }}
    >
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "clamp(2rem, 5vw, 4rem)", alignItems: "center",
        width: "100%", maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1,
      }}>
        {/* LEFT: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ fontFamily: "Pacifico, cursive", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "#e63946", marginBottom: "0.5rem" }}
          >
            Welcome to 🌟
          </motion.div>

          <div>
            <span style={{
              fontFamily: "Righteous, sans-serif", fontSize: "clamp(3rem, 10vw, 6rem)",
              color: "#2d2d2d", display: "block", lineHeight: 1, letterSpacing: "-0.02em",
            }}>PIZZA</span>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <span style={{
              fontFamily: "Righteous, sans-serif", fontSize: "clamp(3rem, 10vw, 6rem)",
              background: "linear-gradient(135deg, #f4a261, #e63946)", WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent", lineHeight: 1, letterSpacing: "-0.02em", display: "block",
            }}>PLANET</span>
          </div>

          <svg viewBox="0 0 400 40" width="100%" style={{ maxWidth: "380px", overflow: "visible", marginBottom: "1.5rem" }}>
            <defs><path id="curve-hero" d="M 20 30 Q 200 0 380 30" /></defs>
            <text fontFamily="Pacifico, cursive" fontSize="20" fill="#e63946">
              <textPath href="#curve-hero" startOffset="50%" textAnchor="middle">
                Planet of Cheeseness, Togetherness &amp; Happiness
              </textPath>
            </text>
          </svg>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
            style={{ fontFamily: "DM Sans, sans-serif", fontSize: "1.05rem", color: "#6b6b6b", maxWidth: "480px", marginBottom: "2rem", lineHeight: 1.6 }}
          >
            A Slice of HAPPINESS awaits! Wood-fired pizzas, steam momos, crispy wings, and the best shakes in town — all made with love.
          </motion.p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/menu" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.9rem 2.2rem",
              background: "#e63946", fontFamily: "Space Mono, monospace", fontSize: "0.8rem",
              letterSpacing: "0.12em", color: "#fff", textDecoration: "none", fontWeight: 700,
            }}>
              🍕 VIEW MENU
            </Link>
            <Link href="/order" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.9rem 2.2rem",
              background: "transparent", border: "2px solid #f4a261", color: "#f4a261",
              fontFamily: "Space Mono, monospace", fontSize: "0.8rem", letterSpacing: "0.12em",
              textDecoration: "none", fontWeight: 700,
            }}>
              ✨ ORDER NOW
            </Link>
          </div>
        </motion.div>

        {/* RIGHT: Pizza on wooden board */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <div style={{ position: "relative", width: "100%", maxWidth: "480px", aspectRatio: "1/1" }}>
            <Image
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=85"
              alt="Fresh Pizza Planet Pizza on wooden board"
              fill
              style={{ objectFit: "contain" }}
              priority
              unoptimized
            />
            <div style={{
              position: "absolute", top: "5%", left: "0", background: "#f4a261", color: "#fff",
              padding: "5px 16px", fontFamily: "Space Mono, monospace", fontSize: "0.65rem",
              fontWeight: 700, letterSpacing: "0.1em", transform: "rotate(-6deg)", whiteSpace: "nowrap",
            }}>🏆 BEST IN TOWN</div>
            <div style={{
              position: "absolute", bottom: "15%", right: "5%", background: "#e63946", color: "#fff",
              padding: "5px 16px", fontFamily: "Space Mono, monospace", fontSize: "0.65rem",
              fontWeight: 700, letterSpacing: "0.1em", transform: "rotate(4deg)", whiteSpace: "nowrap",
            }}>🔥 WOOD FIRED</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
