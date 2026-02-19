"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { menuItems, MenuCategory } from "@/lib/data";
import { useCartStore } from "@/lib/store";

const categories: { label: string; value: MenuCategory }[] = [
  { label: "ALL BAKES", value: "All" },
  { label: "CLASSIC DOUGH", value: "Classic" },
  { label: "SIGNATURE PIZZAS", value: "Signature" },
  { label: "VEGAN CRAFT", value: "Vegan" },
  { label: "EXTRAS", value: "Sides" },
  { label: "BREWS", value: "Drinks" },
];

export default function Menu() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [active, setActive] = useState<MenuCategory>("All");
  const addItem = useCartStore((s) => s.addItem);

  const filtered =
    active === "All"
      ? menuItems
      : menuItems.filter((m) => m.category === active);

  return (
    <section
      id="menu"
      ref={ref}
      style={{
        background: "#000",
        padding: "0 0 clamp(5rem, 15vw, 12rem)",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1800px",
          margin: "0 auto",
          padding: "0 clamp(1rem, 5vw, 5rem)",
        }}
      >
        {/* Header - Huge & Aggressive */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ padding: "10rem 0 6rem" }}
        >
          <h2 style={titleStyle}>
            OUR <br />
            <span style={{ color: "#FFB830" }}>MENU.</span>
          </h2>
        </motion.div>

        {/* Sticky Filter Bar - Redesigned to be ultra-minimal */}
        <div style={stickyNavContainer}>
          <div style={catContainerStyle} className="no-scrollbar">
            {categories.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setActive(value)}
                style={catButtonStyle(active === value)}
              >
                {active === value && (
                  <motion.span layoutId="activeCat" style={activeLine} />
                )}
                <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* The Exhibition Grid - Full Screen Impact */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={gridStyle}
          >
            {filtered.map((item, i) => (
              <MenuExhibitionCard
                key={item.id}
                item={item}
                onAdd={() =>
                  addItem({ id: item.id, name: item.name, price: item.price })
                }
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function MenuExhibitionCard({ item, onAdd }: { item: any; onAdd: () => void }) {
  const [added, setAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = () => {
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={cardStyle}
    >
      {/* FULL BLEED IMAGE BLOCK */}
      <div style={imageWrapperStyle}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          style={{
            objectFit: "cover",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          unoptimized
        />

        {/* Hover Details Overlay */}
        <div
          style={{
            ...hoverOverlayStyle,
            opacity: isHovered ? 1 : 0,
          }}
        >
          <div style={overlayQuote}>“FRESH & HOT.”</div>
          <button onClick={handleAdd} style={addButtonStyle(added)}>
            {added ? "✓ ADDED" : "ADD TO CART"}
          </button>
        </div>

        {/* Technical Label - Bottom Left */}
        <div style={technicalLabelStyle}>
          <div
            style={{ fontSize: "1.2rem", fontFamily: "Righteous, sans-serif" }}
          >
            Rs. {item.price}
          </div>
        </div>
      </div>

      {/* MINIMALIST INFO BELOW */}
      <div style={infoAreaStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <h3 style={nameStyle}>{item.name.toUpperCase()}</h3>
        </div>
        <p style={descStyle}>{item.description}</p>
      </div>
    </motion.div>
  );
}

const tagStyle: React.CSSProperties = {
  fontFamily: "Space Mono, monospace",
  fontSize: "0.75rem",
  letterSpacing: "clamp(0.2rem, 3vw, 0.8rem)",
  color: "#FF3C3C",
  marginBottom: "1rem",
  textTransform: "uppercase",
  overflowWrap: "anywhere",
};

const titleStyle: React.CSSProperties = {
  fontFamily: "Righteous, sans-serif",
  fontSize: "clamp(2.2rem, 12vw, 12rem)",
  color: "#fff",
  lineHeight: 0.8,
  margin: 0,
  letterSpacing: "-0.04em",
  wordBreak: "break-word",
  overflowWrap: "break-word",
};

const stickyNavContainer: React.CSSProperties = {
  position: "sticky",
  top: "100px",
  zIndex: 100,
  background: "rgba(0,0,0,0.95)",
  backdropFilter: "blur(20px)",
  padding: "0.5rem 0",
  marginBottom: "6rem",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
};

const catContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: "clamp(1.5rem, 4vw, 4rem)",
  overflowX: "auto",
  paddingBottom: "1rem",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
};

const activeLine: React.CSSProperties = {
  position: "absolute",
  bottom: "-1rem",
  left: 0,
  right: 0,
  height: "2px",
  background: "#FFB830",
};

const catButtonStyle = (active: boolean): React.CSSProperties => ({
  background: "transparent",
  border: "none",
  fontFamily: "Space Mono, monospace",
  fontSize: "0.8rem",
  letterSpacing: "0.2em",
  color: active ? "#fff" : "rgba(255,255,255,0.3)",
  padding: "0.5rem 0",
  cursor: "pointer",
  transition: "color 0.3s",
  position: "relative",
  whiteSpace: "nowrap",
});

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 400px), 1fr))",
  gap: "clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 4rem)",
};

const cardStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const imageWrapperStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  aspectRatio: "1/1.2", // Slightly vertical for high fashion look
  overflow: "hidden",
  background: "#111",
  marginBottom: "2rem",
};

const hoverOverlayStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "3rem",
  transition: "opacity 0.4s",
  zIndex: 5,
};

const overlayQuote: React.CSSProperties = {
  fontFamily: "Righteous, sans-serif",
  fontSize: "2rem",
  color: "#FFB830",
  textAlign: "center",
  marginBottom: "2rem",
};

const technicalLabelStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "clamp(1rem, 5vw, 2rem)",
  left: "clamp(1rem, 5vw, 2rem)",
  background: "#fff",
  color: "#000",
  padding: "clamp(0.5rem, 2vw, 1rem) clamp(0.75rem, 3vw, 1.5rem)",
  zIndex: 10,
  fontFamily: "Space Mono, monospace",
};

const infoAreaStyle: React.CSSProperties = {
  padding: "0 0.5rem",
};

const nameStyle: React.CSSProperties = {
  fontFamily: "Righteous, sans-serif",
  fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
  color: "#fff",
  margin: "0 0 1rem 0",
  letterSpacing: "-0.01em",
  lineHeight: 1,
};

const descStyle: React.CSSProperties = {
  fontFamily: "DM Sans, sans-serif",
  fontSize: "1.1rem",
  color: "rgba(255,255,255,0.4)",
  lineHeight: 1.6,
  margin: 0,
  maxWidth: "500px",
};

const houseFavStyle: React.CSSProperties = {
  fontFamily: "Space Mono, monospace",
  fontSize: "0.7rem",
  color: "#FF3C3C",
  letterSpacing: "0.1em",
  marginTop: "1.2rem",
};

const addButtonStyle = (added: boolean): React.CSSProperties => ({
  background: added ? "#22AA44" : "#FF3C3C",
  border: "none",
  color: "#fff",
  padding: "1.2rem 2.5rem",
  fontFamily: "Space Mono, monospace",
  fontSize: "0.9rem",
  fontWeight: 700,
  letterSpacing: "0.2em",
  cursor: "pointer",
  transition: "all 0.3s",
});
