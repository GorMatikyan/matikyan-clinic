// One-off generator, not part of the build pipeline: source images are pre-committed static
// assets that rarely change, so a smaller "-mobile" WebP variant is generated once and committed
// alongside the original, rather than resized on every build.
//
// Usage: node scripts/generate-responsive-images.mjs
import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGE_DIRS = [
  path.join(__dirname, "..", "images", "hero"),
  path.join(__dirname, "..", "images", "services"),
  path.join(__dirname, "..", "images", "sections"),
];
const MOBILE_WIDTH = 960;

for (const dir of IMAGE_DIRS) {
  const files = await readdir(dir);
  const sources = files.filter((f) => f.endsWith(".webp") && !f.includes("-mobile"));

  for (const file of sources) {
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, file.replace(/\.webp$/, "-mobile.webp"));
    const metadata = await sharp(inputPath).metadata();

    if (!metadata.width || metadata.width <= MOBILE_WIDTH) {
      console.log(`[generate-responsive-images] skipped ${file} (already <= ${MOBILE_WIDTH}px)`);
      continue;
    }

    await sharp(inputPath).resize({ width: MOBILE_WIDTH }).webp({ quality: 80 }).toFile(outputPath);
    console.log(`[generate-responsive-images] wrote ${path.basename(outputPath)} (${metadata.width}px -> ${MOBILE_WIDTH}px)`);
  }
}
