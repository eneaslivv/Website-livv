#!/usr/bin/env node
/**
 * Render audit — detects /blog/[slug] pages that ship full HTML server-side
 * but render blank in a real browser due to client-side hydration crashes,
 * runtime errors, or component-level bugs.
 *
 * Why this exists (Search Console diagnostic 2026-05-14):
 *
 *   The advisor found at least one blog post (/blog/framer-meta-tags-og-
 *   images) that returns ~103KB of valid HTML server-side but renders as
 *   a blank page in the browser. Google's Web Rendering Service (WRS)
 *   executes the JS after fetching HTML, so a hydration crash means
 *   Googlebot effectively sees a blank page and deprioritizes the URL
 *   ("Discovered: currently not indexed"). Without running each URL in a
 *   real headless browser, server-side audits will not catch this class
 *   of bug.
 *
 * What the script does:
 *
 *   1. Reads every published BlogPost slug from the live sitemap.
 *   2. For each URL, opens it in a headless Chromium browser.
 *   3. Waits for the network to settle (networkidle).
 *   4. Counts visible body text words after JS hydration.
 *   5. Flags any URL that has fewer than --threshold words visible
 *      AFTER hydration as a render-broken page.
 *
 * Run:
 *
 *   # one-time install in worktree (or globally, but worktree is safer)
 *   npm install --no-save playwright
 *   npx playwright install chromium --with-deps
 *
 *   # then:
 *   node scripts/render-audit.mjs
 *
 * Optional flags:
 *
 *   --threshold=100      minimum visible word count to consider page OK
 *                        (default 100)
 *   --base=https://...   base URL (default https://livvvv.com)
 *   --limit=10           audit only first N URLs (default: all)
 *   --concurrency=4      number of pages to audit in parallel (default 4)
 *   --include-sitemap    audit every sitemap URL, not just /blog/*
 *
 * Output: JSON to stdout + human-readable summary to stderr. Pipe stdout
 * to a file if you want the full machine-readable report.
 */

import { chromium } from "playwright"
import { argv, env, stderr, stdout } from "node:process"

const args = Object.fromEntries(
  argv
    .slice(2)
    .filter((a) => a.startsWith("--"))
    .map((a) => {
      const [k, v = "true"] = a.slice(2).split("=")
      return [k, v]
    }),
)

const BASE = args.base || env.AUDIT_BASE || "https://livvvv.com"
const THRESHOLD = Number.parseInt(args.threshold ?? "100", 10)
const LIMIT = args.limit ? Number.parseInt(args.limit, 10) : Infinity
const CONCURRENCY = Number.parseInt(args.concurrency ?? "4", 10)
const INCLUDE_SITEMAP = args["include-sitemap"] === "true"

