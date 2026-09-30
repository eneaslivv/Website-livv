/**
 * Shared state of the two things that can cover the page: the brand intro on
 * the first visit of a session, and the curtain between pages.
 *
 * Both write to <html> before anything else reads them:
 *   data-intro       "run" | "leaving" | "done" | "skip"   (script in <head>)
 *   data-transition  "covering" | "covered" | "revealing"  (PageTransition)
 * and both fire REVEAL_EVENT at the moment the cover starts to lift, so a page
 * can hold its own entrance until there is something to see it.
 */

export const REVEAL_EVENT = "livv:reveal"
export const NAVIGATE_EVENT = "livv:navigate"

/** True while something opaque still covers the page and the reveal is yet to come. */
export function coverIsUp(): boolean {
  if (typeof document === "undefined") return false
  const el = document.documentElement
  return el.getAttribute("data-intro") === "run" || ["covering", "covered"].includes(el.getAttribute("data-transition") ?? "")
}

/**
 * Navigate through the curtain. Use this instead of router.push wherever a
 * click starts a page change from code (plain links are intercepted on their
 * own). If the curtain is not mounted or is disabled, `fallback` runs.
 */
export function navigateWithCover(href: string, fallback: () => void): void {
  if (typeof window === "undefined") return fallback()
  const handled = !window.dispatchEvent(new CustomEvent(NAVIGATE_EVENT, { detail: { href }, cancelable: true }))
  if (!handled) fallback()
}
