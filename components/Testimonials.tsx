"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="testimonials"
      ref={ref}
      style={{
        background: "#0a0a0a",
        padding: "clamp(5rem, 15vw, 12rem) clamp(1rem, 5vw, 5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}
      >
        {/* Editorial Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            marginBottom: "clamp(5rem, 12vw, 10rem)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "0.7rem",
              letterSpacing: "clamp(0.1rem, 2vw, 0.6em)",
              color: "#FF3C3C",
              marginBottom: "1rem",
              textTransform: "uppercase",
            }}
          >
            RECOGNIZED FOR THE CRUST
          </div>

          <h2
            style={{
              fontFamily: "Righteous, sans-serif",
              fontSize: "clamp(2.5rem, 12vw, 12rem)",
              color: "#fff",
              lineHeight: 0.8,
              margin: 0,
              letterSpacing: "-0.04em",
              wordBreak: "break-word",
            }}
          >
            EATER&apos;S <br /> <span style={{ color: "#FFB830" }}>TAB.</span>
          </h2>
        </motion.div>

        {/* Staggered Bespoke Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: " clamp(2rem, 5vw, 6rem)",
            alignItems: "start",
          }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              style={{
                ...cardStyle,
                marginTop: i % 2 !== 0 ? "clamp(0px, 10vw, 100px)" : "0px",
              }}
            >
              <div style={starContainer}>
                {[...Array(5)].map((_, si) => (
                  <span
                    key={si}
                    style={{ color: "#FFB830", fontSize: "0.9rem" }}
                  >
                    ★
                  </span>
                ))}
              </div>

              <div
                style={{
                  height: "2px",
                  width: "30px",
                  background: "#FF3C3C",
                  margin: "1.5rem 0",
                }}
              />

              <p style={reviewTextStyle}>&ldquo;{t.review}&rdquo;</p>

              <div
                style={{
                  marginTop: "3rem",
                  borderLeft: "1px solid rgba(255,184,48,0.3)",
                  paddingLeft: "1.5rem",
                }}
              >
                <div style={nameStyle}>{t.name}</div>
                <div style={locationStyle}>
                  {t.location
                    .replace("Sector", "Region")
                    .replace("Planet", "City")}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const cardStyle: React.CSSProperties = {
  background: "#000",
  padding: "3rem 2.5rem",
  borderRadius: "0px",
  border: "1px solid rgba(255,255,255,0.06)",
  display: "flex",
  flexDirection: "column",
  position: "relative",
};

const starContainer: React.CSSProperties = {
  display: "flex",
  gap: "6px",
};

const reviewTextStyle: React.CSSProperties = {
  fontFamily: "DM Sans, sans-serif",
  fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)",
  lineHeight: 1.7,
  color: "rgba(255,255,255,0.85)",
  margin: 0,
  fontStyle: "italic",
};

const nameStyle: React.CSSProperties = {
  fontFamily: "Righteous, sans-serif",
  fontSize: "1.2rem",
  color: "#fff",
  letterSpacing: "0.02em",
};

const locationStyle: React.CSSProperties = {
  fontFamily: "Space Mono, monospace",
  fontSize: "0.65rem",
  color: "rgba(255,184,48,0.6)",
  letterSpacing: "0.15em",
  marginTop: "4px",
};
