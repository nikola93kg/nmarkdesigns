import Image from "next/image";
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
          <div className="mt-12 space-y-12 md:mt-16 md:space-y-16">
            {narratives.map((section) => (
              <section key={section.key} aria-labelledby={`project-${section.key}`} className="grid gap-6 border-t border-border pt-10 first:border-t-0 first:pt-0 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
                <div>
                  <h2 id={`project-${section.key}`} className="text-heading font-bold text-ink">{section.title}</h2>
                </div>
                <div className="mx-auto max-w-2xl space-y-4 text-pretty text-muted lg:mx-0">
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {project.caseStudy.aiSalesAssistant && (
          <section aria-labelledby="project-ai-assistant" className="mt-14 border-t border-border pt-12 md:mt-18 md:pt-16">
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
          <section aria-labelledby="project-highlights" className="mt-14 border-t border-border pt-12 md:mt-18 md:pt-16">
            <div className="max-w-2xl">
              <h2 id="project-highlights" className="text-heading font-bold text-ink">{copy.technicalHighlights}</h2>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
