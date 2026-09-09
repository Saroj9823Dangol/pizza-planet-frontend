import Link from "next/link";
import type { ApiPromo } from "@/lib/api-server";
import PromoAddButton from "./PromoAddButton";
import { rs } from "@/lib/api";

const SHAPES = ["fm-organic-a", "fm-organic-b", "fm-organic-c"] as const;

/**
 * Server component — banners are server-rendered into the initial HTML.
 * Only the tiny add-to-tray button is a client component (it must touch the
 * cart store); the banner copy, image and layout never leave the server.
 */
export default function PromoBanners({ initialPromos }: { initialPromos?: ApiPromo[] }) {
  const promos = initialPromos && initialPromos.length ? initialPromos : [];
  // Existing rows created before PromoKind was introduced remain useful:
  // linked/fixed-price rows are offers; editorial rows are specials.
  const specials = promos.filter((promo) => (promo.kind ?? (promo.menuItemId && promo.price !== null ? "OFFER" : "SPECIAL")) === "SPECIAL");
  const offers = promos.filter((promo) => (promo.kind ?? (promo.menuItemId && promo.price !== null ? "OFFER" : "SPECIAL")) === "OFFER");

  // No active banners → render nothing. Never leave an empty styled section
  // (or stale static banners) behind — the section exists only when there is
  // something to show, and the data is refetched fresh on every page load.
  if (promos.length === 0) return null;

  return (
    <section className="fm-promo-section">
      <div className="fm-promo-heading">
        <p className="fm-kicker">Fresh from the oven</p>
        <h2 className="fm-hand-title">Specials<span className="fm-red-dash">—</span></h2>
        <p className="fm-promo-subtitle">Stories, events and little moments from the planet.</p>
      </div>
      {specials.length > 0 ? <div className="fm-promo-grid fm-special-grid">
        {specials.map((promo, index) => {
          const orderable = Boolean(promo.menuItemId && promo.price !== null);
          return (
            <article
              key={promo.id}
              className={`fm-promo-card ${promo.isFeatured ? "fm-promo-card--raised" : ""}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="fm-promo-eyebrow">
                {/* <span className="fm-squiggle" aria-hidden="true">↗</span> */}
                {promo.eyebrow}
              </div>
              <div className={`fm-promo-image ${SHAPES[index % SHAPES.length]}`}>
                {promo.image ? <img src={promo.image} alt={promo.title} /> : null}
              </div>
              <div className="fm-promo-copy">
                <h2>{promo.title}</h2>
                <p>{promo.body}</p>
                <PromoPrice promo={promo} />
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
      </div> : null}
      {offers.length > 0 ? <div className="fm-offers-wrap">
        <div className="fm-offers-heading">
          <div><p className="fm-kicker">Good news for hungry people</p><h3>Offers<span className="fm-red-dash">—</span></h3></div>
          <p>Limited-time deals, built for sharing. Tap an offer to send it straight to your tray.</p>
        </div>
        <div className="fm-offers-rail">
          {offers.map((promo, index) => {
            const orderable = Boolean(promo.menuItemId && promo.price !== null);
            return <article key={promo.id} className={`fm-offer-ticket ${index % 2 ? "fm-offer-ticket--tilt" : ""}`}>
              <div className="fm-offer-ticket-art">{promo.image ? <img src={promo.image} alt="" /> : null}<span>{String(index + 1).padStart(2, "0")}</span></div>
              <div className="fm-offer-ticket-copy"><div className="fm-offer-ticket-label">LIMITED TIME <b>{discountPercent(promo)}{discountPercent(promo) ? "% OFF" : "DEAL"}</b></div><p className="fm-kicker">{promo.eyebrow}</p><h4>{promo.title}</h4><p>{promo.body}</p><PromoPrice promo={promo} />{orderable ? <PromoAddButton promo={promo} /> : <Link href={promo.ctaHref || "/order"} className="fm-outline-button fm-outline-button--red">{promo.ctaText}</Link>}</div>
            </article>;
          })}
        </div>
      </div> : null}
    </section>
  );
}

function discountPercent(promo: ApiPromo): number | null {
  const reference = promo.originalPrice ?? promo.menuItem?.basePrice ?? null;
  if (!promo.price || !reference || reference <= promo.price) return null;
  return Math.round(((reference - promo.price) / reference) * 100);
}

function PromoPrice({ promo }: { promo: ApiPromo }) {
  const discounted = promo.price !== null && promo.price !== undefined;
  // A linked product gives us a safe automatic reference price. Admins can
  // override it with originalPrice for bundles or editorial SPECIAL cards.
  const referencePrice = promo.originalPrice ?? promo.menuItem?.basePrice ?? null;
  const hasDiscount = discounted && referencePrice !== null && referencePrice > promo.price!;
  if (!discounted && !hasDiscount) return null;
  const salePrice = promo.price ?? referencePrice;
  return (
    <div className="fm-promo-price" aria-label={hasDiscount ? `Discounted price ${rs(salePrice!)}, originally ${rs(referencePrice!)}` : `Price ${rs(salePrice!)}`}>
      {hasDiscount ? <><del>{rs(referencePrice!)}</del><strong>{rs(salePrice!)}</strong><span>deal price</span></> : <strong>{rs(salePrice!)}</strong>}
    </div>
  );
}