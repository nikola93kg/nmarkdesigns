"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/content/i18n/types";
import { trackEvent } from "@/lib/analytics";
import { contactFields, contactLimits, initialContactState, type ContactFormState } from "@/lib/contact";

interface ContactFormProps {
  copy: Dictionary["contact"]["form"];
  action: (state: ContactFormState, data: FormData) => Promise<ContactFormState>;
  permalink: string;
  deliveryAvailable: boolean;
}

const inputClass =
  "min-h-12 w-full min-w-0 rounded-control border border-border bg-surface px-4 py-3 text-base text-ink aria-invalid:border-brand aria-invalid:ring-1 aria-invalid:ring-brand disabled:opacity-70";

const serviceMessages: Record<string, { sr: string; en: string }> = {
  "landing-page": {
    sr: "Pozdrav Nikola, zanima me izrada Landing Page sajta (od 300 €).",
    en: "Hi Nikola, I'm interested in Landing Page website development (from €300).",
  },
  "business-website": {
    sr: "Pozdrav Nikola, zanima me izrada poslovnog sajta (od 550 €).",
    en: "Hi Nikola, I'm interested in Business Website development (from €550).",
  },
  "advanced-website": {
    sr: "Pozdrav Nikola, zanima me izrada naprednog sajta (od 900 €).",
    en: "Hi Nikola, I'm interested in Advanced Website development (from €900).",
  },
  ecommerce: {
    sr: "Pozdrav Nikola, zanima me izrada web prodavnice (od 1.200 €).",
    en: "Hi Nikola, I'm interested in E-commerce online store development (from €1,200).",
  },
  "custom-development": {
    sr: "Pozdrav Nikola, potreban mi je razvoj custom web aplikacije.",
    en: "Hi Nikola, I'm interested in Custom Web Application development.",
  },
  redesign: {
    sr: "Pozdrav Nikola, zanima me redizajn postojećeg sajta (od 400 €).",
    en: "Hi Nikola, I'm interested in Website Redesign (from €400).",
  },
  seo: {
    sr: "Pozdrav Nikola, potreban mi je SEO audit i optimizacija (od 150 €).",
    en: "Hi Nikola, I'm interested in SEO Audit & Basic Optimization (from €150).",
  },
  performance: {
    sr: "Pozdrav Nikola, zanima me optimizacija brzine sajta (od 100 €).",
    en: "Hi Nikola, I'm interested in Website Speed Optimization (from €100).",
  },
  "ai-chatbot": {
    sr: "Pozdrav Nikola, zanima me integracija AI chatbota (od 350 €).",
    en: "Hi Nikola, I'm interested in AI Chatbot Integration (from €350).",
  },
  hosting: {
    sr: "Pozdrav Nikola, zanima me Managed hosting (od 30 € / god.).",
    en: "Hi Nikola, I'm interested in Managed Hosting (from €30/year).",
  },
  "basic-care": {
    sr: "Pozdrav Nikola, zanima me Basic Care tehničko održavanje (od 25 € / mes.).",
    en: "Hi Nikola, I'm interested in Basic Care website maintenance (from €25/month).",
  },
  "business-care": {
    sr: "Pozdrav Nikola, zanima me Business Care tehničko održavanje (od 50 € / mes.).",
    en: "Hi Nikola, I'm interested in Business Care website maintenance (from €50/month).",
  },
  "custom-support": {
    sr: "Pozdrav Nikola, potrebna mi je namenska tehnička podrška (Custom Support).",
    en: "Hi Nikola, I'm interested in Custom Support & Maintenance.",
  },
};

