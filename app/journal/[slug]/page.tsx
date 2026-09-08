"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { fetchBlogPost, type ApiBlogPost } from "@/lib/api";

/** True when content contains real HTML tags (authored in the admin editor). */
function isHtml(value: string): boolean {
  return /<\/?[a-z][^>]*>/i.test(value);
}

/** Update the document head with post-level SEO (client-side, storefront style). */
function usePostMeta(post: ApiBlogPost | null) {
  useEffect(() => {
    if (!post) return;
    const prevTitle = document.title;
    const title = post.metaTitle || post.title;
    const description = post.metaDescription || post.excerpt || "";

    document.title = `${title} — Pizza Planet`;

    const upsert = (attr: "name" | "property", key: string, content: string | null) => {
      if (!content) return;
      const selector = `meta[${attr}="${key}"]`;
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    const setMeta = (key: string, content: string | null) => upsert("name", key, content);
    const setOg = (key: string, content: string | null) => upsert("property", key, content);

    setMeta("description", description);
    setOg("og:title", title);
    setOg("og:description", description);
    setOg("og:image", post.ogImage || post.coverImage);

    if (post.canonicalUrl) {
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = post.canonicalUrl;
    }

    return () => {
      document.title = prevTitle;
    };
  }, [post]);
}

export default function JournalArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<ApiBlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof slug !== "string") return;
    let live = true;
    fetchBlogPost(slug).then((data) => {
      if (!live) return;
      setPost(data ? { ...data, content: data.content || data.excerpt || "" } : null);
      setLoading(false);
    });
    return () => {
      live = false;
    };
  }, [slug]);

  usePostMeta(post);

  const content = post?.content ?? "";
  const rich = isHtml(content);

  return (
    <>
      <Navbar />
      <main className="fm-article-page">
        {loading ? (
          <p className="fm-menu-loading">Turning the page…</p>
        ) : !post ? (
          <div className="fm-article-missing">
            <h1>Page not found</h1>
            <Link href="/journal" className="fm-outline-button fm-outline-button--red">
              Back to the journal
            </Link>
          </div>
        ) : (
          <article className="fm-shell fm-article-shell">
            <header className="fm-article-header">
              <Link href="/journal" className="fm-read-link">← The journal</Link>
              <p className="fm-kicker">{post.tags?.[0] ?? "Kitchen notes"}</p>
              <h1>{post.title}</h1>
              <p className="fm-article-meta">
                By {post.author?.name ?? "Pizza Planet"}
                {post.publishedAt
                  ? ` · ${new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`
                  : ""}
              </p>
            </header>
            {post.coverImage && (
              <div className="fm-article-image fm-organic-b">
                <img src={post.coverImage} alt={post.title} />
              </div>
            )}
            {rich ? (
              <motion.div
                className="fm-article-copy"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <div className="fm-article-copy">
                {content
                  .split("\n")
                  .filter(Boolean)
                  .map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.04 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
              </div>
            )}
            <div className="fm-article-end">
              <p>Hungry by now?</p>
              <Link href="/menu" className="fm-outline-button fm-outline-button--solid">See the menu</Link>
            </div>
          </article>
        )}
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}
