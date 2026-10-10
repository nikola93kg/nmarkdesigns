import { contactFields, contactLimits, type ContactErrors, type ContactValues } from "@/lib/contact";

export interface ExtendedContactValidationResult {
  valid: boolean;
  values: ContactValues;
  errors: ContactErrors;
  isSpamBot: boolean;
  turnstileToken?: string;
}

export function validateContact(formData: FormData): ExtendedContactValidationResult {
  const values: ContactValues = { name: "", email: "", phone: "", message: "" };
  const errors: ContactErrors = {};

  // 1. Honeypot check: The field '_hp_website' must be absent or strictly empty.
  // Bots typically populate all input fields they encounter.
  const honeypot = formData.get("_hp_website");
  const isSpamBot = typeof honeypot === "string" && honeypot.trim().length > 0;
  if (isSpamBot) {
    errors.form = "spamDetected";
  }

  // 2. Extract Turnstile token if present
  const turnstileTokenEntry = formData.get("cf-turnstile-response");
  const turnstileToken = typeof turnstileTokenEntry === "string" ? turnstileTokenEntry : undefined;

  // 3. Validate regular contact fields
  for (const field of contactFields) {
    const entries = formData.getAll(field);
    if (entries.length > 1 || (entries.length === 1 && typeof entries[0] !== "string")) {
      errors[field] = "invalidValue";
      continue;
    }
    const raw = typeof entries[0] === "string" ? entries[0] : "";
    // Bound reflected values as well as accepted input; never echo file contents.
    values[field] = raw.slice(0, contactLimits[field]).trim();
    if (raw.length > contactLimits[field]) {
      errors[field] = "tooLong";
    } else if (!values[field] && field !== "phone") {
      errors[field] = "required";
    } else if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(raw)) {
      errors[field] = "invalidValue";
    }
  }

  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(values.email)) {
    errors.email = "invalidEmail";
  }
  if (!errors.phone && values.phone && (!/^[+\d().\s-]+$/u.test(values.phone) || values.phone.replace(/\D/g, "").length < 5)) {
    errors.phone = "invalidPhone";
  }
  for (const field of ["name", "email", "phone"] as const) {
    if (!errors[field] && /[\r\n]/u.test(values[field])) {
      errors[field] = "invalidValue";
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    values,
    errors,
    isSpamBot,
    turnstileToken,
  };
}
