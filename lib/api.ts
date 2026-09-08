// ─────────────────────────────────────────────────────────────
// Pizza Planet API client — talks to the NestJS backend through
// the Next.js rewrite proxy (/api/* → localhost:3001/api/*).
// All money arrives in PAISA (NPR × 100); use npr() for display.
// Falls back to bundled mock data if the backend is unreachable,
// so the site never breaks in a demo.
// ─────────────────────────────────────────────────────────────

import { menuItems as mockItems } from "./data";

export interface ApiVariant {
  id: string;
  name: string;
  price: number; // paisa
  isDefault: boolean;
  isAvailable: boolean;
}

export interface ApiTopping {
  id: string;
  name: string;
  price: number; // paisa
  isVeg: boolean;
}

export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
}

export interface ApiMenuItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  basePrice: number; // paisa
  image: string | null;
  isVeg: boolean;
  isBestseller: boolean;
  isFeatured: boolean;
  isAvailable: boolean;
  tags: string[];
  category: ApiCategory;
  variants: ApiVariant[];
  toppings?: { topping: ApiTopping }[];
  orderCount?: number;
  canMake?: boolean;
  shortages?: { ingredient: string; needed: number; inStock: number }[];
}

/** paisa → NPR for display */
export const npr = (paisa: number) => paisa / 100;

