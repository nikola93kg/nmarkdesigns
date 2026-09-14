import { Camera, Mail, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Navigation } from "@/components/layout/Navigation";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/content/i18n/types";
import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { navigationItem } from "@/lib/routes";

const contactLinkClass =
    "inline-flex min-h-9 items-center justify-center gap-3 text-center text-small text-on-brand-muted transition-colors hover:text-on-brand focus-visible:outline-accent lg:justify-start lg:text-left";

const socialLinkClass =
    "inline-flex min-h-10 w-full items-center justify-center gap-3 rounded-full border border-border-inverse px-4 text-center text-small text-on-brand-muted transition-colors hover:border-on-brand-muted hover:text-on-brand focus-visible:outline-accent lg:justify-start lg:text-left";

export function Footer({
                         locale,
                         copy,
                       }: {
  locale: Locale;
  copy: Dictionary;
}) {
  const footerNavigation = (
      ["home", "services", "portfolio", "pricing", "contact"] as const
  ).map((route) =>
      navigationItem(
          route,
          locale,
          route === "portfolio"
              ? copy.footer.portfolioLabel
              : copy.navigation[route],
      ),
  );

  return (
      <footer
          aria-label={copy.footer.label}
          className="bg-brand text-on-brand [&_a:focus-visible]:outline-accent"
      >
        <Container
            className="
          grid justify-items-center gap-10 py-14 text-center
          lg:grid-cols-[230px_1.35fr_0.8fr_1fr]
          lg:items-start
          lg:gap-14
          lg:justify-items-stretch
          lg:text-left
        "
        >
          {/* Logo */}
          <div className="flex justify-center lg:justify-start">
            <Logo
                variant="seal"
                locale={locale}
                label={copy.accessibility.homeLink}
            />
          </div>

          {/* About */}
          <div>
            <h2
                className="text-[19px] font-semibold"
                translate="no"
            >
              NMarkDesigns
            </h2>

            <p className="mt-3 max-w-[400px] text-small font-medium leading-7 text-on-brand">
              {copy.footer.description}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h2 className="mb-3 text-[19px] font-semibold">
              {copy.footer.quickLinks}
            </h2>

            <Navigation
                items={footerNavigation}
                label={copy.accessibility.footerNavigation}
                variant="footer"
            />
          </div>

          {/* Contact */}
          <div>
            <h2 className="mb-3 text-[19px] font-semibold">
              {copy.footer.contact}
            </h2>

            <address className="flex flex-col items-center gap-1 not-italic lg:items-start">
              <a
                  href={site.phone.href}
                  className={contactLinkClass}
              >
                <Phone
                    className="size-4 shrink-0"
                    aria-hidden="true"
                />
                {site.phone.label}
              </a>

              <a
                  href={`mailto:${site.email}`}
                  className={contactLinkClass}
              >
                <Mail
                    className="size-4 shrink-0"
                    aria-hidden="true"
                />
                <span>{site.email}</span>
              </a>
            </address>

            <ul
                aria-label={copy.footer.socialLabel}
                className="mt-3 flex max-w-[290px] flex-col gap-2"
            >
              <li>
                <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialLinkClass}
                >
                  <Camera
                      className="size-4 shrink-0"
                      aria-hidden="true"
                  />
                  Instagram
                </a>
              </li>

              <li>
                <a
                    href={site.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialLinkClass}
                >
                  <MessageCircle
                      className="size-4 shrink-0"
                      aria-hidden="true"
                  />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </Container>

        <div className="border-t border-border-inverse">
          <Container className="flex min-h-[72px] items-center justify-center py-4 text-center">
            <p className="text-small text-on-brand-muted">
              <span translate="no">nmarkdesigns</span>{" "}
              &copy; {copy.footer.copyright}
            </p>
          </Container>
        </div>
      </footer>
  );
}
