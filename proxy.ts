import { NextResponse, type NextRequest } from "next/server";
import { publicPages } from "@/lib/public-pages";
import { legacyRedirects } from "@/lib/legacy-redirects";
import { isIndexableHost } from "@/lib/seo-config";

const publicPaths = new Set(publicPages.map(({ path }) => path));

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const normalized = path.endsWith("/") ? path : `${path}/`;
  const protect = (response: NextResponse, force = false) => {
    if (force || !isIndexableHost(request.headers.get("host"))) {
      response.headers.set("X-Robots-Tag", "noindex, nofollow");
    }
    return response;
  };
  const legacy = Object.hasOwn(legacyRedirects, normalized) ? legacyRedirects[normalized] : undefined;
  if (legacy) {
    const destination = new URL(legacy, request.url);
    destination.search = request.nextUrl.search;
    return protect(NextResponse.redirect(destination, 308));
  }
  if (publicPaths.has(normalized)) {
    if (path !== normalized) {
      // NextURL preserves the incoming slash policy when serializing redirects.
      const destination = new URL(request.url);
      destination.pathname = normalized;
      return protect(NextResponse.redirect(destination, 308));
    }
    return protect(NextResponse.next());
  }
  if (path === "/robots.txt" || path === "/sitemap.xml" || /^\/(about|images|projects|logo)\//.test(path) || /^\/blog\/.+\.(?:jpg|png|webp)$/.test(path)) {
    return protect(NextResponse.next());
  }
  // Reject unknown and incorrectly cased URLs before case-insensitive static caches.
  return protect(NextResponse.rewrite(new URL("/_not-found/", request.url), { status: 404 }), true);
}

export const config = {
  matcher: ["/((?!_next/|_not-found(?:/|$)).*)"],
};
