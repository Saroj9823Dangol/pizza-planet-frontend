"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ApiCrust, ApiMenuItem, fetchMenuItems, fetchCrusts, rs } from "@/lib/api";
import { useCartStore } from "@/lib/store";

const FALLBACK_CRUSTS: ApiCrust[] = [
  { id: "classic", name: "Classic", note: "soft, airy edge", priceDelta: 0, isActive: true, sortOrder: 0 },
  { id: "thin", name: "Thin", note: "crisp and light", priceDelta: 0, isActive: true, sortOrder: 1 },
  { id: "cheese-edge", name: "Cheese edge", note: "extra mozzarella", priceDelta: 10000, isActive: true, sortOrder: 2 },
];

export default function PizzaBuilder({ crusts: serverCrusts }: { crusts?: ApiCrust[] }) {
  const [items, setItems] = useState<ApiMenuItem[]>([]);
  const [crusts, setCrusts] = useState<ApiCrust[]>(serverCrusts?.length ? serverCrusts : FALLBACK_CRUSTS);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [selectedToppingIds, setSelectedToppingIds] = useState<string[]>([]);
  const [crustId, setCrustId] = useState(serverCrusts?.[0]?.id ?? FALLBACK_CRUSTS[0].id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const toggleCart = useCartStore((state) => state.toggleCart);

  useEffect(() => {
    fetchMenuItems().then((data) => {
      const pizzas = data.filter((item) => item.category.slug.includes("pizza") || item.tags.some((tag) => tag.toLowerCase().includes("pizza")));
      const nextItems = pizzas.length ? pizzas : data;
      setItems(nextItems);
      const first = nextItems[0];
      if (first) {
        setSelectedItemId(first.id);
        setSelectedVariantId((first.variants.find((variant) => variant.isDefault) ?? first.variants[0])?.id ?? "");
      }
    });
    // If the server didn't provide crusts (client-only mount), fetch them live.
    if (!serverCrusts?.length) {
      fetchCrusts().then((live) => {
        if (live.length) {
          setCrusts(live);
          setCrustId(live[0].id);
        }
      });
    }
  }, [serverCrusts]);

  const selectedItem = items.find((item) => item.id === selectedItemId) ?? items[0];
  const selectedVariant = selectedItem?.variants.find((variant) => variant.id === selectedVariantId) ?? selectedItem?.variants[0];
  const toppings = useMemo(() => (selectedItem?.toppings ?? []).map((entry) => entry.topping), [selectedItem]);
  const selectedCrust = crusts.find((c) => c.id === crustId) ?? crusts[0];
  const toppingTotal = selectedToppingIds.reduce((sum, id) => sum + (toppings.find((topping) => topping.id === id)?.price ?? 0), 0);
  const unitPrice = (selectedVariant?.price ?? selectedItem?.basePrice ?? 0) + toppingTotal + (selectedCrust?.priceDelta ?? 0);
  const totalPrice = unitPrice * quantity;

  const changeItem = (id: string) => {
    const item = items.find((entry) => entry.id === id);
    setSelectedItemId(id);
    setSelectedToppingIds([]);
    setSelectedVariantId((item?.variants.find((variant) => variant.isDefault) ?? item?.variants[0])?.id ?? "");
  };

  const toggleTopping = (id: string) => {
    setSelectedToppingIds((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  };

  const addToTray = () => {
    if (!selectedItem || !selectedVariant) return;
    const toppingNames = selectedToppingIds.map((id) => toppings.find((topping) => topping.id === id)?.name).filter(Boolean) as string[];
    addItem({
      id: `builder-${selectedItem.id}-${selectedVariant.id}-${selectedToppingIds.slice().sort().join("-")}-${crustId}`,
      name: selectedItem.name,
      price: unitPrice / 100,
      size: selectedVariant.name,
      crust: selectedCrust?.name,
      toppings: toppingNames,
      itemId: selectedItem.id,
      variantId: selectedVariant.id,
      toppingIds: selectedToppingIds,
      notes: `${selectedCrust?.name ?? ""} crust`,
      // Custom build — the kitchen needs to know this wasn't a plain menu item.
      source: "CUSTOM",
      crustId,
      crustName: selectedCrust?.name,
    });
    setAdded(true);
    window.setTimeout(() => {
      setAdded(false);
      toggleCart();
    }, 650);
  };

  return (
    <section id="build-your-pizza" className="fm-builder fm-wave-section fm-wave-section--paper-deep">
      <div className="fm-builder-heading">
        <p className="fm-kicker">Make it yours.</p>
        <h2 className="fm-hand-title">Build your pizza<span className="fm-red-dash">—</span></h2>
        <p>Choose a Pizza Planet favourite, change the size, add toppings, and send your own combination to the oven.</p>
      </div>

      <div className="fm-builder-layout">
        <div className="fm-builder-preview">
          <div className="fm-builder-pizza fm-organic-b">
            <img src={selectedItem?.image || "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000&q=85"} alt={selectedItem?.name || "Pizza builder preview"} />
            <span className="fm-builder-badge">YOUR<br />PIE</span>
          </div>
          <div className="fm-builder-total"><span>Your total</span><strong>{rs(totalPrice)}</strong></div>
        </div>

        <div className="fm-builder-controls">
          <div className="fm-builder-step"><span>01</span><div><p className="fm-kicker">Choose your base</p><div className="fm-builder-pizza-options">{items.slice(0, 8).map((item) => <button key={item.id} type="button" onClick={() => changeItem(item.id)} className={selectedItem?.id === item.id ? "fm-builder-option fm-builder-option--active" : "fm-builder-option"}>{item.name}</button>)}</div></div></div>
          <div className="fm-builder-step"><span>02</span><div><p className="fm-kicker">Pick your size</p><div className="fm-builder-pizza-options">{(selectedItem?.variants ?? []).map((variant) => <button key={variant.id} type="button" disabled={!variant.isAvailable} onClick={() => setSelectedVariantId(variant.id)} className={selectedVariant?.id === variant.id ? "fm-builder-option fm-builder-option--active" : "fm-builder-option"}>{variant.name}<small>{rs(variant.price)}</small></button>)}</div></div></div>
          <div className="fm-builder-step"><span>03</span><div><p className="fm-kicker">Choose your crust</p><div className="fm-builder-pizza-options">{crusts.map((option) => <button key={option.id} type="button" onClick={() => setCrustId(option.id)} className={crustId === option.id ? "fm-builder-option fm-builder-option--active" : "fm-builder-option"}>{option.name}<small>{option.note}{option.priceDelta > 0 ? ` · +${rs(option.priceDelta)}` : ""}</small></button>)}</div></div></div>
          {toppings.length > 0 && <div className="fm-builder-step"><span>04</span><div><p className="fm-kicker">Add toppings</p><div className="fm-builder-pizza-options">{toppings.map((topping) => <button key={topping.id} type="button" onClick={() => toggleTopping(topping.id)} className={selectedToppingIds.includes(topping.id) ? "fm-builder-option fm-builder-option--active" : "fm-builder-option"}>{selectedToppingIds.includes(topping.id) ? "✓ " : "+ "}{topping.name}<small>+{rs(topping.price)}</small></button>)}</div></div></div>}
          <div className="fm-builder-submit-row"><div className="fm-builder-quantity"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><strong>{quantity}</strong><button type="button" onClick={() => setQuantity(quantity + 1)}>+</button></div><motion.button type="button" whileTap={{ scale: .98 }} onClick={addToTray} className="fm-red-button">{added ? "Added to tray ✓" : "Add to tray →"}</motion.button></div>
        </div>
      </div>
    </section>
  );
}