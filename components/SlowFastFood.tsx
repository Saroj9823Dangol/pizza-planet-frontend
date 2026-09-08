"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SlowFastFood() {
  return (
    <section className="fm-story-section">
      <div className="fm-story-layout">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="fm-story-copy"
        >
          <p className="fm-kicker">Straight from a Kathmandu kitchen — via Naples.</p>
          <h2 className="fm-section-title">Radically simple pizza. Made properly.</h2>
          <p>
            Radically simple, affordable pizzas made from honest ingredients and fresh, handmade dough. If you know burrata from bresaola, like your bases better rested than you are, and large pizzas followed by small bills, you&apos;ve found your place.
          </p>
          <p>
            Our neighbourhood pizzerias leave plenty of space for walk-ins, and always will. We also take bookings, to give you the best of both worlds. Whatever your plans, we&apos;re ready to greet you with a warm welcome and piping hot pizza.
          </p>
          <div className="fm-button-row">
            <Link href="/locations/baneshwor" className="fm-outline-button fm-outline-button--red">● Find your local pizzeria</Link>
            <Link href="/book" className="fm-outline-button">Book</Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="fm-story-visual"
        >
          <div className="fm-photo-portrait">
            <img src="https://images.unsplash.com/photo-1579751626657-72bc17010498?w=1200&q=85" alt="Friends sharing fresh Pizza Planet pizzas" />
          </div>
          <div className="fm-doodle" aria-hidden="true">
            <span>✦</span><span>✧</span><span>✦</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
