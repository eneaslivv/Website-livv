"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"

const ChatWidgetLazy = dynamic(
  () => import("@/components/ui/chat-widget").then((m) => m.ChatWidget),
  { ssr: false }
)

/**
 * Lazy-mounts the chat widget after the page is idle. Skipped on:
 *   - /embed/* routes (widget loaded inside third-party iframes — having a
 *     floating "Luis" chat over someone else's site would be confusing UX).
 *   - The 404 page (app/not-found.tsx sets window.__livv_no_track = true).
 */
export function DeferredChatWidget() {
  const pathname = usePathname()
  const [show, setShow] = useState(false)

  const isEmbed = pathname?.startsWith("/embed/") ?? false
  const isNoTrack = typeof window !== "undefined" && (window as { __livv_no_track?: boolean }).__livv_no_track === true
  const skip = isEmbed || isNoTrack

  useEffect(() => {
    if (skip) return
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setShow(true), { timeout: 3000 })
      return () => window.cancelIdleCallback(id)
    } else {
      const t = setTimeout(() => setShow(true), 3000)
      return () => clearTimeout(t)
    }
  }, [skip])

  if (skip) return null
  return show ? <ChatWidgetLazy /> : null
}
