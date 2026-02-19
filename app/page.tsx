"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import TodaysSpecial from "@/components/TodaysSpecial";
import Order from "@/components/Order";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <TodaysSpecial />
        <Menu />
        <Order />
        <Testimonials />
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}
