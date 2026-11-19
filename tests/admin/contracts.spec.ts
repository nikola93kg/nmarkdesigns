import { expect, test } from "@playwright/test";
import { dayStart, period, belgradeDay } from "@/lib/chatbot/admin/time";
import { deleteInput, leadUpdate, retryNotification, listFilters } from "@/lib/chatbot/admin/contracts";
test("Belgrade business days handle both daylight-saving transitions", () => {
  expect(dayStart("2026-03-29").toISOString()).toBe("2026-03-28T23:00:00.000Z");
  expect(dayStart("2026-03-30").getTime() - dayStart("2026-03-29").getTime()).toBe(23 * 3600000);
  expect(dayStart("2026-10-26").getTime() - dayStart("2026-10-25").getTime()).toBe(25 * 3600000);
  expect(belgradeDay(new Date("2026-11-19T23:30:00Z"))).toBe("2026-11-20");
  const range = period("7d", new Date("2026-11-19T23:30:00Z")); expect(range.days).toHaveLength(7); expect(range.days[0]).toBe("2026-11-14");
});
test("admin mutations require confirmation and reject mass assignment", () => {
  expect(deleteInput.safeParse({ confirm: false }).success).toBe(false);
  expect(retryNotification.safeParse({ verifiedNotDelivered: false }).success).toBe(false);
  expect(leadUpdate.safeParse({ status: "contacted", internalNote: "Checked", email: "other@example.test" }).success).toBe(false);
  expect(leadUpdate.safeParse({ status: "admin", internalNote: "" }).success).toBe(false);
  expect(listFilters.safeParse({ from: "2026-11-20", to: "2026-11-01" }).success).toBe(false);
});
