"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUp, RotateCcw, Square, X, ArrowUpRight } from "lucide-react";
import { trackChatInteraction } from "@/lib/chatbot/client-metrics";
import Link from "next/link";
import { LeadForm } from "./LeadForm";
import { leadCopy } from "@/content/chatbot/lead-copy";
import { shouldOfferLead, suggestedService } from "@/lib/chatbot/qualification";
import { Button } from "@/components/ui/Button";
import { chatCopy } from "@/content/chatbot/copy";
import { CHAT_CONSENT_VERSION, MESSAGE_LIMIT, readEvents, type ChatEvent, type ChatMessage, type ChatLink } from "@/lib/chatbot/contracts";
import { previewEvents } from "@/lib/chatbot/preview";
import type { Locale, Localized } from "@/lib/i18n";
import { localizedPath } from "@/lib/routes";

type Props = { locale: Locale; open: boolean; onClose: () => void; privacyUrls: Localized<string | null>; previewLinks?: ChatLink[] };
type Phase = "welcome" | "idle" | "sending" | "streaming" | "error";
type Attempt = { message: string; clientMessageId: string };
const control = "inline-flex min-h-11 min-w-11 items-center justify-center rounded-control hover:bg-accent-soft hover:text-brand disabled:opacity-50";
export default function ChatPanel({ locale, open, onClose, privacyUrls, previewLinks }: Props) {
  const copy = chatCopy[locale];
  const preview = previewLinks !== undefined;
  const localTest = !preview && Boolean(privacyUrls[locale]?.includes("/api/chat/local-notice/"));
  const lead = leadCopy[locale];
  const privacyHref = privacyUrls[locale];
  const blocked = !preview && !privacyHref;
  const [offerLead, setOfferLead] = useState(false);
  const [leadDeclined, setLeadDeclined] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [leadReceived, setLeadReceived] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const transcript = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const follow = useRef(true);
  const controller = useRef<AbortController | null>(null);
  const [lastAttempt, setLastAttempt] = useState<Attempt | null>(null);
  const busyRef = useRef(false);
  const [phase, setPhase] = useState<Phase>("welcome");
  const [consented, setConsented] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pendingConsent, setPendingConsent] = useState(false);
  const [restoring, setRestoring] = useState(!preview && Boolean(privacyHref));
  const busy = phase === "sending" || phase === "streaming";

  useEffect(() => {
    if (open && consented && !preview) trackChatInteraction("chat_open",locale);
  },[open,consented,preview,locale]);

  useEffect(() => {
    const element = dialog.current;
    if (!element || !open) { element?.close(); return; }
    const media = window.matchMedia("(max-width: 639px)");
    const show = () => {
      element.close();
      if (media.matches) element.showModal(); else element.show();
    };
    show();
    media.addEventListener("change", show);
    return () => { media.removeEventListener("change", show); element.close(); };
  }, [open]);

  useEffect(() => {
    if (preview || !privacyHref) return () => controller.current?.abort();
    const abort = new AbortController();
    fetch("/api/chat/session/", { cache: "no-store", signal: abort.signal })
      .then(async (response) => {
        if (!response.ok) return;
        const data = await response.json() as { messages: ChatMessage[]; leadDeclined: boolean; leadReceived: boolean };
        setMessages(data.messages.map((m) => ({ ...m, status: m.status === "pending" ? "error" : m.status })));
        setLeadDeclined(Boolean(data.leadDeclined)); setLeadReceived(Boolean(data.leadReceived));
        setConsented(true); setPhase("idle");
      }).catch(() => undefined).finally(() => { if (!abort.signal.aborted) setRestoring(false); });
    return () => { abort.abort(); controller.current?.abort(); };
  }, [preview, privacyHref]);

  useEffect(() => {
    if (follow.current && transcript.current) transcript.current.scrollTop = transcript.current.scrollHeight;
  }, [messages, open, error]);

  async function ensureSession(signal: AbortSignal) {
    if (consented) return;
    if (!preview) {
      setPendingConsent(true);
      try {
        const response = await fetch("/api/chat/session/", { method: "POST", signal, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ locale, consent: true, consentVersion: CHAT_CONSENT_VERSION }) });
        if (!response.ok) {
          const data = await response.json() as { code: string };
          throw new Error(data.code);
        }
      } finally { setPendingConsent(false); }
    }
    setConsented(true);
  }

  function restart() {
    if (busyRef.current) return;
    setShowLead(false); setOfferLead(false); setLeadDeclined(false); setLeadReceived(false);
    setMessages([]); setConsented(false); setPhase("welcome"); setError(null); setDraft(""); setLastAttempt(null);
    // The next first-message submission records the renewed notice acceptance.
  }

  async function send(attempt: Attempt, quickAction = false) {
    if (busyRef.current || restoring || blocked || !attempt.message.trim()) return;
    busyRef.current = true;
    setLastAttempt(attempt);
    setOfferLead(false);
    const abort = new AbortController(); controller.current = abort;
    const assistantId = `assistant:${attempt.clientMessageId}`;
    setError(null); setPhase("sending"); follow.current = true;
    let finished = false;
    try {
      await ensureSession(abort.signal);
      if (abort.signal.aborted) throw new Error("CANCELLED");
      if (!preview && quickAction) trackChatInteraction("quick_action_click", locale);
      setDraft("");
      setMessages((previous) => [
        ...previous.filter((m) => !(m.role === "assistant" && m.clientMessageId === attempt.clientMessageId)),
        ...(!previous.some((m) => m.role === "user" && m.clientMessageId === attempt.clientMessageId) ? [{ id: attempt.clientMessageId, role: "user" as const, content: attempt.message, status: "completed" as const, clientMessageId: attempt.clientMessageId }] : []),
        { id: assistantId, role: "assistant", content: "", status: "pending", clientMessageId: attempt.clientMessageId },
      ]);
      let events: AsyncIterable<unknown>;
      if (preview) {
        events = previewEvents(copy.preview.response, previewLinks, abort.signal);
      } else {
        const response = await fetch("/api/chat/", { method: "POST", signal: abort.signal, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...attempt, locale }) });
        if (!response.ok || !response.body) {
          const data = await response.json() as { code: string };
          throw new Error(data.code);
        }
        events = readEvents(response.body);
      }
      for await (const raw of events) {
        const event = raw as ChatEvent;
        if (event.type === "delta") {
          setPhase("streaming");
          setMessages((previous) => previous.map((m) => m.id === assistantId ? { ...m, content: m.content + event.text } : m));
        } else if (event.type === "links") {
          setMessages((previous) => previous.map((m) => m.id === assistantId ? { ...m, links: event.links } : m));
        } else if (event.type === "lead_offer") {
          setOfferLead(true);
        } else if (event.type === "error") throw new Error(event.code);
        else if (event.type === "done") {
          finished = true;
          setMessages((previous) => previous.map((m) => m.id === assistantId ? { ...m, status: event.status } : m));
          if (event.status === "error") throw new Error("STREAM_ERROR");
        }
      }
      if (!finished) throw new Error("STREAM_ERROR");
      if (preview && shouldOfferLead(attempt.message, leadDeclined)) setOfferLead(true);
      setPhase("idle");
    } catch (err) {
      const cancelled = abort.signal.aborted;
      setMessages((previous) => previous.map((m) => m.id === assistantId ? { ...m, status: cancelled ? "cancelled" : "error" } : m));
      setError(cancelled ? "CANCELLED" : err instanceof Error ? err.message : "STREAM_ERROR");
      setPhase("error");
    } finally { busyRef.current = false; controller.current = null; }
  }

  function declineLead() {
    setOfferLead(false); setLeadDeclined(true);
    if (!preview) void fetch("/api/chat/lead/preference/", { method: "POST", keepalive: true, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ declined: true }) }).catch(() => undefined);
  }
  function openLead() {
    if (!preview) trackChatInteraction("lead_form_open",locale); setShowLead(true); follow.current = false; requestAnimationFrame(() => { if (transcript.current) transcript.current.scrollTop = 0; }); }
  function submit(event: FormEvent) { event.preventDefault(); void send({ message: draft.trim(), clientMessageId: crypto.randomUUID() }); }
  return (
    <dialog ref={dialog} data-chat-panel data-chat-preview={preview || undefined} aria-labelledby="chat-title" onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={(event) => {
        if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
        if (event.key !== "Tab" || !window.matchMedia("(max-width: 639px)").matches) return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], textarea:not(:disabled), [tabindex="0"]');
        const first = controls[0]; const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }}
      className="chat-panel fixed m-0 flex-col overflow-hidden rounded-card bg-surface p-0 text-ink shadow-xl backdrop:bg-brand/30">
      <header className="flex shrink-0 items-center justify-between gap-2 bg-brand px-4 py-3 text-on-brand">
        <div><h2 id="chat-title" className="text-body font-semibold" tabIndex={-1} autoFocus>NMark Assistant</h2><p className="text-small text-on-brand-muted">{preview ? copy.preview.label : localTest ? copy.local.label : copy.ai}</p></div>
        <div className="flex"><button type="button" aria-label={copy.restart} title={copy.restart} disabled={busy || pendingConsent || restoring || leadSubmitting} onClick={restart} className={control}><RotateCcw className="size-4" aria-hidden="true" /></button>
          <button type="button" aria-label={copy.close} onClick={onClose} className={control}><X className="size-5" aria-hidden="true" /></button></div>
      </header>
      <div ref={transcript} className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain p-5" onScroll={(event) => { const el = event.currentTarget; follow.current = el.scrollHeight - el.scrollTop - el.clientHeight < 72; }}>
        {localTest && <p className="text-small text-muted" data-chat-local-test>{copy.local.notice}</p>}
        {showLead ? <LeadForm locale={locale} preview={preview} privacyUrl={privacyUrls[locale]} service={suggestedService(lastAttempt?.message ?? "")} onBusyChange={setLeadSubmitting} description={messages.filter((message) => message.role === "user").slice(-3).map((message) => message.content).join("\n")} onCancel={() => { setShowLead(false); if (!leadReceived) declineLead(); }} onReceived={() => { setLeadReceived(true); setOfferLead(false); }} /> : <>
        {preview && <p className="text-small text-muted">{copy.preview.notice}</p>}
        <p className="text-small leading-relaxed">{copy.welcome}</p>
        {pendingConsent && <p className="text-small text-muted">{copy.starting}</p>}
        {messages.length === 0 && <div className="flex flex-wrap gap-2">{copy.quickActions.map((text) => <button key={text} type="button" onClick={() => { void send({ message: text, clientMessageId: crypto.randomUUID() }, true); }} disabled={busy || restoring || blocked} className="min-h-11 rounded-control border border-border px-3 py-2 text-left text-small hover:bg-accent-soft disabled:opacity-50">{text}</button>)}</div>}
        <div role="log" aria-label="NMark Assistant" aria-live="off" className="space-y-5">
          {messages.map((m) => <article key={m.id} className={m.role === "user" ? "ml-7 rounded-control bg-accent-soft p-3" : "mr-2"}>
            <p className="mb-1 text-small font-semibold text-brand">{m.role === "user" ? copy.you : "NMark Assistant"}</p>
            <p className="whitespace-pre-wrap break-words text-small leading-relaxed">{m.content || (m.status === "pending" ? copy.busy : copy.errors.STREAM_ERROR)}</p>
            {m.role === "assistant" && m.status === "cancelled" && <p className="mt-2 text-small text-muted">{copy.cancelled}</p>}
            {m.links?.map((link) => <Link key={link.id} href={new URL(link.url).pathname} className="mt-3 flex items-start justify-between gap-2 border-t border-border pt-3 text-small text-brand underline-offset-4 hover:underline" onClick={() => { if (!preview) trackChatInteraction("knowledge_link_click",locale); onClose(); }}>
              <span><span className="block font-semibold">{link.title}</span>{link.category === "project" && <span className="mt-1 block text-muted">{link.description}</span>}</span><ArrowUpRight className="mt-1 size-4 shrink-0" aria-hidden="true" />
            </Link>)}
          </article>)}
        </div>
        {error && <div role="alert" className="space-y-2 border-t border-border pt-3 text-small">
          <p>{error === "CANCELLED" ? copy.cancelled : copy.errors[error] ?? copy.errors.UNAVAILABLE}</p>
          {error === "SESSION_EXPIRED" ? <button type="button" className="min-h-11 font-semibold underline" onClick={restart}>{copy.restart}</button>
            : lastAttempt && <button type="button" disabled={busy} className="min-h-11 font-semibold underline" onClick={() => { if (lastAttempt) void send(lastAttempt); }}>{copy.retry}</button>}
        </div>}
        {offerLead && !leadReceived && !busy && <aside className="space-y-2 border-t border-border pt-4" aria-label={lead.open}><p className="text-small">{lead.offer}</p><Button onClick={openLead}>{lead.open}</Button><button type="button" onClick={declineLead} className="ml-3 min-h-11 text-small text-brand underline">{lead.decline}</button></aside>}
        </>}
      </div>
      <footer className="shrink-0 border-t border-border bg-surface px-4 pt-3 pb-4">
        <p role="status" className="sr-only">{pendingConsent ? copy.starting : busy ? copy.busy : error ? copy.errors[error] ?? copy.cancelled : messages.at(-1)?.role === "assistant" && messages.at(-1)?.status === "completed" ? messages.at(-1)?.content : ""}</p>
        {!showLead && <form onSubmit={submit}>
          <label htmlFor="chat-message" className="sr-only">{copy.input}</label>
          <div className="flex items-end gap-2 rounded-control border border-border p-2 focus-within:border-focus">
            <textarea ref={input} id="chat-message" value={draft} maxLength={MESSAGE_LIMIT} rows={2} disabled={busy} aria-describedby="chat-privacy-notice" placeholder={copy.input} className="min-w-0 flex-1 resize-none bg-transparent p-1 text-small focus:outline-none disabled:opacity-50"
              onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); if (draft.trim()) void send({ message: draft.trim(), clientMessageId: crypto.randomUUID() }); } }} />
            {busy ? <button type="button" aria-label={copy.stop} onClick={() => controller.current?.abort()} className={`${control} bg-brand text-on-brand`}><Square className="size-4" aria-hidden="true" /></button>
              : <button type="submit" aria-label={copy.send} disabled={!draft.trim() || restoring || blocked} className={`${control} bg-brand text-on-brand`}><ArrowUp className="size-5" aria-hidden="true" /></button>}
          </div>
          <p className="mt-1 text-right text-xs text-muted">{draft.length}/{MESSAGE_LIMIT}</p>
          <p id="chat-privacy-notice" className="mt-2 text-xs leading-relaxed text-muted">
            {!preview && <>{copy.consent} {!consented && copy.firstMessageConsent} </>}
            <a href={privacyHref ?? localizedPath("privacy", locale)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center font-medium text-brand underline underline-offset-4">{localTest ? copy.local.link : copy.privacy}</a>
          </p>
          {blocked && <p role="status" className="mt-2 text-small text-muted">{copy.errors.UNAVAILABLE}</p>}
        </form>}
        {consented && !showLead && !busy && !leadReceived && <button type="button" onClick={openLead} className="mr-3 min-h-11 text-small font-semibold text-brand underline underline-offset-4">{lead.open}</button>}
        {leadReceived && !showLead && <p className="text-small text-muted">{preview ? lead.previewSuccess : lead.received}</p>}
        <Link href={localizedPath("contact", locale)} onClick={onClose} className="inline-flex min-h-11 items-center text-small font-medium text-brand underline underline-offset-4">{copy.contact}<ArrowUpRight className="ml-1 size-4" aria-hidden="true" /></Link>
      </footer>
    </dialog>
  );
}
