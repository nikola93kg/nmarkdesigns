import "server-only";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "./types";

const dictionaries = {
  sr: () => import("./sr").then((module) => module.default),
  en: () => import("./en").then((module) => module.default),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
