import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import AnnouncementBar from "@/components/AnnouncementBar";
import BookForm from "@/components/BookForm";
import { fetchBranchesServer } from "@/lib/api-server";
import { OG_DEFAULT_IMAGE, SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book a Table — Pizza Planet",
  description:
    "Reserve a table at any Pizza Planet pizzeria — Baneshwor, Jhamsikhel, Lakeside and more. Walk-ins always welcome, but for the best table, book ahead.",
  openGraph: {
    title: "Book a Table — Pizza Planet",
    description: "Reserve a table at your nearest Pizza Planet pizzeria.",
    type: "website",
    url: `${SITE_URL}/book`,
    images: [OG_DEFAULT_IMAGE],
  },
  alternates: { canonical: `${SITE_URL}/book` },
  twitter: {
    card: "summary_large_image",
    title: "Book a Table — Pizza Planet",
    description: "Reserve a table at your nearest Pizza Planet pizzeria.",
    images: [OG_DEFAULT_IMAGE],
  },
};

export default async function BookPage() {
  const branches = await fetchBranchesServer();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Book a Table", item: `${SITE_URL}/book` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <AnnouncementBar />
      <Navbar />
      <main>
        <BookForm branches={branches} />
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}