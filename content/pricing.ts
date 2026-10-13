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
  inquiryKey: WebsitePackageId;
}

export interface AdditionalService {
  id: AdditionalServiceId;
  startingPrice: number;
  inquiryKey: AdditionalServiceId;
}

export interface CarePlan {
  id: CarePlanId;
  startingPrice?: number;
  period?: "year" | "month";
  isQuote?: boolean;
  inquiryKey: CarePlanId;
}

export const websitePackages: readonly WebsitePackage[] = [
  { id: "landing-page", startingPrice: 300, inquiryKey: "landing-page" },
  { id: "business-website", startingPrice: 550, inquiryKey: "business-website" },
  { id: "advanced-website", startingPrice: 900, inquiryKey: "advanced-website" },
  { id: "ecommerce", startingPrice: 1200, inquiryKey: "ecommerce" },
] as const;

export const additionalServices: readonly AdditionalService[] = [
  { id: "redesign", startingPrice: 400, inquiryKey: "redesign" },
  { id: "seo", startingPrice: 150, inquiryKey: "seo" },
  { id: "performance", startingPrice: 100, inquiryKey: "performance" },
  { id: "ai-chatbot", startingPrice: 350, inquiryKey: "ai-chatbot" },
] as const;

export const carePlans: readonly CarePlan[] = [
  { id: "hosting", startingPrice: 30, period: "year", inquiryKey: "hosting" },
  { id: "basic-care", startingPrice: 25, period: "month", inquiryKey: "basic-care" },
  { id: "business-care", startingPrice: 50, period: "month", inquiryKey: "business-care" },
  { id: "custom-support", isQuote: true, inquiryKey: "custom-support" },
] as const;

export const pricingSourceUrl = "https://nmarkdesigns.com/cenovnik/";

export const pricingAnchors = {
  packages: "packages",
  customDevelopment: "custom-development",
  additionalServices: "additional-services",
  maintenance: "maintenance",
  faq: "faq",
} as const;
