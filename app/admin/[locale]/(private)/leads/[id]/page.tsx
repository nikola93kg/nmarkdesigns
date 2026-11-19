import Link from "next/link";
import { requireOwnerPage } from "@/lib/chatbot/admin/access";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { adminCopy } from "@/content/chatbot/admin-copy";
import { leadCopy } from "@/content/chatbot/lead-copy";
import { lead } from "@/lib/chatbot/admin/queries";
import { idSchema } from "@/lib/chatbot/admin/contracts";
import { AdminDate, Status } from "@/components/admin/Shared";
import { RecordActions } from "@/components/admin/RecordActions";
export default async function Lead({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params; if (!isLocale(locale) || !idSchema.safeParse(id).success) notFound(); await requireOwnerPage(locale); const copy = adminCopy[locale]; const data = await lead(id); const item = data.lead;
  const fields = [[copy.name, `${item.name} · ${item.email}`], [leadCopy[locale].fields.phone, item.phone], [leadCopy[locale].fields.company, item.company], [leadCopy[locale].fields.website, item.website], [copy.service, leadCopy[locale].services[item.service]], [copy.budget, item.budgetRange], [copy.timeframe, item.timeframe], [leadCopy[locale].fields.preferredContactMethod, item.preferredContactMethod === "phone" ? leadCopy[locale].phoneMethod : leadCopy[locale].emailMethod], [leadCopy[locale].fields.projectDescription, item.projectDescription]];
  return <div className="max-w-3xl"><Link href={`/admin/${locale}/leads/`} className="text-small text-brand underline">{copy.back}</Link><h1 className="mt-5 text-heading font-semibold text-brand">{copy.details}</h1><p className="mt-2 text-small text-muted"><AdminDate value={item.createdAt} locale={locale} /> · {item.locale.toUpperCase()}</p><dl className="my-8 space-y-5 rounded-control bg-surface p-5">{fields.map(([label, value]) => <div key={label}><dt className="text-small font-semibold text-brand">{label}</dt><dd className="mt-1 whitespace-pre-wrap break-words text-small">{value || copy.unknown}</dd></div>)}</dl>
    <section className="mb-8 space-y-3 text-small"><h2 className="text-body font-semibold text-brand">{copy.delivery}</h2><Status value={data.notification?.status ?? null} locale={locale} /><p>{copy.attempts}: {data.notification?.attempts ?? 0}</p>{data.notification?.lastErrorCode && <p>{copy.technicalCode}: {data.notification.lastErrorCode}</p>}<h2 className="pt-4 text-body font-semibold text-brand">{copy.consent}</h2><p>{item.consentVersion} · <AdminDate value={item.privacyConsentAt} locale={locale} /></p><Link href={`/admin/${locale}/conversations/${item.sessionId}/`} className="inline-flex min-h-11 items-center text-brand underline">{copy.transcript}</Link></section>
    <RecordActions locale={locale} kind="lead" id={id} status={item.status} note={item.internalNote ?? ""} notificationStatus={data.notification?.status} />
  </div>;
}
