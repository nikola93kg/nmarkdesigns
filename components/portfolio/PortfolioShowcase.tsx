import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/content/i18n/types";
import type { Project, ProjectImage } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import styles from "./PortfolioShowcase.module.css";

function cleanHostname(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

function projectCopy(project: Project, locale: Locale, copy: Dictionary["portfolio"]) {
  return {
    category: project.category?.[locale] ?? copy.defaultCategory,
    description: project.shortDescription?.[locale]
      ?? project.caseStudy?.overview[locale]
      ?? copy.contentNeeded.description,
    websiteHost: project.websiteUrl ? cleanHostname(project.websiteUrl) : copy.contentNeeded.website,
  };
}

function projectLayout(index: number, image?: ProjectImage) {
  if (!image) return styles.archiveProject;
  if (index % 7 === 0) return styles.fullProject;
  if (index % 7 === 3) return styles.featureProject;
  if (index % 7 === 4) return styles.supportProject;
  return styles.splitProject;
}

function ProjectTile({
  project,
  locale,
  copy,
  preload,
  index,
  total,
}: {
  project: Project;
  locale: Locale;
  copy: Dictionary["portfolio"];
  preload: boolean;
  index: number;
  total: number;
}) {
  const image = project.featuredImage;
  const content = projectCopy(project, locale, copy);
  const number = String(index + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  if (!image) {
    return (
      <article className={styles.archiveTile}>
        <div className={styles.archiveMeta}>
          <span>{number} / {totalLabel}</span>
          <span>{content.category}</span>
        </div>
        <h2 id={`project-${project.slug}-title`} className={styles.archiveTitle} translate="no">
          {project.title}
        </h2>
        <p className={styles.archiveDescription}>{content.description}</p>
        <div className={styles.archivePlaceholder}>
          <p>{copy.contentNeeded.screenshot}</p>
          <p>{content.websiteHost}</p>
        </div>
      </article>
    );
  }

  return (
    <article className={styles.projectTile}>
      {project.websiteUrl ? (
        <a
          href={project.websiteUrl}
          aria-label={`${copy.visitWebsite}: ${project.title}`}
          className={styles.imageLink}
        >
          <Image
            src={image.src}
            alt={image.alt[locale]}
            width={image.width}
            height={image.height}
            sizes="(min-width: 1600px) 1500px, (min-width: 1024px) calc(100vw - 96px), calc(100vw - 32px)"
            quality={92}
            preload={preload}
            className={styles.image}
          />
        </a>
      ) : (
        <div className={styles.imageLink}>
          <Image
            src={image.src}
            alt={image.alt[locale]}
            width={image.width}
            height={image.height}
            sizes="(min-width: 1600px) 1500px, (min-width: 1024px) calc(100vw - 96px), calc(100vw - 32px)"
            quality={92}
            preload={preload}
            className={styles.image}
          />
        </div>
      )}

      <div className={styles.projectOverlay}>
        <div className={styles.projectMeta}>
          <span>{number} / {totalLabel}</span>
          <span>{content.category}</span>
        </div>
        <div className={styles.projectCopy}>
          <h2 id={`project-${project.slug}-title`} className={styles.projectTitle} translate="no">
            {project.title}
          </h2>
          <p className={styles.projectDescription}>{content.description}</p>
        </div>
        <div className={styles.projectActions}>
          <p className={styles.projectHost}>{content.websiteHost}</p>
          {project.websiteUrl ? (
            <Button
              href={project.websiteUrl}
              external
              variant="secondary"
              aria-label={`${copy.visitWebsite}: ${project.title}`}
              className={styles.projectButton}
            >
              {copy.visitWebsite}
              <ArrowUpRight aria-hidden="true" size={18} className="shrink-0" />
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function PortfolioShowcase({
  projects,
  locale,
  copy,
}: {
  projects: readonly Project[];
  locale: Locale;
  copy: Dictionary;
}) {
  const total = projects.length;

  return (
    <div className={styles.showcase}>
      <section aria-labelledby="portfolio-title" className={styles.introSection}>
        <Container className={styles.introInner}>
          <div className={styles.introCopy}>
            <p className="text-small font-medium uppercase text-on-brand-muted">
              {copy.portfolio.intro.eyebrow}
            </p>
            <h1 id="portfolio-title" className="mt-4 max-w-4xl text-display font-bold">
              {copy.portfolio.intro.title}
            </h1>
          </div>
          <div className={styles.introAside}>
            <p className="text-pretty text-on-brand-muted">
              {copy.portfolio.intro.description}
            </p>
            <p className={styles.projectCount}>
              <span>
                {String(total).padStart(2, "0")}
              </span>
              <span>
                {copy.portfolio.allProjects}
              </span>
            </p>
          </div>
        </Container>
      </section>

      <div className={styles.projectGrid}>
        {projects.map((project, index) => (
          <section
            key={project.slug}
            id={`project-${project.slug}`}
            aria-labelledby={`project-${project.slug}-title`}
            className={`${styles.projectSection} ${projectLayout(index, project.featuredImage)}`}
          >
            <ProjectTile
              project={project}
              locale={locale}
              copy={copy.portfolio}
              preload={index === 0}
              index={index}
              total={total}
            />
          </section>
        ))}
      </div>
    </div>
  );
}
