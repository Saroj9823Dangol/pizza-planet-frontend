"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
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

const TOPPINGS = [
  "Pepperoni",
  "Mushrooms",
  "Jalapeños",
  "Olives",
  "Onions",
  "Peppers",
  "Anchovies",
  "Basil",
  "Bacon",
  "Pineapple",
  "Buffalo Mozzarella",
  "Truffle Oil",
];

const SIZES: {
  key: OrderForm["size"];
  label: string;
  price: number;
  desc: string;
}[] = [
  { key: "S", label: "PERSONAL", price: 600, desc: '8"' },
  { key: "M", label: "REGULAR", price: 800, desc: '10"' },
  { key: "L", label: "FAMILY", price: 1000, desc: '12"' },
  { key: "XL", label: "FEAST", price: 1200, desc: '14"' },
];

const CRUSTS: { key: OrderForm["crust"]; label: string; desc: string }[] = [
  { key: "THIN", label: "ULTRA THIN", desc: "Crispy & Wood-fired" },
  { key: "CLASSIC", label: "NEAPOLITAN", desc: "Hand-stretched edge" },
  { key: "STUFFED", label: "CHEESE EDGE", desc: "Premium mozzarella fill" },
];

export default function Order() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
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
    name: "",
    phone: "",
    size: "M",
    crust: "CLASSIC",
    toppings: [],
    deliveryType: "DELIVERY",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleTopping = (t: string) => {
    setForm((f) => ({
      ...f,
      toppings: f.toppings.includes(t)
        ? f.toppings.filter((x) => x !== t)
        : [...f.toppings, t],
    }));
  };

  const selectedSize = SIZES.find((s) => s.key === form.size)!;
  const toppingsTotal = form.toppings.length * 75;
  const total = selectedSize.price + toppingsTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem({
      id: `custom-${Date.now()}`,
      name: `Hand-crafted ${selectedSize.label} Pizza`,
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
    <section
      id="order"
      ref={ref}
      style={{
        background: "#000",
        padding: isMobile
          ? "4rem 1.5rem"
          : "clamp(8rem, 15vw, 15rem) clamp(1.5rem, 5vw, 8rem)",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Sharp Typography Header */}
        <div style={{ marginBottom: "clamp(5rem, 10vw, 8rem)" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div style={labelStyle}>CUSTOM ORDER SYSTEM</div>
            <h2 style={titleStyle}>
              BUILD YOUR <br />
              <span style={{ color: "#FFB830" }}>PIZZA.</span>
            </h2>
          </motion.div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "1fr clamp(380px, 35vw, 480px)",
            gap: isMobile ? "4rem" : "8rem",
            alignItems: "start",
          }}
        >
          {/* LEFT: THE BUILDER */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "4rem" : "6rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "3rem",
              }}
            >
              <FormField label="YOUR NAME">
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="ENTER NAME"
                  style={inputStyle}
                />
              </FormField>
              <FormField label="PHONE NUMBER">
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  placeholder="+977"
                  style={inputStyle}
                />
              </FormField>
            </div>

            <FormField label="1. SELECT SIZE">
              <div style={choiceGridStyle(isMobile ? 2 : 4)}>
                {SIZES.map((size) => (
                  <button
                    key={size.key}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, size: size.key }))}
                    style={choiceButtonStyle(form.size === size.key)}
                  >
                    <span
                      style={{
                        fontSize: "0.65rem",
                        opacity: 0.5,
                        marginBottom: "6px",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {size.desc}
                    </span>
                    <span style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                      {size.label}
                    </span>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        marginTop: "12px",
                        color: form.size === size.key ? "#000" : "#FFB830",
                      }}
                    >
                      Rs. {size.price}
                    </span>
                  </button>
                ))}
              </div>
            </FormField>

            <FormField label="2. SELECT CRUST TYPE">
              <div style={choiceGridStyle(isMobile ? 1 : 3)}>
                {CRUSTS.map((crust) => (
                  <button
                    key={crust.key}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, crust: crust.key }))}
                    style={choiceButtonStyle(form.crust === crust.key)}
                  >
                    <span
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {crust.label}
                    </span>
                    <span
                      style={{
                        fontSize: "0.6rem",
                        opacity: 0.6,
                        marginTop: "6px",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {crust.desc.toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            </FormField>

            <FormField label="3. CHOOSE TOPPINGS (+75 EACH)">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1px",
                  background: "rgba(255,255,255,0.1)",
                }}
              >
                {TOPPINGS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTopping(t)}
                    style={toppingButtonStyle(form.toppings.includes(t))}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </FormField>

            <FormField label="4. DELIVERY OPTION">
              <div style={{ display: "flex", gap: "3rem" }}>
                {(["DELIVERY", "PICKUP"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setForm((f) => ({ ...f, deliveryType: type }))
                    }
                    style={textToggleStyle(form.deliveryType === type)}
                  >
                    {type}
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
                    borderLeft: "3px solid #FF3C3C",
                    paddingLeft: "2rem",
                  }}
                >
                  <FormField label="DELIVERY ADDRESS">
                    <input
                      type="text"
                      required
                      value={form.address}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, address: e.target.value }))
                      }
                      placeholder="VILLA, STREET, CITY..."
                      style={inputStyle}
                    />
                  </FormField>
                </motion.div>
              )}
            </AnimatePresence>

            {!isMobile && (
              <button type="submit" style={submitButtonStyle(submitted)}>
                {submitted ? "✓ ORDER PLACED" : "ADD TO TRAY →"}
              </button>
            )}
          </form>

          {/* RIGHT: BAKE LOG (STICKY) */}
          <aside
            style={{
              position: isMobile ? "static" : "sticky",
              top: "120px",
              alignSelf: "start",
              zIndex: 10,
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={billStyle}
            >
              <div style={billHeaderStyle}>ORDER SUMMARY</div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  marginBottom: "4rem",
                }}
              >
                <BillRow
                  label="SIZE PROFILE"
                  value={selectedSize.label}
                  sub={`RS ${selectedSize.price}`}
                />
                <BillRow label="DOUGH STYLE" value={form.crust} />
                {form.toppings.length > 0 && (
                  <BillRow
                    label="ADDITIONS"
                    value={`${form.toppings.length} ITEMS`}
                    sub={`RS ${toppingsTotal}`}
                  />
                )}
              </div>

              <div
                style={{
                  marginTop: "auto",
                  borderTop: "1px dashed rgba(255,255,255,0.2)",
                  paddingTop: "2rem",
                }}
              >
                <span style={billTotalLabel}>TOTAL AMOUNT</span>
                <div style={billTotalValue}>Rs. {total.toLocaleString()}</div>
              </div>

              {isMobile && (
                <button
                  onClick={handleSubmit}
                  style={{ ...submitButtonStyle(submitted), marginTop: "3rem" }}
                >
                  {submitted ? "✓ SENT TO OVEN" : "COMMIT TO BAKE"}
                </button>
              )}
            </motion.div>
          </aside>
        </div>
      </div>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: "Space Mono, monospace",
  fontSize: "0.7rem",
  letterSpacing: "clamp(0.1rem, 2vw, 0.5rem)",
  color: "#FF3C3C",
  marginBottom: "1.5rem",
  textTransform: "uppercase",
};

