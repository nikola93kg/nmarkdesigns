import { notFound } from "next/navigation";
import { BlogPage } from "@/components/blog/BlogPage";
import { getDictionary } from "@/content/i18n";
import { isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";
import { getBlogPosts } from "@/content/blog";

export async function generateMetadata({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = await getDictionary(locale);
  const featured = getBlogPosts(locale)[0];

  return createPageMetadata({
    ...copy.blog.metadata,
    locale,
    route: "blog",
    image: featured ? { src: featured.image, width: featured.width, height: featured.height, alt: featured.coverAlt } : undefined,
  });
}

export default async function BlogIndexPage({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = await getDictionary(locale);

  return <BlogPage locale={locale} copy={copy} />;
}