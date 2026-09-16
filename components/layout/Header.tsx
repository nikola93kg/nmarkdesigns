import { Logo } from "@/components/layout/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Navigation } from "@/components/layout/Navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/content/i18n/types";
import type { Locale } from "@/lib/i18n";
import { navigationItem, navigationOrder } from "@/lib/routes";

export function Header({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  const navigation = navigationOrder.map((route) => navigationItem(route, locale, copy.navigation[route]));
  const pricing = navigationItem("pricing", locale, copy.navigation.pricing);

  return (
    <header id="top" className="sticky top-0 z-40 border-b border-border bg-surface">
      <Container className="flex min-h-header items-center justify-between gap-3 lg:gap-6">
        <Logo locale={locale} label={copy.accessibility.homeLink} />
        <div className="hidden lg:block">
          <Navigation items={navigation} label={copy.accessibility.mainNavigation} />
        </div>
        <div className="flex items-center gap-3 lg:gap-5">
          <LanguageSwitcher
            locale={locale}
            label={copy.accessibility.languageNavigation}
            languageLabels={copy.accessibility.languageLabels}
          />
          <div className="hidden lg:block">
            <Button href={pricing.href} external={pricing.external} variant="secondary">
              {pricing.label}
            </Button>
          </div>
          <MobileNavigation
            key={locale}
            items={navigation}
            pricing={pricing}
            label={copy.accessibility.mobileNavigation}
            menuLabel={copy.accessibility.menu}
          />
        </div>
      </Container>
    </header>
  );
}
