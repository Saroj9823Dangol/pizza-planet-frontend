"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AddToCartModal from "@/components/AddToCartModal";
import PizzaBuilder from "@/components/PizzaBuilder";
import { ApiMenuItem, fetchMenuItems, rs } from "@/lib/api";
import { LOCATIONS } from "@/lib/locations";

export default function FullOrder() {
  const [items, setItems] = useState<ApiMenuItem[]>([]);
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0].slug);
  const [modalItem, setModalItem] = useState<ApiMenuItem | null>(null);

  useEffect(() => {
    fetchMenuItems({ bestseller: true }).then((data) => setItems(data.slice(0, 6)));
  }, []);

  return (
    <main className="fm-order-page">
      <PizzaBuilder />
      <section className="fm-order-hero fm-wave-section fm-wave-section--paper">
        <div className="fm-order-hero-copy"><p className="fm-kicker">Fresh from our oven to your table.</p><h1 className="fm-hand-title">Let&apos;s eat<span className="fm-red-dash">—</span></h1><p>Order for collection, delivery, or find a table at your nearest Pizza Planet.</p><div className="fm-button-row"><a href="#choose-oven" className="fm-red-button">Choose your oven</a><Link href="/menu" className="fm-outline-button">Explore the menu</Link></div></div>
        <div className="fm-order-hero-image fm-organic-c"><img src="https://images.unsplash.com/photo-1579751626657-72bc17010498?w=1400&q=85" alt="Pizza being prepared fresh at Pizza Planet" /></div>
      </section>
      <section id="choose-oven" className="fm-order-locations"><div className="fm-section-heading"><div><p className="fm-kicker">Step one.</p><h2 className="fm-hand-title">Choose your oven<span className="fm-red-dash">—</span></h2></div></div><div className="fm-order-location-pills">{LOCATIONS.map((location) => <button key={location.slug} type="button" onClick={() => setSelectedLocation(location.slug)} className={selectedLocation === location.slug ? "fm-order-location-pill fm-order-location-pill--active" : "fm-order-location-pill"}>{location.name}</button>)}</div>{LOCATIONS.filter((location) => location.slug === selectedLocation).map((location) => <motion.div key={location.slug} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="fm-selected-oven"><div><p className="fm-kicker">{location.tagline}</p><h3>{location.name}</h3><p>{location.address}, {location.city}<br />{location.hours} daily · {location.phone}</p></div><div className="fm-button-row"><Link href={`/locations/${location.slug}`} className="fm-outline-button">View pizzeria</Link><Link href={`/book?location=${location.slug}`} className="fm-outline-button fm-outline-button--red">Book a table</Link></div></motion.div>)}</section>
      <section className="fm-order-menu fm-wave-section fm-wave-section--cream"><div className="fm-section-heading"><div><p className="fm-kicker">Step two.</p><h2 className="fm-hand-title">Pick a favourite<span className="fm-red-dash">—</span></h2></div><Link href="/menu" className="fm-outline-button">View full menu</Link></div><div className="fm-order-items">{items.map((item, index) => <motion.button key={item.id} type="button" onClick={() => setModalItem(item)} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} className={`fm-order-item fm-order-item--${index % 3}`}><span className={`fm-order-item-image fm-organic-${String.fromCharCode(97 + (index % 3))}`}><img src={item.image || "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700&q=85"} alt={item.name} /></span><span className="fm-order-item-copy"><strong>{item.name}</strong><span>{item.description || "Made fresh to order."}</span><em>{rs(item.basePrice)} · Add +</em></span></motion.button>)}</div></section>
      {modalItem && <AddToCartModal item={modalItem} onClose={() => setModalItem(null)} />}
    </main>
  );
}
