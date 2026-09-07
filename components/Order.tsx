"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";
import Link from "next/link";

interface OrderForm {
  name: string;
  phone: string;
  size: "S" | "M" | "L" | "XL";
  crust: "THIN" | "CLASSIC" | "STUFFED";
  toppings: string[];
  deliveryType: "DELIVERY" | "PICKUP" | "DINE_IN";
  address: string;
}

const TOPPINGS = [
  "Pepperoni", "Mushrooms", "Jalapeños", "Olives", "Onions",
  "Peppers", "Basil", "Bacon", "Pineapple", "Extra Cheese", "Truffle Oil",
];

const SIZES = [
  { key: "S" as const, label: "PERSONAL", price: 600, desc: '8"' },
  { key: "M" as const, label: "REGULAR", price: 800, desc: '10"' },
  { key: "L" as const, label: "FAMILY", price: 1000, desc: '12"' },
  { key: "XL" as const, label: "FEAST", price: 1200, desc: '14"' },
];

const CRUSTS = [
  { key: "THIN" as const, label: "ULTRA THIN", desc: "Crispy & Wood-fired" },
  { key: "CLASSIC" as const, label: "NEAPOLITAN", desc: "Hand-stretched edge" },
  { key: "STUFFED" as const, label: "CHEESE EDGE", desc: "Premium mozzarella fill" },
];

