import type { Locale } from "@/lib/i18n";

export type WebsitePackageId = "landing-page" | "business-website" | "advanced-website" | "ecommerce";
export type AdditionalServiceId = "redesign" | "seo" | "performance" | "ai-chatbot";
export type CarePlanId = "hosting" | "basic-care" | "business-care" | "custom-support";

export type ServiceInquiryId =
  | WebsitePackageId
  | "custom-development"
  | AdditionalServiceId
  | CarePlanId;

export interface WebsitePackage {
  id: WebsitePackageId;
  startingPrice: number;
  usStartingPrice: number;
  inquiryKey: WebsitePackageId;
}

export interface AdditionalService {
  id: AdditionalServiceId;
  startingPrice: number;
  usStartingPrice: number;
  inquiryKey: AdditionalServiceId;
}

export interface CarePlan {
  id: CarePlanId;
  startingPrice?: number;
  usStartingPrice?: number;
  period?: "year" | "month";
  isQuote?: boolean;
  inquiryKey: CarePlanId;
}

export const websitePackages: readonly WebsitePackage[] = [
  { id: "landing-page", startingPrice: 300, usStartingPrice: 750, inquiryKey: "landing-page" },
  { id: "business-website", startingPrice: 550, usStartingPrice: 1500, inquiryKey: "business-website" },
  { id: "advanced-website", startingPrice: 900, usStartingPrice: 2500, inquiryKey: "advanced-website" },
  { id: "ecommerce", startingPrice: 1200, usStartingPrice: 3500, inquiryKey: "ecommerce" },
] as const;

export function getWebsiteStartingPrice(id: WebsitePackageId, locale: Locale = "sr"): number {
  const item = websitePackages.find((item) => item.id === id);
  if (!item) throw new Error(`Missing website starting price: ${id}`);
  return locale === "en" ? item.usStartingPrice : item.startingPrice;
}

export function formatWebsiteStartingPrice(id: WebsitePackageId, locale: Locale): string {
  const price = getWebsiteStartingPrice(id, locale);
  return locale === "en"
    ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price)
    : `${new Intl.NumberFormat("sr").format(price)} €`;
}

export const additionalServices: readonly AdditionalService[] = [
  { id: "redesign", startingPrice: 400, usStartingPrice: 600, inquiryKey: "redesign" },
  { id: "seo", startingPrice: 150, usStartingPrice: 200, inquiryKey: "seo" },
  { id: "performance", startingPrice: 100, usStartingPrice: 150, inquiryKey: "performance" },
  { id: "ai-chatbot", startingPrice: 350, usStartingPrice: 450, inquiryKey: "ai-chatbot" },
] as const;

export const carePlans: readonly CarePlan[] = [
  { id: "hosting", startingPrice: 30, usStartingPrice: 50, period: "year", inquiryKey: "hosting" },
  { id: "basic-care", startingPrice: 25, usStartingPrice: 40, period: "month", inquiryKey: "basic-care" },
  { id: "business-care", startingPrice: 50, usStartingPrice: 75, period: "month", inquiryKey: "business-care" },
  { id: "custom-support", isQuote: true, inquiryKey: "custom-support" },
] as const;

export function getCarePlanStartingPrice(id: Exclude<CarePlanId, "custom-support">): number {
  const price = carePlans.find((plan) => plan.id === id)?.startingPrice;
  if (price === undefined) {
    throw new Error(`Missing starting price for care plan: ${id}`);
  }
  return price;
}

export const pricingSourceUrl = "https://nmarkdesigns.com/cenovnik/";

export const pricingAnchors = {
  packages: "packages",
  customDevelopment: "custom-development",
  additionalServices: "additional-services",
  maintenance: "maintenance",
  faq: "faq",
} as const;

/** Market prices are explicit commercial amounts, never FX conversions. */
export function pricingCurrency(locale: Locale): "EUR" | "USD" { return locale === "sr" ? "EUR" : "USD"; }
export function formatMoney(value: number, locale: Locale): string {
  return locale === "sr" ? `${new Intl.NumberFormat("sr").format(value)} €` : new Intl.NumberFormat("en-US", {style:"currency",currency:"USD",maximumFractionDigits:0}).format(value);
}
export function getAdditionalStartingPrice(id: AdditionalServiceId, locale: Locale): number {
  const item=additionalServices.find(item=>item.id===id);
  if(!item)throw new Error(`Missing additional service: ${id}`);
  return locale==="en"?item.usStartingPrice:item.startingPrice;
}
export function formatAdditionalStartingPrice(id: AdditionalServiceId, locale: Locale): string {
  return `${locale==="en"?"From":"Od"} ${formatMoney(getAdditionalStartingPrice(id,locale),locale)}`;
}
export function getCarePlanMarketPrice(id: Exclude<CarePlanId,"custom-support">,locale:Locale):number {
  const item=carePlans.find(item=>item.id===id),price=locale==="en"?item?.usStartingPrice:item?.startingPrice;
  if(price===undefined)throw new Error(`Missing care plan market price: ${id}`);
  return price;
}
export function formatCarePlanStartingPrice(id: Exclude<CarePlanId,"custom-support">,locale:Locale):string {
  const plan=carePlans.find(item=>item.id===id)!;
  const period=locale==="en"?(plan.period==="year"?"year":"month"):(plan.period==="year"?"god.":"mes.");
  return `${locale==="en"?"From":"Od"} ${formatMoney(getCarePlanMarketPrice(id,locale),locale)}/${period}`;
}
