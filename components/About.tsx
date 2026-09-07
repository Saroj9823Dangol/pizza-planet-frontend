"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const CHAPTERS = [
  {
    num: "01",
    title: "The Beginning",
    subtitle: "How a simple idea became our favourite slice",
  },
  {
    num: "02",
    title: "Why We Exist",
    subtitle: "Because every gathering deserves great food",
  },
  {
    num: "03",
    title: "What We Believe",
    subtitle: "The values that guide every dough we stretch",
  },
  {
    num: "04",
    title: "Our Journey",
    subtitle: "From one kitchen to five locations",
  },
];

const VALUES = [
  {
    emoji: "🧀",
    title: "Quality Ingredients",
    desc: "Every ingredient is handpicked. We believe you can taste the difference when someone cares about what goes into your food — from the freshest mozzarella to locally sourced vegetables.",
  },
  {
    emoji: "❤️",
    title: "Made With Love",
    desc: "Pizza Planet was born from a love for food and people. Every pizza we make carries that warmth — the same warmth you feel when you walk in and are greeted with a smile.",
  },
  {
    emoji: "🤝",
    title: "Togetherness",
    desc: "Food is never eaten alone. It's shared. It's celebrated. We built Pizza Planet to be that place where friends, families, and strangers come together over a hot, fresh slice.",
  },
  {
    emoji: "✨",
    title: "Trust & Hygiene",
    desc: "We focus on consistent taste, strict hygiene, and friendly service — because trust is built one slice at a time. Every visit should feel like coming home.",
  },
];

const MILESTONES = [
  { year: "2022", title: "The Dream Begins", desc: "Pizza Planet was born — a simple vision to bring world-class pizza with a warm heart.", emoji: "🌱" },
  { year: "2023", title: "First Slice Served", desc: "Our first location opened, and the city got its taste of something new — yet somehow, familiar.", emoji: "🍕" },
  { year: "2023", title: "Growing Family", desc: "Three locations across the valley. The word spread: there's a new place in town where pizza meets great hospitality.", emoji: "📍" },
  { year: "2024", title: "Five Locations Strong", desc: "Bouddha, Kumaripati, Mid-Baneshwor, City Center, Tokha — five homes, one family, countless happy slices.", emoji: "🏠" },
  { year: "2025", title: "The Planet Expands", desc: "50,000+ happy customers and counting. Every slice tells a story of love, community, and flavour.", emoji: "🌍" },
];

const QUOTES = [
  { text: "Atithi Devo Bhava", translation: "The guest is God", context: "This ancient value lives in everything we do — every customer is family." },
  { text: "Sharing is Caring", translation: "Sharing food is sharing love", context: "Pizza is meant to be shared. And sharing is who we are." },
];

function ChapterDivider({ chapter }: { chapter: typeof CHAPTERS[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "clamp(1.5rem, 4vw, 3rem)",
        marginBottom: "clamp(3rem, 6vw, 5rem)",
        padding: "0 clamp(1rem, 5vw, 5rem)",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      {/* Chapter number */}
      <div style={{
        fontFamily: "Righteous, sans-serif",
        fontSize: "clamp(3rem, 8vw, 6rem)",
        color: "rgba(230, 57, 70, 0.08)",
        lineHeight: 1,
        flexShrink: 0,
      }}>
        {chapter.num}
      </div>

      {/* Vertical line */}
      <div style={{
        width: "2px",
        height: "60px",
        background: "linear-gradient(180deg, #e63946, #f4a261)",
        flexShrink: 0,
      }} />

      <div>
        <h3 style={{
          fontFamily: "Righteous, sans-serif",
          fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
          color: "#2d2d2d",
          lineHeight: 1,
          margin: 0,
          letterSpacing: "-0.02em",
        }}>
          {chapter.title}
        </h3>
        <p style={{
          fontFamily: "DM Sans, sans-serif",
          fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)",
          color: "#999",
          marginTop: "0.3rem",
        }}>
          {chapter.subtitle}
        </p>
      </div>
    </motion.div>
  );
}



