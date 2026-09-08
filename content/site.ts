export interface SiteContent {
  name: string;
  url: `https://${string}`;
  language: string;
  locale: string;
  description: string;
  email: string;
  phone: {
    label: string;
    href: `tel:${string}`;
  };
  instagramUrl: `https://${string}`;
  whatsappUrl: `https://${string}`;
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export const site = {
  name: "NMark Designs",
  url: "https://nmarkdesigns.com",
  language: "sr-Latn",
  locale: "sr_RS",
  description:
    "Profesionalna izrada web sajtova za male biznise, frilensere i lokalne brendove. Fokus na modernom dizajnu, brzini i osnovnoj SEO optimizaciji.",
  email: "info@nmarkdesigns.com",
  phone: {
    label: "+381 64 300 5654",
    href: "tel:+381643005654",
  },
  instagramUrl: "https://www.instagram.com/nmarkdesigns/",
  whatsappUrl: "https://wa.me/381643005654",
} as const satisfies SiteContent;

// Keep unmigrated destinations on production until each local page is ready.
export const navigation: readonly NavigationItem[] = [
  { label: "Početna", href: "/" },
  { label: "Portfolio", href: `${site.url}/portfolio/`, external: true },
  { label: "Usluge", href: `${site.url}/all-services/`, external: true },
  { label: "O nama", href: `${site.url}/about/`, external: true },
  { label: "Kontakt", href: `${site.url}/contact/`, external: true },
];

export const pricingLink = {
  label: "Cenovnik",
  href: `${site.url}/cenovnik/`,
  external: true,
} as const satisfies NavigationItem;

export const footerNavigation: readonly NavigationItem[] = [
  ...navigation,
  pricingLink,
];
