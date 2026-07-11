import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pizza Planet Nepal — Planet of Cheeseness, Togetherness & Happiness",
  description:
    "Best pizza in Kathmandu! Wood-fired pizzas, momo, chicken wings, pasta, shakes & more. Welcome to Planet of Cheeseness, Togetherness & Happiness. Order now!",
  keywords:
    "pizza planet, pizza nepal, kathmandu pizza, pizza delivery, momo, chicken wings, pasta, shakes, best pizza kathmandu, pizza planet nepal",
  openGraph: {
    title: "Pizza Planet Nepal — Planet of Cheeseness, Togetherness & Happiness",
    description: "Best pizza, momo, wings & more in Kathmandu. A Slice of HAPPINESS awaits!",
    type: "website",
    locale: "ne_NP",
    siteName: "Pizza Planet Nepal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pizza Planet Nepal",
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
  name: "Pizza Planet Nepal",
  description: "Planet of Cheeseness, Togetherness & Happiness. Best pizza, momo, wings, pasta in Kathmandu.",
  url: "https://pizzaplanetnepal.com",
  servesCuisine: ["Italian", "Nepali", "Fast Food", "Pizza"],
  priceRange: "$$",
  address: { "@type": "PostalAddress", addressLocality: "Kathmandu", addressCountry: "NP" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", bestRating: "5", ratingCount: "150" },
  menu: "https://pizzaplanetnepal.com/menu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
