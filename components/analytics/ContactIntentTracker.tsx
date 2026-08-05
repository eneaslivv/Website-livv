"use client"

import { useEffect } from "react"
import { trackBookCallClick, trackContactClick } from "@/lib/analytics"

/**
 * Document-level listener for contact-intent link clicks.
 *
 * Why delegation instead of onClick per link: several pages that carry
 * mailto links are server components (app/studio, components/seo/aeo-landing),
 * which cannot take event handlers without being converted to client
 * components — and those pages are static on purpose, for SEO and AI-citation
 * reasons. A single delegated listener covers them, covers any mailto added in
 * future, and needs no per-link wiring.
 *
 * Links that already call trackContactClick directly will match here too. That
 * is harmless: reportContactConversion in lib/google-ads.ts throttles repeat
 * reports inside 1s, so one physical click still reports exactly one
 * conversion.
 */
export function ContactIntentTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest("a")
      if (!anchor) return

      // Read the literal attribute: anchor.href resolves mailto/tel oddly
      // across browsers, and we only care about the declared scheme.
      const href = anchor.getAttribute("href")
      if (!href) return

      if (href.startsWith("mailto:")) {
        trackContactClick("email", locationLabel(anchor))
        return
      }
      if (href.startsWith("tel:")) {
        trackContactClick("phone", locationLabel(anchor))
        return
      }
      if (href.includes("cal.com") || href.includes("calendly.com")) {
        trackBookCallClick(locationLabel(anchor))
      }
    }

    // Capture phase, so the conversion is recorded even when a handler
    // downstream calls stopPropagation or navigates away immediately.
    document.addEventListener("click", onClick, { capture: true })
    return () => document.removeEventListener("click", onClick, { capture: true })
  }, [])

  return null
}

/** Best-effort description of where on the page the link lives. */
function locationLabel(anchor: Element): string {
  const section = anchor.closest("[data-analytics-location]")
  const explicit = section?.getAttribute("data-analytics-location")
  if (explicit) return explicit

  const landmark = anchor.closest("footer, header, nav, section, main")
  if (landmark) {
    const label = landmark.getAttribute("aria-label")
    if (label) return label.toLowerCase().replace(/\s+/g, "_").slice(0, 40)
    return landmark.tagName.toLowerCase()
  }
  return typeof window !== "undefined" ? window.location.pathname : "unknown"
}
