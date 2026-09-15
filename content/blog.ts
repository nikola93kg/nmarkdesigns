import type { Locale, Localized } from "@/lib/i18n";
import { blogEditorial } from "@/content/blog-editorial";

export interface BlogSection {
  heading: string;
  paragraphs: readonly string[];
  list?: readonly string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  publishedOn: string;
  title: Localized<string>;
  description: Localized<string>;
  excerpt: Localized<string>;
}

export interface LocalizedBlogPost {
  image: string;
  width: number;
  height: number;
  caption: string;
  topic: string;
  answer: string;
  sources: readonly { label: string; href: string }[];
  id: string;
  slug: string;
  publishedOn: string;
  readTimeMinutes: number;
  title: string;
  description: string;
  excerpt: string;
  coverAlt: string;
  sections: readonly BlogSection[];
}

export const blogPosts: readonly BlogPost[] = [
  {
    id: "local-business-homepage-check",
    slug: "homepage-checklist-za-lokalni-biznis",
    publishedOn: "2026-09-15",
    title: {
      sr: "5 stvari koje lokalni biznis treba da popravi na početnoj stranici",
      en: "5 homepage fixes local businesses should make first",
    },
    description: {
      sr: "Kratka kontrolna lista za početnu stranicu: jasna ponuda, kontakt, mobilni prikaz, društveni dokaz i jasan sledeći korak.",
      en: "A practical homepage checklist: clear offer, contact paths, mobile experience, trust signals, and one clear next step.",
    },
    excerpt: {
      sr: "Ako sajt izgleda lepo, ali ne donosi upite, problem je često u osnovnoj strukturi početne stranice.",
      en: "If a site looks good but doesn’t generate enquiries, the issue is often the homepage structure.",
    },
  },
  {
    id: "website-audit-framework",
    slug: "kako-da-radite-brzi-audit-sajta",
    publishedOn: "2026-09-15",
    title: {
      sr: "Kako da uradite besplatni 10-minutni audit sajta koji stvarno pomaže",
      en: "How to run a 10-minute website audit that is actually useful",
    },
    description: {
      sr: "Jednostavan okvir za audit koji donosi vrednost: mobilna upotrebljivost, poverenje i put do upita.",
      en: "A simple audit framework focused on mobile usability, trust, and enquiry paths.",
    },
    excerpt: {
      sr: "Audit je najbolji kada je kratak, specifičan i usmeren na sledeći korak, bez tehničkog prenatrpavanja.",
      en: "Audits work best when they are short, specific, and oriented around the next practical step.",
    },
  },
  {
    id: "portfolio-storytelling",
    slug: "kako-da-portfolio-donosi-kvalitetne-upite",
    publishedOn: "2026-09-15",
    title: {
      sr: "Kako da portfolio ne bude galerija, već izvor kvalitetnih upita",
      en: "How to make portfolio pages generate better enquiries",
    },
    description: {
      sr: "Umesto samih screenshotova, predstavite problem klijenta, odluku i poslovnu korist koju novi sajt donosi.",
      en: "Don’t post only screenshots—show the business problem, your decision, and practical value.",
    },
    excerpt: {
      sr: "Dobri portfolio primeri ne pokazuju samo kako sajt izgleda, već zašto je napravljen na taj način.",
      en: "Strong portfolio posts explain not only how a site looks, but why key decisions were made.",
    },
  },
];

export function getBlogPosts(locale: Locale): readonly LocalizedBlogPost[] {
  return blogPosts.map((post) => ({
    id: post.id,
    slug: post.slug,
    publishedOn: post.publishedOn,
    readTimeMinutes: Math.max(1, Math.ceil([blogEditorial[post.id].answer[locale], ...blogEditorial[post.id].sections[locale].flatMap((section) => [section.heading, ...section.paragraphs, ...(section.list ?? [])])].join(" ").split(/\s+/).length / 200)),
    title: post.title[locale],
    description: post.description[locale],
    excerpt: post.excerpt[locale],
    coverAlt: blogEditorial[post.id].alt[locale],
    sections: blogEditorial[post.id].sections[locale],
    image: blogEditorial[post.id].image,
    width: blogEditorial[post.id].width,
    height: blogEditorial[post.id].height,
    caption: blogEditorial[post.id].caption[locale],
    topic: blogEditorial[post.id].topic[locale],
    answer: blogEditorial[post.id].answer[locale],
    sources: blogEditorial[post.id].sources,
  }));
}

export function getBlogPost(locale: Locale, slug: string): LocalizedBlogPost | null {
  return getBlogPosts(locale).find((post) => post.slug === slug) ?? null;
}