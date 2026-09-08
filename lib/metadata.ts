import type { Metadata } from "next";
import { site } from "@/content/site";

interface PageMetadataOptions {
  title: string;
  description?: string;
  path: `/${string}`;
  noIndex?: boolean;
}

export function createPageMetadata({
  title,
  description = site.description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = new URL(path, site.url).toString();
  const socialTitle = `${title} | ${site.name}`;

  return {
    title: { absolute: socialTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: socialTitle,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
