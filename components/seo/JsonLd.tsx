import { serializeJsonLd, type JsonValue } from "@/lib/schema";

export function JsonLd({ data }: { data: JsonValue }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
