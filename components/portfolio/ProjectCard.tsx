import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { localizedProjectPath } from "@/lib/routes";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  linkLabel: string;
  wide?: boolean;
  headingLevel?: "h2" | "h3";
  imageSizes?: string;
  preload?: boolean;
  href?: string;
  details?: { visitWebsite: string };
}

export function ProjectCard({
  project, locale, linkLabel, wide = false, headingLevel: Heading = "h3",
  imageSizes, preload = false,
  href = project.caseStudy ? localizedProjectPath(project.slug, locale) : project.sourceUrl,
  details,
}: ProjectCardProps) {
  const { featuredImage } = project;
  const ProjectLink = href.startsWith("/") ? Link : "a";

  return (
    <article className={wide ? "min-w-0 md:col-span-2" : "min-w-0"}>
      <ProjectLink href={href} aria-label={`${linkLabel}: ${project.title}`} className="group block rounded-card focus-visible:outline-accent">
        <div className={`aspect-[3/2] ${wide ? "md:aspect-[2/1]" : ""} flex items-center overflow-hidden rounded-card border border-border-inverse bg-surface-muted p-3 md:p-5`}>
          <Image
            src={featuredImage.src}
            alt={featuredImage.alt[locale]}
            width={featuredImage.width}
            height={featuredImage.height}
            sizes={imageSizes ?? (wide
              ? "(min-width: 1280px) 1160px, (min-width: 768px) calc(100vw - 104px), calc(100vw - 64px)"
              : "(min-width: 1280px) 544px, (min-width: 768px) 44vw, calc(100vw - 64px)")}
            quality={85}
            preload={preload}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex min-h-16 items-center justify-between gap-4 border-b border-border-inverse py-4">
          <Heading className="text-xl font-medium text-on-brand group-hover:underline group-hover:underline-offset-4" translate="no">{project.title}</Heading>
          <ArrowUpRight aria-hidden="true" size={22} className="shrink-0 text-on-brand-muted transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
        </div>
      </ProjectLink>
      {details && (project.category || project.location || project.shortDescription || project.websiteUrl) && (
        <div className="space-y-3 pt-4 text-small text-on-brand-muted">
          {(project.category || project.location) && (
            <p className="flex flex-wrap gap-x-4 gap-y-1">
              {project.category && <span>{project.category[locale]}</span>}
              {project.location && <span>{project.location}</span>}
            </p>
          )}
          {project.shortDescription && <p className="max-w-lg text-pretty">{project.shortDescription[locale]}</p>}
          {project.websiteUrl && (
            <a href={project.websiteUrl} aria-label={`${details.visitWebsite}: ${project.title}`} className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4 hover:text-on-brand focus-visible:outline-accent">
              {details.visitWebsite}<ArrowUpRight aria-hidden="true" size={18} />
            </a>
          )}
        </div>
      )}
    </article>
  );
}
