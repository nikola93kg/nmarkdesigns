import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/content/i18n/types";
import type { Project, ProjectImage } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { localizedProjectPath } from "@/lib/routes";
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
  const hasCaseStudy = Boolean(project.caseStudy);
  const caseStudyHref = localizedProjectPath(project.slug, locale);

  const isLive = project.status !== "inactive" && Boolean(project.websiteUrl);

  if (!image) {
    return (
      <article className={styles.archiveTile}>
        <div className={styles.archiveMeta}>
          <span>{number} / {totalLabel}</span>
          <span>{content.category}</span>
          {hasCaseStudy && (
            <span className={styles.caseStudyBadge}>{copy.caseStudyBadge}</span>
          )}
        </div>
        <h2 id={`project-${project.slug}-title`} className={styles.archiveTitle} translate="no">
          {hasCaseStudy ? (
            <Link href={caseStudyHref} className={styles.titleLink}>
              {project.title}
            </Link>
          ) : (
            project.title
          )}
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
      {hasCaseStudy ? (
        <Link
          href={caseStudyHref}
          aria-label={`${copy.viewCaseStudy}: ${project.title}`}
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
        </Link>
      ) : isLive ? (
        <a
          href={project.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${copy.visitLiveWebsite}: ${project.title} (${copy.opensNewTab})`}
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
          {hasCaseStudy && (
            <span className={styles.caseStudyBadge}>{copy.caseStudyBadge}</span>
          )}
        </div>
        <div className={styles.projectCopy}>
          <h2 id={`project-${project.slug}-title`} className={styles.projectTitle} translate="no">
            {hasCaseStudy ? (
              <Link href={caseStudyHref} className={styles.titleLink}>
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </h2>
          <p className={styles.projectDescription}>{content.description}</p>
          {project.technologies?.length ? (
            <div className={styles.techPills} aria-label={`${project.title} technologies`}>
              {project.technologies.slice(0, 4).map((tech) => (
                <span key={tech} className={styles.techPill}>{tech}</span>
              ))}
            </div>
          ) : null}
        </div>
        <div className={styles.projectActions}>
          <div className={styles.projectHostInfo}>
            <p className={styles.projectHost}>{content.websiteHost}</p>
            {project.status === "inactive" && (
              <span className="text-xs text-muted font-medium">({copy.historicalProject})</span>
            )}
          </div>
          <div className={styles.projectButtons}>
            {hasCaseStudy ? (
              <>
                <Button
                  href={caseStudyHref}
                  variant="primary"
                  aria-label={`${copy.viewCaseStudy}: ${project.title}`}
                  className={styles.projectButton}
                >
                  {copy.viewCaseStudy}
                  <ArrowRight aria-hidden="true" size={18} className="shrink-0" />
                </Button>
                {isLive ? (
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${copy.visitLiveWebsite}: ${project.title} (${copy.opensNewTab})`}
                    className={styles.secondaryLink}
                  >
                    <span>{copy.visitLiveWebsite}</span>
                    <ArrowUpRight aria-hidden="true" size={16} className="shrink-0" />
                  </a>
                ) : null}
              </>
            ) : project.websiteUrl && isLive ? (
              <Button
                href={project.websiteUrl}
                external
                variant="secondary"
                aria-label={`${copy.visitLiveWebsite}: ${project.title} (${copy.opensNewTab})`}
                className={styles.projectButton}
              >
                {copy.visitLiveWebsite}
                <ArrowUpRight aria-hidden="true" size={18} className="shrink-0" />
              </Button>
            ) : null}
          </div>
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
