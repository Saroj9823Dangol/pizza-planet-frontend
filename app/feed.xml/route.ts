import { fetchBlogPostsServer } from "@/lib/api-server";
import { SITE_URL } from "@/lib/site";

// RSS 2.0 feed of the journal — helps syndication, discovery, and keeps
// aggregators (and Google) pointed at every new post the moment it's live.
export const dynamic = "force-dynamic";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await fetchBlogPostsServer(50).catch(() => []);

  const items = posts
    .map((p) => {
      const link = `${SITE_URL}/journal/${encodeURIComponent(p.slug)}`;
      const image = p.coverImage
        ? `${SITE_URL}/og/blog/${encodeURIComponent(p.slug)}`
        : null;
      const pubDate = p.publishedAt
        ? new Date(p.publishedAt).toUTCString()
        : new Date().toUTCString();
      const description = xmlEscape(stripHtml(p.excerpt ?? ""));
      const body = xmlEscape(stripHtml(p.content ?? ""));

      return [
        "    <item>",
        `      <title>${xmlEscape(p.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        ...p.tags.map((t) => `      <category>${xmlEscape(t)}</category>`),
        `      <description>${description}</description>`,
        ...(image
          ? [
              `      <enclosure url="${image}" type="image/jpeg" length="0"/>`,
            ]
          : []),
        ...(body
          ? [`      <content:encoded><![CDATA[${p.content ?? ""}]]></content:encoded>`]
          : []),
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Pizza Planet Journal</title>
    <link>${SITE_URL}/journal</link>
    <description>Recipes, stories, and a few thoughts from the Pizza Planet kitchen.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}