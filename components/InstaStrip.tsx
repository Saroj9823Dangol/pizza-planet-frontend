"use client";
import { motion } from "framer-motion";

const SHOTS = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=80",
  "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=700&q=80",
  "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=700&q=80",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&q=80",
  "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=700&q=80",
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=700&q=80",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700&q=80",
  "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=700&q=80",
  "https://images.unsplash.com/photo-1593560708920-61dd98c8c8c8?w=700&q=80",
  "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=700&q=80",
];

export default function InstaStrip() {
  return (
    <section className="fm-instagram-section fm-wave-section fm-wave-section--paper">
      <div className="fm-instagram-heading">
        <p className="fm-kicker">Learn from locals.</p>
        <h2 className="fm-hand-title">This feed is certified organic<span className="fm-red-dash">—</span></h2>
        <p className="fm-instagram-subtitle">Like the rest. Follow along for fresh slices, kitchen moments, and the people who make Pizza Planet feel like home.</p>
      </div>
      <div className="fm-instagram-rail" aria-label="Pizza Planet Instagram feed">
        <div className="fm-instagram-track">
          {[...SHOTS, ...SHOTS].map((src, index) => (
            <motion.a key={`${src}-${index}`} href="https://instagram.com" target="_blank" rel="noreferrer" whileHover={{ y: -8, rotate: index % 2 ? 2 : -2 }} className="fm-instagram-thumb">
              <img src={src} alt={`Pizza Planet Instagram ${index + 1}`} />
            </motion.a>
          ))}
        </div>
        <a className="fm-instagram-follow" href="https://instagram.com" target="_blank" rel="noreferrer">
          <span>This Instagram feed is certified organic. Like the rest.</span>
          <b>Follow us ↗</b>
        </a>
      </div>
    </section>
  );
}
