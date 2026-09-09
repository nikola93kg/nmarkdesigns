import type { Metadata } from "next";
import { site } from "@/content/site";
import { defaultLocale, locales, localeSettings, type Locale } from "@/lib/i18n";
import { localizedPath, localizedProjectPath, type RouteKey } from "@/lib/routes";

interface PageMetadataContent {
  title: string;
  description: string;
  locale: Locale;
  image?: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
}

type PageMetadataOptions = PageMetadataContent & (
  | { route: "portfolio"; slug?: string }
  | { route: Exclude<RouteKey, "portfolio">; slug?: never }
);

export function createPageMetadata({
  title,
  description,
  route,
  slug,
  locale,
  image,
}: PageMetadataOptions): Metadata {
  const pagePath = (language: Locale) => route === "portfolio" && slug
    ? localizedProjectPath(slug, language)
    : localizedPath(route, language);
  const url = new URL(pagePath(locale), site.url).toString();
  const socialTitle = `${title} | ${site.name}`;
  const languages = Object.fromEntries(
    locales.map((language) => [language, new URL(pagePath(language), site.url).toString()]),
  );
  const images = image ? [{
    url: new URL(image.src, site.url).toString(),
    width: image.width,
    height: image.height,
    alt: image.alt,
  }] : undefined;

  return {
    title: { absolute: socialTitle },
    description,
    alternates: {
      canonical: url,
      languages: {
        ...languages,
        "x-default": new URL(pagePath(defaultLocale), site.url).toString(),
      },
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
    // The WordPress migration is not launch-ready; production builds stay protected too.
    robots: { index: false, follow: false },
  };
}
