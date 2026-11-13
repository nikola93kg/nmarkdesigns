import type { Metadata } from "next";
import { site } from "@/content/site";
import { locales, localeSettings, type Locale } from "@/lib/i18n";
import {
  localizedBlogPostPath,
  localizedPath,
  localizedProjectPath,
  localizedServicePath,
  type RouteKey,
} from "@/lib/routes";
import { canonicalUrl, pageAlternates } from "@/lib/public-pages";
import { pageRobots } from "@/lib/seo-config";

interface PageMetadataContent {
  title: string;
  description: string;
  locale: Locale;
  image?: {
    src: string;
    width: number;
    height: number;
    alt: string;
    type?: string;
  };
}

type PageMetadataOptions = PageMetadataContent & (
  | { route: "portfolio"; slug?: string }
  | { route: "blog"; slug?: string }
  | { route: "services"; slug?: string }
  | { route: Exclude<RouteKey, "portfolio" | "blog" | "services">; slug?: never }
);

export function createPageMetadata({
  title,
  description,
  route,
  slug,
  locale,
  image,
}: PageMetadataOptions): Metadata {
  const pagePath = (language: Locale) => {
    if (route === "portfolio" && slug) return localizedProjectPath(slug, language);
    if (route === "blog" && slug) return localizedBlogPostPath(slug, language);
    if (route === "services" && slug) return localizedServicePath(slug, language);
    return localizedPath(route, language);
  };
  const url = canonicalUrl(pagePath(locale));
  const socialTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const images = image ? [{
    url: new URL(image.src, site.url).toString(),
    width: image.width,
    height: image.height,
    alt: image.alt,
    type: image.type,
  }] : undefined;

  return {
    title: { absolute: socialTitle },
    description,
    alternates: {
      canonical: url,
      languages: pageAlternates(pagePath(locale)),
    },
    openGraph: {
      type: "website",
      title: socialTitle,
      description,
      url,
      siteName: site.name,
      locale: localeSettings[locale].openGraph,
      alternateLocale: locales.filter((language) => language !== locale).map((language) => localeSettings[language].openGraph),
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: socialTitle,
      description,
      images,
    },
    robots: pageRobots,
  };
}
