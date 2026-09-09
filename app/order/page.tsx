import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FullOrder from "@/components/FullOrder";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { fetchBranchesServer, fetchCrustsServer, fetchPizzaBasesServer, fetchPizzaSizesServer } from "@/lib/api-server";
import { OG_DEFAULT_IMAGE, SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Order Online — Pizza Planet",
  description:
    "Order Pizza Planet online for collection or delivery. Wood-fired pizzas, momo, wings, pasta, shakes and custom builds — from the oven to your door.",
  openGraph: {
    title: "Order Online — Pizza Planet",
    description: "Fresh from our oven to your table. Order for collection or delivery.",
    type: "website",
    url: `${SITE_URL}/order`,
    images: [OG_DEFAULT_IMAGE],
  },
  alternates: { canonical: `${SITE_URL}/order` },
  twitter: {
    card: "summary_large_image",
    title: "Order Online — Pizza Planet",
    description: "Order Pizza Planet online — collection or delivery.",
    images: [OG_DEFAULT_IMAGE],
  },
};

export default async function OrderPage() {
  const [branches, crusts, bases, sizes] = await Promise.all([fetchBranchesServer(), fetchCrustsServer(), fetchPizzaBasesServer(), fetchPizzaSizesServer()]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Order Online", item: `${SITE_URL}/order` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Navbar />
      <main>
        <FullOrder branches={branches} crusts={crusts} bases={bases} sizes={sizes} />
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}