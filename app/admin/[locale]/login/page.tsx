import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { LoginForm } from "@/components/admin/SessionControls";
import { adminCopy } from "@/content/chatbot/admin-copy";
import { isLocale } from "@/lib/i18n";
import { adminReady } from "@/lib/chatbot/admin/config";
import { requireOwner } from "@/lib/chatbot/admin/access";
export default async function Login({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const copy = adminCopy[locale]; const query = await searchParams; const ready = adminReady();
  let signedIn = false; if (ready) { try { await requireOwner(); signedIn = true; } catch { /* Show login, never private data. */ } }
  if (signedIn) redirect(`/admin/${locale}/`);
  return <main className="py-16 sm:py-24"><Container><section className="mx-auto max-w-md rounded-card bg-surface p-6 sm:p-8"><Link href={`/${locale}/`} className="text-body font-semibold text-brand">NMark Designs</Link><h1 className="mt-8 text-heading font-semibold text-brand">{copy.login}</h1>{ready ? <LoginForm locale={locale} initialSent={query.sent === "1"} initialError={Boolean(query.error)} /> : <p role="status" className="mt-6 text-small text-muted">{copy.unavailable}</p>}<nav aria-label={copy.language} className="mt-8 flex gap-5 text-small"><Link href="/admin/sr/login/" lang="sr" aria-current={locale === "sr" ? "page" : undefined}>SR</Link><Link href="/admin/en/login/" lang="en" aria-current={locale === "en" ? "page" : undefined}>EN</Link></nav></section></Container></main>;
}
