"use client";

import { useState, useSyncExternalStore } from "react";
import { Minus, Plus } from "lucide-react";
import type { FAQItem } from "@/content/i18n/types";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function FAQAccordion({ items }: { items: readonly FAQItem[] }) {
  const enhanced = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item) => {
        // All answers remain readable before hydration and with JavaScript disabled.
        const expanded = !enhanced || openId === item.id;
        const panelId = `faq-answer-${item.id}`;
        const buttonId = `faq-question-${item.id}`;

        return (
          <div key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                disabled={!enhanced}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpenId(expanded ? null : item.id)}
                className="flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left text-body font-semibold text-ink hover:text-brand disabled:cursor-default"
              >
                {item.question}
                {expanded ? <Minus aria-hidden="true" size={18} className="shrink-0" /> : <Plus aria-hidden="true" size={18} className="shrink-0" />}
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!expanded} className="space-y-3 pb-6 pr-6 text-muted">
              {item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {item.list && <ul className="list-disc space-y-2 pl-5">{item.list.map((point) => <li key={point}>{point}</li>)}</ul>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
