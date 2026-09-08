"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import type { ApiBlogPost } from "@/lib/api";

export default function JournalArchive({ posts }: { posts: ApiBlogPost[] }) {
  return (
    <div className="fm-journal-archive">
      {posts.map((post, index) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
          className={`fm-archive-card fm-archive-card--${index % 3}`}
        >
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
  );
}