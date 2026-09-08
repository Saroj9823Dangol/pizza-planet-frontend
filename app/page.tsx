import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PromoBanners from "@/components/PromoBanners";
import SlowFastFood from "@/components/SlowFastFood";
import MenuShowcase from "@/components/MenuShowcase";
import Locations from "@/components/Locations";
import Journal from "@/components/Journal";
import InstaStrip from "@/components/InstaStrip";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import PizzaBuilder from "@/components/PizzaBuilder";
import { fetchBlogPostsServer, fetchMenuItemsServer } from "@/lib/api-server";

// Fresh from the backend on every request — dashboard edits appear immediately.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [bestsellers, featured, posts] = await Promise.all([
    fetchMenuItemsServer({ bestseller: true }),
    fetchMenuItemsServer({ featured: true }),
    fetchBlogPostsServer(6),
  ]);

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
        <MenuShowcase
          kicker="Fan favourites, straight from the oven"
          title="Best sellers"
          items={bestsellers.slice(0, 4)}
        />
        <MenuShowcase
          kicker="Hand-picked by the pizzaioli"
          title="Featured"
          items={featured.slice(0, 4)}
          tone="paper-deep"
        />
        <Locations />
        <Journal initialPosts={posts} />
        <InstaStrip />
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}
