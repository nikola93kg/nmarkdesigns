import { notFound } from "next/navigation";
import { PortfolioContact } from "@/components/portfolio/PortfolioContact";
import { PortfolioShowcase } from "@/components/portfolio/PortfolioShowcase";
import background from "@/components/ui/GridBackground.module.css";
import { getDictionary } from "@/content/i18n";
import { portfolioProjects } from "@/content/projects";
import { isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/portfolio">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = await getDictionary(locale);
  const image = portfolioProjects.find((project) => project.featuredImage)?.featuredImage;

  return createPageMetadata({
    ...copy.portfolio.metadata,
    locale,
    route: "portfolio",
    image: image ? { ...image, alt: image.alt[locale] } : undefined,
  });
}

export default async function PortfolioPage({ params }: PageProps<"/[locale]/portfolio">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = await getDictionary(locale);

  return (
    <>
      <div className={`${background.grid} ${background.inverseGrid} bg-brand text-on-brand`}>
        <PortfolioShowcase projects={portfolioProjects} locale={locale} copy={copy} />
      </div>
      <PortfolioContact locale={locale} copy={copy} />
    </>
  );
}
