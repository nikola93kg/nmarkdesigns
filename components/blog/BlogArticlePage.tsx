import { Container } from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getBlogPosts, type LocalizedBlogPost } from "@/content/blog";
import { blogLabels } from "@/content/blog-editorial";
import type { Dictionary } from "@/content/i18n/types";
import { localeSettings, type Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import { BlogCard } from "./BlogCard";
import styles from "./Blog.module.css";

export function BlogArticlePage({ post, copy, locale }: { post: LocalizedBlogPost; copy: Dictionary["blog"]; locale: Locale }) {
  const labels = blogLabels[locale];
  return (
    <>
      <article>
        <header className={styles.intro}>
          <Container>
            <Link href={localizedPath("blog", locale)} className="inline-block py-2 text-small underline underline-offset-4">← {labels.back}</Link>
            <p className="mt-6 text-small font-semibold text-accent">{post.topic}</p>
            <h1 className="mt-4 text-balance text-display font-semibold">{post.title}</h1>
            <p className="mt-5 text-pretty text-inverse/85">{post.description}</p>
            <p className="mt-6 text-small">{labels.publisher} · <time dateTime={post.publishedOn}>{new Intl.DateTimeFormat(localeSettings[locale].dateTime, { dateStyle: "long", timeZone: "UTC" }).format(new Date(post.publishedOn))}</time> · {post.readTimeMinutes} {copy.readTime}</p>
          </Container>
        </header>
        <Container className={styles.reading}>
          <nav className={styles.toc} aria-label={labels.contents}>
            <p className="mb-3 font-semibold text-brand">{labels.contents}</p>
            {post.sections.map((section, index) => <a key={section.heading} href={`#section-${index + 1}`}>{section.heading}</a>)}
          </nav>
          <div className={styles.body}>
            <aside className={styles.answer} aria-label={labels.answer}><h2 className="text-subheading font-semibold">{labels.answer}</h2><p>{post.answer}</p></aside>
            <figure className={styles.figure}>
              <div className={styles.image}><Image src={post.image} alt={post.coverAlt} width={post.width} height={post.height} sizes="(max-width: 767px) 100vw, 65vw" /></div>
              <figcaption>{post.caption}</figcaption>
            </figure>
            {post.sections.map((section, index) => (
              <section key={section.heading} id={`section-${index + 1}`}>
                <h2 className="text-heading font-semibold text-ink">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph} className="text-muted">{paragraph}</p>)}
                {section.list && <ul>{section.list.map((item) => <li key={item}>{item}</li>)}</ul>}
                {section.media?.map((media) => (
                  <figure key={media.image} className={styles.figure}>
                    <div className={styles.image}><Image src={media.image} alt={media.alt} width={media.width} height={media.height} sizes="(max-width: 767px) 100vw, 65vw" loading="eager" /></div>
                    <figcaption>{media.caption}</figcaption>
                  </figure>
                ))}
              </section>
            ))}
            <section className={styles.sources}><h2 className="text-subheading font-semibold">{labels.sources}</h2><ul>{post.sources.map((source) => <li key={source.href}><a href={source.href}>{source.label}</a></li>)}</ul></section>
            <section><h2 className="text-heading font-semibold">{copy.cta.title}</h2><p className="text-muted">{copy.cta.description}</p><div className="mt-6"><Button href={localizedPath("contact", locale)}>{copy.cta.label}</Button></div></section>
          </div>
        </Container>
      </article>
      <section className={styles.related}><Container><h2 className="mb-8 text-heading font-semibold">{labels.related}</h2><div className={styles.grid}>{getBlogPosts(locale).filter((item) => item.id !== post.id).map((item) => <BlogCard key={item.id} post={item} locale={locale} copy={copy} />)}</div></Container></section>
    </>
  );
}
