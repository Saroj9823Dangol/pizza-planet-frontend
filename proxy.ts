import { NextResponse, type NextRequest } from "next/server";

// Reverse-proxy for /api/* → NestJS backend.
//
// Why here instead of next.config rewrites? The storefront must be a live
// window into the admin dashboard: API responses must never be cached, and
// the backend's own Cache-Control header can be stripped in transit (e.g. by
// a CDN hop). Proxying here lets us force `Cache-Control: no-store` on the
// final response the browser receives.
const API_TARGET = process.env.API_PROXY_TARGET ?? "http://localhost:3001";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/api" || pathname.startsWith("/api/")) {
    const target = `${API_TARGET}${pathname}${search}`;
    const method = request.method;
    const isBodyless = method === "GET" || method === "HEAD";

    try {
      const upstream = await fetch(target, {
        method,
        headers: {
          accept: request.headers.get("accept") ?? "application/json",
          ...(request.headers.get("content-type")
            ? { "content-type": request.headers.get("content-type")! }
            : {}),
          ...(request.headers.get("authorization")
            ? { authorization: request.headers.get("authorization")! }
            : {}),
        },
        body: isBodyless ? undefined : await request.arrayBuffer(),
        cache: "no-store",
      });

      const headers = new Headers();
      headers.set(
        "Content-Type",
        upstream.headers.get("content-type") ?? "application/json",
      );
      headers.set("Cache-Control", "no-store");
      headers.set("Access-Control-Allow-Origin", "*");

      return new NextResponse(await upstream.arrayBuffer(), {
        status: upstream.status,
        headers,
      });
    } catch {
      return NextResponse.json(
        { statusCode: 502, message: "API unreachable" },
        { status: 502 },
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};