// Renders schema.org JSON-LD safely. Escapes `<` so embedded HTML content
// (e.g. blog article bodies) can never break out of the script tag.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}