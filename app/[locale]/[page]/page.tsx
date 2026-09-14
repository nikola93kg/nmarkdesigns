import { notFound } from "next/navigation";
import { AboutApproach } from "@/components/about/AboutApproach";
import { AboutIntro } from "@/components/about/AboutIntro";
import { AboutProfile } from "@/components/about/AboutProfile";
import { ContactPage } from "@/components/contact/ContactPage";
import { PricingPage } from "@/components/pricing/PricingPage";
import { ServicesPage } from "@/components/services/ServicesPage";
import { founderPortrait } from "@/content/about";
import { getDictionary } from "@/content/i18n";
import { isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";
import { corePageRoute, corePageRoutes, routes } from "@/lib/routes";
import { JsonLd } from "@/components/seo/JsonLd";
import { founderSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { locale: string } }) {
  const { locale } = params;
  return isLocale(locale) ? corePageRoutes.map((route) => ({ page: routes[route].paths[locale] })) : [];
}

async function resolvePage(params: PageProps<"/[locale]/[page]">["params"]) {
  const { locale, page } = await params;
  if (!isLocale(locale)) notFound();
  const route = corePageRoute(page, locale);
  if (!route) notFound();
  return { locale, route, copy: await getDictionary(locale) };
}

export async function generateMetadata({ params }: PageProps<"/[locale]/[page]">) {
  const { locale, route, copy } = await resolvePage(params);
  return createPageMetadata({
    ...copy[route].metadata,
    locale,
    route,
    image: route === "services"
      ? undefined
      : route === "about"
      ? { ...founderPortrait, alt: copy.about.profile.imageAlt }
      : { src: "/images/hero-montage.webp", width: 1365, height: 1100, alt: copy.home.hero.imageAlt },
  });
}

export default async function CorePage({ params }: PageProps<"/[locale]/[page]">) {
  const { locale, route, copy } = await resolvePage(params);
  if (route === "services") return <ServicesPage locale={locale} copy={copy} />;
  if (route === "contact") return <ContactPage locale={locale} copy={copy.contact} />;
  if (route === "pricing") return <PricingPage locale={locale} copy={copy.pricing} navigation={copy.navigation} />;
  return (
    <>
      <JsonLd data={founderSchema(locale)} />
      <AboutIntro copy={copy.about.intro} />
      <AboutProfile copy={copy.about.profile} />
      <AboutApproach locale={locale} copy={copy} />
    </>
  );
}
