import Link from "next/link";
import { requireOwnerPage } from "@/lib/chatbot/admin/access";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { adminCopy } from "@/content/chatbot/admin-copy";
import { conversations } from "@/lib/chatbot/admin/queries";
import { listFilters } from "@/lib/chatbot/admin/contracts";
import { AdminDate, DateFilters, FilterActions, Pagination } from "@/components/admin/Shared";
export default async function Conversations({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); await requireOwnerPage(locale); const copy = adminCopy[locale]; const path = `/admin/${locale}/conversations/`;
  const query = Object.fromEntries(Object.entries(await searchParams).filter(([, v]) => Boolean(v))); const parsed = listFilters.safeParse(query);
  if (!parsed.success) return <p>{copy.errors.INVALID_INPUT} <Link href={path}>{copy.reset}</Link></p>;
  const filters = parsed.data; const data = await conversations(filters);
  return <><h1 className="text-heading font-semibold text-brand">{copy.conversations}</h1><form className="my-6 flex flex-wrap items-end gap-4"><DateFilters locale={locale} from={filters.from} to={filters.to} /><label className="text-small">{copy.language}<select name="locale" defaultValue={filters.locale ?? ""} className="mt-1 block min-h-11 rounded-control border border-border bg-surface px-3"><option value="">{copy.all}</option><option value="sr">SR</option><option value="en">EN</option></select></label><label className="text-small">{copy.inquiry}<select name="hasLead" defaultValue={filters.hasLead ?? ""} className="mt-1 block min-h-11 rounded-control border border-border bg-surface px-3"><option value="">{copy.all}</option><option value="yes">{copy.withLead}</option><option value="no">{copy.withoutLead}</option></select></label><FilterActions locale={locale} path={path} /></form>
    {!data.items.length ? <p className="py-8 text-muted">{copy.empty}</p> : <div className="overflow-x-auto rounded-control bg-surface"><table className="w-full min-w-[42rem] text-left text-small"><thead><tr className="border-b border-border text-brand">{[copy.date, copy.language, copy.messages, copy.inquiry, copy.lastActivity, copy.status].map((label) => <th key={label} scope="col" className="p-4">{label}</th>)}</tr></thead><tbody>{data.items.map((item) => <tr key={item.id} className="border-b border-border last:border-0"><td className="p-4"><Link href={`${path}${item.id}/`} className="font-semibold text-brand underline underline-offset-4"><AdminDate value={item.createdAt} locale={locale} /></Link></td><td className="p-4 uppercase">{item.locale}</td><td className="p-4 tabular-nums">{item.messageCount}</td><td className="p-4">{item.hasLead ? copy.withLead : copy.withoutLead}</td><td className="p-4"><AdminDate value={item.lastActivityAt} locale={locale} /></td><td className="p-4">{item.expiresAt < new Date() ? copy.expired : copy.active}</td></tr>)}</tbody></table></div>}
    <Pagination locale={locale} path={path} filters={filters} next={data.nextCursor} />
  </>;
}