const titleStyle: React.CSSProperties = {
  fontFamily: "Righteous, sans-serif",
  fontSize: "clamp(2.5rem, 12vw, 10rem)",
  color: "#fff",
  lineHeight: 0.85,
  margin: 0,
  letterSpacing: "-0.03em",
  wordBreak: "break-word",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "2px solid rgba(255,255,255,0.15)",
  padding: "1.5rem 0",
  color: "#fff",
  fontFamily: "Space Mono, monospace",
  fontSize: "1.2rem",
  outline: "none",
  borderRadius: "0px",
};

const choiceGridStyle = (cols: number): React.CSSProperties => ({
  display: "grid",
  gridTemplateColumns: `repeat(${cols}, 1fr)`,
  gap: "1px",
  background: "rgba(255,255,255,0.15)",
  border: "1px solid rgba(255,255,255,0.15)",
});

const choiceButtonStyle = (active: boolean): React.CSSProperties => ({
  background: active ? "#FFB830" : "#000",
  color: active ? "#000" : "#fff",
  border: "none",
  padding: "2rem 1rem",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
  fontFamily: "Space Mono, monospace",
  borderRadius: "0px",
});

const toppingButtonStyle = (active: boolean): React.CSSProperties => ({
  background: active ? "#FF3C3C" : "#000",
  color: active ? "#fff" : "rgba(255,255,255,0.5)",
  border: "none",
  padding: "1.2rem 1.8rem",
  fontSize: "0.75rem",
  cursor: "pointer",
  transition: "0.2s",
  fontFamily: "Space Mono, monospace",
  letterSpacing: "0.1em",
  borderRadius: "0px",
  flex: "1 0 auto",
});

const textToggleStyle = (active: boolean): React.CSSProperties => ({
  background: "none",
  border: "none",
  color: active ? "#FFB830" : "rgba(255,255,255,0.15)",
  fontFamily: "Righteous, sans-serif",
  fontSize: "2rem",
  cursor: "pointer",
  padding: 0,
  borderRadius: "0px",
  transition: "all 0.3s",
});

const billStyle: React.CSSProperties = {
  background: "#0a0a0a",
  padding: "3.5rem",
  borderRadius: "0px",
  border: "1px solid rgba(255,255,255,0.1)",
};

const billHeaderStyle: React.CSSProperties = {
  fontFamily: "Space Mono, monospace",
  fontSize: "0.7rem",
  letterSpacing: "0.3em",
  color: "#FFB830",
  marginBottom: "3rem",
};

const submitButtonStyle = (submitted: boolean): React.CSSProperties => ({
  width: "100%",
  padding: "1.8rem",
  background: submitted ? "#22AA44" : "#FF3C3C",
  color: "#fff",
  border: "none",
  borderRadius: "0px",
  fontFamily: "Space Mono, monospace",
  fontWeight: 700,
  letterSpacing: "clamp(0.1rem, 2vw, 0.4em)",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  marginTop: "3rem",
});

const billTotalLabel: React.CSSProperties = {
  display: "block",
  fontSize: "0.7rem",
  fontFamily: "Space Mono, monospace",
  color: "rgba(255,255,255,0.4)",
  letterSpacing: "0.4em",
  marginBottom: "1rem",
};

const billTotalValue: React.CSSProperties = {
  fontFamily: "Righteous, sans-serif",
  fontSize: "clamp(2rem, 8vw, 3.5rem)",
  color: "#FFB830",
  lineHeight: 1,
  letterSpacing: "-0.02em",
};

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div
        style={{
          fontFamily: "Space Mono, monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.3em",
          color: "#FF3C3C",
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function BillRow({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.4)",
            marginBottom: "6px",
            fontFamily: "Space Mono, monospace",
            letterSpacing: "0.1em",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: "1.2rem",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Righteous, sans-serif",
          }}
        >
          {value.toUpperCase()}
        </div>
      </div>
      {sub && (
        <div
          style={{
            fontSize: "1.1rem",
            color: "#FFB830",
            fontFamily: "Righteous, sans-serif",
            textAlign: "right",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}
