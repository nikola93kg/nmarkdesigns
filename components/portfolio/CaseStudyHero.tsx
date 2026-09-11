import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import background from "@/components/ui/GridBackground.module.css";
import type { Dictionary } from "@/content/i18n/types";
import type { CaseStudyProject } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";

export function CaseStudyHero({ project, locale, copy }: { project: CaseStudyProject; locale: Locale; copy: Dictionary }) {
  const image = project.featuredImage;

  return (
    <section aria-labelledby="case-study-title" className={`${background.grid} ${background.inverseGrid} bg-brand pt-6 pb-12 text-on-brand md:pt-8 md:pb-16`}>
      <Container>
        <nav aria-label={copy.navigation.portfolio}>
          <Link href={localizedPath("portfolio", locale)} className="inline-flex min-h-11 items-center gap-2 text-small text-on-brand-muted underline underline-offset-4 hover:text-on-brand focus-visible:outline-accent">
            <ArrowLeft aria-hidden="true" size={18} />{copy.actions.allProjects}
          </Link>
        </nav>
        <div className="grid gap-6 pt-8 pb-10 md:pt-10 md:pb-12 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-4 text-small text-on-brand-muted">{copy.caseStudy.eyebrow}</p>
            <h1 id="case-study-title" className="text-display font-bold" translate="no">{project.title}</h1>
          </div>
          <div>
            <p className="max-w-xl text-pretty text-on-brand-muted">{project.caseStudy.overview[locale]}</p>
            {project.websiteUrl && (
              <Button href={project.websiteUrl} external variant="secondary" className="mt-6 focus-visible:outline-accent">
                {copy.portfolio.visitWebsite}<ArrowUpRight aria-hidden="true" size={18} />
              </Button>
            )}
          </div>
        </div>
        <div className="flex aspect-[3/2] items-center rounded-card border border-border-inverse bg-surface-muted p-3 md:aspect-[2/1] md:p-5">
          <Image src={image.src} alt={image.alt[locale]} width={image.width} height={image.height}
            sizes="(min-width: 1280px) 1160px, (min-width: 768px) calc(100vw - 104px), calc(100vw - 64px)"
            quality={85} preload className="h-full w-full object-contain" />
        </div>
      </Container>
    </section>
  );
}
