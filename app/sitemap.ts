import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { fetchBlogPostsServer, fetchBranchesServer } from "@/lib/api-server";

// Fresh on every request so new blog posts / branches appear immediately.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, branches] = await Promise.all([
    fetchBlogPostsServer(100).catch(() => []),
    fetchBranchesServer().catch(() => []),
  ]);

  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/menu`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/order`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/journal`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/locations`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/book`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const journal = posts
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${SITE_URL}/journal/${encodeURIComponent(p.slug)}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const branchPages = branches
    .filter((b) => b.slug)
    .map((b) => ({
      url: `${SITE_URL}/locations/${encodeURIComponent(b.slug)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));

  return [...core, ...journal, ...branchPages];
}