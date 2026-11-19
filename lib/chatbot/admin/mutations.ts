import "server-only";
import { syncSessionMetrics } from "../analytics";
import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { chatDb } from "../db";
import { adminAuditLogs, chatLeads, chatSessions, leadNotifications } from "../schema";
import { requireOwner } from "./access";
import { idSchema, type LeadUpdate } from "./contracts";
import { ChatError } from "../security";

export async function updateLead(id: string, input: LeadUpdate) {
  const owner = await requireOwner(); idSchema.parse(id);
  await chatDb().transaction(async (tx) => {
    const [item] = await tx.select().from(chatLeads).where(eq(chatLeads.id, id)).for("update");
    if (!item) throw new ChatError("NOT_FOUND", 404);
    await tx.update(chatLeads).set({ status: input.status, internalNote: input.internalNote }).where(eq(chatLeads.id, id));
    const actions = [...(item.status !== input.status ? [`lead.status.${input.status}`] : []), ...((item.internalNote ?? "") !== input.internalNote ? ["lead.note_updated"] : [])];
    if (actions.length) await tx.insert(adminAuditLogs).values(actions.map((action) => ({ id: randomUUID(), adminIdentity: owner, action, targetType: "lead", targetId: id, createdAt: new Date() })));
  });
}
export async function deleteRecord(kind: "lead" | "conversation", id: string) {
  const owner = await requireOwner(); idSchema.parse(id);
  await chatDb().transaction(async (tx) => {
    let sessionId = id;
    if (kind === "lead") { const [lead] = await tx.select().from(chatLeads).where(eq(chatLeads.id, id)); if (!lead) throw new ChatError("NOT_FOUND", 404); sessionId = lead.sessionId; }
    const [session] = await tx.select().from(chatSessions).where(eq(chatSessions.id, sessionId)).for("update");
    if (!session) throw new ChatError("NOT_FOUND", 404);
    if (session.activeUntil && session.activeUntil > new Date()) throw new ChatError("BUSY", 409);
    const related = await tx.select({ id: chatLeads.id }).from(chatLeads).where(eq(chatLeads.sessionId, sessionId));
    for (const item of related) {
      const rows = await tx.select().from(leadNotifications).where(eq(leadNotifications.leadId, item.id)).for("update");
      if (rows.some((row) => row.status === "processing" && (!row.leaseUntil || row.leaseUntil > new Date()))) throw new ChatError("BUSY", 409);
    }
    await syncSessionMetrics(tx, sessionId, session.locale);
    if (kind === "lead") await tx.delete(chatLeads).where(eq(chatLeads.id, id));
    else await tx.delete(chatSessions).where(eq(chatSessions.id, id));
    await tx.insert(adminAuditLogs).values({ id: randomUUID(), adminIdentity: owner, action: `${kind}.deleted`, targetType: kind, targetId: id, createdAt: new Date() });
  });
}
export async function requeueNotification(id: string) {
  const owner = await requireOwner(); idSchema.parse(id);
  await chatDb().transaction(async (tx) => {
    const [notification] = await tx.select().from(leadNotifications).where(eq(leadNotifications.leadId, id)).for("update");
    if (!notification) throw new ChatError("NOT_FOUND", 404);
    if (!["failed", "uncertain"].includes(notification.status)) throw new ChatError("BUSY", 409);
    await tx.update(leadNotifications).set({ status: "pending", attempts: 0, nextRetryAt: new Date(), lastErrorCode: null, claimId: null, leaseUntil: null }).where(eq(leadNotifications.id, notification.id));
    await tx.insert(adminAuditLogs).values({ id: randomUUID(), adminIdentity: owner, action: "notification.requeued_after_review", targetType: "lead", targetId: id, createdAt: new Date() });
  });
}
