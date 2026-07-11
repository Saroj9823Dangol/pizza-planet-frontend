"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";
import Image from "next/image";

const FOOD_TOPPINGS = [
  { name: "Extra Cheese", price: 60 },
  { name: "Pepperoni", price: 80 },
  { name: "Jalapeños", price: 50 },
  { name: "Olives", price: 50 },
  { name: "Mushrooms", price: 50 },
  { name: "Onions", price: 40 },
  { name: "Bacon", price: 90 },
  { name: "Pineapple", price: 50 },
  { name: "Truffle Oil", price: 100 },
];

const DRINK_ADDITIONS = [
  { name: "Extra Shot", price: 50 },
  { name: "Soy Milk", price: 40 },
  { name: "Whipped Cream", price: 30 },
  { name: "Caramel Drizzle", price: 40 },
  { name: "Chocolate Syrup", price: 40 },
];

const DRINK_CATS = ["Coffee", "Shakes", "Drinks", "Ice Cream"];

export default function AddToCartModal({
  item, onClose
}: {
  item: any;
  onClose: () => void;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const isDrink = DRINK_CATS.includes(item.category);

  const [selectedSize, setSelectedSize] = useState(item.sizes?.[0]?.label || "Regular");
  const [crust, setCrust] = useState("CLASSIC");
  const [addOns, setAddOns] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  const toggleAddOn = (name: string) =>
    setAddOns((t) => t.includes(name) ? t.filter((x) => x !== name) : [...t, name]);

  const sizeObj = item.sizes?.find((s: any) => s.label === selectedSize);
  const basePrice = sizeObj ? parseInt(sizeObj.price) : parseInt(item.price.match(/(\d+)/)?.[1] || "0");
  const extras = isDrink ? DRINK_ADDITIONS : FOOD_TOPPINGS;
  const addOnsTotal = addOns.reduce((sum, t) => sum + (extras.find((x) => x.name === t)?.price || 0), 0);
  const total = (basePrice + addOnsTotal) * quantity;

  const handleAdd = () => {
    const id = `${item.id}-${selectedSize}-${crust}-${addOns.sort().join(",")}`;
    addItem({
      id,
      name: item.name,
      price: basePrice + addOnsTotal,
      size: item.sizes ? selectedSize : undefined,
      crust: !isDrink && crust !== "CLASSIC" ? crust : undefined,
      toppings: !isDrink && addOns.length > 0 ? addOns : undefined,
      notes: notes || undefined,
    });
    onClose();
    setTimeout(() => toggleCart(), 300);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 2000,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "1rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ type: "spring", damping: 25, stiffness: 260 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#fff", maxWidth: "520px", width: "100%",
            maxHeight: "90vh", overflowY: "auto",
            position: "relative",
          }}
        >
          {/* Header with image */}
          <div style={{ position: "relative", background: "#f5f0ea" }}>
            {item.image && (
              <div style={{ position: "relative", width: "100%", height: "160px" }}>
                <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} unoptimized />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 60%)",
                }} />
              </div>
            )}
            <button onClick={onClose}
              style={{
                position: "absolute", top: "12px", right: "12px",
                background: "rgba(0,0,0,0.4)", border: "none", color: "#fff",
                width: "32px", height: "32px", borderRadius: "50%",
                cursor: "pointer", fontSize: "1rem", display: "flex",
                alignItems: "center", justifyContent: "center",
              }}
            >✕</button>
            <div style={{
              position: "absolute", bottom: "16px", left: "20px", right: "20px",
            }}>
              <h3 style={{
                fontFamily: "Righteous, sans-serif", fontSize: "1.3rem",
                color: "#fff", margin: 0, letterSpacing: "-0.01em",
              }}>{item.name}</h3>
              <p style={{
                fontFamily: "DM Sans, sans-serif", fontSize: "0.75rem",
                color: "rgba(255,255,255,0.7)", margin: "0.2rem 0 0",
              }}>{item.description}</p>
            </div>
          </div>

          <div style={{ padding: "1.5rem 1.5rem 1rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Sizes */}
            {item.sizes && item.sizes.length > 0 && (
              <div>
                <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#e63946", marginBottom: "0.6rem" }}>
                  1️⃣ SELECT SIZE
                </div>
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(item.sizes.length, 3)}, 1fr)`, gap: "1px", background: "#e8e0d8", border: "1px solid #e8e0d8" }}>
                  {item.sizes.map((s: any) => {
                    const isActive = selectedSize === s.label;
                    return (
                      <button key={s.label} onClick={() => setSelectedSize(s.label)}
                        style={{
                          background: isActive ? "#f4a261" : "#fff",
                          color: isActive ? "#fff" : "#2d2d2d",
                          border: "none", padding: "0.8rem 0.5rem", cursor: "pointer",
                          fontFamily: "Space Mono, monospace", fontSize: "0.65rem",
                          fontWeight: isActive ? 700 : 400,
                          transition: "all 0.2s",
                        }}
                      >
                        <div>{s.label}</div>
                        <div style={{ color: isActive ? "#fff" : "#f4a261", marginTop: "4px", fontSize: "0.7rem" }}>Rs. {s.price}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Crust — only for food items with sizes (pizza-like) */}
            {!isDrink && item.sizes && item.sizes.length > 0 && (
              <div>
                <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#e63946", marginBottom: "0.6rem" }}>
                  2️⃣ CRUST / STYLE
                </div>
                <div style={{ display: "flex", gap: "1px", background: "#e8e0d8", border: "1px solid #e8e0d8" }}>
                  {[
                    { key: "CLASSIC", label: "CLASSIC" },
                    { key: "THIN", label: "ULTRA THIN" },
                    { key: "STUFFED", label: "CHEESE EDGE" },
                  ].map((c) => {
                    const isActive = crust === c.key;
                    return (
                      <button key={c.key} onClick={() => setCrust(c.key)}
                        style={{
                          flex: 1, background: isActive ? "#f4a261" : "#fff",
                          color: isActive ? "#fff" : "#2d2d2d",
                          border: "none", padding: "0.8rem 0.3rem", cursor: "pointer",
                          fontFamily: "Space Mono, monospace", fontSize: "0.55rem",
                          fontWeight: isActive ? 700 : 400,
                          transition: "all 0.2s",
                        }}
                      >{c.label}</button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add-ons: food toppings or drink additions */}
            <div>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#e63946", marginBottom: "0.6rem" }}>
                {isDrink ? "☕ ADD-ONS" : "3️⃣ ADD TOPPINGS"}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1px", background: "#e8e0d8" }}>
                {extras.map((t) => {
                  const isActive = addOns.includes(t.name);
                  return (
                    <button key={t.name} onClick={() => toggleAddOn(t.name)}
                      style={{
                        background: isActive ? "#e63946" : "#fff",
                        color: isActive ? "#fff" : "#999",
                        border: "none", padding: "0.6rem 1rem", cursor: "pointer",
                        fontFamily: "Space Mono, monospace", fontSize: "0.55rem",
                        letterSpacing: "0.05em", flex: "1 0 auto",
                        transition: "all 0.15s",
                      }}
                    >
                      {isActive ? "✓ " : "+ "}{t.name.toUpperCase()} <span style={{ opacity: 0.6 }}>(+{t.price})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#e63946", marginBottom: "0.6rem" }}>
                {isDrink ? "2️⃣" : "4️⃣"} QUANTITY
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", border: "1px solid #e8e0d8", width: "fit-content", padding: "0.3rem 1rem" }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ background: "none", border: "none", fontSize: "1.2rem", color: "#f4a261", cursor: "pointer", padding: "0.3rem" }}>−</button>
                <span style={{ fontFamily: "Righteous, sans-serif", fontSize: "1.2rem", color: "#2d2d2d", minWidth: "30px", textAlign: "center" }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}
                  style={{ background: "none", border: "none", fontSize: "1.2rem", color: "#f4a261", cursor: "pointer", padding: "0.3rem" }}>+</button>
              </div>
            </div>

            {/* Notes */}
            <div>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#e63946", marginBottom: "0.6rem" }}>
                {isDrink ? "3️⃣" : "5️⃣"} SPECIAL INSTRUCTIONS
              </div>
              <input value={notes} onChange={(e) => setNotes(e.target.value)}
                placeholder={isDrink ? "EXTRA HOT, LESS ICE..." : "EXTRA CHEESE, NO ONIONS..."}
                style={{
                  width: "100%", background: "#f9f6f0", border: "1px solid #e8e0d8",
                  padding: "0.8rem", fontFamily: "Space Mono, monospace", fontSize: "0.65rem",
                  color: "#2d2d2d", outline: "none",
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div style={{ padding: "1rem 1.5rem 1.5rem", borderTop: "1px solid #f0ece6" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ fontFamily: "Space Mono, monospace", fontSize: "0.55rem", color: "#999", letterSpacing: "0.2em" }}>TOTAL</span>
              <span style={{ fontFamily: "Righteous, sans-serif", fontSize: "1.5rem", color: "#f4a261" }}>Rs. {total.toLocaleString()}</span>
            </div>
            <motion.button onClick={handleAdd} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              style={{
                width: "100%", padding: "1rem", background: "#e63946", color: "#fff",
                border: "none", fontFamily: "Space Mono, monospace", fontWeight: 700,
                letterSpacing: "0.2em", fontSize: "0.8rem", cursor: "pointer",
              }}>
              🛒 ADD TO TRAY — Rs. {total.toLocaleString()}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
