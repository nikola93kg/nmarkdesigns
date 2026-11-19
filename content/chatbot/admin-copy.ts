import type { Localized } from "@/lib/i18n";
interface AdminCopy {
  title: string; overview: string; conversations: string; leads: string; login: string; signOut: string;
  email: string; sendLink: string; sent: string; unavailable: string; error: string; loading: string;
  empty: string; period: string; days7: string; days30: string; trend: string; date: string; language: string;
  messages: string; inquiry: string; lastActivity: string; open: string; status: string; delivery: string;
  filter: string; reset: string; all: string; withLead: string; withoutLead: string; from: string; to: string;
  next: string; first: string; back: string; name: string; service: string; budget: string; timeframe: string;
  details: string; transcript: string; consent: string; truncated: string; note: string; save: string; saved: string;
  delete: string; confirmDelete: string; deleteConversation: string; deleteLead: string; danger: string;
  retry: string; retryConfirm: string; attempts: string; technicalCode: string; unknown: string;
  user: string; assistant: string; expired: string; active: string; attention: string; timezone: string;
  metricsNote: string; metricLabels: readonly string[];
  statuses: Record<string, string>; errors: Record<string, string>;
}
export const adminCopy: Localized<AdminCopy> = {
  sr: {
    title: "NMark Assistant — administracija", overview: "Pregled", conversations: "Razgovori", leads: "Upiti", login: "Admin prijava", signOut: "Odjavi se",
    email: "Email adresa", sendLink: "Pošalji link za prijavu", sent: "Proverite inbox. Ako je adresa odobrena, link za prijavu važi 10 minuta.", unavailable: "Admin pristup trenutno nije podešen. Proverite konfiguraciju servera.", error: "Prijava nije uspela ili je link istekao. Pokušajte ponovo.", loading: "Obrada…",
    empty: "Nema podataka za izabrane filtere.", period: "Period", days7: "Poslednjih 7 dana", days30: "Poslednjih 30 dana", trend: "Dnevni pregled", date: "Datum", language: "Jezik", messages: "Poruke", inquiry: "Upit", lastActivity: "Poslednja aktivnost", open: "Otvori", status: "Status", delivery: "Email obaveštenje",
    filter: "Primeni filtere", reset: "Ukloni filtere", all: "Svi", withLead: "Sa upitom", withoutLead: "Bez upita", from: "Od datuma", to: "Do datuma", next: "Sledeća strana", first: "Prva strana", back: "Nazad na listu", name: "Ime / email", service: "Usluga", budget: "Budžet", timeframe: "Rok",
    details: "Detalji upita", transcript: "Transkript", consent: "Evidencija saglasnosti", truncated: "Prikazano je prvih 500 poruka.", note: "Interna beleška", save: "Sačuvaj izmene", saved: "Izmene su sačuvane.",
    delete: "Obriši", confirmDelete: "Potvrđujem brisanje.", deleteConversation: "Brisanje razgovora uklanja ceo transkript, povezane upite i obaveštenja. Radnja je trajna.", deleteLead: "Brisanje upita uklanja kontakt podatke i obaveštenje. Razgovor ostaje; za potpuno brisanje obrišite i razgovor.", danger: "Brisanje podataka",
    retry: "Ponovo stavi u red za slanje", retryConfirm: "Proverio/la sam isporuku i potvrdio/la da email nije prihvaćen/isporučen. Razumem rizik duplikata.", attempts: "Pokušaji", technicalCode: "Kod greške", unknown: "Nije navedeno", user: "Posetilac", assistant: "Asistent", expired: "Istekla sesija", active: "Aktivna sesija", attention: "Potrebna provera", timezone: "Vremenska zona: Europe/Belgrade",
    metricsNote: "Metrike se računaju iz sačuvanih razgovora i upita; brisanje podataka menja pregled.",
    metricLabels: ["Započeti razgovori", "Angažovane sesije", "Primljeni upiti", "Stopa konverzije", "Chat greške", "Problemi sa obaveštenjima"],
    statuses: { new: "Nov", contacted: "Kontaktiran", qualified: "Kvalifikovan", closed_won: "Dogovoren", closed_lost: "Nerealizovan", pending: "Čeka slanje", processing: "Slanje u toku", sent: "SMTP prihvaćen", failed: "Slanje neuspešno", uncertain: "Isporuka nepotvrđena", completed: "Završeno", cancelled: "Prekinuto", error: "Greška" },
    errors: { INVALID_INPUT: "Proverite podatke i potvrdu radnje.", BUSY: "Obrada je u toku. Sačekajte pa pokušajte ponovo.", UNAUTHORIZED: "Prijava je istekla. Prijavite se ponovo.", NOT_FOUND: "Zapis nije pronađen.", FORBIDDEN: "Radnja nije dozvoljena sa ovog porekla.", UNAVAILABLE: "Podaci trenutno nisu dostupni. Pokušajte ponovo." },
  },
  en: {
    title: "NMark Assistant — administration", overview: "Overview", conversations: "Conversations", leads: "Inquiries", login: "Admin sign in", signOut: "Sign out",
    email: "Email address", sendLink: "Send sign-in link", sent: "Check your inbox. If the address is approved, the sign-in link expires in 10 minutes.", unavailable: "Admin access is not configured yet. Check the server configuration.", error: "Sign-in failed or the link expired. Please try again.", loading: "Processing…",
    empty: "No data matches these filters.", period: "Period", days7: "Last 7 days", days30: "Last 30 days", trend: "Daily overview", date: "Date", language: "Language", messages: "Messages", inquiry: "Inquiry", lastActivity: "Last activity", open: "Open", status: "Status", delivery: "Email notification",
    filter: "Apply filters", reset: "Clear filters", all: "All", withLead: "With inquiry", withoutLead: "Without inquiry", from: "From date", to: "To date", next: "Next page", first: "First page", back: "Back to list", name: "Name / email", service: "Service", budget: "Budget", timeframe: "Timeframe",
    details: "Inquiry details", transcript: "Transcript", consent: "Consent record", truncated: "Showing the first 500 messages.", note: "Internal note", save: "Save changes", saved: "Changes saved.",
    delete: "Delete", confirmDelete: "I confirm deletion.", deleteConversation: "Deleting this conversation permanently removes its transcript, related inquiries and notifications.", deleteLead: "Deleting this inquiry removes contact details and its notification. The conversation remains; delete it too for full removal.", danger: "Delete data",
    retry: "Queue another delivery attempt", retryConfirm: "I checked delivery and confirmed the email was not accepted/delivered. I understand the duplicate risk.", attempts: "Attempts", technicalCode: "Error code", unknown: "Not provided", user: "Visitor", assistant: "Assistant", expired: "Expired session", active: "Active session", attention: "Needs review", timezone: "Time zone: Europe/Belgrade",
    metricsNote: "Metrics reflect retained conversations and inquiries; deleting data changes this overview.",
    metricLabels: ["Chat starts", "Engaged sessions", "Inquiries received", "Conversion rate", "Chat errors", "Notification issues"],
    statuses: { new: "New", contacted: "Contacted", qualified: "Qualified", closed_won: "Won", closed_lost: "Lost", pending: "Pending", processing: "Processing", sent: "SMTP accepted", failed: "Failed", uncertain: "Delivery unconfirmed", completed: "Completed", cancelled: "Cancelled", error: "Error" },
    errors: { INVALID_INPUT: "Check the fields and action confirmation.", BUSY: "Processing is in progress. Please wait and try again.", UNAUTHORIZED: "Your session expired. Sign in again.", NOT_FOUND: "Record not found.", FORBIDDEN: "This origin cannot perform the action.", UNAVAILABLE: "Data is temporarily unavailable. Try again." },
  },
};
