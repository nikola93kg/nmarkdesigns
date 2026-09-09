export const contactFields = ["name", "email", "phone", "message"] as const;
export type ContactField = typeof contactFields[number];
export type ContactValues = Record<ContactField, string>;
export type ContactValidationError = "required" | "tooLong" | "invalidValue" | "invalidEmail" | "invalidPhone";
export type ContactErrors = Partial<Record<ContactField, ContactValidationError>>;

export const contactLimits = { name: 120, email: 254, phone: 32, message: 5000 } as const;

export interface ContactFormState {
  status: "idle" | "invalid" | "unavailable" | "error" | "success";
  values: ContactValues;
  errors: ContactErrors;
}

export const initialContactState: ContactFormState = {
  status: "idle",
  values: { name: "", email: "", phone: "", message: "" },
  errors: {},
};
