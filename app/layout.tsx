import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Pizza Planet — I'm Lovin' It",
  description:
    "Cosmic pizza. Stellar flavors. Serving the galaxy since 2024. Order the best handcrafted pizzas in the universe.",
  keywords: "pizza, cosmic pizza, pizza planet, space pizza, best pizza",
  openGraph: {
    title: "Pizza Planet — I'm Lovin' It",
    description:
      "Cosmic pizza. Stellar flavors. Serving the galaxy since 2024.",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [{ url: "/favicon_io/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
