"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { adminCopy } from "@/content/chatbot/admin-copy";
import { leadStatuses } from "@/lib/chatbot/lead-contracts";
import type { Locale } from "@/lib/i18n";

export function RecordActions({ locale, kind, id, status, note = "", notificationStatus }: { locale: Locale; kind: "lead" | "conversation"; id: string; status?: string; note?: string; notificationStatus?: string }) {
  const copy = adminCopy[locale]; const router = useRouter(); const locked = useRef(false);
  const [busy, setBusy] = useState(false); const [feedback, setFeedback] = useState<string | null>(null);
  const [selected, setSelected] = useState(status ?? "new"); const [internalNote, setNote] = useState(note);
  const [confirm, setConfirm] = useState(false); const [retry, setRetry] = useState(false);
  const endpoint = `/api/admin/${kind === "lead" ? "leads" : "conversations"}/${id}/`;
  async function mutate(method: string, body: unknown, suffix = "") {
    if (locked.current) return;
    locked.current = true; setBusy(true); setFeedback(null);
    try {
      const response = await fetch(endpoint + suffix, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const result = await response.json() as { code?: string };
      if (!response.ok) throw new Error(result.code ?? "UNAVAILABLE");
      if (method === "DELETE") router.push(`/admin/${locale}/${kind === "lead" ? "leads" : "conversations"}/`);
      else { setFeedback("saved"); setRetry(false); router.refresh(); }
    } catch (error) { setFeedback(error instanceof Error ? error.message : "UNAVAILABLE"); }
    finally { locked.current = false; setBusy(false); }
  }
  return <div className="space-y-8">
    {kind === "lead" && <form onSubmit={(event) => { event.preventDefault(); void mutate("PATCH", { status: selected, internalNote }); }} className="space-y-4 border-t border-border pt-6">
      <label htmlFor="admin-lead-status" className="block text-small font-semibold text-brand">{copy.status}</label><select id="admin-lead-status" value={selected} disabled={busy} onChange={(event) => setSelected(event.target.value)} className="min-h-11 rounded-control border border-border bg-surface px-3">{leadStatuses.map((value) => <option key={value} value={value}>{copy.statuses[value]}</option>)}</select>
      <label htmlFor="admin-note" className="block text-small font-semibold text-brand">{copy.note}</label><textarea id="admin-note" rows={4} maxLength={4000} value={internalNote} disabled={busy} onChange={(event) => setNote(event.target.value)} className="w-full rounded-control border border-border p-3 text-small" />
      <Button type="submit" disabled={busy}>{busy ? copy.loading : copy.save}</Button>
    </form>}
    {kind === "lead" && ["failed", "uncertain"].includes(notificationStatus ?? "") && <section className="space-y-4 border-t border-border pt-6"><h2 className="text-body font-semibold text-brand">{copy.attention}</h2><label className="flex items-start gap-3 text-small"><input type="checkbox" checked={retry} onChange={(event) => setRetry(event.target.checked)} className="mt-1 size-4 shrink-0 accent-brand" />{copy.retryConfirm}</label><Button disabled={!retry || busy} variant="secondary" onClick={() => void mutate("POST", { verifiedNotDelivered: true }, "notification/")}>{copy.retry}</Button></section>}
    <details className="border-t border-border pt-6"><summary className="min-h-11 text-small font-semibold text-brand">{copy.danger}</summary><p className="my-4 max-w-prose text-small text-muted">{kind === "lead" ? copy.deleteLead : copy.deleteConversation}</p><label className="flex min-h-11 items-center gap-3 text-small"><input type="checkbox" checked={confirm} onChange={(event) => setConfirm(event.target.checked)} className="size-4 accent-brand" />{copy.confirmDelete}</label><Button disabled={!confirm || busy} variant="secondary" onClick={() => void mutate("DELETE", { confirm: true })}>{copy.delete}</Button></details>
    {feedback && <p role={feedback === "saved" ? "status" : "alert"} className="text-small">{feedback === "saved" ? copy.saved : copy.errors[feedback] ?? copy.errors.UNAVAILABLE}</p>}
  </div>;
}
