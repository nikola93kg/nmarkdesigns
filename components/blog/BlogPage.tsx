import { BlogCard } from "./BlogCard";
import styles from "./Blog.module.css";
import { blogLabels } from "@/content/blog-editorial";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getBlogPosts } from "@/content/blog";
import type { Dictionary } from "@/content/i18n/types";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";

export function BlogPage({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  const posts = getBlogPosts(locale);

  return (
    <>
      <section className={styles.intro}>
        <Container>
          <p className="text-small font-semibold uppercase tracking-[0.18em] text-accent">{copy.blog.intro.eyebrow}</p>
          <h1 className="mt-5 text-balance text-display font-semibold">{copy.blog.intro.title}</h1>
          <p className="mt-6 text-pretty text-inverse/85">{copy.blog.intro.description}</p>
        </Container>
      </section>

      <section className={styles.collection} aria-label={blogLabels[locale].guides}>
        <Container className={styles.grid}>
          {posts.length === 0
            ? <p className="text-muted">{copy.blog.empty}</p>
            : posts.map((post, index) => (
              <BlogCard key={post.id} post={post} locale={locale} copy={copy.blog} featured={index === 0} />
            ))}
        </Container>
      </section>

      <section className="border-t border-border bg-brand py-14 text-on-brand sm:py-16 lg:py-20">
        <Container className="max-w-content text-center">
          <p className="text-small font-semibold uppercase tracking-[0.16em] text-accent">{copy.blog.cta.eyebrow}</p>
          <h2 className="mt-4 text-balance text-heading font-semibold">{copy.blog.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-on-brand-muted">{copy.blog.cta.description}</p>
          <div className="mt-8">
            <Button href={localizedPath("contact", locale)} variant="secondary">{copy.blog.cta.label}</Button>
          </div>
        </Container>
      </section>
    </>
  );
}