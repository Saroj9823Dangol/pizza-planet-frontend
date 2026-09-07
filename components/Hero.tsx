"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const floatingPizzas = [
  { emoji: "🍕", size: "3rem", top: "10%", left: "5%", delay: 0, duration: 6 },
  { emoji: "🍕", size: "2.2rem", top: "20%", right: "8%", delay: 0.5, duration: 7 },
  { emoji: "🧀", size: "2rem", bottom: "25%", left: "8%", delay: 1, duration: 5 },
  { emoji: "🍕", size: "1.8rem", top: "60%", right: "5%", delay: 1.5, duration: 8 },
  { emoji: "🌶️", size: "1.5rem", top: "15%", left: "20%", delay: 0.3, duration: 6.5 },
  { emoji: "🍅", size: "1.6rem", bottom: "30%", right: "15%", delay: 0.8, duration: 7.5 },
];

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100dvh",
        background: "linear-gradient(180deg, #fff8f0 0%, #ffedd5 40%, #fff8f0 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "100px clamp(1rem, 5dvw, 5rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating pizza ingredients */}
      {floatingPizzas.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ delay: p.delay + 0.5, duration: 0.8, type: "spring" }}
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            right: p.right,
            bottom: p.bottom,
            fontSize: p.size,
            zIndex: 0,
            animation: `float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            pointerEvents: "none",
          }}
        >
          {p.emoji}
        </motion.div>
      ))}

      {/* Rotating pizza ring background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        style={{
          position: "absolute",
          top: "50%",
          right: "-5%",
          width: "600px",
          height: "600px",
          transform: "translateY(-50%)",
          border: "3px dashed rgba(230, 57, 70, 0.3)",
          borderRadius: "50%",
          animation: "spin-slow 40s linear infinite",
          pointerEvents: "none",
        }}
      />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "clamp(2rem, 5vw, 4rem)",
        alignItems: "center",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}>
        {/* LEFT: Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ display: "inline-flex", overflow: "hidden", marginBottom: "0.5rem" }}>
            {"Welcome to 🌟".split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.03, duration: 0.4, ease: "easeOut" }}
                style={{
                  fontFamily: "Pacifico, cursive",
                  fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                  color: "#e63946",
                }}
              >
                {ch}
              </motion.span>
            ))}
          </div>

          {/* Staggered letter-by-letter reveal: PIZZA */}
          <div style={{ display: "inline-flex", overflow: "hidden" }}>
            {"PIZZA".split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.3 + i * 0.07,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  fontFamily: "Righteous, sans-serif",
                  fontSize: "clamp(3rem, 10vw, 6rem)",
                  display: "inline-block",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  transformOrigin: "bottom center",
                  backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400&q=80')",
                  backgroundSize: "500% 100%",
                  backgroundPosition: `${(i / 4) * 100}% center`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {ch}
              </motion.span>
            ))}
          </div>

          {/* Staggered letter-by-letter reveal: PLANET */}
          <div style={{ marginBottom: "1rem", position: "relative", display: "inline-flex", overflow: "hidden" }}>
            {"PLANET".split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.6 + i * 0.07,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  fontFamily: "Righteous, sans-serif",
                  fontSize: "clamp(3rem, 10vw, 6rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  display: "inline-block",
                  transformOrigin: "bottom center",
                  backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400&q=80')",
                  backgroundSize: "600% 100%",
                  backgroundPosition: `${(i / 5) * 100}% center`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {ch}
              </motion.span>
            ))}
            {/* Cheese drip decorations */}
            <svg
              viewBox="0 0 200 30"
              style={{
                position: "absolute",
                bottom: "-8px",
                left: "10%",
                width: "80%",
                height: "20px",
                opacity: 0.5,
              }}
            >
              <path d="M 10 5 Q 15 25 20 5 Q 30 25 35 5 Q 50 30 55 5 Q 65 25 70 5 Q 85 30 90 5 Q 100 25 105 5 Q 120 30 125 5 Q 135 25 140 5 Q 155 30 160 5 Q 170 25 175 5 Q 185 20 190 5"
                fill="none" stroke="#f4a261" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <svg viewBox="0 0 400 40" width="100%" style={{ maxWidth: "380px", overflow: "visible", marginBottom: "1.5rem" }}>
            <defs><path id="curve-hero" d="M 20 30 Q 200 0 380 30" /></defs>
            <text fontFamily="Pacifico, cursive" fontSize="20" fill="#e63946">
              <textPath href="#curve-hero" startOffset="50%" textAnchor="middle">
                A Slice of Happiness
              </textPath>
            </text>
          </svg>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "1.05rem",
              color: "#6b6b6b",
              maxWidth: "480px",
              marginBottom: "2rem",
              lineHeight: 1.7,
            }}
          >
            Welcome to Pizza Planet, a homegrown pizza brand established in 2022, bringing
            delicious food, quality ingredients, and a welcoming experience to pizza lovers.
          </motion.p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/menu" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.9rem 2.2rem",
              background: "#e63946",
              fontFamily: "Space Mono, monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              transition: "all 0.3s",
            }}>
              🍕 VIEW MENU
            </Link>
            <Link href="/order" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.9rem 2.2rem",
              background: "transparent",
              border: "2px solid #f4a261",
              color: "#f4a261",
              fontFamily: "Space Mono, monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              textDecoration: "none",
              fontWeight: 700,
              transition: "all 0.3s",
            }}>
              ✨ ORDER NOW
            </Link>
          </div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              display: "flex",
              gap: "2rem",
              marginTop: "2.5rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { num: "5+", label: "LOCATIONS" },
              { num: "2022", label: "EST." },
              { num: "50K+", label: "HAPPY SLICES" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{
                  fontFamily: "Righteous, sans-serif",
                  fontSize: "1.4rem",
                  color: "#f4a261",
                }}>{s.num}</span>
                <span style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "0.55rem",
                  color: "#999",
                  letterSpacing: "0.12em",
                }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: Pizza on wooden board with floating elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          {/* Spinning ring */}
          <div style={{
            position: "absolute",
            width: "110%",
            height: "110%",
            border: "2px dashed rgba(244, 162, 97, 0.25)",
            borderRadius: "50%",
            animation: "spin-slow 30s linear infinite",
          }} />

          {/* Main pizza image */}
          <div style={{
            position: "relative",
            width: "100%",
            maxWidth: "480px",
            aspectRatio: "1/1",
            borderRadius: "50%",
            overflow: "hidden",
            border: "4px solid rgba(244, 162, 97, 0.2)",
            boxShadow: "0 20px 60px rgba(244, 162, 97, 0.2), 0 0 0 8px rgba(255, 248, 240, 0.8)",
          }}>
            <Image
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700&q=85"
              alt="Fresh Pizza Planet Pizza on wooden board"
              fill
              style={{ objectFit: "cover" }}
              priority
              unoptimized
            />
            {/* Warm overlay */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 30% 30%, rgba(255,209,102,0.15) 0%, transparent 60%)",
            }} />
          </div>

          {/* Floating badges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            style={{
              position: "absolute",
              top: "5%",
              left: "-5%",
              background: "#f4a261",
              color: "#fff",
              padding: "6px 18px",
              fontFamily: "Space Mono, monospace",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              transform: "rotate(-8deg)",
              whiteSpace: "nowrap",
              animation: "float 4s ease-in-out infinite",
            }}
          >
            🏆 BEST IN TOWN
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            style={{
              position: "absolute",
              bottom: "15%",
              right: "-3%",
              background: "#e63946",
              color: "#fff",
              padding: "6px 18px",
              fontFamily: "Space Mono, monospace",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              transform: "rotate(5deg)",
              whiteSpace: "nowrap",
              animation: "float-slow 5s ease-in-out infinite",
            }}
          >
            🔥 WOOD FIRED
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.5, type: "spring" }}
            style={{
              position: "absolute",
              bottom: "5%",
              left: "0%",
              background: "#2a9d8f",
              color: "#fff",
              padding: "5px 14px",
              fontFamily: "Space Mono, monospace",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              transform: "rotate(3deg)",
              whiteSpace: "nowrap",
            }}
          >
            🍕 FRESH DAILY
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee ticker */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#2d2d2d",
        padding: "10px 0",
        overflow: "hidden",
        borderTop: "2px solid #e63946",
      }}>
        <div style={{
          display: "flex",
          width: "max-content",
          animation: "marquee 30s linear infinite",
        }}>
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} style={{
              display: "flex",
              gap: "3rem",
              paddingRight: "3rem",
              fontFamily: "Space Mono, monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              color: "#fff",
              whiteSpace: "nowrap",
            }}>
              {[
                "🍕 MARGHERITA", "🌶️ SPICY INFERNO", "🧀 CHEESE BURST",
                "🍗 FRIED WINGS", "🥟 STEAMED MOMO", "🍝 PASTA",
                "🍔 BURGERS", "☕ COFFEE", "🥤 SHAKES",
                "⭐ BESTSELLER", "🔥 ORDER NOW",
              ].map((item, i) => (
                <span key={`${setIndex}-${i}`} style={{
                  color: i % 3 === 0 ? "#f4a261" : i % 3 === 1 ? "#e63946" : "#fff",
                }}>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
