"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems, MenuItem, MenuCategory } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import AddToCartModal from "./AddToCartModal";

const featuredPizzas = menuItems.filter((m) => m.category === "Pizza" && m.bestseller).slice(0, 4);

const categoryHighlights = [
  { label: "Signature Pizzas", emoji: "🍕", category: "Pizza", color: "#e63946" },
  { label: "Fried Chicken & Wings", emoji: "🍗", category: "Chicken Wings", color: "#f4a261" },
  { label: "Pasta", emoji: "🍝", category: "Pasta", color: "#2a9d8f" },
  { label: "Burgers", emoji: "🍔", category: "Burgers", color: "#e76f51" },
  { label: "Appetizers & Breads", emoji: "🥖", category: "Appetizers", color: "#ffd166" },
  { label: "Momo", emoji: "🥟", category: "Momo", color: "#e63946" },
  { label: "Salads", emoji: "🥗", category: "Salads", color: "#2a9d8f" },
  { label: "Coffee", emoji: "☕", category: "Coffee", color: "#f4a261" },
  { label: "Shakes & Mocktails", emoji: "🥤", category: "Shakes", color: "#e76f51" },
];

function PizzaHeroCard({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(244, 162, 97, 0.2)" }}
      style={{
        background: "#fff",
        border: "1px solid #e8e0d8",
        overflow: "hidden",
        cursor: "pointer",
        transition: "box-shadow 0.3s",
        position: "relative",
        minWidth: "300px",
        maxWidth: "340px",
        flexShrink: 0,
      }}
    >
      {/* Image */}
      <div style={{
        position: "relative",
        width: "100%",
        aspectRatio: "4/3",
        overflow: "hidden",
      }}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          style={{ objectFit: "cover" }}
          unoptimized
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 50%)",
        }} />

        {/* Bestseller badge */}
        <div style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          background: "#e63946",
          color: "#fff",
          padding: "4px 12px",
          fontFamily: "Space Mono, monospace",
          fontSize: "0.5rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
        }}>
          ★ BESTSELLER
        </div>

        {/* Price */}
        <div style={{
          position: "absolute",
          bottom: "12px",
          right: "12px",
          background: "#f4a261",
          color: "#fff",
          padding: "5px 14px",
          fontFamily: "Righteous, sans-serif",
          fontSize: "1.1rem",
        }}>
          Rs. {item.sizes ? item.sizes[0].price : item.price}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "1.2rem" }}>
        <h3 style={{
          fontFamily: "Righteous, sans-serif",
          fontSize: "clamp(1.2rem, 2vw, 1.4rem)",
          color: "#2d2d2d",
          margin: 0,
          lineHeight: 1.2,
        }}>{item.name}</h3>
        <p style={{
          fontFamily: "DM Sans, sans-serif",
          fontSize: "0.8rem",
          color: "#999",
          lineHeight: 1.5,
          margin: "0.4rem 0 0.8rem",
        }}>{item.description}</p>

        {/* Sizes */}
        {item.sizes && (
          <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap", marginBottom: "0.8rem" }}>
            {item.sizes.map((s) => (
              <span key={s.label} style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "0.48rem",
                color: "#999",
                background: "#f5f0ea",
                padding: "2px 8px",
              }}>
                {s.label} Rs.{s.price}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); handleAdd(); }}
          style={{
            width: "100%",
            padding: "0.7rem",
            background: added ? "#2a9d8f" : "#2d2d2d",
            color: "#fff",
            border: "none",
            fontFamily: "Space Mono, monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
        >
          {added ? "✓ ADDED" : "+ ADD TO TRAY"}
        </button>
      </div>
    </motion.div>
  );
}

function MenuItemRow({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3 }}
      style={{
        display: "flex",
        gap: "0.8rem",
        alignItems: "center",
        padding: "0.8rem 0",
        borderBottom: "1px solid #f0ece6",
      }}
    >
      {item.image && (
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "6px",
          overflow: "hidden",
          flexShrink: 0,
          position: "relative",
          background: "#f5f0ea",
        }}>
          <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} unoptimized />
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.5rem" }}>
          <h4 style={{
            fontFamily: "Righteous, sans-serif",
            fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
            color: "#2d2d2d",
            margin: 0,
          }}>
            {item.name}
            {item.bestseller && <span style={{ color: "#e63946", fontSize: "0.5rem", marginLeft: "0.3rem" }}>★</span>}
          </h4>
          <span style={{
            fontFamily: "Righteous, sans-serif",
            fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
            color: "#f4a261",
            whiteSpace: "nowrap",
          }}>Rs. {item.price}</span>
        </div>
        <p style={{
          fontFamily: "DM Sans, sans-serif",
          fontSize: "0.75rem",
          color: "#999",
          lineHeight: 1.4,
          margin: "0.15rem 0",
        }}>{item.description}</p>
      </div>
      <button
        onClick={handleAdd}
        style={{
          background: "none",
          border: "none",
          fontFamily: "Space Mono, monospace",
          fontSize: "0.5rem",
          color: added ? "#2a9d8f" : "#e63946",
          cursor: "pointer",
          padding: 0,
          flexShrink: 0,
        }}
      >
        {added ? "✓ ADDED" : "+ ADD"}
      </button>
    </motion.div>
  );
}

