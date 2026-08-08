/**
 * Single source of truth for "does this page view get the intro?".
 *
 * Both SiteIntro and HeroReveal need the same answer, but SiteIntro writes the
 * session flag as soon as it decides — so a second caller reading sessionStorage
 * afterwards would get the opposite answer. The decision is therefore memoised
 * on first call and never recomputed for this page view, which makes it safe to
 * ask in any order.
 */

export const INTRO_SESSION_KEY = "__livv_intro_shown"
export const INTRO_DONE_EVENT = "livv:intro-done"

let decided: boolean | null = null

export function introWillRun(): boolean {
  if (typeof window === "undefined") return false
  if (decided !== null) return decided

  const forced = new URLSearchParams(window.location.search).get("intro") === "1"
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  let seen = false
  try {
    seen = window.sessionStorage.getItem(INTRO_SESSION_KEY) === "1"
  } catch {
    /* storage disabled — treat as unseen */
  }

  decided = forced || !(reduced || seen)
  return decided
}

export function markIntroShown(): void {
  try {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, "1")
  } catch {
    /* non-fatal */
  }
}
