import { notFound } from "next/navigation";
import { CaseStudyHero } from "@/components/portfolio/CaseStudyHero";
import { CaseStudyDetails } from "@/components/portfolio/CaseStudyDetails";
import { CaseStudyNavigation } from "@/components/portfolio/CaseStudyNavigation";
import { getDictionary } from "@/content/i18n";
import { caseStudyProjects, getCaseStudyProject } from "@/content/projects";
import { isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudyProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/portfolio/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = getCaseStudyProject(slug);
  if (!project) notFound();

  return createPageMetadata({
    title: project.title,
    description: project.caseStudy.overview[locale],
    route: "portfolio", slug, locale,
    image: { ...project.featuredImage, alt: project.featuredImage.alt[locale] },
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/[locale]/portfolio/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = getCaseStudyProject(slug);
  if (!project) notFound();
  const copy = await getDictionary(locale);
  const index = caseStudyProjects.indexOf(project);
  const nextProject = caseStudyProjects.length > 1
    ? caseStudyProjects[(index + 1) % caseStudyProjects.length]
    : undefined;

  return (
    <>
      <CaseStudyHero project={project} locale={locale} copy={copy} />
      <CaseStudyDetails project={project} locale={locale} copy={copy.caseStudy} />
      <CaseStudyNavigation nextProject={nextProject} locale={locale} copy={copy} />
    </>
  );
}
