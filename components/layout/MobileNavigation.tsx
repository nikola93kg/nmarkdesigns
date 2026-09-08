"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navigation, pricingLink } from "@/content/site";

export function MobileNavigation() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");

    function closeOnDesktop() {
      if (desktop.matches && detailsRef.current) {
        detailsRef.current.open = false;
      }
    }

    function closeOnOutsideClick(event: PointerEvent) {
      const details = detailsRef.current;

      if (event.target instanceof Node && details && !details.contains(event.target)) {
        details.open = false;
      }
    }

    desktop.addEventListener("change", closeOnDesktop);
    document.addEventListener("pointerdown", closeOnOutsideClick);

    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, []);

  function closeMenu() {
    if (detailsRef.current) detailsRef.current.open = false;
  }

  return (
    <details
      ref={detailsRef}
      className="group lg:hidden"
      onKeyDown={(event) => {
        if (event.key === "Escape" && detailsRef.current?.open) {
          event.preventDefault();
          closeMenu();
          summaryRef.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
      }}
    >
      <summary
        ref={summaryRef}
        aria-label="Glavni meni"
        aria-controls="mobile-navigation"
        title="Glavni meni"
        className="flex size-12 list-none items-center justify-center rounded-control border border-border text-brand transition-colors hover:bg-accent-soft [&::-webkit-details-marker]:hidden"
      >
        <Menu className="size-5 group-open:hidden" aria-hidden="true" />
        <X className="hidden size-5 group-open:block" aria-hidden="true" />
      </summary>
      <div
        id="mobile-navigation"
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--spacing-header))] overflow-y-auto overscroll-contain border-b border-border bg-surface shadow-sm"
      >
        <Container className="py-4">
          <Navigation
            items={navigation}
            label="Glavna navigacija za mobilne uređaje"
            variant="mobile"
            onNavigate={closeMenu}
          />
          <Button
            href={pricingLink.href}
            external
            className="mt-4 w-full"
            onClick={closeMenu}
          >
            {pricingLink.label}
          </Button>
        </Container>
      </div>
    </details>
  );
}
