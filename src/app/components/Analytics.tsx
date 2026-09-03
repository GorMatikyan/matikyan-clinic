import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { useSiteSettings } from "../../hooks/useSiteSettings";

const CLIENT_ID_STORAGE_KEY = "_ga4_mp_client_id";

function randomClientId(): string {
  return `${Math.floor(Math.random() * 2147483647)}.${Math.floor(Date.now() / 1000)}`;
}

function getOrCreateClientId(): string {
  try {
    const existing = localStorage.getItem(CLIENT_ID_STORAGE_KEY);
    if (existing) return existing;
    const created = randomClientId();
    localStorage.setItem(CLIENT_ID_STORAGE_KEY, created);
    return created;
  } catch {
    // localStorage unavailable (private mode, disabled) - fall back to a per-load id rather
    // than crashing; this visit just won't be recognized as returning on a future visit.
    return randomClientId();
  }
}

/**
 * Sends page_view hits to GA4 directly via the Measurement Protocol (navigator.sendBeacon),
 * bypassing gtag.js's own delivery entirely.
 *
 * Root-caused live on 2026-09-03: gtag.js's own hit-sending mechanism silently never
 * attempted a single network request on this site, in production, for months - dataLayer
 * sequence, Consent Mode signals, and gtag.js taking control of the dataLayer were all
 * verified correct; zero console errors; yet GA4 Admin's Data Streams page confirmed
 * "no data received". Forcing transport_type: "beacon" in the gtag('config', ...) call
 * (a real, documented gtag.js option) did NOT fix it either - gtag.js still never sent
 * anything even when forced onto the one transport mechanism proven to work here. A
 * hand-built Measurement Protocol request sent via navigator.sendBeacon() to the exact same
 * endpoint and measurement ID registered in GA4 Realtime within seconds, proving the
 * property/endpoint were never the problem - only gtag.js's internal send logic was. This
 * component reimplements just page-view tracking using that proven-working mechanism
 * directly, without gtag.js.
 *
 * Only page_view is sent (no gtag.js Enhanced Measurement, so no automatic scroll/outbound
 * click/file download events) - if those are needed later, add explicit sendHit() calls for
 * them rather than reintroducing gtag.js.
 */
export function Analytics() {
  const settings = useSiteSettings();
  const measurementId = settings.googleAnalyticsId;
  const apiSecret = settings.googleAnalyticsApiSecret;
  const location = useLocation();
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!measurementId || !apiSecret) return;
    if (!sessionIdRef.current) sessionIdRef.current = String(Date.now());

    const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;
    const body = JSON.stringify({
      client_id: getOrCreateClientId(),
      events: [
        {
          name: "page_view",
          params: {
            page_location: window.location.origin + location.pathname + location.search,
            page_title: document.title,
            session_id: sessionIdRef.current,
            // A nonzero engagement time is required for GA4 to count this as an "engaged
            // session" rather than a bounce - 1ms is the minimum needed for that, not a real
            // measurement (we have no reliable client-side engagement timer here).
            engagement_time_msec: 1,
          },
        },
      ],
    });
    // Blob with an explicit type sets the Content-Type header correctly (application/json) -
    // a plain string would default to text/plain, which the Measurement Protocol endpoint
    // does not reliably accept.
    navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
  }, [measurementId, apiSecret, location.pathname, location.search]);

  return null;
}
