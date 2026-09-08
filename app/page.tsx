import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PromoBanners from "@/components/PromoBanners";
import SlowFastFood from "@/components/SlowFastFood";
import MenuTeaser from "@/components/MenuTeaser";
import Locations from "@/components/Locations";
import Journal from "@/components/Journal";
import InstaStrip from "@/components/InstaStrip";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import PizzaBuilder from "@/components/PizzaBuilder";

export default function Home() {
  return (
    <>
      <div className="relative">
        <Navbar overlay />
        <Hero />
      </div>
      <main>
        <PromoBanners />
        <PizzaBuilder />
        <SlowFastFood />
        <MenuTeaser />
        <Locations />
        <Journal />
        <InstaStrip />
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}
