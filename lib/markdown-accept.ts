export function prefersMarkdown(accept: string | null): boolean {
  if (!accept) return false;

  const preferences = new Map<string, number>();
  for (const item of accept.split(",")) {
    const [range, ...parameters] = item.trim().toLowerCase().split(";");
    const weight = parameters.find((parameter) => parameter.trim().startsWith("q="));
    const quality = weight === undefined ? 1 : Number(weight.trim().slice(2));
    if (quality >= 0 && quality <= 1) preferences.set(range.trim(), quality);
  }

  const markdown = preferences.get("text/markdown") ?? 0;
  const html = preferences.get("text/html") ?? preferences.get("text/*") ?? preferences.get("*/*") ?? 0;
  return markdown > 0 && markdown >= html;
}
