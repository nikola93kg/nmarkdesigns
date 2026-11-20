import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { termsCopy } from "@/content/terms";
import type { Dictionary } from "@/content/i18n/types";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";

export function TermsPage({ locale, navigation }: { locale: Locale; navigation: Dictionary["navigation"] }) {
  const copy = termsCopy[locale];

  return (
    <Container className="py-section">
      <article className="max-w-3xl">
        <h1 className="text-display font-bold text-brand">{navigation.terms}</h1>
        <p className="mt-5 text-body text-muted">{copy.description}</p>
        <div className="mt-12 max-w-[65ch] space-y-8 leading-relaxed text-ink">
          {copy.sections.map(({ title, text }) => (
            <section key={title}>
              <h2 className="mb-3 text-subheading font-semibold text-brand">{title}</h2>
              <p>{text}</p>
            </section>
          ))}
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6">
          {(["pricing", "privacy", "contact"] as const).map((route) => (
            <li key={route}>
              <Link href={localizedPath(route, locale)} className="inline-flex min-h-11 items-center text-brand underline underline-offset-4">
                {navigation[route]}
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </Container>
  );
}
