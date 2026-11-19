import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import "../../globals.css";
const font = DM_Sans({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-dm-sans", adjustFontFallback: false, fallback: ["system-ui", "sans-serif"] });
export const metadata: Metadata = { title: "NMark Assistant Admin", robots: { index: false, follow: false }, referrer: "no-referrer" };
export const dynamic = "force-dynamic";
export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} className={font.variable}>
      {/* Browser extensions can add body attributes before React hydrates. */}
      <body className="min-h-dvh bg-surface-muted" suppressHydrationWarning>{children}</body>
    </html>
  );
}
