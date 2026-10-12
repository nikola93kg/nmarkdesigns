import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/content/i18n/types";
import type { CaseStudyProject } from "@/content/projects";
import type { Locale } from "@/lib/i18n";

export function CaseStudyDetails({ project, locale, copy }: { project: CaseStudyProject; locale: Locale; copy: Dictionary["caseStudy"] }) {
  const facts = [
    { label: copy.client, value: project.client },
    { label: copy.category, value: project.category?.[locale] },
    { label: copy.location, value: project.location },
    { label: copy.services, value: project.services?.[locale].join(", ") },
    { label: copy.technologies, value: project.technologies?.join(", ") },
  ].filter((fact) => fact.value);

  const narrativeKeys = ["challenge", "approach", "solution", "results"] as const;
  const narratives = narrativeKeys
    .map((key) => ({ key, title: copy[key], paragraphs: project.caseStudy[key]?.[locale] }))
    .filter((section) => section.paragraphs?.length);

  const highlights = project.caseStudy.technicalHighlights;
  const images = project.caseStudy.images;

  if (!facts.length && !narratives.length && !highlights?.length && !images?.length) return null;

  const highlightCount = highlights?.length ?? 0;
  const highlightsGridClass =
    highlightCount === 1
      ? "grid-cols-1 max-w-xl"
      : highlightCount === 2 || highlightCount === 4
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="bg-surface py-12 md:py-16">
      <Container className="text-center lg:text-left">
        {facts.length > 0 && (
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {facts.map((fact) => (
              <div key={fact.label} className="min-w-0 border-t border-border pt-5">
                <dt className="text-small text-muted">{fact.label}</dt>
                <dd className="mt-3 text-lg font-medium text-ink wrap-break-word">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {narratives.length > 0 && (
          <div className="mt-12 divide-y divide-border border-y border-border md:mt-16">
            {narratives.map((section) => (
              <section key={section.key} aria-labelledby={`project-${section.key}`}>
                <details
                  className="group py-6 text-left"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus [&::-webkit-details-marker]:hidden">
                    <h2
                      id={`project-${section.key}`}
                      className="text-heading font-bold text-ink transition-colors group-hover:text-brand"
                    >
                      {section.title}
                    </h2>
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control border border-border bg-surface-muted text-muted transition-transform duration-200 group-open:rotate-180 group-hover:border-brand group-hover:text-brand"
                    >
                      <ChevronDown size={20} />
                    </span>
                  </summary>
                  <div className="mt-6 max-w-2xl space-y-4 text-pretty text-muted">
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </details>
              </section>
            ))}
          </div>
        )}

        {project.caseStudy.aiSalesAssistant && (
          <section aria-labelledby="project-ai-assistant" className="mt-14 pt-12 md:mt-18 md:pt-16">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
              <div>
                <span className="inline-block rounded bg-brand-light px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
                  AI Solution
                </span>
                <h2 id="project-ai-assistant" className="mt-3 text-heading font-bold text-ink">
                  {project.caseStudy.aiSalesAssistant.title[locale]}
                </h2>
              </div>
              <div className="mx-auto max-w-2xl space-y-4 text-pretty text-muted lg:mx-0">
                <p className="leading-relaxed font-medium text-ink">
                  {project.caseStudy.aiSalesAssistant.overview[locale]}
                </p>
                <ul className="mt-4 space-y-2.5 list-disc pl-5">
                  {project.caseStudy.aiSalesAssistant.capabilities[locale].map((item) => (
                    <li key={item} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {Boolean(highlights?.length) && (
          <section aria-labelledby="project-highlights" className="mt-14 pt-12 md:mt-18 md:pt-16">
            <div className="max-w-2xl">
              <h2 id="project-highlights" className="text-heading font-bold text-ink">{copy.technicalHighlights}</h2>
            </div>
            <div className={`mt-8 grid gap-6 ${highlightsGridClass}`}>
              {highlights?.map((highlight) => (
                <div key={highlight.title[locale]} className="rounded-card border border-border bg-surface-muted p-6">
                  <h3 className="text-subheading font-semibold text-ink">{highlight.title[locale]}</h3>
                  <p className="mt-3 text-small leading-relaxed text-muted">{highlight.description[locale]}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {Boolean(images?.length) && (
          <section aria-labelledby="project-gallery" className="mt-14 border-t border-border pt-12 md:mt-18 md:pt-16">
            <h2 id="project-gallery" className="mb-8 text-heading font-bold text-ink">{copy.gallery}</h2>
            <div className="space-y-8">
              {images?.map((img) => (
                <div key={img.src} className="overflow-hidden rounded-card border border-border bg-surface-muted p-2 md:p-4">
                  <Image src={img.src} alt={img.alt[locale]} width={img.width} height={img.height}
                    sizes="(min-width: 1280px) 1200px, (min-width: 768px) 92vw, calc(100vw - 40px)"
                    quality={85} className="h-auto w-full object-contain" />
                </div>
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
