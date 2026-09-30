import { useEffect } from "react";
import { useSiteSettings } from "../../hooks/useSiteSettings";

const GTAG_SCRIPT_ID = "ga4-gtag-js";

/**
 * Loads GA4's gtag.js (the standard Google tag) once, only if an admin has set a Measurement ID
 * (Settings -> Analytics). Suppressed entirely on the staging build - see
 * scripts/export-seo-files.mjs.
 *
 * History:
 * - Until 2026-09-03 this site loaded gtag.js through a hand-rolled shim,
 *   `function gtag(...args) { dataLayer.push(args) }`, and gtag.js silently never sent a single
 *   hit for months (zero console errors, dataLayer looked right). The likely cause: gtag.js only
 *   treats `arguments` objects on the dataLayer as gtag() commands - a plain rest-args array is
 *   read as a different (GTM "method call") format and ignored, so `config`/`event` never ran.
 * - 2026-09-03 to 2026-09-30 the site bypassed gtag.js and POSTed page_views straight to the
 *   Measurement Protocol (fetch+keepalive; sendBeacon got HTTP 503 from mp/collect). That worked
 *   but carries no geo/device/traffic-source/engagement data - see commit 199784c if it ever
 *   needs restoring.
 * - 2026-09-30: back to gtag.js using Google's official snippet (`arguments`), verified sending
 *   real /g/collect hits. Deliberately NO Measurement Protocol fallback alongside it: gtag.js
 *   delays/batches hits by ~5s (more in background tabs), so any "gtag didn't send within N
 *   seconds -> send via MP" rule double-counts whenever gtag is merely slow.
 *
 * Page views: gtag.js owns them entirely - `config` sends the initial one, and GA4's Enhanced
 * Measurement "Page changes based on browser history events" (on for this stream) sends one per
 * SPA route change. Do NOT also send page_view manually: verified 2026-09-30 that doing so
 * counts every in-app navigation twice (explicit event + gtm.historyChange-v2).
 */
export function Analytics() {
  const settings = useSiteSettings();
  const measurementId = settings.googleAnalyticsId;

  useEffect(() => {
    if (!measurementId || document.getElementById(GTAG_SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = GTAG_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Google's official snippet - keep `arguments`, never rest args (see history above).
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    // This site has no cookie-consent banner and no EU/GDPR audience - grant all four Consent
    // Mode v2 signals so gtag.js doesn't withhold hits waiting for a consent update that never
    // comes (see commit 3c4d8c1).
    window.gtag("consent", "default", {
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
    window.gtag("js", new Date());
    window.gtag("config", measurementId);
  }, [measurementId]);

  return null;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
