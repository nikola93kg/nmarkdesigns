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
  featuredImage?: ProjectImage;
  sourceUrl: `https://${string}`;
  client?: string;
  location?: string;
  websiteUrl?: `https://${string}`;
  services?: Localized<readonly string[]>;
  technologies?: readonly string[];
  caseStudy?: ProjectCaseStudy;
  featured?: boolean;
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
    slug: "coolfridgeguys",
    title: "CoolFridgeGuys",
    client: "CoolFridgeGuys",
    websiteUrl: "https://www.coolfridgeguys.com/",
    technologies: ["Next.js"],
    shortDescription: {
      sr: "Headless Next.js e-commerce frontend za prodaju rashladnih vitrina, frižidera i zamrzivača, sa secure checkout-om na Squarespace domenu coolfridgeguys.shop.",
      en: "A headless Next.js e-commerce frontend for refrigerated display cases, refrigerators and freezers, with secure checkout handled on the Squarespace domain coolfridgeguys.shop.",
    },
    caseStudy: {
      overview: {
        sr: "Headless Next.js e-commerce frontend za prodaju rashladnih vitrina, frižidera i zamrzivača, dok je backend ostao na Squarespace-u kao secure checkout na domenu coolfridgeguys.shop.",
        en: "A headless Next.js e-commerce frontend for selling refrigerated display cases, refrigerators and freezers, while the backend remained on Squarespace as a secure checkout on coolfridgeguys.shop.",
      },
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/coolfridgeguys/",
    featuredImage: {
      src: "/projects/coolfridgeguys.webp", width: 1436, height: 850,
      alt: { sr: "Prikaz početne stranice web sajta CoolFridgeGuys.", en: "CoolFridgeGuys website homepage." },
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
    slug: "casovi-francuskog",
    title: "Časovi Francuskog",
    client: "Jelena Marković - Časovi Francuskog",
    websiteUrl: "https://casovifrancuskog.rs",
    technologies: ["WordPress", "HTML", "CSS", "JavaScript"],
    caseStudy: {
      overview: {
        sr: "Web sajt za online učenje francuskog jezika, kao i srpskog jezika za frankofone polaznike.",
        en: "A website for learning French online, and Serbian for French-speaking learners.",
      },
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/casovifrancuskog-rs/",
    featuredImage: {
      src: "/projects/casovi-francuskog.webp", width: 1351, height: 827,
      alt: { sr: "Prikaz početne stranice web sajta Casovi Francuskog.", en: "Casovi Francuskog website homepage." },
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
    slug: "anabelabebioprema",
    title: "Anabela Bebi Oprema",
    websiteUrl: "https://anabelashop.rs/",
    shortDescription: {
      sr: "E-commerce WooCommerce web sajt za prodaju bebi opreme.",
      en: "A WooCommerce e-commerce website for selling baby equipment.",
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/anabelabebioprema/",
    featuredImage: {
      src: "/projects/anabela-bebi-oprema.webp", width: 1757, height: 931,
      alt: { sr: "Prikaz početne stranice web sajta Anabela Bebi Oprema.", en: "Anabela Bebi Oprema website homepage." },
    },
    featured: false,
  },
  {
    slug: "frankultura",
    title: "Frankultura",
    client: "Frankultura",
    websiteUrl: "https://www.frankultura.rs",
    technologies: ["WordPress", "HTML", "CSS", "JavaScript"],
    shortDescription: {
      sr: "Web prezentacija za Frankulturu i online grupne časove francuskog jezika.",
      en: "A presentation website for Frankultura and its online group French classes.",
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/frankultura/",
    featuredImage: {
      src: "/projects/frankultura.webp", width: 1351, height: 827,
      alt: { sr: "Prikaz početne stranice web sajta Frankultura.", en: "Frankultura website homepage." },
    },
    featured: false,
  },
  {
    slug: "madjionicar-bojan",
    title: "Mađioničar Bojan",
    websiteUrl: "https://madjionicarbokac.com/",
    shortDescription: {
      sr: "Web prezentacija poznatog mađioničara Bojana Bogdanovića.",
      en: "A presentation website for the well-known magician Bojan Bogdanović.",
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/madjionicar-bojan/",
    featuredImage: {
      src: "/projects/madjionicar-bojan.webp", width: 1757, height: 923,
      alt: { sr: "Prikaz početne stranice web sajta Mađioničar Bojan.", en: "Mađioničar Bojan website homepage." },
    },
    featured: false,
  },
  {
    slug: "banquetes-castellanos-zoreda",
    title: "Banquetes Castellanos Zoreda",
    websiteUrl: "https://precious-marigold-0deefc.netlify.app/",
    shortDescription: {
      sr: "Prezentacioni website za klijenta iz Meksika koji iznajmljuje svadbene stolice, stolove i prateću opremu.",
      en: "A presentation website for a client in Mexico that rents wedding chairs, tables and related event equipment.",
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/banquetes-castellanos-zoreda/",
    featuredImage: {
      src: "/projects/banquetes-castellanos-zoreda.webp", width: 1757, height: 926,
      alt: { sr: "Prikaz početne stranice web sajta Banquetes Castellanos Zoreda.", en: "Banquetes Castellanos Zoreda website homepage." },
    },
    featured: false,
  },
  {
    slug: "nest-home-solutions",
    title: "Nest Home Solutions",
    websiteUrl: "https://nikola93kg.github.io/nest-home/",
    shortDescription: {
      sr: "Web prezentacija građevinske firme koja gradi apartmane na Divčibarama.",
      en: "A presentation website for a construction company building apartments in Divčibare.",
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/nest-home-solutions/",
    featuredImage: {
      src: "/projects/nesthome.webp", width: 1757, height: 926,
      alt: { sr: "Prikaz početne stranice web sajta Nest Home Solutions.", en: "Nest Home Solutions website homepage." },
    },
    featured: false,
  },
  {
    slug: "stamenko-milic-photography",
    title: "Stamenko Milić Photography",
    websiteUrl: "https://www.milicweddings.com/",
    shortDescription: {
      sr: "Web prezentacija za fotografa Stamenka Milića.",
      en: "A presentation website for photographer Stamenko Milić.",
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/stamenko-milic-photography/",
    featuredImage: {
      src: "/projects/milic-weddings.webp", width: 1757, height: 926,
      alt: { sr: "Prikaz početne stranice web sajta Stamenko Milić Photography.", en: "Stamenko Milić Photography website homepage." },
    },
    featured: false,
  },
  {
    slug: "dh-travell",
    title: "DH Travel",
    websiteUrl: "https://dhtravell.rs/",
    shortDescription: {
      sr: "Web prezentacija za biznis koji organizuje prevoz putnika od adrese do aerodroma i nazad.",
      en: "A presentation website for a business that provides passenger transport from an address to the airport and back.",
    },
    sourceUrl: "https://nmarkdesigns.com/portfolio/dh-travell/",
    featuredImage: {
      src: "/projects/dhtravel.webp", width: 1900, height: 876,
      alt: { sr: "Prikaz početne stranice web sajta DH Travel.", en: "DH Travel website homepage." },
    },
    featured: false,
  },
];

const portfolioOrder = [
  "casovi-francuskog",
  "ilic-enterijer",
  "powder-brows-vienna",
  "coolfridgeguys",
  "tripolisweets",
  "buy-pallet-jacks",
  "ladekor",
  "anabelabebioprema",
  "os-dule-karaklajic",
  "frankultura",
  "madjionicar-bojan",
  "banquetes-castellanos-zoreda",
  "nest-home-solutions",
  "stamenko-milic-photography",
  "dh-travell",
] as const;

const caseStudyOrder = [
  "buy-pallet-jacks",
  "ilic-enterijer",
  "os-dule-karaklajic",
  "powder-brows-vienna",
  "tripolisweets",
  "casovi-francuskog",
  "coolfridgeguys",
  "ladekor",
] as const;

export type ProjectWithImage = Project & { featuredImage: ProjectImage };

export function hasProjectImage(project: Project): project is ProjectWithImage {
  return Boolean(project.featuredImage);
}

export const projectsWithImages = projects.filter(hasProjectImage);

const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));

export const portfolioProjects: readonly Project[] = portfolioOrder.map((slug) => {
  const project = projectsBySlug.get(slug);
  if (!project) throw new Error(`Missing portfolio project: ${slug}`);
  return project;
});

export type CaseStudyProject = ProjectWithImage & { caseStudy: ProjectCaseStudy };

export const caseStudyProjects = projects
  .filter((project): project is CaseStudyProject => Boolean(project.caseStudy && project.featuredImage))
  .toSorted((a, b) => caseStudyOrder.indexOf(a.slug as (typeof caseStudyOrder)[number]) - caseStudyOrder.indexOf(b.slug as (typeof caseStudyOrder)[number]));

export function getCaseStudyProject(slug: string): CaseStudyProject | undefined {
  return caseStudyProjects.find((project) => project.slug === slug);
}
