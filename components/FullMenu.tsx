"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems, MenuCategory, MenuItem } from "@/lib/data";
import Image from "next/image";
import AddToCartModal from "./AddToCartModal";

const foodCats: { label: string; value: MenuCategory; emoji: string }[] = [
  { label: "PIZZA", value: "Pizza", emoji: "🍕" },
  { label: "APPETIZERS", value: "Appetizers", emoji: "🍟" },
  { label: "BREADS", value: "Breads", emoji: "🥖" },
  { label: "MOMO", value: "Momo", emoji: "🥟" },
  { label: "WINGS", value: "Chicken Wings", emoji: "🍗" },
  { label: "PASTA", value: "Pasta", emoji: "🍝" },
  { label: "BURGERS", value: "Burgers", emoji: "🍔" },
  { label: "SALADS", value: "Salads", emoji: "🥗" },
  { label: "SOUPS", value: "Soups", emoji: "🍵" },
];

const drinkCats: { label: string; value: MenuCategory; emoji: string }[] = [
  { label: "COFFEE", value: "Coffee", emoji: "☕" },
  { label: "SHAKES", value: "Shakes", emoji: "🥤" },
  { label: "DRINKS", value: "Drinks", emoji: "🧃" },
  { label: "ICE CREAM", value: "Ice Cream", emoji: "🍦" },
];

const allCats = [...foodCats, ...drinkCats];

function getCategoryCount(cat: MenuCategory) {
  return menuItems.filter((m) => m.category === cat).length;
}

