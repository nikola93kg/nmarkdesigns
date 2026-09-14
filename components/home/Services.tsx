import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/content/i18n/types";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";

export function Services({ locale, copy }: { locale: Locale; copy: Dictionary["home"]["services"] }) {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-8 bg-surface-muted py-section lg:py-24">
      <Container className="text-center lg:text-left">
        <div className="mb-8 grid gap-4 md:mb-10 lg:grid-cols-2 lg:items-end lg:gap-20">
          <div>
            <p className="mb-4 text-small font-medium text-brand">{copy.eyebrow}</p>
            <h2 id="services-title" className="mx-auto max-w-xl text-heading font-bold whitespace-pre-line text-ink lg:mx-0">{copy.title}</h2>
          </div>
          <div className="mx-auto max-w-lg lg:mx-0">
            <p className="text-pretty text-muted">{copy.description}</p>
            <Link href={localizedPath("services", locale)} className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-brand underline underline-offset-4 hover:text-focus">
              {copy.detailsAction}
              <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <Image
              src="/images/website-maintenance.webp"
              width={1440}
              height={1202}
              sizes="(min-width: 1280px) 560px, (min-width: 768px) 45vw, calc(100vw - 40px)"
              alt={copy.imageAlt}
              className="h-auto w-full rounded-card"
            />
            <div className="mt-5 border-t border-border pt-5">
              <h3 className="text-subheading font-semibold text-ink">{copy.maintenance.title}</h3>
              <p className="mx-auto mt-3 max-w-lg text-pretty text-muted lg:mx-0">{copy.maintenance.description}</p>
            </div>
          </div>
          <ol className="flex flex-col divide-y divide-border border-t border-border">
            {copy.items.map((item, index) => (
              <li key={item.id} className="flex-1 py-6 last:pb-0 lg:grid lg:grid-cols-[2rem_minmax(0,1fr)] lg:content-start lg:gap-x-4 lg:py-8 lg:first:pt-6">
                <span aria-hidden="true" className="mb-2 block text-small font-medium text-muted tabular-nums lg:mb-0 lg:pt-1">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-subheading font-semibold text-brand">{item.title}</h3>
                  <p className="mx-auto mt-3 max-w-lg text-pretty text-muted lg:mx-0">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
