import { privacyPublication } from "@/content/privacy";
import type { MetadataRoute } from "next";
import { canonicalUrl, pageAlternates, publicPages } from "@/lib/public-pages";
import { blogPosts } from "@/content/blog";

const blogModifiedDates = new Map(blogPosts.map((post) => [post.slug, post.updatedOn ?? post.publishedOn]));

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPages.filter(page => page.route !== "privacy" || privacyPublication.approved).map(({ path, route, slug }) => ({
    url: canonicalUrl(path),
    alternates: { languages: pageAlternates(path) },
    lastModified: route === "blog" && slug ? blogModifiedDates.get(slug) : undefined,
  }));
}