function PizzaCard({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      style={{
        background: "#fff",
        border: "1px solid #e8e0d8",
        overflow: "hidden",
        cursor: "pointer",
        transition: "box-shadow 0.3s",
        position: "relative",
      }}
      onClick={onAdd}
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
          style={{ objectFit: "cover", transition: "transform 0.4s" }}
          unoptimized
        />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 50%)",
        }} />

        {/* Bestseller badge */}
        {item.bestseller && (
          <div style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: "#e63946",
            color: "#fff",
            padding: "3px 10px",
            fontFamily: "Space Mono, monospace",
            fontSize: "0.5rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
          }}>
            ★ BESTSELLER
          </div>
        )}

        {/* Price overlay */}
        <div style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          background: "#f4a261",
          color: "#fff",
          padding: "4px 12px",
          fontFamily: "Righteous, sans-serif",
          fontSize: "1rem",
        }}>
          Rs. {item.sizes ? item.sizes[0].price : item.price}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "1rem 1.2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
          <h3 style={{
            fontFamily: "Righteous, sans-serif",
            fontSize: "clamp(1.1rem, 1.8vw, 1.3rem)",
            color: "#2d2d2d",
            margin: 0,
            lineHeight: 1.2,
          }}>
            {item.name}
          </h3>
        </div>
        <p style={{
          fontFamily: "DM Sans, sans-serif",
          fontSize: "0.8rem",
          color: "#999",
          lineHeight: 1.5,
          margin: "0.4rem 0 0.8rem",
        }}>
          {item.description}
        </p>

        {/* Sizes */}
        {item.sizes && (
          <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
            {item.sizes.map((s) => (
              <span key={s.label} style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "0.5rem",
                color: "#999",
                background: "#f5f0ea",
                padding: "2px 8px",
                letterSpacing: "0.03em",
              }}>
                {s.label} Rs.{s.price}
              </span>
            ))}
          </div>
        )}

        {/* Add button */}
        <button
          onClick={(e) => { e.stopPropagation(); handleAdd(); }}
          style={{
            width: "100%",
            marginTop: "0.8rem",
            padding: "0.6rem",
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

function MenuRowItem({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
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
        gap: "1rem",
        alignItems: "center",
        padding: "1rem 0",
        borderBottom: "1px solid #f0ece6",
      }}
    >
      {/* Image */}
      {item.image && (
        <div style={{
          width: "60px",
          height: "60px",
          borderRadius: "8px",
          overflow: "hidden",
          flexShrink: 0,
          position: "relative",
          background: "#f5f0ea",
        }}>
          <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} unoptimized />
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.5rem" }}>
          <h4 style={{
            fontFamily: "Righteous, sans-serif",
            fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
            color: "#2d2d2d",
            margin: 0,
            lineHeight: 1.2,
          }}>
            {item.name}
            {item.bestseller && (
              <span style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "0.45rem",
                color: "#e63946",
                marginLeft: "0.4rem",
                letterSpacing: "0.1em",
              }}>★</span>
            )}
          </h4>
          <span style={{
            fontFamily: "Righteous, sans-serif",
            fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
            color: "#f4a261",
            whiteSpace: "nowrap",
          }}>Rs. {item.price}</span>
        </div>
        <p style={{
          fontFamily: "DM Sans, sans-serif",
          fontSize: "0.8rem",
          color: "#999",
          lineHeight: 1.5,
          margin: "0.2rem 0",
        }}>
          {item.description}
        </p>

        {/* Sizes + Tags */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
            {item.sizes ? (
              item.sizes.map((s) => (
                <span key={s.label} style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "0.48rem",
                  color: "#bbb",
                  letterSpacing: "0.02em",
                }}>
                  {s.label} {s.price}
                </span>
              ))
            ) : (
              item.tags?.slice(0, 2).map((tag) => (
                <span key={tag} style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "0.48rem",
                  color: "#ccc",
                  letterSpacing: "0.04em",
                }}>
                  {tag.toUpperCase()}
                </span>
              ))
            )}
          </div>
          <button
            onClick={handleAdd}
            style={{
              background: "none",
              border: "none",
              fontFamily: "Space Mono, monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.05em",
              color: added ? "#2a9d8f" : "#e63946",
              cursor: "pointer",
              padding: 0,
              flexShrink: 0,
              transition: "color 0.2s",
            }}
          >
            {added ? "✓ ADDED" : "+ ADD"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function CategorySection({
  title,
  emoji,
  items,
  onAdd,
  accentColor = "#e63946",
}: {
  title: string;
  emoji: string;
  items: MenuItem[];
  onAdd: (item: MenuItem) => void;
  accentColor?: string;
}) {
  if (items.length === 0) return null;

  // Pizzas get the card layout
  const isPizza = title === "PIZZA";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}
    >
      {/* Category header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "clamp(1.5rem, 3vw, 2rem)",
      }}>
        <span style={{ fontSize: "1.8rem" }}>{emoji}</span>
        <div>
          <h3 style={{
            fontFamily: "Righteous, sans-serif",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            color: "#2d2d2d",
            margin: 0,
            letterSpacing: "-0.02em",
          }}>{title}</h3>
          <div style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "0.55rem",
            color: "#999",
            letterSpacing: "0.1em",
            marginTop: "2px",
          }}>
            {items.length} ITEMS
          </div>
        </div>
        <div style={{
          flex: 1,
          height: "1px",
          background: `linear-gradient(90deg, ${accentColor}33, transparent)`,
        }} />
      </div>

      {/* Pizza: Card grid layout */}
      {isPizza ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "clamp(1rem, 2vw, 1.5rem)",
        }}>
          {items.map((item) => (
            <PizzaCard key={item.id} item={item} onAdd={() => onAdd(item)} />
          ))}
        </div>
      ) : (
        /* Other items: Row layout */
        <div>
          {items.map((item) => (
            <MenuRowItem key={item.id} item={item} onAdd={() => onAdd(item)} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function FullMenu() {
  const [activeCat, setActiveCat] = useState<MenuCategory | null>(null);
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);

  const filtered = activeCat
    ? menuItems.filter((m) => m.category === activeCat)
    : menuItems;

  // Group items by category
  const grouped = filtered.reduce<Record<string, MenuItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <section style={{
      background: "#fff8f0",
      minHeight: "100dvh",
      padding: "clamp(2rem, 6vw, 5rem) clamp(1rem, 5vw, 5rem)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.04, overflow: "hidden" }}>
        <span style={{
          position: "absolute", top: "5%", right: "5%",
          fontFamily: "Righteous, sans-serif", fontSize: "3rem",
          color: "#e63946", transform: "rotate(-3deg)", whiteSpace: "nowrap",
        }}>A SLICE OF HAPPINESS</span>
        <span style={{
          position: "absolute", bottom: "10%", left: "3%",
          fontFamily: "Pacifico, cursive", fontSize: "2rem",
          color: "#f4a261", transform: "rotate(2deg)", whiteSpace: "nowrap",
        }}>Extraaa.. Layers of Happiness!</span>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: "clamp(2rem, 5vw, 3rem)" }}
        >
          <div style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            color: "#e63946",
            marginBottom: "0.5rem",
          }}>~ FULL MENU ~</div>
          <h1 style={{
            fontFamily: "Righteous, sans-serif",
            fontSize: "clamp(2rem, 6vw, 4rem)",
            lineHeight: 1,
            margin: "0.3rem 0",
            letterSpacing: "-0.04em",
            backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>MENU</h1>
          <p style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "0.65rem",
            color: "#999",
            letterSpacing: "0.15em",
            marginTop: "0.8rem",
          }}>──── Something for Everyone ────</p>
        </motion.div>

        {/* VISUAL CATEGORY GRID */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: "0.5rem",
            marginBottom: "clamp(2rem, 5vw, 3rem)",
          }}
        >
          {/* ALL button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveCat(null)}
            style={{
              background: !activeCat ? "#2d2d2d" : "#fff",
              color: !activeCat ? "#fff" : "#2d2d2d",
              border: "1px solid #e8e0d8",
              padding: "1rem 0.5rem",
              cursor: "pointer",
              fontFamily: "Righteous, sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              transition: "all 0.2s",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>📋</span>
            ALL
            <span style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "0.45rem",
              opacity: 0.6,
            }}>{menuItems.length}</span>
          </motion.button>

          {allCats.map((cat) => {
            const count = getCategoryCount(cat.value);
            const isActive = activeCat === cat.value;
            return (
              <motion.button
                key={cat.value}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCat(isActive ? null : cat.value)}
                style={{
                  background: isActive ? "#f4a261" : "#fff",
                  color: isActive ? "#fff" : "#2d2d2d",
                  border: "1px solid #e8e0d8",
                  padding: "1rem 0.5rem",
                  cursor: "pointer",
                  fontFamily: "Righteous, sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.05em",
                  transition: "all 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>{cat.emoji}</span>
                {cat.label}
                <span style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "0.45rem",
                  opacity: 0.6,
                }}>{count}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* MENU SECTIONS */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCat || "all"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeCat ? (
              // Single category view
              grouped[activeCat] && (
                <CategorySection
                  title={allCats.find((c) => c.value === activeCat)?.label || activeCat}
                  emoji={allCats.find((c) => c.value === activeCat)?.emoji || "🍽️"}
                  items={grouped[activeCat]}
                  onAdd={(item) => setModalItem(item)}
                />
              )
            ) : (
              // All categories
              Object.entries(grouped).map(([cat, items]) => {
                const catInfo = allCats.find((c) => c.value === cat);
                return (
                  <CategorySection
                    key={cat}
                    title={catInfo?.label || cat}
                    emoji={catInfo?.emoji || "🍽️"}
                    items={items}
                    onAdd={(item) => setModalItem(item)}
                    accentColor={cat === "Pizza" ? "#e63946" : cat === "Momo" ? "#f4a261" : "#2a9d8f"}
                  />
                );
              })
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {modalItem && <AddToCartModal item={modalItem} onClose={() => setModalItem(null)} />}
    </section>
  );
}
