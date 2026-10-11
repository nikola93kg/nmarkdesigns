export type ConsentStatus = "granted" | "denied" | "unspecified";

export interface ConsentPreferences {
  status: "granted" | "denied";
  timestamp: number;
  version: string;
}

export const CONSENT_STORAGE_KEY = "nmark_consent_v2";
export const CONSENT_VERSION = "2.0";
export const CONSENT_EVENT_NAME = "nmark-consent-changed";

export type AnalyticsEventName =
  | "generate_lead"
  | "form_start"
  | "contact_direct"
  | "click_cta"
  | "view_case_study"
  | "click_proof_case_study"
  | "click_external_project"
  | "click_service";

export type ContactMethod = "phone" | "email" | "whatsapp";

export interface EventParamsMap {
  generate_lead: {
    page_type: "contact";
    locale: "sr" | "en";
    inquiry_type?: string;
  };
  form_start: {
    page_type: "contact";
    locale: "sr" | "en";
  };
  contact_direct: {
    contact_method: ContactMethod;
    cta_location: string;
    locale: "sr" | "en";
  };
  click_cta: {
    cta_name: string;
    cta_location: string;
    locale: "sr" | "en";
  };
  view_case_study: {
    project_slug: string;
    locale: "sr" | "en";
    project_category?: string;
  };
  click_proof_case_study: {
    project_slug: string;
    card_position?: number;
    locale: "sr" | "en";
  };
  click_external_project: {
    project_slug: string;
    destination_domain: string;
  };
  click_service: {
    service_slug: string;
    locale: "sr" | "en";
  };
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __MOCK_ANALYTICS__?: boolean;
    __MOCK_ANALYTICS_EVENTS__?: Array<{ event: string; params: Record<string, unknown> }>;
    __nmark_analytics_test_api__?: {
      trackEvent: typeof trackEvent;
      trackPageView: typeof trackPageView;
      sanitizeParams: typeof sanitizeParams;
      clearAnalyticsCookies: typeof clearAnalyticsCookies;
      setConsentPreferences: typeof setConsentPreferences;
      getConsentStatus: typeof getConsentStatus;
      isAnalyticsEnvironmentAllowed: typeof isAnalyticsEnvironmentAllowed;
    };
  }
}

/**
 * Checks whether user has explicitly granted analytics consent.
 */
export function getConsentPreferences(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentPreferences;
    if (parsed.status === "granted" || parsed.status === "denied") {
      return parsed;
    }
  } catch {
    // LocalStorage access restricted or invalid JSON
  }
  return null;
}

export function getConsentStatus(): ConsentStatus {
  const prefs = getConsentPreferences();
  return prefs ? prefs.status : "unspecified";
}

export function hasAnalyticsConsent(): boolean {
  return getConsentStatus() === "granted";
}

export function subscribeToConsent(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CONSENT_EVENT_NAME, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT_NAME, callback);
    window.removeEventListener("storage", callback);
  };
}

export function getConsentSnapshot(): ConsentStatus {
  return getConsentStatus();
}

export function getServerSnapshot(): ConsentStatus {
  return "unspecified";
}

/**
 * Initializes Google Consent Mode v2 default state to denied.
 */
export function initConsentMode(): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }

  // Google Consent Mode v2: default to denied before user interaction
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

/**
 * Expires and clears any previously written Google Analytics cookies from the browser.
 */
export function clearAnalyticsCookies(): void {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  try {
    const cookies = document.cookie.split(";");
    const hostname = window.location.hostname;
    const domainParts = hostname.split(".");
    const domains = [
      "",
      `; domain=${hostname}`,
      domainParts.length > 1 ? `; domain=.${domainParts.slice(-2).join(".")}` : "",
    ];

    for (const cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
      if (name === "_ga" || name.startsWith("_ga_") || name === "_gid" || name === "_gat") {
        for (const domain of domains) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
          document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
        }
      }
    }
  } catch {
    // Fail gracefully if cookie access restricted
  }
}

/**
 * Updates consent state based on explicit user decision.
 */
export function setConsentPreferences(status: "granted" | "denied"): void {
  if (typeof window === "undefined") return;

  const prefs: ConsentPreferences = {
    status,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  };

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // LocalStorage unavailable
  }

  // If consent is withdrawn/denied, purge existing analytics cookies
  if (status === "denied") {
    clearAnalyticsCookies();
  }

  // Update gtag consent mode
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: status,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }

  // Dispatch custom window event to notify components
  window.dispatchEvent(
    new CustomEvent(CONSENT_EVENT_NAME, { detail: { status } }),
  );
}

/**
 * Validates that current execution environment is approved for production analytics.
 */
