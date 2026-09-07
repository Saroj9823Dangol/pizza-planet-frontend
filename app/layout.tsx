import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Pizza Planet",
    description: "Welcome to Planet of Cheeseness, Togetherness & Happiness!",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon_io/apple-touch-icon.png" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Pizza Planet",
  description: "Planet of Cheeseness, Togetherness & Happiness. Best pizza, momo, wings, pasta.",
  url: "https://pizzaplanet.com",
  servesCuisine: ["Italian", "Fast Food", "Pizza"],
  priceRange: "$$",
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", bestRating: "5", ratingCount: "150" },
  menu: "https://pizzaplanet.com/menu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
