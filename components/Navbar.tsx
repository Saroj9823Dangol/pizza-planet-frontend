"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";
import Image from "next/image";

const allLinks = [
  { label: "HOME", href: "#hero" },
  { label: "CHEF MENU", href: "#menu" },
  { label: "THE CRAFT", href: "#about" },
  { label: "ORDER BAKE", href: "#order" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("HOME");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());
  const toggleCart = useCartStore((s) => s.toggleCart);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (label: string, href: string) => {
    setActiveLink(label);
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background:
            scrolled || mobileMenuOpen ? "rgba(0,0,0,0.95)" : "transparent",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid transparent",
          padding: "0 clamp(1rem, 4vw, 3rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* MOBILE LEFT: HAMBURGER */}
        <div className="mobile-only" style={{ display: "none", flex: 1 }}>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "none",
              border: "none",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "2px",
                background: "#fff",
                marginBottom: "8px",
                transform: mobileMenuOpen
                  ? "rotate(45deg) translate(6px, 6px)"
                  : "none",
                transition: "0.3s",
              }}
            />
            <div
              style={{
                width: "28px",
                height: "2px",
                background: "#fff",
                marginBottom: "8px",
                opacity: mobileMenuOpen ? 0 : 1,
                transition: "0.3s",
              }}
            />
            <div
              style={{
                width: "28px",
                height: "2px",
                background: "#fff",
                transform: mobileMenuOpen
                  ? "rotate(-45deg) translate(5px, -6px)"
                  : "none",
                transition: "0.3s",
              }}
            />
          </button>
        </div>

        {/* DESKTOP LEFT: LINKS */}
        <div className="desktop-only" style={{ flex: 1 }}>
          <ul
            style={{
              display: "flex",
              gap: "3rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {allLinks.slice(0, 2).map(({ label, href }) => (
              <li key={label}>
                <button
                  onClick={() => handleNavClick(label, href)}
                  style={navButtonStyle(activeLink === label)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* CENTER: LOGO */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            cursor: "pointer",
            justifyContent: "center",
          }}
          onClick={() => handleNavClick("HOME", "#hero")}
        >
          <span className="desktop-only" style={logoTextStyle}>
            PIZZA
          </span>
          <Image
            src="/logo/logo.jpg"
            alt="Logo"
            height={100}
            width={100}
            style={{ objectFit: "cover" }}
            priority
          />
          <span className="desktop-only" style={logoTextStyle}>
            PLANET
          </span>
        </div>

        {/* DESKTOP RIGHT: LINKS */}
        <div
          className="desktop-only"
          style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
        >
          <ul
            style={{
              display: "flex",
              gap: "3rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {allLinks.slice(2).map(({ label, href }) => (
              <li key={label}>
                <button
                  onClick={() => handleNavClick(label, href)}
                  style={navButtonStyle(activeLink === label)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* MOBILE RIGHT CLEARANCE */}
        <div className="mobile-only" style={{ display: "none", flex: 1 }} />

        {/* MOBILE OVERLAY */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={mobileOverlayStyle}
            >
              {allLinks.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => handleNavClick(label, href)}
                  style={mobileLinkStyle}
                >
                  {label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx global>{`
          @media (max-width: 1024px) {
            .desktop-only {
              display: none !important;
            }
            .mobile-only {
              display: block !important;
            }
          }
        `}</style>
      </nav>

      {/* FLOATING CART BUTTON */}
      <motion.button
        onClick={toggleCart}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={floatingCartStyle}
      >
        <div style={{ position: "relative" }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                style={floatingBadgeStyle}
              >
                {itemCount}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </>
  );
}

const navButtonStyle = (active: boolean): React.CSSProperties => ({
  background: "none",
  border: "none",
  cursor: "pointer",
  fontFamily: "Space Mono, monospace",
  fontSize: "0.75rem",
  letterSpacing: "0.3rem",
  color: active ? "#FFB830" : "rgba(255,255,255,0.7)",
  padding: "12px 0",
  transition: "color 0.2s",
  borderRadius: "0px",
});

const logoTextStyle: React.CSSProperties = {
  fontFamily: "Righteous, sans-serif",
  fontSize: "1.5rem",
  color: "#fff",
  letterSpacing: "0.1em",
};

const logoWrapperStyle: React.CSSProperties = {
  position: "relative",
  width: "72px",
  height: "72px",
  borderRadius: "50%",
  overflow: "hidden",
  border: "2px solid rgba(255,255,255,0.2)",
};

const floatingCartStyle: React.CSSProperties = {
  position: "fixed",
  top: "120px",
  right: "clamp(1rem, 4vw, 3rem)",
  zIndex: 1100,
  background: "#FFB830",
  width: "64px",
  height: "64px",
  border: "none",
  borderRadius: "0px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
};

const floatingBadgeStyle: React.CSSProperties = {
  position: "absolute",
  top: "-12px",
  right: "-12px",
  background: "#FF3C3C",
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.7rem",
  color: "#fff",
  fontFamily: "Space Mono, monospace",
  fontWeight: 700,
  border: "2px solid #FFB830",
};

const mobileOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: "100px",
  left: 0,
  width: "100%",
  bottom: 0,
  background: "#000",
  padding: "10vh 2.5rem",
  display: "flex",
  flexDirection: "column",
  gap: "3rem",
  zIndex: 999,
};

const mobileLinkStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#fff",
  fontSize: "3.5rem",
  fontFamily: "Righteous, sans-serif",
  textAlign: "left",
  padding: 0,
  letterSpacing: "-0.02em",
};
