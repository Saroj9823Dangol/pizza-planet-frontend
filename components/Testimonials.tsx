"use client";
import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section id="testimonials" style={{
      background: "linear-gradient(180deg, #fffdf5 0%, #fff8f0 100%)",
      padding: "clamp(5rem, 15vw, 10rem) clamp(1rem, 5vw, 5rem)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Giant ghost quotation mark */}
      <div style={{
        position: "absolute",
        top: "-5%",
        left: "-2%",
        fontSize: "clamp(15rem, 40vw, 35rem)",
        fontFamily: "Righteous, sans-serif",
        color: "rgba(230,57,70,0.03)",
        lineHeight: 1,
        pointerEvents: "none",
        userSelect: "none",
      }}>
        &ldquo;
      </div>

      {/* Floating pizza decorations */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <span style={{
          position: "absolute", top: "20%", right: "5%",
          fontSize: "3rem", opacity: 0.04,
          animation: "float 7s ease-in-out infinite",
        }}>🍕</span>
        <span style={{
          position: "absolute", bottom: "15%", left: "8%",
          fontSize: "2.5rem", opacity: 0.03,
          animation: "float-slow 9s ease-in-out infinite",
        }}>🧀</span>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
          style={{ marginBottom: "clamp(4rem, 10vw, 8rem)", textAlign: "center" }}>
          <div style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.4em",
            color: "#e63946",
            marginBottom: "1rem",
          }}>WHAT OUR</div>
          <h2 style={{
            fontFamily: "Righteous, sans-serif",
            fontSize: "clamp(2rem, 6vw, 4.5rem)",
            lineHeight: 0.8,
            margin: 0,
            letterSpacing: "-0.04em",
            backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            CUSTOMERS <br />
            <span style={{ WebkitTextFillColor: "initial", color: "#f4a261" }}>SAY ⭐</span>
          </h2>
          <p style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "0.6rem",
            color: "#999",
            letterSpacing: "0.12em",
            marginTop: "1rem",
          }}>
            ── From the Planet of Happiness ──
          </p>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "clamp(1.5rem, 4vw, 3rem)",
          alignItems: "start",
        }}>
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                background: "#fff",
                padding: "2rem 1.8rem",
                border: "1px solid #f0ece6",
                position: "relative",
                marginTop: i % 2 !== 0 ? "clamp(0px, 6vw, 40px)" : "0px",
              }}>
              {/* Stars */}
              <div style={{ display: "flex", gap: "3px", marginBottom: "0.8rem" }}>
                {[...Array(t.stars)].map((_, si) => (
                  <span key={si} style={{ color: "#f4a261", fontSize: "0.9rem" }}>⭐</span>
                ))}
              </div>
              <div style={{ height: "2px", width: "30px", background: "#e63946", margin: "0.5rem 0 1rem" }} />
              <p style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
                lineHeight: 1.7,
                color: "#6b6b6b",
                margin: 0,
                fontStyle: "italic",
              }}>
                &ldquo;{t.review}&rdquo;
              </p>
              <div style={{
                marginTop: "1.5rem",
                borderLeft: "2px solid rgba(244,162,97,0.4)",
                paddingLeft: "1.2rem",
              }}>
                <div style={{
                  fontFamily: "Righteous, sans-serif",
                  fontSize: "1.1rem",
                  color: "#2d2d2d",
                }}>{t.name}</div>
                <div style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "0.6rem",
                  color: "rgba(244,162,97,0.6)",
                  letterSpacing: "0.15em",
                  marginTop: "4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}>📍 {t.location}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
