import { ArrowUpRight } from "lucide-react";
import { CopyPartnerCode } from "@/components/ui/CopyPartnerCode";
import { HostingerBadge } from "@/components/ui/HostingerBadge";
import { HostingerLink } from "@/components/ui/HostingerLink";
import { getHostingerCopy, hostingerPartner } from "@/content/partners";
import type { Locale } from "@/lib/i18n";

export function HostingerOffer({ locale, placement, id = hostingerPartner.detailsAnchor }: {
  locale: Locale;
  placement: "pricing" | "maintenance" | "blog";
  id?: string;
}) {
  const copy = getHostingerCopy(locale);

  return (
    <aside id={id} data-hostinger-offer aria-label={copy.title} className="mt-10 scroll-mt-24 rounded-card border border-border bg-surface-muted p-6 text-left md:p-8">
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <HostingerBadge locale={locale} />
        <HostingerLink
          locale={locale}
          placement={placement}
          className="inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-control border border-border bg-surface px-5 py-3 text-small font-semibold text-brand transition-colors hover:border-brand hover:bg-accent-soft focus-visible:outline-accent"
        >
          {copy.offerAction}<ArrowUpRight aria-hidden="true" size={16} className="shrink-0" />
        </HostingerLink>
      </div>
      <h3 className="mt-5 text-subheading font-semibold text-ink">{copy.title}</h3>
      <p className="mt-3 max-w-3xl text-small text-muted">{copy.description}</p>
      <p className="mt-4 max-w-3xl text-small font-semibold text-ink">{copy.eligibility}</p>
      <p className="mt-2 max-w-3xl text-small text-muted">{copy.exclusions}</p>
      <p className="mt-2 max-w-3xl text-small text-muted">{copy.renewal}</p>
      <div className="mt-5 border-t border-border pt-5">
        <p className="mb-3 max-w-3xl text-small text-muted">{copy.linkExplanation}</p>
        <CopyPartnerCode locale={locale} placement={placement} />
      </div>
      <p className="mt-3 max-w-3xl text-small text-muted">{copy.disclosure}</p>
      <a href={hostingerPartner.termsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-11 items-center gap-2 text-small font-semibold text-brand underline underline-offset-4 focus-visible:outline-accent">
        {copy.termsAction}<ArrowUpRight aria-hidden="true" size={16} />
        <span className="sr-only"> ({copy.newTab})</span>
      </a>
    </aside>
  );
}