export default function Order() {
  const addItem = useCartStore((s) => s.addItem);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const [form, setForm] = useState<OrderForm>({
    name: "", phone: "", size: "M", crust: "CLASSIC",
    toppings: [], deliveryType: "DELIVERY", address: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleTopping = (t: string) =>
    setForm((f) => ({
      ...f,
      toppings: f.toppings.includes(t)
        ? f.toppings.filter((x) => x !== t)
        : [...f.toppings, t],
    }));
  const selectedSize = SIZES.find((s) => s.key === form.size)!;
  const toppingsTotal = form.toppings.length * 75;
  const total = selectedSize.price + toppingsTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem({
      id: `custom-${Date.now()}`,
      name: `🎨 Hand-crafted ${selectedSize.label} Pizza`,
      price: total,
      size: form.size,
      crust: form.crust,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      toggleCart();
    }, 1500);
  };

  return (
    <section id="order" style={{
      background: "linear-gradient(180deg, #fff8f0 0%, #fffdf5 100%)",
      padding: isMobile
        ? "4rem 1.5rem"
        : "clamp(6rem, 12vw, 12rem) clamp(1.5rem, 5vw, 8rem)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Floating decorations */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <span style={{
          position: "absolute", top: "10%", right: "5%",
          fontSize: "3rem", opacity: 0.04,
          animation: "float 7s ease-in-out infinite",
        }}>🍕</span>
        <span style={{
          position: "absolute", bottom: "15%", left: "3%",
          fontSize: "2.5rem", opacity: 0.03,
          animation: "float-slow 8s ease-in-out infinite",
        }}>🧀</span>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "clamp(3rem, 8vw, 5rem)" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              color: "#e63946",
              marginBottom: "0.5rem",
            }}>🎨 CUSTOM ORDER</div>
            <h2 style={{
              fontFamily: "Righteous, sans-serif",
              fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
              lineHeight: 0.85,
              margin: 0,
              letterSpacing: "-0.03em",
              backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center 40%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              BUILD YOUR PIZZA 🍕
            </h2>
          </motion.div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr clamp(350px, 30vw, 420px)",
          gap: isMobile ? "3rem" : "6rem",
          alignItems: "start",
        }}>
          <form onSubmit={handleSubmit} style={{
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "2.5rem" : "3.5rem",
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "2rem",
            }}>
              <FormField label="😊 YOUR NAME">
                <input
                  type="text" required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="ENTER NAME"
                  style={inputStyle}
                />
              </FormField>
              <FormField label="📞 PHONE">
                <input
                  type="tel" required
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="+977"
                  style={inputStyle}
                />
              </FormField>
            </div>

            <FormField label="1️⃣ SELECT SIZE">
              <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${isMobile ? 2 : 4}, 1fr)`,
                gap: "1px",
                background: "#e8e0d8",
                border: "1px solid #e8e0d8",
              }}>
                {SIZES.map((size) => (
                  <button
                    key={size.key}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, size: size.key }))}
                    style={{
                      background: form.size === size.key ? "#f4a261" : "#fff",
                      color: form.size === size.key ? "#fff" : "#2d2d2d",
                      border: "none",
                      padding: "1.2rem 0.8rem",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "2px",
                      transition: "all 0.2s",
                      fontFamily: "Space Mono, monospace",
                    }}>
                    <span style={{ fontSize: "0.6rem", opacity: 0.5, letterSpacing: "0.1em" }}>
                      {size.desc}
                    </span>
                    <span style={{ fontSize: "1rem", fontWeight: 600 }}>{size.label}</span>
                    <span style={{
                      fontSize: "0.8rem",
                      marginTop: "6px",
                      color: form.size === size.key ? "#fff" : "#f4a261",
                    }}>
                      Rs. {size.price}
                    </span>
                  </button>
                ))}
              </div>
            </FormField>

            <FormField label="2️⃣ SELECT CRUST">
              <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${isMobile ? 1 : 3}, 1fr)`,
                gap: "1px",
                background: "#e8e0d8",
                border: "1px solid #e8e0d8",
              }}>
                {CRUSTS.map((crust) => (
                  <button
                    key={crust.key}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, crust: crust.key }))}
                    style={{
                      background: form.crust === crust.key ? "#f4a261" : "#fff",
                      color: form.crust === crust.key ? "#fff" : "#2d2d2d",
                      border: "none",
                      padding: "1.2rem 0.8rem",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "2px",
                      transition: "all 0.2s",
                      fontFamily: "Space Mono, monospace",
                    }}>
                    <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>{crust.label}</span>
                    <span style={{ fontSize: "0.55rem", opacity: 0.6, letterSpacing: "0.1em" }}>
                      {crust.desc.toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            </FormField>

            <FormField label="3️⃣ TOPPINGS (+75 EA)">
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1px",
                background: "#e8e0d8",
              }}>
                {TOPPINGS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTopping(t)}
                    style={{
                      background: form.toppings.includes(t) ? "#e63946" : "#fff",
                      color: form.toppings.includes(t) ? "#fff" : "#999",
                      border: "none",
                      padding: "0.8rem 1.2rem",
                      fontSize: "0.65rem",
                      cursor: "pointer",
                      transition: "0.2s",
                      fontFamily: "Space Mono, monospace",
                      letterSpacing: "0.08em",
                      flex: "1 0 auto",
                    }}>
                    {form.toppings.includes(t) ? "✓ " : "+ "}
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </FormField>

            <FormField label="4️⃣ ORDER TYPE">
              <div style={{
                display: "flex",
                gap: "1rem",
                padding: "0.5rem",
                border: "1px solid #e8e0d8",
                width: "fit-content",
                flexWrap: "wrap",
              }}>
                {(["DELIVERY", "PICKUP", "DINE_IN"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, deliveryType: type }))}
                    style={{
                      background: form.deliveryType === type ? "#f4a261" : "transparent",
                      color: form.deliveryType === type ? "#fff" : "#999",
                      border: "none",
                      padding: "0.7rem 1.2rem",
                      fontFamily: "Space Mono, monospace",
                      fontSize: "0.7rem",
                      cursor: "pointer",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      transition: "all 0.2s",
                    }}>
                    {type === "DELIVERY"
                      ? "🚚 DELIVERY"
                      : type === "PICKUP"
                        ? "🏪 PICKUP"
                        : "🍽️ DINE IN"}
                  </button>
                ))}
              </div>
            </FormField>

            <AnimatePresence>
              {form.deliveryType === "DELIVERY" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{
                    overflow: "hidden",
                    borderLeft: "3px solid #f4a261",
                    paddingLeft: "2rem",
                  }}>
                  <FormField label="📍 ADDRESS">
                    <input
                      type="text" required
                      value={form.address}
                      onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                      placeholder="STREET, CITY..."
                      style={inputStyle}
                    />
                  </FormField>
                </motion.div>
              )}
            </AnimatePresence>

            {!isMobile && (
              <button type="submit" style={submitStyle(submitted)}>
                {submitted ? "✓ SENT TO KITCHEN! 🎉" : "🔥 SEND TO KITCHEN →"}
              </button>
            )}
          </form>

          {/* Order Summary */}
          <aside style={{
            position: isMobile ? "static" : "sticky",
            top: "100px",
            alignSelf: "start",
            zIndex: 10,
          }}>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                background: "#fff",
                padding: "2.5rem",
                border: "1px solid #e8e0d8",
                position: "relative",
              }}>
              <div style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                color: "#f4a261",
                marginBottom: "2rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}>🧾 ORDER SUMMARY</div>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                marginBottom: "3rem",
              }}>
                <BillRow label="SIZE" value={selectedSize.label} sub={`RS ${selectedSize.price}`} />
                <BillRow label="DOUGH" value={form.crust} />
                {form.toppings.length > 0 && (
                  <BillRow
                    label="TOPPINGS"
                    value={`${form.toppings.length} ITEMS`}
                    sub={`RS ${toppingsTotal}`}
                  />
                )}
                <BillRow label="ORDER TYPE" value={form.deliveryType.replace("_", " ")} />
              </div>
              <div style={{ borderTop: "2px dashed #e8e0d8", paddingTop: "1.5rem" }}>
                <span style={{
                  display: "block",
                  fontSize: "0.6rem",
                  fontFamily: "Space Mono, monospace",
                  color: "#999",
                  letterSpacing: "0.3em",
                  marginBottom: "0.3rem",
                }}>TOTAL</span>
                <div style={{
                  fontFamily: "Righteous, sans-serif",
                  fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
                  color: "#f4a261",
                  lineHeight: 1,
                }}>Rs. {total.toLocaleString()}</div>
              </div>
              {isMobile && (
                <button
                  onClick={handleSubmit}
                  style={{ ...submitStyle(submitted), marginTop: "2rem" }}>
                  {submitted ? "✓ SENT! 🎉" : "🔥 COMMIT TO BAKE"}
                </button>
              )}
            </motion.div>
          </aside>
        </div>

        <div style={{
          textAlign: "center",
          marginTop: isMobile ? "3rem" : "5rem",
        }}>
          <Link href="/order" style={{
            display: "inline-block",
            padding: "1rem 3rem",
            background: "#e63946",
            color: "#fff",
            fontFamily: "Space Mono, monospace",
            fontSize: "0.8rem",
            letterSpacing: "0.15em",
            textDecoration: "none",
            fontWeight: 700,
          }}>🔥 FULL ORDER PAGE →</Link>
        </div>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "2px solid #e8e0d8",
  padding: "1rem 0",
  color: "#2d2d2d",
  fontFamily: "Space Mono, monospace",
  fontSize: "1rem",
  outline: "none",
};

