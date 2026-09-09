import { ProjectCard } from "@/components/portfolio/ProjectCard";
import type { Dictionary } from "@/content/i18n/types";
import type { Project } from "@/content/projects";
import type { Locale } from "@/lib/i18n";

interface ProjectGridProps {
  projects: readonly Project[];
  locale: Locale;
  copy: Dictionary;
}

export function ProjectGrid({ projects, locale, copy }: ProjectGridProps) {
  return (
    <div className="grid items-end gap-x-8 gap-y-10 md:grid-cols-2 md:gap-y-16 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-20">
      {projects.map((project, index) => {
        // Alternate 7/5 and 5/7 pairs without changing source or keyboard order.
        const large = index % 4 === 0 || index % 4 === 3;

        return (
          <div key={project.slug} className={`min-w-0 ${large ? "lg:col-span-7" : "lg:col-span-5"}`}>
            <ProjectCard
              project={project}
              locale={locale}
              linkLabel={copy.actions.viewProject}
              headingLevel="h2"
              details={{ visitWebsite: copy.portfolio.visitWebsite }}
              preload={index === 0}
              imageSizes={large
                ? "(min-width: 1280px) 640px, (min-width: 1024px) 52vw, (min-width: 768px) 44vw, calc(100vw - 64px)"
                : "(min-width: 1280px) 432px, (min-width: 1024px) 35vw, (min-width: 768px) 44vw, calc(100vw - 64px)"}
            />
          </div>
        );
      })}
    </div>
  );
}
