import { site } from "@/content/site";
import type { Locale, Localized } from "@/lib/i18n";

export type HostingerPlacement = "hero" | "footer" | "pricing" | "maintenance" | "blog";

export const hostingerPartner = {
  url: site.hostingerPartnerUrl,
  couponCode: site.hostingerCouponCode,
  detailsAnchor: "hostinger-partner",
  termsUrl: "https://www.hostinger.com/legal/referral-program-agreement",
} as const;

interface HostingerCopy {
  label: string;
  badgeAlt: string;
  heroBenefit: string;
  detailsAction: string;
  title: string;
  description: string;
  linkExplanation: string;
  eligibility: string;
  exclusions: string;
  renewal: string;
  termsAction: string;
  offerAction: string;
  disclosure: string;
  couponLabel: string;
  copyCoupon: string;
  copyingCoupon: string;
  copiedCoupon: string;
  copyFailed: string;
  newTab: string;
}

export const hostingerCopy = {
  sr: {
    label: "Zvanični Hostinger partner",
    badgeAlt: "Hostinger partner",
    heroBenefit: "20% popusta na prvi period odabranih hosting planova",
    detailsAction: "Detalji i uslovi",
    title: "Hosting direktno kod Hostingera",
    description: "Hosting zakupljujete i plaćate direktno Hostingeru. NMark tehničko održavanje je zasebna usluga koja se posebno dogovara.",
    linkExplanation: "Partnerski link automatski primenjuje ponudu. Ako kupujete bez njega, kupon možete uneti pri plaćanju.",
    eligibility: "20% popusta važi za prvi period odabranih novih hosting planova sa pretplatom od najmanje 12 meseci.",
    exclusions: "Ponuda ne obuhvata domenske usluge, obnove i već kupljene usluge. Ne sabira se sa dodatnim promo kodovima.",
    renewal: "Obnova se naplaćuje po redovnoj ceni. Konačnu cenu, podobnost plana i uslove proverite kod Hostingera pre plaćanja.",
    termsAction: "Hostinger uslovi ponude",
    offerAction: "Pogledajte Hostinger ponudu",
    disclosure: "Partnerski link: NMark Designs može ostvariti proviziju ako kupite preko ovog linka.",
    couponLabel: "Kupon kod",
    copyCoupon: "Kopirajte kod",
    copyingCoupon: "Kopiranje…",
    copiedCoupon: "Kod je kopiran.",
    copyFailed: "Kopiranje nije uspelo. Označite i kopirajte prikazani kod ručno.",
    newTab: "otvara se u novoj kartici",
  },
  en: {
    label: "Official Hostinger partner",
    badgeAlt: "Hostinger partner",
    heroBenefit: "20% off the first term of eligible hosting plans",
    detailsAction: "Offer details",
    title: "Hosting directly with Hostinger",
    description: "You purchase and pay for hosting directly with Hostinger. NMark website maintenance is a separate service agreed independently.",
    linkExplanation: "The partner link applies the offer automatically. If you purchase without it, you can enter the coupon at checkout.",
    eligibility: "20% off applies to the first term of eligible new hosting plans with subscriptions of at least 12 months.",
    exclusions: "Domain services, renewals and previously purchased services are excluded. Additional promo codes cannot be combined with this offer.",
    renewal: "Renewals are charged at the regular price. Check the final price, plan eligibility and terms with Hostinger before payment.",
    termsAction: "Hostinger offer terms",
    offerAction: "View Hostinger offer",
    disclosure: "Partner link: NMark Designs may earn a commission if you purchase through this link.",
    couponLabel: "Coupon code",
    copyCoupon: "Copy code",
    copyingCoupon: "Copying…",
    copiedCoupon: "Code copied.",
    copyFailed: "Copying failed. Select and copy the displayed code manually.",
    newTab: "opens in a new tab",
  },
} satisfies Localized<HostingerCopy>;

export function isHostingerPartnerUrl(href: string): boolean {
  try {
    const url = new URL(href);
    return url.protocol === "https:" &&
      (url.hostname === "www.hostinger.com" || url.hostname === "hostinger.com") &&
      url.searchParams.get("REFERRALCODE") === hostingerPartner.couponCode;
  } catch {
    return false;
  }
}

export function getHostingerCopy(locale: Locale): HostingerCopy {
  return hostingerCopy[locale];
}
