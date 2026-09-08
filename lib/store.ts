import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getGuestId } from "./guest";

export type CartSource = "MENU" | "PROMO" | "CUSTOM";

export interface CartItem {
  id: string; // composite: itemId-variant-toppings-note
  name: string;
  price: number; // NPR (display)
  quantity: number;
  size?: string;
  crust?: string;
  toppings?: string[]; // display names
  notes?: string;
  // API linkage — needed to place the order on the backend
  itemId?: string;
  variantId?: string;
  toppingIds?: string[];
  // Source attribution — every line must be traceable to MENU / PROMO / CUSTOM
  source?: CartSource;
  promoId?: string;
  promoTitle?: string;
  crustId?: string;
  crustName?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  total: () => number;
  itemCount: () => number;
  /** Pull the server-side guest cart (most recent across tabs/devices). */
  hydrate: () => Promise<void>;
  setItems: (items: CartItem[]) => void;
}

const cartUrl = () => `/api/cart/${getGuestId()}`;

/** Push the full cart to the backend. */
async function pushToServer(items: CartItem[]) {
  try {
    await fetch(cartUrl(), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
  } catch {
    // Offline / transient — the next change (or next visit) re-syncs.
  }
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }));
      },

      clearCart: () => {
        set({ items: [] });
        // Also clear the server-side guest cart so a re-hydrate can't resurrect it.
        try {
          fetch(cartUrl(), { method: "DELETE" }).catch(() => {});
        } catch {
          // ignore
        }
      },

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      total: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      hydrate: async () => {
        try {
          const res = await fetch(cartUrl(), { cache: "no-store" });
          if (!res.ok) return;
          const data = (await res.json()) as { items?: CartItem[] };
          const serverItems = Array.isArray(data.items) ? data.items : [];
          if (serverItems.length > 0) {
            // Server wins — it holds the most recent state from any tab/device.
            set({ items: serverItems });
          } else if (get().items.length > 0) {
            // First visit on this browser but cart exists locally → push it up.
            await pushToServer(get().items);
          }
        } catch {
          // Offline — the localStorage snapshot is already in place.
        }
      },

      setItems: (items) => set({ items }),
    }),
    {
      name: "pp_cart",
      // Only the cart contents persist — the drawer's open state never does.
      partialize: (s) => ({ items: s.items }),
    },
  ),
);

let syncStarted = false;

/**
 * One-time client bootstrap: hydrate the guest cart from the backend and keep
 * it in sync (debounced) on every change. Call once from a client component
 * mounted in the root layout.
 */
export function initCartSync() {
  if (syncStarted || typeof window === "undefined") return;
  syncStarted = true;

  const store = useCartStore;
  store.getState().hydrate();

  let timer: ReturnType<typeof setTimeout> | undefined;
  store.subscribe((state, prev) => {
    if (state.items === prev.items) return;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      pushToServer(store.getState().items);
    }, 400);
  });
}