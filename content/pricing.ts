export type PricingPackageId = "basic" | "standard" | "premium";

export interface PricingPackage {
  id: PricingPackageId;
  name: string;
  price: string;
}

export const pricingPackages = [
  { id: "basic", name: "Basic plan", price: "450 €" },
  { id: "standard", name: "Standard Plan", price: "650 €" },
  { id: "premium", name: "Premium plan", price: "1.000 €" },
] as const satisfies readonly PricingPackage[];

export const pricingSourceUrl = "https://nmarkdesigns.com/cenovnik/";
