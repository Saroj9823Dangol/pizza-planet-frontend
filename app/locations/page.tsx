import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { fetchBranchesServer } from "@/lib/api-server";
import { mockBranches } from "@/lib/locations-fallback";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Pizzerias — Pizza Planet",
  description:
    "Every Pizza Planet has the same dough, the same warm welcome, and its own neighbourhood rhythm. Find your oven — Baneshwor, Jhamsikhel, Lakeside and more.",
};

export default async function LocationsPage() {
  const fetched = await fetchBranchesServer();
  const locs = fetched.length ? fetched : mockBranches;

  return (
    <>
      <Navbar />
      <main className="fm-locations-page">
        <section className="fm-locations-intro fm-wave-section fm-wave-section--paper">
          <div>
            <p className="fm-kicker">Bringing Napoli eating culture closer to you.</p>
            <h1 className="fm-hand-title">Find your oven<span className="fm-red-dash">—</span></h1>
            <p className="fm-locations-lede">Every Pizza Planet has the same dough, the same warm welcome, and its own neighbourhood rhythm. Choose yours, then come hungry.</p>
          </div>
          <div className="fm-locations-mark" aria-hidden="true">{String(locs.length).padStart(2, "0")}<br /><span>ovens<br />and counting</span></div>
        </section>
        <section className="fm-location-directory">
          {locs.map((location, index) => (
            <article key={location.slug} className={`fm-location-spread ${index % 2 ? "fm-location-spread--reverse" : ""}`}>
              <Link href={`/locations/${location.slug}`} className={`fm-location-image fm-organic-${String.fromCharCode(97 + (index % 3))}`}>
                <img src={location.heroImage || "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400&q=85"} alt={location.name} />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </Link>
              <div className="fm-location-copy">
                <p className="fm-kicker">{location.tagline}</p>
                <h2>{location.name}<span>+</span></h2>
                <p className="fm-location-description">{location.kitchenNote}</p>
                <div className="fm-location-facts">
                  <span>{location.hours ?? "10:00 – 22:00"} daily</span>
                  <span>{location.seats ?? "—"} seats</span>
                  <span>{location.city}</span>
                </div>
                <div className="fm-button-row">
                  <Link href={`/locations/${location.slug}`} className="fm-outline-button fm-outline-button--red">Explore pizzeria</Link>
                  <Link href={`/book?location=${location.slug}`} className="fm-outline-button">Book</Link>
                </div>
              </div>
            </article>
          ))}
        </section>
        <section className="fm-locations-cta fm-wave-section fm-wave-section--paper-deep">
          <p className="fm-kicker">Walk-ins always welcome.</p>
          <h2>Find a table.<br />Eat your crusts.</h2>
          <Link href="/menu" className="fm-red-button">See the menu</Link>
        </section>
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}