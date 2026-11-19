import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SignOut, AdminLanguageSwitch } from "@/components/admin/SessionControls";
import { adminCopy } from "@/content/chatbot/admin-copy";
import { isLocale } from "@/lib/i18n";
import { requireOwner } from "@/lib/chatbot/admin/access";
export default async function PrivateLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isLocale(locale)) notFound();
  try { await requireOwner(); } catch { redirect(`/admin/${locale}/login/`); }
  const copy = adminCopy[locale];
  return <><a href="#admin-main" className="sr-only focus:not-sr-only focus:p-4">{copy.overview}</a><header className="bg-brand text-on-brand"><Container className="flex flex-wrap items-center justify-between gap-4 py-5"><Link href={`/admin/${locale}/`} className="font-semibold">NMark Assistant</Link><SignOut locale={locale} /></Container></header><Container><nav aria-label={copy.title} className="flex flex-wrap gap-x-7 border-b border-border py-3 text-small font-semibold text-brand">{[["", copy.overview], ["conversations/", copy.conversations], ["leads/", copy.leads]].map(([path, label]) => <Link key={path} href={`/admin/${locale}/${path}`} className="min-h-11 py-3 hover:underline underline-offset-4">{label}</Link>)}<AdminLanguageSwitch locale={locale} /></nav><main id="admin-main" tabIndex={-1} className="min-w-0 py-8 sm:py-12">{children}</main></Container></>;
}
