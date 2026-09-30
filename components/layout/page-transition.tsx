"use client"

import { useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { LivvSign } from "@/components/brand/livv-sign"
import { NAVIGATE_EVENT, REVEAL_EVENT } from "@/lib/page-cover"

/**
 * The curtain between pages. A bordó panel with a wavy leading edge rises over
 * the page (cover), the route changes underneath, and the panel keeps going up
 * to uncover the new one (reveal) while its heading enters. The look is in
 * app/brand-motion.css; this file is the sequencing.
 *
 * How it hooks in:
 * - Clicks on internal links are caught in the capture phase and turned into
 *   cover → router.push → reveal. next/link checks `defaultPrevented`, so it
 *   does not navigate a second time. Modified clicks, new tabs, downloads,
 *   same-page anchors and non-page routes (admin, portal, API, static files)
 *   are left alone.
 * - Navigations started from code call navigateWithCover (lib/page-cover.ts),
 *   which comes here through NAVIGATE_EVENT.
 * - Back and forward are not covered: the browser is already restoring a page.
 * - Reduced motion: nothing here runs, navigation is the browser's own.
 *
 * It cannot get stuck: every phase has a timer that moves it on, the reveal has
 * a safety net if the route never commits, and starting a new navigation
 * cancels the previous one.
 */

type Phase = "idle" | "covering" | "covered" | "revealing"

const SAFETY_MS = 4500

const timing = () =>
  window.matchMedia("(max-width: 767px)").matches
    ? { cover: 480, reveal: 680, hold: 120, tail: 1300 }
    : { cover: 580, reveal: 800, hold: 160, tail: 1500 }

/** Where each section sits in the navbar, for the label on the curtain. */
const SECTIONS: Record<string, { n?: string; text: string }> = {
  "": { n: "01", text: "Home" },
  about: { n: "02", text: "About" },
  work: { n: "03", text: "Work" },
  projects: { n: "03", text: "Work" },
  services: { n: "04", text: "Services" },
  products: { n: "05", text: "Products" },
  blog: { n: "06", text: "Blog" },
  contact: { text: "Contact" },
}

const isPageRoute = (pathname: string) =>
  !/^\/(admin|portal|api|embed|presentation|lp|_next)(\/|$)/.test(pathname) && !/\.[a-z0-9]{2,5}$/i.test(pathname)

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function PageTransition() {
  const router = useRouter()
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const routerRef = useRef(router)
  routerRef.current = router

  // The machine lives outside React state: the phase is written straight to the
  // DOM, so a re-render in the middle of a transition can never disturb it.
  const machine = useRef({ phase: "idle" as Phase, from: "", timers: [] as number[], arrived: () => {} })

  useEffect(() => {
    const m = machine.current
    const panel = panelRef.current
    if (!panel) return

    const setPhase = (phase: Phase) => {
      m.phase = phase
      panel.dataset.phase = phase
      const root = document.documentElement
      if (phase === "idle") root.removeAttribute("data-transition")
      else root.setAttribute("data-transition", phase)
    }
    const after = (fn: () => void, ms: number) => {
      m.timers.push(window.setTimeout(fn, ms))
    }
    const clearTimers = () => {
      m.timers.forEach((id) => window.clearTimeout(id))
      m.timers = []
    }

    const reveal = () => {
      if (m.phase !== "covered") return
      clearTimers()
      setPhase("revealing")
      window.dispatchEvent(new Event(REVEAL_EVENT))
      after(() => setPhase("idle"), timing().tail)
    }

    const start = (href: string) => {
      const t = timing()
      clearTimers()
      const url = new URL(href, window.location.href)
      // Google Analytics' cross-domain linker decorates same-site links with `_gl`
      // when they are pressed, before this handler reads them. next/link navigates
      // with the `href` it was given, so without the curtain the URL stays clean:
      // keep it that way.
      url.searchParams.delete("_gl")
      const section = SECTIONS[url.pathname.split("/").filter(Boolean)[0] ?? ""]
      if (numRef.current) numRef.current.textContent = section?.n ? `${section.n} ` : ""
      if (textRef.current) textRef.current.textContent = section ? `${section.n ? "— " : ""}${section.text}` : ""
      panel.style.setProperty("--livv-cover-ms", `${t.cover}ms`)
      panel.style.setProperty("--livv-reveal-ms", `${t.reveal}ms`)

      setPhase("covering")
      after(() => {
        setPhase("covered")
        m.from = window.location.pathname
        m.arrived = () => after(reveal, t.hold)
        routerRef.current.push(url.pathname + url.search + url.hash)
        after(reveal, SAFETY_MS)
      }, t.cover + 30)
    }

    const shouldHandle = (url: URL) =>
      url.origin === window.location.origin &&
      url.pathname !== window.location.pathname &&
      isPageRoute(url.pathname) &&
      isPageRoute(window.location.pathname) &&
      !prefersReducedMotion()

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null
      if (!link) return
      const target = link.getAttribute("target")
      if ((target && target !== "_self") || link.hasAttribute("download") || link.hasAttribute("data-no-transition")) return
      let url: URL
      try {
        url = new URL(link.href, window.location.href)
      } catch {
        return
      }
      if (!shouldHandle(url)) return
      e.preventDefault()
      start(url.pathname + url.search + url.hash)
    }

    const onNavigate = (e: Event) => {
      const href = (e as CustomEvent<{ href?: string }>).detail?.href
      if (!href) return
      let url: URL
      try {
        url = new URL(href, window.location.href)
      } catch {
        return
      }
      if (!shouldHandle(url)) return // not handled: the caller falls back to router.push
      e.preventDefault()
      start(url.pathname + url.search + url.hash)
    }

    // Back / forward and bfcache restores show a page straight away: drop any curtain.
    const drop = () => {
      clearTimers()
      setPhase("idle")
    }
    // `pageshow` also fires after `load` on every ordinary load, with `persisted` false.
    // Only a restore from the back/forward cache may drop the curtain: dropping it on
    // the first one loses the navigation of a click made before the page finished
    // loading (the push is still waiting on its timer) or cuts the reveal short.
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) drop()
    }

    document.addEventListener("click", onClick, true)
    window.addEventListener(NAVIGATE_EVENT, onNavigate)
    window.addEventListener("popstate", drop)
    window.addEventListener("pageshow", onPageShow)
    return () => {
      document.removeEventListener("click", onClick, true)
      window.removeEventListener(NAVIGATE_EVENT, onNavigate)
      window.removeEventListener("popstate", drop)
      window.removeEventListener("pageshow", onPageShow)
      drop()
    }
  }, [])

  // The route committed while the curtain was down: uncover it.
  useEffect(() => {
    const m = machine.current
    if (m.phase === "covered" && pathname !== m.from) m.arrived()
  }, [pathname])

  return (
    <div ref={panelRef} className="livv-wipe" data-phase="idle" aria-hidden="true">
      {(["top", "bottom"] as const).map((edge) => (
        <svg
          key={edge}
          className={`livv-wipe__edge livv-wipe__edge--${edge}`}
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          focusable="false"
        >
          <path d="M0 100V60C150 10 330 6 520 40S880 96 1090 54S1340 2 1440 36V100Z" />
        </svg>
      ))}
      <div className="livv-wipe__mark">
        <LivvSign />
      </div>
      <span className="livv-wipe__label">
        <i ref={numRef} />
        <span ref={textRef} />
      </span>
    </div>
  )
}
