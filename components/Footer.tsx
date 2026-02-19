"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer style={footerStyle}>
      {/* 01. THE GRAND MARQUEE - ARCHIVE STRIP */}
      <div style={marqueeWrapper}>
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={marqueeContent}
        >
          {Array(10)
            .fill("HANDMADE IN KATHMANDU // AUTHENTIC WOOD FIRED // ")
            .map((text, i) => (
              <span key={i} style={marqueeText}>
                {text}
              </span>
            ))}
        </motion.div>
      </div>

      <div style={contentWrapperStyle}>
        {/* 02. CORE MANIFESTO GRID */}
        <div style={mainGrid}>
          {/* Left Column: Huge Branding */}
          <div style={brandingCol}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={tagLabel}>[ OUR STORY ]</div>
              <h2 style={massiveTitleStyle}>
                BEST <br />
                PIZZA <br />
                <span style={{ color: "#FF3C3C" }}>IN TOWN.</span>
              </h2>
            </motion.div>
          </div>

          {/* Right Column: Info & Links */}
          <div style={infoContentWrapper}>
            <div style={manifestoTextWrapper}>
              <p style={manifestoPara}>
                WE FOCUS ON TRADITIONAL DOUGH PREPARATION AND HIGH QUALITY
                INGREDIENTS. EVERY PIZZA IS CRAFTED WITH CARE AND BAKED TO
                PERFECTION.
              </p>
            </div>

            {/* Asymmetrical Link Grid */}
            <div style={linksGrid}>
              <div style={linkCol}>
                <h4 style={colTitleStyle}>NAVIGATE</h4>
                <div style={navGroup}>
                  {["INDEX", "MANIFESTO", "CRAFT", "TRAY"].map((l) => (
                    <motion.a
                      key={l}
                      href="#"
                      whileHover={{ x: 10, color: "#FFB830" }}
                      style={navLinkStyle}
                    >
                      {l}
                    </motion.a>
                  ))}
                </div>
              </div>

              <div style={linkCol}>
                <h4 style={colTitleStyle}>CONNECT</h4>
                <div style={navGroup}>
                  {["INSTAGRAM", "TIKTOK", "ARCHIVE"].map((l) => (
                    <motion.a
                      key={l}
                      href="#"
                      whileHover={{ x: 10, color: "#FFB830" }}
                      style={navLinkStyle}
                    >
                      {l}
                    </motion.a>
                  ))}
                </div>
              </div>

              <div style={linkCol}>
                <h4 style={colTitleStyle}>LOCALE</h4>
                <div style={localeText}>
                  124 DOUGH LANE
                  <br />
                  KATHMANDU, NEPAL
                  <br />
                  +977 1 4XXXXXX
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 03. SYSTEM STATUS - THE TERMINAL BAR */}
        <div style={terminalBar}>
          <div style={terminalLeft}>
            <div style={pulseDot} />
            <span style={systemStatusText}>OPEN NOW</span>
          </div>
          <div style={terminalRight}>
            <span style={terminalTime}>HOURS: 11:00 AM — 11:00 PM</span>
          </div>
        </div>

        {/* 04. FOOTER BASE */}
        <div style={footerBase}>
          <div style={copyrightWrapper}>
            <Image
              src="/logo/logo.jpg"
              alt="Logo"
              width={64}
              height={64}
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
            <span style={copyText}>
              © 2024 PIZZA PLANET. ALL RIGHTS RESERVED.
            </span>
          </div>
          <div style={legalText}>FRESHLY BAKED DAILY IN KATHMANDU.</div>
        </div>
      </div>
    </footer>
  );
}

const footerStyle: React.CSSProperties = {
  background: "#000",
  color: "#fff",
  padding: "0 0 4rem",
  borderTop: "1px solid #fff",
  position: "relative",
  overflow: "hidden",
};

const marqueeWrapper: React.CSSProperties = {
  background: "#FFB830",
  padding: "1.5rem 0",
  overflow: "hidden",
  whiteSpace: "nowrap",
  borderBottom: "1px solid #000",
  marginBottom: "clamp(5rem, 10vw, 8rem)",
};

const marqueeContent: React.CSSProperties = {
  display: "flex",
  width: "max-content",
};

