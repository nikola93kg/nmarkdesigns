import Link from "next/link";
import { requireOwnerPage } from "@/lib/chatbot/admin/access";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { adminCopy } from "@/content/chatbot/admin-copy";
import { conversation } from "@/lib/chatbot/admin/queries";
import { idSchema } from "@/lib/chatbot/admin/contracts";
import { isKnowledgeUrl } from "@/content/chatbot/knowledge";
import { AdminDate, Status } from "@/components/admin/Shared";
import { RecordActions } from "@/components/admin/RecordActions";
export default async function Conversation({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params; if (!isLocale(locale) || !idSchema.safeParse(id).success) notFound(); await requireOwnerPage(locale); const copy = adminCopy[locale]; const data = await conversation(id);
  return <div className="max-w-3xl"><Link href={`/admin/${locale}/conversations/`} className="text-small text-brand underline">{copy.back}</Link><h1 className="mt-5 text-heading font-semibold text-brand">{copy.transcript}</h1><p className="mt-2 text-small text-muted"><AdminDate value={data.session.createdAt} locale={locale} /> · {data.session.locale.toUpperCase()}</p><details className="my-6 text-small"><summary className="min-h-11 py-3 font-semibold text-brand">{copy.consent}</summary><p>{data.session.consentVersion} · <AdminDate value={data.session.consentAt} locale={locale} /></p></details>
    <section aria-label={copy.transcript} className="space-y-5">{data.messages.map((message) => <article key={message.id} className={`rounded-control p-4 ${message.role === "user" ? "bg-accent-soft" : "bg-surface"}`}><div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted"><span className="font-semibold text-brand">{message.role === "user" ? copy.user : copy.assistant}</span><AdminDate value={message.createdAt} locale={locale} /><Status value={message.status} locale={locale} /></div><p className="mt-3 whitespace-pre-wrap break-words text-small">{message.content}</p>{message.links?.filter((link) => (isKnowledgeUrl(link.url, "sr") || isKnowledgeUrl(link.url, "en"))).map((link) => <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="mt-3 block text-small text-brand underline underline-offset-4">{link.title}</a>)}</article>)}</section>
    {data.truncated && <p className="mt-4 text-small">{copy.truncated}</p>}<section className="my-8"><h2 className="text-body font-semibold text-brand">{copy.leads}</h2>{data.leads.map((lead) => <Link key={lead.id} href={`/admin/${locale}/leads/${lead.id}/`} className="mt-3 block text-small text-brand underline">{lead.name}</Link>)}</section><RecordActions locale={locale} kind="conversation" id={id} />
  </div>;
}
