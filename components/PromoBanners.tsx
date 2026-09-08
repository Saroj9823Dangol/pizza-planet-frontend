import Link from "next/link";
import type { ApiPromo } from "@/lib/api-server";
import PromoAddButton from "./PromoAddButton";

const SHAPES = ["fm-organic-a", "fm-organic-b", "fm-organic-c"] as const;

/**
 * Server component — banners are server-rendered into the initial HTML.
 * Only the tiny add-to-tray button is a client component (it must touch the
 * cart store); the banner copy, image and layout never leave the server.
 */
export default function PromoBanners({ initialPromos }: { initialPromos?: ApiPromo[] }) {
  const promos = initialPromos && initialPromos.length ? initialPromos : [];

  return (
    <section className="fm-promo-section">
      <div className="fm-promo-grid">
        {promos.map((promo, index) => {
          const orderable = Boolean(promo.menuItemId && promo.price !== null);
          return (
            <article
              key={promo.id}
              className={`fm-promo-card ${promo.isFeatured ? "fm-promo-card--raised" : ""}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="fm-promo-eyebrow">
                <span className="fm-squiggle" aria-hidden="true">↗</span>
                {promo.eyebrow}
              </div>
              <div className={`fm-promo-image ${SHAPES[index % SHAPES.length]}`}>
                {promo.image ? <img src={promo.image} alt={promo.title} /> : null}
              </div>
              <div className="fm-promo-copy">
                <h2>{promo.title}</h2>
                <p>{promo.body}</p>
                {orderable ? (
                  <PromoAddButton promo={promo} />
                ) : (
                  <Link
                    href={promo.ctaHref || "/order"}
                    className={`fm-outline-button ${promo.isFeatured ? "fm-outline-button--solid" : ""}`}
                  >
                    {promo.ctaText}
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}