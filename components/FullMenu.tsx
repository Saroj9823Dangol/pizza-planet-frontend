"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems, MenuCategory } from "@/lib/data";
import Image from "next/image";
import AddToCartModal from "./AddToCartModal";

type Group = "ALL" | "FOOD" | "DRINKS";

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

export default function FullMenu() {
  const [group, setGroup] = useState<Group>("ALL");
  const [subCat, setSubCat] = useState<MenuCategory | null>(null);
  const [modalItem, setModalItem] = useState<any>(null);

  let filtered = menuItems;
  if (group === "FOOD" && subCat) filtered = menuItems.filter((m) => m.category === subCat);
  else if (group === "FOOD" && !subCat) filtered = menuItems.filter((m) => foodCats.some((c) => c.value === m.category));
  else if (group === "DRINKS" && subCat) filtered = menuItems.filter((m) => m.category === subCat);
  else if (group === "DRINKS" && !subCat) filtered = menuItems.filter((m) => drinkCats.some((c) => c.value === m.category));

  const handleGroupChange = (g: Group) => { setGroup(g); setSubCat(null); };

  return (
    <section style={{ background: "#fff8f0", minHeight: "100dvh", padding: "clamp(2rem, 6vw, 5rem) clamp(1rem, 5vw, 5rem)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.06 }}>
        <span style={{ position: "absolute", top: "10%", right: "8%", fontFamily: "Righteous, sans-serif", fontSize: "2.5rem", color: "#e63946", transform: "rotate(-4deg)", whiteSpace: "nowrap" }}>A Slice OF HAPPINESS</span>
        <span style={{ position: "absolute", bottom: "8%", left: "5%", fontFamily: "Pacifico, cursive", fontSize: "2rem", color: "#f4a261", transform: "rotate(3deg)", whiteSpace: "nowrap" }}>Extraaa.. Layers of Happiness!</span>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.7rem", letterSpacing: "0.3em", color: "#e63946", marginBottom: "0.5rem" }}>~ FULL MENU ~</div>
          <h1 style={{ fontFamily: "Righteous, sans-serif", fontSize: "clamp(2rem, 6vw, 4rem)", color: "#2d2d2d", lineHeight: 1, margin: "0.3rem 0", letterSpacing: "-0.04em" }}>MENU</h1>
          <p style={{ fontFamily: "Space Mono, monospace", fontSize: "0.7rem", color: "#999", letterSpacing: "0.15em", marginTop: "0.8rem" }}>────  Planet of Cheeseness, Togetherness &amp; Happiness  ────</p>
        </motion.div>

        <div style={{ position: "sticky", top: "72px", zIndex: 100, background: "rgba(255,248,240,0.95)", backdropFilter: "blur(16px)", padding: "0.6rem 0", marginBottom: "3rem", borderBottom: "2px solid #2d2d2d" }}>
          <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", marginBottom: group !== "ALL" ? "0.6rem" : 0, transition: "margin 0.2s" }}>
            {[{ label: "ALL", value: "ALL" as Group }, { label: "🍕 FOOD", value: "FOOD" as Group }, { label: "🥤 DRINKS", value: "DRINKS" as Group }].map((t) => (
              <button key={t.value} onClick={() => handleGroupChange(t.value)}
                style={{
                  background: group === t.value ? "#2d2d2d" : "transparent", border: "none", cursor: "pointer", whiteSpace: "nowrap",
                  fontFamily: "Righteous, sans-serif", fontSize: "clamp(0.75rem, 1.2vw, 0.95rem)",
                  letterSpacing: "0.06em", color: group === t.value ? "#fff" : "#999",
                  padding: "0.5rem 1.5rem", transition: "all 0.2s",
                }}>{t.label}</button>
            ))}
          </div>

          <AnimatePresence>
            {group !== "ALL" && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden" }}>
                <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap", justifyContent: "center", paddingTop: "0.3rem", borderTop: "1px solid #eee" }}>
                  {(group === "FOOD" ? foodCats : drinkCats).map((c) => {
                    const isActive = subCat === c.value;
                    return (
                      <button key={c.value} onClick={() => setSubCat(isActive ? null : c.value)}
                        style={{
                          background: isActive ? "#f4a261" : "transparent", border: isActive ? "none" : "1px solid #ddd",
                          cursor: "pointer", whiteSpace: "nowrap", fontFamily: "Space Mono, monospace",
                          fontSize: "clamp(0.5rem, 0.7vw, 0.6rem)", letterSpacing: "0.05em",
                          color: isActive ? "#fff" : "#999", padding: "0.3rem 0.7rem", transition: "all 0.15s",
                          display: "inline-flex", alignItems: "center", gap: "0.25rem",
                        }}>
                        <span style={{ fontSize: "0.7rem" }}>{c.emoji}</span>
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mobile-filter" style={{ display: "none", position: "relative" }}>
            <select value={subCat || `${group === "FOOD" ? "FOOD_ALL" : group === "DRINKS" ? "DRINKS_ALL" : "ALL"}`}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "ALL") { setGroup("ALL"); setSubCat(null); }
                else if (val === "FOOD_ALL") { setGroup("FOOD"); setSubCat(null); }
                else if (val === "DRINKS_ALL") { setGroup("DRINKS"); setSubCat(null); }
                else { const g = val.startsWith("F_") ? "FOOD" : "DRINKS"; setGroup(g as Group); setSubCat(val.slice(2) as MenuCategory); }
              }}
              style={{ width: "100%", padding: "0.6rem 1rem", background: "#fff", border: "2px solid #2d2d2d", fontFamily: "Righteous, sans-serif", fontSize: "0.85rem", color: "#2d2d2d", outline: "none", appearance: "none", cursor: "pointer" }}>
              <option value="ALL">📋 ALL</option>
              <option value="FOOD_ALL">🍕 ALL FOOD</option>
              {foodCats.map((c) => <option key={c.value} value={`F_${c.value}`}>{c.emoji} {c.label}</option>)}
              <option value="DRINKS_ALL">🥤 ALL DRINKS</option>
              {drinkCats.map((c) => <option key={c.value} value={`D_${c.value}`}>{c.emoji} {c.label}</option>)}
            </select>
            <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", fontSize: "0.7rem", color: "#999" }}>▼</span>
          </div>
        </div>

        <style>{`@media (max-width: 640px) { .mobile-filter { display: block !important; } }`}</style>

        <AnimatePresence mode="wait">
          <motion.div key={`${group}-${subCat || "all"}`} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
            <div style={{ columns: "2 340px", columnGap: "3rem", columnRule: "1px dashed #e0d6c8" }}>
              {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: "5rem 2rem", fontFamily: "DM Sans, sans-serif", color: "#999" }}>No items in this category.</div>
              )}
              {filtered.map((item, i) => (
                <MenuItemRow key={item.id} item={item} index={i} onAdd={() => setModalItem(item)} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {modalItem && <AddToCartModal item={modalItem} onClose={() => setModalItem(null)} />}
    </section>
  );
}

function MenuItemRow({ item, index, onAdd }: { item: any; index: number; onAdd: () => void }) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => { onAdd(); setAdded(true); setTimeout(() => setAdded(false), 1200); };

  return (
    <motion.div
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.3, delay: index * 0.01 }}
      style={{ breakInside: "avoid", marginBottom: "1.8rem", paddingBottom: "1.2rem", borderBottom: "1px solid #ede5db", display: "flex", gap: "1rem", alignItems: "flex-start" }}
    >
      {item.image && (
        <div style={{ width: "55px", height: "55px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, position: "relative", background: "#f5f0ea", border: "2px solid #ede5db", marginTop: "0.15rem" }}>
          <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} unoptimized />
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.5rem" }}>
          <h3 style={{ fontFamily: "Righteous, sans-serif", fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)", color: "#2d2d2d", margin: 0, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
            {item.name}{item.bestseller && <span style={{ fontFamily: "Space Mono, monospace", fontSize: "0.45rem", color: "#e63946", marginLeft: "0.4rem", letterSpacing: "0.1em" }}>★</span>}
          </h3>
          <span style={{ fontFamily: "Righteous, sans-serif", fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)", color: "#f4a261", whiteSpace: "nowrap" }}>{item.price}</span>
        </div>
        <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.85rem", color: "#999", lineHeight: 1.5, margin: "0.3rem 0 0.35rem" }}>{item.description}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", alignItems: "center" }}>
            {item.sizes && <span style={{ fontFamily: "Space Mono, monospace", fontSize: "0.6rem", color: "#bbb", letterSpacing: "0.02em" }}>{item.sizes.map((s: any) => `${s.label} ${s.price}`).join(" | ")}</span>}
            {!item.sizes && item.tags && item.tags.slice(0, 2).map((tag: string) => (<span key={tag} style={{ fontFamily: "Space Mono, monospace", fontSize: "0.55rem", color: "#ccc", letterSpacing: "0.04em" }}>{tag.toUpperCase()}</span>))}
          </div>
          <button onClick={handleAdd} style={{ background: "none", border: "none", fontFamily: "Space Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.05em", color: added ? "#2a9d8f" : "#e63946", cursor: "pointer", padding: "0", flexShrink: 0, transition: "color 0.2s" }}>
            {added ? "✓ ADDED" : "+ ADD TO TRAY"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