/** Format paisa as "Rs. 390" */
export const rs = (paisa: number) =>
  `Rs. ${npr(paisa).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

// ─────────────── fetch helpers ───────────────

export async function getJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export interface MenuQuery {
  category?: string;
  search?: string;
  tags?: string;
  veg?: boolean;
  bestseller?: boolean;
  sort?: "price_asc" | "price_desc" | "popular" | "newest" | "name";
}

export async function fetchMenuItems(q: MenuQuery = {}): Promise<ApiMenuItem[]> {
  const params = new URLSearchParams();
  if (q.category) params.set("category", q.category);
  if (q.search) params.set("search", q.search);
  if (q.tags) params.set("tags", q.tags);
  if (q.veg !== undefined) params.set("veg", String(q.veg));
  if (q.bestseller !== undefined) params.set("bestseller", String(q.bestseller));
  if (q.sort) params.set("sort", q.sort);
  params.set("limit", "100");

  const data = await getJson<{ items: ApiMenuItem[] }>(
    `/api/menu-items?${params.toString()}`,
  );
  if (data?.items?.length) return data.items;
  return fallbackItems(q);
}

export async function fetchCategories(): Promise<ApiCategory[]> {
  const data = await getJson<ApiCategory[]>("/api/categories");
  if (data?.length) return data;
  // fallback from mock data
  const names = [...new Set(mockItems.map((m) => m.category))];
  return names.map((name) => ({
    id: name,
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
  }));
}

// ─────────────── offline fallback ───────────────

function toPaisa(priceStr: string): number {
  const num = parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
  return (isNaN(num) ? 0 : num) * 100;
}

/** Converts a bundled mock MenuItem into the API shape (for legacy components). */
export function mockToApiItem(m: (typeof mockItems)[number]): ApiMenuItem {
  return {
    id: m.id,
    name: m.name,
    slug: m.id,
    description: m.description,
    basePrice: toPaisa(m.sizes?.[0]?.price ?? m.price),
    image: m.image,
    isVeg: m.tags.includes("VEG"),
    isBestseller: !!m.bestseller,
    isFeatured: !!m.bestseller,
    isAvailable: true,
    canMake: true,
    tags: m.tags,
    category: {
      id: m.category,
      name: m.category,
      slug: m.category.toLowerCase().replace(/\s+/g, "-"),
    },
    variants: (m.sizes ?? []).map((s, i) => ({
      id: `${m.id}-${s.label}`,
      name: s.label,
      price: toPaisa(s.price),
      isDefault: i === 0,
      isAvailable: true,
    })),
    toppings: [],
  };
}

const fallbackItems = (q: MenuQuery): ApiMenuItem[] =>
  mockItems
    .filter((m) => (q.category ? m.category === q.category : true))
    .filter((m) => (q.bestseller ? m.bestseller : true))
    .filter((m) =>
      q.search
        ? `${m.name} ${m.description}`.toLowerCase().includes(q.search.toLowerCase())
        : true,
    )
    .map((m) => ({
      id: m.id,
      name: m.name,
      slug: m.id,
      description: m.description,
      basePrice: toPaisa(m.sizes?.[0]?.price ?? m.price),
      image: m.image,
      isVeg: m.tags.includes("VEG"),
      isBestseller: !!m.bestseller,
      isFeatured: !!m.bestseller,
      isAvailable: true,
      canMake: true,
      tags: m.tags,
      category: {
        id: m.category,
        name: m.category,
        slug: m.category.toLowerCase().replace(/\s+/g, "-"),
      },
      variants: (m.sizes ?? []).map((s, i) => ({
        id: `${m.id}-${s.label}`,
        name: s.label,
        price: toPaisa(s.price),
        isDefault: i === 0,
        isAvailable: true,
      })),
      toppings: [],
    }));

// ─────────────── reservations ───────────────

export interface ReservationPayload {
  name: string;
  phone: string;
  email?: string;
  location: string;
  partySize: number;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:MM
  notes?: string;
}

export interface ReservationConfirmation {
  bookingCode: string;
  date: string;
  timeSlot: string;
  location: string;
  partySize: number;
}

export async function createReservation(
  payload: ReservationPayload,
): Promise<ReservationConfirmation> {
  const res = await fetch("/api/reservations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(body?.message ?? "Could not book — please try again");
  }
  return body as ReservationConfirmation;
}

// ─────────────── journal / blogs ───────────────

export interface ApiBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  tags: string[];
  publishedAt: string | null;
  author: { name: string };
  /** Plain text (legacy) or HTML (authored in the admin rich text editor). */
  content?: string;
  // SEO — authored in the admin editor's SEO panel
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  ogImage?: string | null;
  keywords?: string | null;
}

const FALLBACK_POSTS: ApiBlogPost[] = [
  {
    id: "fb1",
    title: "The Story Behind Our Wood-Fired Ovens",
    slug: "story-behind-our-wood-fired-ovens",
    excerpt: "How three friends turned a tiny Baneshwor kitchen into the planet of cheeseness.",
    coverImage: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
    tags: ["story"],
    publishedAt: new Date().toISOString(),
    author: { name: "Pizza Planet" },
    content: "Our ovens are the warm centre of every Pizza Planet. They are where dough, fire, and a little patience become the food that brings a table together.\n\nThe first oven started in Baneshwor with one simple idea: pizza should feel generous, handmade, and at home in Kathmandu. Every new pizzeria carries that same idea forward.\n\nWe still make the dough fresh, stretch each base by hand, and leave room for the people who walk in without a plan.",
  },
  {
    id: "fb2",
    title: "5 Reasons Our Cheese Burst Is Different",
    slug: "5-reasons-our-cheese-burst-is-different",
    excerpt: "Not all cheese is created equal. Here is what goes into every gooey slice.",
    coverImage: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80",
    tags: ["cheese"],
    publishedAt: new Date().toISOString(),
    author: { name: "Pizza Planet" },
    content: "Not all cheese is created equal. Our cheese burst starts with a base that has had time to rest, so the crust stays light while the centre stays generous.\n\nWe blend mozzarella for stretch with a little aged cheese for depth, then finish the pie in a hot oven so the edges blister and the middle stays molten. The result is rich without becoming heavy — the kind of slice that makes you reach for one more.\n\nThat is the Pizza Planet rule: use a few good ingredients, give them the time they need, and never hide the crust. Come hungry and eat your crusts.",
  },
  {
    id: "fb3",
    title: "Momo Pizza: A Nepali Fusion",
    slug: "momo-pizza-nepali-fusion",
    excerpt: "From Kathmandu streets to your plate — the collab of the decade.",
    coverImage: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80",
    tags: ["fusion"],
    publishedAt: new Date().toISOString(),
    author: { name: "Pizza Planet" },
    content: "Somewhere between a momo night and a pizza craving, this idea made perfect sense. Nepal knows how to build flavour, and pizza gives us a very good reason to share it.\n\nWe keep the dough handmade, bring in familiar spices, and let the toppings do the talking. It is not trying to replace tradition. It is a new table where traditions can meet.\n\nThe best combinations are usually the ones nobody planned. That is how this one started.",
  },
];

export async function fetchBlogPosts(limit = 3): Promise<ApiBlogPost[]> {
  const data = await getJson<{ items: ApiBlogPost[] }>(`/api/blogs?limit=${limit}`);
  if (data?.items?.length) return data.items;
  return FALLBACK_POSTS.slice(0, limit);
}

export async function fetchBlogPost(slug: string): Promise<ApiBlogPost | null> {
  const data = await getJson<ApiBlogPost>(`/api/blogs/${slug}`);
  return data ?? FALLBACK_POSTS.find((post) => post.slug === slug) ?? null;
}


// ─────────────── orders ───────────────

export interface PlaceOrderPayload {
  customerName: string;
  customerPhone: string;
  type: "DELIVERY" | "TAKEAWAY" | "DINE_IN";
  address?: string;
  tableNumber?: number;
  note?: string;
  paymentMethod?: "CASH" | "ESEWA" | "KHALTI" | "FONEPAY" | "CARD";
  /** Branch (location) slug the order belongs to — resolved server-side. */
  branchId?: string;
  items: {
    itemId: string;
    variantId?: string;
    quantity: number;
    toppingIds?: string[];
    note?: string;
  }[];
}

export interface PlacedOrder {
  id: string;
  orderNumber: string;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
}

export async function placeOrder(payload: PlaceOrderPayload): Promise<PlacedOrder> {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(body?.message ?? "Could not place order — please try again");
  }
  return body as PlacedOrder;
}
