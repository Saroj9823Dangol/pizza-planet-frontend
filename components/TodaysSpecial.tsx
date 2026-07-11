"use client";
import { motion } from "framer-motion";
import { todaysSpecials } from "@/lib/data";

export default function TodaysSpecial() {
  return (
    <section style={{
      background: "linear-gradient(135deg, #fff8f0 0%, #ffedd5 50%, #fffdf5 100%)",
      padding: "clamp(3rem, 6vw, 6rem) clamp(1rem, 5vw, 5rem)",
      position: "relative", overflow: "hidden",
      borderTop: "2px solid #e8e0d8", borderBottom: "2px solid #e8e0d8",
    }}>
      {/* Decorative background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.04 }}>
        <span style={{ position: "absolute", top: "20%", right: "10%", fontFamily: "Righteous, sans-serif", fontSize: "4rem", color: "#e63946", transform: "rotate(5deg)" }}>⭐</span>
        <span style={{ position: "absolute", bottom: "10%", left: "5%", fontFamily: "Pacifico, cursive", fontSize: "2rem", color: "#f4a261", transform: "rotate(-3deg)" }}>Limited Time!</span>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.3em", color: "#e63946", marginBottom: "0.5rem" }}>~ TODAY&apos;S ~</div>
          <h2 style={{ fontFamily: "Righteous, sans-serif", fontSize: "clamp(2rem, 6vw, 4rem)", color: "#2d2d2d", lineHeight: 1, margin: 0, letterSpacing: "-0.03em" }}>
            SPECIALS
          </h2>
          <p style={{ fontFamily: "Space Mono, monospace", fontSize: "0.6rem", color: "#999", letterSpacing: "0.12em", marginTop: "0.8rem" }}>
            ──  Fresh off the planet, made just for you  ──
          </p>
        </motion.div>

        {/* Specials Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
          {todaysSpecials.map((item, i) => (
            <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{
                background: "#fff", border: "1px solid #e8e0d8", padding: "clamp(1.5rem, 3vw, 2rem)",
                textAlign: "center", position: "relative", overflow: "hidden",
              }}>
              {/* Corner accent */}
              <div style={{ position: "absolute", top: 0, right: 0, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 40px 40px 0", borderColor: "transparent #e63946 transparent transparent" }} />
              <span style={{ position: "absolute", top: "3px", right: "3px", fontSize: "0.55rem", color: "#fff", fontFamily: "Space Mono, monospace", letterSpacing: "0.05em", transform: "rotate(45deg)" }}>HOT</span>

              <div style={{ fontFamily: "Righteous, sans-serif", fontSize: "clamp(1.3rem, 2.8vw, 1.7rem)", color: "#2d2d2d", marginBottom: "0.5rem", lineHeight: 1.2 }}>
                {item.name}
              </div>

              <div style={{ fontFamily: "Righteous, sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2rem)", color: "#f4a261", marginBottom: "1rem" }}>
                Rs. {item.price}
              </div>

              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#e63946", border: "2px solid #e63946", display: "inline-block", padding: "3px 14px", transform: "rotate(-2deg)" }}>
                ★ LIMITED
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
