import type { ApiInstagramPost } from "@/lib/api-server";

export default function InstaStrip({ posts }: { posts: ApiInstagramPost[] }) {
  const shots = posts.length ? posts : [];
  // Duplicate for the seamless CSS marquee loop.
  const doubled = [...shots, ...shots];

  return (
    <section className="fm-instagram-section fm-wave-section fm-wave-section--paper">
      <div className="fm-instagram-heading">
        <p className="fm-kicker">Learn from locals.</p>
        <h2 className="fm-hand-title">This feed is certified organic<span className="fm-red-dash">—</span></h2>
        <p className="fm-instagram-subtitle">Like the rest. Follow along for fresh slices, kitchen moments, and the people who make Pizza Planet feel like home.</p>
      </div>
      <div className="fm-instagram-rail" aria-label="Pizza Planet Instagram feed">
        <div className="fm-instagram-track">
          {doubled.map((post, index) => (
            <a
              key={`${post.id}-${index}`}
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              className="fm-instagram-thumb"
              title={post.caption ?? undefined}
            >
              <img
                src={post.image}
                alt={post.caption ?? `Pizza Planet Instagram ${index + 1}`}
                loading="lazy"
              />
            </a>
          ))}
        </div>
        <a className="fm-instagram-follow" href="https://instagram.com" target="_blank" rel="noreferrer">
          <span>This Instagram feed is certified organic. Like the rest.</span>
          <b>Follow us ↗</b>
        </a>
      </div>
    </section>
  );
}