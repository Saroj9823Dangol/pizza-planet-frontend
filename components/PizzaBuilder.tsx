"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { ApiCrust, ApiMenuItem, fetchMenuItems, fetchCrusts, rs } from "@/lib/api";
import { useCartStore } from "@/lib/store";

const FALLBACK_CRUSTS: ApiCrust[] = [
  { id: "classic", name: "Classic", note: "soft, airy edge", priceDelta: 0, isActive: true, sortOrder: 0 },
  { id: "thin", name: "Thin", note: "crisp and light", priceDelta: 0, isActive: true, sortOrder: 1 },
  { id: "cheese-edge", name: "Cheese edge", note: "extra mozzarella", priceDelta: 10000, isActive: true, sortOrder: 2 },
];

/** Matches the backend order DTO cap (@ArrayMaxSize(12)). */
const MAX_TOPPINGS = 12;
/** Matches the backend order DTO quantity cap (@Max(50)). */
const MAX_QUANTITY = 50;

const isPizzaItem = (item: ApiMenuItem) =>
  item.category.slug.includes("pizza") || item.tags.some((tag) => tag.toLowerCase().includes("pizza"));

export default function PizzaBuilder({
  crusts: serverCrusts,
  items: serverItems,
}: {
  crusts?: ApiCrust[];
  items?: ApiMenuItem[];
}) {
  // Bases are the pizza menu items — keep only pizzas (fall back to all if none match).
  const initialPizzas = useMemo(() => {
    const pizzas = (serverItems ?? []).filter(isPizzaItem);
    return pizzas.length ? pizzas : (serverItems ?? []);
  }, [serverItems]);
  const [items, setItems] = useState<ApiMenuItem[]>(initialPizzas);
  const [crusts, setCrusts] = useState<ApiCrust[]>(serverCrusts?.length ? serverCrusts : FALLBACK_CRUSTS);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [selectedToppingIds, setSelectedToppingIds] = useState<string[]>([]);
  const [crustId, setCrustId] = useState(serverCrusts?.[0]?.id ?? FALLBACK_CRUSTS[0].id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const addItem = useCartStore((state) => state.addItem);
  const toggleCart = useCartStore((state) => state.toggleCart);

  useEffect(() => {
    // Server data is the primary source; fetch live only when it wasn't provided.
    if (!serverItems?.length) {
      fetchMenuItems().then((data) => {
        const pizzas = data.filter(isPizzaItem);
        const nextItems = pizzas.length ? pizzas : data;
        setItems(nextItems);
        const first = nextItems[0];
        if (first) {
          setSelectedItemId(first.id);
          setSelectedVariantId((first.variants.find((variant) => variant.isDefault) ?? first.variants[0])?.id ?? "");
        }
      });
    } else {
      const first = initialPizzas[0];
      if (first) {
        setSelectedItemId(first.id);
        setSelectedVariantId((first.variants.find((variant) => variant.isDefault) ?? first.variants[0])?.id ?? "");
      }
    }
    if (!serverCrusts?.length) {
      fetchCrusts().then((live) => {
        if (live.length) {
          setCrusts(live);
          setCrustId(live[0].id);
        }
      });
    }
  }, [serverItems, serverCrusts, initialPizzas]);

  // Show the sticky mobile total bar only while the builder is on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const availableItems = items.filter((item) => item.isAvailable !== false);
  const selectedItem = availableItems.find((item) => item.id === selectedItemId) ?? availableItems[0] ?? items[0];
  const selectedVariant =
    selectedItem?.variants.find((variant) => variant.id === selectedVariantId && variant.isAvailable !== false) ??
    selectedItem?.variants.find((variant) => variant.isAvailable !== false) ??
    selectedItem?.variants[0];
  const toppings = useMemo(() => (selectedItem?.toppings ?? []).map((entry) => entry.topping), [selectedItem]);
  const selectedCrust = crusts.find((c) => c.id === crustId) ?? crusts[0];
  const toppingTotal = selectedToppingIds.reduce(
    (sum, id) => sum + (toppings.find((topping) => topping.id === id)?.price ?? 0),
    0,
  );
  const basePrice = selectedVariant?.price ?? selectedItem?.basePrice ?? 0;
  const crustDelta = selectedCrust?.priceDelta ?? 0;
  const unitPrice = basePrice + toppingTotal + crustDelta;
  const totalPrice = unitPrice * quantity;
  const atToppingLimit = selectedToppingIds.length >= MAX_TOPPINGS;
  const canAdd = Boolean(selectedItem && selectedVariant && items.length > 0 && crusts.length > 0);

  const changeItem = (id: string) => {
    const item = availableItems.find((entry) => entry.id === id);
    setSelectedItemId(id);
    setSelectedToppingIds([]);
    setSelectedVariantId((item?.variants.find((variant) => variant.isDefault && variant.isAvailable !== false) ?? item?.variants.find((variant) => variant.isAvailable !== false) ?? item?.variants[0])?.id ?? "");
  };

  const toggleTopping = (id: string) => {
    setSelectedToppingIds((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : atToppingLimit
          ? current
          : [...current, id],
    );
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

  const breakdown: { label: string; amount: number; plus?: boolean }[] = [];
  if (selectedItem) {
    breakdown.push({ label: selectedVariant?.name ?? selectedItem.name, amount: basePrice });
    if (crustDelta > 0) breakdown.push({ label: `${selectedCrust?.name} crust`, amount: crustDelta, plus: true });
    if (selectedToppingIds.length > 0) {
      breakdown.push({ label: `${selectedToppingIds.length} topping${selectedToppingIds.length === 1 ? "" : "s"}`, amount: toppingTotal, plus: true });
    }
  }

  return (
    <section id="build-your-pizza" ref={sectionRef} className="fm-builder fm-wave-section fm-wave-section--paper-deep">
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
          {breakdown.length > 1 ? (
            <ul className="fm-builder-breakdown">
              {breakdown.map((line) => (
                <li key={line.label}>
                  <span>{line.label}</span>
                  <em>{line.plus ? "+" : ""}{rs(line.amount)}</em>
                </li>
              ))}
            </ul>
          ) : null}
          {selectedItem?.description ? <p className="fm-builder-note">{selectedItem.description}</p> : null}
        </div>

        <div className="fm-builder-controls">
          <div className="fm-builder-step">
            <span>01</span>
            <div>
              <p className="fm-kicker">Choose your base</p>
              {availableItems.length === 0 ? (
                <p className="fm-builder-empty">No bases on the menu right now.</p>
              ) : (
                <div className="fm-builder-pizza-options">
                  {availableItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => changeItem(item.id)}
                      aria-pressed={selectedItem?.id === item.id}
                      className={selectedItem?.id === item.id ? "fm-builder-option fm-builder-option--active" : "fm-builder-option"}
                    >
                      {item.name}
                      {item.variants.length > 1 ? <small>{item.variants.length} sizes</small> : null}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="fm-builder-step">
            <span>02</span>
            <div>
              <p className="fm-kicker">Pick your size</p>
              {selectedItem?.variants.length ? (
                <div className="fm-builder-pizza-options">
                  {selectedItem.variants.map((variant) => (
                    <button
                      key={variant.id}
                      type="button"
                      disabled={variant.isAvailable === false}
                      onClick={() => setSelectedVariantId(variant.id)}
                      aria-pressed={selectedVariant?.id === variant.id}
                      className={selectedVariant?.id === variant.id ? "fm-builder-option fm-builder-option--active" : "fm-builder-option"}
                    >
                      {variant.name}
                      <small>{rs(variant.price)}</small>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="fm-builder-empty">No sizes for this base.</p>
              )}
            </div>
          </div>

          <div className="fm-builder-step">
            <span>03</span>
            <div>
              <p className="fm-kicker">Choose your crust</p>
              {crusts.length === 0 ? (
                <p className="fm-builder-empty">No crusts available right now.</p>
              ) : (
                <div className="fm-builder-pizza-options">
                  {crusts.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      disabled={option.isActive === false}
                      onClick={() => setCrustId(option.id)}
                      aria-pressed={crustId === option.id}
                      className={crustId === option.id ? "fm-builder-option fm-builder-option--active" : "fm-builder-option"}
                    >
                      {option.name}
                      <small>
                        {option.note}
                        {option.priceDelta > 0 ? ` · +${rs(option.priceDelta)}` : ""}
                      </small>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {toppings.length > 0 ? (
            <div className="fm-builder-step">
              <span>04</span>
              <div>
                <p className="fm-kicker">
                  Add toppings <em className="fm-builder-limit">{selectedToppingIds.length} / {MAX_TOPPINGS}</em>
                </p>
                <div className="fm-builder-pizza-options">
                  {toppings.map((topping) => {
                    const active = selectedToppingIds.includes(topping.id);
                    return (
                      <button
                        key={topping.id}
                        type="button"
                        disabled={!active && atToppingLimit}
                        onClick={() => toggleTopping(topping.id)}
                        aria-pressed={active}
                        className={active ? "fm-builder-option fm-builder-option--active" : "fm-builder-option"}
                      >
                        {active ? "✓ " : "+ "}
                        {topping.name}
                        <small>+{rs(topping.price)}</small>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}

          <div className="fm-builder-submit-row">
            <div className="fm-builder-quantity">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                −
              </button>
              <strong>{quantity}</strong>
              <button type="button" aria-label="Increase quantity" disabled={quantity >= MAX_QUANTITY} onClick={() => setQuantity(Math.min(MAX_QUANTITY, quantity + 1))}>
                +
              </button>
            </div>
            <button type="button" disabled={!canAdd || added} onClick={addToTray} className="fm-red-button">
              {added ? "Added to tray ✓" : "Add to tray →"}
            </button>
          </div>
        </div>
      </div>

      {/* Sticky mobile bar — price always visible while configuring (Vervaunt/Interior Define pattern). */}
      <div className={inView ? "fm-builder-sticky fm-builder-sticky--show" : "fm-builder-sticky"} aria-hidden={!inView}>
        <div className="fm-builder-sticky-price"><span>Your total</span><strong>{rs(totalPrice)}</strong></div>
        <button type="button" disabled={!canAdd || added} onClick={addToTray} className="fm-red-button">{added ? "Added ✓" : "Add to tray →"}</button>
      </div>
    </section>
  );
}