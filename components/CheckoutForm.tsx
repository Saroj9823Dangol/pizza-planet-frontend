"use client";
import { useCartStore } from "@/lib/store";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { placeOrder, PlacedOrder, rs, ApiBranch } from "@/lib/api";

const DELIVERY_FEE_NPR = 150;
const VAT_RATE = 0.13;

export default function CheckoutForm({ branches }: { branches: ApiBranch[] }) {
  const { items, total, clearCart } = useCartStore();
  const router = useRouter();

  const locs = branches.length ? branches : [];
  const defaultBranch = locs[0]?.slug ?? "baneshwor";

  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customer, setCustomer] = useState({ name: "", phone: "" });
  const [deliveryType, setDeliveryType] = useState<"TAKEAWAY" | "DELIVERY" | "DINE_IN">("TAKEAWAY");
  const [branch, setBranch] = useState(defaultBranch);
  const [address, setAddress] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [notes, setNotes] = useState("");

  const subtotal = total();
  const vat = Math.round(subtotal * VAT_RATE);
  const deliveryFee = deliveryType === "DELIVERY" ? DELIVERY_FEE_NPR : 0;
  const grandTotal = subtotal + vat + deliveryFee;

  const canSubmit =
    customer.name.trim().length >= 2 &&
    /^[0-9+\- ]{7,15}$/.test(customer.phone.trim()) &&
    (deliveryType !== "DELIVERY" || address.trim().length > 0) &&
    !submitting;

  const handlePlaceOrder = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const order = await placeOrder({
        customerName: customer.name.trim(),
        customerPhone: customer.phone.trim(),
        type: deliveryType,
        address: deliveryType === "DELIVERY" ? address.trim() : undefined,
        tableNumber: deliveryType === "DINE_IN" && tableNumber ? parseInt(tableNumber, 10) : undefined,
        note: notes.trim() || undefined,
        paymentMethod: "CASH",
        branchId: branch,
        items: items.map((i) => ({
          itemId: i.itemId!,
          variantId: i.variantId,
          quantity: i.quantity,
          toppingIds: i.toppingIds,
          note: i.notes,
          source: i.source ?? "MENU",
          promoId: i.promoId,
          crustId: i.crustId,
          baseId: i.baseId,
          sizeId: i.sizeId,
        })),
      });
      setPlaced(order);
      clearCart();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedLoc = locs.find((l) => l.slug === branch);

  // ── Success screen — the tear-off receipt ──
  if (placed) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          background: "var(--paper)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          className="board-card"
          style={{ maxWidth: "460px", width: "100%", padding: "2.5rem", textAlign: "center" }}
        >
          <div className="eyebrow" style={{ marginBottom: "0.75rem" }}>~ Order Confirmed ~</div>
          <h1
            className="serif"
            style={{ fontSize: "clamp(2rem, 6vw, 3rem)", color: "var(--ink)", margin: 0, lineHeight: 1.05 }}
          >
            Grazie, <em style={{ color: "var(--tomato)" }}>{customer.name.split(" ")[0] || "friend"}!</em>
          </h1>
          <p style={{ fontFamily: '"DM Sans", sans-serif', color: "var(--ink-soft)", margin: "1rem 0 1.8rem" }}>
            Your order is on the board. The kitchen has been notified.
          </p>

          <div
            style={{
              border: "1.5px dashed var(--ink)",
              padding: "1.5rem",
              background: "#fffdf8",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8rem" }}>
              <span className="eyebrow">Ticket</span>
              <span
                className="serif"
                style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--tomato)" }}
              >
                {placed.orderNumber}
              </span>
            </div>
            <ReceiptLine
              label="Branch"
              value={selectedLoc?.name.toUpperCase() ?? "Headquarters"}
            />
            <ReceiptLine label="Subtotal" value={rs(placed.subtotal)} />
            <ReceiptLine label="Delivery" value={placed.deliveryFee ? rs(placed.deliveryFee) : "FREE"} />
            <ReceiptLine label="VAT (13%)" value={rs(placed.tax)} />
            <div style={{ borderTop: "1.5px dashed var(--rule)", margin: "0.6rem 0" }} />
            <ReceiptLine label="Total" value={rs(placed.total)} big />
          </div>

          <button
            onClick={() => router.push("/")}
            className="serif"
            style={{
              marginTop: "1.8rem",
              padding: "0.9rem 2.4rem",
              background: "var(--ink)",
              color: "var(--paper)",
              border: "2px solid var(--ink)",
              boxShadow: "4px 4px 0 var(--tomato)",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Back to the planet →
          </button>
        </motion.div>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1.5px solid var(--rule)",
    padding: "0.7rem 0",
    color: "var(--ink)",
    fontFamily: '"Space Mono", monospace',
    fontSize: "0.85rem",
    outline: "none",
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--paper)",
        color: "var(--ink)",
        padding: "clamp(1.5rem, 5vw, 4rem)",
        paddingTop: "110px",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <button
          onClick={() => router.push("/menu")}
          className="eyebrow"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            marginBottom: "1rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          ← BACK TO THE BOARD
        </button>
        <h1
          className="serif"
          style={{ fontSize: "clamp(2rem, 6vw, 3.4rem)", color: "var(--ink)", margin: 0, lineHeight: 1.05 }}
        >
          The <em style={{ color: "var(--tomato)" }}>Ticket</em>
        </h1>
        <p style={{ fontFamily: '"DM Sans", sans-serif', color: "var(--ink-soft)", margin: "0.5rem 0 2rem" }}>
          Almost there — fill in your details and we&apos;ll fire up the oven.
        </p>

        {items.length === 0 ? (
          <div className="board-card" style={{ padding: "3rem", textAlign: "center" }}>
            <p className="serif" style={{ fontSize: "1.4rem", marginBottom: "1.2rem" }}>
              Your tray is empty.
            </p>
            <button
              onClick={() => router.push("/menu")}
              className="eyebrow"
              style={{
                background: "var(--tomato)",
                color: "#fff",
                border: "2px solid var(--ink)",
                boxShadow: "4px 4px 0 var(--ink)",
                padding: "0.8rem 2rem",
                cursor: "pointer",
              }}
            >
              SEE THE MENU →
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
            {/* ITEMS */}
            <div className="board-card" style={{ padding: "1.5rem" }}>
              <div className="eyebrow" style={{ color: "var(--tomato)", marginBottom: "1rem" }}>
                🧾 ORDER ITEMS ({items.length})
              </div>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    paddingBottom: "0.7rem",
                    borderBottom: "1px dotted var(--rule)",
                    marginBottom: "0.7rem",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <span className="serif" style={{ fontWeight: 600, fontSize: "1rem" }}>
                      {item.name}
                    </span>
                    {item.size && <span style={{ color: "var(--tomato)", fontSize: "0.8rem", marginLeft: "0.4rem" }}>({item.size})</span>}
                    {item.crust && <span style={{ color: "var(--ink-soft)", fontSize: "0.8rem", marginLeft: "0.4rem" }}>[{item.crust} crust]</span>}
                    {item.promoTitle && <span style={{ color: "var(--tomato)", fontSize: "0.75rem", marginLeft: "0.4rem" }}>⚡ {item.promoTitle}</span>}
                    {item.toppings && item.toppings.length > 0 && (
                      <div className="eyebrow" style={{ fontSize: "0.5rem", marginTop: "2px" }}>
                        + {item.toppings.join(" · ")}
                      </div>
                    )}
                    <div className="eyebrow" style={{ fontSize: "0.55rem", marginTop: "2px" }}>
                      QTY {item.quantity} × Rs. {item.price.toLocaleString()}
                    </div>
                  </div>
                  <span className="serif" style={{ fontWeight: 600, color: "var(--tomato)", whiteSpace: "nowrap" }}>
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* DETAILS */}
            <div className="board-card" style={{ padding: "1.5rem" }}>
              <div className="eyebrow" style={{ color: "var(--tomato)", marginBottom: "1.2rem" }}>
                📋 YOUR DETAILS
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                  <div>
                    <div className="eyebrow" style={{ color: "var(--tomato)", marginBottom: "0.3rem" }}>NAME *</div>
                    <input
                      type="text"
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      placeholder="YOUR NAME"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <div className="eyebrow" style={{ color: "var(--tomato)", marginBottom: "0.3rem" }}>PHONE *</div>
                    <input
                      type="tel"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      placeholder="98XXXXXXXX"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <div className="eyebrow" style={{ color: "var(--tomato)", marginBottom: "0.55rem" }}>PREFERENCE</div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {(["TAKEAWAY", "DELIVERY", "DINE_IN"] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setDeliveryType(type)}
                        style={{
                          background: deliveryType === type ? "var(--ink)" : "#fffdf8",
                          color: deliveryType === type ? "var(--paper)" : "var(--ink-soft)",
                          border: "1.5px solid var(--ink)",
                          padding: "0.65rem 1.1rem",
                          fontFamily: '"Space Mono", monospace',
                          fontSize: "0.6rem",
                          letterSpacing: "0.1em",
                          cursor: "pointer",
                        }}
                      >
                        {type === "TAKEAWAY" ? "🏪 PICKUP" : type === "DELIVERY" ? "🚚 DELIVERY" : "🍽️ DINE IN"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="eyebrow" style={{ color: "var(--tomato)", marginBottom: "0.55rem" }}>PICKUP / DINING LOCATION</div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {locs.map((l) => (
                      <button
                        key={l.slug}
                        onClick={() => setBranch(l.slug)}
                        style={{
                          background: branch === l.slug ? "var(--ink)" : "#fffdf8",
                          color: branch === l.slug ? "var(--paper)" : "var(--ink-soft)",
                          border: "1.5px solid var(--ink)",
                          padding: "0.65rem 1.1rem",
                          fontFamily: '"Space Mono", monospace',
                          fontSize: "0.6rem",
                          letterSpacing: "0.1em",
                          cursor: "pointer",
                        }}
                      >
                        📍 {l.name.toUpperCase()}
                      </button>
                    ))}
                  </div>
                  <div className="eyebrow" style={{ fontSize: "0.5rem", marginTop: "0.45rem", color: "var(--ink-faint)" }}>
                    {selectedLoc ? [selectedLoc.address, selectedLoc.city].filter(Boolean).join(", ").toUpperCase() : ""}
                  </div>
                </div>

                {deliveryType === "DELIVERY" && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="eyebrow" style={{ color: "var(--tomato)", marginBottom: "0.3rem" }}>DELIVERY ADDRESS *</div>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="STREET, AREA, CITY…"
                      style={inputStyle}
                    />
                  </motion.div>
                )}
                {deliveryType === "DINE_IN" && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="eyebrow" style={{ color: "var(--tomato)", marginBottom: "0.3rem" }}>TABLE NUMBER</div>
                    <input
                      type="number"
                      min={1}
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="E.G. 7"
                      style={{ ...inputStyle, maxWidth: "120px" }}
                    />
                  </motion.div>
                )}

                <div>
                  <div className="eyebrow" style={{ color: "var(--tomato)", marginBottom: "0.3rem" }}>NOTES FOR THE KITCHEN</div>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="ALLERGIES, SPECIAL REQUESTS…"
                    style={{ ...inputStyle, resize: "vertical", minHeight: "56px", fontFamily: '"DM Sans", sans-serif' }}
                  />
                </div>
              </div>
            </div>

            {/* SUMMARY */}
            <div className="board-card" style={{ padding: "1.5rem" }}>
              <div className="eyebrow" style={{ color: "var(--tomato)", marginBottom: "1rem" }}>🧾 SUMMARY</div>
              <ReceiptLine label="Subtotal" value={`Rs. ${subtotal.toLocaleString()}`} />
              <ReceiptLine label="Delivery" value={deliveryFee ? `Rs. ${deliveryFee}` : "FREE"} />
              <ReceiptLine label="VAT (13%)" value={`Rs. ${vat.toLocaleString()}`} />
              <div style={{ borderTop: "1.5px dashed var(--rule)", margin: "0.8rem 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span className="eyebrow">TOTAL</span>
                <span className="serif" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700, color: "var(--tomato)", lineHeight: 1 }}>
                  Rs. {grandTotal.toLocaleString()}
                </span>
              </div>

              {error && (
                <div
                  style={{
                    marginTop: "1rem",
                    padding: "0.8rem 1rem",
                    border: "1.5px solid var(--tomato)",
                    background: "rgba(198,54,44,0.06)",
                    fontFamily: '"Space Mono", monospace',
                    fontSize: "0.65rem",
                    color: "var(--tomato)",
                  }}
                >
                  ⚠ {error}
                </div>
              )}

              <motion.button
                onClick={handlePlaceOrder}
                whileHover={canSubmit ? { scale: 1.01 } : undefined}
                whileTap={canSubmit ? { scale: 0.99 } : undefined}
                disabled={!canSubmit}
                style={{
                  width: "100%",
                  marginTop: "1.4rem",
                  padding: "1.15rem",
                  background: canSubmit ? "var(--tomato)" : "var(--rule)",
                  color: "#fff",
                  border: "2px solid var(--ink)",
                  boxShadow: canSubmit ? "5px 5px 0 var(--ink)" : "none",
                  fontFamily: '"Space Mono", monospace',
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  fontSize: "0.8rem",
                  cursor: canSubmit ? "pointer" : "default",
                }}
              >
                {submitting ? "SENDING TO KITCHEN…" : `SEND TO KITCHEN — Rs. ${grandTotal.toLocaleString()} →`}
              </motion.button>
              <div className="eyebrow" style={{ textAlign: "center", marginTop: "0.8rem", fontSize: "0.5rem" }}>
                PAY AT COUNTER OR ON DELIVERY · READY IN 20–30 MIN
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ReceiptLine({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "0.25rem 0",
      }}
    >
      <span className="eyebrow" style={big ? { color: "var(--ink)" } : undefined}>{label}</span>
      <span
        className="serif"
        style={{
          fontWeight: big ? 700 : 500,
          fontSize: big ? "1.3rem" : "0.95rem",
          color: big ? "var(--tomato)" : "var(--ink)",
        }}
      >
        {value}
      </span>
    </div>
  );
}