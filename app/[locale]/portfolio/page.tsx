import { notFound } from "next/navigation";
import { PortfolioContact } from "@/components/portfolio/PortfolioContact";
import { PortfolioIntro } from "@/components/portfolio/PortfolioIntro";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { Container } from "@/components/ui/Container";
import background from "@/components/ui/GridBackground.module.css";
import { getDictionary } from "@/content/i18n";
import { projects } from "@/content/projects";
import { isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/portfolio">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = await getDictionary(locale);
  const image = projects[0]?.featuredImage;

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
      <section aria-labelledby="portfolio-title" className={`${background.grid} ${background.inverseGrid} bg-brand py-12 text-on-brand md:py-16 lg:py-20`}>
        <Container>
          <PortfolioIntro copy={copy.portfolio.intro} />
          <ProjectGrid projects={projects} locale={locale} copy={copy} />
        </Container>
      </section>
      <PortfolioContact locale={locale} copy={copy} />
    </>
  );
}
