export type SocialPlatform = "facebook" | "instagram" | "youtube" | "other";

export interface SocialLink {
  url: string;
  platform: SocialPlatform;
}

/**
 * The admin panel stores social links as a flat JSON array of URLs (see SeoSettings.socialLinksJson)
 * - platform is inferred from the URL's host so the UI can still pick the right icon/label without
 * a more rigid {platform, url} shape that would make admin editing more awkward.
 */
export function parseSocialLinks(socialLinksJson: string | null | undefined): SocialLink[] {
  if (!socialLinksJson) return [];

  try {
    const parsed: unknown = JSON.parse(socialLinksJson);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((url): url is string => typeof url === "string").map((url) => ({ url, platform: detectPlatform(url) }));
  } catch {
    return [];
  }
}

function detectPlatform(url: string): SocialPlatform {
  const lower = url.toLowerCase();
  if (lower.includes("facebook.com")) return "facebook";
  if (lower.includes("instagram.com")) return "instagram";
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "youtube";
  return "other";
}
