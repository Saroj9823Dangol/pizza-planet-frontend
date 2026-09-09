import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { OG_DEFAULT_IMAGE, SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Our Story — Pizza Planet",
  description:
    "Pizza Planet's story — fresh handmade dough, honest toppings, small bills. Three values that have guided us from the first oven: dough takes time, good food is generous, and we keep it real.",
  openGraph: {
    title: "Our Story — Pizza Planet",
    description:
      "Fresh handmade dough, honest toppings, small bills. The story behind Pizza Planet.",
    type: "website",
    url: `${SITE_URL}/about`,
    images: [OG_DEFAULT_IMAGE],
  },
  alternates: { canonical: `${SITE_URL}/about` },
  twitter: {
    card: "summary_large_image",
    title: "Our Story — Pizza Planet",
    description: "The story behind Pizza Planet — fresh dough, honest toppings, small bills.",
    images: [OG_DEFAULT_IMAGE],
  },
};

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Our Story — Pizza Planet",
    url: `${SITE_URL}/about`,
    description:
      "Pizza Planet's story — fresh handmade dough, honest toppings, small bills.",
    mainEntity: {
      "@type": "Organization",
      name: "Pizza Planet",
      url: SITE_URL,
      logo: `${SITE_URL}/logo/logo.jpg`,
      description:
        "Planet of Cheeseness, Togetherness & Happiness. Wood-fired pizzas, momo, wings, pasta and more — handmade every day.",
    },
  };

  return (
    <>
      <JsonLd data={aboutSchema} />
      <Navbar />
      <main>
        <About />
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}