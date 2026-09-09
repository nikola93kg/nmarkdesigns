"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/content/i18n/types";
import { locales, type Locale } from "@/lib/i18n";
import { equivalentPath } from "@/lib/routes";

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
  languageLabels: Dictionary["accessibility"]["languageLabels"];
}

export function LanguageSwitcher({ locale, label, languageLabels }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className="shrink-0">
      <ul className="flex items-center divide-x divide-border">
        {locales.map((targetLocale) => {
          const href = equivalentPath(pathname, targetLocale);
          const active = targetLocale === locale;
          const className = `inline-flex min-h-11 min-w-9 items-center justify-center px-2 text-small transition-colors hover:text-focus ${active ? "font-semibold text-brand underline decoration-2 underline-offset-8" : "text-muted"}`;

          return (
            <li key={targetLocale}>
              {href ? (
                <Link
                  href={href}
                  hrefLang={targetLocale}
                  lang={targetLocale}
                  aria-label={languageLabels[targetLocale]}
                  aria-current={active ? "page" : undefined}
                  title={languageLabels[targetLocale]}
                  className={className}
                >
                  {targetLocale.toUpperCase()}
                </Link>
              ) : (
                <span aria-disabled="true" className={className}>
                  {targetLocale.toUpperCase()}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
