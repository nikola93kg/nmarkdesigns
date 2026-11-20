"use client";

import { useEffect } from "react";
import { isLocale, type Locale, type Localized } from "@/lib/i18n";
import { sitePagesResult, sitePagesTool, type SitePageLink } from "@/lib/site-pages-tool";

type BrowserTool = typeof sitePagesTool & {
  execute: (input: { locale?: string }) => Promise<ReturnType<typeof sitePagesResult>>;
};

interface ModelContext {
  registerTool(tool: BrowserTool, options?: { signal: AbortSignal }): void | Promise<void>;
  unregisterTool?(name: string): void;
}

export function WebMcpTools({ locale, pages }: { locale: Locale; pages: Localized<SitePageLink[]> }) {
  useEffect(() => {
    const context = (document as Document & { modelContext?: ModelContext }).modelContext
      ?? (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
    if (!context?.registerTool) return;

    const registration = new AbortController();
    try {
      const result = context.registerTool({
        ...sitePagesTool,
        async execute({ locale: requested }) {
          const selected = requested && isLocale(requested) ? requested : locale;
          return sitePagesResult(selected, pages[selected]);
        },
      }, { signal: registration.signal });
      void result?.catch(() => {});
    } catch {
      // Registration is optional in browsers with an experimental implementation.
      return;
    }

    return () => {
      registration.abort();
      context.unregisterTool?.(sitePagesTool.name);
    };
  }, [locale, pages]);

  return null;
}
