import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { site } from "@/content/site";
import { getDictionary } from "@/content/i18n";
import { isLocale, locales, localeSettings } from "@/lib/i18n";
import { pageRobots } from "@/lib/seo-config";
import "../globals.css";
import { BackToTop } from "@/components/ui/BackToTop";
import { ChatLauncher } from "@/components/chatbot/ChatLauncher";
import { chatEnabled, chatPreviewEnabled, privacyUrl } from "@/lib/chatbot/config";
import { recommendedLinks } from "@/content/chatbot/knowledge";
import { CookieConsent } from "@/components/layout/CookieConsent";

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
  verification: {
    google: "6Xv8e2FJ-f85FWS7ql7WzFIFeZDTlLawCJ2LNP475s8",
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
      <head>
        <Script id="ga4-consent-default" strategy="beforeInteractive">
          {`
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
window.gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
          `}
        </Script>
      </head>
      {/* Grammarly can inject body attributes before React hydrates. */}
      <body className="flex min-h-dvh flex-col" suppressHydrationWarning>
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
        {chatEnabled() && <ChatLauncher locale={locale} previewLinks={chatPreviewEnabled() ? recommendedLinks("portfolio projects projekti", locale) : undefined} privacyUrls={{ sr: privacyUrl("sr"), en: privacyUrl("en") }} />}
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        <CookieConsent locale={locale} />
      </body>
    </html>
  );
}
