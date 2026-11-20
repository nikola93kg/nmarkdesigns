import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LoginForm } from "@/components/admin/SessionControls";
import { adminCopy } from "@/content/chatbot/admin-copy";
import { isLocale, locales } from "@/lib/i18n";
import { adminReady } from "@/lib/chatbot/admin/config";
import { requireOwner } from "@/lib/chatbot/admin/access";

export default async function Login({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const copy = adminCopy[locale]; const query = await searchParams; const ready = adminReady();
  let signedIn = false; if (ready) { try { await requireOwner(); signedIn = true; } catch { /* Show login, never private data. */ } }
  if (signedIn) redirect(`/admin/${locale}/`);

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-brand py-12 sm:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src="/images/login-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-left sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand/35 via-brand/20 to-brand/65" />
      </div>

      <Container className="relative z-10 w-full">
        <section
          aria-labelledby="admin-login-title"
          className="mx-auto w-full max-w-[27rem] overflow-hidden rounded-card bg-surface shadow-[0_28px_72px_-16px_rgba(17,0,36,0.8)] ring-1 ring-white/15"
        >
          <div aria-hidden="true" className="h-1.5 w-full bg-gradient-to-r from-focus via-accent to-focus" />

          <div className="flex items-center justify-between gap-4 border-b border-border bg-surface-muted/80 px-6 py-4 sm:px-8">
            <Link
              href={`/${locale}/`}
              className="inline-flex min-h-11 items-center text-brand transition-opacity hover:opacity-80"
            >
              <Image
                src="/logo/nmark-wordmark.png"
                alt="NMark Designs"
                width={785}
                height={234}
                sizes="128px"
                className="h-auto w-28 sm:w-32"
              />
            </Link>

            <nav aria-label={copy.language} className="inline-flex items-center rounded-control border border-border bg-surface p-0.5 text-small">
              {locales.map((targetLocale) => {
                const active = targetLocale === locale;
                return (
                  <Link
                    key={targetLocale}
                    href={`/admin/${targetLocale}/login/`}
                    lang={targetLocale}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex min-h-9 min-w-10 items-center justify-center rounded-[calc(var(--radius-control)-2px)] px-2.5 text-xs font-semibold transition-colors ${
                      active
                        ? "bg-brand text-on-brand"
                        : "text-ink hover:bg-accent-soft hover:text-brand"
                    }`}
                  >
                    {targetLocale.toUpperCase()}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="px-6 py-7 sm:px-8 sm:py-8">
            <div className="inline-flex items-center gap-2 rounded-control bg-accent-soft px-3 py-1 text-xs font-semibold text-brand">
              <Lock aria-hidden="true" className="size-3.5 text-focus" />
              <span>NMark Assistant</span>
            </div>

            <h1 id="admin-login-title" className="mt-4 text-2xl font-bold tracking-tight text-brand sm:text-[1.75rem]">
              {copy.login}
            </h1>
            <p className="mt-2 text-small leading-relaxed text-muted">
              {copy.loginSubtitle}
            </p>

            {ready ? (
              <LoginForm locale={locale} initialSent={query.sent === "1"} initialError={Boolean(query.error)} />
            ) : (
              <p role="status" className="mt-6 rounded-control border border-brand/20 bg-surface-muted px-4 py-3 text-small font-medium text-brand">
                {copy.unavailable}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-border bg-surface-muted/70 px-6 py-3.5 text-small sm:px-8">
            <Link
              href={`/${locale}/`}
              className="inline-flex min-h-11 items-center gap-1.5 font-medium text-ink transition-colors hover:text-brand"
            >
              <ArrowLeft aria-hidden="true" className="size-4 shrink-0" />
              <span>{copy.backToSite}</span>
            </Link>
            <span className="text-xs font-medium text-muted" translate="no">
              nmarkdesigns.com
            </span>
          </div>
        </section>
      </Container>
    </main>
  );
}
