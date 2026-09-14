"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { NavigationItem } from "@/content/site";

interface MobileNavigationProps {
  items: readonly NavigationItem[];
  pricing: NavigationItem;
  label: string;
  menuLabel: string;
}

export function MobileNavigation({ items, pricing, label, menuLabel }: MobileNavigationProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const menuListRef = useRef<HTMLDivElement>(null);
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
      document.body.style.overflow = "";
    };
  }, []);

  function closeMenu() {
    if (detailsRef.current) detailsRef.current.open = false;
    document.body.style.overflow = "";
  }

  function syncBodyScroll() {
    document.body.style.overflow = detailsRef.current?.open ? "hidden" : "";
  }

  return (
    <details
      ref={detailsRef}
      className="mobile-navigation group lg:hidden"
      onToggle={syncBodyScroll}
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
        aria-label={menuLabel}
        aria-controls="mobile-navigation"
        title={menuLabel}
        className="relative z-50 flex size-12 list-none items-center justify-center rounded-control border border-border bg-surface text-brand transition-colors hover:bg-accent-soft group-open:fixed group-open:right-gutter group-open:top-[calc((var(--spacing-header)-3rem)/2)] group-open:border-on-brand-muted group-open:bg-on-brand group-open:text-brand [&::-webkit-details-marker]:hidden"
      >
        <Menu className="size-5 group-open:hidden" aria-hidden="true" />
        <X className="hidden size-5 group-open:block" aria-hidden="true" />
      </summary>
      <div
        id="mobile-navigation"
        className="mobile-navigation-panel fixed inset-0 z-40 min-h-dvh overflow-y-auto overscroll-contain bg-brand text-on-brand"
        onClick={(event) => {
          if (event.target instanceof Node && !menuListRef.current?.contains(event.target)) {
            window.setTimeout(closeMenu, 0);
          }
        }}
      >
        <Container className="flex min-h-dvh items-center justify-center py-24">
          <div ref={menuListRef} className="mobile-navigation-list w-full max-w-sm text-center">
            <Navigation
              items={items}
              label={label}
              variant="mobile"
              onNavigate={closeMenu}
            />
            <Button
              href={pricing.href}
              external={pricing.external}
              variant="secondary"
              className="mt-8 w-full justify-center focus-visible:outline-accent"
              onClick={closeMenu}
            >
              {pricing.label}
            </Button>
          </div>
        </Container>
      </div>
    </details>
  );
}
