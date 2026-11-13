import { site, type NavigationItem } from "@/content/site";
import { serviceDefinitions } from "@/content/services";
import { defaultLocale, isLocale, type Locale, type Localized } from "@/lib/i18n";

export type RouteKey = "home" | "portfolio" | "blog" | "services" | "about" | "contact" | "pricing";

interface RouteDefinition {
  paths: Localized<string>;
  implemented: boolean;
  fallback?: string;
}

export const routes: Record<RouteKey, RouteDefinition> = {
  home: { paths: { sr: "", en: "" }, implemented: true },
  portfolio: {
    paths: { sr: "portfolio", en: "portfolio" },
    implemented: true,
  },
  blog: {
    paths: { sr: "blog", en: "blog" },
    implemented: true,
  },
  services: {
    paths: { sr: "usluge", en: "services" },
    implemented: true,
  },
  about: {
    paths: { sr: "o-nama", en: "about" },
    implemented: true,
  },
  contact: {
    paths: { sr: "kontakt", en: "contact" },
    implemented: true,
  },
  pricing: {
    paths: { sr: "cenovnik", en: "pricing" },
    implemented: true,
  },
};

export const navigationOrder: readonly RouteKey[] = [
  "home", "portfolio", "blog", "services", "about", "contact",
];

export const corePageRoutes = ["services", "about", "contact", "pricing"] as const;

export function corePageRoute(segment: string, locale: Locale) {
  return corePageRoutes.find((route) => routes[route].paths[locale] === segment);
}

export function localizedPath(route: RouteKey, locale: Locale): string {
  const segment = routes[route].paths[locale];
  return segment ? `/${locale}/${segment}/` : `/${locale}/`;
}

export function localizedProjectPath(slug: string, locale: Locale): string {
  return `${localizedPath("portfolio", locale)}${encodeURIComponent(slug)}/`;
}

export function localizedBlogPostPath(slug: string, locale: Locale): string {
  return `${localizedPath("blog", locale)}${encodeURIComponent(slug)}/`;
}

export function localizedServicePath(slug: string, locale: Locale): string {
  return `${localizedPath("services", locale)}${encodeURIComponent(slug)}/`;
}

export function navigationItem(
  route: RouteKey,
  locale: Locale,
  label: string,
): NavigationItem {
  const definition = routes[route];
  const fallback = definition.fallback;
  const href = definition.implemented || !fallback
    ? localizedPath(route, locale)
    : fallback.startsWith("#")
      ? `${localizedPath("home", locale)}${fallback}`
      : fallback;

  return { label, href, external: href.startsWith("https://") };
}

// Only known route equivalents are translated. Unknown paths have no switch target.
export function equivalentPath(path: string, targetLocale: Locale): string | null {
  const url = new URL(path, site.url);
  const [locale = defaultLocale, segment = "", ...rest] = url.pathname.split("/").filter(Boolean);
  if (!isLocale(locale)) return null;

  const route = (Object.keys(routes) as RouteKey[]).find(
    (key) => routes[key].paths[locale] === segment,
  );
  if (!route) return null;
  if (rest.length > 0) {
    if (rest.length !== 1) return null;
    if (route === "services") {
      const service = Object.values(serviceDefinitions).find((item) => item.slugs[locale] === rest[0]);
      if (!service) return null;
      return `${localizedServicePath(service.slugs[targetLocale], targetLocale)}${url.search}${url.hash}`;
    }
    if (route !== "portfolio" && route !== "blog") return null;
  }

  const suffix = rest.length ? `${rest[0]}/` : "";
  return `${localizedPath(route, targetLocale)}${suffix}${url.search}${url.hash}`;
}
