import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/content/i18n/types";
import type { Project } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { localizedProjectPath } from "@/lib/routes";

export function RelatedProjects({
  projects,
  locale,
  copy,
}: {
  projects: readonly Project[];
  locale: Locale;
  copy: Dictionary;
}) {
  if (!projects.length) return null;

  return (
    <section aria-labelledby="related-projects-title" className="border-t border-border bg-surface-muted py-12 md:py-16">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <h2 id="related-projects-title" className="text-heading font-bold text-ink">
            {copy.caseStudy.relatedProjects}
          </h2>
          <Link
            href={`/${locale}/portfolio/`}
            className="inline-flex min-h-11 items-center py-2 text-small font-medium text-brand underline underline-offset-4 hover:text-focus focus-visible:outline-accent"
          >
            {copy.actions.allProjects}
          </Link>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {projects.map((project) => {
            const hasCaseStudy = Boolean(project.caseStudy);
            const isLive = project.status !== "inactive" && Boolean(project.websiteUrl);
            const isExternal = !hasCaseStudy && isLive;
            const href = hasCaseStudy
              ? localizedProjectPath(project.slug, locale)
              : isLive
                ? project.websiteUrl!
                : `/${locale}/portfolio/#project-${project.slug}`;

            return (
              <article
                key={project.slug}
                className="group flex flex-col overflow-hidden rounded-card border border-border bg-surface transition-shadow hover:shadow-card"
              >
                {project.featuredImage && (
                  isExternal ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative aspect-[16/10] overflow-hidden bg-surface-muted"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <Image
                        src={project.featuredImage.src}
                        alt={project.featuredImage.alt[locale]}
                        width={project.featuredImage.width}
                        height={project.featuredImage.height}
                        sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, calc(100vw - 32px)"
                        quality={85}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-102"
                      />
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="relative aspect-[16/10] overflow-hidden bg-surface-muted"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <Image
                        src={project.featuredImage.src}
                        alt={project.featuredImage.alt[locale]}
                        width={project.featuredImage.width}
                        height={project.featuredImage.height}
                        sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, calc(100vw - 32px)"
                        quality={85}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-102"
                      />
                    </Link>
                  )
                )}

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3 text-small text-muted">
                    <span>{project.category?.[locale] ?? copy.portfolio.defaultCategory}</span>
                    {hasCaseStudy ? (
                      <span className="rounded bg-brand-light px-2 py-0.5 text-xs font-medium text-brand">
                        {copy.portfolio.caseStudyBadge}
                      </span>
                    ) : project.status === "inactive" ? (
                      <span className="rounded border border-border bg-surface-muted px-2 py-0.5 text-xs font-medium text-muted">
                        {copy.portfolio.historicalProject}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-3 text-subheading font-bold text-ink" translate="no">
                    {isExternal ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} (${copy.portfolio.visitLiveWebsite} - ${copy.portfolio.opensNewTab})`}
                        className="inline-flex min-h-11 items-center gap-1.5 py-1.5 hover:underline focus-visible:outline-accent"
                      >
                        <span>{project.title}</span>
                        <ArrowUpRight size={16} aria-hidden="true" className="shrink-0 text-muted" />
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="inline-flex min-h-11 items-center gap-1.5 py-1.5 hover:underline focus-visible:outline-accent"
                      >
                        <span>{project.title}</span>
                        <ArrowRight size={16} aria-hidden="true" className="shrink-0 text-muted" />
                      </Link>
                    )}
                  </h3>

                  <p className="mt-2 flex-1 text-small leading-relaxed text-muted line-clamp-2">
                    {project.shortDescription?.[locale]
                      ?? project.caseStudy?.overview[locale]
                      ?? copy.portfolio.contentNeeded.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
