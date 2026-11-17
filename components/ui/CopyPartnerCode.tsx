"use client";

import { useState, useSyncExternalStore } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getHostingerCopy, hostingerPartner, type HostingerPlacement } from "@/content/partners";
import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";

const subscribe = () => () => {};
const getHydratedSnapshot = () => true;
const getServerSnapshot = () => false;

export function CopyPartnerCode({ locale, placement }: { locale: Locale; placement: HostingerPlacement }) {
  const copy = getHostingerCopy(locale);
  const hydrated = useSyncExternalStore(subscribe, getHydratedSnapshot, getServerSnapshot);
  const [status, setStatus] = useState<"idle" | "copying" | "copied" | "error">("idle");

  async function copyCode() {
    setStatus("copying");
    try {
      await navigator.clipboard.writeText(hostingerPartner.couponCode);
      setStatus("copied");
      trackEvent("copy_partner_code", { partner_name: "hostinger", partner_placement: placement, locale });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-small text-muted">
          <span className="mr-2">{copy.couponLabel}:</span>
          <code className="select-all break-all font-semibold text-ink">{hostingerPartner.couponCode}</code>
        </p>
        <Button
          variant="secondary"
          disabled={!hydrated || status === "copying"}
          onClick={copyCode}
          data-copy-partner-code="hostinger"
        >
          <Copy aria-hidden="true" size={16} />
          {status === "copying" ? copy.copyingCoupon : copy.copyCoupon}
        </Button>
      </div>
      <p role="status" aria-live="polite" className="mt-2 min-h-5 text-small text-muted">
        {status === "copied" ? copy.copiedCoupon : status === "error" ? copy.copyFailed : ""}
      </p>
    </div>
  );
}
