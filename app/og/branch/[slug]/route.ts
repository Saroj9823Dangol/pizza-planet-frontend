import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { fetchBranchesServer } from "@/lib/api-server";
import { OG_DEFAULT_IMAGE } from "@/lib/site";

// Same pattern as /og/blog/<slug>: branch hero images live on
// images.unsplash.com, whose CDN blocks social crawlers, so we serve the
// share image from THIS domain so every scraper gets a real image.

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const cache = new Map<string, { data: Buffer; type: string }>();

async function fetchImage(url: string): Promise<{ data: Buffer; type: string } | null> {
  const hit = cache.get(url);
  if (hit) return hit;
  try {
    const res = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = Buffer.from(await res.arrayBuffer());
    if (!data.length) return null;
    const type = res.headers.get("content-type") ?? "image/jpeg";
    if (cache.size > 200) cache.clear();
    cache.set(url, { data, type });
    return { data, type };
  } catch {
    return null;
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse> {
  const { slug } = await params;
  const branches = await fetchBranchesServer();
  const branch = branches.find((b) => b.slug === slug);
  const cover = branch?.heroImage;

  const CACHE = "public, max-age=86400, s-maxage=86400, immutable";
  if (cover && /^https:\/\//i.test(cover)) {
    const image = await fetchImage(cover);
    if (image) {
      return new NextResponse(new Uint8Array(image.data), {
        headers: { "content-type": image.type, "cache-control": CACHE },
      });
    }
  }

  try {
    const data = await readFile(
      path.join(process.cwd(), "public", "og", "og-default.png"),
    );
    return new NextResponse(new Uint8Array(data), {
      headers: { "content-type": "image/png", "cache-control": CACHE },
    });
  } catch {
    return NextResponse.redirect(OG_DEFAULT_IMAGE);
  }
}