export function isAnalyticsEnvironmentAllowed(customHostname?: string): boolean {
  if (typeof window === "undefined" && !customHostname) return false;

  // Allow Playwright test runner mock bypass if no explicit customHostname passed
  if (customHostname === undefined && typeof window !== "undefined" && window.__MOCK_ANALYTICS__ === true) {
    return true;
  }

  const hostname = customHostname ?? (typeof window !== "undefined" ? window.location.hostname : "");
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0" ||
    hostname === "[::1]" ||
    hostname.endsWith(".local")
  ) {
    return false;
  }

  // Disallow staging and preview environments
  if (hostname.endsWith(".vercel.app") || hostname.endsWith(".pages.dev")) {
    return false;
  }

  // Approved production hostnames
  const isProductionHost =
    hostname === "nmarkdesigns.com" ||
    hostname === "www.nmarkdesigns.com";

  return isProductionHost;
}

/**
 * Runtime PII Sanitizer and Parameter Allowlist Scrubber.
 */
const ALLOWED_KEYS = new Set([
  "cta_name",
  "cta_location",
  "contact_method",
  "locale",
  "page_type",
  "inquiry_type",
  "project_slug",
  "project_category",
  "card_position",
  "destination_domain",
  "service_slug",
  "page_location",
  "page_title",
]);

const SENSITIVE_KEY_PATTERN = /^(?:name|first_name|last_name|email|phone|message|comment|budget|secret|token|password)$/i;
const EMAIL_PATTERN = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const PHONE_PATTERN = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;

export function sanitizeParams<T extends Record<string, unknown>>(params: T): Record<string, unknown> {
  const clean: Record<string, unknown> = {};

  for (const [key, val] of Object.entries(params)) {
    if (!ALLOWED_KEYS.has(key)) {
      continue;
    }
    if (SENSITIVE_KEY_PATTERN.test(key)) {
      continue;
    }

    if (typeof val === "string") {
      // Disallow potential emails or phone sequences in values
      if (EMAIL_PATTERN.test(val) || PHONE_PATTERN.test(val)) continue;
      clean[key] = val.trim().slice(0, key === "page_location" ? 255 : 100);
    } else if (typeof val === "number" || typeof val === "boolean") {
      clean[key] = val;
    }
  }

  return clean;
}

/**
 * Type-safe, PII-safe analytics event dispatcher.
 */
export function trackEvent<T extends AnalyticsEventName>(
  eventName: T,
  params: EventParamsMap[T],
): boolean {
  if (typeof window === "undefined") return false;

  // 1. Consent Gate: Basic Consent requires explicit grant
  if (!hasAnalyticsConsent()) {
    return false;
  }

  // 2. Environment Gate: Prevent dev/preview pollution
  if (!isAnalyticsEnvironmentAllowed()) {
    return false;
  }

  // 3. PII Scrubbing
  const safeParams = sanitizeParams(params);

  // 4. Test Mock Hook
  if (window.__MOCK_ANALYTICS__ === true) {
    window.__MOCK_ANALYTICS_EVENTS__ = window.__MOCK_ANALYTICS_EVENTS__ || [];
    window.__MOCK_ANALYTICS_EVENTS__.push({ event: eventName, params: safeParams });
  }

  // 5. Dispatch via gtag
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, safeParams);
      return true;
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...safeParams });
      return true;
    }
  } catch {
    // Fail gracefully without affecting application UI
  }

  return false;
}

/**
 * Dispatches a single pageview event on initial load and client-side route transitions.
 */
export function trackPageView(url: string, title?: string): boolean {
  if (typeof window === "undefined") return false;
  if (!hasAnalyticsConsent()) return false;
  if (!isAnalyticsEnvironmentAllowed()) return false;

  const pageTitle = title || (typeof document !== "undefined" ? document.title : "");
  const pathOnly = url.split("?")[0].split("#")[0];

  const safeParams = sanitizeParams({
    page_location: pathOnly,
    page_title: pageTitle,
  });

  if (window.__MOCK_ANALYTICS__ === true) {
    window.__MOCK_ANALYTICS_EVENTS__ = window.__MOCK_ANALYTICS_EVENTS__ || [];
    window.__MOCK_ANALYTICS_EVENTS__.push({
      event: "page_view",
      params: safeParams,
    });
  }

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", safeParams);
      return true;
    }
  } catch {
    // Ignore error
  }

  return false;
}

if (typeof window !== "undefined") {
  window.__nmark_analytics_test_api__ = {
    trackEvent,
    trackPageView,
    sanitizeParams,
    clearAnalyticsCookies,
    setConsentPreferences,
    getConsentStatus,
    isAnalyticsEnvironmentAllowed,
  };
}
