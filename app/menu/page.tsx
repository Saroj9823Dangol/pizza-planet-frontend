import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FullMenu from "@/components/FullMenu";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { fetchCategoriesServer, fetchMenuPageServer } from "@/lib/api-server";
import { OG_DEFAULT_IMAGE, SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

// Fresh from the backend on every request — dashboard edits appear immediately.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Menu — Pizza Planet",
  description:
    "Wood-fired pizzas, momo, wings, pasta, salads, desserts and drinks. Fresh handmade dough, honest toppings, and small bills.",
  openGraph: {
    title: "Menu — Pizza Planet",
    description: "Wood-fired pizzas, momo, wings, pasta and more — handmade every day.",
    type: "website",
    url: `${SITE_URL}/menu`,
    images: [OG_DEFAULT_IMAGE],
  },
  alternates: { canonical: `${SITE_URL}/menu` },
  twitter: {
    card: "summary_large_image",
    title: "Menu — Pizza Planet",
    description: "Wood-fired pizzas, momo, wings, pasta and more — handmade every day.",
    images: [OG_DEFAULT_IMAGE],
  },
};

const MENU_PAGE_SIZE = 24;

export default async function MenuPage() {
  // First page is server-rendered for SEO; the rest load via infinite scroll
  // in FullMenu as the visitor scrolls.
  const [pageData, categories] = await Promise.all([
    fetchMenuPageServer(1),
    fetchCategoriesServer(),
  ]);
  const items = pageData.items;

  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Pizza Planet Menu",
    description: "Wood-fired pizzas, momo, wings, pasta, salads, desserts and drinks.",
    url: `${SITE_URL}/menu`,
    hasMenuSection: categories.slice(0, 8).map((category) => ({
      "@type": "MenuSection",
      name: category.name,
      hasMenuItem: items
        .filter((item) => item.category.id === category.id)
        .slice(0, 20)
        .map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          description: item.description ?? undefined,
          image: item.image ?? undefined,
          offers: {
            "@type": "Offer",
            price: (item.basePrice / 100).toFixed(0),
            priceCurrency: "NPR",
            availability: item.isAvailable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          },
        })),
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Menu", item: `${SITE_URL}/menu` },
    ],
  };

  return (
    <>
      <JsonLd data={menuSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Navbar />
      <main>
        <FullMenu initialItems={items} initialCategories={categories} />
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}