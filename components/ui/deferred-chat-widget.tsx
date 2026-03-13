"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const ChatWidgetLazy = dynamic(
  () => import("@/components/ui/chat-widget").then((m) => m.ChatWidget),
  { ssr: false }
)

export function DeferredChatWidget() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setShow(true), { timeout: 3000 })
      return () => window.cancelIdleCallback(id)
    } else {
      const t = setTimeout(() => setShow(true), 3000)
      return () => clearTimeout(t)
    }
  }, [])

  return show ? <ChatWidgetLazy /> : null
}
