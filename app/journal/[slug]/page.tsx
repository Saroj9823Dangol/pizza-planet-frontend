import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { fetchBlogPostServer } from "@/lib/api-server";

// Fresh from the backend on every request — dashboard edits appear immediately.
export const dynamic = "force-dynamic";

/** True when content contains real HTML tags (authored in the admin editor). */
function isHtml(value: string): boolean {
  return /<\/?[a-z][^>]*>/i.test(value);
}

/**
 * Server-rendered SEO: title, description, keywords, canonical URL and
 * OpenGraph tags are baked into the initial HTML — no client-side
 * manipulation, so crawlers and link previews see the real metadata.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPostServer(slug);
  if (!post) return { title: "Journal — Pizza Planet" };

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt || undefined;
  const image = post.ogImage || post.coverImage || undefined;

  return {
    title,
    description,
    keywords: post.keywords
      ? post.keywords.split(",").map((k) => k.trim()).filter(Boolean)
      : undefined,
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchBlogPostServer(slug);
  if (!post) notFound();

  const content = post.content || post.excerpt || "";
  const rich = isHtml(content);

  return (
    <>
      <Navbar />
      <main className="fm-article-page">
        <article className="fm-shell fm-article-shell">
          <header className="fm-article-header">
            <Link href="/journal" className="fm-read-link">
              ← The journal
            </Link>
            <p className="fm-kicker">{post.tags?.[0] ?? "Kitchen notes"}</p>
            <h1>{post.title}</h1>
            <p className="fm-article-meta">
              By {post.author?.name ?? "Pizza Planet"}
              {post.publishedAt
                ? ` · ${new Date(post.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}`
                : ""}
            </p>
          </header>
          {post.coverImage && (
            <div className="fm-article-image fm-organic-b">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.coverImage} alt={post.title} />
            </div>
          )}
          {rich ? (
            <div
              className="fm-article-copy"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div className="fm-article-copy">
              {content
                .split("\n")
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>
          )}
          <div className="fm-article-end">
            <p>Hungry by now?</p>
            <Link href="/menu" className="fm-outline-button fm-outline-button--solid">
              See the menu
            </Link>
          </div>
        </article>
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}