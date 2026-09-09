import type { Metadata } from "next";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import CartSync from "@/components/CartSync";
import { OG_DEFAULT_IMAGE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  themeColor: "#faf5ec",
  title: "Pizza Planet — Planet of Cheeseness, Togetherness & Happiness",
  description:
    "Best pizza! Wood-fired pizzas, momo, chicken wings, pasta, shakes & more. Welcome to Planet of Cheeseness, Togetherness & Happiness. Order now!",
  keywords:
    "pizza planet, pizza delivery, momo, chicken wings, pasta, shakes, best pizza, pizza planet",
  openGraph: {
    title: "Pizza Planet — Planet of Cheeseness, Togetherness & Happiness",
    description: "Best pizza, momo, wings & more. A Slice of HAPPINESS awaits!",
    type: "website",
    locale: "en_US",
    siteName: "Pizza Planet",
    url: SITE_URL,
    images: [
      {
        url: OG_DEFAULT_IMAGE,
        width: 1200,
        height: 630,
        alt: "Pizza Planet — Planet of Cheeseness, Togetherness & Happiness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pizza Planet",
    description: "Welcome to Planet of Cheeseness, Togetherness & Happiness!",
    images: [OG_DEFAULT_IMAGE],
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon_io/apple-touch-icon.png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
        <ScrollToTop />
        <CartSync />
      </body>
    </html>
  );
}
