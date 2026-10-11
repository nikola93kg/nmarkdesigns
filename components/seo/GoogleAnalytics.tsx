"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  getConsentSnapshot,
  getServerSnapshot,
  isAnalyticsEnvironmentAllowed,
  subscribeToConsent,
  trackPageView,
} from "@/lib/analytics";

interface GoogleAnalyticsProps {
  measurementId?: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const id = measurementId?.trim() || "G-TVJKFZRKRJ";
  const pathname = usePathname();
  const consentStatus = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getServerSnapshot,
  );
  const consentGranted = consentStatus === "granted";
  const scriptInjectedRef = useRef(false);
  const lastTrackedPathRef = useRef<string | null>(null);

  // 2. Load GA4 script dynamically ONLY after explicit consent in allowed environment
  useEffect(() => {
    if (!consentGranted) return;
    if (!id || !/^G-[A-Z0-9]+$/.test(id)) return;
    if (!isAnalyticsEnvironmentAllowed()) return;

    if (!scriptInjectedRef.current) {
      scriptInjectedRef.current = true;

      // Update consent in gtag
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          analytics_storage: "granted",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        });
        window.gtag("js", new Date());
        window.gtag("config", id, { send_page_view: false });
      }

      // Check if script already exists
      const existingScript = document.getElementById("ga4-script");
      if (!existingScript && !window.__MOCK_ANALYTICS__) {
        const script = document.createElement("script");
        script.id = "ga4-script";
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
        document.head.appendChild(script);
      }
    }
  }, [consentGranted, id]);

  // 3. SPA Route Tracking: Fire pageview on pathname change when consent is granted
  useEffect(() => {
    if (!consentGranted) {
      lastTrackedPathRef.current = null;
      return;
    }
    if (!isAnalyticsEnvironmentAllowed()) return;
    if (!pathname) return;

    if (lastTrackedPathRef.current !== pathname) {
      lastTrackedPathRef.current = pathname;
      // Slight delay to ensure document.title is updated by Next.js metadata
      const timer = setTimeout(() => {
        trackPageView(window.location.href, document.title);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [consentGranted, pathname]);

  return (
    <script
      id="ga4-consent-default"
      dangerouslySetInnerHTML={{
        __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied'
});
        `,
      }}
    />
  );
}
