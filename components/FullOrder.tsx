"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";

interface OrderForm {
  name: string;
  phone: string;
  size: "S" | "M" | "L" | "XL";
  crust: "THIN" | "CLASSIC" | "STUFFED";
  toppings: string[];
  deliveryType: "DELIVERY" | "PICKUP";
  address: string;
}

const TOPPINGS = ["Pepperoni", "Mushrooms", "Jalapeños", "Olives", "Onions", "Peppers", "Basil", "Bacon", "Pineapple", "Extra Cheese", "Truffle Oil"];
const SIZES = [{ key: "S" as const, label: "PERSONAL", price: 600, desc: '8"' }, { key: "M" as const, label: "REGULAR", price: 800, desc: '10"' }, { key: "L" as const, label: "FAMILY", price: 1000, desc: '12"' }, { key: "XL" as const, label: "FEAST", price: 1200, desc: '14"' }];
const CRUSTS = [{ key: "THIN" as const, label: "ULTRA THIN", desc: "Crispy & Wood-fired" }, { key: "CLASSIC" as const, label: "NEAPOLITAN", desc: "Hand-stretched edge" }, { key: "STUFFED" as const, label: "CHEESE EDGE", desc: "Premium mozzarella fill" }];

export default function FullOrder() {
  const addItem = useCartStore((s) => s.addItem);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const [form, setForm] = useState<OrderForm>({ name: "", phone: "", size: "M", crust: "CLASSIC", toppings: [], deliveryType: "DELIVERY", address: "" });
  const [submitted, setSubmitted] = useState(false);

  const toggleTopping = (t: string) => setForm((f) => ({ ...f, toppings: f.toppings.includes(t) ? f.toppings.filter((x) => x !== t) : [...f.toppings, t] }));
  const selectedSize = SIZES.find((s) => s.key === form.size)!;
  const toppingsTotal = form.toppings.length * 75;
  const total = selectedSize.price + toppingsTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem({ id: `custom-${Date.now()}`, name: `🎨 Hand-crafted ${selectedSize.label} Pizza`, price: total, size: form.size, crust: form.crust });
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); toggleCart(); }, 1500);
  };

  return (
    <section style={{ background: "linear-gradient(180deg, #fff8f0 0%, #fffdf5 100%)", minHeight: "100dvh", padding: "clamp(2rem, 5vw, 5rem) clamp(1rem, 5vw, 5rem)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "3rem" }}>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.7rem", letterSpacing: "0.3em", color: "#e63946" }}>🎨 CUSTOM</div>
          <h1 style={{ fontFamily: "Righteous, sans-serif", fontSize: "clamp(1.5rem, 5vw, 3.5rem)", color: "#2d2d2d", lineHeight: 0.85, margin: "0.5rem 0 0", letterSpacing: "-0.03em" }}>
            BUILD YOUR <span style={{ color: "#e63946" }}>PIZZA</span> 🍕
          </h1>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 400px", gap: isMobile ? "3rem" : "6rem", alignItems: "start" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: isMobile ? "2.5rem" : "3.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "2rem" }}>
              <FormField label="😊 YOUR NAME">
                <input type="text" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="ENTER NAME" style={inputStyle} />
              </FormField>
              <FormField label="📞 PHONE">
                <input type="tel" required value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="+977" style={inputStyle} />
              </FormField>
            </div>

            <FormField label="1️⃣ SELECT SIZE">
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${isMobile ? 2 : 4}, 1fr)`, gap: "1px", background: "#e8e0d8", border: "1px solid #e8e0d8" }}>
                {SIZES.map((size) => (
                  <button key={size.key} type="button" onClick={() => setForm((f) => ({ ...f, size: size.key }))}
                    style={{ background: form.size === size.key ? "#f4a261" : "#fff", color: form.size === size.key ? "#fff" : "#2d2d2d", border: "none", padding: "1.5rem 0.8rem", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", transition: "all 0.2s", fontFamily: "Space Mono, monospace" }}>
                    <span style={{ fontSize: "0.6rem", opacity: 0.5, letterSpacing: "0.1em" }}>{size.desc}</span>
                    <span style={{ fontSize: "1.1rem", fontWeight: 600 }}>{size.label}</span>
                    <span style={{ fontSize: "0.85rem", marginTop: "6px", color: form.size === size.key ? "#fff" : "#f4a261" }}>Rs. {size.price}</span>
                  </button>
                ))}
              </div>
            </FormField>

            <FormField label="2️⃣ SELECT CRUST">
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${isMobile ? 1 : 3}, 1fr)`, gap: "1px", background: "#e8e0d8", border: "1px solid #e8e0d8" }}>
                {CRUSTS.map((crust) => (
                  <button key={crust.key} type="button" onClick={() => setForm((f) => ({ ...f, crust: crust.key }))}
                    style={{ background: form.crust === crust.key ? "#f4a261" : "#fff", color: form.crust === crust.key ? "#fff" : "#2d2d2d", border: "none", padding: "1.5rem 0.8rem", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", transition: "all 0.2s", fontFamily: "Space Mono, monospace" }}>
                    <span style={{ fontSize: "1rem", fontWeight: 600 }}>{crust.label}</span>
                    <span style={{ fontSize: "0.6rem", opacity: 0.6, letterSpacing: "0.1em" }}>{crust.desc.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </FormField>

            <FormField label="3️⃣ TOPPINGS (+75 EA)">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1px", background: "#e8e0d8" }}>
                {TOPPINGS.map((t) => (
                  <button key={t} type="button" onClick={() => toggleTopping(t)}
                    style={{ background: form.toppings.includes(t) ? "#e63946" : "#fff", color: form.toppings.includes(t) ? "#fff" : "#999", border: "none", padding: "1rem 1.5rem", fontSize: "0.7rem", cursor: "pointer", transition: "0.2s", fontFamily: "Space Mono, monospace", letterSpacing: "0.08em", flex: "1 0 auto" }}>
                    {form.toppings.includes(t) ? "✓ " : "+ "}{t.toUpperCase()}
                  </button>
                ))}
              </div>
            </FormField>

            <FormField label="4️⃣ DELIVERY">
              <div style={{ display: "flex", gap: "2rem", padding: "0.5rem", border: "1px solid #e8e0d8", width: "fit-content" }}>
                {(["DELIVERY", "PICKUP"] as const).map((type) => (
                  <button key={type} type="button" onClick={() => setForm((f) => ({ ...f, deliveryType: type }))}
                    style={{ background: form.deliveryType === type ? "#f4a261" : "transparent", color: form.deliveryType === type ? "#fff" : "#999", border: "none", padding: "0.8rem 2rem", fontFamily: "Space Mono, monospace", fontSize: "0.8rem", cursor: "pointer", fontWeight: 700, letterSpacing: "0.1em", transition: "all 0.2s" }}>
                    {type === "DELIVERY" ? "🚚 DELIVERY" : "🏪 PICKUP"}
                  </button>
                ))}
              </div>
            </FormField>

            <AnimatePresence>
              {form.deliveryType === "DELIVERY" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden", borderLeft: "3px solid #f4a261", paddingLeft: "2rem" }}>
                  <FormField label="📍 ADDRESS">
                    <input type="text" required value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} placeholder="STREET, CITY..." style={inputStyle} />
                  </FormField>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              style={{ width: "100%", padding: "1.5rem", background: submitted ? "#2a9d8f" : "#e63946", color: "#fff", border: "none", fontFamily: "Space Mono, monospace", fontWeight: 700, letterSpacing: "0.2em", fontSize: "1rem", cursor: "pointer" }}>
              {submitted ? "✓ SENT TO KITCHEN! 🎉" : "🔥 SEND TO KITCHEN →"}
            </motion.button>
          </form>

          <aside style={{ position: isMobile ? "static" : "sticky", top: "100px", alignSelf: "start" }}>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              style={{ background: "#fff", padding: "2.5rem", border: "1px solid #e8e0d8" }}>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.7rem", letterSpacing: "0.3em", color: "#f4a261", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>🧾 ORDER SUMMARY</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3rem" }}>
                <BillRow label="SIZE" value={selectedSize.label} sub={`RS ${selectedSize.price}`} />
                <BillRow label="DOUGH" value={form.crust} />
                {form.toppings.length > 0 && <BillRow label="TOPPINGS" value={`${form.toppings.length} ITEMS`} sub={`RS ${toppingsTotal}`} />}
              </div>
              <div style={{ borderTop: "2px dashed #e8e0d8", paddingTop: "1.5rem" }}>
                <span style={{ display: "block", fontSize: "0.6rem", fontFamily: "Space Mono, monospace", color: "#999", letterSpacing: "0.3em", marginBottom: "0.3rem" }}>TOTAL</span>
                <div style={{ fontFamily: "Righteous, sans-serif", fontSize: "clamp(2rem, 5vw, 2.8rem)", color: "#f4a261", lineHeight: 1 }}>Rs. {total.toLocaleString()}</div>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = { width: "100%", background: "transparent", border: "none", borderBottom: "2px solid #e8e0d8", padding: "1.2rem 0", color: "#2d2d2d", fontFamily: "Space Mono, monospace", fontSize: "1rem", outline: "none" };

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (<div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
    <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#e63946" }}>{label}</div>
    {children}
  </div>);
}

function BillRow({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: "0.6rem", color: "#999", marginBottom: "2px", fontFamily: "Space Mono, monospace", letterSpacing: "0.1em" }}>{label}</div>
      <div style={{ fontSize: "1.2rem", color: "#2d2d2d", fontWeight: 500, fontFamily: "Righteous, sans-serif" }}>{value}</div>
    </div>
    {sub && <div style={{ fontSize: "0.9rem", color: "#f4a261", fontFamily: "Righteous, sans-serif", textAlign: "right" }}>{sub}</div>}
  </div>);
}
