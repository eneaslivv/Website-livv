#!/usr/bin/env node
/**
 * Builds public/images/footer-gradient.webp: the stepped footer gradient in
 * the brand palette.
 *
 * The shape is the one the site already had (footer-gradient.png, measured):
 * nine columns, symmetric, each one the same vertical gradient stretched from
 * its own top to a point just below the image, then blurred. Only the colours
 * changed, to the atmospheric gradients of the LIVV Hub brand guide (03.4):
 * celeste → manteca, then blush → bordó.
 *
 * Usage:
 *   node scripts/build-footer-gradient.mjs              # the default ramp
 *   node scripts/build-footer-gradient.mjs --ramp=cierre  # celeste → manteca → cocoa
 *   node scripts/build-footer-gradient.mjs --ramp=icono   # salvia → blush → bordó
 */

import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const OUT = join(ROOT, "public", "images", "footer-gradient.webp")

const SKY = "#AFC3D8"
const BUTTER = "#FFF6BE"
const BLUSH = "#ECD2CC"
const SAGE = "#8D9661"
const BORDEAUX = "#440C15"
const COCOA = "#302014"

// Position along a column (0 = its top, 1 = the convergence point) → colour.
// The first stop repeats so the fade-in from transparent happens on one colour.
const RAMPS = {
    atmosfera: [[0, SKY], [0.18, SKY], [0.4, BUTTER], [0.6, BLUSH], [0.96, BORDEAUX], [1, BORDEAUX]],
    cierre: [[0, SKY], [0.2, SKY], [0.55, BUTTER], [1, COCOA]],
    icono: [[0, SAGE], [0.2, SAGE], [0.55, BLUSH], [1, BORDEAUX]],
}

const rampName = (process.argv.find((a) => a.startsWith("--ramp=")) ?? "--ramp=atmosfera").slice(7)
const ramp = RAMPS[rampName]
if (!ramp) {
    console.error(`Unknown ramp "${rampName}". Use one of: ${Object.keys(RAMPS).join(", ")}`)
    process.exit(1)
}

// Geometry, in the original's 1024×426 space, scaled up.
const SCALE = 1.5625
const W = Math.round(1024 * SCALE)
const H = Math.round(426 * SCALE)
const CONVERGE = 442 * SCALE // every column's gradient ends here, below the image
const HALF_TOPS = [202, 137, 77, 35, -9] // where each column starts, edge → centre
const TOPS = [...HALF_TOPS, ...HALF_TOPS.slice(0, -1).reverse()].map((y) => y * SCALE)
const FADE_IN = 0.22 // share of a column that fades in from transparent
const BLUR_SIGMA = 6.5 * SCALE

/* ---------- colour: interpolate in OKLab so the mixes stay clean ---------- */

const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const toSrgb = (c) => (c <= 0.0031308 ? c * 12.92 : 1.055 * Math.max(c, 0) ** (1 / 2.4) - 0.055)

function hexToOklab(hex) {
    const [r, g, b] = [1, 3, 5].map((i) => toLinear(parseInt(hex.slice(i, i + 2), 16) / 255))
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
    const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
    const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
    return [
        0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
        1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
        0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
    ]
}

function oklabToLinear([L, a, b]) {
    const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
    const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
    const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
    return [
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ]
}

const stops = ramp.map(([at, hex]) => [at, hexToOklab(hex)])

function colourAt(t) {
    const x = Math.min(1, Math.max(0, t))
    let i = 0
    while (i < stops.length - 2 && x >= stops[i + 1][0]) i++
    const [a, ca] = stops[i]
    const [b, cb] = stops[i + 1]
    const u = (x - a) / (b - a)
    return oklabToLinear(ca.map((v, k) => v + (cb[k] - v) * u))
}

/* ---------- paint the columns, premultiplied, in linear light ---------- */

const PAD = Math.ceil(BLUR_SIGMA * 3)
const PW = W + PAD * 2
const PH = H + PAD * 2
let planes = [0, 1, 2, 3].map(() => new Float32Array(PW * PH))

for (let py = 0; py < PH; py++) {
    const y = py - PAD
    for (let px = 0; px < PW; px++) {
        // Padding repeats the edge columns, so the blur does not darken the sides.
        const x = Math.min(W - 1, Math.max(0, px - PAD))
        const top = TOPS[Math.min(8, Math.floor((x * 9) / W))]
        const t = (y - top) / (CONVERGE - top)
        const f = Math.min(1, Math.max(0, t / FADE_IN))
        const alpha = f * f * (3 - 2 * f)
        const rgb = colourAt(t)
        const i = py * PW + px
        planes[0][i] = rgb[0] * alpha
        planes[1][i] = rgb[1] * alpha
        planes[2][i] = rgb[2] * alpha
        planes[3][i] = alpha
    }
}

/* ---------- separable gaussian blur ---------- */

const radius = PAD
const kernel = Float32Array.from({ length: radius * 2 + 1 }, (_, i) => Math.exp(-((i - radius) ** 2) / (2 * BLUR_SIGMA ** 2)))
const kernelSum = kernel.reduce((a, b) => a + b, 0)

function blur(src) {
    const tmp = new Float32Array(src.length)
    const out = new Float32Array(src.length)
    for (let y = 0; y < PH; y++) {
        for (let x = 0; x < PW; x++) {
            let acc = 0
            for (let k = -radius; k <= radius; k++) {
                acc += kernel[k + radius] * src[y * PW + Math.min(PW - 1, Math.max(0, x + k))]
            }
            tmp[y * PW + x] = acc / kernelSum
        }
    }
    for (let y = 0; y < PH; y++) {
        for (let x = 0; x < PW; x++) {
            let acc = 0
            for (let k = -radius; k <= radius; k++) {
                acc += kernel[k + radius] * tmp[Math.min(PH - 1, Math.max(0, y + k)) * PW + x]
            }
            out[y * PW + x] = acc / kernelSum
        }
    }
    return out
}

planes = planes.map(blur)

/* ---------- back to straight-alpha sRGB, encode ---------- */

const pixels = Buffer.alloc(W * H * 4)
for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
        const i = (y + PAD) * PW + (x + PAD)
        const alpha = Math.min(1, Math.max(0, planes[3][i]))
        const o = (y * W + x) * 4
        for (let c = 0; c < 3; c++) {
            const linear = alpha > 1e-5 ? planes[c][i] / alpha : 0
            pixels[o + c] = Math.round(Math.min(1, Math.max(0, toSrgb(Math.min(1, linear)))) * 255)
        }
        pixels[o + 3] = Math.round(alpha * 255)
    }
}

const info = await sharp(pixels, { raw: { width: W, height: H, channels: 4 } })
    .webp({ quality: 86, alphaQuality: 100, effort: 6, smartSubsample: true })
    .toFile(OUT)

console.log(`footer-gradient.webp · ramp "${rampName}" · ${info.width}×${info.height} · ${(info.size / 1024).toFixed(1)} KB`)
