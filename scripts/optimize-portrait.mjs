/**
 * One-off: converts the original portrait PNG to an optimized JPG for the web.
 *
 * The hero displays the portrait at ~600px wide, so 960px covers high-DPI
 * screens. mozjpeg + quality 82 typically cuts a 2MB PNG to ~150KB, which
 * matters for Lighthouse/FCP on mobile connections.
 *
 * Run manually with: node scripts/optimize-portrait.mjs
 */
import { existsSync, statSync, unlinkSync } from 'node:fs';
import sharp from 'sharp';

const src = 'public/images/alisha-portrait-new.png';
const dest = 'public/images/alisha-portrait.jpg';

if (!existsSync(src)) {
  console.error(`Source image not found: ${src}`);
  process.exit(1);
}

await sharp(src)
  .rotate() // respect EXIF orientation, then strip metadata
  .resize({ width: 1080, withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(dest);

const before = statSync(src).size;
const after = statSync(dest).size;
console.log(
  `Optimized: ${(before / 1024 / 1024).toFixed(2)} MB → ${(after / 1024).toFixed(0)} KB (${dest})`,
);

// Remove the heavy original so it never gets deployed or committed.
unlinkSync(src);
console.log(`Removed original: ${src}`);
