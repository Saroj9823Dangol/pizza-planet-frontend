"use client";
import Navbar from "@/components/Navbar";
import FullOrder from "@/components/FullOrder";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";

export default function OrderPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "72px" }}>
        <FullOrder />
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}
