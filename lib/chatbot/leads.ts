import "server-only";
import { recordMetric } from "./analytics";
import { randomUUID } from "node:crypto";
import { and, eq } from "drizzle-orm";
import { chatDb } from "./db";
import { chatLeads, chatSessions, leadNotifications } from "./schema";
import { ChatError, hashToken } from "./security";
import { consumeLimit } from "./store";
import { CHAT_CONSENT_VERSION } from "./contracts";
import type { LeadInput, LeadReceipt } from "./lead-contracts";

/** The server has no AI action for creating a lead; only an explicit validated form can call this. */
export async function receiveLead(sessionId: string, input: LeadInput, identity: string): Promise<LeadReceipt> {
  return chatDb().transaction(async (tx) => {
    const [session] = await tx.select().from(chatSessions).where(eq(chatSessions.id, sessionId)).for("update");
    if (!session || session.expiresAt <= new Date() || session.consentVersion !== CHAT_CONSENT_VERSION) throw new ChatError("SESSION_EXPIRED", 401);
    const payloadHash = hashToken(JSON.stringify(input));
    const [previous] = await tx.select().from(chatLeads).where(and(eq(chatLeads.sessionId, sessionId), eq(chatLeads.clientSubmissionId, input.clientSubmissionId)));
    if (previous) {
      if (previous.payloadHash !== payloadHash) throw new ChatError("SUBMISSION_CONFLICT", 409);
      const [notification] = await tx.select().from(leadNotifications).where(eq(leadNotifications.leadId, previous.id));
      return { leadId: previous.id, status: "received", notificationStatus: notification?.status === "sent" ? "sent" : "pending" };
    }
    await consumeLimit(tx, identity, "lead", 3, 86400);
    await consumeLimit(tx, sessionId, "lead", 3, 86400);
    const id = randomUUID();
    const now = new Date();
    await tx.insert(chatLeads).values({ id, sessionId, clientSubmissionId: input.clientSubmissionId, payloadHash,
      locale: input.locale, name: input.name, email: input.email, phone: input.phone, company: input.company,
      website: input.website, service: input.service, budgetRange: input.budgetRange, timeframe: input.timeframe,
      projectDescription: input.projectDescription, preferredContactMethod: input.preferredContactMethod,
      privacyConsentAt: now, consentVersion: input.consentVersion, createdAt: now });
    await tx.insert(leadNotifications).values({ id: randomUUID(), leadId: id, status: "pending", nextRetryAt: now, createdAt: now });
    await recordMetric(tx, sessionId, input.locale, "lead_submit_success", id, now);
    await tx.update(chatSessions).set({ lastActivityAt: now, lastLeadAt: now }).where(eq(chatSessions.id, sessionId));
    return { leadId: id, status: "received", notificationStatus: "pending" };
  });
}
