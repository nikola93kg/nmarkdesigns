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
  const narratives = (["challenge", "solution", "results"] as const)
    .map((key) => ({ key, title: copy[key], paragraphs: project.caseStudy[key]?.[locale] }))
    .filter((section) => section.paragraphs?.length);
  const images = project.caseStudy.images;

  if (!facts.length && !narratives.length && !images?.length) return null;

  return (
    <div className="bg-surface py-12 md:py-16">
      <Container className="text-center lg:text-left">
        {facts.length > 0 && (
          <dl className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {facts.map((fact) => (
              <div key={fact.label} className="min-w-0 border-t border-border pt-5">
                <dt className="text-small text-muted">{fact.label}</dt>
                <dd className="mt-3 text-lg font-medium text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {narratives.length > 0 && (
          <div className="mt-12 space-y-10 md:mt-16 md:space-y-16">
            {narratives.map((section) => (
              <section key={section.key} aria-labelledby={`project-${section.key}`} className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
                <h2 id={`project-${section.key}`} className="text-heading font-bold">{section.title}</h2>
                <div className="mx-auto max-w-2xl space-y-4 text-pretty text-muted lg:mx-0">
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>
        )}
        {Boolean(images?.length) && (
          <section aria-labelledby="project-gallery" className="mt-12 md:mt-16">
            <h2 id="project-gallery" className="mb-8 text-heading font-bold">{copy.gallery}</h2>
            <div className="space-y-8">
              {images?.map((image) => (
                <Image key={image.src} src={image.src} alt={image.alt[locale]} width={image.width} height={image.height}
                  sizes="(min-width: 1280px) 1200px, (min-width: 768px) 92vw, calc(100vw - 40px)"
                  quality={85} className="h-auto w-full rounded-card border border-border" />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
