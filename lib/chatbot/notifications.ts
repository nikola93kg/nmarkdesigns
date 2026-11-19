import "server-only";
import { recordMetric } from "./analytics";
import { randomUUID, timingSafeEqual, createHash } from "node:crypto";
import { and, asc, eq, lte, sql } from "drizzle-orm";
import { createSmtpTransport, getSmtpConfig } from "../contact-delivery";
import { site } from "../../content/site";
import { chatDb } from "./db";
import { chatLeads, chatSessions, leadNotifications } from "./schema";
import { adminConfig, adminReady } from "./admin/config";
import { ChatError } from "./security";

type Lead = typeof chatLeads.$inferSelect;
export type NotificationResult = { status: "sent"; messageId: string } | { status: "retryable" | "uncertain"; code: string };
export type NotificationSender = (lead: Lead) => Promise<NotificationResult>;

export function authorizeMaintenance(request: Request) {
  const expected = process.env.CHAT_CRON_SECRET;
  const supplied = request.headers.get("authorization") ?? "";
  const hash = (value: string) => createHash("sha256").update(value).digest();
  if (!expected || expected.length < 32 || !timingSafeEqual(hash(`Bearer ${expected}`), hash(supplied))) throw new ChatError("FORBIDDEN", 403);
}
export function notificationMessage(lead: Lead, from: string, recipient: string) {
  const adminOrigin = adminReady() ? adminConfig().origin : null;
  const unavailable = lead.locale === "sr" ? "Nije navedeno" : "Not provided";
  const line = (value: string) => value || unavailable;
  return {
    from: { name: "NMark Assistant", address: from }, to: recipient,
    replyTo: { name: lead.name, address: lead.email },
    messageId: `<nmark-lead-${lead.id}@nmarkdesigns.com>`,
    subject: lead.locale === "sr" ? `NMark AI — novi upit: ${lead.service}` : `NMark AI — new inquiry: ${lead.service}`,
    text: [
      "NMark Assistant — structured inquiry / strukturisan upit", `Lead: ${lead.id}`, `Session: ${lead.sessionId}`,
      `Time: ${new Intl.DateTimeFormat("sr-Latn", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Belgrade" }).format(lead.createdAt)} (Europe/Belgrade)`,
      `Language: ${lead.locale}`, `Name: ${lead.name}`, `Email: ${lead.email}`, `Phone: ${line(lead.phone)}`,
      `Company: ${line(lead.company)}`, `Website: ${line(lead.website)}`, `Service: ${lead.service}`,
      `Budget: ${line(lead.budgetRange)}`, `Timeframe: ${line(lead.timeframe)}`, `Preferred contact: ${lead.preferredContactMethod}`,
      "", "Project description (reviewed by visitor, no AI additions):", line(lead.projectDescription),
      "", `Contact consent: ${lead.consentVersion} / ${lead.privacyConsentAt.toISOString()}`,
      ...(adminOrigin ? ["", `Admin (sign-in required): ${adminOrigin}/admin/${lead.locale}/leads/${lead.id}/`, `Transcript (sign-in required): ${adminOrigin}/admin/${lead.locale}/conversations/${lead.sessionId}/`] : []),
    ].join("\n"),
    disableFileAccess: true, disableUrlAccess: true,
  };
}

/** Never store SMTP error messages: they can contain recipient addresses or credentials. */
export function classifyMailError(error: unknown): NotificationResult {
  const details = typeof error === "object" && error !== null ? error as Record<string, unknown> : {};
  const responseCode = typeof details.responseCode === "number" ? details.responseCode : 0;
  const command = typeof details.command === "string" ? details.command : "";
  if (responseCode >= 400 && responseCode < 600) return { status: "retryable", code: "SMTP_REJECTED" };
  if (["CONN", "AUTH", "EHLO", "HELO", "STARTTLS", "MAIL FROM", "RCPT TO"].includes(command)) return { status: "retryable", code: "SMTP_PRE_DELIVERY" };
  // Timeout/disconnect after DATA may have happened AFTER SMTP acceptance. Automatic resend is unsafe.
  return { status: "uncertain", code: "SMTP_ACCEPTANCE_UNKNOWN" };
}
export const deliverNotification: NotificationSender = async (lead) => {
  const config = getSmtpConfig();
  if (!config || process.env.CHAT_EMAIL_ENABLED !== "true") return { status: "retryable", code: "SMTP_UNAVAILABLE" };
  const recipient = process.env.CHAT_LEAD_RECIPIENT?.trim() || site.email;
  const transport = createSmtpTransport(config);
  try {
    const result = await transport.sendMail(notificationMessage(lead, config.user, recipient));
    const accepted = result.accepted?.some((address) => address.toLowerCase() === recipient.toLowerCase());
    if (!accepted) return { status: "retryable", code: "SMTP_REJECTED" };
    return { status: "sent", messageId: String(result.messageId).slice(0, 254) };
  } catch (error) { return classifyMailError(error); }
  finally { transport.close(); }
};

