#!/usr/bin/env node
/**
 * Recompress the heavy raster assets in public/ in place.
 *
 * Why in place, same format, same path: some CMS records point at
 * `/images/**` on the deployed origin (see the `heade-livv-page.vercel.app`
 * entry in next.config.mjs `remotePatterns`), so a filename or extension
 * change can break a live project page. Recompression is invisible to every
 * consumer — the URL, the format, and the pixel dimensions are unchanged.
 *
 * next/image already re-encodes to AVIF/WebP on demand, but the source file
 * still has to travel to the optimizer, and the static pages under
 * public/lp/*.html bypass next/image entirely and serve these bytes raw.
 *
 * Usage:
 *   node scripts/optimize-images.mjs --dry-run   # report only
 *   node scripts/optimize-images.mjs             # rewrite files
 */

import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs"
import { join, extname, relative } from "node:path"
import { fileURLToPath } from "node:url"
import { dirname } from "node:path"
import sharp from "sharp"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const PUBLIC_DIR = join(ROOT, "public")

// Anything at or above this is worth a pass; below it the win is noise.
const MIN_BYTES = 100 * 1024
const DRY_RUN = process.argv.includes("--dry-run")

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else out.push(full)
  }
  return out
}

async function recompress(file) {
  const ext = extname(file).toLowerCase()
  const input = readFileSync(file)
  const image = sharp(input, { animated: ext === ".webp" })
  const meta = await image.metadata()

  // Cap absurd source resolutions. Nothing on the site renders wider than
  // 2560 CSS px, and next/image derives every smaller variant from this.
  const pipeline =
    meta.width && meta.width > 2560
      ? image.resize({ width: 2560, withoutEnlargement: true })
      : image

  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return pipeline.jpeg({ quality: 82, mozjpeg: true, progressive: true }).toBuffer()
    case ".png":
      // effort 10 + palette gives PNG-8 where the image allows it and falls
      // back to a better-compressed PNG-24 where it does not.
      return pipeline.png({ compressionLevel: 9, effort: 10, palette: true }).toBuffer()
    case ".webp":
      return pipeline.webp({ quality: 82, effort: 6 }).toBuffer()
    default:
      return null
  }
}

const targets = walk(PUBLIC_DIR)
  .filter((f) => [".jpg", ".jpeg", ".png", ".webp"].includes(extname(f).toLowerCase()))
  .filter((f) => statSync(f).size >= MIN_BYTES)
  .sort((a, b) => statSync(b).size - statSync(a).size)

console.log(
  `${targets.length} image(s) at or above ${Math.round(MIN_BYTES / 1024)} KB${DRY_RUN ? " (dry run)" : ""}\n`,
)

let before = 0
let after = 0
let rewritten = 0

for (const file of targets) {
  const originalSize = statSync(file).size
  before += originalSize
  const name = relative(PUBLIC_DIR, file).replace(/\\/g, "/")

  let output
  try {
    output = await recompress(file)
  } catch (err) {
    console.log(`  SKIP  ${name} — ${err.message}`)
    after += originalSize
    continue
  }

  // Never write a file that got bigger; some assets are already optimal.
  if (!output || output.length >= originalSize) {
    after += originalSize
    continue
  }

  const saved = originalSize - output.length
  const pct = Math.round((saved / originalSize) * 100)
  console.log(
    `  ${String(Math.round(originalSize / 1024)).padStart(5)} KB -> ${String(
      Math.round(output.length / 1024),
    ).padStart(5)} KB  (-${String(pct).padStart(2)}%)  ${name}`,
  )

  if (!DRY_RUN) writeFileSync(file, output)
  after += output.length
  rewritten++
}

const savedMb = (before - after) / 1024 / 1024
console.log(
  `\n${rewritten} file(s) ${DRY_RUN ? "would be " : ""}rewritten — ` +
    `${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024 / 1024).toFixed(2)} MB ` +
    `(saved ${savedMb.toFixed(2)} MB)`,
)
