"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import { CONSENT_EVENT, readConsent } from "@/lib/consent"

const ChatWidgetLazy = dynamic(
  () => import("@/components/ui/chat-widget").then((m) => m.ChatWidget),
  { ssr: false }
)

/**
 * Lazy-mounts the chat widget after the page is idle. Skipped on:
 *   - /embed/* routes (widget loaded inside third-party iframes — having a
 *     floating "Luis" chat over someone else's site would be confusing UX).
 *   - The 404 page (app/not-found.tsx sets window.__livv_no_track = true).
 *   - First-time visitors until they make a cookie choice — otherwise the
 *     chat overlaps the consent banner on mobile and pulls focus before
 *     the user has decided about tracking.
 */
export function DeferredChatWidget() {
  const pathname = usePathname()
  const [show, setShow] = useState(false)
  const [consentDecided, setConsentDecided] = useState(false)

  const isEmbed = pathname?.startsWith("/embed/") ?? false
  const isNoTrack = typeof window !== "undefined" && (window as { __livv_no_track?: boolean }).__livv_no_track === true
  const skipRoute = isEmbed || isNoTrack

  // Consent-gate: keep the chat hidden while the cookie banner is on screen.
  useEffect(() => {
    if (skipRoute) return
    if (readConsent()) {
      setConsentDecided(true)
      return
    }
    const onChange = () => setConsentDecided(true)
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [skipRoute])

  // Idle-mount once route + consent are OK.
  useEffect(() => {
    if (skipRoute || !consentDecided) return
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setShow(true), { timeout: 3000 })
      return () => window.cancelIdleCallback(id)
    } else {
      const t = setTimeout(() => setShow(true), 3000)
      return () => clearTimeout(t)
    }
  }, [skipRoute, consentDecided])

  if (skipRoute) return null
  return show ? <ChatWidgetLazy /> : null
}
