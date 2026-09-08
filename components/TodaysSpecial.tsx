"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ApiMenuItem, fetchMenuItems, npr } from "@/lib/api";
import { todaysSpecials } from "@/lib/data";

const EMOJIS = ["🧀", "🥟", "🌶️", "🍕"];

export default function TodaysSpecial() {
  const [items, setItems] = useState<ApiMenuItem[] | null>(null);

  useEffect(() => {
    fetchMenuItems({ bestseller: true })
      .then(setItems)
      .catch(() => setItems(null));
  }, []);

  // Live bestsellers when the API is up; bundled specials otherwise.
  const specials = items && items.length > 0 ? items : null;

  return (
    <section style={{
      background: "linear-gradient(135deg, #fff8f0 0%, #ffedd5 50%, #fffdf5 100%)",
      padding: "clamp(3rem, 6vw, 6rem) clamp(1rem, 5vw, 5rem)",
      position: "relative",
      overflow: "hidden",
      borderTop: "2px solid #e8e0d8",
      borderBottom: "2px solid #e8e0d8",
    }}>
      {/* Decorative background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <span style={{
          position: "absolute", top: "15%", right: "8%",
          fontSize: "5rem", opacity: 0.04,
          animation: "float 6s ease-in-out infinite",
        }}>⭐</span>
        <span style={{
          position: "absolute", bottom: "10%", left: "5%",
          fontFamily: "Pacifico, cursive", fontSize: "2rem",
          color: "#f4a261", transform: "rotate(-3deg)", opacity: 0.08,
        }}>Limited Time!</span>
        <span style={{
          position: "absolute", top: "60%", right: "15%",
          fontSize: "3rem", opacity: 0.03,
          animation: "float-slow 8s ease-in-out infinite",
        }}>🍕</span>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
          <div style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            color: "#e63946",
            marginBottom: "0.5rem",
          }}>~ TODAY&apos;S ~</div>
          <h2 style={{
            fontFamily: "Righteous, sans-serif",
            fontSize: "clamp(2rem, 6vw, 4rem)",
            lineHeight: 1,
            margin: 0,
            letterSpacing: "-0.03em",
            backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            SPECIALS <span style={{ animation: "pulse 2s ease-in-out infinite", display: "inline-block", WebkitTextFillColor: "initial", color: "#f4a261" }}>⭐</span>
          </h2>
          <p style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "0.6rem",
            color: "#999",
            letterSpacing: "0.12em",
            marginTop: "0.8rem",
          }}>
            ── Fresh off the planet, made just for you ──
          </p>
        </motion.div>

        {/* Specials Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
        }}>
          {specials
            ? specials.slice(0, 4).map((item, i) => {
                const price = item.variants?.[0]?.price ?? item.basePrice;
                return (
                  <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                    whileHover={{ y: -5, boxShadow: "0 12px 40px rgba(244, 162, 97, 0.2)" }}
                    style={{
                      background: "#fff",
                      border: "1px solid #e8e0d8",
                      padding: "clamp(1.5rem, 3vw, 2rem)",
                      textAlign: "center",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s",
                    }}>
                    <div style={{
                      position: "absolute", top: 0, right: 0,
                      width: 0, height: 0,
                      borderStyle: "solid",
                      borderWidth: "0 45px 45px 0",
                      borderColor: "transparent #e63946 transparent transparent",
                    }} />
                    <span style={{
                      position: "absolute", top: "5px", right: "2px",
                      fontSize: "0.5rem", color: "#fff",
                      fontFamily: "Space Mono, monospace",
                      letterSpacing: "0.05em",
                      transform: "rotate(45deg)",
                    }}>HOT</span>

                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "84px", height: "84px", objectFit: "cover",
                          borderRadius: "50%", margin: "0 auto 1rem",
                          border: "2px solid #f4a261",
                        }}
                      />
                    ) : (
                      <div style={{
                        fontSize: "2.5rem",
                        marginBottom: "1rem",
                        animation: "wiggle 3s ease-in-out infinite",
                        animationDelay: `${i * 0.3}s`,
                      }}>
                        {EMOJIS[i % EMOJIS.length]}
                      </div>
                    )}

                    <div style={{
                      fontFamily: "Righteous, sans-serif",
                      fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
                      color: "#2d2d2d",
                      marginBottom: "0.5rem",
                      lineHeight: 1.2,
                    }}>
                      {item.name}
                    </div>

                    <div style={{
                      fontFamily: "Righteous, sans-serif",
                      fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                      color: "#f4a261",
                      marginBottom: "1rem",
                    }}>
                      Rs. {Math.round(npr(price)).toLocaleString()}
                    </div>

                    <div style={{
                      fontFamily: "Space Mono, monospace",
                      fontSize: "0.55rem",
                      letterSpacing: "0.2em",
                      color: "#e63946",
                      border: "2px solid #e63946",
                      display: "inline-block",
                      padding: "3px 14px",
                      transform: "rotate(-2deg)",
                    }}>
                      ★ LIMITED
                    </div>
                  </motion.div>
                );
              })
            : todaysSpecials.map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -5, boxShadow: "0 12px 40px rgba(244, 162, 97, 0.2)" }}
                  style={{
                    background: "#fff",
                    border: "1px solid #e8e0d8",
                    padding: "clamp(1.5rem, 3vw, 2rem)",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s",
                  }}>
                  <div style={{
                    position: "absolute", top: 0, right: 0,
                    width: 0, height: 0,
                    borderStyle: "solid",
                    borderWidth: "0 45px 45px 0",
                    borderColor: "transparent #e63946 transparent transparent",
                  }} />
                  <span style={{
                    position: "absolute", top: "5px", right: "2px",
                    fontSize: "0.5rem", color: "#fff",
                    fontFamily: "Space Mono, monospace",
                    letterSpacing: "0.05em",
                    transform: "rotate(45deg)",
                  }}>HOT</span>

                  <div style={{
                    fontSize: "2.5rem",
                    marginBottom: "1rem",
                    animation: "wiggle 3s ease-in-out infinite",
                    animationDelay: `${i * 0.3}s`,
                  }}>
                    {i === 0 ? "🧀" : i === 1 ? "🥟" : i === 2 ? "🌶️" : "🍕"}
                  </div>

                  <div style={{
                    fontFamily: "Righteous, sans-serif",
                    fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
                    color: "#2d2d2d",
                    marginBottom: "0.5rem",
                    lineHeight: 1.2,
                  }}>
                    {item.name}
                  </div>

                  <div style={{
                    fontFamily: "Righteous, sans-serif",
                    fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                    color: "#f4a261",
                    marginBottom: "1rem",
                  }}>
                    Rs. {item.price}
                  </div>

                  <div style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.2em",
                    color: "#e63946",
                    border: "2px solid #e63946",
                    display: "inline-block",
                    padding: "3px 14px",
                    transform: "rotate(-2deg)",
                  }}>
                    ★ LIMITED
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}