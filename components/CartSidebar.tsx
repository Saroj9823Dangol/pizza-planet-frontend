"use client";
import { useCartStore } from "@/lib/store";
import type { CartSource } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

const SOURCE_META: Record<CartSource, { label: string; tone: string }> = {
  MENU: { label: "Menu item", tone: "menu" },
  PROMO: { label: "Promo offer", tone: "promo" },
  CUSTOM: { label: "Custom build", tone: "custom" },
};

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
            className="fm-tray-overlay"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fm-tray"
            role="dialog"
            aria-label="Your tray"
          >
            {/* Header */}
            <header className="fm-tray-header">
              <div className="fm-tray-header-copy">
                <p className="fm-kicker">Your tray</p>
                <h2 className="fm-tray-title">
                  Tray time<span className="fm-red-dash">—</span>
                </h2>
                <p className="fm-tray-count">
                  {items.length} {items.length === 1 ? "item" : "items"} in the tray
                </p>
              </div>
              <button className="fm-tray-close" onClick={toggleCart} aria-label="Close tray">
                ✕
              </button>
            </header>

            {/* Items */}
            <div className="fm-tray-items">
              {items.length === 0 ? (
                <div className="fm-tray-empty">
                  <span className="fm-tray-empty-mark" aria-hidden="true">🍕</span>
                  <h3>
                    Empty tray<span className="fm-red-dash">—</span>
                  </h3>
                  <p>Nothing in the oven yet. Go find something tasty.</p>
                  <button type="button" className="fm-outline-button fm-outline-button--red" onClick={toggleCart}>
                    Browse the menu
                  </button>
                </div>
              ) : (
                <ul className="fm-tray-list">
                  {items.map((item) => {
                    const meta = item.source ? SOURCE_META[item.source] : null;
                    const lineTotal = item.price * item.quantity;
                    return (
                      <li key={item.id} className="fm-tray-item">
                        <div className="fm-tray-item-main">
                          <div className="fm-tray-item-top">
                            <h3>{item.name}</h3>
                            {meta ? (
                              <span className={`fm-source-tag fm-source-tag--${meta.tone}`}>{meta.label}</span>
                            ) : null}
                          </div>
                          <p className="fm-tray-item-meta">
                            Rs. {item.price.toLocaleString()}
                            {item.size ? ` · ${item.size}` : ""}
                            {item.crust ? ` · ${item.crust}` : ""}
                            {item.promoTitle ? ` · ${item.promoTitle}` : ""}
                          </p>
                          {item.toppings && item.toppings.length > 0 ? (
                            <div className="fm-tray-chips">
                              {item.toppings.map((topping) => (
                                <span key={topping}>+ {topping}</span>
                              ))}
                            </div>
                          ) : null}
                          {item.notes ? <p className="fm-tray-item-note">{item.notes}</p> : null}
                        </div>
                        <div className="fm-tray-item-side">
                          <div className="fm-tray-stepper">
                            <button type="button" aria-label="Decrease quantity" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                              −
                            </button>
                            <span>{item.quantity}</span>
                            <button type="button" aria-label="Increase quantity" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                              +
                            </button>
                          </div>
                          <span className="fm-tray-line-total">Rs. {lineTotal.toLocaleString()}</span>
                          <button type="button" className="fm-tray-remove" aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.id)}>
                            ✕
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 ? (
              <footer className="fm-tray-footer">
                <div className="fm-tray-subtotal">
                  <span>Subtotal</span>
                  <strong>Rs. {total().toLocaleString()}</strong>
                </div>
                <button type="button" className="fm-red-button fm-tray-checkout" onClick={handleCheckout}>
                  Checkout →
                </button>
                <p className="fm-tray-note">Taxes &amp; delivery are added at the next step</p>
              </footer>
            ) : null}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}