const marqueeText: React.CSSProperties = {
  fontFamily: "Space Mono, monospace",
  fontSize: "0.9rem",
  fontWeight: 700,
  color: "#000",
  letterSpacing: "0.2em",
  paddingRight: "2rem",
};

const contentWrapperStyle: React.CSSProperties = {
  maxWidth: "1800px",
  margin: "0 auto",
  padding: "0 clamp(1.5rem, 5vw, 5rem)",
};

const mainGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 600px), 1fr))",
  gap: "clamp(4rem, 10vw, 10rem)",
  marginBottom: "8rem",
};

const brandingCol: React.CSSProperties = {
  borderLeft: "4px solid #FF3C3C",
  paddingLeft: "clamp(1.5rem, 4vw, 3rem)",
};

const tagLabel: React.CSSProperties = {
  fontFamily: "Space Mono, monospace",
  fontSize: "0.75rem",
  color: "#FF3C3C",
  letterSpacing: "0.4rem",
  marginBottom: "2rem",
};

const massiveTitleStyle: React.CSSProperties = {
  fontFamily: "Righteous, sans-serif",
  fontSize: "clamp(3.5rem, 15vw, 14rem)",
  lineHeight: 0.8,
  margin: 0,
  letterSpacing: "-0.04em",
};

const infoContentWrapper: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const manifestoTextWrapper: React.CSSProperties = {
  maxWidth: "700px",
  marginBottom: "6rem",
};

const manifestoPara: React.CSSProperties = {
  fontFamily: "DM Sans, sans-serif",
  fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
  lineHeight: 1.4,
  color: "rgba(255,255,255,0.7)",
  margin: 0,
};

const linksGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "3rem",
};

const linkCol: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const colTitleStyle: React.CSSProperties = {
  fontFamily: "Space Mono, monospace",
  fontSize: "0.65rem",
  color: "rgba(255,255,255,0.3)",
  letterSpacing: "0.3rem",
  marginBottom: "2.5rem",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  paddingBottom: "1.2rem",
};

const navGroup: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
};

const navLinkStyle: React.CSSProperties = {
  fontFamily: "Righteous, sans-serif",
  fontSize: "1.2rem",
  color: "#fff",
  textDecoration: "none",
  letterSpacing: "0.05em",
  transition: "all 0.3s",
};

const localeText: React.CSSProperties = {
  fontFamily: "Space Mono, monospace",
  fontSize: "0.85rem",
  lineHeight: 2,
  color: "rgba(255,255,255,0.5)",
  letterSpacing: "0.05em",
};

const terminalBar: React.CSSProperties = {
  background: "#111",
  padding: "1.5rem clamp(1.5rem, 4vw, 3rem)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid rgba(255,255,255,0.1)",
  marginBottom: "4rem",
};

const terminalLeft: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

const pulseDot: React.CSSProperties = {
  width: "8px",
  height: "8px",
  background: "#22FF77",
  borderRadius: "50%",
  boxShadow: "0 0 10px #22FF77",
};

const systemStatusText: React.CSSProperties = {
  fontFamily: "Space Mono, monospace",
  fontSize: "0.7rem",
  color: "#22FF77",
  letterSpacing: "0.2rem",
};

const terminalRight: React.CSSProperties = {
  fontFamily: "Space Mono, monospace",
  fontSize: "0.7rem",
  color: "rgba(255,255,255,0.4)",
  letterSpacing: "0.1rem",
};

const terminalTime: React.CSSProperties = {
  color: "#FFB830",
};

const footerBase: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: "3rem",
  flexWrap: "wrap",
};

const copyrightWrapper: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "2rem",
};

const footerLogoWrapper: React.CSSProperties = {
  position: "relative",
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.2)",
};

const copyText: React.CSSProperties = {
  fontFamily: "Space Mono, monospace",
  fontSize: "0.65rem",
  color: "rgba(255,255,255,0.3)",
  letterSpacing: "0.1rem",
};

const legalText: React.CSSProperties = {
  fontFamily: "Space Mono, monospace",
  fontSize: "0.65rem",
  color: "#FF3C3C",
  letterSpacing: "0.1rem",
  maxWidth: "300px",
  textAlign: "right",
};
