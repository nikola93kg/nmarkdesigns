import type { Locale, Localized } from "@/lib/i18n";
import { blogEditorial } from "@/content/blog-editorial";

export interface BlogSection {
  heading: string;
  paragraphs: readonly string[];
  list?: readonly string[];
  blocks?: readonly BlogBlock[];
  media?: readonly BlogMedia[];
}

export type BlogBlock =
  | {
      type: "table";
      caption?: string;
      columns: readonly string[];
      rows: readonly (readonly string[])[];
    }
  | {
      type: "subsections";
      items: readonly {
        heading: string;
        paragraphs: readonly string[];
        list?: readonly string[];
      }[];
    }
  | {
      type: "cards";
      items: readonly {
        title: string;
        eyebrow?: string;
        body: string;
        list?: readonly string[];
      }[];
    }
  | {
      type: "comparison";
      items: readonly {
        title: string;
        body: string;
        list: readonly string[];
      }[];
    }
  | {
      type: "checklist";
      items: readonly string[];
    }
  | {
      type: "faq";
      items: readonly {
        question: string;
        answer: string;
      }[];
    }
  | {
      type: "linkList";
      title: string;
      items: readonly {
        label: string;
        href: string;
      }[];
    }
  | {
      type: "cta";
      title: string;
      body: string;
      label: string;
      href: string;
    };

export interface BlogMedia {
  image: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  publishedOn: string;
  updatedOn?: string;
  title: Localized<string>;
  seoTitle?: Localized<string>;
  description: Localized<string>;
  excerpt: Localized<string>;
}

export interface LocalizedBlogPost {
  image: string;
  heroBackground: {
    image: string;
    width: number;
    height: number;
    position?: string;
  };
  socialImage: string;
  width: number;
  height: number;
  caption: string;
  topic: string;
  answer: string;
  sources: readonly { label: string; href: string }[];
  cta?: {
    title: string;
    description: string;
    label: string;
  };
  id: string;
  slug: string;
  publishedOn: string;
  updatedOn: string;
  readTimeMinutes: number;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  coverAlt: string;
  sections: readonly BlogSection[];
}

export const blogPosts: readonly BlogPost[] = [
  {
    id: "website-pricing-serbia-2026",
    slug: "koliko-kosta-izrada-web-sajta-u-srbiji-2026",
    publishedOn: "2026-09-22",
    updatedOn: "2026-09-22",
    title: {
      sr: "Koliko košta izrada web sajta u Srbiji 2026?",
      en: "How much does website development cost in Serbia in 2026?",
    },
    seoTitle: {
      sr: "Koliko košta izrada web sajta u Srbiji 2026? Cene i vodič",
      en: "Website development cost in Serbia 2026: prices and guide",
    },
    description: {
      sr: "Saznajte koliko košta izrada web sajta u Srbiji 2026. Uporedili smo cene poslovnih sajtova, WordPress rešenja, web shopova i custom razvoja.",
      en: "See how much website development costs in Serbia in 2026, with ranges for business sites, WordPress builds, online stores, and custom development.",
    },
    excerpt: {
      sr: "Jasan vodič kroz cene landing stranica, poslovnih sajtova, web shopova i custom aplikacija, uz pitanja koja treba postaviti pre ponude.",
      en: "A practical guide to landing page, business website, web shop, and custom application pricing, with questions to ask before accepting a quote.",
    },
  },
  {
    id: "iphone-duo-responsive-design",
    slug: "iphone-duo-responsive-web-dizajn",
    publishedOn: "2026-09-15",
    title: {
      sr: "iPhone Duo menja responsive web dizajn — da li je vaš sajt spreman za foldable telefone?",
      en: "iPhone Duo changes responsive web design — is your website ready for foldable phones?",
    },
    seoTitle: {
      sr: "iPhone Duo i budućnost responsive web dizajna",
      en: "iPhone Duo and the future of responsive web design",
    },
    description: {
      sr: "Appleov foldable iPhone Duo pokazuje zašto mobilna verzija sajta više ne može da se proverava samo na jednom telefonu i par breakpointova.",
      en: "Apple's foldable iPhone Duo shows why a mobile website can no longer be checked on one phone and a few breakpoints.",
    },
    excerpt: {
      sr: "Foldable telefoni pomeraju granicu između telefona i tableta. Zato responsive web dizajn mora da bude fluidan, testiran i spreman za više stanja ekrana.",
      en: "Foldable phones blur the line between phone and tablet. Responsive web design now needs to be fluid, tested, and ready for more screen states.",
    },
  },
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
    updatedOn: post.updatedOn ?? post.publishedOn,
    readTimeMinutes: Math.max(1, Math.ceil([blogEditorial[post.id].answer[locale], ...blogEditorial[post.id].sections[locale].flatMap((section) => [section.heading, ...section.paragraphs, ...(section.list ?? []), ...(section.blocks ?? []).flatMap((block) => blockText(block))])].join(" ").split(/\s+/).length / 200)),
    title: post.title[locale],
    seoTitle: (post.seoTitle ?? post.title)[locale],
    description: post.description[locale],
    excerpt: post.excerpt[locale],
    coverAlt: blogEditorial[post.id].alt[locale],
    sections: blogEditorial[post.id].sections[locale],
    image: blogEditorial[post.id].image,
    heroBackground: blogEditorial[post.id].heroBackground,
    socialImage: blogEditorial[post.id].image.replace(/\.webp$/, ".jpg"),
    width: blogEditorial[post.id].width,
    height: blogEditorial[post.id].height,
    caption: blogEditorial[post.id].caption[locale],
    topic: blogEditorial[post.id].topic[locale],
    answer: blogEditorial[post.id].answer[locale],
    sources: blogEditorial[post.id].sources,
    cta: blogEditorial[post.id].cta?.[locale],
  }));
}

export function getBlogPost(locale: Locale, slug: string): LocalizedBlogPost | null {
  return getBlogPosts(locale).find((post) => post.slug === slug) ?? null;
}

function blockText(block: BlogBlock): readonly string[] {
  switch (block.type) {
    case "table":
      return [block.caption ?? "", ...block.columns, ...block.rows.flat()];
    case "subsections":
      return block.items.flatMap((item) => [item.heading, ...item.paragraphs, ...(item.list ?? [])]);
    case "cards":
      return block.items.flatMap((item) => [item.eyebrow ?? "", item.title, item.body, ...(item.list ?? [])]);
    case "comparison":
      return block.items.flatMap((item) => [item.title, item.body, ...item.list]);
    case "checklist":
      return block.items;
    case "faq":
      return block.items.flatMap((item) => [item.question, item.answer]);
    case "linkList":
      return [block.title, ...block.items.map((item) => item.label)];
    case "cta":
      return [block.title, block.body, block.label];
  }
}
