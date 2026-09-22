import { Container } from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getBlogPosts, type BlogBlock, type LocalizedBlogPost } from "@/content/blog";
import { blogLabels } from "@/content/blog-editorial";
import type { Dictionary } from "@/content/i18n/types";
import { localeSettings, type Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import { BlogCard } from "./BlogCard";
import { BlogShare } from "./BlogShare";
import styles from "./Blog.module.css";

export function BlogArticlePage({ post, copy, locale, url }: { post: LocalizedBlogPost; copy: Dictionary["blog"]; locale: Locale; url: string }) {
  const labels = blogLabels[locale];
  const finalCta = post.cta ?? copy.cta;

  return (
    <>
      <article>
        <header className={`${styles.intro} ${styles.articleIntro}`}>
          <div className={styles.introMedia} data-hero-artwork aria-hidden="true">
            <Image
              src={post.heroBackground.image}
              alt=""
              width={post.heroBackground.width}
              height={post.heroBackground.height}
              priority
              sizes="100vw"
              style={{ objectPosition: post.heroBackground.position ?? "center" }}
            />
          </div>
          <Container className={styles.introContent}>
            <Link href={localizedPath("blog", locale)} className="inline-block py-2 text-small underline underline-offset-4">← {labels.back}</Link>
            <p className="mt-6 text-small font-semibold text-accent">{post.topic}</p>
            <h1 className="mt-4 text-balance text-display font-semibold">{post.title}</h1>
            <p className="mt-5 text-pretty text-inverse/85">{post.description}</p>
            <p className="mt-6 text-small">{labels.publisher} · <time dateTime={post.publishedOn}>{new Intl.DateTimeFormat(localeSettings[locale].dateTime, { dateStyle: "long", timeZone: "UTC" }).format(new Date(post.publishedOn))}</time> · {post.readTimeMinutes} {copy.readTime}</p>
          </Container>
        </header>
        <Container className={styles.reading}>
          <aside className={styles.articleTools}>
            <nav className={styles.toc} aria-label={labels.contents}>
              <p className="mb-3 font-semibold text-brand">{labels.contents}</p>
              {post.sections.map((section, index) => <a key={section.heading} href={`#section-${index + 1}`}>{section.heading}</a>)}
            </nav>
            <BlogShare url={url} title={post.title} labels={labels.share} />
          </aside>
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
                {section.blocks?.map((block, blockIndex) => <BlogBlockRenderer key={`${section.heading}-${blockIndex}`} block={block} />)}
                {section.media?.map((media) => (
                  <figure key={media.image} className={styles.figure}>
                    <div className={styles.image}><Image src={media.image} alt={media.alt} width={media.width} height={media.height} sizes="(max-width: 767px) 100vw, 65vw" loading="eager" /></div>
                    <figcaption>{media.caption}</figcaption>
                  </figure>
                ))}
              </section>
            ))}
            <section className={styles.sources}><h2 className="text-subheading font-semibold">{labels.sources}</h2><ul>{post.sources.map((source) => <li key={source.href}><a href={source.href}>{source.label}</a></li>)}</ul></section>
            <section><h2 className="text-heading font-semibold">{finalCta.title}</h2><p className="text-muted">{finalCta.description}</p><div className="mt-6"><Button href={localizedPath("contact", locale)}>{finalCta.label}</Button></div></section>
          </div>
        </Container>
      </article>
      <section className={styles.related}><Container><h2 className="mb-8 text-heading font-semibold">{labels.related}</h2><div className={styles.grid}>{getBlogPosts(locale).filter((item) => item.id !== post.id).map((item) => <BlogCard key={item.id} post={item} locale={locale} copy={copy} />)}</div></Container></section>
    </>
  );
}

function BlogBlockRenderer({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "table":
      return (
        <figure className={styles.responsiveTable}>
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
          <table>
            <thead>
              <tr>{block.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={`${row[0]}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => cellIndex === 0
                    ? <th key={cell} scope="row" data-label={block.columns[cellIndex]}>{cell}</th>
                    : <td key={cell} data-label={block.columns[cellIndex]}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      );
    case "subsections":
      return (
        <div className={styles.subsections}>
          {block.items.map((item) => (
            <article key={item.heading} className={styles.subsection}>
              <h3>{item.heading}</h3>
              {item.paragraphs.map((paragraph) => <p key={paragraph} className="text-muted">{paragraph}</p>)}
              {item.list ? <ul>{item.list.map((entry) => <li key={entry}>{entry}</li>)}</ul> : null}
            </article>
          ))}
        </div>
      );
    case "cards":
      return (
        <div className={styles.articleCards}>
          {block.items.map((item) => (
            <article key={item.title} className={styles.articleCard}>
              {item.eyebrow ? <p className={styles.cardEyebrow}>{item.eyebrow}</p> : null}
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              {item.list ? <ul>{item.list.map((entry) => <li key={entry}>{entry}</li>)}</ul> : null}
            </article>
          ))}
        </div>
      );
    case "comparison":
      return (
        <div className={styles.comparison}>
          {block.items.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <ul>{item.list.map((entry) => <li key={entry}>{entry}</li>)}</ul>
            </article>
          ))}
        </div>
      );
    case "checklist":
      return <ul className={styles.checklist}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
    case "faq":
      return (
        <div className={styles.faqBlock}>
          {block.items.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary><h3>{item.question}</h3></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      );
    case "linkList":
      return (
        <nav className={styles.contextLinks} aria-label={block.title}>
          <p>{block.title}</p>
          <ul>
            {block.items.map((item) => (
              <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
            ))}
          </ul>
        </nav>
      );
    case "cta":
      return (
        <aside className={styles.inlineCta}>
          <h3>{block.title}</h3>
          <p>{block.body}</p>
          <Button href={block.href} variant="secondary">{block.label}</Button>
        </aside>
      );
  }
}
