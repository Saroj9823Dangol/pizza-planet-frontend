import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { fetchBlogPostServer } from "@/lib/api-server";
import { OG_DEFAULT_IMAGE, SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

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

  // Covers are served through the storefront's own /og/blog/<slug> proxy so
  // social crawlers always get a reachable image (Unsplash blocks them).
  const hasImage = Boolean(post.ogImage || post.coverImage);
  const image = hasImage
    ? `${SITE_URL}/og/blog/${encodeURIComponent(slug)}`
    : OG_DEFAULT_IMAGE;

  return {
    title,
    description,
    keywords: post.keywords
      ? post.keywords.split(",").map((k) => k.trim()).filter(Boolean)
      : undefined,
    alternates: {
      canonical: post.canonicalUrl || `${SITE_URL}/journal/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/journal/${slug}`,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
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

  const plainText = content
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const image = post.ogImage || post.coverImage
    ? `${SITE_URL}/og/blog/${encodeURIComponent(slug)}`
    : OG_DEFAULT_IMAGE;

  const readingMinutes = Math.max(1, Math.ceil(plainText.split(" ").length / 200));

  const publishedLabel = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || undefined,
    image: image,
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.publishedAt ?? undefined,
    keywords: post.keywords || post.tags?.join(", ") || undefined,
    articleSection: post.tags?.[0] ?? undefined,
    wordCount: plainText ? plainText.split(" ").length : undefined,
    mainEntityOfPage: `${SITE_URL}/journal/${slug}`,
    author: {
      "@type": "Person",
      name: post.author?.name ?? "Pizza Planet",
    },
    publisher: {
      "@type": "Organization",
      name: "Pizza Planet",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo/logo.jpg`,
      },
    },
    articleBody: plainText.slice(0, 4000) || undefined,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "The Journal", item: `${SITE_URL}/journal` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/journal/${slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={blogPostingSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Navbar />
      <main className="fm-article-page">
        <article className="fm-shell fm-article-shell">
          <header className="fm-article-header">
            <div className="fm-article-topline">
              <Link href="/journal" className="fm-read-link">
                ← The Journal
              </Link>
              <span className="fm-article-stamp">From the kitchen</span>
            </div>
            <p className="fm-article-kicker">{post.tags?.[0] ?? "Kitchen notes"}</p>
            <h1>{post.title}</h1>
            <p className="fm-article-byline">
              <span>By {post.author?.name ?? "Pizza Planet"}</span>
              {publishedLabel && (
                <>
                  <span className="fm-byline-dot" aria-hidden="true">·</span>
                  <span>{publishedLabel}</span>
                </>
              )}
              <span className="fm-byline-dot" aria-hidden="true">·</span>
              <span>{readingMinutes} min read</span>
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

          <footer className="fm-article-end">
            <p className="fm-article-end-line">Hungry by now?</p>
            <Link href="/menu" className="fm-outline-button fm-outline-button--solid">
              See the menu
            </Link>
            <Link href="/journal" className="fm-article-end-back">
              More stories from the journal →
            </Link>
          </footer>
        </article>
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}