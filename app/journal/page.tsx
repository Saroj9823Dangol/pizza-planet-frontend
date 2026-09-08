"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { ApiBlogPost, fetchBlogPosts } from "@/lib/api";

export default function JournalPage() {
  const [posts, setPosts] = useState<ApiBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let live = true;
    fetchBlogPosts(12).then((data) => {
      if (!live) return;
      setPosts(data);
      setLoading(false);
    });
    return () => { live = false; };
  }, []);

  return (
    <>
      <Navbar />
      <main className="fm-journal-page">
        <header className="fm-journal-page-header">
          <p className="fm-kicker">Food for thought. And vice versa.</p>
          <h1 className="fm-hand-title">The journal<span className="fm-red-dash">—</span></h1>
          <p className="fm-journal-page-intro">Recipes, stories, and a few thoughts from the Pizza Planet kitchen.</p>
        </header>
        {loading ? (
          <p className="fm-menu-loading">Turning the page…</p>
        ) : (
          <div className="fm-journal-archive">
            {posts.map((post, index) => (
              <motion.article key={post.id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .45, delay: (index % 3) * .08 }} className={`fm-archive-card fm-archive-card--${index % 3}`}>
                <Link href={`/journal/${post.slug}`}>
                  <div className={`fm-archive-image fm-organic-${String.fromCharCode(97 + (index % 3))}`}>
                    {post.coverImage && <img src={post.coverImage} alt={post.title} />}
                  </div>
                  <p className="fm-card-label">{post.tags?.[0] ?? "Kitchen notes"}</p>
                  <h2>{post.title}</h2>
                  {post.excerpt && <p className="fm-archive-excerpt">{post.excerpt}</p>}
                  <span className="fm-read-link">Read story ↗</span>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}