export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div style={{ background: "#fff8f0" }}>

      {/* ═══════════════════════════════════════════════
          SECTION 1: EDITORIAL HERO — MAGAZINE SPREAD STYLE
      ═══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(6rem, 12vw, 10rem) clamp(1.5rem, 5vw, 5rem)",
          position: "relative",
          overflow: "hidden",
          background: "#fff8f0",
        }}
      >
        {/* Giant ghost year — sits behind everything */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            top: "50%",
            left: "clamp(-2rem, -5vw, -4rem)",
            transform: "translateY(-50%)",
            fontFamily: "Righteous, sans-serif",
            fontSize: "clamp(12rem, 28vw, 22rem)",
            color: "rgba(230, 57, 70, 0.04)",
            lineHeight: 0.8,
            pointerEvents: "none",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          2022
        </motion.div>



        {/* Main content — centered editorial block */}
        <div style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1000px",
          width: "100%",
          textAlign: "center",
        }}>
          {/* Dateline */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "0.6rem",
              color: "#e63946",
              letterSpacing: "0.25em",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <span style={{ width: "40px", height: "1px", background: "#e63946" }} />
            EST. 2022
            <span style={{ width: "40px", height: "1px", background: "#e63946" }} />
          </motion.div>

          {/* "Our" in small script */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "Pacifico, cursive",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              color: "#f4a261",
              marginBottom: "-0.3em",
              position: "relative",
              zIndex: 2,
            }}
          >
            Our
          </motion.div>

          {/* "STORY" — massive text with pizza image clipped inside */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "Righteous, sans-serif",
              fontSize: "clamp(5rem, 18vw, 14rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
              backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center 40%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              position: "relative",
            }}
          >
            STORY
          </motion.div>

          {/* Thick rule line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: "3px",
              width: "80px",
              background: "#e63946",
              margin: "1.5rem auto",
              transformOrigin: "center",
            }}
          />

          {/* Body text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              color: "#6b6b6b",
              lineHeight: 1.8,
              maxWidth: "520px",
              margin: "0 auto 2.5rem",
            }}
          >
            Every pizza tells a story. Ours started with a simple question —
            what if great food could bring people together?
          </motion.p>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.8rem",
            }}
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="16" height="40" viewBox="0 0 16 40" fill="none">
                <path d="M8 0 V34 M2 28 L8 36 L14 28" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <span style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "0.55rem",
              color: "#999",
              letterSpacing: "0.2em",
            }}>
              SCROLL
            </span>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2: THE BEGINNING
      ═══════════════════════════════════════════════ */}
      <section style={{
        padding: "clamp(4rem, 10vw, 8rem) 0",
        position: "relative",
      }}>
        <ChapterDivider chapter={CHAPTERS[0]} />

        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 5rem)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "clamp(3rem, 6vw, 6rem)",
          alignItems: "center",
        }}>
          {/* Left: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Drop cap opening */}
            <p style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)",
              lineHeight: 1.85,
              color: "#6b6b6b",
              marginBottom: "1.5rem",
            }}>
              <span style={{
                fontFamily: "Righteous, sans-serif",
                fontSize: "4rem",
                color: "#e63946",
                float: "left",
                lineHeight: 0.8,
                marginRight: "0.5rem",
                marginTop: "0.3rem",
              }}>I</span>
              n 2022, a simple question sparked something extraordinary:
              <strong style={{ color: "#2d2d2d" }}> What if we could bring the world&apos;s most
              loved food — but make it feel like home?</strong>
            </p>

            <p style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
              lineHeight: 1.85,
              color: "#6b6b6b",
              marginBottom: "1.5rem",
            }}>
              Pizza Planet was born from a belief that the city deserved more than just another
              pizza place. It deserved a place where quality ingredients met warmth and
              hospitality — where every slice carried the spirit of <em>Atithi Devo Bhava</em>,
              the ancient tradition that the guest is God.
            </p>

            <p style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
              lineHeight: 1.85,
              color: "#6b6b6b",
            }}>
              We didn&apos;t just want to sell pizza. We wanted to create a planet — a place where
              friends gather after college, where families celebrate birthdays, where couples share
              their first slice together. A place that feels warm and welcoming, with a
              twist of something new.
            </p>
          </motion.div>

          {/* Right: Image with cultural overlay */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ position: "relative" }}
          >
            {/* Main image */}
            <div style={{
              border: "2px solid #e8e0d8",
              overflow: "hidden",
              position: "relative",
            }}>
              <Image
                src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=85"
                alt="Pizza being made fresh at Pizza Planet"
                width={800}
                height={600}
                style={{ width: "100%", height: "auto", display: "block" }}
                unoptimized
              />
              {/* Warm overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, transparent 60%, rgba(255,248,240,0.4) 100%)",
              }} />
            </div>

            {/* Floating handwritten note */}
            <motion.div
              initial={{ opacity: 0, rotate: -6, y: 20 }}
              whileInView={{ opacity: 1, rotate: -3, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              style={{
                position: "absolute",
                bottom: "-20px",
                left: "-15px",
                background: "#fffdf5",
                border: "2px dashed rgba(244, 162, 97, 0.5)",
                padding: "1rem 1.5rem",
                boxShadow: "4px 4px 0 rgba(0,0,0,0.05)",
              }}
            >
              <span style={{
                fontFamily: "Pacifico, cursive",
                fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
                color: "#e63946",
              }}>
                &ldquo;Made with love.&rdquo;
              </span>
            </motion.div>

            {/* Year stamp */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
              style={{
                position: "absolute",
                top: "-15px",
                right: "20px",
                background: "#e63946",
                color: "#fff",
                padding: "6px 16px",
                fontFamily: "Space Mono, monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                transform: "rotate(3deg)",
              }}
            >
              EST. 2022 🍕
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3: WHY WE EXIST
      ═══════════════════════════════════════════════ */}

      <section style={{
        padding: "clamp(4rem, 10vw, 8rem) 0",
        background: "linear-gradient(180deg, #fffdf5 0%, #fff8f0 100%)",
        position: "relative",
        overflow: "hidden",
      }}>


        <ChapterDivider chapter={CHAPTERS[1]} />

        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 5rem)",
        }}>
          {/* Central quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              textAlign: "center",
              marginBottom: "clamp(3rem, 6vw, 5rem)",
              maxWidth: "700px",
              margin: "0 auto clamp(3rem, 6vw, 5rem)",
            }}
          >
            <div style={{
              fontFamily: "Pacifico, cursive",
              fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
              color: "#e63946",
              marginBottom: "1rem",
              lineHeight: 1.5,
            }}>
              &ldquo;We didn&apos;t build Pizza Planet to be the biggest.
              We built it to be the warmest.&rdquo;
            </div>
            <div style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "0.6rem",
              color: "#999",
              letterSpacing: "0.15em",
            }}>
              — THE FOUNDERS
            </div>
          </motion.div>

          {/* Values cards — stitched paper style */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(1.5rem, 3vw, 2.5rem)",
          }}>
            {VALUES.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(244, 162, 97, 0.12)" }}
                style={{
                  background: "#fff",
                  border: "1px solid #e8e0d8",
                  padding: "clamp(1.5rem, 3vw, 2rem)",
                  position: "relative",
                  transition: "all 0.3s",
                }}
              >
                {/* Tape effect */}
                <div style={{
                  position: "absolute",
                  top: "-6px",
                  left: "50%",
                  transform: "translateX(-50%) rotate(-2deg)",
                  width: "60px",
                  height: "14px",
                  background: "rgba(244, 162, 97, 0.2)",
                  borderRadius: "2px",
                }} />

                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "2rem" }}>{val.emoji}</span>
                </div>

                <h4 style={{
                  fontFamily: "Righteous, sans-serif",
                  fontSize: "clamp(1.1rem, 1.8vw, 1.3rem)",
                  color: "#2d2d2d",
                  marginBottom: "0.8rem",
                  letterSpacing: "-0.01em",
                }}>{val.title}</h4>

                <p style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
                  lineHeight: 1.7,
                  color: "#6b6b6b",
                }}>{val.desc}</p>


              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 4: CULTURAL CONNECTION
      ═══════════════════════════════════════════════ */}
      <section style={{
        padding: "clamp(4rem, 10vw, 8rem) 0",
        position: "relative",
        overflow: "hidden",
      }}>
        <ChapterDivider chapter={CHAPTERS[2]} />

        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 5rem)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "clamp(3rem, 6vw, 6rem)",
          alignItems: "center",
        }}>           {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            style={{ position: "relative", order: 2 }}
          >
            <div style={{
              border: "2px solid #e8e0d8",
              overflow: "hidden",
              position: "relative",
            }}>
              <Image
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85"
                alt="Pizza Planet — where pizza meets great hospitality"
                width={800}
                height={600}
                style={{ width: "100%", height: "auto", display: "block" }}
                unoptimized
              />

            </div>
          </motion.div>

          {/* Right: Values narrative */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ order: 1 }}
          >
            <p style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)",
              lineHeight: 1.85,
              color: "#6b6b6b",
              marginBottom: "1.5rem",
            }}>
              Food is never just fuel. It&apos;s a language. When a neighbour brings
              over food, it&apos;s not about the dish — it&apos;s about saying{" "}
              <em style={{ color: "#2d2d2d" }}>&ldquo;I care about you.&rdquo;</em> When a mother
              makes momo for the family, every fold carries love.
            </p>

            <p style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
              lineHeight: 1.85,
              color: "#6b6b6b",
              marginBottom: "1.5rem",
            }}>
              At Pizza Planet, we carry that same spirit into every pizza we make. The dough is
              stretched by hand — not by machine — because <strong style={{ color: "#2d2d2d" }}>the
              human touch matters.</strong> The sauce is simmered with patience. The cheese is pulled
              fresh. Because we don&apos;t rush the things that matter.
            </p>

            <p style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
              lineHeight: 1.85,
              color: "#6b6b6b",
              marginBottom: "2rem",
            }}>
              We&apos;re not trying to be Italy. We&apos;re trying to be{" "}
              <strong style={{ color: "#e63946" }}>the home of pizza</strong> — a place where
              quality, warmth, and togetherness come together on a single plate.
            </p>

            {/* Cultural quote cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {QUOTES.map((q, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                  style={{
                    padding: "1.2rem 1.5rem",
                    borderLeft: "3px solid #f4a261",
                    background: "rgba(244, 162, 97, 0.04)",
                  }}
                >
                  <div style={{
                    fontFamily: "Pacifico, cursive",
                    fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                    color: "#e63946",
                    marginBottom: "0.3rem",
                  }}>
                    {q.text}
                  </div>
                  <div style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "0.6rem",
                    color: "#f4a261",
                    letterSpacing: "0.08em",
                    marginBottom: "0.3rem",
                  }}>
                    {q.translation}
                  </div>
                  <div style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.85rem",
                    color: "#999",
                    lineHeight: 1.5,
                  }}>
                    {q.context}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 5: OUR JOURNEY — TIMELINE
      ═══════════════════════════════════════════════ */}

      <section style={{
        padding: "clamp(4rem, 10vw, 8rem) 0",
        background: "linear-gradient(180deg, #fff8f0 0%, #fffdf5 100%)",
        position: "relative",
        overflow: "hidden",
      }}>
        <ChapterDivider chapter={CHAPTERS[3]} />

        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 5rem)",
          position: "relative",
        }}>
          {/* Vertical timeline line */}
          <div style={{
            position: "absolute",
            left: "clamp(1.5rem, 5vw, 5rem)",
            top: 0,
            bottom: 0,
            width: "2px",
            background: "linear-gradient(180deg, #e63946, #f4a261, #e63946)",
            opacity: 0.3,
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(2rem, 5vw, 4rem)" }}>
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  display: "flex",
                  gap: "clamp(1.5rem, 3vw, 2.5rem)",
                  alignItems: "flex-start",
                  paddingLeft: "clamp(2.5rem, 6vw, 4.5rem)",
                  position: "relative",
                }}
              >
                {/* Timeline dot */}
                <div style={{
                  position: "absolute",
                  left: "clamp(0.3rem, 1vw, 0.6rem)",
                  top: "8px",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "#f4a261",
                  border: "3px solid #fff8f0",
                  boxShadow: "0 0 0 2px #f4a261",
                  zIndex: 1,
                }} />

                {/* Content card */}
                <div style={{
                  flex: 1,
                  background: "#fff",
                  border: "1px solid #e8e0d8",
                  padding: "clamp(1.2rem, 2.5vw, 1.8rem)",
                  position: "relative",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.6rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>{m.emoji}</span>
                    <div style={{
                      fontFamily: "Space Mono, monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      color: "#e63946",
                      border: "1px solid #e63946",
                      padding: "2px 10px",
                    }}>
                      {m.year}
                    </div>
                  </div>

                  <h4 style={{
                    fontFamily: "Righteous, sans-serif",
                    fontSize: "clamp(1.1rem, 1.8vw, 1.3rem)",
                    color: "#2d2d2d",
                    marginBottom: "0.5rem",
                    letterSpacing: "-0.01em",
                  }}>{m.title}</h4>

                  <p style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
                    lineHeight: 1.7,
                    color: "#6b6b6b",
                  }}>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 6: STATS + CTA
      ═══════════════════════════════════════════════ */}
      <section style={{
        padding: "clamp(4rem, 8vw, 6rem) 0",
        background: "#2d2d2d",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative pizza slices */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <span style={{
            position: "absolute", top: "20%", left: "5%",
            fontSize: "4rem", opacity: 0.05,
            animation: "float 6s ease-in-out infinite",
          }}>🍕</span>
          <span style={{
            position: "absolute", bottom: "15%", right: "8%",
            fontSize: "3rem", opacity: 0.04,
            animation: "float-slow 7s ease-in-out infinite",
          }}>🧀</span>
        </div>

        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 5rem)",
          position: "relative",
          zIndex: 1,
        }}>
          {/* Stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "1px",
            marginBottom: "clamp(3rem, 6vw, 5rem)",
          }}>
            {[
              { num: "2022", label: "YEAR ESTABLISHED", emoji: "🌱" },
              { num: "5", label: "LOCATIONS", emoji: "📍" },
              { num: "50K+", label: "HAPPY SLICES", emoji: "😊" },
              { num: "100%", label: "MADE WITH LOVE", emoji: "❤️" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{
                  padding: "2.5rem 1.5rem",
                  textAlign: "center",
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{stat.emoji}</div>
                <div style={{
                  fontFamily: "Righteous, sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "#f4a261",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}>{stat.num}</div>
                <div style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.5)",
                }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center" }}
          >
            <h3 style={{
              fontFamily: "Righteous, sans-serif",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              color: "#fff",
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
            }}>
              Come Be Part of Our Story
            </h3>
            <p style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "500px",
              margin: "0 auto 2rem",
              lineHeight: 1.7,
            }}>
              Every slice is an invitation. Every visit is a chapter.
              Come write your story with us.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/menu" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1rem 2.5rem",
                background: "#e63946",
                color: "#fff",
                fontFamily: "Space Mono, monospace",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textDecoration: "none",
                fontWeight: 700,
              }}>🍕 EXPLORE MENU</Link>
              <Link href="/order" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1rem 2.5rem",
                background: "transparent",
                border: "2px solid #f4a261",
                color: "#f4a261",
                fontFamily: "Space Mono, monospace",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textDecoration: "none",
                fontWeight: 700,
              }}>✨ ORDER NOW</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