async function fetchSitemapUrls(base) {
  const res = await fetch(`${base}/sitemap.xml`)
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`)
  const xml = await res.text()
  const urls = []
  const re = /<loc>([^<]+)<\/loc>/g
  let m
  while ((m = re.exec(xml)) !== null) urls.push(m[1])
  return urls
}

function visibleTextWordCount(text) {
  return (text || "").trim().split(/\s+/).filter(Boolean).length
}

async function auditUrl(browser, url) {
  const ctx = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (compatible; LIVV-AEO-Audit/1.0; +https://livvvv.com)",
    viewport: { width: 1280, height: 800 },
  })
  const page = await ctx.newPage()

  const consoleErrors = []
  const pageErrors = []
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text().slice(0, 240))
  })
  page.on("pageerror", (err) => {
    pageErrors.push((err.message || String(err)).slice(0, 240))
  })

  let result = {
    url,
    status: 0,
    serverHtmlBytes: 0,
    visibleWords: 0,
    mainWords: 0,
    consoleErrors: 0,
    pageErrors: 0,
    consoleErrorSamples: [],
    pageErrorSamples: [],
    rendered: false,
    error: null,
  }

  try {
    const resp = await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 25_000,
    })
    result.status = resp?.status() || 0

    // Give React a beat to finish any deferred work after networkidle.
    await page.waitForTimeout(800)

    const { visibleWords, mainWords } = await page.evaluate(() => {
      const bodyText = (document.body?.innerText || "").trim()
      const mainEl = document.querySelector("main, article")
      const mainText = mainEl ? (mainEl.innerText || "").trim() : ""
      const count = (s) =>
        s
          .split(/\s+/)
          .filter(Boolean).length
      return {
        visibleWords: count(bodyText),
        mainWords: count(mainText),
      }
    })
    result.visibleWords = visibleWords
    result.mainWords = mainWords
    result.consoleErrors = consoleErrors.length
    result.pageErrors = pageErrors.length
    result.consoleErrorSamples = consoleErrors.slice(0, 3)
    result.pageErrorSamples = pageErrors.slice(0, 3)
    result.rendered =
      visibleWords >= THRESHOLD && pageErrors.length === 0
  } catch (err) {
    result.error = (err && err.message) || String(err)
  } finally {
    await ctx.close()
  }
  return result
}

async function runWithConcurrency(items, n, worker) {
  const out = []
  const queue = [...items.entries()]
  const workers = Array.from({ length: n }, async () => {
    while (queue.length > 0) {
      const next = queue.shift()
      if (!next) break
      const [i, item] = next
      const r = await worker(item, i)
      out[i] = r
      // Progress to stderr so it does not pollute the JSON stdout stream.
      stderr.write(
        `  [${out.filter(Boolean).length}/${items.length}] ${item}\n`,
      )
    }
  })
  await Promise.all(workers)
  return out
}

async function main() {
  stderr.write(`\nLIVV render audit — base: ${BASE}, threshold: ${THRESHOLD} words\n`)
  stderr.write("Fetching sitemap...\n")
  let urls = await fetchSitemapUrls(BASE)

  if (!INCLUDE_SITEMAP) {
    urls = urls.filter((u) =>
      /\/blog\/[a-z0-9-]+$/.test(u.replace(BASE, "")),
    )
  }
  if (Number.isFinite(LIMIT)) urls = urls.slice(0, LIMIT)

  stderr.write(`Auditing ${urls.length} URL(s) with concurrency=${CONCURRENCY}...\n\n`)

  const browser = await chromium.launch({ headless: true })
  const results = await runWithConcurrency(urls, CONCURRENCY, (url) =>
    auditUrl(browser, url),
  )
  await browser.close()

  const broken = results.filter((r) => !r.rendered)
  const thin = results.filter(
    (r) => r.rendered && r.visibleWords < THRESHOLD * 3,
  )
  const ok = results.filter((r) => r.rendered)

  stderr.write("\n────────────────────────────\n")
  stderr.write(`OK:     ${ok.length}\n`)
  stderr.write(`THIN:   ${thin.length}  (rendered but <${THRESHOLD * 3} visible words)\n`)
  stderr.write(`BROKEN: ${broken.length} (rendered fewer than ${THRESHOLD} visible words OR threw)\n`)
  stderr.write("\n")

  if (broken.length > 0) {
    stderr.write("Broken pages (look here first):\n")
    for (const r of broken) {
      stderr.write(
        `  ${String(r.visibleWords).padStart(4)}w  ${r.url}  ${r.error ? `[err: ${r.error}]` : ""}\n`,
      )
      if (r.pageErrors > 0) {
        stderr.write(`         pageerror: ${r.pageErrorSamples[0]}\n`)
      }
      if (r.consoleErrors > 0 && r.pageErrors === 0) {
        stderr.write(`         console:   ${r.consoleErrorSamples[0]}\n`)
      }
    }
    stderr.write("\n")
  }

  if (thin.length > 0) {
    stderr.write("Thin pages (rendered but short):\n")
    for (const r of thin) {
      stderr.write(`  ${String(r.visibleWords).padStart(4)}w  ${r.url}\n`)
    }
    stderr.write("\n")
  }

  // Machine-readable JSON to stdout so the script can be piped.
  stdout.write(JSON.stringify({ ok: ok.length, thin: thin.length, broken: broken.length, results }, null, 2))
  stdout.write("\n")
}

main().catch((err) => {
  stderr.write(`\nFATAL: ${err.message || err}\n`)
  process.exit(1)
})