export default function Menu() {
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);

  return (
    <section id="menu" style={{
      background: "#fff8f0",
      padding: "0 0 clamp(5rem, 15vw, 12rem)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.04, overflow: "hidden" }}>
        <span style={{
          position: "absolute", top: "8%", right: "5%",
          fontFamily: "Righteous, sans-serif", fontSize: "3rem",
          color: "#e63946", transform: "rotate(-3deg)", whiteSpace: "nowrap",
        }}>PLANET OF CHEESENESS</span>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1rem, 5vw, 5rem)", position: "relative", zIndex: 1 }}>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", padding: "clamp(4rem, 10vw, 10rem) 0 1.5rem" }}
        >
          <div style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            color: "#e63946",
            marginBottom: "0.5rem",
          }}>~ OUR MENU ~</div>
          <h2 style={{
            fontFamily: "Righteous, sans-serif",
            fontSize: "clamp(2rem, 6vw, 4rem)",
            lineHeight: 1,
            margin: 0,
            letterSpacing: "-0.04em",
            backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>MENU</h2>
          <p style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "0.65rem",
            color: "#999",
            letterSpacing: "0.15em",
            marginTop: "1rem",
          }}>──── Something for Everyone ────</p>
        </motion.div>

        {/* ═══ FEATURED PIZZAS CAROUSEL ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "clamp(3rem, 8vw, 5rem)" }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "clamp(1.5rem, 3vw, 2rem)",
          }}>
            <span style={{ fontSize: "1.5rem" }}>🍕</span>
            <div>
              <h3 style={{
                fontFamily: "Righteous, sans-serif",
                fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                color: "#2d2d2d",
                margin: 0,
              }}>Signature Pizzas</h3>
              <div style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "0.5rem",
                color: "#999",
                letterSpacing: "0.1em",
              }}>OUR MOST LOVED</div>
            </div>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #e6394633, transparent)" }} />
          </div>

          {/* Scrollable pizza cards */}
          <div style={{
            display: "flex",
            gap: "1.2rem",
            overflowX: "auto",
            paddingBottom: "1rem",
            scrollSnapType: "x mandatory",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
          className="no-scrollbar"
          >
            {featuredPizzas.map((item) => (
              <div key={item.id} style={{ scrollSnapAlign: "start" }}>
                <PizzaHeroCard item={item} onAdd={() => setModalItem(item)} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ═══ CATEGORY HIGHLIGHTS GRID ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "clamp(3rem, 8vw, 5rem)" }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "clamp(1.5rem, 3vw, 2rem)",
          }}>
            <span style={{ fontSize: "1.5rem" }}>📋</span>
            <div>
              <h3 style={{
                fontFamily: "Righteous, sans-serif",
                fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                color: "#2d2d2d",
                margin: 0,
              }}>Explore by Category</h3>
              <div style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "0.5rem",
                color: "#999",
                letterSpacing: "0.1em",
              }}>TAP TO BROWSE</div>
            </div>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #f4a26133, transparent)" }} />
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "0.8rem",
          }}>
            {categoryHighlights.map((cat, i) => {
              const count = menuItems.filter((m) => m.category === cat.category).length;
              return (
                <Link
                  key={cat.label}
                  href="/menu"
                  style={{ textDecoration: "none" }}
                >
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    style={{
                      background: "#fff",
                      border: "1px solid #e8e0d8",
                      padding: "1.2rem 0.8rem",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                  >
                    <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}>{cat.emoji}</span>
                    <div style={{
                      fontFamily: "Righteous, sans-serif",
                      fontSize: "0.8rem",
                      color: "#2d2d2d",
                      lineHeight: 1.2,
                      marginBottom: "0.3rem",
                    }}>{cat.label}</div>
                    <div style={{
                      fontFamily: "Space Mono, monospace",
                      fontSize: "0.45rem",
                      color: "#999",
                      letterSpacing: "0.1em",
                    }}>{count} ITEMS</div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* ═══ FEATURED ITEMS BY CATEGORY (Preview) ═══ */}
        {[
          { title: "Fried Chicken & Wings", emoji: "🍗", cat: "Chicken Wings", color: "#f4a261" },
          { title: "Momo", emoji: "🥟", cat: "Momo", color: "#e63946" },
          { title: "Coffee & Shakes", emoji: "☕", cat: "Coffee", color: "#2a9d8f" },
        ].map((section) => {
          const items = menuItems.filter((m) => m.category === section.cat).slice(0, 4);
          if (items.length === 0) return null;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: "clamp(3rem, 6vw, 4rem)" }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "clamp(1rem, 2vw, 1.5rem)",
              }}>
                <span style={{ fontSize: "1.5rem" }}>{section.emoji}</span>
                <h3 style={{
                  fontFamily: "Righteous, sans-serif",
                  fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                  color: "#2d2d2d",
                  margin: 0,
                }}>{section.title}</h3>
                <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${section.color}33, transparent)` }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {items.map((item) => (
                  <MenuItemRow key={item.id} item={item} onAdd={() => setModalItem(item)} />
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* VIEW FULL MENU CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginTop: "clamp(3rem, 6vw, 5rem)" }}
        >
          <Link href="/menu" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "1.2rem 3rem",
            background: "#2d2d2d",
            color: "#fff",
            fontFamily: "Space Mono, monospace",
            fontSize: "0.85rem",
            letterSpacing: "0.12em",
            textDecoration: "none",
            fontWeight: 700,
            transition: "all 0.3s",
          }}>
            🍕 VIEW FULL MENU ({menuItems.length} ITEMS) →
          </Link>
        </motion.div>
      </div>

      {modalItem && <AddToCartModal item={modalItem} onClose={() => setModalItem(null)} />}
    </section>
  );
}
