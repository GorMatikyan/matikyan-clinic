import { useEffect } from "react";
import { useLocation } from "react-router";
import { useSiteSettings } from "../../hooks/useSiteSettings";

/**
 * Loads Yandex Metrica's tag.js once, only if an admin has set a counter number
 * (Settings -> Analytics). Suppressed entirely on the staging build - see
 * scripts/export-seo-files.mjs.
 *
 * Uses Yandex's own official loader snippet verbatim (translated to TS) rather than a
 * hand-rolled minimal version - see Analytics.tsx / the GA4 tracking saga for why a
 * "looks equivalent" reimplementation of a vendor's tracking loader is worth avoiding.
 */
// Calls through an untyped alias rather than `window.ym` directly - the loader IIFE below
// assigns `window.ym` via a differently-typed cast, which confuses TS's control-flow narrowing
// of the property access at the call sites further down.
function callYm(...args: unknown[]) {
  (window as unknown as { ym?: (...args: unknown[]) => void }).ym?.(...args);
}

export function YandexMetrica() {
  const settings = useSiteSettings();
  const counterId = settings.yandexMetricaId;
  const location = useLocation();

  useEffect(() => {
    if (!counterId || window.ym) return;

    (function (m: Window, e: Document, t: string, r: string, i: string) {
      type YmQueue = ((...args: unknown[]) => void) & { a?: IArguments[]; l?: number };
      const w = m as unknown as Record<string, YmQueue>;
      w[i] =
        w[i] ||
        function (this: YmQueue) {
          (w[i].a = w[i].a || []).push(arguments);
        };
      w[i].l = Date.now();
      for (let j = 0; j < e.scripts.length; j++) {
        if (e.scripts[j].src === r) return;
      }
      const k = e.createElement(t) as HTMLScriptElement;
      const a = e.getElementsByTagName(t)[0];
      k.async = true;
      k.src = r;
      a.parentNode?.insertBefore(k, a);
      // Yandex's own snippet puts the counter id on the script URL itself (not just in the
      // 'init' call below) - kept verbatim rather than "simplified", per the GA4 tracking
      // saga's lesson about deviating from a vendor's exact loader snippet.
    })(window, document, "script", `https://mc.yandex.ru/metrika/tag.js?id=${counterId}`, "ym");

    callYm(Number(counterId), "init", {
      // ssr:true suppresses init's own automatic pageview hit - this SPA has no full page
      // reload between routes, so the hit effect below fires it manually on every route
      // change instead, including the first one. Same purpose as GA4's send_page_view:false.
      ssr: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: false,
      ecommerce: false,
      defer: true,
    });
  }, [counterId]);

  useEffect(() => {
    if (!counterId || !window.ym) return;
    // "hit" is Metrica's equivalent of GA4's page_view - required on every route change since
    // this SPA has no full page reload between routes (init's own automatic first hit covers
    // the initial load).
    callYm(Number(counterId), "hit", location.pathname + location.search);
  }, [counterId, location.pathname, location.search]);

  return null;
}

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}
