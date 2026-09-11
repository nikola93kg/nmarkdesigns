import { caseStudyProjects } from "@/content/projects";
import { locales, type Locale } from "@/lib/i18n";
import { localizedPath, localizedProjectPath, routes, type RouteKey } from "@/lib/routes";
import { site } from "@/content/site";

export interface PublicPage {
  locale: Locale;
  route: RouteKey;
  slug?: string;
  path: string;
}

export const publicPages: readonly PublicPage[] = locales.flatMap((locale) => [
  ...(Object.keys(routes) as RouteKey[])
    .filter((route) => routes[route].implemented)
    .map((route) => ({ locale, route, path: localizedPath(route, locale) })),
  ...caseStudyProjects.map(({ slug }) => ({
    locale, route: "portfolio" as const, slug, path: localizedProjectPath(slug, locale),
  })),
]);

export function canonicalUrl(path: string): string {
  return new URL(path, site.url).toString();
}

export function pageAlternates(path: string): Record<string, string> {
  const page = publicPages.find((entry) => entry.path === path);
  if (!page) throw new Error(`No published page for ${path}`);
  const equivalents = publicPages.filter((entry) => entry.route === page.route && entry.slug === page.slug);
  return Object.fromEntries([
    ...equivalents.map((entry) => [entry.locale, canonicalUrl(entry.path)]),
    ...equivalents.filter((entry) => entry.locale === "sr").map((entry) => ["x-default", canonicalUrl(entry.path)]),
  ]);
}
