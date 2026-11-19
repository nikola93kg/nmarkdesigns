"use client";
import { hasAnalyticsConsent } from "../analytics";
import type { Locale } from "../i18n";
import type { z } from "zod";
import type { clientMetricInput } from "./event-contracts";
/** Optional interaction analytics require the existing analytics consent AND a chat-owned cookie. */
export function trackChatInteraction(event: z.infer<typeof clientMetricInput>["event"],locale: Locale) {
  if (!hasAnalyticsConsent()) return;
  void fetch("/api/chat/events/", {method:"POST",keepalive:true,headers:{"Content-Type":"application/json"},body:JSON.stringify({event,eventId:crypto.randomUUID(),locale,analyticsConsent:true})}).catch(()=>undefined);
}
