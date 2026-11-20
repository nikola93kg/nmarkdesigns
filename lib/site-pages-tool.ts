import { locales, type Locale } from "@/lib/i18n";

export const sitePagesTool = {
  name: "get_site_pages",
  description: "Find NMark Designs services, pricing, portfolio, contact and policies in Serbian or English.",
  inputSchema: {
    type: "object",
    properties: { locale: { type: "string", enum: locales } },
    additionalProperties: false,
  },
  annotations: { readOnlyHint: true },
} as const;

export type SitePageLink = { label: string; url: string };

export function sitePagesResult(locale: Locale, pages: SitePageLink[]) {
  return { content: [{ type: "text" as const, text: JSON.stringify({ locale, pages }) }] };
}
