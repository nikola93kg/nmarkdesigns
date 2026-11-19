import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { isIndexableHost } from "@/lib/seo-config";

export function robotsForHost(host: string | null): MetadataRoute.Robots {
  return isIndexableHost(host)
    ? { rules: { userAgent: "*", allow: "/", disallow: ["/admin/", "/api/admin/", "/api/auth/"] }, sitemap: `${site.url}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