/** Cron owns the awaited work; transactional row claims make parallel cron invocations safe. */
export async function runNotificationBatch(sender: NotificationSender = deliverNotification, limit = 2, now = new Date()) {
  const db = chatDb();
  const counts = { processed: 0, sent: 0, pending: 0, failed: 0, uncertain: 0 };
  const stale = await db.select({ notification: leadNotifications, sessionId: chatLeads.sessionId, locale: chatLeads.locale }).from(leadNotifications)
    .innerJoin(chatLeads,eq(chatLeads.id,leadNotifications.leadId)).where(and(eq(leadNotifications.status,"processing"),lte(leadNotifications.leaseUntil,now))).limit(100);
  for (const item of stale) await db.transaction(async(tx) => {
    const [session] = await tx.select().from(chatSessions).where(eq(chatSessions.id,item.sessionId)).for("update");
    if (!session) return;
    const [row] = await tx.select().from(leadNotifications).where(eq(leadNotifications.id,item.notification.id)).for("update");
    if (row?.status!=="processing" || !row.leaseUntil || row.leaseUntil>now) return;
    await tx.update(leadNotifications).set({status:"uncertain",lastErrorCode:"WORKER_ACCEPTANCE_UNKNOWN",claimId:null,leaseUntil:null}).where(eq(leadNotifications.id,row.id));
    await recordMetric(tx,session.id,item.locale,"notification_failure",row.id,now);
  });
  for (let i = 0; i < Math.min(limit, 2); i++) {
    const claimed = await db.transaction(async (tx) => {
      const [notification] = await tx.select().from(leadNotifications)
        .where(and(eq(leadNotifications.status, "pending"), lte(leadNotifications.nextRetryAt, now)))
        .orderBy(asc(leadNotifications.nextRetryAt)).limit(1).for("update", { skipLocked: true });
      if (!notification) return null;
      const claimId = randomUUID();
      await tx.update(leadNotifications).set({ status: "processing", attempts: sql`${leadNotifications.attempts} + 1`, claimId,
        leaseUntil: new Date(now.getTime() + 180000) }).where(eq(leadNotifications.id, notification.id));
      const [lead] = await tx.select().from(chatLeads).where(eq(chatLeads.id, notification.leadId));
      return { ...notification, attempts: notification.attempts + 1, claimId, lead };
    });
    if (!claimed) break;
    let result: NotificationResult;
    try { result = await sender(claimed.lead); }
    catch { result = { status: "uncertain", code: "DELIVERY_EXCEPTION" }; }
    const status = result.status === "sent" ? "sent" : result.status === "uncertain" ? "uncertain" : claimed.attempts >= 5 ? "failed" : "pending";
    await db.transaction(async (tx) => {
      const [session] = await tx.select().from(chatSessions).where(eq(chatSessions.id, claimed.lead.sessionId)).for("update");
      if (!session) return;
      const [current] = await tx.select().from(leadNotifications).where(eq(leadNotifications.id, claimed.id)).for("update");
      if (current?.claimId !== claimed.claimId) return;
      if (result.status !== "sent") await recordMetric(tx, session.id, claimed.lead.locale, "notification_failure", claimed.id, now);
    await tx.update(leadNotifications).set({ status, claimId: null, leaseUntil: null,
      lastErrorCode: result.status === "sent" ? null : result.code,
      providerMessageId: result.status === "sent" ? result.messageId : null,
      sentAt: result.status === "sent" ? new Date() : null,
      nextRetryAt: new Date(now.getTime() + Math.min(86400, 60 * 2 ** (claimed.attempts - 1)) * 1000),
    }).where(and(eq(leadNotifications.id, claimed.id), eq(leadNotifications.claimId, claimed.claimId)));
    });
    counts.processed++; counts[status]++;
  }
  return counts;
}
