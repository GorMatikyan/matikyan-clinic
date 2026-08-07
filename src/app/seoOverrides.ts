import { useSyncExternalStore } from "react";
import type { SeoMetadata } from "./seo";

/**
 * Dynamic SEO data that isn't known statically at build time: per-post blog metadata (registered
 * by BlogDetail as it loads) and admin-edited overlays fetched from the backend CMS. SeoHead reads
 * this on every route change and merges it on top of (or in place of) the static `seo.ts` entries,
 * so the site never depends on the backend being reachable to render correct SEO tags.
 */

export type SeoOverride = Partial<SeoMetadata> & {
  skipHreflang?: boolean;
  robotsNoindex?: boolean;
  robotsNofollow?: boolean;
  /** Short label for the Breadcrumbs component - `title` is a full SEO title, too long to reuse. */
  breadcrumbLabel?: string;
};

const overrides = new Map<string, SeoOverride>();
const listeners = new Set<() => void>();

export function setSeoOverride(path: string, override: SeoOverride | null) {
  if (override) {
    overrides.set(path, override);
  } else {
    overrides.delete(path);
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSeoOverride(path: string): SeoOverride | undefined {
  return useSyncExternalStore(subscribe, () => overrides.get(path));
}
