"use client";
import { motion } from "framer-motion";

const JOURNEY = [
  { year: "2022", title: "The first dough", text: "Pizza Planet began with one oven, a sourdough starter, and a belief that Kathmandu deserved pizza made with patience.", image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=1200&q=85" },
  { year: "2023", title: "A neighbourhood grows", text: "Our first pizzeria became a place for after-class slices, long lunches, family tables, and a lot of new friends.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=85" },
  { year: "2024", title: "More ovens, same welcome", text: "We opened new neighbourhood kitchens without losing the things that matter: fresh dough, honest toppings, and room for walk-ins.", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1200&q=85" },
];

export default function About() {
  return (
    <div className="fm-about-page">
      <section className="fm-about-hero fm-wave-section fm-wave-section--paper">
        <div className="fm-about-hero-copy">
          <p className="fm-kicker">Pizza Planet · Est. 2022</p>
          <h1 className="fm-hand-title">Our story<span className="fm-red-dash">—</span></h1>
          <p className="fm-about-lede">A neighbourhood pizzeria built around good dough, generous tables, and the simple joy of eating properly.</p>
        </div>
        <div className="fm-about-hero-image fm-organic-b">
          <img src="https://images.unsplash.com/photo-1579751626657-72bc17010498?w=1400&q=85" alt="Pizza Planet team preparing fresh pizza" />
        </div>
      </section>

      <section className="fm-readable-story fm-wave-section fm-wave-section--cream">
        <div className="fm-readable-story-image fm-organic-a"><img src="https://images.unsplash.com/photo-1579751626657-72bc17010498?w=1400&q=85" alt="Pizza Planet dough being prepared" /></div>
        <div className="fm-readable-story-copy">
          <p className="fm-kicker">You could buy a plane ticket to Naples. But we&apos;re faster.</p>
          <h2>Good food takes time. We know it when we taste it.</h2>
          <p>Our dough starts in the morning and earns its time. It rests, rises, and arrives at the oven with the kind of flavour you cannot fake. We source what goes on top with the same care, choosing ingredients that let a few good things speak clearly.</p>
          <p>Pizza Planet is not trying to be the biggest restaurant in Kathmandu. We are here to be the table you can return to: a quick lunch, a late slice, a birthday, or a first date that needs one more drink.</p>
          <p>Come as you are. There is always room for one more.</p>
        </div>
      </section>

      <section className="fm-about-values fm-wave-section fm-wave-section--paper-deep">
        <div className="fm-section-heading"><div><p className="fm-kicker">The Pizza Planet way.</p><h2 className="fm-hand-title">What we believe<span className="fm-red-dash">—</span></h2></div></div>
        <div className="fm-values-grid">
          {["Dough takes time|Fresh handmade dough is the start of everything. We do not rush the thing that makes the pizza.", "Good food is generous|A full table, a warm welcome, and prices that leave room for one more slice.", "Keep it real|Honest ingredients, open kitchens, and food that tastes like what it says it is."].map((value, index) => { const [title, text] = value.split("|"); return <article key={title} className="fm-value-item"><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>; })}
        </div>
      </section>

      <section className="fm-journey-section fm-wave-section fm-wave-section--paper">
        <div className="fm-section-heading"><div><p className="fm-kicker">From one kitchen to the next.</p><h2 className="fm-hand-title">Our journey<span className="fm-red-dash">—</span></h2></div></div>
        <div className="fm-journey-spreads">
          {JOURNEY.map((step, index) => <motion.article key={step.year} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`fm-journey-spread ${index % 2 ? "fm-journey-spread--reverse" : ""}`}><div className="fm-journey-spread-image fm-organic-c"><img src={step.image} alt={step.title} /></div><div className="fm-journey-spread-copy"><span>{step.year}</span><h3>{step.title}</h3><p>{step.text}</p></div></motion.article>)}
        </div>
      </section>

      <section className="fm-about-cta"><p className="fm-kicker">Come hungry.</p><h2>Every visit is a chapter.</h2></section>
    </div>
  );
}
