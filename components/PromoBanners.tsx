"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const PROMOS = [
  {
    eyebrow: "Summer in Bloom.",
    title: "Aaron Potter X Pizza Planet",
    body: "A little bit sweet. A little bit salty. A lot of summer in bloom.",
    cta: "Meet Aaron",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1000&q=85",
    shape: "fm-organic-a",
    featured: false,
  },
  {
    eyebrow: "Pizza and your tuition fees paid",
    title: "Rs 350 Pizza for Students",
    body: "This Wednesday, enjoy a pizza at your neighbourhood pizzeria and enter to win your tuition fees.",
    cta: "Sign up here",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1000&q=85",
    shape: "fm-organic-b",
    featured: true,
  },
  {
    eyebrow: "One course or two?",
    title: "Let's lunch?",
    body: "Lunch just got even tastier with our new lunch offer.",
    cta: "Explore the lunch offer",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000&q=85",
    shape: "fm-organic-c",
    featured: false,
  },
];

export default function PromoBanners() {
  return (
    <section className="fm-promo-section">
      <div className="fm-promo-grid">
        {PROMOS.map((promo, index) => (
          <motion.article
            key={promo.eyebrow}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: index * 0.1 }}
            className={`fm-promo-card ${promo.featured ? "fm-promo-card--raised" : ""}`}
          >
            <div className="fm-promo-eyebrow">
              <span className="fm-squiggle" aria-hidden="true">↗</span>
              {promo.eyebrow}
            </div>
            <div className={`fm-promo-image ${promo.shape}`}>
              <img src={promo.img} alt={promo.title} />
            </div>
            <div className="fm-promo-copy">
              <h2>{promo.title}</h2>
              <p>{promo.body}</p>
              <Link href="/order" className={`fm-outline-button ${promo.featured ? "fm-outline-button--solid" : ""}`}>
                {promo.cta}
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
