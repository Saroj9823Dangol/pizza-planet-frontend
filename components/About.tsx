"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" style={{
      background: "linear-gradient(180deg, #fff8f0 0%, #fffdf5 50%, #fff8f0 100%)",
      padding: "clamp(4rem, 12vw, 10rem) clamp(1rem, 5vw, 5rem)", position: "relative", overflow: "hidden",
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
          style={{ marginBottom: "clamp(4rem, 8vw, 6rem)" }}>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "clamp(0.65rem, 1.2vw, 0.8rem)", letterSpacing: "0.3em", color: "#e63946", marginBottom: "0.5rem" }}>
            WELCOME TO THE
          </div>
          <div style={{ position: "relative", display: "inline-block", maxWidth: "100%" }}>
            <span style={{ fontFamily: "Righteous, sans-serif", fontSize: "clamp(1.8rem, 6vw, 4rem)", color: "#2d2d2d", letterSpacing: "-0.02em", lineHeight: 0.85 }}>
              PLANET OF
            </span>
            <span style={{ fontFamily: "Righteous, sans-serif", fontSize: "clamp(1.8rem, 6vw, 4rem)", background: "linear-gradient(135deg, #f4a261, #e63946)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.02em", lineHeight: 0.85, display: "block" }}>
              CHEESENESS 🧀
            </span>
            <div style={{ width: "40%", height: "3px", background: "linear-gradient(90deg, #e63946, #f4a261)", marginTop: "10px", borderRadius: "2px" }} />
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "clamp(3rem, 8vw, 8rem)", alignItems: "start" }}>
          <motion.div initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: "flex", gap: "1.5rem" }}>
            <div style={{ width: "3px", background: "linear-gradient(180deg, #e63946, #f4a261)", flexShrink: 0, borderRadius: "2px" }} />
            <div>
              <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "clamp(1.1rem, 1.8vw, 1.25rem)", lineHeight: 1.8, color: "#6b6b6b", marginBottom: "2rem" }}>
                Welcome to Pizza Planet — where every slice is a journey across the cosmos of flavor! We believe in the magic of togetherness, the warmth of happiness, and the irresistible pull of cheeseness.
              </p>
              <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "clamp(1rem, 1.5vw, 1.15rem)", lineHeight: 1.8, color: "#6b6b6b", marginBottom: "2rem" }}>
                From our wood-fired pizzas to our steam momos, crispy wings, and creamy pastas — every dish is crafted with love, premium ingredients, and a dash of planetary magic.
              </p>
              <div style={{ position: "relative", padding: "2.5rem", marginTop: "2rem", border: "2px dashed rgba(244,162,97,0.4)", background: "rgba(244,162,97,0.04)" }}>
                <p style={{ fontFamily: "Pacifico, cursive", fontSize: "clamp(1.2rem, 2.8vw, 1.5rem)", color: "#e63946", lineHeight: 1.5, margin: 0, textAlign: "center" }}>
                  &ldquo;A Slice of HAPPINESS in every bite! 🍕✨&rdquo;
                </p>
              </div>
              <Link href="/menu" style={{
                display: "inline-block", marginTop: "2.5rem", padding: "1rem 2.5rem",
                background: "#f4a261", color: "#fff", fontFamily: "Space Mono, monospace",
                fontSize: "0.85rem", letterSpacing: "0.15em", textDecoration: "none", fontWeight: 700,
              }}>🍕 EXPLORE OUR MENU →</Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.4 }}>
            <div style={{ border: "2px solid #e8e0d8" }}>
              <Image src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=85"
                alt="Delicious Pizza Planet Pizza" width={800} height={800}
                style={{ width: "100%", height: "auto", display: "block" }} unoptimized />
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
          style={{ marginTop: "clamp(5rem, 10vw, 8rem)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1px", background: "#e8e0d8", border: "1px solid #e8e0d8" }}>
          {[
            { num: "12+", label: "YEARS OF FLAVOR", emoji: "🎂" },
            { num: "50K+", label: "HAPPY CUSTOMERS", emoji: "😊" },
            { num: "100%", label: "MADE WITH LOVE", emoji: "❤️" },
            { num: "🔥", label: "WOOD FIRED", emoji: "🔥" },
          ].map((stat, i) => (
            <div key={i} style={{ padding: "3rem 2rem", textAlign: "center", background: "#fff" }}>
              <div style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", marginBottom: "0.5rem" }}>{stat.emoji}</div>
              <div style={{ fontFamily: "Righteous, sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#f4a261", lineHeight: 1, marginBottom: "0.5rem" }}>{stat.num}</div>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#999" }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
