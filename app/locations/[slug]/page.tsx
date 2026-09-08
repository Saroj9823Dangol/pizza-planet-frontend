import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import AnnouncementBar from "@/components/AnnouncementBar";
import { fetchBranchesServer } from "@/lib/api-server";
import { mockBranches } from "@/lib/locations-fallback";
import type { ApiBranch } from "@/lib/api-server";

export const dynamic = "force-dynamic";

const ESTABLISHED: Record<string, string> = {
  baneshwor: "2022",
  jhamsikhel: "2023",
  lakeside: "2024",
};

async function getBranches(): Promise<ApiBranch[]> {
  const fetched = await fetchBranchesServer();
  return fetched.length ? fetched : mockBranches;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const branches = await getBranches();
  const loc = branches.find((b) => b.slug === slug);
  if (!loc) return {};
  return {
    title: `${loc.name} Pizzeria — Pizza Planet`,
    description: loc.kitchenNote ?? `${loc.name} Pizza Planet — same dough, same warm welcome, its own neighbourhood rhythm.`,
    openGraph: {
      title: `${loc.name} — Pizza Planet`,
      description: loc.kitchenNote ?? undefined,
      images: loc.heroImage ? [loc.heroImage] : undefined,
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const branches = await getBranches();
  const loc = branches.find((b) => b.slug === slug);

  if (!loc) return notFound();

  const others = branches.filter((location) => location.slug !== loc.slug);
  const locationNumber = String(branches.findIndex((location) => location.slug === loc.slug) + 1).padStart(2, "0");
  const heroImage = loc.heroImage || "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400&q=85";
  const storyImage = loc.storyImage || "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=1200&q=85";
  const description = loc.description?.length ? loc.description : [loc.kitchenNote ?? ""].filter(Boolean);
  const features = loc.features?.length ? loc.features : ["Walk-ins welcome", "Fresh dough daily", "Eat your crusts"];

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="fm-location-detail">
        <section className="fm-location-detail-hero fm-shell">
          <div className="fm-location-detail-intro">
            <Link href="/locations" className="fm-location-back">← ALL PIZZERIAS</Link>
            <div className="fm-location-detail-title-wrap">
              <p className="fm-kicker">{loc.tagline} · EST. {ESTABLISHED[loc.slug] ?? "2022"}</p>
              <h1>{loc.name}<span>+</span></h1>
              <p className="fm-location-detail-lede">{loc.kitchenNote}</p>
            </div>
            <div className="fm-location-detail-index" aria-label={`Pizzeria ${locationNumber} of ${branches.length}`}>
              <strong>{locationNumber}</strong>
              <span>/ {String(branches.length).padStart(2, "0")}</span>
            </div>
          </div>

          <div className="fm-location-detail-visual fm-organic-a">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImage} alt={`${loc.name} Pizza Planet pizzeria`} />
            <div className="fm-location-detail-image-shade" />
            <span className="fm-location-detail-image-note">THE ORIGINAL<br />OVEN ✦</span>
          </div>

          <div className="fm-location-detail-stamp" aria-hidden="true">WOOD<br />FIRED<br /><b>DAILY</b></div>
        </section>

        <section className="fm-location-detail-facts fm-shell">
          <div className="fm-location-fact fm-location-fact--lead">
            <span className="fm-location-fact-number">01</span>
            <p>Come for the crust.<br /><b>Stay for the neighbourhood.</b></p>
          </div>
          <div className="fm-location-fact">
            <span>FIND US</span>
            <p>{loc.address}<br />{loc.city}</p>
          </div>
          <div className="fm-location-fact">
            <span>OPEN DAILY</span>
            <p>{loc.hours ?? "10:00 – 22:00"}<br />{loc.phone}</p>
          </div>
          <div className="fm-location-fact">
            <span>ROOM FOR</span>
            <p>{loc.seats ?? "—"} hungry people<br />inside & outside</p>
          </div>
        </section>

        <section className="fm-location-detail-story fm-shell fm-wave-section fm-wave-section--paper">
          <div className="fm-location-detail-story-image fm-organic-c">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={storyImage} alt={`${loc.name} oven and dining room`} />
            <span>24H<br />DOUGH<br />✦</span>
          </div>
          <div className="fm-location-detail-story-copy">
            <p className="fm-kicker">A little more than a restaurant.</p>
            <h2>The first oven.<br /><em>Still the warmest.</em></h2>
            {description.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            <div className="fm-button-row">
              <Link href={`/book?location=${loc.slug}`} className="fm-red-button">Book this pizzeria →</Link>
              <Link href="/menu" className="fm-outline-button">See the menu</Link>
            </div>
          </div>
        </section>

        <section className="fm-location-detail-features">
          <div className="fm-shell">
            <div className="fm-location-detail-section-heading">
              <div>
                <p className="fm-kicker">Your table, your way.</p>
                <h2>Good to<br /><em>know.</em></h2>
              </div>
              <span className="fm-location-detail-arrow">→</span>
            </div>
            <div className="fm-location-feature-grid">
              {features.map((feature, index) => (
                <div className="fm-location-feature-card" key={feature}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{feature}</strong>
                  <p>{index === 0 ? "Make an evening of it." : index === 1 ? "There is always something happening." : "Walk in, settle down, eat well."}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="fm-location-detail-booking fm-shell">
          <div>
            <p className="fm-kicker">{loc.name} · {loc.city}</p>
            <h2>Meet us<br /><em>at the oven.</em></h2>
          </div>
          <div className="fm-location-detail-booking-action">
            <p>Walk-ins are welcome. For the best table, book ahead — especially on Fridays.</p>
            <Link href={`/book?location=${loc.slug}`} className="fm-red-button">Reserve a table ↗</Link>
          </div>
        </section>

        <section className="fm-location-detail-more">
          <div className="fm-shell">
            <div className="fm-location-detail-section-heading">
              <div>
                <p className="fm-kicker">Keep exploring.</p>
                <h2>More<br /><em>ovens.</em></h2>
              </div>
              <Link href="/locations" className="fm-outline-button">All pizzerias</Link>
            </div>
            <div className="fm-location-more-grid">
              {others.map((other) => (
                <Link key={other.slug} href={`/locations/${other.slug}`} className="fm-location-more-card">
                  <span className="fm-location-more-image fm-organic-b">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={other.heroImage || "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700&q=85"} alt={other.name} />
                  </span>
                  <span className="fm-location-more-copy">
                    <small>{other.tagline}</small>
                    <strong>{other.name} <i>↗</i></strong>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}