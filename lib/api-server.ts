// ─────────────────────────────────────────────────────────────
// Server-only data layer for the storefront.
//
// SEO-critical pages (journal, journal article, menu, home) fetch
// their data HERE — server-side, on every request — so titles,
// descriptions, OG tags and the actual content are present in the
// initial HTML for crawlers. Never import this from a client
// component.
// ─────────────────────────────────────────────────────────────

import type { ApiBlogPost, ApiCategory, ApiMenuItem } from "./api";
import { FALLBACK_POSTS, mockToApiItem } from "./api";
import { menuItems as mockItems } from "./data";

// Same target the /api proxy uses (see next.config.ts / proxy.ts).
const API_TARGET = (process.env.API_PROXY_TARGET ?? "http://localhost:3001").replace(/\/+$/, "");

async function getJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_TARGET}${path}`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export interface MenuQueryServer {
  category?: string;
  search?: string;
  bestseller?: boolean;
  featured?: boolean;
  limit?: number;
}

export async function fetchMenuItemsServer(q: MenuQueryServer = {}): Promise<ApiMenuItem[]> {
  const params = new URLSearchParams();
  if (q.category) params.set("category", q.category);
  if (q.search) params.set("search", q.search);
  if (q.bestseller) params.set("bestseller", "true");
  if (q.featured) params.set("featured", "true");
  params.set("limit", String(q.limit ?? 100));

  const data = await getJson<{ items: ApiMenuItem[] }>(`/api/menu-items?${params.toString()}`);
  if (data?.items?.length) return data.items;

  // Graceful fallback so the site never renders empty during an outage.
  return mockItems
    .filter((m) => (q.bestseller ? m.bestseller : true))
    .map(mockToApiItem);
}

export async function fetchCategoriesServer(): Promise<ApiCategory[]> {
  const data = await getJson<ApiCategory[]>("/api/categories");
  if (data?.length) return data;
  return [...new Set(mockItems.map((m) => m.category))].map((name) => ({
    id: name,
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function fetchBlogPostsServer(limit = 12): Promise<ApiBlogPost[]> {
  const data = await getJson<{ items: ApiBlogPost[] }>(`/api/blogs?limit=${limit}`);
  if (data?.items?.length) return data.items;
  return FALLBACK_POSTS.slice(0, limit);
}

export interface BlogPageMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface BlogPage {
  items: ApiBlogPost[];
  meta: BlogPageMeta;
}

export async function fetchBlogPostsPageServer(
  page = 1,
  limit = 6,
): Promise<BlogPage> {
  const data = await getJson<{ items: ApiBlogPost[]; meta: BlogPageMeta }>(
    `/api/blogs?page=${page}&limit=${limit}`,
  );
  if (data?.meta) {
    return { items: data.items ?? [], meta: data.meta };
  }
  // Graceful fallback: bundled posts on page 1 only.
  if (page === 1) {
    return {
      items: FALLBACK_POSTS.slice(0, limit),
      meta: {
        page: 1,
        limit,
        total: FALLBACK_POSTS.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
    };
  }
  return {
    items: [],
    meta: { page, limit, total: 0, totalPages: 0, hasNext: false, hasPrev: true },
  };
}

export async function fetchBlogPostServer(slug: string): Promise<ApiBlogPost | null> {
  const data = await getJson<ApiBlogPost>(`/api/blogs/${slug}`);
  if (data) return data;
  return FALLBACK_POSTS.find((post) => post.slug === slug) ?? null;
}