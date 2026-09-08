import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import JournalArchive from "@/components/JournalArchive";
import { fetchBlogPostsPageServer } from "@/lib/api-server";

// Fresh from the backend on every request — dashboard edits appear immediately.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Journal — Pizza Planet",
  description:
    "Recipes, stories, and a few thoughts from the Pizza Planet kitchen. Fresh dough, honest toppings, and the people behind the ovens.",
  openGraph: {
    title: "The Journal — Pizza Planet",
    description: "Recipes, stories, and a few thoughts from the Pizza Planet kitchen.",
    type: "website",
  },
};

const PAGE_SIZE = 6;

/** 1 2 3 … 9 — windowed page numbers so long archives stay tidy. */
function pageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set<number>([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) out.push("…");
    out.push(p);
    prev = p;
  }
  return out;
}

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const { items: posts, meta } = await fetchBlogPostsPageServer(page, PAGE_SIZE);
  const totalPages = Math.max(1, meta.totalPages);

  // Out-of-range pages (e.g. ?page=99) bounce to the last real page.
  if (page > totalPages) redirect(`/journal?page=${totalPages}`);
  const current = page;

  return (
    <>
      <Navbar />
      <main className="fm-journal-page">
        <header className="fm-journal-page-header">
          <p className="fm-kicker">Food for thought. And vice versa.</p>
          <h1 className="fm-hand-title">
            The journal<span className="fm-red-dash">—</span>
          </h1>
          <p className="fm-journal-page-intro">
            Recipes, stories, and a few thoughts from the Pizza Planet kitchen.
          </p>
        </header>
        {posts.length === 0 ? (
          <p className="fm-menu-loading">Fresh stories are baking — check back soon.</p>
        ) : (
          <>
            <JournalArchive posts={posts} />
            <nav className="fm-pagination" aria-label="Journal pages">
              {meta.hasPrev ? (
                <Link href={`/journal?page=${current - 1}`}>← Prev</Link>
              ) : (
                <span className="fm-pagination-disabled">← Prev</span>
              )}
              {pageNumbers(current, totalPages).map((p, i) =>
                p === "…" ? (
                  <span key={`gap-${i}`} className="fm-pagination-gap">
                    …
                  </span>
                ) : p === current ? (
                  <span key={p} className="fm-pagination-current">
                    {p}
                  </span>
                ) : (
                  <Link key={p} href={`/journal?page=${p}`}>
                    {p}
                  </Link>
                ),
              )}
              {meta.hasNext ? (
                <Link href={`/journal?page=${current + 1}`}>Next →</Link>
              ) : (
                <span className="fm-pagination-disabled">Next →</span>
              )}
            </nav>
          </>
        )}
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}