import CartSidebar from "@/components/CartSidebar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InstaStrip from "@/components/InstaStrip";
import Journal from "@/components/Journal";
import JsonLd from "@/components/JsonLd";
import Locations from "@/components/Locations";
import MenuShowcase from "@/components/MenuShowcase";
import Navbar from "@/components/Navbar";
import PizzaBuilder from "@/components/PizzaBuilder";
import PromoBanners from "@/components/PromoBanners";
import SlowFastFood from "@/components/SlowFastFood";
import { fetchBlogPostsServer, fetchBranchesServer, fetchCrustsServer, fetchInstagramServer, fetchMenuItemsServer, fetchPizzaBasesServer, fetchPizzaSizesServer, fetchPromosServer } from "@/lib/api-server";
import { OG_DEFAULT_IMAGE, SITE_URL } from "@/lib/site";

// Fresh from the backend on every request — dashboard edits appear immediately.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [promos, allItems, bestsellers, featured, posts, branches, crusts, bases, sizes, instagram] = await Promise.all([
    fetchPromosServer(),
    fetchMenuItemsServer(),
    fetchMenuItemsServer({ bestseller: true }),
    fetchMenuItemsServer({ featured: true }),
    fetchBlogPostsServer(6),
    fetchBranchesServer(),
    fetchCrustsServer(),
    fetchPizzaBasesServer(),
    fetchPizzaSizesServer(),
    fetchInstagramServer(),
  ]);

  const hq = branches.find((b) => b.slug === "headquarters") ?? branches[0];
  const hours = hq?.hours?.replace(/\s*[–-]\s*/, "-") ?? "10:00-22:00";

  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Pizza Planet",
    description:
      "Best pizza! Wood-fired pizzas, momo, chicken wings, pasta, shakes & more. Planet of Cheeseness, Togetherness & Happiness.",
    url: SITE_URL,
    image: OG_DEFAULT_IMAGE,
    logo: `${SITE_URL}/logo/logo.jpg`,
    servesCuisine: ["Pizza", "Italian", "Momo", "Fast Food"],
    priceRange: "$$",
    telephone: hq?.phone ?? undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: hq?.address ?? undefined,
      addressLocality: hq?.city ?? "Kathmandu",
      addressCountry: "NP",
    },
    openingHours: `Mo-Su ${hours}`,
    menu: `${SITE_URL}/menu`,
    acceptsReservations: "True",
    hasMenu: `${SITE_URL}/menu`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      ratingCount: "150",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Where can I order Pizza Planet for delivery or pickup?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Order online for collection or delivery from your nearest Pizza Planet — Baneshwor, Jhamsikhel, Lakeside and more. Pick your branch, build your order, and it goes straight to that kitchen.",
        },
      },
      {
        "@type": "Question",
        name: "Can I build my own pizza?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Choose your base, pick your size, select a crust, and add up to twelve toppings. The price is built line by line so you always know exactly what you're paying for.",
        },
      },
      {
        "@type": "Question",
        name: "Are there vegetarian options?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Plenty. Vegetarian pizzas, momo and sides are clearly marked on the menu, and every topping can be added to a custom build — with vegan-friendly choices too.",
        },
      },
      {
        "@type": "Question",
        name: "What are Pizza Planet opening hours?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All pizzerias are open daily, typically 10:00 AM to 10:00 PM. Check your nearest location for exact hours.",
        },
      },
      {
        "@type": "Question",
        name: "Do you take table bookings?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — book a table online at any location. Walk-ins are always welcome too, especially outside Friday peak hours.",
        },
      },
    ],
  };

  return (
    <>
      {/* LCP: preload the hero poster so the first paint has an image ready. */}
      <link rel="preload" as="image" href="/images/hero.png" fetchPriority="high" />
      <JsonLd data={restaurantSchema} />
      <JsonLd data={faqSchema} />
      <div className="relative">
        <Navbar overlay />
        <Hero />
      </div>
      <main>
        <PromoBanners initialPromos={promos} />
        {/* <TodaysSpecial /> */}
        <PizzaBuilder crusts={crusts} bases={bases} sizes={sizes} />
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
