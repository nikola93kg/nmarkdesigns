import { z } from "zod";
import { localeSchema } from "./contracts";

export const CONTACT_CONSENT_VERSION = "2026-11-19-contact-v1-draft";
export const serviceIds = ["new_website", "redesign", "ecommerce", "web_app", "seo", "ai_chatbot", "maintenance", "other"] as const;
export type LeadService = typeof serviceIds[number];
export const leadStatuses = ["new", "contacted", "qualified", "closed_won", "closed_lost"] as const;
const optionalText = (max: number) => z.string().trim().max(max).default("");
const singleLine = (max: number) => optionalText(max).refine((value) => !/[\r\n\x00-\x1f]/.test(value));
export const leadInput = z.object({
  clientSubmissionId: z.uuid(),
  locale: localeSchema,
  name: z.string().trim().min(2).max(100).refine((value) => !/[\r\n\x00-\x1f]/.test(value)),
  email: z.string().trim().pipe(z.email().max(254)).transform((value) => value.toLowerCase()),
  phone: singleLine(40).refine((value) => !value || /^[+\d\s().-]{3,40}$/.test(value)),
  company: singleLine(160),
  website: optionalText(500).refine((value) => {
    if (!value) return true;
    try { const url = new URL(value); return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password; } catch { return false; }
  }),
  service: z.enum(serviceIds).default("other"),
  budgetRange: singleLine(120),
  timeframe: singleLine(120),
  projectDescription: optionalText(2000),
  preferredContactMethod: z.enum(["email", "phone"]).default("email"),
  privacyConsent: z.literal(true),
  consentVersion: z.literal(CONTACT_CONSENT_VERSION),
  honeypot: z.literal("").default(""),
}).strict().refine((data) => data.preferredContactMethod !== "phone" || Boolean(data.phone), { path: ["phone"], message: "PHONE_REQUIRED" });
export type LeadInput = z.infer<typeof leadInput>;
export const leadPreferenceInput = z.object({ declined: z.literal(true) }).strict();
export type LeadReceipt = { leadId: string; status: "received"; notificationStatus: "sent" | "pending" };
