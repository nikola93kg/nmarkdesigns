import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/components/blog/BlogArticlePage";
import { blogPosts, getBlogPost } from "@/content/blog";
import { getDictionary } from "@/content/i18n";
import { isLocale, locales } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";
import { canonicalUrl } from "@/lib/public-pages";
import { localizedBlogPostPath, localizedPath } from "@/lib/routes";
import { serializeJsonLd, type JsonValue } from "@/lib/schema";
import { site } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => blogPosts.map((post) => ({ locale, slug: post.slug })));
}

async function resolveArticle(params: PageProps<"/[locale]/blog/[slug]">["params"]) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = getBlogPost(locale, slug);
  if (!post) notFound();
  const copy = await getDictionary(locale);
  return { locale, post, copy };
}

export async function generateMetadata({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, post } = await resolveArticle(params);
  const metadata = createPageMetadata({
    title: post.seoTitle,
    description: post.description,
    locale,
    route: "blog",
    slug: post.slug,
    image: { src: post.socialImage, width: post.width, height: post.height, alt: post.coverAlt, type: "image/webp" },
  });
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", publishedTime: post.publishedOn } };
}

export default async function BlogArticleRoute({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { post, copy, locale } = await resolveArticle(params);
  const url = canonicalUrl(localizedBlogPostPath(post.slug, locale));
  const schema: JsonValue = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting", "@id": `${url}#article`, url,
        headline: post.title, description: post.description, abstract: post.answer,
        inLanguage: locale, datePublished: post.publishedOn, dateModified: post.updatedOn,
        image: canonicalUrl(post.socialImage), mainEntityOfPage: url,
        author: { "@type": "Person", name: "Nikola Marković", "@id": `${site.url}/#nikola-markovic` },
        publisher: { "@id": `${site.url}/#organization` },
        articleSection: post.topic, citation: post.sources.map((source) => source.href),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: copy.navigation.blog, item: canonicalUrl(localizedPath("blog", locale)) },
          { "@type": "ListItem", position: 2, name: post.title, item: url },
        ],
      },
    ],
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} /><BlogArticlePage post={post} copy={copy.blog} locale={locale} url={url} /></>;
}
