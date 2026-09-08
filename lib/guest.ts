// ─────────────────────────────────────────────────────────────
// Anonymous guest identity for the storefront cart.
//
// On the first visit we mint a random UUID, keep it in localStorage,
// and use it as the key for the server-side guest cart. Same browser
// = same cart across refreshes/tabs; a fresh browser gets a fresh cart.
// ─────────────────────────────────────────────────────────────

const GUEST_KEY = "pp_guest_id";

export function getGuestId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(GUEST_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `guest-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
    window.localStorage.setItem(GUEST_KEY, id);
  }
  return id;
}