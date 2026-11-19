/** Business-day boundaries without relying on MySQL's optional named time-zone tables. */
export function belgradeDay(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Belgrade", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}
export function shiftDay(day: string, amount: number): string { return new Date(Date.parse(`${day}T12:00:00Z`) + amount * 86400000).toISOString().slice(0, 10); }
export function dayStart(day: string): Date {
  const midnight = Date.parse(`${day}T00:00:00Z`);
  let value = midnight;
  for (let i = 0; i < 3; i++) {
    const offset = new Intl.DateTimeFormat("en", { timeZone: "Europe/Belgrade", timeZoneName: "shortOffset" }).formatToParts(new Date(value)).find((part) => part.type === "timeZoneName")?.value ?? "GMT+1";
    const match = /GMT([+-])(\d{1,2})(?::(\d{2}))?/.exec(offset);
    const minutes = match ? (Number(match[2]) * 60 + Number(match[3] ?? 0)) * (match[1] === "+" ? 1 : -1) : 0;
    value = midnight - minutes * 60000;
  }
  return new Date(value);
}
export function period(range: "7d" | "30d", now = new Date()) {
  const today = belgradeDay(now);
  const start = shiftDay(today, range === "30d" ? -29 : -6);
  return { from: dayStart(start), to: dayStart(shiftDay(today, 1)), days: Array.from({ length: range === "30d" ? 30 : 7 }, (_, index) => shiftDay(start, index)) };
}
