import { Mail, MessageCircle, Phone } from "lucide-react";
import { submitContact } from "@/app/[locale]/[page]/actions";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import background from "@/components/ui/GridBackground.module.css";
import type { Dictionary } from "@/content/i18n/types";
import { site } from "@/content/site";
import { contactDelivery } from "@/lib/contact-delivery";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";

export function ContactPage({ locale, copy }: { locale: Locale; copy: Dictionary["contact"] }) {
  const methods = [
    { label: copy.details.email, value: site.email, href: `mailto:${site.email}`, icon: Mail },
    { label: copy.details.phone, value: site.phone.label, href: site.phone.href, icon: Phone },
    { label: copy.details.whatsapp, value: site.phone.label, href: site.whatsappUrl, icon: MessageCircle },
  ];

  return (
    <>
      <section aria-labelledby="contact-title" className={`${background.grid} ${background.inverseGrid} bg-brand py-12 text-on-brand md:py-16 lg:py-20`}>
        <Container className="grid gap-6 md:grid-cols-2 md:items-end md:gap-12">
          <div>
            <p className="mb-4 text-small font-medium text-on-brand-muted">{copy.intro.eyebrow}</p>
            <h1 id="contact-title" className="text-display font-bold">{copy.intro.title}</h1>
          </div>
          <p className="max-w-lg text-pretty text-on-brand-muted">{copy.intro.description}</p>
        </Container>
      </section>
      <Container className="grid gap-12 py-section md:grid-cols-[1fr_1.4fr] md:gap-12 lg:gap-24">
        <section aria-labelledby="contact-details-title">
          <h2 id="contact-details-title" className="text-subheading font-bold">{copy.details.title}</h2>
          <p className="mt-4 max-w-sm text-pretty text-muted">{copy.details.description}</p>
          <address className="mt-8 not-italic">
            <ul className="divide-y divide-border border-y border-border">
              {methods.map(({ label, value, href, icon: Icon }) => (
                <li key={href}>
                  <a href={href} className="group flex min-h-12 items-start gap-4 py-5 text-brand">
                    <Icon size={20} className="mt-1 shrink-0" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-small text-muted">{label}</span>
                      <span className="mt-1 block break-words font-medium underline-offset-4 group-hover:underline">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </address>
        </section>
        <ContactForm key={locale} copy={copy.form} action={submitContact.bind(null, locale)} permalink={localizedPath("contact", locale)} deliveryAvailable={contactDelivery.available} />
      </Container>
    </>
  );
}
