"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, type KeyboardEvent } from "react";
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
  const toggleRef = useRef<HTMLElement>(null);
  const menuListRef = useRef<HTMLDivElement>(null);
  const pointerInteractionRef = useRef(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");

    function closeOnDesktop() {
      if (desktop.matches) closeMenu();
    }

    function closeOnOutsidePointer(event: PointerEvent) {
      const details = detailsRef.current;
      if (event.target instanceof Node && details && !details.contains(event.target)) closeMenu();
    }

    desktop.addEventListener("change", closeOnDesktop);
    document.addEventListener("pointerdown", closeOnOutsidePointer);

    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.body.style.overflow = "";
    };
  }, []);

  function closeMenu(restoreFocus = false) {
    if (detailsRef.current) detailsRef.current.open = false;
    document.body.style.overflow = "";
    if (restoreFocus) window.requestAnimationFrame(() => toggleRef.current?.focus());
  }

  function syncBodyScroll() {
    document.body.style.overflow = detailsRef.current?.open ? "hidden" : "";
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDetailsElement>) {
    if (!detailsRef.current?.open) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
      return;
    }

  }

  function handlePointerDown() {
    pointerInteractionRef.current = true;
    window.setTimeout(() => {
      pointerInteractionRef.current = false;
    }, 0);
  }

  return (
    <details
      ref={detailsRef}
      className="mobile-navigation group lg:hidden"
      onToggle={syncBodyScroll}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onBlur={(event) => {
        if (!pointerInteractionRef.current && !event.currentTarget.contains(event.relatedTarget)) {
          closeMenu();
        }
      }}
    >
      <summary
        ref={toggleRef}
        aria-label={menuLabel}
        aria-controls="mobile-navigation"
        title={menuLabel}
        className="mobile-navigation-toggle"
      >
        <Menu className="mobile-navigation-menu-icon absolute size-5" aria-hidden="true" />
        <X className="mobile-navigation-close-icon absolute size-5" aria-hidden="true" />
      </summary>
      <div
        id="mobile-navigation"
        className="mobile-navigation-panel fixed inset-0 z-50 min-h-dvh overflow-y-auto overscroll-contain bg-brand text-on-brand"
        onClick={(event) => {
          if (event.target instanceof Node && !menuListRef.current?.contains(event.target)) closeMenu();
        }}
      >
        <Container className="flex min-h-dvh flex-col justify-between py-28 pb-8 sm:py-32 sm:pb-10">
          <div ref={menuListRef} className="mobile-navigation-list w-full">
            <div className="mb-8 flex items-center justify-between border-b border-border-inverse pb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-on-brand-muted sm:mb-10">
              <span>{menuLabel}</span>
              <span aria-hidden="true">NMark Designs</span>
            </div>
            <Navigation items={items} label={label} variant="mobile" onNavigate={() => closeMenu()} />
            <Button
              href={pricing.href}
              external={pricing.external}
              variant="secondary"
              className="mt-8 w-full justify-center sm:mt-10 sm:w-auto"
              onClick={() => closeMenu()}
            >
              {pricing.label}
            </Button>
          </div>
          <div aria-hidden="true" className="mt-16 flex justify-end pt-4 text-accent">
            <span>↗</span>
          </div>
        </Container>
      </div>
    </details>
  );
}
