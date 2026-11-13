import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { headers } from "next/headers";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BackToTop } from "@/components/ui/BackToTop";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/content/i18n";
import { isLocale, localeSettings, type Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-dm-sans",
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "404 — Stranica nije pronađena | NMark Designs",
  description: "Stranica koju tražite ne postoji ili je link pogrešno unet.",
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const headerList = await headers();
  const langHeader = headerList.get("x-not-found-lang");
  const referer = headerList.get("referer") || "";
  const detectedLocale = langHeader === "en" || referer.includes("/en/") ? "en" : "sr";
  const locale: Locale = isLocale(detectedLocale) ? detectedLocale : "sr";
  const copy = await getDictionary(locale);

  const homeHref = localizedPath("home", locale);
  const servicesHref = localizedPath("services", locale);
  const portfolioHref = localizedPath("portfolio", locale);
  const contactHref = localizedPath("contact", locale);

  const alternateLocale: Locale = locale === "sr" ? "en" : "sr";
  const alternateHref = localizedPath("home", alternateLocale);

  const isSr = locale === "sr";

  return (
    <html lang={localeSettings[locale].language} className={dmSans.variable}>
      <body className="flex min-h-dvh flex-col bg-surface font-sans text-brand antialiased selection:bg-brand selection:text-on-brand" suppressHydrationWarning>
        <a
          href="#main-content"
          className="fixed top-4 left-gutter z-50 -translate-y-32 rounded-control bg-brand px-5 py-3 text-on-brand focus:translate-y-0"
        >
          {copy.accessibility.skipLink}
        </a>

        {/* Existing site header with authentic NMark logo, navigation, and language switcher */}
        <Header locale={locale} copy={copy} />

        <main id="main-content" tabIndex={-1} className="flex flex-1 items-center justify-center py-16 md:py-24">
          <Container className="max-w-3xl text-center">
            {/* Subtle 404 Accent */}
            <span className="text-display font-black tracking-widest text-brand/20 select-none block text-7xl md:text-8xl">
              404
            </span>

            <h1 className="mt-2 text-heading font-extrabold tracking-tight text-brand md:text-5xl">
              {isSr ? "Stranica nije pronađena" : "Page not found"}
            </h1>

            <p className="mt-4 text-lead text-muted leading-relaxed max-w-lg mx-auto">
              {isSr
                ? "Stranica koju tražite ne postoji ili je link pogrešno unet."
                : "The page you are looking for does not exist or the URL was entered incorrectly."}
            </p>

            {/* Quick Navigation Cards */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3 text-left">
              <Link
                href={homeHref}
                className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-5 shadow-sm transition-all duration-200 hover:border-brand/40 hover:shadow-md"
              >
                <div>
                  <span className="text-small font-bold text-brand group-hover:underline">
                    {copy.navigation.home}
                  </span>
                  <p className="mt-1 text-xs text-muted">
                    {isSr ? "Povratak na glavnu stranu" : "Return to studio homepage"}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand">
                  <span>{isSr ? "Otvori" : "Explore"}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>

              <Link
                href={servicesHref}
                className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-5 shadow-sm transition-all duration-200 hover:border-brand/40 hover:shadow-md"
              >
                <div>
                  <span className="text-small font-bold text-brand group-hover:underline">
                    {copy.navigation.services}
                  </span>
                  <p className="mt-1 text-xs text-muted">
                    {isSr ? "Sajtovi, prodavnice i Next.js" : "Websites, stores & Next.js"}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand">
                  <span>{isSr ? "Pregledaj" : "View services"}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>

              <Link
                href={portfolioHref}
                className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-5 shadow-sm transition-all duration-200 hover:border-brand/40 hover:shadow-md"
              >
                <div>
                  <span className="text-small font-bold text-brand group-hover:underline">
                    {copy.navigation.portfolio}
                  </span>
                  <p className="mt-1 text-xs text-muted">
                    {isSr ? "Odabrani realizovani projekti" : "Selected client case studies"}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand">
                  <span>{isSr ? "Pogledaj radove" : "View projects"}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </div>

            {/* Language Switch Prompt */}
            <div className="mt-8 text-xs text-muted">
              {isSr ? (
                <span>
                  Looking for the English version?{" "}
                  <Link href={alternateHref} className="font-semibold text-brand underline underline-offset-4 hover:text-focus">
                    Switch to English (EN)
                  </Link>
                </span>
              ) : (
                <span>
                  Tražite verziju na srpskom jeziku?{" "}
                  <Link href={alternateHref} className="font-semibold text-brand underline underline-offset-4 hover:text-focus">
                    Pređite na srpski (SR)
                  </Link>
                </span>
              )}
            </div>

            {/* Direct Contact Prompt */}
            <div className="mt-8 border-t border-border pt-6 text-center">
              <p className="text-small text-muted">
                {isSr
                  ? "Tražite nešto specifično ili vam je potrebna pomoć? "
                  : "Looking for something specific or need assistance? "}
                <Link
                  href={contactHref}
                  className="font-semibold text-brand underline underline-offset-4 hover:text-focus transition-colors"
                >
                  {isSr ? "Javite nam se direktno" : "Contact us directly"}
                </Link>
                .
              </p>
            </div>
          </Container>
        </main>

        {/* Existing site footer */}
        <Footer locale={locale} copy={copy} />
        <BackToTop />
        <CookieConsent locale={locale} />
      </body>
    </html>
  );
}
