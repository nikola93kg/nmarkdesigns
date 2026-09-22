import { NextResponse, type NextRequest } from "next/server";
import { publicPages } from "@/lib/public-pages";
import { legacyRedirects } from "@/lib/legacy-redirects";
import { isIndexableHost } from "@/lib/seo-config";

const publicPaths = new Set(publicPages.map(({ path }) => path));

/**
 * Security headers configuration for nmarkdesigns.com
 * 
 * Addresses the following security weaknesses:
 * 1. Content-Security-Policy (CSP) - Comprehensive policy to prevent XSS, clickjacking, etc.
 * 2. Strict-Transport-Security (HSTS) - Prevents SSL stripping/downgrade attacks
 * 3. X-Frame-Options - Prevents clickjacking
 * 4. X-Content-Type-Options - Prevents MIME type sniffing
 * 5. Referrer-Policy - Controls referrer information
 * 6. Permissions-Policy - Disables unnecessary browser features
 */
function addSecurityHeaders(response: NextResponse): NextResponse {
  // 1. Content-Security-Policy
  // Restricts sources for scripts, styles, frames, forms, etc.
  // Uses 'self' for same-origin resources, 'unsafe-inline' for Next.js hydration (required)
  // frame-ancestors 'none' prevents clickjacking
  // form-action 'self' prevents form submission to external domains
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://www.google-analytics.com https://stats.g.doubleclick.net",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://www.google-analytics.com https://stats.g.doubleclick.net https://analytics.google.com",
    "frame-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  response.headers.set("Content-Security-Policy", cspDirectives);

  // 2. Strict-Transport-Security (HSTS)
  // Forces HTTPS for 2 years (63072000 seconds), includes subdomains, and enables preload
  // This prevents SSL stripping and downgrade attacks
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  // 3. X-Frame-Options
  // Prevents the site from being embedded in iframes (clickjacking protection)
  // Note: CSP frame-ancestors is preferred, but this provides backward compatibility
  response.headers.set("X-Frame-Options", "DENY");

  // 4. X-Content-Type-Options
  // Prevents browsers from MIME-sniffing responses away from the declared content-type
  response.headers.set("X-Content-Type-Options", "nosniff");

  // 5. Referrer-Policy
  // Controls how much referrer information is sent with requests
  // Sends origin for cross-origin requests, full URL for same-origin
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // 6. Permissions-Policy
  // Disables browser features that are not needed for this static/marketing site
  // Prevents unauthorized access to camera, microphone, geolocation, etc.
  const permissionsPolicy = [
    "camera=()",
    "microphone=()",
    "geolocation=()",
    "payment=()",
    "usb=()",
    "accelerometer=()",
    "gyroscope=()",
    "magnetometer=()",
    "ambient-light-sensor=()",
    "autoplay=()",
    "encrypted-media=()",
    "fullscreen=()",
    "picture-in-picture=()",
    "xr-spatial-tracking=()",
  ].join(", ");

  response.headers.set("Permissions-Policy", permissionsPolicy);

  return response;
}

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
    return protect(addSecurityHeaders(NextResponse.redirect(destination, 308)));
  }
  if (publicPaths.has(normalized)) {
    if (path !== normalized) {
      // NextURL preserves the incoming slash policy when serializing redirects.
      const destination = new URL(request.url);
      destination.pathname = normalized;
      return protect(addSecurityHeaders(NextResponse.redirect(destination, 308)));
    }
    return protect(addSecurityHeaders(NextResponse.next()));
  }
  if (
    path === "/robots.txt" ||
    path === "/sitemap.xml" ||
    /^\/(?:about|blog|images|projects|logo)\//.test(path) ||
    /^\/(?:apple-icon\.png|icon\.png|favicon\.ico|manifest\.webmanifest|web-app-manifest-\d+x\d+\.png)$/.test(path)
  ) {
    return protect(addSecurityHeaders(NextResponse.next()));
  }
  // Reject unknown and incorrectly cased URLs before case-insensitive static caches.
  const notFoundResponse = NextResponse.rewrite(new URL("/_not-found/", request.url), { status: 404 });
  return protect(addSecurityHeaders(notFoundResponse), true);
}

export const config = {
  matcher: ["/((?!_next/|_not-found(?:/|$)).*)"],
};
