// Canonical site origin — used for absolute OG image / canonical URLs so
// social crawlers (WhatsApp, Facebook, Telegram…) can always resolve them.
export const SITE_URL = (
  process.env.SITE_URL ?? "https://pizzaplanet-seven.vercel.app/"
).replace(/\/+$/, "");

// Self-hosted branded share image (1200×630). Served from this domain so no
// third-party CDN can block crawlers.
export const OG_DEFAULT_IMAGE = `${SITE_URL}/og/og-default.png`;