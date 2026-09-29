import type { Locale } from "@/lib/i18n";

/**
 * Hidden Easter-egg route (CoolFridgeGuys "Flappy Flight" mini game).
 *
 * Deliberately NOT part of `lib/routes.ts` RouteKey union, `lib/public-pages.ts`,
 * the sitemap or any navigation. It is reachable only through the secret trigger
 * on the CoolFridgeGuys case study page. Search engines are told to neither index
 * nor follow it (meta robots + X-Robots-Tag in proxy.ts).
 */
export const eggPath = (locale: Locale): string => `/${locale}/egg/coolfridgeguys/`;

/** The page must never be indexed or discovered through links. */
export const eggRobots = { index: false, follow: false } as const;

/** Canonical host guard for the response header set in proxy.ts. */
const EGG_PATH_PATTERN = /^\/(?:sr|en)\/egg\/coolfridgeguys\/$/;

export function isEggPath(pathname: string): boolean {
  return EGG_PATH_PATTERN.test(pathname.endsWith("/") ? pathname : `${pathname}/`);
}
