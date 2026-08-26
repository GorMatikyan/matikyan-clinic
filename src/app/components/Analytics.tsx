import { useEffect } from "react";
import { useLocation } from "react-router";
import { useSiteSettings } from "../../hooks/useSiteSettings";

/**
 * Loads GA4's gtag.js once, only if an admin has set a Measurement ID (Settings -> Analytics).
 * Suppressed entirely on the staging build - see scripts/export-seo-files.mjs.
 */
export function Analytics() {
  const settings = useSiteSettings();
  const measurementId = settings.googleAnalyticsId;
  const location = useLocation();

  useEffect(() => {
    if (!measurementId || document.getElementById("ga4-gtag-js")) return;

    const script = document.createElement("script");
    script.id = "ga4-gtag-js";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer ?? [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    // Modern gtag.js ships Consent Mode enabled by default, which silently withholds the
    // actual network hit (everything still initializes locally - dataLayer pushes, gtm.dom/
    // gtm.load fire - but Google's servers never receive anything) unless a consent signal is
    // given. This site has no cookie-consent banner and no EU/GDPR audience, so grant by
    // default rather than silently losing all real analytics data.
    gtag("consent", "default", { ad_storage: "granted", analytics_storage: "granted" });
    gtag("js", new Date());
    // send_page_view: false - this SPA has no full page reload between routes, so page_view
    // events are sent manually below on every route change instead of only on initial load.
    gtag("config", measurementId, { send_page_view: false });
  }, [measurementId]);

  useEffect(() => {
    if (!measurementId || !window.gtag) return;
    window.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [measurementId, location.pathname, location.search]);

  return null;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
