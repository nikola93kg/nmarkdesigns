import { notFound } from "next/navigation";
import { CaseStudyHero } from "@/components/portfolio/CaseStudyHero";
import { CaseStudyTracker } from "@/components/portfolio/CaseStudyTracker";
import { CaseStudyDetails } from "@/components/portfolio/CaseStudyDetails";
import { CaseStudyNavigation } from "@/components/portfolio/CaseStudyNavigation";
import { RelatedProjects } from "@/components/portfolio/RelatedProjects";
import { PortfolioContact } from "@/components/portfolio/PortfolioContact";
import { getDictionary } from "@/content/i18n";
import { caseStudyProjects, getCaseStudyProject, getProjectsBySlugs } from "@/content/projects";
import { isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { projectBreadcrumbs } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudyProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/portfolio/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = getCaseStudyProject(slug);
  if (!project) notFound();

  const copy = await getDictionary(locale);
  return createPageMetadata({
    title: `${project.title} - ${copy.caseStudy.eyebrow}`,
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

  const relatedProjects = project.caseStudy.relatedSlugs?.length
    ? getProjectsBySlugs(project.caseStudy.relatedSlugs)
    : [];

  return (
    <article aria-labelledby="case-study-title">
      <CaseStudyTracker projectSlug={project.slug} locale={locale} category={project.category?.[locale]} />
      <JsonLd data={projectBreadcrumbs(project, locale, copy)} />
      <CaseStudyHero project={project} locale={locale} copy={copy} />
      <CaseStudyDetails project={project} locale={locale} copy={copy.caseStudy} />
      {relatedProjects.length > 0 && (
        <RelatedProjects projects={relatedProjects} locale={locale} copy={copy} />
      )}
      <CaseStudyNavigation nextProject={nextProject} locale={locale} copy={copy} />
      <PortfolioContact
        locale={locale}
        copy={copy}
        title={copy.caseStudy.contactTitle}
        description={copy.caseStudy.contactDescription}
        buttonLabel={copy.caseStudy.contactAction}
      />
    </article>
  );
}
