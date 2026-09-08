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
import { fetchBlogPostsServer, fetchBranchesServer, fetchCrustsServer, fetchInstagramServer, fetchMenuItemsServer, fetchPromosServer } from "@/lib/api-server";

// Fresh from the backend on every request — dashboard edits appear immediately.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [promos, allItems, bestsellers, featured, posts, branches, crusts, instagram] = await Promise.all([
    fetchPromosServer(),
    fetchMenuItemsServer(),
    fetchMenuItemsServer({ bestseller: true }),
    fetchMenuItemsServer({ featured: true }),
    fetchBlogPostsServer(6),
    fetchBranchesServer(),
    fetchCrustsServer(),
    fetchInstagramServer(),
  ]);

  return (
    <>
      <div className="relative">
        <Navbar overlay />
        <Hero />
      </div>
      <main>
        <PromoBanners initialPromos={promos} />
        <PizzaBuilder crusts={crusts} items={allItems} />
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
        <Locations branches={branches} />
        <Journal initialPosts={posts} />
        <InstaStrip posts={instagram} />
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}
