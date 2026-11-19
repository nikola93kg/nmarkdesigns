import Link from "next/link";
import { requireOwnerPage } from "@/lib/chatbot/admin/access";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { adminCopy } from "@/content/chatbot/admin-copy";
import { leadCopy } from "@/content/chatbot/lead-copy";
import { leads } from "@/lib/chatbot/admin/queries";
import { leadFilters } from "@/lib/chatbot/admin/contracts";
import { leadStatuses } from "@/lib/chatbot/lead-contracts";
import { AdminDate, DateFilters, FilterActions, Pagination, Status } from "@/components/admin/Shared";
export default async function Leads({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); await requireOwnerPage(locale); const copy = adminCopy[locale]; const path = `/admin/${locale}/leads/`;
  const parsed = leadFilters.safeParse(Object.fromEntries(Object.entries(await searchParams).filter(([, v]) => Boolean(v))));
  if (!parsed.success) return <p>{copy.errors.INVALID_INPUT} <Link href={path}>{copy.reset}</Link></p>;
  const filters = parsed.data; const data = await leads(filters);
  return <><h1 className="text-heading font-semibold text-brand">{copy.leads}</h1><form className="my-6 flex flex-wrap items-end gap-4"><DateFilters locale={locale} from={filters.from} to={filters.to} /><label className="text-small">{copy.status}<select name="status" defaultValue={filters.status ?? ""} className="mt-1 block min-h-11 rounded-control border border-border bg-surface px-3"><option value="">{copy.all}</option>{leadStatuses.map((status) => <option key={status} value={status}>{copy.statuses[status]}</option>)}</select></label><label className="text-small">{copy.delivery}<select name="delivery" defaultValue={filters.delivery ?? ""} className="mt-1 block min-h-11 rounded-control border border-border bg-surface px-3"><option value="">{copy.all}</option><option value="attention">{copy.attention}</option></select></label><FilterActions locale={locale} path={path} /></form>
    {!data.items.length ? <p className="py-8 text-muted">{copy.empty}</p> : <div className="overflow-x-auto rounded-control bg-surface"><table className="w-full min-w-[48rem] text-left text-small"><thead><tr className="border-b border-border text-brand">{[copy.name, copy.date, copy.service, copy.budget, copy.timeframe, copy.status, copy.delivery].map((label) => <th key={label} scope="col" className="p-4">{label}</th>)}</tr></thead><tbody>{data.items.map((item) => <tr key={item.id} className="border-b border-border last:border-0"><td className="p-4"><Link href={`${path}${item.id}/`} className="font-semibold text-brand underline underline-offset-4">{item.name}</Link><span className="mt-1 block break-all text-muted">{item.email}</span></td><td className="p-4"><AdminDate value={item.createdAt} locale={locale} /></td><td className="p-4">{leadCopy[locale].services[item.service]}</td><td className="p-4">{item.budgetRange || copy.unknown}</td><td className="p-4">{item.timeframe || copy.unknown}</td><td className="p-4"><Status value={item.status} locale={locale} /></td><td className="p-4"><Status value={item.notificationStatus} locale={locale} /></td></tr>)}</tbody></table></div>}
    <Pagination locale={locale} path={path} filters={filters} next={data.nextCursor} />
  </>;
}
