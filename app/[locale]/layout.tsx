import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/content/site";
import { getDictionary } from "@/content/i18n";
import { isLocale, locales, localeSettings } from "@/lib/i18n";
import { pageRobots } from "@/lib/seo-config";
import "../globals.css";
import {BackToTop} from "@/components/ui/BackToTop";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-dm-sans",
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/web-app-manifest-192x192.png",
    apple: [{ url: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" }],
  },
  robots: pageRobots,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = await getDictionary(locale);

  return (
    <html lang={localeSettings[locale].language} className={dmSans.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main-content"
          className="fixed top-4 left-gutter z-50 -translate-y-32 rounded-control bg-brand px-5 py-3 text-on-brand focus:translate-y-0"
        >
          {copy.accessibility.skipLink}
        </a>
        <Header locale={locale} copy={copy} />
        <main id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Footer locale={locale} copy={copy} />
      <BackToTop />
      </body>
    </html>
  );
}
