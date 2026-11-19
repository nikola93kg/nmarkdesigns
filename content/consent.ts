export interface ConsentCopy {
  bannerTitle: string;
  bannerDescription: string;
  accept: string;
  decline: string;
  preferences: string;
  footerLink: string;
  privacyLink: string;
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
      "Uz vašu saglasnost koristim Google Analytics za merenje poseta. Analitiku možete odbiti ili kasnije promeniti izbor.",
    accept: "Prihvati analitiku",
    decline: "Odbij",
    preferences: "Detalji",
    footerLink: "Podešavanja kolačića",
    privacyLink: "Politika privatnosti",
    modalTitle: "Podešavanja kolačića i privatnosti",
    essentialTitle: "Neophodni kolačići",
    essentialDesc:
      "Potrebni za osnovno tehničko funkcionisanje sajta (bezbednosna zaštita od spama i rad forme). Uvek su aktivni.",
    analyticsTitle: "Analitički kolačići (Google Analytics 4)",
    analyticsDesc:
      "Pomažu mi da razumem koje stranice posetioci čitaju i kako da poboljšam korisničko iskustvo. Podaci se ne koriste za reklame.",
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
      "With your consent, I use Google Analytics to measure visits. You can decline analytics or change your choice later.",
    accept: "Accept analytics",
    decline: "Decline",
    preferences: "Details",
    footerLink: "Cookie settings",
    privacyLink: "Privacy policy",
    modalTitle: "Cookie & Privacy Preferences",
    essentialTitle: "Essential cookies",
    essentialDesc:
      "Required for core technical website functionality (anti-spam security and inquiry form). Always active.",
    analyticsTitle: "Analytics cookies (Google Analytics 4)",
    analyticsDesc:
      "Help me understand which pages visitors read and how to improve the user experience. Data is not used for advertising.",
    savePreferences: "Save preferences",
    close: "Close",
    statusAccepted: "Analytics cookies are currently accepted.",
    statusDeclined: "Analytics cookies are currently declined.",
    alwaysActive: "Always active",
    statusGranted: "Allowed",
    statusDenied: "Declined",
  },
};
