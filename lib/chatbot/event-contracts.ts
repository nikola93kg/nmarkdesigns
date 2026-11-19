import { z } from "zod";
export const clientMetricInput = z.object({
  event: z.enum(["chat_open", "quick_action_click", "knowledge_link_click", "lead_form_open"]),
  eventId: z.uuid(), locale: z.enum(["sr","en"]), analyticsConsent: z.literal(true),
}).strict();
