import { useEffect } from "react";
import { useLocation } from "react-router";
import { useSiteSettings } from "../../hooks/useSiteSettings";

// The URL the counter's own init hit (in index.html's <head>) already recorded. Module-level,
// not a ref: Layout - and so this component - remounts when switching language prefix, which
// must not be mistaken for a fresh page load.
let lastHitUrl = window.location.pathname + window.location.search;

/**
 * Sends a Yandex Metrica hit on every SPA route change after the first page. The counter itself
 * (Yandex's official snippet + init) is baked into index.html at build time by vite.config.ts's
 * analyticsTagsPlugin, and init records the landing page on its own; tag.js does not track
 * History API navigation by itself, so later routes need an explicit "hit".
 */
export function YandexMetrica() {
  const counterId = useSiteSettings().yandexMetricaId;
  const location = useLocation();

  useEffect(() => {
    const url = location.pathname + location.search;
    if (!counterId || url === lastHitUrl) return;
    lastHitUrl = url;
    (window as unknown as { ym?: (...args: unknown[]) => void }).ym?.(Number(counterId), "hit", url, {
      title: document.title,
    });
  }, [counterId, location.pathname, location.search]);

  return null;
}
