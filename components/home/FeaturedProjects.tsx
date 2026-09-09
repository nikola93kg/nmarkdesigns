import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/content/i18n/types";
import { projects } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import styles from "@/components/ui/GridBackground.module.css";

const wideProjects = new Set(["os-dule-karaklajic", "frankultura"]);

export function FeaturedProjects({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  const content = copy.home.projects;

  return (
    <section id="portfolio" aria-labelledby="projects-title" className={`${styles.grid} ${styles.inverseGrid} scroll-mt-8 bg-brand py-section text-on-brand`}>
      <Container>
        <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-2 md:items-end md:gap-12">
          <div>
            <p className="mb-4 text-small font-medium text-on-brand-muted">{content.eyebrow}</p>
            <h2 id="projects-title" className="max-w-xl text-heading font-bold">{content.title}</h2>
          </div>
          <div className="max-w-lg">
            <p className="text-on-brand-muted">{content.description}</p>
            <Link href={localizedPath("portfolio", locale)} className="mt-4 inline-flex min-h-11 items-center gap-2 font-medium underline underline-offset-4 hover:text-accent focus-visible:outline-accent">
              {copy.actions.allProjects}<ArrowUpRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
        <div className="grid gap-x-8 gap-y-8 md:grid-cols-2 md:gap-y-12">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} linkLabel={copy.actions.viewProject} wide={wideProjects.has(project.slug)} />
          ))}
        </div>
      </Container>
    </section>
  );
}
