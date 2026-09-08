import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/content/site";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={site.language} className={dmSans.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main-content"
          className="fixed top-4 left-gutter z-50 -translate-y-32 rounded-control bg-brand px-5 py-3 text-on-brand focus:translate-y-0"
        >
          Pređi na sadržaj
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
