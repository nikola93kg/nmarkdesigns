import type { MetadataRoute } from "next";
import { canonicalUrl, pageAlternates, publicPages } from "@/lib/public-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPages.map(({ path }) => ({
    url: canonicalUrl(path),
    alternates: { languages: pageAlternates(path) },
  }));
}
