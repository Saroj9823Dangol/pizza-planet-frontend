import Link from "next/link";
import type { ApiPromo } from "@/lib/api-server";
import PromoAddButton from "./PromoAddButton";
import { rs } from "@/lib/api";

const SHAPES = ["fm-organic-a", "fm-organic-b", "fm-organic-c"] as const;

function kindOf(promo: ApiPromo) {
  return promo.kind ?? (promo.menuItemId && promo.price !== null ? "OFFER" : "SPECIAL");
}

function discountPercent(promo: ApiPromo): number | null {
  const reference = promo.originalPrice ?? promo.menuItem?.basePrice ?? null;
  if (!promo.price || !reference || reference <= promo.price) return null;
  return Math.round(((reference - promo.price) / reference) * 100);
}

function isOrderable(promo: ApiPromo) {
  return Boolean(promo.menuItemId && promo.price !== null && promo.price !== undefined);
}

function PromoPrice({ promo, compact = false }: { promo: ApiPromo; compact?: boolean }) {
  const sale = promo.price;
  const reference = promo.originalPrice ?? promo.menuItem?.basePrice ?? null;
  const discounted = sale !== null && sale !== undefined;
  const hasDiscount = discounted && reference !== null && reference > sale;
  if (!discounted && !hasDiscount) return null;

  return (
    <div className={compact ? "fm-campaign-price fm-campaign-price--compact" : "fm-campaign-price"}>
      {hasDiscount ? <del>{rs(reference!)}</del> : null}
      <strong>{rs(sale ?? reference!)}</strong>
      {hasDiscount ? <span>save {discountPercent(promo)}%</span> : null}
    </div>
  );
}

function PromoAction({ promo, solid = false }: { promo: ApiPromo; solid?: boolean }) {
  if (isOrderable(promo)) return <PromoAddButton promo={promo} className={`fm-campaign-button ${solid ? "fm-campaign-button--solid" : ""}`} />;
  return (
    <Link href={promo.ctaHref || "/order"} className={`fm-campaign-button ${solid ? "fm-campaign-button--solid" : ""}`}>
      {promo.ctaText}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

/**
 * The home campaign board: offers lead with an obvious deal banner, while
 * specials remain editorial and quieter. All copy and prices come from the API.
 */
export default function PromoBanners({ initialPromos }: { initialPromos?: ApiPromo[] }) {
  const promos = initialPromos ?? [];
  const offers = promos.filter((promo) => kindOf(promo) === "OFFER");
  const specials = promos.filter((promo) => kindOf(promo) === "SPECIAL");
  const leadOffer = offers[0];
  const supportingOffers = offers.slice(1);

  if (!promos.length) return null;

  return (
    <section className="fm-campaigns" aria-labelledby="campaigns-title">
      <div className="fm-campaigns-shell">
        <header className="fm-campaigns-header">
          <div>
            <p className="fm-kicker">On the planet right now</p>
            <h2 id="campaigns-title" className="fm-hand-title">Good things<span className="fm-red-dash">—</span></h2>
          </div>
          <p className="fm-campaigns-intro">Limited drops, generous slices and reasons to make tonight a little less ordinary.</p>
        </header>

        {leadOffer ? (
          <div className="fm-offer-board">
            <article className="fm-offer-lead">
              <div className="fm-offer-lead-media">
                {leadOffer.image ? <img src={leadOffer.image} alt={leadOffer.title} /> : <span className="fm-offer-placeholder" aria-hidden="true">✦</span>}
                <span className="fm-offer-lead-stamp">{discountPercent(leadOffer) ? `${discountPercent(leadOffer)}% off` : "planet deal"}</span>
              </div>
              <div className="fm-offer-lead-copy">
                <p className="fm-kicker">{leadOffer.eyebrow}</p>
                <h3>{leadOffer.title}</h3>
                <p className="fm-offer-lead-body">{leadOffer.body}</p>
                <div className="fm-offer-lead-bottom">
                  <PromoPrice promo={leadOffer} />
                  <PromoAction promo={leadOffer} solid />
                </div>
              </div>
            </article>

            {supportingOffers.length ? (
              <div className="fm-offer-stack" aria-label="More offers">
                {supportingOffers.map((promo, index) => (
                  <article className="fm-offer-row" key={promo.id}>
                    <div className="fm-offer-row-image">
                      {promo.image ? <img src={promo.image} alt="" /> : <span aria-hidden="true">✦</span>}
                    </div>
                    <div className="fm-offer-row-copy">
                      <div className="fm-offer-row-topline"><span>{promo.eyebrow}</span><b>{discountPercent(promo) ? `${discountPercent(promo)}% OFF` : "DEAL"}</b></div>
                      <h3>{promo.title}</h3>
                      <p>{promo.body}</p>
                      <div className="fm-offer-row-bottom"><PromoPrice promo={promo} compact /><PromoAction promo={promo} /></div>
                    </div>
                    <span className="fm-offer-row-mark" aria-hidden="true">0{index + 2}</span>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {specials.length ? (
          <div className="fm-special-board">
            <div className="fm-special-board-heading">
              <div><p className="fm-kicker">Not everything needs a price tag</p><h3>Specials<span className="fm-red-dash">—</span></h3></div>
              <p>Stories, sessions and small bits of good news from our kitchens.</p>
            </div>
            <div className="fm-special-board-grid">
              {specials.map((promo, index) => (
                <article className="fm-special-card" key={promo.id}>
                  <div className={`fm-special-card-image ${SHAPES[index % SHAPES.length]}`}>
                    {promo.image ? <img src={promo.image} alt={promo.title} /> : <span aria-hidden="true">✦</span>}
                  </div>
                  <div className="fm-special-card-copy">
                    <p className="fm-kicker">{promo.eyebrow}</p>
                    <h4>{promo.title}</h4>
                    <p>{promo.body}</p>
                    <PromoPrice promo={promo} compact />
                    <PromoAction promo={promo} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
