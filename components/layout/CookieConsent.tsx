"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { X } from "lucide-react";
import { consentCopy } from "@/content/consent";
import {
  getConsentSnapshot,
  getServerSnapshot,
  setConsentPreferences,
  subscribeToConsent,
} from "@/lib/analytics";

interface CookieConsentProps {
  locale: "sr" | "en";
}

function subscribeClientOnly() {
  return () => {};
}

export function CookieConsent({ locale }: CookieConsentProps) {
  const isClient = useSyncExternalStore(
    subscribeClientOnly,
    () => true,
    () => false,
  );
  const status = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getServerSnapshot,
  );

  const [dismissedBanner, setDismissedBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const copy = consentCopy[locale] || consentCopy.sr;
  const showBanner = isClient && status === "unspecified" && !dismissedBanner && !showModal;

  useEffect(() => {
    function onOpenModal() {
      setShowModal(true);
    }

    window.addEventListener("nmark-open-consent-modal", onOpenModal);
    return () => {
      window.removeEventListener("nmark-open-consent-modal", onOpenModal);
    };
  }, []);

  // Keyboard navigation: Escape key closes modal
  useEffect(() => {
    if (!showModal) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowModal(false);
        triggerRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showModal]);

  if (!isClient) return null;

  function handleAccept() {
    setConsentPreferences("granted");
    setDismissedBanner(true);
    setShowModal(false);
  }

  function handleDecline() {
    setConsentPreferences("denied");
    setDismissedBanner(true);
    setShowModal(false);
  }

  function openDetails() {
    setShowModal(true);
  }

  return (
    <>
      {/* Floating Minimal Banner */}
      {showBanner && !showModal && (
        <aside
          role="region"
          aria-label={copy.bannerTitle}
          className="fixed bottom-3 left-3 right-3 z-30 mx-auto max-w-lg rounded-panel border border-border bg-surface p-5 shadow-lg min-[400px]:bottom-4 min-[400px]:left-4 min-[400px]:right-4 sm:p-6"
        >
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-small font-bold uppercase tracking-wider text-brand">
              {copy.bannerTitle}
            </h2>
          </div>
          <p className="mt-2 text-small leading-relaxed text-muted">
            {copy.bannerDescription}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleAccept}
              className="inline-flex min-h-11 items-center justify-center rounded-control bg-brand px-4 py-2 text-small font-semibold text-on-brand transition-colors hover:bg-brand-hover focus-visible:outline-accent"
            >
              {copy.accept}
            </button>
            <button
              type="button"
              onClick={handleDecline}
              className="inline-flex min-h-11 items-center justify-center rounded-control border border-border bg-surface px-4 py-2 text-small font-semibold text-ink transition-colors hover:bg-surface-subtle focus-visible:outline-accent"
            >
              {copy.decline}
            </button>
            <button
              type="button"
              onClick={openDetails}
              className="inline-flex min-h-11 items-center px-2 text-small text-muted underline underline-offset-4 transition-colors hover:text-ink focus-visible:outline-accent"
            >
              {copy.preferences}
            </button>
          </div>
        </aside>
      )}

      {/* Modal / Detailed Preference Dialog */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="consent-modal-title"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
        >
          <div
            ref={modalRef}
            className="w-full max-w-lg rounded-panel border border-border bg-surface p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 id="consent-modal-title" className="text-heading font-semibold text-ink">
                {copy.modalTitle}
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label={copy.close}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-control text-muted hover:text-ink focus-visible:outline-accent"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {/* Essential Cookies */}
              <div className="rounded-control border border-border/80 bg-surface-subtle p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-small font-bold text-ink">{copy.essentialTitle}</h3>
                  <span className="rounded-full bg-border px-2.5 py-0.5 text-xs font-semibold text-muted">
                    {copy.alwaysActive}
                  </span>
                </div>
                <p className="mt-1.5 text-small text-muted">{copy.essentialDesc}</p>
              </div>

              {/* Analytics Cookies */}
              <div className="rounded-control border border-border bg-surface p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-small font-bold text-ink">{copy.analyticsTitle}</h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      status === "granted"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-surface-subtle text-muted"
                    }`}
                  >
                    {status === "granted" ? copy.statusGranted : copy.statusDenied}
                  </span>
                </div>
                <p className="mt-1.5 text-small text-muted">{copy.analyticsDesc}</p>
              </div>

              <p className="text-xs text-muted">
                {status === "granted" ? copy.statusAccepted : copy.statusDeclined}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-border pt-4">
              <button
                type="button"
                onClick={handleDecline}
                className="inline-flex min-h-11 items-center justify-center rounded-control border border-border bg-surface px-4 py-2 text-small font-semibold text-ink transition-colors hover:bg-surface-subtle focus-visible:outline-accent"
              >
                {copy.decline}
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="inline-flex min-h-11 items-center justify-center rounded-control bg-brand px-4 py-2 text-small font-semibold text-on-brand transition-colors hover:bg-brand-hover focus-visible:outline-accent"
              >
                {copy.accept}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
