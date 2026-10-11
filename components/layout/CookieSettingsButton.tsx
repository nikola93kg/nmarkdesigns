"use client";

import { consentCopy } from "@/content/consent";

interface CookieSettingsButtonProps {
  locale: "sr" | "en";
  className?: string;
}

export function CookieSettingsButton({ locale, className }: CookieSettingsButtonProps) {
  const copy = consentCopy[locale] || consentCopy.sr;

  function handleClick() {
    window.dispatchEvent(new CustomEvent("nmark-open-consent-modal"));
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        className ||
        "inline-flex min-h-11 items-center justify-center text-small text-on-brand-muted underline underline-offset-4 transition-colors hover:text-on-brand focus-visible:outline-accent"
      }
    >
      {copy.footerLink}
    </button>
  );
}
