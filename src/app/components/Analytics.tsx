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
 * Sends page_view hits to GA4 directly via the Measurement Protocol, bypassing gtag.js's own
 * delivery entirely.
 *
 * Root-caused live on 2026-09-03, in two stages:
 * 1. gtag.js's own hit-sending mechanism silently never attempted a single network request on
 *    this site, in production, for months - dataLayer sequence, Consent Mode signals, and
 *    gtag.js taking control of the dataLayer were all verified correct; zero console errors;
 *    yet GA4 Admin's Data Streams page confirmed "no data received". Forcing
 *    transport_type: "beacon" in the gtag('config', ...) call (a real, documented gtag.js
 *    option) did NOT fix it - gtag.js still never sent anything even forced onto the one
 *    transport mechanism separately proven to work (a hand-built request via
 *    navigator.sendBeacon() to the g/collect endpoint registered in Realtime within seconds).
 * 2. Replacing gtag.js with a direct Measurement Protocol call still failed at first: sending
 *    it via navigator.sendBeacon() got an HTTP 503 every time. sendBeacon() always sends in
 *    "no-cors" mode with no real CORS negotiation, and the Measurement Protocol's mp/collect
 *    endpoint (unlike the old g/collect pixel endpoint) rejects that for a JSON POST body. A
 *    plain fetch() with keepalive:true (proper CORS mode, same page-unload-survival guarantee
 *    as sendBeacon) got a clean 204 on the first try.
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
    // keepalive:true survives page unload the same way sendBeacon does, but (unlike
    // sendBeacon) performs a real CORS request - see the root-cause note above for why that
    // distinction is exactly what makes this work against mp/collect.
    fetch(url, { method: "POST", body, keepalive: true }).catch(() => {
      // Best-effort - a dropped analytics hit should never surface as a user-visible error.
    });
  }, [measurementId, apiSecret, location.pathname, location.search]);

  return null;
}
