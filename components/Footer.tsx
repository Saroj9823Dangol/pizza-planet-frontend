"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      background: "#fffdf5",
      color: "#2d2d2d",
      padding: "clamp(3rem, 8vw, 5rem) 0 3rem",
      borderTop: "2px solid #e8e0d8",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 5rem)" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
          gap: "clamp(3rem, 8vw, 8rem)",
          marginBottom: "4rem",
        }}>
          {/* Brand */}
          <div style={{ borderLeft: "3px solid #e63946", paddingLeft: "clamp(1.5rem, 4vw, 3rem)" }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 1 }}>
              <div style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                color: "#e63946",
                marginBottom: "0.8rem",
              }}>✨ SINCE 2022</div>
              <h2 style={{
                fontFamily: "Righteous, sans-serif",
                fontSize: "clamp(2.5rem, 10vw, 6rem)",
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
                PIZZA <br />
                PLANET.
              </h2>
              <p style={{
                fontFamily: "Pacifico, cursive",
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                color: "#f4a261",
                marginTop: "1rem",
              }}>
                A Slice of Happiness 🍕
              </p>
            </motion.div>
          </div>

          {/* Links + Info */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <p style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
              lineHeight: 1.6,
              color: "#999",
              margin: "0 0 3rem",
              maxWidth: "450px",
            }}>
              From our signature pizzas and different crust options to pasta, burgers,
              fried chicken, appetizers, coffee, shakes, and more — there&apos;s something
              for everyone at Pizza Planet. 🍕✨
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "2rem",
            }}>
              <div>
                <h4 style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "0.55rem",
                  color: "#999",
                  letterSpacing: "0.25em",
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid #e8e0d8",
                  paddingBottom: "0.8rem",
                }}>NAVIGATE</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  {[
                    { label: "🍕 Menu", href: "/menu" },
                    { label: "📖 Story", href: "/about" },
                    { label: "✨ Order", href: "/order" },
                    { label: "⭐ Reviews", href: "/" },
                  ].map((l) => (
                    <Link key={l.label} href={l.href} style={{
                      fontFamily: "Righteous, sans-serif",
                      fontSize: "1rem",
                      color: "#2d2d2d",
                      textDecoration: "none",
                      letterSpacing: "0.03em",
                      transition: "color 0.3s",
                    }}>{l.label}</Link>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "0.55rem",
                  color: "#999",
                  letterSpacing: "0.25em",
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid #e8e0d8",
                  paddingBottom: "0.8rem",
                }}>CONNECT</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  {["📸 Instagram", "🎵 TikTok", "📍 Locate Us"].map((l) => (
                    <span key={l} style={{
                      fontFamily: "Righteous, sans-serif",
                      fontSize: "0.9rem",
                      color: "#999",
                      letterSpacing: "0.03em",
                      cursor: "default",
                    }}>{l}</span>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "0.55rem",
                  color: "#999",
                  letterSpacing: "0.25em",
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid #e8e0d8",
                  paddingBottom: "0.8rem",
                }}>LOCATIONS</h4>
                <div style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "0.7rem",
                  lineHeight: 2.2,
                  color: "#999",
                  letterSpacing: "0.05em",
                }}>
                  📍 Bouddha – Tushal<br />
                  📍 Kumaripati – Lalitpur<br />
                  📍 Mid-Baneshwor<br />
                  📍 City Center<br />
                  📍 Tokha – Kathmandu
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div style={{
          background: "#f5f0ea",
          padding: "1.2rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid #e8e0d8",
          marginBottom: "3rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <motion.div animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: "6px", height: "6px",
                background: "#2a9d8f", borderRadius: "50%",
              }} />
            <span style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "0.65rem",
              color: "#2a9d8f",
              letterSpacing: "0.15em",
            }}>🔥 OPEN NOW</span>
          </div>
          <div style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "0.65rem",
            color: "#999",
            letterSpacing: "0.1em",
          }}>
            <span style={{ color: "#f4a261" }}>⏰</span> HOURS: 11:00 AM — 11:00 PM
          </div>
          <div style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "0.65rem",
            color: "#999",
            letterSpacing: "0.1em",
          }}>
            DINE IN | TAKEAWAY | DELIVERY
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem",
          flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "linear-gradient(135deg, #e63946, #f4a261)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontFamily: "Righteous, sans-serif", fontSize: "1.1rem",
            }}>P</div>
            <span style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "0.6rem",
              color: "#999",
              letterSpacing: "0.1em",
            }}>© 2024 PIZZA PLANET. 🍕 ALL RIGHTS RESERVED.</span>
          </div>
          <div style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "0.6rem",
            color: "#e63946",
            letterSpacing: "0.1em",
          }}>MADE WITH ❤️</div>
        </div>
      </div>
    </footer>
  );
}
