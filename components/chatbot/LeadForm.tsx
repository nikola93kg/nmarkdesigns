"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { chatCopy } from "@/content/chatbot/copy";
import { leadCopy } from "@/content/chatbot/lead-copy";
import { CONTACT_CONSENT_VERSION, leadInput, serviceIds, type LeadService, type LeadReceipt } from "@/lib/chatbot/lead-contracts";
import type { Locale } from "@/lib/i18n";

type Values = { name: string; email: string; phone: string; company: string; website: string; service: LeadService; budgetRange: string; timeframe: string; projectDescription: string; preferredContactMethod: "email" | "phone"; privacyConsent: boolean; honeypot: string };
type Props = { locale: Locale; preview: boolean; privacyUrl: string | null; service: LeadService; description: string; onCancel: () => void; onReceived: () => void; onBusyChange: (busy: boolean) => void };
const fieldClass = "mt-1 min-h-11 w-full min-w-0 rounded-control border border-border bg-surface px-3 py-2 text-small text-ink focus:border-focus";
export function LeadForm({ locale, preview, privacyUrl, service, description, onCancel, onReceived, onBusyChange }: Props) {
  const copy = leadCopy[locale];
  const heading = useRef<HTMLHeadingElement>(null);
  const submissionId = useRef<string | null>(null);
  const locked = useRef(false);
  const [step, setStep] = useState<"project" | "contact" | "success">("project");
  const [values, setValues] = useState<Values>({ name: "", email: "", phone: "", company: "", website: "", service, budgetRange: "", timeframe: "", projectDescription: description.slice(0, 2000), preferredContactMethod: "email", privacyConsent: false, honeypot: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [failure, setFailure] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => { heading.current?.focus(); }, [step]);
  function update<K extends keyof Values>(key: K, value: Values[K]) { setFailure((previous) => previous === "INVALID_INPUT" ? null : previous); setValues((previous) => ({ ...previous, [key]: value })); setErrors((previous) => ({ ...previous, [key]: "" })); }
  function input(key: "name" | "email" | "phone" | "company" | "website" | "budgetRange" | "timeframe", type = "text", maxLength = 120, autoComplete?: string) {
    return <div><label htmlFor={`lead-${key}`} className="text-small font-medium text-brand">{copy.fields[key]}{!["name", "email"].includes(key) && <span className="ml-1 text-muted">({copy.optional})</span>}</label>
      <input id={`lead-${key}`} name={key} type={type} maxLength={maxLength} autoComplete={autoComplete} required={key === "name" || key === "email"} value={values[key]} onChange={(event) => update(key, event.target.value)} className={fieldClass} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `lead-${key}-error` : undefined} />
      {errors[key] && <p id={`lead-${key}-error`} className="mt-1 text-small text-brand">{errors[key]}</p>}</div>;
  }
  function next() {
    const candidate = leadInput.safeParse({ ...values, name: "Preview", email: "preview@example.com", privacyConsent: true, preferredContactMethod: "email", locale, consentVersion: CONTACT_CONSENT_VERSION, clientSubmissionId: crypto.randomUUID() });
    if (!candidate.success) {
      setErrors(Object.fromEntries(candidate.error.issues.map((issue) => [String(issue.path[0]), copy.errors[String(issue.path[0])] ?? copy.errors.field]))); return;
    }
    setErrors({}); setStep("contact");
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (locked.current) return;
    submissionId.current ??= crypto.randomUUID();
    const parsed = leadInput.safeParse({ ...values, clientSubmissionId: submissionId.current, locale, consentVersion: CONTACT_CONSENT_VERSION });
    if (!parsed.success) {
      const nextErrors = Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), copy.errors[String(issue.path[0])] ?? copy.errors.field]));
      setErrors(nextErrors); setFailure("INVALID_INPUT"); return;
    }
    locked.current = true; setBusy(true); onBusyChange(true); setFailure(null); setErrors({});
    try {
      if (!preview) {
        if (!privacyUrl) throw new Error("UNAVAILABLE");
        const response = await fetch("/api/chat/lead/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
        const data = await response.json() as Partial<LeadReceipt> & { code?: string };
        if (!response.ok || data.status !== "received" || !data.leadId) throw new Error(data.code ?? "UNAVAILABLE");
      }
      // Avoid retaining PII in the hidden form after receipt (or demo completion).
      setValues((previous) => ({ ...previous, name: "", email: "", phone: "", company: "", website: "", projectDescription: "", budgetRange: "", timeframe: "", privacyConsent: false }));
      setStep("success"); onReceived();
    } catch (error) { setFailure(error instanceof Error ? error.message : "UNAVAILABLE"); }
    finally { locked.current = false; setBusy(false); onBusyChange(false); }
  }
  return <section data-chat-lead-form aria-labelledby="lead-title" className="space-y-4">
    <h3 id="lead-title" ref={heading} tabIndex={-1} className="text-body font-semibold text-brand">{step === "contact" ? copy.review : copy.title}</h3>
    {preview && <p className="text-small text-muted">{copy.preview}</p>}
    {step === "success" ? <><p role="status" className="text-small">{preview ? copy.previewSuccess : copy.success}</p><Button onClick={onCancel}>{copy.returnToChat}</Button></> : <form noValidate onSubmit={(event) => { if (step === "project") { event.preventDefault(); next(); } else void submit(event); }} className="space-y-4">
      <fieldset disabled={busy} className="min-w-0 space-y-4">
        <legend className="sr-only">{step === "project" ? copy.title : copy.review}</legend>
        {step === "project" ? <>
          <p className="text-small text-muted">{copy.intro}</p>
          <div><label htmlFor="lead-service" className="text-small font-medium text-brand">{copy.fields.service}</label><select id="lead-service" value={values.service} className={fieldClass} onChange={(event) => update("service", event.target.value as LeadService)}>{serviceIds.map((id) => <option key={id} value={id}>{copy.services[id]}</option>)}</select></div>
          <div><label htmlFor="lead-projectDescription" className="text-small font-medium text-brand">{copy.fields.projectDescription} <span className="text-muted">({copy.optional})</span></label><textarea id="lead-projectDescription" rows={4} maxLength={2000} value={values.projectDescription} onChange={(event) => update("projectDescription", event.target.value)} className={`${fieldClass} resize-y`} /></div>
          {input("website", "url", 500, "url")}
          {input("budgetRange")}{input("timeframe")}
        </> : <>
          <dl className="space-y-2 border-b border-border pb-4 text-small">
            <div><dt className="font-semibold text-brand">{copy.fields.service}</dt><dd>{copy.services[values.service]}</dd></div>
            {(["projectDescription", "website", "budgetRange", "timeframe"] as const).filter((key) => values[key]).map((key) => <div key={key}><dt className="font-semibold text-brand">{copy.fields[key]}</dt><dd className="whitespace-pre-wrap break-words">{values[key]}</dd></div>)}
          </dl>
          <button type="button" onClick={() => { setStep("project"); setFailure(null); }} className="min-h-11 text-small font-semibold text-brand underline underline-offset-4">{copy.back}</button>
          {input("name", "text", 100, "name")}{input("email", "email", 254, "email")}
          <details open={values.preferredContactMethod === "phone" || Boolean(errors.phone)}><summary className="min-h-11 py-3 text-small font-medium text-brand">{copy.more}</summary><div className="space-y-4">{input("phone", "tel", 40, "tel")}{input("company", "text", 160, "organization")}<div><label htmlFor="lead-preferredContactMethod" className="text-small font-medium text-brand">{copy.fields.preferredContactMethod}</label><select id="lead-preferredContactMethod" className={fieldClass} value={values.preferredContactMethod} onChange={(event) => update("preferredContactMethod", event.target.value as "email" | "phone")}><option value="email">{copy.emailMethod}</option><option value="phone">{copy.phoneMethod}</option></select></div></div></details>
          <div className="hidden" aria-hidden="true"><label htmlFor="lead-extra">Extra</label><input id="lead-extra" name="extra" tabIndex={-1} autoComplete="off" value={values.honeypot} onChange={(event) => update("honeypot", event.target.value)} /></div>
          <label className="flex min-h-11 items-start gap-3 text-small"><input type="checkbox" checked={values.privacyConsent} onChange={(event) => update("privacyConsent", event.target.checked)} aria-invalid={Boolean(errors.privacyConsent)} aria-describedby={errors.privacyConsent ? "lead-consent-error" : undefined} className="mt-1 size-4 shrink-0 accent-brand" /><span>{copy.consent}</span></label>
          {errors.privacyConsent && <p id="lead-consent-error" className="text-small text-brand">{errors.privacyConsent}</p>}
          {!preview && privacyUrl && <a href={privacyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-small text-brand underline underline-offset-4">{privacyUrl.includes("/api/chat/local-notice/") ? chatCopy[locale].local.link : copy.policy}</a>}
        </>}
      </fieldset>
      {failure && <p role="alert" className="text-small text-brand">{copy.errors[failure] ?? copy.errors.UNAVAILABLE}</p>}
      <div className="flex flex-col gap-2"><Button type="submit" disabled={busy}>{busy ? copy.submitting : step === "project" ? copy.next : copy.submit}</Button><Button variant="secondary" onClick={onCancel} disabled={busy}>{copy.cancel}</Button></div>
    </form>}
  </section>;
}
