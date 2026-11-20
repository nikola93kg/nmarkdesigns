import { Container } from "@/components/ui/Container";
import { CookieSettingsButton } from "@/components/layout/CookieSettingsButton";
import { privacyCopy, privacyReferences } from "@/content/privacy";
import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n";

export function PrivacyPage({ locale }: { locale: Locale }) {
  const copy = privacyCopy[locale];
  return (
    <Container className="py-section">
      <header className="max-w-3xl">
        <h1 className="text-display font-bold text-brand">{copy.title}</h1>
        <p className="mt-5 text-body text-muted">{copy.description}</p>
        <p className="mt-4 text-small text-muted">{copy.updated}</p>
      </header>
      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.5fr)] lg:gap-20">
        <nav aria-label={copy.contents} className="min-w-0">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-subheading font-semibold text-brand">{copy.contents}</h2>
            <ul className="mt-4 space-y-1">
              {copy.sections.map(section => <li key={section.id}><a href={`#${section.id}`} className="inline-flex min-h-11 items-center py-2 text-small text-muted underline-offset-4 hover:text-brand hover:underline focus-visible:outline-accent">{section.title}</a></li>)}
            </ul>
          </div>
        </nav>
        <article className="min-w-0 max-w-[65ch] space-y-12 leading-relaxed text-ink">
          {copy.sections.map(section => <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28">
            <h2 id={`${section.id}-title`} className="mb-4 text-subheading font-semibold text-brand">{section.title}</h2>
            <div className="space-y-4">{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          </section>)}
          <section aria-labelledby="privacy-contact-title" className="border-t border-border pt-8">
            <h2 id="privacy-contact-title" className="text-subheading font-semibold text-brand">{copy.contact}</h2>
            <a href={`mailto:${site.email}`} className="mt-3 inline-flex min-h-11 break-all py-2 text-brand underline underline-offset-4 focus-visible:outline-accent">{site.email}</a>
            <div className="mt-4"><CookieSettingsButton locale={locale} className="inline-flex min-h-11 items-center py-2 text-brand underline underline-offset-4 focus-visible:outline-accent" /></div>
          </section>
          <section aria-labelledby="privacy-sources-title">
            <h2 id="privacy-sources-title" className="text-subheading font-semibold text-brand">{copy.sources}</h2>
            <ul className="mt-4 space-y-1">{privacyReferences.map(link => <li key={link.href}><a href={link.href} rel="noreferrer" className="inline-flex min-h-11 items-center py-2 text-small text-brand underline underline-offset-4 focus-visible:outline-accent">{link.label[locale]}</a></li>)}</ul>
          </section>
        </article>
      </div>
    </Container>
  );
}
