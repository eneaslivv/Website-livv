import sharp from "sharp";
import { writeFile, readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SOURCE = resolve(ROOT, "public/assets/logo-new.png");

async function makeRoundedSquare({ size, bg, fg }) {
  const radius = Math.round(size * 0.205);
  const padding = Math.round(size * 0.08);
  const innerW = size - padding * 2;

  const sourceBuf = await readFile(SOURCE);
  const sourceMeta = await sharp(sourceBuf).metadata();
  const aspect = sourceMeta.width / sourceMeta.height;

  let logoW = innerW;
  let logoH = Math.round(innerW / aspect);
  if (logoH > innerW) {
    logoH = innerW;
    logoW = Math.round(innerW * aspect);
  }

  let logo = sharp(sourceBuf).resize(logoW, logoH, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });
  if (fg === "black") {
    logo = logo.negate({ alpha: false });
  }
  const logoBuf = await logo.png().toBuffer();

  const bgHex = bg === "black" ? "#000000" : "#ffffff";
  const svgBg = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="${bgHex}"/></svg>`
  );

  return sharp(svgBg)
    .composite([
      {
        input: logoBuf,
        top: Math.round((size - logoH) / 2),
        left: Math.round((size - logoW) / 2),
      },
    ])
    .png()
    .toBuffer();
}

function pngToIco(pngBuf) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0);
  entry.writeUInt8(32, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuf.length, 8);
  entry.writeUInt32LE(22, 12);

  return Buffer.concat([header, entry, pngBuf]);
}

async function writeOut(path, buf) {
  await writeFile(resolve(ROOT, path), buf);
  console.log(`  wrote ${path} (${buf.length} bytes)`);
}

async function buildSvg() {
  const sourceBuf = await readFile(SOURCE);
  const sourceMeta = await sharp(sourceBuf).metadata();
  const aspect = sourceMeta.width / sourceMeta.height;

  const size = 180;
  const padding = Math.round(size * 0.08);
  const innerW = size - padding * 2;
  let logoW = innerW;
  let logoH = Math.round(innerW / aspect);
  if (logoH > innerW) {
    logoH = innerW;
    logoW = Math.round(innerW * aspect);
  }
  const x = Math.round((size - logoW) / 2);
  const y = Math.round((size - logoH) / 2);
  const radius = Math.round(size * 0.205);
  const b64 = sourceBuf.toString("base64");

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .bg { fill: #000; }
    .logo { filter: none; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #fff; }
      .logo { filter: invert(1); }
    }
  </style>
  <rect class="bg" width="${size}" height="${size}" rx="${radius}" ry="${radius}"/>
  <image class="logo" x="${x}" y="${y}" width="${logoW}" height="${logoH}" href="data:image/png;base64,${b64}"/>
</svg>
`;
}

async function main() {
  console.log(`source: ${SOURCE}`);

  const px32Light = await makeRoundedSquare({ size: 32, bg: "black", fg: "white" });
  const px32Dark = await makeRoundedSquare({ size: 32, bg: "white", fg: "black" });
  const px180Light = await makeRoundedSquare({ size: 180, bg: "black", fg: "white" });
  const svg = await buildSvg();

  await writeOut("app/icon.png", px32Light);
  await writeOut("app/apple-icon.png", px180Light);
  await writeOut("app/favicon.ico", pngToIco(px32Light));
  await writeOut("app/icon.svg", Buffer.from(svg, "utf8"));

  await writeOut("public/icon-light-32x32.png", px32Light);
  await writeOut("public/icon-dark-32x32.png", px32Dark);
  await writeOut("public/apple-icon.png", px180Light);
  await writeOut("public/icon.svg", Buffer.from(svg, "utf8"));

  console.log("done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
