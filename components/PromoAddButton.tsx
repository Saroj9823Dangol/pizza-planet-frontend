"use client";
import { useState } from "react";
import { useCartStore } from "@/lib/store";
import type { ApiPromo } from "@/lib/api-server";

/**
 * The ONLY client piece of a promo banner — a product-linked promo shows this
 * instead of a plain link, so the offer lands in the tray at its promo price
 * and the resulting order line is attributed to PROMO on the backend.
 */
export default function PromoAddButton({ promo }: { promo: ApiPromo }) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!promo.menuItemId || promo.price === null) return;
    addItem({
      id: `promo-${promo.id}`,
      name: promo.menuItem?.name ?? promo.title,
      price: promo.price / 100, // NPR for display
      notes: `${promo.title} offer`,
      itemId: promo.menuItemId,
      source: "PROMO",
      promoId: promo.id,
      promoTitle: promo.title,
    });
    setAdded(true);
    window.setTimeout(() => {
      setAdded(false);
      toggleCart();
    }, 650);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`fm-outline-button ${promo.isFeatured ? "fm-outline-button--solid" : ""}`}
    >
      {added ? "Added to tray ✓" : "Add to tray"}
    </button>
  );
}