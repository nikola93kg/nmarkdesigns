export interface SiteContent {
  name: string;
  url: `https://${string}`;
  email: string;
  phone: {
    label: string;
    href: `tel:${string}`;
  };
  contactLocation: { locality: string; region: string; country: string };
  instagramUrl: `https://${string}`;
  whatsappUrl: `https://${string}`;
  hostingerPartnerUrl: string;
  hostingerCouponCode: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export const site = {
  name: "NMark Designs",
  url: "https://nmarkdesigns.com",
  email: "info@nmarkdesigns.com",
  phone: {
    label: "+381 64 300 5654",
    href: "tel:+381643005654",
  },
  contactLocation: { locality: "Lazarevac", region: "Beograd", country: "RS" },
  instagramUrl: "https://www.instagram.com/nmarkdesigns/",
  whatsappUrl: "https://wa.me/381643005654",
  hostingerPartnerUrl: "https://www.hostinger.com?REFERRALCODE=JIPMARKOVUSK",
  hostingerCouponCode: "JIPMARKOVUSK",
} as const satisfies SiteContent;
