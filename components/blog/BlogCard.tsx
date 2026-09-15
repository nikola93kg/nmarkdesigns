import Image from "next/image";
import Link from "next/link";
import type { LocalizedBlogPost } from "@/content/blog";
import { blogLabels } from "@/content/blog-editorial";
import type { Dictionary } from "@/content/i18n/types";
import { localeSettings, type Locale } from "@/lib/i18n";
import { localizedBlogPostPath } from "@/lib/routes";
import styles from "./Blog.module.css";

export function BlogCard({ post, locale, copy, featured = false }: { post: LocalizedBlogPost; locale: Locale; copy: Dictionary["blog"]; featured?: boolean }) {
  return (
    <article className={`${styles.card} ${featured ? styles.featured : ""}`}>
      <Link href={localizedBlogPostPath(post.slug, locale)} className={styles.image} tabIndex={-1} aria-hidden="true">
        <Image src={post.image} alt={post.coverAlt} width={post.width} height={post.height} sizes="(max-width: 767px) 100vw, 50vw" preload={featured} />
      </Link>
      <div className={styles.cardBody}>
        <p className="text-small font-semibold text-brand">{featured ? `${blogLabels[locale].featured} / ` : ""}{post.topic}</p>
        <h2 className="mt-3 text-subheading font-semibold text-ink"><Link href={localizedBlogPostPath(post.slug, locale)} className="hover:underline underline-offset-4">{post.title}</Link></h2>
        <p className="mt-4 text-muted">{post.excerpt}</p>
        <div className={`${styles.meta} mt-5`}><time dateTime={post.publishedOn}>{new Intl.DateTimeFormat(localeSettings[locale].dateTime, { dateStyle: "long", timeZone: "UTC" }).format(new Date(post.publishedOn))}</time><span>{post.readTimeMinutes} {copy.readTime}</span></div>
        <Link href={localizedBlogPostPath(post.slug, locale)} className="mt-5 inline-block py-2 text-small font-semibold text-brand underline underline-offset-4" aria-label={`${copy.readArticle}: ${post.title}`}>{copy.readArticle} <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  );
}
