"use client";
import Navbar from "@/components/Navbar";
import FullMenu from "@/components/FullMenu";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <main>
        <FullMenu />
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}
