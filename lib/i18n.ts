export const locales = ["sr", "en"] as const;
export type Locale = (typeof locales)[number];
export type Localized<T> = Record<Locale, T>;
export const defaultLocale: Locale = "sr";

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export const localeSettings = {
  sr: { language: "sr", openGraph: "sr_RS", dateTime: "sr-Latn" },
  en: { language: "en", openGraph: "en_US", dateTime: "en" },
} as const satisfies Localized<{ language: string; openGraph: string; dateTime: string }>;
