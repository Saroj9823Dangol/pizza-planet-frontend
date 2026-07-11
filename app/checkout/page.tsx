"use client";
import { useCartStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const router = useRouter();
  const [placed, setPlaced] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", email: "" });
  const [deliveryType, setDeliveryType] = useState<"PICKUP" | "DELIVERY">("PICKUP");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const handlePlaceOrder = () => {
    setPlaced(true);
    setTimeout(() => { clearCart(); router.push("/"); }, 2500);
  };

  if (items.length === 0 && !placed) {
    return (
      <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem", background: "#fff8f0", color: "#2d2d2d", padding: "2rem" }}>
        <div style={{ fontSize: "4rem" }}>🍕</div>
        <h1 style={{ fontFamily: "Righteous, sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", textAlign: "center" }}>YOUR TRAY IS EMPTY</h1>
        <p style={{ fontFamily: "DM Sans, sans-serif", color: "#999", textAlign: "center", maxWidth: "400px" }}>
          Add some delicious items from our menu first!
        </p>
        <motion.button whileHover={{ scale: 1.05 }} onClick={() => router.push("/menu")}
          style={{ background: "#e63946", border: "none", color: "#fff", padding: "1.2rem 3rem", fontFamily: "Space Mono, monospace", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.2em", cursor: "pointer" }}>
          🍕 VIEW MENU
        </motion.button>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "transparent", border: "none", borderBottom: "2px solid #e8e0d8",
    padding: "0.8rem 0", color: "#2d2d2d", fontFamily: "Space Mono, monospace",
    fontSize: "0.85rem", outline: "none",
  };

  return (
    <div style={{ minHeight: "100dvh", background: "#fff8f0", color: "#2d2d2d", padding: "clamp(1.5rem, 5vw, 4rem)" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Back + Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "2.5rem" }}>
          <button onClick={() => router.push("/")}
            style={{ background: "none", border: "none", color: "#999", fontFamily: "Space Mono, monospace", fontSize: "0.65rem", cursor: "pointer", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            ← BACK
          </button>
          <h1 style={{ fontFamily: "Righteous, sans-serif", fontSize: "clamp(1.8rem, 6vw, 3rem)", color: "#2d2d2d", margin: 0, letterSpacing: "-0.02em" }}>CHECKOUT 🛒</h1>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: "#999", marginTop: "0.3rem", fontSize: "0.9rem" }}>Almost there! Fill in your details to confirm your order.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
          {/* LEFT: Order Items + Details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontFamily: "Space Mono, monospace", fontSize: "0.6rem", justifyContent: "center" }}>
              <span style={{ padding: "0.3rem 0.8rem", borderRadius: "20px", background: "#e63946", color: "#fff", letterSpacing: "0.1em", fontWeight: 700 }}>📋 DETAILS</span>
              <span style={{ color: "#ddd" }}>→</span>
              <span style={{ padding: "0.3rem 0.8rem", borderRadius: "20px", background: "#e8e0d8", color: "#999", letterSpacing: "0.1em", fontWeight: 700 }}>💳 PAY</span>
            </div>

            {/* Order Items */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: "#fff", border: "1px solid #e8e0d8", padding: "1.5rem" }}>
              <h2 style={{ fontFamily: "Space Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.3em", color: "#f4a261", marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>🧾</span> ORDER ITEMS ({items.length})
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {items.map((item) => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "0.8rem", borderBottom: "1px solid #f0ece6" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "Righteous, sans-serif", color: "#2d2d2d", fontSize: "1rem" }}>
                        {item.name}
                        {item.size && <span style={{ color: "#f4a261", fontSize: "0.8rem", marginLeft: "0.4rem" }}>({item.size})</span>}
                      </div>
                      {item.toppings && item.toppings.length > 0 && (
                        <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.55rem", color: "#bbb", marginTop: "3px" }}>
                          + {item.toppings.join(" · ")}
                        </div>
                      )}
                      <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.55rem", color: "#999", marginTop: "2px" }}>
                        QTY: {item.quantity} × Rs. {item.price.toLocaleString()}
                      </div>
                    </div>
                    <div style={{ fontFamily: "Righteous, sans-serif", fontSize: "1rem", color: "#f4a261", whiteSpace: "nowrap", marginLeft: "1rem" }}>
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1.2rem", marginTop: "0.5rem", borderTop: "2px dashed #e8e0d8" }}>
                <span style={{ fontFamily: "Space Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.3em", color: "#999" }}>TOTAL</span>
                <span style={{ fontFamily: "Righteous, sans-serif", fontSize: "clamp(1.5rem, 4vw, 2.2rem)", color: "#f4a261", lineHeight: 1 }}>
                  Rs. {total().toLocaleString()}
                </span>
              </div>
            </motion.div>

            {/* Customer Details */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              style={{ background: "#fff", border: "1px solid #e8e0d8", padding: "1.5rem" }}>
              <h2 style={{ fontFamily: "Space Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.3em", color: "#f4a261", marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>📋</span> YOUR DETAILS
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                  <div>
                    <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.5rem", letterSpacing: "0.15em", color: "#e63946", marginBottom: "0.3rem" }}>YOUR NAME *</div>
                    <input type="text" required value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} placeholder="ENTER NAME" style={inputStyle} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.5rem", letterSpacing: "0.15em", color: "#e63946", marginBottom: "0.3rem" }}>PHONE *</div>
                    <input type="tel" required value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} placeholder="+977" style={inputStyle} />
                  </div>
                </div>

                {/* Delivery/Pickup */}
                <div>
                  <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.5rem", letterSpacing: "0.15em", color: "#e63946", marginBottom: "0.6rem" }}>PREFERENCE</div>
                  <div style={{ display: "flex", gap: "1px", background: "#e8e0d8", border: "1px solid #e8e0d8", width: "fit-content" }}>
                    <button onClick={() => setDeliveryType("PICKUP")}
                      style={{ background: deliveryType === "PICKUP" ? "#f4a261" : "#fff", color: deliveryType === "PICKUP" ? "#fff" : "#999", border: "none", padding: "0.7rem 1.5rem", fontFamily: "Space Mono, monospace", fontSize: "0.7rem", cursor: "pointer", fontWeight: 700, letterSpacing: "0.1em", transition: "all 0.2s" }}>
                      🏪 PICKUP
                    </button>
                    <button onClick={() => setDeliveryType("DELIVERY")}
                      style={{ background: deliveryType === "DELIVERY" ? "#f4a261" : "#fff", color: deliveryType === "DELIVERY" ? "#fff" : "#999", border: "none", padding: "0.7rem 1.5rem", fontFamily: "Space Mono, monospace", fontSize: "0.7rem", cursor: "pointer", fontWeight: 700, letterSpacing: "0.1em", transition: "all 0.2s" }}>
                      🚚 DELIVERY
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {deliveryType === "DELIVERY" && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.5rem", letterSpacing: "0.15em", color: "#e63946", marginBottom: "0.3rem" }}>DELIVERY ADDRESS *</div>
                      <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="STREET, CITY..." style={inputStyle} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email */}
                <div>
                  <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.5rem", letterSpacing: "0.15em", color: "#e63946", marginBottom: "0.3rem" }}>EMAIL (FOR RECEIPT)</div>
                  <input type="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} placeholder="OPTIONAL" style={inputStyle} />
                </div>

                {/* Notes */}
                <div>
                  <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.5rem", letterSpacing: "0.15em", color: "#e63946", marginBottom: "0.3rem" }}>ORDER NOTES</div>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                    placeholder="ALLERGIES, SPECIAL REQUESTS..."
                    style={{ ...inputStyle, borderBottom: "2px solid #e8e0d8", resize: "vertical", minHeight: "60px", fontFamily: "DM Sans, sans-serif" }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Summary & Place Order */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ position: "sticky", top: "100px", background: "#fff", border: "1px solid #e8e0d8", padding: "1.5rem" }}>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.3em", color: "#f4a261", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                🧾 ORDER SUMMARY
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Space Mono, monospace", fontSize: "0.6rem", color: "#999" }}>
                  <span>ITEMS ({items.length})</span>
                  <span>Rs. {total().toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Space Mono, monospace", fontSize: "0.6rem", color: "#999" }}>
                  <span>{deliveryType === "PICKUP" ? "🏪 PICKUP" : "🚚 DELIVERY"}</span>
                  <span>{deliveryType === "PICKUP" ? "FREE" : "Rs. 50"}</span>
                </div>
              </div>
              <div style={{ borderTop: "2px dashed #e8e0d8", paddingTop: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <span style={{ fontFamily: "Space Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.3em", color: "#999" }}>TOTAL</span>
                  <span style={{ fontFamily: "Righteous, sans-serif", fontSize: "clamp(1.5rem, 4vw, 2rem)", color: "#f4a261", lineHeight: 1 }}>
                    Rs. {(total() + (deliveryType === "DELIVERY" ? 50 : 0)).toLocaleString()}
                  </span>
                </div>
              </div>

              <motion.button onClick={handlePlaceOrder} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                disabled={placed || !customer.name || !customer.phone}
                style={{
                  width: "100%", padding: "1.2rem",
                  background: placed ? "#2a9d8f" : (!customer.name || !customer.phone) ? "#ddd" : "#e63946",
                  color: "#fff", border: "none",
                  fontFamily: "Space Mono, monospace", fontWeight: 700, letterSpacing: "0.2em",
                  fontSize: "0.9rem", cursor: placed || !customer.name || !customer.phone ? "default" : "pointer",
                  transition: "all 0.3s",
                }}>
                {placed
                  ? "🎉 ORDER PLACED! 🎉"
                  : (!customer.name || !customer.phone)
                    ? "✏️ FILL YOUR DETAILS"
                    : `🔥 PLACE ORDER — Rs. ${(total() + (deliveryType === "DELIVERY" ? 50 : 0)).toLocaleString()}`
                }
              </motion.button>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                style={{ textAlign: "center", marginTop: "1rem", fontFamily: "Space Mono, monospace", fontSize: "0.5rem", color: "#bbb", letterSpacing: "0.1em" }}>
                🧀 YOUR ORDER WILL BE READY IN 20-30 MINUTES
                {deliveryType === "DELIVERY" && <span> • DELIVERY FEE: Rs. 50</span>}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
