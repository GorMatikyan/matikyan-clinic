import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "zfth7el3";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);
type SanityImageSource = Parameters<typeof builder.image>[0];

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
