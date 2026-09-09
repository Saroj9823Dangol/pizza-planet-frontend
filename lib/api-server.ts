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
import { mockBranches } from "./locations-fallback";

// Same target the /api proxy uses (see next.config.ts). All paths below start
// with /api (the backend's global prefix), so a trailing /api on the target is
// normalized away to avoid double-prefixing.
// NOTE: the .env file is NOT committed, so on Vercel API_PROXY_TARGET is unset.
// In production we must fall back to the real backend, otherwise every fetch
// points at localhost:3001 and the site silently renders mock data.
const API_TARGET = (
  process.env.API_PROXY_TARGET ??
  (process.env.NODE_ENV === "production"
    ? "https://pizzaplanet.sarojdangol012.com.np"
    : "http://localhost:3001")
)
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");

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
  params.set("limit", String(q.limit ?? 300));

  const data = await getJson<{ items: ApiMenuItem[] }>(`/api/menu-items?${params.toString()}`);
  if (data?.items?.length) return data.items;

  // Graceful fallback so the site never renders empty during an outage.
  return mockItems
    .filter((m) => (q.bestseller ? m.bestseller : true))
    .map(mockToApiItem);
}

export interface MenuPageMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface MenuPageResult {
  items: ApiMenuItem[];
  meta: MenuPageMeta;
}

/**
 * One paginated slice of the menu — used by /menu for infinite scrolling.
 * The first page is server-rendered (SEO); later pages are fetched on the
 * client and appended as the visitor scrolls.
 */
export async function fetchMenuPageServer(
  page = 1,
): Promise<MenuPageResult> {
  const data = await getJson<{ items: ApiMenuItem[]; meta: MenuPageMeta }>(
    `/api/menu-items?page=${page}`,
  );
  if (data?.items?.length || (data?.items && page === 1)) {
    return { items: data.items ?? [], meta: data.meta };
  }
  // Graceful fallback: slice the bundled mock menu.
  const all = mockItems.map(mockToApiItem);
  const start = page - 1;
  return {
    items: all,
    meta: {
      page,
      limit: 24,
      total: all.length,
      totalPages: Math.max(1, Math.ceil(all.length / all.length)),
      hasNext: start + all.length < all.length,
      hasPrev: page > 1,
    },
  };
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

export interface ApiPromo {
  id: string;
  kind?: 'SPECIAL' | 'OFFER';
  eyebrow: string;
  title: string;
  body: string;
  ctaText: string;
  ctaHref: string;
  image: string | null;
  isFeatured: boolean;
  // Product link — when set the storefront shows "Add to tray" at the promo price
  menuItemId: string | null;
  price: number | null; // paisa — discounted/effective price
  originalPrice: number | null; // paisa — optional crossed-out reference price
  menuItem?: { id: string; name: string; basePrice: number } | null;
}

export async function fetchPromosServer(): Promise<ApiPromo[]> {
  const data = await getJson<ApiPromo[]>("/api/promos");
  return data?.length ? data : [];
}

export interface ApiInstagramPost {
  id: string;
  image: string;
  caption: string | null;
  permalink: string;
  publishedAt: string;
}

/** Instagram feed — server-fetched so new posts added in the admin show up
 *  on the next page load. Falls back to the bundled shots if the API is down. */
export async function fetchInstagramServer(): Promise<ApiInstagramPost[]> {
  const data = await getJson<ApiInstagramPost[]>("/api/instagram");
  if (data?.length) return data;
  return FALLBACK_INSTAGRAM;
}

export const FALLBACK_INSTAGRAM: ApiInstagramPost[] = [
  { id: "shot-1", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=80", caption: null, permalink: "https://instagram.com", publishedAt: new Date().toISOString() },
  { id: "shot-2", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=700&q=80", caption: null, permalink: "https://instagram.com", publishedAt: new Date().toISOString() },
  { id: "shot-3", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=700&q=80", caption: null, permalink: "https://instagram.com", publishedAt: new Date().toISOString() },
  { id: "shot-4", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&q=80", caption: null, permalink: "https://instagram.com", publishedAt: new Date().toISOString() },
  { id: "shot-5", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=700&q=80", caption: null, permalink: "https://instagram.com", publishedAt: new Date().toISOString() },
  { id: "shot-6", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=700&q=80", caption: null, permalink: "https://instagram.com", publishedAt: new Date().toISOString() },
  { id: "shot-7", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700&q=80", caption: null, permalink: "https://instagram.com", publishedAt: new Date().toISOString() },
  { id: "shot-8", image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=700&q=80", caption: null, permalink: "https://instagram.com", publishedAt: new Date().toISOString() },
  { id: "shot-9", image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=700&q=80", caption: null, permalink: "https://instagram.com", publishedAt: new Date().toISOString() },
  { id: "shot-10", image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=700&q=80", caption: null, permalink: "https://instagram.com", publishedAt: new Date().toISOString() },
];

export interface ApiBranch {
  id: string;
  name: string;
  slug: string;
  address: string | null;
  city: string | null;
  phone: string | null;
  isActive: boolean;
  tagline: string | null;
  hours: string | null;
  kitchenNote: string | null;
  description: string[] | null;
  features: string[] | null;
  heroImage: string | null;
  storyImage: string | null;
  seats: number | null;
}

/** Pizzeria branches for the storefront — server-fetched so locations, booking
 *  and checkout always reflect the live branch list (add/edit in the admin). */
export async function fetchBranchesServer(): Promise<ApiBranch[]> {
  const data = await getJson<ApiBranch[]>("/api/branches");
  if (data?.length) return data;
  // Graceful fallback to the bundled pizzeria data.
  return mockBranches;
}

export interface ApiCrust {
  id: string;
  name: string;
  note: string | null;
  priceDelta: number; // paisa
  isActive: boolean;
  sortOrder: number;
}

export interface ApiPizzaBase {
  id: string;
  name: string;
  note: string | null;
  /** Independent custom-builder starting price in paisa. */
  price: number;
  menuItemId: string;
  isActive: boolean;
  sortOrder: number;
  menuItem: ApiMenuItem;
}

export interface ApiPizzaSize {
  id: string;
  name: string;
  note: string | null;
  priceDelta: number;
  isActive: boolean;
  sortOrder: number;
}

/** Crust options for the custom pizza builder — managed from the admin. */
export async function fetchCrustsServer(): Promise<ApiCrust[]> {
  const data = await getJson<ApiCrust[]>("/api/crusts");
  return data?.length ? data : [];
}

export async function fetchPizzaBasesServer(): Promise<ApiPizzaBase[]> {
  const data = await getJson<ApiPizzaBase[]>("/api/pizza-bases");
  return data?.length ? data : [];
}

export async function fetchPizzaSizesServer(): Promise<ApiPizzaSize[]> {
  const data = await getJson<ApiPizzaSize[]>("/api/pizza-sizes");
  return data?.length ? data : [];
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