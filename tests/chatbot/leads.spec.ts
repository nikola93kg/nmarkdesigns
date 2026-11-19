import { expect, test } from "@playwright/test";
import { CONTACT_CONSENT_VERSION, leadInput } from "@/lib/chatbot/lead-contracts";
import { explicitContact, shouldOfferLead, suggestedService } from "@/lib/chatbot/qualification";

const valid = { clientSubmissionId: "50e4cfc6-3471-4db1-8ae6-a1d59851f531", locale: "sr", name: "Test Visitor", email: "test@example.com", privacyConsent: true, consentVersion: CONTACT_CONSENT_VERSION };
test("lead consent, normalization and optional project information", () => {
  const result = leadInput.parse({ ...valid, email: " TEST@EXAMPLE.COM " });
  expect(result.email).toBe("test@example.com");
  expect(result.budgetRange).toBe(""); expect(result.timeframe).toBe("");
  for (const change of [{ privacyConsent: false }, { consentVersion: "old" }, { email: "invalid" }, { name: "Hi\r\nBcc: bad@example.com" }, { website: "javascript:alert(1)" }, { website: "https://user:pass@example.com" }, { preferredContactMethod: "phone", phone: "" }, { honeypot: "bot" }, { projectDescription: "x".repeat(2001) }, { sessionId: "someone-else" }]) expect(leadInput.safeParse({ ...valid, ...change }).success).toBe(false);
});
test("contact offer follows business intent and respects rejection", () => {
  for (const text of ["Zdravo", "Hello", "Šta je SEO?", "Koliko košta poslovni sajt?", "What is Next.js?"]) expect(shouldOfferLead(text, false)).toBe(false);
  for (const text of ["Treba mi sajt za stolare", "I need an online store", "Koji je rok za moj projekat?"]) { expect(shouldOfferLead(text, false)).toBe(true); expect(shouldOfferLead(text, true)).toBe(false); }
  for (const text of ["Želim ponudu", "Kontaktirajte me", "Send me a quote", "Please contact me"]) { expect(explicitContact(text)).toBe(true); expect(shouldOfferLead(text, true)).toBe(true); }
  expect(suggestedService("Želim AI chatbot")).toBe("ai_chatbot");
  expect(suggestedService("web prodavnica")).toBe("ecommerce");
  expect(suggestedService("ne znam još")).toBe("other");
});
