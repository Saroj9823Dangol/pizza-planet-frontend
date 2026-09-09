import type { NextConfig } from "next";

// Proxy /api/* to the NestJS backend — avoids CORS and works in any environment.
// NOTE: the .env file is NOT committed, so on Vercel API_PROXY_TARGET is unset.
// In production we must fall back to the real backend, otherwise every fetch
// points at localhost:3001 and the site silently renders mock data.
const API_TARGET =
  process.env.API_PROXY_TARGET ??
  (process.env.NODE_ENV === "production"
    ? "https://pizzaplanet.sarojdangol012.com.np"
    : "http://localhost:3001");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_TARGET}/api/:path*`,
      },
    ];
  },
  // Never let browsers/CDNs cache API responses — the storefront is a live
  // window into the dashboard, so edits must appear on the next page load.
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;
