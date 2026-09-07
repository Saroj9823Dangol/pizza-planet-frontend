"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";
import Link from "next/link";
import { usePathname } from "next/navigation";

const allLinks = [
  { label: "Menu", href: "/menu", emoji: "🍕" },
  { label: "Our Story", href: "/about", emoji: "📖" },
  { label: "Order", href: "/order", emoji: "✨" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());
  const toggleCart = useCartStore((s) => s.toggleCart);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled || mobileMenuOpen ? "rgba(255,248,240,0.98)" : "transparent",
        borderBottom: scrolled ? "1px solid #e8e0d8" : "1px solid transparent",
        padding: "0 clamp(1rem, 4vw, 3rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.3s",
        height: "72px",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}>
        {/* Mobile hamburger */}
        <div className="mobile-only" style={{ display: "none" }}>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: "none", border: "none", padding: "10px", cursor: "pointer" }}>
            <div style={{
              width: "24px", height: "2px", background: "#2d2d2d",
              marginBottom: "6px", transition: "0.3s",
              transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }} />
            <div style={{
              width: "24px", height: "2px", background: "#2d2d2d",
              marginBottom: "6px", opacity: mobileMenuOpen ? 0 : 1, transition: "0.3s",
            }} />
            <div style={{
              width: "24px", height: "2px", background: "#2d2d2d",
              transition: "0.3s",
              transform: mobileMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }} />
          </button>
        </div>

        {/* Left: Logo */}
        <Link href="/" style={{
          display: "flex", alignItems: "center", gap: "0.8rem", textDecoration: "none",
        }}>
          <div style={{
            width: "38px", height: "38px", borderRadius: "50%",
            background: "linear-gradient(135deg, #e63946, #f4a261)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontFamily: "Righteous, sans-serif", fontSize: "1.2rem",
            boxShadow: "0 2px 10px rgba(230, 57, 70, 0.3)",
          }}>P</div>
          <span style={{
            fontFamily: "Righteous, sans-serif",
            fontSize: "1.3rem",
            color: "#2d2d2d",
            letterSpacing: "0.02em",
          }}>
            Pizza<span style={{ color: "#e63946" }}>Planet</span>
          </span>
        </Link>

        {/* Center: Nav links (desktop) */}
        <div className="desktop-only" style={{
          display: "flex", alignItems: "center", gap: "2rem",
        }}>
          {allLinks.map(({ label, href, emoji }) => (
            <Link key={href} href={href} style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              color: pathname === href ? "#e63946" : "#6b6b6b",
              textDecoration: "none",
              padding: "8px 0",
              transition: "color 0.2s",
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}>
              <span style={{ fontSize: "0.9rem" }}>{emoji}</span>
              {label.toUpperCase()}
              {pathname === href && (
                <motion.div layoutId="nav-active" style={{
                  position: "absolute",
                  bottom: 0, left: 0, right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg, #e63946, #f4a261)",
                  borderRadius: "1px",
                }} />
              )}
            </Link>
          ))}
        </div>

        {/* Right: Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <motion.button onClick={toggleCart}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            style={{
              background: "none", border: "1px solid #e8e0d8", borderRadius: "50%",
              width: "40px", height: "40px", display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer", position: "relative",
              transition: "all 0.3s",
            }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2d2d2d"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {itemCount > 0 && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                style={{
                  position: "absolute", top: "-4px", right: "-4px",
                  background: "linear-gradient(135deg, #e63946, #f4a261)",
                  width: "18px", height: "18px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.55rem", color: "#fff",
                  fontFamily: "Space Mono, monospace", fontWeight: 700,
                }}>
                {itemCount}
              </motion.span>
            )}
          </motion.button>
        </div>

        {/* Mobile overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                position: "fixed", top: "72px", left: 0, width: "100%", bottom: 0,
                background: "#fff8f0", padding: "3rem 2rem",
                display: "flex", flexDirection: "column", gap: "2rem", zIndex: 999,
              }}>
              {[{ label: "Home", href: "/", emoji: "🏠" }, ...allLinks].map(({ label, href, emoji }) => (
                <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: "Righteous, sans-serif", fontSize: "2rem",
                    color: pathname === href ? "#e63946" : "#2d2d2d",
                    textDecoration: "none", letterSpacing: "-0.02em",
                    cursor: "pointer", display: "flex", alignItems: "center", gap: "0.8rem",
                  }}>
                  <span>{emoji}</span>
                  {label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx global>{`
          @media (max-width: 1024px) { .desktop-only { display: none !important; } }
          @media (min-width: 1025px) { .mobile-only { display: none !important; } }
        `}</style>
      </nav>
    </>
  );
}
