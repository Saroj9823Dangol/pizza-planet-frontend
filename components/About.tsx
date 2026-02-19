"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: "#000",
        padding: "clamp(4rem, 12vw, 10rem) clamp(1rem, 5vw, 5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "clamp(4rem, 8vw, 6rem)" }}
        >
          <div
            style={{
              fontFamily: "Righteous, sans-serif",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.4)",
              fontSize: "clamp(1rem, 3vw, 2.5rem)",
              letterSpacing: "0.2em",
              marginBottom: "-0.2em",
            }}
          >
            THE
          </div>
          <div
            style={{
              position: "relative",
              display: "inline-block",
              maxWidth: "100%",
            }}
          >
            <span
              style={{
                fontFamily: "Righteous, sans-serif",
                fontSize: "clamp(2.5rem, 12vw, 11rem)",
                color: "#fff",
                letterSpacing: "-0.02em",
                lineHeight: 0.85,
                wordBreak: "break-word",
              }}
            >
              OUR STORY.
            </span>

            <div
              style={{
                width: "60%",
                height: "4px",
                background: "#FF3C3C",
                marginTop: "10px",
              }}
            />
          </div>
        </motion.div>

        {/* CONTENT GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(3rem, 8vw, 8rem)",
            alignItems: "start",
          }}
        >
          {/* TEXT BLOCK */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: "flex", gap: "1.5rem" }}
          >
            <div
              style={{ width: "1px", background: "#FF3C3C", flexShrink: 0 }}
            />
            <div>
              <p style={paragraphStyle}>
                Everything begins with the dough. We focus on a 48-hour cold
                fermentation process, using only stone-ground flour and
                artisanal yeast. This patient process yields a crust unlike any
                other.
              </p>
              <p style={paragraphStyle}>
                Pizza Planet is more than just a pizzeria. We source San Marzano
                tomatoes directly from Italy and local buffalo mozzarella,
                baking them at high heat for that perfect, spotted char.
              </p>

              <div style={quoteStyle}>
                <svg
                  style={quoteSvgStyle}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <rect
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    fill="none"
                    stroke="rgba(255,184,48,0.2)"
                    strokeWidth="0.5"
                    strokeDasharray="5 5"
                  />
                </svg>
                <p
                  style={{
                    fontFamily: "Pacifico, cursive",
                    fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
                    color: "#FFB830",
                    lineHeight: 1.5,
                    position: "relative",
                    zIndex: 1,
                    margin: 0,
                  }}
                >
                  &ldquo;A crust so light it defies expectations.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>

          {/* IMAGE BLOCK - SHARP EDGES */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=85"
              alt="Artisanal Pizza Baking"
              width={800}
              height={800}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "cover",
                borderRadius: "0px",
              }}
              unoptimized
            />
          </motion.div>
        </div>

        {/* STATS AREA */}
        <div
          style={{
            marginTop: "clamp(5rem, 10vw, 8rem)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2px",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          {[
            { num: "48H", label: "FERMENTATION" },
            { num: "800°", label: "WOOD-FIRED TEMP" },
            { num: "100%", label: "CHEF-MADE" },
          ].map((stat, i) => (
            <div key={i} style={statCardStyle}>
              <div
                style={{
                  fontFamily: "Righteous, sans-serif",
                  fontSize: "clamp(3rem, 6vw, 6rem)",
                  color: "#FFB830",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2rem",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const paragraphStyle: React.CSSProperties = {
  fontFamily: "DM Sans, sans-serif",
  fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
  lineHeight: 1.8,
  color: "rgba(255,255,255,0.7)",
  marginBottom: "2rem",
};

const quoteStyle: React.CSSProperties = {
  position: "relative",
  padding: "2.5rem",
  marginTop: "3.5rem",
};

const quoteSvgStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
};

const statCardStyle: React.CSSProperties = {
  padding: "3rem 2rem",
  textAlign: "center",
  background: "#000",
  borderRadius: "0px",
};
