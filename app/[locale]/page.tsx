import { notFound } from "next/navigation";
import { CTA } from "@/components/home/CTA";
import { FAQ } from "@/components/home/FAQ";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { WebMcpTools } from "@/components/home/WebMcpTools";
import { discoverPages } from "@/lib/agent-discovery";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { getDictionary } from "@/content/i18n";
import { isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteSchema } from "@/lib/schema";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = await getDictionary(locale);

  return createPageMetadata({
    ...copy.home.metadata,
    locale,
    route: "home",
    image: {
      src: "/images/hero-montage.webp",
      width: 1365,
      height: 1100,
      alt: copy.home.hero.imageAlt,
    },
  });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = await getDictionary(locale);

  const [sr, en] = await Promise.all([discoverPages("sr"), discoverPages("en")]);

  return (
    <>
      <JsonLd data={siteSchema(locale, copy)} />
      <WebMcpTools locale={locale} pages={{ sr, en }} />
      <Hero locale={locale} copy={copy} />
      <FeaturedProjects locale={locale} copy={copy} />
      <Services locale={locale} copy={copy.home.services} />
      <CTA locale={locale} copy={copy} />
      <FAQ locale={locale} copy={copy} />
    </>
  );
}
