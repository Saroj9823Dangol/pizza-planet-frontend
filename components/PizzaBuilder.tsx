"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ApiCrust,
  ApiPizzaBase,
  ApiPizzaSize,
  fetchCrusts,
  fetchPizzaBases,
  fetchPizzaSizes,
  rs,
} from "@/lib/api";
import { useCartStore } from "@/lib/store";

const FALLBACK_CRUSTS: ApiCrust[] = [
  { id: "classic", name: "Classic", note: "soft, airy edge", priceDelta: 0, isActive: true, sortOrder: 0 },
  { id: "thin", name: "Thin", note: "crisp and light", priceDelta: 0, isActive: true, sortOrder: 1 },
  { id: "cheese-edge", name: "Cheese edge", note: "extra mozzarella", priceDelta: 10000, isActive: true, sortOrder: 2 },
];

const FALLBACK_SIZES: ApiPizzaSize[] = [
  { id: "small", name: "Small", note: "personal pie", priceDelta: 0, isActive: true, sortOrder: 0 },
  { id: "medium", name: "Medium", note: "the everyday favourite", priceDelta: 15000, isActive: true, sortOrder: 1 },
  { id: "large", name: "Large", note: "made for sharing", priceDelta: 30000, isActive: true, sortOrder: 2 },
];

const MAX_TOPPINGS = 12;
const MAX_QUANTITY = 50;

