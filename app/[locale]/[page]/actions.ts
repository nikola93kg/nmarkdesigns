"use server";

import { initialContactState, type ContactFormState } from "@/lib/contact";
import { contactDelivery } from "@/lib/contact-delivery";
import { validateContact } from "@/lib/contact-validation";
import { isLocale, type Locale } from "@/lib/i18n";

export async function submitContact(
  locale: Locale,
  previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Client state is not validation or delivery evidence.
  void previousState;
  if (!isLocale(locale)) return { ...initialContactState, status: "error" };
  const result = validateContact(formData);
  if (!result.valid) return { status: "invalid", values: result.values, errors: result.errors };

  try {
    const delivery = await contactDelivery.send({ ...result.values, locale });
    const status = delivery.status === "accepted" ? "success" : delivery.status === "unavailable" ? "unavailable" : "error";
    return { status, values: result.values, errors: {} };
  } catch {
    return { status: "error", values: result.values, errors: {} };
  }
}
