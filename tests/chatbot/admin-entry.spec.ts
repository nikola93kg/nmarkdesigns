import { expect, test } from "@playwright/test";
import { GET } from "@/app/admin/route";

test("admin entry uses a relative redirect without leaking the reverse-proxy bind address", () => {
  const response = GET();
  expect(response.status).toBe(307);
  const location = response.headers.get("location")!;
  expect(location).toBe("/admin/sr/");
  expect(new URL(location, "https://nmarkdesigns.com/admin/").href).toBe("https://nmarkdesigns.com/admin/sr/");
  expect(new URL(location, "http://localhost:3000/admin/").href).toBe("http://localhost:3000/admin/sr/");
  expect(response.headers.get("cache-control")).toBe("private, no-store");
});
