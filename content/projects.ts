import type { Localized } from "@/lib/i18n";

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: Localized<string>;
}

export interface ProjectCaseStudy {
  overview: Localized<string>;
  challenge?: Localized<readonly string[]>;
  solution?: Localized<readonly string[]>;
  results?: Localized<readonly string[]>;
  images?: readonly ProjectImage[];
}

export interface Project {
  slug: string;
  title: string;
  category?: Localized<string>;
  shortDescription?: Localized<string>;
  featuredImage: ProjectImage;
  sourceUrl: `https://${string}`;
  client?: string;
  location?: string;
  websiteUrl?: `https://${string}`;
  services?: Localized<readonly string[]>;
  technologies?: readonly string[];
  caseStudy?: ProjectCaseStudy;
}

// Names, slugs, and screenshots are from the production homepage. See migration notes.
export const projects: readonly Project[] = [
  {
    slug: "buy-pallet-jacks",
    title: "Buy Pallet Jacks",
    client: "Buy Pallet Jacks",
    websiteUrl: "https://buypalletjacks.com",
    technologies: ["Next.js", "Vercel", "Tailwind CSS"],
    caseStudy: {
      overview: {
        sr: "Web sajt za Buy Pallet Jacks sa ponudom paletnih viljuškara.",
        en: "A website for Buy Pallet Jacks presenting its range of pallet jacks.",
      },
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/buy-pallet-jacks/",
    featuredImage: {
      src: "/projects/buy-pallet-jacks.webp", width: 1536, height: 1024,
      alt: { sr: "Početna stranica Buy Pallet Jacks sa ponudom paletnih viljuškara.", en: "Buy Pallet Jacks homepage featuring pallet jacks." },
    },
  },
  {
    slug: "ilic-enterijer",
    title: "Ilić Enterijer",
    client: "Ilić Enterijer",
    websiteUrl: "https://ilicenterijer.rs/",
    technologies: ["Next.js", "Vercel", "Tailwind CSS"],
    caseStudy: {
      overview: {
        sr: "Web sajt za Ilić Enterijer sa prikazom nameštaja i kuhinja po meri.",
        en: "A website for Ilić Enterijer showcasing custom furniture and kitchens.",
      },
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/ilic-enterijer/",
    featuredImage: {
      src: "/projects/ilic-enterijer.webp", width: 1894, height: 868,
      alt: { sr: "Početna stranica Ilić Enterijer sa prikazom nameštaja i kuhinja po meri.", en: "Ilić Enterijer homepage showcasing custom furniture and kitchens." },
    },
  },
  {
    slug: "os-dule-karaklajic",
    title: "OŠ Dule Karaklajić",
    client: "ОШ „Дуле Караклајић“ – Лазаревац",
    websiteUrl: "https://dulovaskola.edu.rs/",
    technologies: ["WordPress", "HTML", "CSS", "JavaScript"],
    caseStudy: {
      overview: {
        sr: "Web prezentacija Osnovne škole „Dule Karaklajić“ iz Lazarevca.",
        en: "A website for Dule Karaklajić primary school in Lazarevac.",
      },
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/os-dule-karaklajic/",
    featuredImage: {
      src: "/projects/os-dule-karaklajic.webp", width: 1877, height: 868,
      alt: { sr: "Početna stranica OŠ Dule Karaklajić sa fotografijom škole.", en: "OŠ Dule Karaklajić homepage featuring a photograph of the school." },
    },
  },
  {
    slug: "powder-brows-vienna",
    title: "Powder Brows Vienna",
    client: "Jovana Ristic Makeup",
    websiteUrl: "https://www.powderbrowsvienna.com",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    caseStudy: {
      overview: {
        sr: "Web sajt Powder Brows Vienna za Jovana Ristic Makeup, sa ponudom tretmana obrva.",
        en: "The Powder Brows Vienna website for Jovana Ristic Makeup, presenting eyebrow treatments.",
      },
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/powder-brows-vienna/",
    featuredImage: {
      src: "/projects/powder-brows-vienna.webp", width: 1883, height: 867,
      alt: { sr: "Početna stranica Powder Brows Vienna sa ponudom tretmana obrva.", en: "Powder Brows Vienna homepage presenting eyebrow treatments." },
    },
  },
  {
    slug: "tripolisweets",
    title: "Tripoli Sweets",
    client: "Tripoli Sweets",
    websiteUrl: "https://www.tripolisweets.com.mx",
    technologies: ["WordPress", "HTML", "CSS", "JavaScript"],
    caseStudy: {
      overview: {
        sr: "Web sajt za Tripoli Sweets sa prikazom tradicionalnih poslastica.",
        en: "A website for Tripoli Sweets showcasing traditional desserts.",
      },
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/tripolisweets/",
    featuredImage: {
      src: "/projects/tripolisweets.webp", width: 1890, height: 940,
      alt: { sr: "Početna stranica Tripoli Sweets sa fotografijama tradicionalnih poslastica.", en: "Tripoli Sweets homepage featuring traditional desserts." },
    },
  },
  {
    slug: "frankultura",
    title: "Frankultura",
    client: "Frankultura",
    websiteUrl: "https://www.frankultura.rs",
    technologies: ["WordPress", "HTML", "CSS", "JavaScript"],
    caseStudy: {
      overview: {
        sr: "Web sajt za Frankulturu sa predstavljanjem online časova francuskog jezika.",
        en: "A website for Frankultura presenting online French lessons.",
      },
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/frankultura/",
    featuredImage: {
      src: "/projects/frankultura.webp", width: 1351, height: 827,
      alt: { sr: "Prikaz početne stranice web sajta Frankultura.", en: "Frankultura website homepage." },
    },
  },
  {
    slug: "coolfridgeguys",
    title: "CoolFridgeGuys",
    client: "CoolFridgeGuys",
    websiteUrl: "https://www.coolfridgeguys.com/",
    technologies: ["Next.js"],
    caseStudy: {
      overview: {
        sr: "Web prezentacija kompanije CoolFridgeGuys.",
        en: "A website presenting CoolFridgeGuys.",
      },
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/coolfridgeguys/",
    featuredImage: {
      src: "/projects/coolfridgeguys.webp", width: 1436, height: 850,
      alt: { sr: "Prikaz početne stranice web sajta CoolFridgeGuys.", en: "CoolFridgeGuys website homepage." },
    },
  },
  {
    slug: "ladekor",
    title: "LaDekor",
    client: "LaDekor",
    websiteUrl: "https://ladekor.rs/",
    caseStudy: {
      overview: {
        sr: "Web sajt za LaDekor sa predstavljanjem molerskih radova.",
        en: "A website for LaDekor presenting painting and decorating services.",
      },
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/ladekor/",
    featuredImage: {
      src: "/projects/ladekor.webp", width: 1307, height: 679,
      alt: { sr: "Prikaz početne stranice web sajta LaDekor.", en: "LaDekor website homepage." },
    },
  },
];

export type CaseStudyProject = Project & { caseStudy: ProjectCaseStudy };

export const caseStudyProjects = projects.filter(
  (project): project is CaseStudyProject => Boolean(project.caseStudy),
);

export function getCaseStudyProject(slug: string): CaseStudyProject | undefined {
  return caseStudyProjects.find((project) => project.slug === slug);
}
