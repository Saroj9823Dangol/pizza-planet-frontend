"use client";
import { useCartStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const { isOpen, items, toggleCart, removeItem, updateQuantity, total } = useCartStore();
  const router = useRouter();

  const handleCheckout = () => {
    toggleCart();
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 1100,
            }}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "clamp(320px, 45vw, 500px)",
              background: "#fff",
              borderLeft: "1px solid #e8e0d8",
              zIndex: 1200,
              display: "flex",
              flexDirection: "column",
            }}>
            {/* Header */}
            <div style={{
              padding: "1.5rem 2rem",
              borderBottom: "1px solid #e8e0d8",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <div>
                <h2 style={{
                  fontFamily: "Righteous, sans-serif",
                  fontSize: "1.4rem",
                  color: "#2d2d2d",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}>🛒 YOUR TRAY</h2>
                <div style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "0.6rem",
                  color: "#f4a261",
                  letterSpacing: "0.15em",
                  marginTop: "2px",
                }}>
                  {items.length} {items.length === 1 ? "ITEM" : "ITEMS"} IN TRAY
                </div>
              </div>
              <button
                onClick={toggleCart}
                style={{
                  background: "none",
                  border: "1px solid #e8e0d8",
                  color: "#999",
                  padding: "6px 14px",
                  cursor: "pointer",
                  fontFamily: "Space Mono, monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.15em",
                }}>
                ✕ CLOSE
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "2rem" }}>
              {items.length === 0 ? (
                <div style={{
                  textAlign: "center",
                  padding: "5rem 0",
                  fontFamily: "Space Mono, monospace",
                  fontSize: "0.85rem",
                  color: "#999",
                  letterSpacing: "0.1em",
                }}>
                  <div style={{
                    fontSize: "3rem",
                    marginBottom: "1.5rem",
                    opacity: 0.3,
                    animation: "float 4s ease-in-out infinite",
                  }}>🍕</div>
                  <div>YOUR TRAY IS EMPTY</div>
                  <button
                    onClick={toggleCart}
                    style={{
                      marginTop: "2rem",
                      background: "none",
                      border: "2px solid #f4a261",
                      color: "#f4a261",
                      padding: "0.8rem 2rem",
                      fontFamily: "Space Mono, monospace",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      letterSpacing: "0.1em",
                    }}>
                    🍕 VIEW MENU
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {items.map((item) => (
                    <div key={item.id} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: "1.2rem",
                      borderBottom: "1px solid #f0ece6",
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontFamily: "Righteous, sans-serif",
                          color: "#2d2d2d",
                          fontSize: "1.1rem",
                          marginBottom: "2px",
                        }}>{item.name}</div>
                        <div style={{
                          fontFamily: "Space Mono, monospace",
                          fontSize: "0.65rem",
                          color: "#999",
                        }}>
                          Rs. {item.price.toLocaleString()}
                          {item.size ? ` • ${item.size}` : ""}
                          {item.crust ? ` • ${item.crust}` : ""}
                          {item.toppings && item.toppings.length > 0 && (
                            <div style={{ color: "#bbb", fontSize: "0.5rem", marginTop: "2px" }}>
                              + {item.toppings.join(" · ")}
                            </div>
                          )}
                          {item.notes && (
                            <div style={{ color: "#bbb", fontSize: "0.5rem", marginTop: "1px" }}>
                              📝 {item.notes}
                            </div>
                          )}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.6rem",
                          border: "1px solid #e8e0d8",
                          padding: "2px 10px",
                        }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#f4a261",
                              fontSize: "1rem",
                              cursor: "pointer",
                              padding: "0 2px",
                              lineHeight: 1,
                            }}>−</button>
                          <span style={{
                            minWidth: "18px",
                            textAlign: "center",
                            fontSize: "0.85rem",
                            color: "#2d2d2d",
                            fontFamily: "Space Mono, monospace",
                          }}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#f4a261",
                              fontSize: "1rem",
                              cursor: "pointer",
                              padding: "0 2px",
                              lineHeight: 1,
                            }}>+</button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#e63946",
                            fontSize: "0.5rem",
                            fontFamily: "Space Mono, monospace",
                            letterSpacing: "0.1em",
                            cursor: "pointer",
                            padding: "0",
                            textDecoration: "underline",
                          }}>
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{
                padding: "1.5rem 2rem",
                borderTop: "1px solid #e8e0d8",
                background: "#fffdf5",
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginBottom: "1.5rem",
                }}>
                  <div style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "0.6rem",
                    color: "#999",
                    letterSpacing: "0.3em",
                  }}>SUBTOTAL</div>
                  <div style={{
                    fontFamily: "Righteous, sans-serif",
                    fontSize: "2.4rem",
                    color: "#f4a261",
                    lineHeight: 1,
                  }}>Rs. {total().toLocaleString()}</div>
                </div>
                <motion.button
                  onClick={handleCheckout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "100%",
                    padding: "1.2rem",
                    background: "linear-gradient(135deg, #e63946, #f4a261)",
                    color: "#fff",
                    border: "none",
                    fontFamily: "Space Mono, monospace",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}>
                  🚀 CHECKOUT →
                </motion.button>
                <div style={{
                  textAlign: "center",
                  marginTop: "0.8rem",
                  fontFamily: "Space Mono, monospace",
                  fontSize: "0.55rem",
                  color: "#bbb",
                  letterSpacing: "0.1em",
                }}>
                  * TAXES & DELIVERY CALCULATED AT NEXT STEP
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
