import { founderPortrait } from "@/content/about";
import { site } from "@/content/site";
import type { Dictionary } from "@/content/i18n/types";
import type { CaseStudyProject } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { canonicalUrl } from "@/lib/public-pages";
import { localizedPath, localizedProjectPath } from "@/lib/routes";

export type JsonValue = string | number | boolean | null | readonly JsonValue[] | { readonly [key: string]: JsonValue };

const organizationId = `${site.url}/#organization`;
const founderId = `${site.url}/#nikola-markovic`;

export function siteSchema(): JsonValue {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization", "@id": organizationId,
        name: site.name, url: canonicalUrl(localizedPath("home", "sr")),
        logo: { "@type": "ImageObject", url: canonicalUrl("/logo/nmark-seal.png"), width: 1000, height: 1000 },
        email: site.email, telephone: site.phone.href.slice(4),
        sameAs: [site.instagramUrl],
        founder: { "@type": "Person", "@id": founderId, name: "Nikola Marković" },
      },
      {
        "@type": "WebSite", "@id": `${site.url}/#website`,
        name: site.name, url: canonicalUrl(localizedPath("home", "sr")),
        inLanguage: ["sr", "en"], publisher: { "@id": organizationId },
      },
    ],
  };
}

export function founderSchema(locale: Locale): JsonValue {
  return {
    "@context": "https://schema.org", "@type": "Person", "@id": founderId,
    name: "Nikola Marković", jobTitle: "Frontend developer",
    url: canonicalUrl(localizedPath("about", locale)),
    image: canonicalUrl(founderPortrait.src),
    worksFor: { "@type": "Organization", "@id": organizationId, name: site.name },
  };
}

export function projectBreadcrumbs(project: CaseStudyProject, locale: Locale, copy: Dictionary): JsonValue {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: copy.navigation.portfolio, item: canonicalUrl(localizedPath("portfolio", locale)) },
      { "@type": "ListItem", position: 2, name: project.title, item: canonicalUrl(localizedProjectPath(project.slug, locale)) },
    ],
  };
}

export function serializeJsonLd(value: JsonValue): string {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
