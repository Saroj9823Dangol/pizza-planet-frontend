"use client";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        right: "1.5rem",
        bottom: "1.5rem",
        zIndex: 900,
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: "var(--ink)",
        color: "var(--paper)",
        border: "1.5px solid var(--ink)",
        boxShadow: "4px 4px 0 var(--tomato)",
        cursor: "pointer",
        display: visible ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        fontSize: "1.15rem",
        lineHeight: 1,
        transition: "opacity 0.2s",
      }}
    >
      ↑
    </button>
  );
}