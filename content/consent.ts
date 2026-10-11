export interface ConsentCopy {
  bannerTitle: string;
  bannerDescription: string;
  accept: string;
  decline: string;
  preferences: string;
  footerLink: string;
  modalTitle: string;
  essentialTitle: string;
  essentialDesc: string;
  analyticsTitle: string;
  analyticsDesc: string;
  savePreferences: string;
  close: string;
  statusAccepted: string;
  statusDeclined: string;
  alwaysActive: string;
  statusGranted: string;
  statusDenied: string;
}

export const consentCopy: Record<"sr" | "en", ConsentCopy> = {
  sr: {
    bannerTitle: "Podešavanja privatnosti",
    bannerDescription:
      "Koristimo Google Analytics 4 isključivo za anonimizovano merenje poseta i unapređenje rada sajta. Ne koristimo marketinške kolačiće niti profilišemo posetioce.",
    accept: "Prihvati analitiku",
    decline: "Odbij",
    preferences: "Detalji",
    footerLink: "Podešavanja kolačića",
    modalTitle: "Podešavanja kolačića i privatnosti",
    essentialTitle: "Neophodni kolačići",
    essentialDesc:
      "Potrebni za osnovno tehničko funkcionisanje sajta (bezbednosna zaštita od spama i rad forme). Uvek su aktivni.",
    analyticsTitle: "Analitički kolačići (Google Analytics 4)",
    analyticsDesc:
      "Pomažu nam da razumemo koje stranice posetioci čitaju i kako da poboljšamo korisničko iskustvo. Podaci su anonimizovani i ne dele se za reklame.",
    savePreferences: "Sačuvaj izbore",
    close: "Zatvori",
    statusAccepted: "Analitički kolačići su trenutno prihvaćeni.",
    statusDeclined: "Analitički kolačići su trenutno odbijeni.",
    alwaysActive: "Uvek aktivni",
    statusGranted: "Dozvoljeno",
    statusDenied: "Odbijeno",
  },
  en: {
    bannerTitle: "Privacy Preferences",
    bannerDescription:
      "We use Google Analytics 4 strictly for anonymized visit measurement and website improvement. We do not use advertising cookies or profile visitors.",
    accept: "Accept analytics",
    decline: "Decline",
    preferences: "Details",
    footerLink: "Cookie settings",
    modalTitle: "Cookie & Privacy Preferences",
    essentialTitle: "Essential cookies",
    essentialDesc:
      "Required for core technical website functionality (anti-spam security and inquiry form). Always active.",
    analyticsTitle: "Analytics cookies (Google Analytics 4)",
    analyticsDesc:
      "Help us understand which pages visitors read and how to improve the user experience. Data is anonymized and never shared for advertising.",
    savePreferences: "Save preferences",
    close: "Close",
    statusAccepted: "Analytics cookies are currently accepted.",
    statusDeclined: "Analytics cookies are currently declined.",
    alwaysActive: "Always active",
    statusGranted: "Allowed",
    statusDenied: "Declined",
  },
};
