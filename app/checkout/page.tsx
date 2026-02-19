"use client";
import { useCartStore } from "@/lib/store";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const router = useRouter();

  const handlePlaceOrder = () => {
    alert("Thank you! Your order has been placed successfully.");
    clearCart();
    router.push("/");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        padding: "100px 1.5rem 4rem",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "rgba(255,255,255,0.4)",
            textDecoration: "none",
            fontFamily: "Space Mono, monospace",
            fontSize: "0.7rem",
            marginBottom: "3rem",
            letterSpacing: "0.1em",
          }}
        >
          ← RETURN TO SHOP
        </Link>

        <div style={{ marginBottom: "4rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <Image
                src="/logo/logo.jpg"
                alt="Logo"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <h1
              style={{
                fontFamily: "Righteous, sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                margin: 0,
              }}
            >
              Checkout
            </h1>
          </div>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.9rem",
            }}
          >
            Review your order and provide delivery details to complete your
            journey.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 380px",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* Main Section */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}
          >
            {/* Delivery Info */}
            <section>
              <h2 style={sectionHeaderStyle}>1. DELIVERY INFORMATION</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.25rem",
                }}
              >
                <div style={inputWrapper}>
                  <label style={labelStyle}>FIRST NAME</label>
                  <input placeholder="Aarav" style={inputStyle} />
                </div>
                <div style={inputWrapper}>
                  <label style={labelStyle}>LAST NAME</label>
                  <input placeholder="Shrestha" style={inputStyle} />
                </div>
                <div style={{ ...inputWrapper, gridColumn: "span 2" }}>
                  <label style={labelStyle}>EMAIL ADDRESS</label>
                  <input placeholder="aarav@example.com" style={inputStyle} />
                </div>
                <div style={{ ...inputWrapper, gridColumn: "span 2" }}>
                  <label style={labelStyle}>PHONE NUMBER</label>
                  <input placeholder="98XXXXXXXX" style={inputStyle} />
                </div>
                <div style={{ ...inputWrapper, gridColumn: "span 2" }}>
                  <label style={labelStyle}>STREET ADDRESS</label>
                  <input
                    placeholder="New Baneshwor, Kathmandu"
                    style={inputStyle}
                  />
                </div>
                <div style={inputWrapper}>
                  <label style={labelStyle}>CITY</label>
                  <input placeholder="Kathmandu" style={inputStyle} />
                </div>
                <div style={inputWrapper}>
                  <label style={labelStyle}>NEAREST LANDMARK</label>
                  <input placeholder="Near Civil Hospital" style={inputStyle} />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h2 style={sectionHeaderStyle}>2. PAYMENT METHOD</h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <label style={radioContainerStyle}>
                  <input type="radio" name="payment" defaultChecked />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <span>Cash on Delivery</span>
                    <span style={{ fontSize: "0.65rem", opacity: 0.5 }}>
                      PAY AT YOUR DOOR
                    </span>
                  </div>
                </label>
                <label style={radioContainerStyle}>
                  <input type="radio" name="payment" />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <span>QR Scan / Fonepay</span>
                    <span style={{ fontSize: "0.65rem", opacity: 0.5 }}>
                      SCAN ON DELIVERY
                    </span>
                  </div>
                </label>
                <label style={radioContainerStyle}>
                  <input type="radio" name="payment" disabled />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ opacity: 0.5 }}>eSewa / Khalti</span>
                    <span style={{ fontSize: "0.55rem", color: "#FF3C3C" }}>
                      COMING SOON
                    </span>
                  </div>
                </label>
              </div>
            </section>

            <button
              onClick={handlePlaceOrder}
              disabled={items.length === 0}
              style={{
                background: items.length === 0 ? "#222" : "#FF3C3C",
                color: items.length === 0 ? "#444" : "#fff",
                border: "none",
                padding: "1.25rem",
                fontFamily: "Space Mono, monospace",
                fontSize: "0.85rem",
                letterSpacing: "0.25em",
                cursor: items.length === 0 ? "not-allowed" : "pointer",
                transition: "all 0.3s",
                marginTop: "1rem",
              }}
            >
              CONFIRM ORDER
            </button>
          </div>

          {/* Sidebar / Order Summary */}
          <aside
            style={{
              background: "#0a0a0a",
              padding: "2.5rem",
              border: "1px solid rgba(255,184,48,0.1)",
              position: "sticky",
              top: "100px",
            }}
          >
            <h3
              style={{
                fontFamily: "Righteous, sans-serif",
                fontSize: "1.2rem",
                color: "#FFB830",
                marginBottom: "2rem",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                paddingBottom: "1rem",
              }}
            >
              ORDER SUMMARY
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                marginBottom: "2.5rem",
              }}
            >
              {items.length === 0 ? (
                <div
                  style={{
                    color: "rgba(255,255,255,0.2)",
                    fontSize: "0.75rem",
                    textAlign: "center",
                    padding: "2rem 0",
                  }}
                >
                  YOUR CART IS EMPTY
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: "DM Sans, sans-serif",
                          fontSize: "0.85rem",
                          fontWeight: 500,
                          color: "#fff",
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "Space Mono, monospace",
                          fontSize: "0.65rem",
                          color: "rgba(255,255,255,0.4)",
                          marginTop: "4px",
                        }}
                      >
                        QTY: {item.quantity} · {item.size || "Standard"}
                      </div>
                    </div>
                    <div
                      style={{
                        fontFamily: "Righteous, sans-serif",
                        fontSize: "0.9rem",
                        color: "#fff",
                      }}
                    >
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: "1.5rem",
              }}
            >
              <div style={summaryRowStyle}>
                <span>Subtotal</span>
                <span>Rs. {total().toLocaleString()}</span>
              </div>
              <div style={summaryRowStyle}>
                <span>Delivery Fee</span>
                <span>{total() > 1500 ? "FREE" : "Rs. 100"}</span>
              </div>
              <div
                style={{
                  ...summaryRowStyle,
                  marginTop: "1rem",
                  paddingTop: "1rem",
                  borderTop: "1px dashed rgba(255,255,255,0.1)",
                }}
              >
                <span style={{ color: "#fff", fontWeight: 700 }}>TOTAL</span>
                <span
                  style={{
                    fontFamily: "Righteous, sans-serif",
                    fontSize: "1.8rem",
                    color: "#FFB830",
                  }}
                >
                  Rs.{" "}
                  {(
                    total() + (total() > 1500 || total() === 0 ? 0 : 100)
                  ).toLocaleString()}
                </span>
              </div>
            </div>

            <p
              style={{
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.2)",
                marginTop: "2rem",
                textAlign: "center",
                lineHeight: 1.6,
              }}
            >
              BY PLACING AN ORDER, YOU AGREE TO PIZZA PLANET&apos;S TERMS OF
              SERVICE AND PRIVACY POLICY.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

const sectionHeaderStyle: React.CSSProperties = {
  fontFamily: "Space Mono, monospace",
  fontSize: "0.75rem",
  letterSpacing: "0.25em",
  color: "#FFB830",
  marginBottom: "2rem",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  paddingBottom: "0.75rem",
};

const inputWrapper: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "Space Mono, monospace",
  fontSize: "0.6rem",
  letterSpacing: "0.15em",
  color: "rgba(255,255,255,0.4)",
};

const inputStyle: React.CSSProperties = {
  background: "#0d0d0d",
  border: "1px solid rgba(255,255,255,0.1)",
  padding: "1rem",
  color: "#fff",
  fontFamily: "DM Sans, sans-serif",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s",
};

const radioContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  background: "#0a0a0a",
  padding: "1.25rem",
  border: "1px solid rgba(255,255,255,0.06)",
  cursor: "pointer",
  fontFamily: "Space Mono, monospace",
  fontSize: "0.75rem",
  transition: "all 0.2s",
};

const summaryRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontFamily: "DM Sans, sans-serif",
  fontSize: "0.85rem",
  color: "rgba(255,255,255,0.5)",
};
