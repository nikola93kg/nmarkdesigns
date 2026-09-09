import "server-only";
import type { ContactValues } from "@/lib/contact";
import type { Locale } from "@/lib/i18n";

export interface ContactSubmission extends ContactValues {
  locale: Locale;
}

type DeliveryResult = { status: "unavailable" | "failed" | "accepted" };

interface ContactDelivery {
  available: boolean;
  send: (submission: ContactSubmission) => Promise<DeliveryResult>;
}

// No provider is configured. Do not persist, log, queue, or claim to send messages.
// A future adapter may return "accepted" only after a real provider acknowledgement.
export const contactDelivery: ContactDelivery = {
  available: false,
  async send() {
    return { status: "unavailable" };
  },
};