export function ContactForm({ copy, action, permalink, deliveryAvailable }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(action, initialContactState, permalink);
  const [values, setValues] = useState(state.values);
  const formRef = useRef<HTMLFormElement>(null);
  const feedbackRef = useRef<HTMLParagraphElement>(null);
  const hasFiredFormStartRef = useRef(false);
  const lastHandledLeadStateRef = useRef<ContactFormState | null>(null);

  const locale = permalink.startsWith("/en") ? "en" : "sr";

  const [prevStatus, setPrevStatus] = useState(state.status);
  if (state.status !== prevStatus) {
    setPrevStatus(state.status);
    if (state.status === "success") {
      setValues(initialContactState.values);
    } else if (state.status !== "idle") {
      setValues(state.values);
    }
  }

  // Primary conversion: generate_lead (Strictly when state.status === "success" from SMTP 250 accepted)
  useEffect(() => {
    if (state.status === "success" && lastHandledLeadStateRef.current !== state) {
      lastHandledLeadStateRef.current = state;
      trackEvent("generate_lead", {
        page_type: "contact",
        locale,
      });
    }
  }, [state, locale]);

  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    if (!serviceParam) return;

    const timer = setTimeout(() => {
      setSelectedService(serviceParam);
      setValues((current) => {
        if (current.message.trim().length > 0) return current;
        const starter = serviceMessages[serviceParam]?.[locale];
        return starter ? { ...current, message: starter } : current;
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [locale]);

  function handleFieldFocus() {
    if (!hasFiredFormStartRef.current) {
      hasFiredFormStartRef.current = true;
      trackEvent("form_start", {
        page_type: "contact",
        locale,
      });
    }
  }

  useEffect(() => {
    if (state.status === "idle") return;
    const firstInvalid = formRef.current?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
      '[aria-invalid="true"]',
    );
    (firstInvalid ?? feedbackRef.current)?.focus();
  }, [state]);

  const formLevelError = state.errors.form;

  return (
    <form
      id="contact-form"
      ref={formRef}
      action={formAction}
      noValidate
      aria-labelledby="contact-form-title"
      aria-describedby={deliveryAvailable ? "contact-required" : "contact-required contact-availability"}
      className="mx-auto w-full max-w-2xl lg:max-w-none"
    >
      <h2 id="contact-form-title" className="mx-auto max-w-xl text-heading font-bold lg:mx-0">
        {copy.title}
      </h2>
      {selectedService ? (
        <div className="mt-3 inline-flex items-center gap-2 rounded-control bg-accent-soft px-3 py-1.5 text-small font-medium text-brand">
          <span>{locale === "sr" ? "Izabrana usluga iz cenovnika:" : "Selected service:"}</span>
          <span className="font-semibold">{selectedService}</span>
        </div>
      ) : null}
      {copy.reassurance ? (
        <p className="mt-2 text-small font-medium text-brand">
          {copy.reassurance}
        </p>
      ) : null}
      <p id="contact-required" className="mt-4 text-small text-muted">
        {copy.required}
      </p>

      {/* Show availability notice only when delivery is truly unavailable */}
      {!deliveryAvailable && (
        <p
          id="contact-availability"
          className="mx-auto mt-5 max-w-xl border-t-2 border-brand pt-4 text-small text-muted lg:mx-0 lg:border-l-2 lg:border-t-0 lg:pl-4 lg:pt-0"
        >
          {copy.unavailableNotice}
        </p>
      )}

      {/* Honeypot field (hidden from screen, bots automatically fill it) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        <label htmlFor="contact-hp-website">Leave this field blank</label>
        <input
          id="contact-hp-website"
          type="text"
          name="_hp_website"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {/* Status feedback announcement */}
      <p
        ref={feedbackRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={`mt-5 text-small font-medium empty:mt-0 ${
          state.status === "success" ? "text-emerald-700" : "text-brand"
        }`}
      >
        {pending
          ? copy.pending
          : formLevelError
            ? copy.validation[formLevelError]
            : state.status !== "idle"
              ? copy.status[state.status]
              : ""}
      </p>

      <fieldset disabled={pending} className="mt-6 grid min-w-0 gap-5">
        {contactFields.map((field) => {
          const error = state.errors[field];
          const shared = {
            id: `contact-${field}`,
            name: field,
            required: field !== "phone",
            maxLength: contactLimits[field],
            value: values[field],
            onFocus: handleFieldFocus,
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              handleFieldFocus();
              setValues({ ...values, [field]: event.target.value });
            },
            "aria-invalid": Boolean(error),
            "aria-describedby": error ? `contact-${field}-error` : undefined,
            className: inputClass,
          };
          return (
            <div key={field} className="min-w-0">
              <label htmlFor={shared.id} className="mb-2 block text-left text-small font-medium text-ink">
                {copy.labels[field]}{" "}
                {field === "phone" ? (
                  <span className="font-normal text-muted">({copy.optional})</span>
                ) : (
                  <span aria-hidden="true">*</span>
                )}
              </label>
              {field === "message" ? (
                <textarea {...shared} rows={6} className={`${inputClass} resize-y`} />
              ) : (
                <input
                  {...shared}
                  type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                  autoComplete={field === "phone" ? "tel" : field}
                />
              )}
              {error && (
                <p id={`contact-${field}-error`} className="mt-2 text-left text-small font-medium text-brand">
                  {copy.validation[error]}
                </p>
              )}
            </div>
          );
        })}

        {/* Cloudflare Turnstile CAPTCHA container */}
        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
          <div className="my-2 flex justify-center lg:justify-start">
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js"
              strategy="lazyOnload"
            />
            <div
              className="cf-turnstile"
              data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              data-theme="light"
            />
          </div>
        )}

        <Button type="submit" disabled={pending} className="mt-1 justify-self-center lg:justify-self-start">
          {pending ? copy.pending : copy.submit}
          <ArrowUpRight aria-hidden="true" size={18} className="shrink-0" />
        </Button>
      </fieldset>
    </form>
  );
}
