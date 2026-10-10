"use server";

import { headers } from "next/headers";
import { initialContactState, type ContactFormState } from "@/lib/contact";
import { contactDelivery } from "@/lib/contact-delivery";
import { validateContact } from "@/lib/contact-validation";
import { isLocale, type Locale } from "@/lib/i18n";
import { checkDuplicateSubmission, checkRateLimit } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function submitContact(
  locale: Locale,
  previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Client state is not validation or delivery evidence.
  void previousState;
  if (!isLocale(locale)) return { ...initialContactState, status: "error" };

  // 1. Validate form fields and honeypot
  const result = validateContact(formData);

  // If honeypot caught a bot, silently reject or report invalid without executing delivery
  if (result.isSpamBot) {
    return {
      status: "invalid",
      values: result.values,
      errors: { form: "spamDetected" },
    };
  }

  if (!result.valid) {
    return { status: "invalid", values: result.values, errors: result.errors };
  }

  // 2. Extract Client IP for rate limiting
  let clientIp = "unknown";
  try {
    const headersList = await headers();
    clientIp =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip")?.trim() ||
      "unknown";
  } catch {
    // Edge/build context fallback
    clientIp = "unknown";
  }

  // 3. Sliding Window Rate Limiting (max 5 requests per 10 minutes per IP)
  if (!checkRateLimit(clientIp, 5, 10 * 60 * 1000)) {
    return {
      status: "invalid",
      values: result.values,
      errors: { form: "rateLimited" },
    };
  }

  // 4. Duplicate submission prevention (debounce 15 seconds on identical email + message)
  const submissionFingerprint = `${clientIp}:${result.values.email}:${result.values.message}`;
  if (checkDuplicateSubmission(submissionFingerprint, 15_000)) {
    return {
      status: "invalid",
      values: result.values,
      errors: { form: "rateLimited" },
    };
  }

  // 5. Cloudflare Turnstile token verification
  const turnstile = await verifyTurnstileToken(result.turnstileToken, clientIp);
  if (!turnstile.success) {
    return {
      status: "invalid",
      values: result.values,
      errors: { form: "turnstileFailed" },
    };
  }

  // 6. Deliver via SMTP
  try {
    const delivery = await contactDelivery.send({ ...result.values, locale });
    const status =
      delivery.status === "accepted"
        ? "success"
        : delivery.status === "unavailable"
          ? "unavailable"
          : "error";

    // On success, reset input values; on failure/unavailable, preserve customer's input values
    const returnValues = status === "success" ? initialContactState.values : result.values;
    return { status, values: returnValues, errors: {} };
  } catch {
    return { status: "error", values: result.values, errors: {} };
  }
}
