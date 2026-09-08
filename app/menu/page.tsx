import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FullMenu from "@/components/FullMenu";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { fetchCategoriesServer, fetchMenuItemsServer } from "@/lib/api-server";

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
  },
};

export default async function MenuPage() {
  const [items, categories] = await Promise.all([
    fetchMenuItemsServer(),
    fetchCategoriesServer(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <FullMenu initialItems={items} initialCategories={categories} />
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}