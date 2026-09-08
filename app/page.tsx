import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Izrada web sajtova",
  path: "/",
  noIndex: true,
});

// The homepage sections will be composed here in Phase 2.
export default function HomePage() {
  return (
    <Container className="py-section">
      <h1 className="text-heading font-semibold text-brand">{site.name}</h1>
      <p className="mt-5 max-w-prose text-body text-ink">{site.description}</p>
    </Container>
  );
}
