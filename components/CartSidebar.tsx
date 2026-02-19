"use client";
import { useCartStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const { isOpen, items, toggleCart, removeItem, updateQuantity, total } =
    useCartStore();
  const router = useRouter();

  const handleCheckout = () => {
    toggleCart();
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(10px)",
              zIndex: 1100,
            }}
          />

          {/* Sidebar */}
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
              background: "#050505",
              borderLeft: "1px solid rgba(255,255,255,0.1)",
              zIndex: 1200,
              display: "flex",
              flexDirection: "column",
              borderRadius: "0px",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "2rem",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "Righteous, sans-serif",
                    fontSize: "1.8rem",
                    color: "#fff",
                    margin: 0,
                    letterSpacing: "0.05em",
                  }}
                >
                  ORDERS
                </h2>
                <div
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "0.65rem",
                    color: "#FFB830",
                    letterSpacing: "0.2em",
                    marginTop: "6px",
                  }}
                >
                  {items.length} PIZZAS PREPPED
                </div>
              </div>
              <button onClick={toggleCart} style={closeButtonStyle}>
                CLOSE
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "2rem" }}>
              {items.length === 0 ? (
                <div style={emptyStateStyle}>
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "1.5rem",
                      opacity: 0.3,
                    }}
                  >
                    🥣
                  </div>
                  <div>NO DOUGH IN THE TRAY</div>
                  <button onClick={toggleCart} style={shopButtonStyle}>
                    VIEW MENU
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                  }}
                >
                  {items.map((item) => (
                    <div key={item.id} style={cartItemStyle}>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontFamily: "Righteous, sans-serif",
                            color: "#fff",
                            fontSize: "1.2rem",
                            marginBottom: "6px",
                          }}
                        >
                          {item.name}
                        </div>
                        <div
                          style={{
                            fontFamily: "Space Mono, monospace",
                            fontSize: "0.75rem",
                            color: "rgba(255,255,255,0.5)",
                          }}
                        >
                          BASE: {item.price.toLocaleString()}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1.5rem",
                        }}
                      >
                        <div style={qtyContainerStyle}>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            style={qtyBtnStyle}
                          >
                            −
                          </button>
                          <span
                            style={{
                              minWidth: "24px",
                              textAlign: "center",
                              fontSize: "1rem",
                              color: "#fff",
                              fontFamily: "Space Mono, monospace",
                            }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            style={qtyBtnStyle}
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          style={removeButtonStyle}
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                style={{
                  padding: "2.5rem 2rem",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  background: "#000",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginBottom: "2.5rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Space Mono, monospace",
                      fontSize: "0.7rem",
                      color: "rgba(255,255,255,0.4)",
                      letterSpacing: "0.3em",
                    }}
                  >
                    CHECKSUM
                  </div>
                  <div
                    style={{
                      fontFamily: "Righteous, sans-serif",
                      fontSize: "2.8rem",
                      color: "#FFB830",
                      lineHeight: 1,
                    }}
                  >
                    Rs. {total().toLocaleString()}
                  </div>
                </div>
                <button onClick={handleCheckout} style={checkoutButtonStyle}>
                  FINALIZE ORDER →
                </button>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "1.5rem",
                    fontFamily: "Space Mono, monospace",
                    fontSize: "0.6rem",
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.1em",
                  }}
                >
                  * TAXES AND DELIVERY CALCULATED AT NEXT STEP
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const closeButtonStyle: React.CSSProperties = {
  background: "none",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "rgba(255,255,255,0.6)",
  padding: "8px 20px",
  borderRadius: "0px",
  cursor: "pointer",
  fontFamily: "Space Mono, monospace",
  fontSize: "0.65rem",
  letterSpacing: "0.2em",
};

const emptyStateStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "8rem 0",
  fontFamily: "Space Mono, monospace",
  fontSize: "0.8rem",
  color: "rgba(255,255,255,0.4)",
  letterSpacing: "0.1em",
};

const shopButtonStyle: React.CSSProperties = {
  marginTop: "2.5rem",
  background: "none",
  border: "2px solid #FF3C3C",
  color: "#FF3C3C",
  padding: "1rem 2rem",
  fontFamily: "Space Mono, monospace",
  fontSize: "0.75rem",
  fontWeight: 700,
  cursor: "pointer",
  borderRadius: "0px",
};

const cartItemStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "2rem",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
};

const qtyContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1.2rem",
  border: "1px solid rgba(255,255,255,0.1)",
  padding: "8px 16px",
  borderRadius: "0px",
};

const qtyBtnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#fff",
  fontSize: "1.4rem",
  cursor: "pointer",
  padding: "0 8px",
  lineHeight: 1,
};

const removeButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#FF3C3C",
  fontSize: "0.6rem",
  fontFamily: "Space Mono, monospace",
  letterSpacing: "0.1em",
  cursor: "pointer",
  padding: "0",
  textDecoration: "underline",
};

const checkoutButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "1.5rem",
  background: "#FF3C3C",
  color: "#fff",
  border: "none",
  fontFamily: "Space Mono, monospace",
  fontWeight: 700,
  letterSpacing: "0.3em",
  fontSize: "0.9rem",
  cursor: "pointer",
  borderRadius: "0px",
};
