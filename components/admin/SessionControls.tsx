"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { adminCopy } from "@/content/chatbot/admin-copy";
import type { Locale } from "@/lib/i18n";

async function action(name: string, values: Record<string, string>) {
  const csrf = await fetch("/api/auth/csrf/", { cache: "no-store" });
  const { csrfToken } = await csrf.json() as { csrfToken: string };
  if (!csrf.ok || !csrfToken) throw new Error("AUTH_FAILED");
  const response = await fetch(`/api/auth/${name}/`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", "X-Auth-Return-Redirect": "1" }, body: new URLSearchParams({ ...values, csrfToken }) });
  const data = await response.json() as { url?: string };
  if (!response.ok || !data.url || new URL(data.url, window.location.origin).searchParams.has("error")) throw new Error("AUTH_FAILED");
  return data.url;
}
export function LoginForm({ locale, initialSent, initialError }: { locale: Locale; initialSent: boolean; initialError: boolean }) {
  const copy = adminCopy[locale]; const [state, setState] = useState<"idle" | "busy" | "sent" | "error">(initialSent ? "sent" : initialError ? "error" : "idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (state === "busy") return;
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim(); setState("busy");
    try { await action("signin/nodemailer", { email, callbackUrl: `/admin/${locale}/` }); setState("sent"); }
    catch { setState("error"); }
  }
  return <form onSubmit={(event) => void submit(event)} className="mt-6 space-y-4">
    <label className="block text-small font-medium text-brand" htmlFor="admin-email">{copy.email}</label>
    <input id="admin-email" name="email" type="email" required autoComplete="email" maxLength={254} className="min-h-12 w-full rounded-control border border-border px-3 py-2" />
    <Button type="submit" disabled={state === "busy"} className="w-full">{state === "busy" ? copy.loading : copy.sendLink}</Button>
    {state === "sent" && <p role="status" className="text-small">{copy.sent}</p>}
    {state === "error" && <p role="alert" className="text-small">{copy.error}</p>}
  </form>;
}
export function SignOut({ locale }: { locale: Locale }) {
  const [busy, setBusy] = useState(false); const [error, setError] = useState(false); const copy = adminCopy[locale];
  return <div><button disabled={busy} className="min-h-11 text-small underline underline-offset-4 disabled:opacity-50" onClick={async () => { setBusy(true); try { await action("signout", { callbackUrl: `/admin/${locale}/login/` }); window.location.replace(`${window.location.origin}/admin/${locale}/login/`); } catch { setError(true); setBusy(false); } }}>{busy ? copy.loading : copy.signOut}</button>{error && <p role="alert" className="text-small">{copy.error}</p>}</div>;
}

export function AdminLanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname(); const target = locale === "sr" ? "en" : "sr";
  return <Link href={pathname.replace(/^\/admin\/(sr|en)(\/|$)/, `/admin/${target}$2`)} className="ml-auto min-h-11 py-3" aria-label={adminCopy[locale].language}>{target.toUpperCase()}</Link>;
}
