import { notFound } from "next/navigation";
import { AboutApproach } from "@/components/about/AboutApproach";
import { AboutIntro } from "@/components/about/AboutIntro";
import { AboutProfile } from "@/components/about/AboutProfile";
import { founderPortrait } from "@/content/about";
import { getDictionary } from "@/content/i18n";
import { isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { locale: string } }) {
  return isLocale(params.locale) ? [{ page: routes.about.paths[params.locale] }] : [];
}

async function resolveAbout(params: PageProps<"/[locale]/[page]">["params"]) {
  const { locale, page } = await params;
  if (!isLocale(locale) || page !== routes.about.paths[locale]) notFound();
  return { locale, copy: await getDictionary(locale) };
}

export async function generateMetadata({ params }: PageProps<"/[locale]/[page]">) {
  const { locale, copy } = await resolveAbout(params);
  return createPageMetadata({
    ...copy.about.metadata,
    locale,
    route: "about",
    image: { ...founderPortrait, alt: copy.about.profile.imageAlt },
  });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/[page]">) {
  const { locale, copy } = await resolveAbout(params);
  return (
    <>
      <AboutIntro copy={copy.about.intro} />
      <AboutProfile copy={copy.about.profile} />
      <AboutApproach locale={locale} copy={copy} />
    </>
  );
}
