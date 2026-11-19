import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { adminCopy } from "@/content/chatbot/admin-copy";
import type { Locale } from "@/lib/i18n";
export function AdminDate({ value, locale }: { value: Date | string; locale: Locale }) { const date = new Date(value); return <time dateTime={date.toISOString()}>{new Intl.DateTimeFormat(locale === "sr" ? "sr-Latn" : "en", { timeZone: "Europe/Belgrade", dateStyle: "medium", timeStyle: "short" }).format(date)}</time>; }
export function Status({ value, locale }: { value: string | null; locale: Locale }) { return <span className="inline-block rounded-control bg-accent-soft px-2 py-1 text-xs font-semibold text-brand">{adminCopy[locale].statuses[value ?? ""] ?? value ?? adminCopy[locale].unknown}</span>; }
export function Pagination({ locale, path, filters, next }: { locale: Locale; path: string; filters: Record<string, string | undefined>; next: string | null }) {
  const copy = adminCopy[locale]; const params = new URLSearchParams(Object.entries(filters).filter((entry): entry is [string, string] => Boolean(entry[1]))); params.delete("cursor"); const first = `${path}?${params}`; if (next) params.set("cursor", next);
  return <nav aria-label={copy.next} className="mt-6 flex flex-wrap gap-5 text-small font-semibold text-brand">{filters.cursor && <Link href={first} className="min-h-11 py-3 underline">{copy.first}</Link>}{next && <Link href={`${path}?${params}`} className="min-h-11 py-3 underline">{copy.next}</Link>}</nav>;
}
export function DateFilters({ locale, from, to }: { locale: Locale; from?: string; to?: string }) {
  const copy = adminCopy[locale]; return <><label className="text-small">{copy.from}<input name="from" type="date" defaultValue={from} className="mt-1 block min-h-11 max-w-full rounded-control border border-border bg-surface px-3" /></label><label className="text-small">{copy.to}<input name="to" type="date" defaultValue={to} className="mt-1 block min-h-11 max-w-full rounded-control border border-border bg-surface px-3" /></label></>;
}
export function FilterActions({ locale, path }: { locale: Locale; path: string }) { const copy = adminCopy[locale]; return <div className="flex items-center gap-4"><Button type="submit">{copy.filter}</Button><Link href={path} className="min-h-11 py-3 text-small underline underline-offset-4">{copy.reset}</Link></div>; }