export default function PizzaBuilder({
  crusts: serverCrusts,
  bases: serverBases,
  sizes: serverSizes,
}: {
  crusts?: ApiCrust[];
  bases?: ApiPizzaBase[];
  sizes?: ApiPizzaSize[];
}) {
  const [bases, setBases] = useState<ApiPizzaBase[]>(serverBases ?? []);
  const [sizes, setSizes] = useState<ApiPizzaSize[]>(serverSizes?.length ? serverSizes : FALLBACK_SIZES);
  const [crusts, setCrusts] = useState<ApiCrust[]>(serverCrusts?.length ? serverCrusts : FALLBACK_CRUSTS);
  const [selectedBaseId, setSelectedBaseId] = useState("");
  const [selectedSizeId, setSelectedSizeId] = useState(serverSizes?.[0]?.id ?? FALLBACK_SIZES[0].id);
  const [selectedToppingIds, setSelectedToppingIds] = useState<string[]>([]);
  const [crustId, setCrustId] = useState(serverCrusts?.[0]?.id ?? FALLBACK_CRUSTS[0].id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const addItem = useCartStore((state) => state.addItem);
  const toggleCart = useCartStore((state) => state.toggleCart);

  useEffect(() => {
    if (!serverBases?.length) fetchPizzaBases().then(setBases);
    if (!serverSizes?.length) fetchPizzaSizes().then((live) => live.length && setSizes(live));
    if (!serverCrusts?.length) fetchCrusts().then((live) => live.length && (setCrusts(live), setCrustId(live[0].id)));
  }, [serverBases, serverSizes, serverCrusts]);

  useEffect(() => {
    const first = bases.find((base) => base.menuItem.isAvailable !== false) ?? bases[0];
    if (first && !selectedBaseId) setSelectedBaseId(first.id);
  }, [bases, selectedBaseId]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const selectedBase = bases.find((base) => base.id === selectedBaseId) ?? bases[0];
  const selectedItem = selectedBase?.menuItem;
  const selectedSize = sizes.find((size) => size.id === selectedSizeId) ?? sizes[0];
  const selectedCrust = crusts.find((crust) => crust.id === crustId) ?? crusts[0];
  const toppings = useMemo(() => (selectedItem?.toppings ?? []).map((entry) => entry.topping), [selectedItem]);
  const toppingTotal = selectedToppingIds.reduce((sum, id) => sum + (toppings.find((topping) => topping.id === id)?.price ?? 0), 0);
  // The builder has its own catalog price. The linked menu item is only the
  // recipe/image/topping source and must never make a custom pizza inherit the
  // price of the whole menu product.
  const basePrice = selectedBase?.price ?? 0;
  const sizeDelta = selectedSize?.priceDelta ?? 0;
  const crustDelta = selectedCrust?.priceDelta ?? 0;
  const unitPrice = basePrice + sizeDelta + crustDelta + toppingTotal;
  const totalPrice = unitPrice * quantity;
  const atToppingLimit = selectedToppingIds.length >= MAX_TOPPINGS;
  const canAdd = Boolean(selectedBase && selectedSize && selectedCrust);

  const changeBase = (id: string) => {
    setSelectedBaseId(id);
    setSelectedToppingIds([]);
  };

  const addToTray = () => {
    if (!selectedBase || !selectedItem || !selectedSize || !selectedCrust) return;
    const toppingNames = selectedToppingIds.map((id) => toppings.find((topping) => topping.id === id)?.name).filter(Boolean) as string[];
    addItem({
      id: `builder-${selectedBase.id}-${selectedSize.id}-${selectedToppingIds.slice().sort().join("-")}-${selectedCrust.id}`,
      name: selectedItem.name,
      price: unitPrice / 100,
      size: selectedSize.name,
      crust: selectedCrust.name,
      toppings: toppingNames,
      itemId: selectedItem.id,
      toppingIds: selectedToppingIds,
      notes: `${selectedBase.name} base · ${selectedSize.name} size · ${selectedCrust.name} crust`,
      source: "CUSTOM",
      baseId: selectedBase.id,
      sizeId: selectedSize.id,
      crustId: selectedCrust.id,
      crustName: selectedCrust.name,
    });
    setAdded(true);
    window.setTimeout(() => {
      setAdded(false);
      toggleCart();
    }, 650);
  };

  const breakdown = [
    { label: `${selectedBase?.name ?? "Base"} base`, amount: basePrice },
    ...(sizeDelta ? [{ label: `${selectedSize?.name} size`, amount: sizeDelta, plus: true }] : []),
    ...(crustDelta ? [{ label: `${selectedCrust?.name} crust`, amount: crustDelta, plus: true }] : []),
    ...(selectedToppingIds.length ? [{ label: `${selectedToppingIds.length} topping${selectedToppingIds.length === 1 ? "" : "s"}`, amount: toppingTotal, plus: true }] : []),
  ];

  return (
    <section id="build-your-pizza" ref={sectionRef} className="fm-builder fm-wave-section fm-wave-section--paper-deep">
      <div className="fm-builder-heading">
        <p className="fm-kicker">Make it yours.</p>
        <h2 className="fm-hand-title">Build your pizza<span className="fm-red-dash">—</span></h2>
        <p>Choose a curated base, choose a live size, pick your crust, then make it yours with toppings.</p>
      </div>

      <div className="fm-builder-layout">
        <div className="fm-builder-preview">
          <div className="fm-builder-pizza fm-organic-b">
            <img src={selectedItem?.image || "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000&q=85"} alt={selectedBase?.name || "Pizza builder preview"} />
            <span className="fm-builder-badge">YOUR<br />PIE</span>
          </div>
          <div className="fm-builder-total"><span>Your total</span><strong>{rs(totalPrice)}</strong></div>
          <ul className="fm-builder-breakdown">
            {breakdown.map((line) => <li key={line.label}><span>{line.label}</span><em>{line.plus ? "+" : ""}{rs(line.amount)}</em></li>)}
          </ul>
          {selectedItem?.description ? <p className="fm-builder-note">{selectedItem.description}</p> : null}
        </div>

        <div className="fm-builder-controls">
          <div className="fm-builder-step"><span>01</span><div><p className="fm-kicker">Choose your base</p><div className="fm-builder-pizza-options">
            {bases.length ? bases.map((base) => <button key={base.id} type="button" onClick={() => changeBase(base.id)} aria-pressed={selectedBase?.id === base.id} className={selectedBase?.id === base.id ? "fm-builder-option fm-builder-option--active" : "fm-builder-option"}>{base.name}<small>{base.note} · from {rs(base.price)}</small></button>) : <p className="fm-builder-empty">No builder bases are live yet.</p>}
          </div></div></div>

          <div className="fm-builder-step"><span>02</span><div><p className="fm-kicker">Pick your size</p><div className="fm-builder-pizza-options">
            {sizes.map((size) => <button key={size.id} type="button" disabled={size.isActive === false} onClick={() => setSelectedSizeId(size.id)} aria-pressed={selectedSize?.id === size.id} className={selectedSize?.id === size.id ? "fm-builder-option fm-builder-option--active" : "fm-builder-option"}>{size.name}<small>{size.note}{size.priceDelta ? ` · +${rs(size.priceDelta)}` : " · included"}</small></button>)}
          </div></div></div>

          <div className="fm-builder-step"><span>03</span><div><p className="fm-kicker">Choose your crust</p><div className="fm-builder-pizza-options">
            {crusts.map((option) => <button key={option.id} type="button" disabled={option.isActive === false} onClick={() => setCrustId(option.id)} aria-pressed={selectedCrust?.id === option.id} className={selectedCrust?.id === option.id ? "fm-builder-option fm-builder-option--active" : "fm-builder-option"}>{option.name}<small>{option.note}{option.priceDelta > 0 ? ` · +${rs(option.priceDelta)}` : " · included"}</small></button>)}
          </div></div></div>

          {toppings.length ? <div className="fm-builder-step"><span>04</span><div><p className="fm-kicker">Add toppings <em className="fm-builder-limit">{selectedToppingIds.length} / {MAX_TOPPINGS}</em></p><div className="fm-builder-pizza-options">
            {toppings.map((topping) => { const active = selectedToppingIds.includes(topping.id); return <button key={topping.id} type="button" disabled={!active && atToppingLimit} onClick={() => setSelectedToppingIds((current) => current.includes(topping.id) ? current.filter((id) => id !== topping.id) : atToppingLimit ? current : [...current, topping.id])} aria-pressed={active} className={active ? "fm-builder-option fm-builder-option--active" : "fm-builder-option"}>{active ? "✓ " : "+ "}{topping.name}<small>+{rs(topping.price)}</small></button>; })}
          </div></div></div> : null}

          <div className="fm-builder-submit-row"><div className="fm-builder-quantity"><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><strong>{quantity}</strong><button type="button" aria-label="Increase quantity" disabled={quantity >= MAX_QUANTITY} onClick={() => setQuantity(Math.min(MAX_QUANTITY, quantity + 1))}>+</button></div><button type="button" disabled={!canAdd || added} onClick={addToTray} className="fm-red-button">{added ? "Added to tray ✓" : "Add to tray →"}</button></div>
        </div>
      </div>

      <div className={inView ? "fm-builder-sticky fm-builder-sticky--show" : "fm-builder-sticky"} aria-hidden={!inView}><div className="fm-builder-sticky-price"><span>Your total</span><strong>{rs(totalPrice)}</strong></div><button type="button" disabled={!canAdd || added} onClick={addToTray} className="fm-red-button">{added ? "Added ✓" : "Add to tray →"}</button></div>
    </section>
  );
}
