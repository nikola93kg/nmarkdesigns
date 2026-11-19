"use client";

import dynamic from "next/dynamic";
import { MessageSquare } from "lucide-react";
import { useRef, useState } from "react";
import type { Locale, Localized } from "@/lib/i18n";

import type { ChatLink } from "@/lib/chatbot/contracts";

const ChatPanel = dynamic(() => import("./ChatPanel"), { ssr: false });
const labels: Localized<string> = { sr: "Pitajte NMark asistenta", en: "Ask NMark Assistant" };
export function ChatLauncher({ locale, privacyUrls, previewLinks }: { locale: Locale; privacyUrls: Localized<string | null>; previewLinks?: ChatLink[] }) {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  function close() { setOpen(false); trigger.current?.focus(); }
  return (
    <>
      <button ref={trigger} type="button" data-chat-launcher aria-label={labels[locale]} aria-expanded={open}
        aria-haspopup="dialog" onClick={() => { setLoaded(true); setOpen(true); }}
        className="fixed right-6 bottom-24 z-20 flex min-h-12 items-center gap-2 rounded-control bg-brand px-4 py-3 text-small font-semibold text-on-brand shadow-lg hover:bg-brand-hover">
        <MessageSquare className="size-5" aria-hidden="true" />
        <span className="hidden sm:inline">NMark Assistant</span>
      </button>
      {loaded && <ChatPanel locale={locale} open={open} onClose={close} previewLinks={previewLinks} privacyUrls={privacyUrls} />}
    </>
  );
}
