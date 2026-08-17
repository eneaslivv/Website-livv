#!/usr/bin/env node
/**
 * IndexNow ping CLI.
 *
 * Submits URLs to https://api.indexnow.org/indexnow so Bing (and through it
 * ChatGPT Search / Copilot), Yandex, Naver, and Seznam re-crawl changed pages
 * in minutes instead of days. Zero dependencies — plain Node 20+.
 *
 * The key is NOT hardcoded here: the script reads it from the verification
 * file the site already serves (public/<key>.txt, committed in f2c0557).
 * That file is the single source of truth — its basename and its content are
 * both the key, and IndexNow fetches https://livvvv.com/<key>.txt to verify
 * ownership before accepting a submission.
 *
 * Usage:
 *   node scripts/indexnow-ping.mjs --from-sitemap
 *       Fetch https://livvvv.com/sitemap.xml and submit every URL in it.
 *   node scripts/indexnow-ping.mjs --from-sitemap --changed-within=7
 *       Same, but only URLs whose <lastmod> is within the last 7 days
 *       (URLs without <lastmod> are kept).
 *   node scripts/indexnow-ping.mjs --urls https://livvvv.com/blog/foo ...
 *       Submit explicit URLs. Combines with --from-sitemap (deduped).
 *   Add --dry-run to print what would be submitted without calling the API.
 *
 * Exit codes: 0 = accepted (HTTP 200/202) or dry run, 1 = anything else.
 */

import { readdirSync, readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { join, dirname } from "node:path"

const HOST = "livvvv.com"
const SITE = `https://${HOST}`
const ENDPOINT = "https://api.indexnow.org/indexnow"
const MAX_URLS_PER_POST = 10000

function readKey() {
  const publicDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public")
  const keyFiles = readdirSync(publicDir).filter((f) => /^[0-9a-f]{8,128}\.txt$/.test(f))
  if (keyFiles.length !== 1) {
    throw new Error(
      `Expected exactly one IndexNow key file (public/<hex-key>.txt), found ${keyFiles.length}`,
    )
  }
  const key = readFileSync(join(publicDir, keyFiles[0]), "utf8").trim()
  if (`${key}.txt` !== keyFiles[0]) {
    throw new Error(`Key file ${keyFiles[0]} does not contain its own basename as content`)
  }
  return key
}

function parseArgs(argv) {
  const opts = { fromSitemap: false, dryRun: false, changedWithin: null, urls: [] }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === "--from-sitemap") opts.fromSitemap = true
    else if (arg === "--dry-run") opts.dryRun = true
    else if (arg.startsWith("--changed-within=")) {
      opts.changedWithin = Number(arg.split("=")[1])
      if (!Number.isFinite(opts.changedWithin) || opts.changedWithin <= 0) {
        throw new Error(`Invalid --changed-within value: ${arg}`)
      }
    } else if (arg === "--urls") {
      while (i + 1 < argv.length && !argv[i + 1].startsWith("--")) opts.urls.push(argv[++i])
    } else {
      throw new Error(`Unknown argument: ${arg}`)
    }
  }
  return opts
}

async function fetchSitemapEntries() {
  const res = await fetch(`${SITE}/sitemap.xml`)
  if (!res.ok) throw new Error(`Fetching ${SITE}/sitemap.xml failed: HTTP ${res.status}`)
  const xml = await res.text()
  const entries = []
  for (const block of xml.match(/<url>[\s\S]*?<\/url>/g) ?? []) {
    const loc = /<loc>\s*([^<]+?)\s*<\/loc>/.exec(block)
    if (!loc) continue
    const lastmod = /<lastmod>\s*([^<]+?)\s*<\/lastmod>/.exec(block)
    entries.push({ url: loc[1], lastmod: lastmod ? lastmod[1] : null })
  }
  return entries
}

function belongsToHost(url) {
  return url === SITE || url.startsWith(`${SITE}/`)
}

async function main() {
  const opts = parseArgs(process.argv.slice(2))
  if (!opts.fromSitemap && opts.urls.length === 0) {
    throw new Error("Nothing to submit — pass --from-sitemap and/or --urls <url> ...")
  }

  const candidates = [...opts.urls]
  if (opts.fromSitemap) {
    try {
      let entries = await fetchSitemapEntries()
      if (opts.changedWithin !== null) {
        const cutoff = Date.now() - opts.changedWithin * 86_400_000
        entries = entries.filter((e) => !e.lastmod || new Date(e.lastmod).getTime() >= cutoff)
      }
      candidates.push(...entries.map((e) => e.url))
    } catch (err) {
      // A stale/unreachable sitemap must not swallow explicitly passed URLs
      // (the deploy workflow passes the just-published blog post via --urls).
      if (opts.urls.length === 0) throw err
      console.warn(`WARN sitemap skipped: ${err.message}`)
    }
  }

  const rejected = candidates.filter((u) => !belongsToHost(u))
  for (const u of rejected) console.warn(`WARN skipping URL outside ${SITE}: ${u}`)
  const urlList = [...new Set(candidates.filter(belongsToHost))]
  if (urlList.length === 0) throw new Error("No valid URLs to submit")

  const key = readKey()
  const keyLocation = `${SITE}/${key}.txt`
  console.log(`IndexNow: ${urlList.length} URL(s) for ${HOST} (key file ${keyLocation})`)

  if (opts.dryRun) {
    for (const u of urlList) console.log(`  ${u}`)
    console.log("Dry run — nothing submitted.")
    return
  }

  for (let i = 0; i < urlList.length; i += MAX_URLS_PER_POST) {
    const batch = urlList.slice(i, i + MAX_URLS_PER_POST)
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ host: HOST, key, keyLocation, urlList: batch }),
    })
    if (res.ok) {
      console.log(`OK HTTP ${res.status} — ${batch.length} URL(s) accepted`)
    } else {
      const body = await res.text().catch(() => "")
      throw new Error(`IndexNow rejected the submission: HTTP ${res.status} ${body}`.trim())
    }
  }
}

main().catch((err) => {
  console.error(`ERROR ${err.message}`)
  process.exit(1)
})
