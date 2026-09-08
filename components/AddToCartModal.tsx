"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store";
import { ApiMenuItem, rs } from "@/lib/api";

export default function AddToCartModal({
  item,
  onClose,
}: {
  item: ApiMenuItem;
  onClose: () => void;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleCart = useCartStore((s) => s.toggleCart);

  const toppings = (item.toppings ?? []).map((t) => t.topping);
  const defaultVariant = item.variants.find((v) => v.isDefault) ?? item.variants[0];

  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    defaultVariant?.id,
  );
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  const toggleTopping = (id: string) =>
    setSelectedToppings((t) =>
      t.includes(id) ? t.filter((x) => x !== id) : [...t, id],
    );

  const variant = item.variants.find((v) => v.id === selectedVariantId);
  const unitPaisa =
    (variant?.price ?? item.basePrice) +
    selectedToppings.reduce(
      (sum, tid) => sum + (toppings.find((t) => t.id === tid)?.price ?? 0),
      0,
    );
  const totalPaisa = unitPaisa * quantity;

  const handleAdd = () => {
    const chosenNames = selectedToppings
      .map((tid) => toppings.find((t) => t.id === tid)?.name)
      .filter(Boolean) as string[];

    const cartId = `${item.id}|${selectedVariantId ?? "base"}|${[...selectedToppings].sort().join(",")}|${notes}`;

    addItem({
      id: cartId,
      name: item.name,
      price: unitPaisa / 100, // NPR for display
      size: variant?.name,
      toppings: chosenNames.length ? chosenNames : undefined,
      notes: notes || undefined,
      itemId: item.id,
      variantId: selectedVariantId,
      toppingIds: selectedToppings.length ? selectedToppings : undefined,
      source: "MENU",
    });
    onClose();
    setTimeout(() => toggleCart(), 250);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(33,30,25,0.55)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 30 }}
        transition={{ type: "spring", damping: 26, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="board-card"
        style={{
          maxWidth: "520px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Header */}
        <div style={{ position: "relative", background: "var(--paper-deep)", borderBottom: "1.5px solid var(--ink)" }}>
          {item.image && (
            <div style={{ position: "relative", width: "100%", height: "170px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(0deg, rgba(33,30,25,0.55) 0%, transparent 60%)",
                }}
              />
            </div>
          )}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "var(--paper)",
              border: "1.5px solid var(--ink)",
              color: "var(--ink)",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            ✕
          </button>
          <div style={{ position: "absolute", bottom: "14px", left: "20px", right: "20px" }}>
            <h3
              className="serif"
              style={{ fontSize: "1.5rem", fontWeight: 600, color: "#fff", margin: 0 }}
            >
              {item.name}
            </h3>
            <div className="eyebrow" style={{ color: "rgba(255,255,255,0.75)" }}>
              {item.category.name} {item.isVeg ? "· VEG" : "· NON-VEG"}
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "1.4rem 1.5rem 1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.3rem",
            background: "#fffdf8",
          }}
        >
          {/* Sizes / variants */}
          {item.variants.length > 0 && (
            <div>
              <div className="eyebrow" style={{ color: "var(--tomato)", marginBottom: "0.55rem" }}>
                1 · PICK YOUR PAN
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${Math.min(item.variants.length, 3)}, 1fr)`,
                  gap: "6px",
                }}
              >
                {item.variants.map((v) => {
                  const active = selectedVariantId === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantId(v.id)}
                      disabled={!v.isAvailable}
                      style={{
                        background: active ? "var(--ink)" : "#fffdf8",
                        color: active ? "var(--paper)" : "var(--ink)",
                        border: "1.5px solid var(--ink)",
                        padding: "0.7rem 0.4rem",
                        cursor: v.isAvailable ? "pointer" : "not-allowed",
                        opacity: v.isAvailable ? 1 : 0.45,
                        fontFamily: '"Space Mono", monospace',
                        fontSize: "0.6rem",
                        transition: "all 0.15s",
                      }}
                    >
                      <div style={{ letterSpacing: "0.05em" }}>{v.name}</div>
                      <div style={{ marginTop: "3px", color: active ? "var(--mustard)" : "var(--tomato)" }}>
                        {rs(v.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Toppings */}
          {toppings.length > 0 && (
            <div>
              <div className="eyebrow" style={{ color: "var(--tomato)", marginBottom: "0.55rem" }}>
                2 · STACK IT UP
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {toppings.map((t) => {
                  const active = selectedToppings.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      onClick={() => toggleTopping(t.id)}
                      style={{
                        background: active ? "var(--tomato)" : "#fffdf8",
                        color: active ? "#fff" : "var(--ink-soft)",
                        border: "1.5px solid",
                        borderColor: active ? "var(--tomato)" : "var(--rule)",
                        padding: "0.5rem 0.85rem",
                        cursor: "pointer",
                        fontFamily: '"Space Mono", monospace',
                        fontSize: "0.55rem",
                        letterSpacing: "0.05em",
                        transition: "all 0.15s",
                      }}
                    >
                      {active ? "✓ " : "+ "}
                      {t.name.toUpperCase()} (+{rs(t.price)})
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity + notes */}
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "1rem", alignItems: "end" }}>
            <div>
              <div className="eyebrow" style={{ color: "var(--tomato)", marginBottom: "0.55rem" }}>
                3 · QTY
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.9rem",
                  border: "1.5px solid var(--ink)",
                  padding: "0.35rem 0.9rem",
                  width: "fit-content",
                  background: "#fffdf8",
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ background: "none", border: "none", fontSize: "1.1rem", color: "var(--tomato)", cursor: "pointer" }}
                >
                  −
                </button>
                <span className="serif" style={{ fontSize: "1.1rem", fontWeight: 600, minWidth: "22px", textAlign: "center" }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ background: "none", border: "none", fontSize: "1.1rem", color: "var(--tomato)", cursor: "pointer" }}
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <div className="eyebrow" style={{ color: "var(--tomato)", marginBottom: "0.55rem" }}>
                KITCHEN NOTES
              </div>
              <input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="EXTRA CRISPY, NO ONION…"
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1.5px solid var(--rule)",
                  padding: "0.5rem 0",
                  fontFamily: '"Space Mono", monospace',
                  fontSize: "0.65rem",
                  color: "var(--ink)",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "1rem 1.5rem 1.4rem",
            borderTop: "1.5px solid var(--ink)",
            background: "var(--paper)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div>
            <div className="eyebrow">Total</div>
            <div className="serif" style={{ fontSize: "1.6rem", fontWeight: 600, color: "var(--tomato)" }}>
              {rs(totalPaisa)}
            </div>
          </div>
          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: "0.95rem 1.8rem",
              background: "var(--tomato)",
              color: "#fff",
              border: "2px solid var(--ink)",
              boxShadow: "4px 4px 0 var(--ink)",
              fontFamily: '"Space Mono", monospace',
              fontWeight: 700,
              letterSpacing: "0.15em",
              fontSize: "0.7rem",
              cursor: "pointer",
            }}
          >
            + ADD TO TRAY
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
