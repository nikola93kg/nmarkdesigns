import type { Locale } from "@/lib/i18n";
import type { RouteKey } from "@/lib/routes";

export interface FAQItem {
  id: "services" | "timeline" | "payment" | "hosting" | "maintenance";
  question: string;
  paragraphs: readonly string[];
  list?: readonly string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface SectionCopy {
  eyebrow: string;
  title: string;
  description: string;
}

export interface Dictionary {
  navigation: Record<RouteKey, string>;
  accessibility: {
    skipLink: string;
    homeLink: string;
    mainNavigation: string;
    mobileNavigation: string;
    footerNavigation: string;
    menu: string;
    backToTop: string;
    languageNavigation: string;
    languageLabels: Record<Locale, string>;
  };
  actions: {
    quote: string;
    contact: string;
    allProjects: string;
    viewProject: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    contact: string;
    copyright: string;
  };
  portfolio: {
    metadata: { title: string; description: string };
    intro: SectionCopy;
    contactTitle: string;
    visitWebsite: string;
  };
  about: {
    metadata: { title: string; description: string };
    intro: SectionCopy;
    profile: {
      eyebrow: string;
      title: string;
      paragraphs: readonly string[];
      imageAlt: string;
      caption: string;
    };
    approach: {
      title: string;
      principles: readonly string[];
      contactTitle: string;
    };
  };
  caseStudy: {
    eyebrow: string;
    client: string;
    location: string;
    category: string;
    services: string;
    technologies: string;
    challenge: string;
    solution: string;
    results: string;
    gallery: string;
    navigation: string;
    nextProject: string;
  };
  home: {
    metadata: { title: string; description: string };
    hero: SectionCopy & { subtitle: string; imageAlt: string };
    projects: SectionCopy;
    services: SectionCopy & {
      imageAlt: string;
      items: readonly ServiceItem[];
      maintenance: ServiceItem;
    };
    cta: SectionCopy;
    faq: SectionCopy & { items: readonly FAQItem[] };
  };
}
