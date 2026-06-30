/**
 * IndexNow helper.
 *
 * IndexNow is a protocol Bing, Yandex, Naver, Seznam, and Microsoft Copilot
 * use to receive content-change notifications from a site in near-real time
 * instead of waiting for a scheduled crawl. Notifying via IndexNow drops
 * indexing latency from days to minutes.
 *
 * Verification: the file at /public/<KEY>.txt must be live at the site root
 * (https://livvvv.com/<KEY>.txt) and return the key as its only content.
 * IndexNow polls that URL to confirm we own the key before accepting any
 * submissions.
 *
 * Usage:
 *
 *   import { pingIndexNow } from "@/lib/seo/indexnow"
 *   await pingIndexNow([
 *     "https://livvvv.com/blog/new-piece",
 *     "https://livvvv.com/blog/updated-piece",
 *   ])
 *
 * The host, key, and keyLocation are sourced from constants in this file
 * so the call site stays a single positional argument. Production wiring
 * (post-deploy webhook, content-publish hook) should import this helper
 * rather than duplicating the API contract inline.
 */

export const INDEXNOW_KEY = "53175289d4464c5e8624d3957bfe0aec" as const

const HOST = "livvvv.com"
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`
const ENDPOINT = "https://api.indexnow.org/indexnow"

export interface IndexNowResult {
  status: number
  ok: boolean
  submitted: number
  message?: string
}

/**
 * Submit a list of URLs to IndexNow. Returns the HTTP status returned by
 * the api.indexnow.org endpoint plus a normalized result object. IndexNow
 * returns:
 *   200 OK / 202 Accepted — submission accepted
 *   400 Bad Request       — malformed payload
 *   403 Forbidden         — key file mismatch or invalid key
 *   422 Unprocessable     — URLs do not belong to the host
 *   429 Too Many Requests — rate limited
 *
 * On non-2xx, returns with ok: false so the caller can decide whether to
 * retry, log, or proceed. The helper never throws.
 */
export async function pingIndexNow(
  urls: string[],
): Promise<IndexNowResult> {
  const cleanUrls = urls.filter(
    (u) => typeof u === "string" && u.startsWith(`https://${HOST}/`),
  )
  if (cleanUrls.length === 0) {
    return {
      status: 0,
      ok: false,
      submitted: 0,
      message: "No valid URLs to submit (must start with https://livvvv.com/)",
    }
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: cleanUrls,
      }),
    })
    return {
      status: res.status,
      ok: res.ok,
      submitted: cleanUrls.length,
      message: res.ok ? "Accepted" : await res.text().catch(() => undefined),
    }
  } catch (err) {
    return {
      status: 0,
      ok: false,
      submitted: cleanUrls.length,
      message: err instanceof Error ? err.message : "Unknown error",
    }
  }
}

/**
 * Single-URL convenience wrapper. Useful for content-publish hooks where
 * exactly one URL changed.
 */
export function pingIndexNowSingle(url: string): Promise<IndexNowResult> {
  return pingIndexNow([url])
}
