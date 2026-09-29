import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EggGameRoot, type EggLabels } from "@/components/egg/EggGameRoot";
import { getDictionary } from "@/content/i18n";
import { isLocale } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Hidden easter-egg route (/sr/egg/coolfridgeguys). It must never be indexed,
 * followed or linked from the public site, so metadata opts every robot out and
 * proxy.ts additionally answers with X-Robots-Tag: noindex, nofollow.
 */
export function generateMetadata(): Metadata {
  return {
    title: "Cool Fridge Guys",
    robots: { index: false, follow: false, nocache: true, noarchive: true },
  };
}

export default async function EggPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const copy = await getDictionary(raw);
  const labels: EggLabels = { ...copy.egg };
  const backHref = raw === "en" ? "/en/portfolio/cool-fridge-guys" : "/portfolio/cool-fridge-guys";

  return <EggGameRoot labels={labels} backHref={backHref} />;
}
