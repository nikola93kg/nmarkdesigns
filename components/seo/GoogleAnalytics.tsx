import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId?: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const id = measurementId?.trim();
  if (!id) return null;

  const serializedId = JSON.stringify(id);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script
        id="google-analytics-gtag"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`}
        strategy="beforeInteractive"
      />
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script id="google-analytics-init" strategy="beforeInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${serializedId});
        `}
      </Script>
    </>
  );
}
