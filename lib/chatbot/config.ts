import "server-only";

import { privacyPublication, privacySegments } from "../../content/privacy";
import { budgetConfig } from "./budget";

export function chatEnabled() {
  return process.env.CHAT_ENABLED === "true" || (process.env.NODE_ENV === "development" && process.env.CHAT_ENABLED !== "false");
}
export function chatPreviewEnabled() {
  return process.env.NODE_ENV === "development" && chatEnabled() && process.env.CHAT_PREVIEW !== "false";
}
export function positiveInt(value: string | undefined, fallback: number, max: number): number {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? Math.min(parsed, max) : fallback;
}
export function chatConfig() {
  budgetConfig();
  const origin = process.env.CHAT_ORIGIN;
  const secret = process.env.CHAT_IDENTITY_SECRET;
  const model = process.env.OPENAI_MODEL;
  const key = process.env.OPENAI_API_KEY;
  const daily = positiveInt(process.env.CHAT_MAX_CALLS_DAY, 0, 10000);
  const monthly = positiveInt(process.env.CHAT_MAX_CALLS_MONTH, 0, 100000);
  // Fail closed until the owner explicitly configures limits and privacy URLs.
  if (chatPreviewEnabled() || !chatEnabled() || !origin || !secret || secret.length < 32 || !model || !key || !daily || !monthly || !privacyUrl("sr") || !privacyUrl("en")) throw new Error("UNAVAILABLE");
  return { origin: new URL(origin).origin, secret, model, key, daily, monthly,
    timeoutMs: positiveInt(process.env.CHAT_TIMEOUT_MS, 35000, 45000),
    maxOutputTokens: positiveInt(process.env.CHAT_MAX_OUTPUT_TOKENS, 600, 1200),
  };
}
/** Explicit development-only opt-in; never substitutes a production privacy policy. */
export function localTestOrigin(): string | null {
  if (process.env.NODE_ENV !== "development" || process.env.CHAT_LOCAL_TEST !== "true") return null;
  try {
    const url = new URL(process.env.CHAT_ORIGIN ?? "");
    if (url.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) && !url.username && !url.password && url.pathname === "/" && !url.search && !url.hash) return url.origin;
  } catch { /* invalid local origin fails closed */ }
  return null;
}
export function privacyUrl(locale: "sr" | "en"): string | null {
  const localOrigin = localTestOrigin();
  if (localOrigin) return `${localOrigin}/api/chat/local-notice/?locale=${locale}`;
  const value = process.env[`CHAT_PRIVACY_URL_${locale.toUpperCase()}`];
  try {
    const url = new URL(value ?? "");
    const normalizedPath = `${url.pathname.replace(/\/$/, "")}/`;
    if (!privacyPublication.approved && Object.entries(privacySegments).map(([language, segment]) => `/${language}/${segment}/`).includes(normalizedPath)) return null;
    return url.protocol === "https:" && url.hostname === "nmarkdesigns.com" && !url.username && !url.password && !url.search && !url.hash ? url.href : null;
  } catch { return null; }
}
