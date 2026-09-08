import { Logo } from "@/components/layout/Logo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Navigation } from "@/components/layout/Navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navigation, pricingLink } from "@/content/site";

export function Header() {
  return (
    <header id="top" className="relative z-20 border-b border-border bg-surface">
      <Container className="flex min-h-header items-center justify-between gap-6">
        <Logo />
        <div className="hidden lg:block">
          <Navigation items={navigation} label="Glavna navigacija" />
        </div>
        <div className="hidden lg:block">
          <Button href={pricingLink.href} external variant="secondary">
            {pricingLink.label}
          </Button>
        </div>
        <MobileNavigation />
      </Container>
    </header>
  );
}
