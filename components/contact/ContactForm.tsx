"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/content/i18n/types";
import { contactFields, contactLimits, initialContactState, type ContactFormState } from "@/lib/contact";

interface ContactFormProps {
  copy: Dictionary["contact"]["form"];
  action: (state: ContactFormState, data: FormData) => Promise<ContactFormState>;
  permalink: string;
  deliveryAvailable: boolean;
}

const inputClass =
  "min-h-12 w-full min-w-0 rounded-control border border-border bg-surface px-4 py-3 text-base text-ink aria-invalid:border-brand aria-invalid:ring-1 aria-invalid:ring-brand disabled:opacity-70";

export function ContactForm({ copy, action, permalink, deliveryAvailable }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(action, initialContactState, permalink);
  const [values, setValues] = useState(state.values);
  const formRef = useRef<HTMLFormElement>(null);
  const feedbackRef = useRef<HTMLParagraphElement>(null);

  const [prevStatus, setPrevStatus] = useState(state.status);
  if (state.status !== prevStatus) {
    setPrevStatus(state.status);
    if (state.status === "success") {
      setValues(initialContactState.values);
    } else if (state.status !== "idle") {
      setValues(state.values);
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
      ref={formRef}
      action={formAction}
      noValidate
      aria-labelledby="contact-form-title"
      aria-describedby="contact-required contact-availability"
      className="mx-auto w-full max-w-2xl lg:max-w-none"
    >
      <h2 id="contact-form-title" className="mx-auto max-w-xl text-heading font-bold lg:mx-0">
        {copy.title}
      </h2>
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
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              setValues({ ...values, [field]: event.target.value }),
            "aria-invalid": Boolean(error),
            "aria-describedby": error ? `contact-${field}-error` : undefined,
            className: inputClass,
          };
          return (
            <div key={field} className="min-w-0">
              <label htmlFor={shared.id} className="mb-2 block text-center text-small font-medium text-ink lg:text-left">
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
                <p id={`contact-${field}-error`} className="mt-2 text-small font-medium text-brand">
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