const submitStyle = (submitted: boolean): React.CSSProperties => ({
  width: "100%",
  padding: "1.5rem",
  background: submitted ? "#2a9d8f" : "#e63946",
  color: "#fff",
  border: "none",
  fontFamily: "Space Mono, monospace",
  fontWeight: 700,
  letterSpacing: "0.2em",
  fontSize: "1.1rem",
  cursor: "pointer",
  transition: "all 0.4s",
});

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
      <div style={{
        fontFamily: "Space Mono, monospace",
        fontSize: "0.65rem",
        letterSpacing: "0.2em",
        color: "#e63946",
      }}>{label}</div>
      {children}
    </div>
  );
}

function BillRow({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: "0.6rem",
          color: "#999",
          marginBottom: "2px",
          fontFamily: "Space Mono, monospace",
          letterSpacing: "0.1em",
        }}>{label}</div>
        <div style={{
          fontSize: "1.1rem",
          color: "#2d2d2d",
          fontWeight: 500,
          fontFamily: "Righteous, sans-serif",
        }}>{value}</div>
      </div>
      {sub && (
        <div style={{
          fontSize: "0.9rem",
          color: "#f4a261",
          fontFamily: "Righteous, sans-serif",
          textAlign: "right",
        }}>{sub}</div>
      )}
    </div>
  );
}
