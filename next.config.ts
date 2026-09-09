import { loadEnvConfig } from "@next/env";
import type { NextConfig } from "next";

// .env is not always in process.env while next.config is evaluated (the
// launchd/Vercel process may not inject it), so load it explicitly. On Vercel
// there is no .env file and API_PROXY_TARGET stays unset, which falls back to
// the real backend below — the deployed build keeps working with zero config.
loadEnvConfig(process.cwd());

// Proxy /api/* to the NestJS backend — avoids CORS and works in any environment.
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
