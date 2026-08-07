import settingsData from "../generated/settings.json";
import type { CmsPublicSettings } from "../lib/cmsApi";

/**
 * Site-wide business settings (NAP, hours, maps, social links), baked into the build by
 * scripts/export-seo-files.mjs. This barely changes, so it's a static import rather than a
 * runtime fetch to a separate backend host on every page view - the tradeoff is that an admin
 * change here needs a rebuild+redeploy (the admin panel's "Deploy" button) to go live, same as
 * the blog does *not* need one.
 */
const settings = settingsData as CmsPublicSettings;

export function useSiteSettings(): CmsPublicSettings {
  return settings;
}
