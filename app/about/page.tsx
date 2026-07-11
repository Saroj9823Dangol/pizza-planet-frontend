"use client";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "72px" }}>
        <About />
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}
