import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import grid from "@/components/ui/GridBackground.module.css";
import type { Dictionary } from "@/content/i18n/types";
import { type ProjectWithImage, projectsWithImages } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { localizedPath, localizedProjectPath } from "@/lib/routes";
import styles from "./FeaturedProjects.module.css";

const primaryProjectSlug = "casovi-francuskog";

interface ProjectView {
  project: ProjectWithImage;
  title: string;
  description?: string;
  websiteHost?: string;
  imageAlt: string;
}

function orderedHomepageProjects() {
  const homepageProjects = projectsWithImages.filter((project) => project.featured !== false);
  const primary = homepageProjects.find((project) => project.slug === primaryProjectSlug);
  if (!primary) return homepageProjects;

  return [primary, ...homepageProjects.filter((project) => project.slug !== primaryProjectSlug)];
}

function cleanHostname(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

function projectView(project: ProjectWithImage, locale: Locale): ProjectView {
  return {
    project,
    title: project.title,
    description: project.caseStudy?.overview[locale] ?? project.shortDescription?.[locale],
    websiteHost: project.websiteUrl ? cleanHostname(project.websiteUrl) : undefined,
    imageAlt: project.featuredImage.alt[locale],
  };
}

function ProjectPreview({
  item,
  locale,
  linkLabel,
  index,
  featured = false,
}: {
  item: ProjectView;
  locale: Locale;
  linkLabel: string;
  index: number;
  featured?: boolean;
}) {
  const href = localizedProjectPath(item.project.slug, locale);
  const imageSizes = featured
    ? "(min-width: 1280px) 780px, (min-width: 1024px) 58vw, calc(100vw - 40px)"
    : "(min-width: 1280px) 650px, (min-width: 1024px) 52vw, (min-width: 768px) calc(100vw - 64px), calc(100vw - 40px)";
  const reversed = !featured && index % 2 === 0;

  return (
    <article className={`${styles.project} ${featured ? styles.featured : ""} ${reversed ? styles.reversed : ""}`}>
      <Link href={href} className={styles.imageLink}>
        <span className={styles.imageFrame}>
          <Image
            src={item.project.featuredImage.src}
            alt={item.imageAlt}
            width={item.project.featuredImage.width}
            height={item.project.featuredImage.height}
            sizes={imageSizes}
            quality={featured ? 88 : 84}
            className={styles.image}
          />
        </span>
      </Link>
      <div className={styles.projectCopy}>
        <p className={styles.projectMeta}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          {item.websiteHost && <span>{item.websiteHost}</span>}
        </p>
        <h3 className={styles.projectTitle} translate="no">
          {item.title}
        </h3>
        {item.description && <p className={styles.projectDescription}>{item.description}</p>}
        <Link href={href} className={styles.projectLink} aria-label={`${linkLabel}: ${item.title}`}>
          {linkLabel}
          <ArrowUpRight aria-hidden="true" size={18} />
        </Link>
      </div>
    </article>
  );
}

export function FeaturedProjects({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  const content = copy.home.projects;
  const [featuredProject, ...supportingProjects] = orderedHomepageProjects().map((project) => projectView(project, locale));

  return (
    <section id="portfolio" aria-labelledby="projects-title" className={`${grid.grid} ${grid.inverseGrid} ${styles.section} scroll-mt-8 bg-brand text-on-brand`}>
      <Container className={styles.inner}>
        <div className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <h2 id="projects-title" className={styles.title}>{content.title}</h2>
          </div>
          <div className={styles.introCopy}>
            <p>{content.description}</p>
            <Link href={localizedPath("portfolio", locale)} className={styles.allProjectsLink}>
              {copy.actions.allProjects}
              <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
        <div className={styles.showcase}>
          {featuredProject && (
            <ProjectPreview
              item={featuredProject}
              locale={locale}
              linkLabel={copy.actions.viewProject}
              index={0}
              featured
            />
          )}
          {supportingProjects.map((project, index) => (
            <ProjectPreview
              key={project.project.slug}
              item={project}
              locale={locale}
              linkLabel={copy.actions.viewProject}
              index={index + 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
