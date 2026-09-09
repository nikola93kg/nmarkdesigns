import { ArrowUp, Camera, Mail, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Navigation } from "@/components/layout/Navigation";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/content/i18n/types";
import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { navigationItem, navigationOrder } from "@/lib/routes";

const contactLinkClass =
  "inline-flex min-h-11 items-center gap-3 text-small text-on-brand-muted transition-colors hover:text-on-brand focus-visible:outline-accent";

export function Footer({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  const footerNavigation = [...navigationOrder, "pricing" as const].map(
    (route) => navigationItem(route, locale, copy.navigation[route]),
  );

  return (
    <footer className="bg-brand text-on-brand [&_a:focus-visible]:outline-accent">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 md:py-16 lg:grid-cols-[auto_1.4fr_1fr_1.1fr] lg:gap-12">
        <div>
          <Logo variant="seal" locale={locale} label={copy.accessibility.homeLink} />
        </div>
        <div>
          <p className="text-base font-semibold" translate="no">{site.name}</p>
          <p className="mt-4 max-w-sm text-small leading-7 text-on-brand-muted">
            {copy.footer.description}
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-base font-semibold">{copy.footer.quickLinks}</h2>
          <Navigation
            items={footerNavigation}
            label={copy.accessibility.footerNavigation}
            variant="footer"
          />
        </div>
        <div>
          <h2 className="mb-3 text-base font-semibold">{copy.footer.contact}</h2>
          <address className="flex flex-col items-start not-italic">
            <a href={site.phone.href} className={contactLinkClass}>
              <Phone className="size-4 shrink-0" aria-hidden="true" />
              {site.phone.label}
            </a>
            <a href={`mailto:${site.email}`} className={contactLinkClass}>
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              <span className="break-all">{site.email}</span>
            </a>
          </address>
          <ul className="mt-3 flex flex-wrap gap-x-5">
            <li>
              <a href={site.instagramUrl} className={contactLinkClass}>
                <Camera className="size-4 shrink-0" aria-hidden="true" />
                Instagram
              </a>
            </li>
            <li>
              <a href={site.whatsappUrl} className={contactLinkClass}>
                <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-border-inverse">
        <Container className="flex min-h-20 items-center justify-between gap-4 py-4">
          <p className="text-small text-on-brand-muted">
            &copy; {new Date().getFullYear()} {site.name}. {copy.footer.copyright}
          </p>
          <a
            href="#top"
            aria-label={copy.accessibility.backToTop}
            title={copy.accessibility.backToTop}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border-inverse transition-colors hover:border-accent hover:bg-brand-hover"
          >
            <ArrowUp className="size-5" aria-hidden="true" />
          </a>
        </Container>
      </div>
    </footer>
  );
}
