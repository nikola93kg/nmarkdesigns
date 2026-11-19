import "server-only";
import { z } from "zod";
import { getSmtpConfig } from "../../contact-delivery";

export function adminConfig() {
  const email = z.email().safeParse(process.env.ADMIN_ALLOWED_EMAIL?.trim().toLowerCase());
  const secret = process.env.AUTH_SECRET;
  const origin = new URL(process.env.AUTH_URL ?? "invalid:");
  const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(origin.hostname);
  if (!email.success || !secret || secret.length < 32 || !getSmtpConfig() || !process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD ||
    (origin.protocol !== "https:" && !(loopback && origin.protocol === "http:")) || origin.username || origin.password || origin.search || origin.hash || origin.pathname !== "/") throw new Error("ADMIN_UNAVAILABLE");
  return { email: email.data, secret, origin: origin.origin, secure: origin.protocol === "https:" };
}
export function adminReady() { try { adminConfig(); return true; } catch { return false; } }
export function isOwnerEmail(email: unknown): boolean {
  return typeof email === "string" && email.trim().toLowerCase() === adminConfig().email;
}
export function safeAdminRedirect(url: string, origin: string): string {
  try {
    const target = new URL(url, origin);
    if (target.origin === origin && /^\/admin\/(sr|en)(\/|$)/.test(target.pathname)) return target.href;
  } catch { /* invalid return path */ }
  return `${origin}/admin/sr/`;
}
