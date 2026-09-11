import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { isIndexableHost } from "@/lib/seo-config";

export function robotsForHost(host: string | null, enabled?: boolean): MetadataRoute.Robots {
  return isIndexableHost(host, enabled)
    ? { rules: { userAgent: "*", allow: "/", disallow: ["/wp-admin/", "/wp-json/", "/api/"] }, sitemap: `${site.url}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
