"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ApiBlogPost, fetchBlogPosts } from "@/lib/api";

export default function Journal() {
  const [posts, setPosts] = useState<ApiBlogPost[]>([]);

  useEffect(() => {
    let live = true;
    fetchBlogPosts(3).then((data) => live && setPosts(data));
    return () => { live = false; };
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="fm-journal-section">
      <div className="fm-section-heading fm-section-heading--journal">
        <div>
          <p className="fm-kicker">Food for thought. And vice versa.</p>
          <h2 className="fm-hand-title">The journal<span className="fm-red-dash">—</span></h2>
        </div>
        <Link href="/journal" className="fm-outline-button">Read all</Link>
      </div>
      <div className="fm-journal-grid">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <Link href={`/journal/${post.slug}`} className="fm-journal-card">
              <div className={`fm-journal-image fm-organic-${String.fromCharCode(97 + (index % 3))}`}>
                {post.coverImage && <img src={post.coverImage} alt={post.title} />}
              </div>
              <p className="fm-card-label">{post.tags?.[0] ?? "Recipes"}</p>
              <h3>{post.title}</h3>
              {post.excerpt && <p className="fm-journal-excerpt">{post.excerpt}</p>}
              <span className="fm-read-link">Read ↗</span>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
