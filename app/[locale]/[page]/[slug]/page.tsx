import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/content/i18n";
import { getServiceBySlug, serviceDefinitions, serviceKeys } from "@/content/services";
import { isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";
import { serviceDetailSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...serviceKeys.map((key) => ({
      locale: "sr",
      page: routes.services.paths.sr,
      slug: serviceDefinitions[key].slugs.sr,
    })),
    ...serviceKeys.map((key) => ({
      locale: "en",
      page: routes.services.paths.en,
      slug: serviceDefinitions[key].slugs.en,
    })),
  ];
}

async function resolveServicePage(params: Promise<{ locale: string; page: string; slug: string }>) {
  const { locale, page, slug } = await params;
  if (!isLocale(locale)) notFound();
  if (page !== routes.services.paths[locale]) notFound();
  const service = getServiceBySlug(slug, locale);
  if (!service) notFound();
  const copy = await getDictionary(locale);
  return { locale, service, copy };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; page: string; slug: string }>;
}) {
  const { locale, service } = await resolveServicePage(params);
  return createPageMetadata({
    title: service.metadata.title[locale],
    description: service.metadata.description[locale],
    route: "services",
    slug: service.slugs[locale],
    locale,
  });
}

export default async function ServiceSubpage({
  params,
}: {
  params: Promise<{ locale: string; page: string; slug: string }>;
}) {
  const { locale, service, copy } = await resolveServicePage(params);
  return (
    <>
      <JsonLd data={serviceDetailSchema(service, locale, copy)} />
      <ServiceDetailPage service={service} locale={locale} copy={copy} />
    </>
  );
}
