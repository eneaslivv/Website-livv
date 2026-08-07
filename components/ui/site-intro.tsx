"use client"

import { useEffect, useRef, useState } from "react"

/**
 * First-load intro: a full-bleed cream panel with a counter that fills, then
 * slides away to reveal the page.
 *
 * Motion vocabulary is taken from the reference the client sent (a cream plate
 * at a high z-index, a mono "Loading" label, an oversized percentage with tight
 * negative tracking, a 1px rule that fills, and a 1.15s
 * cubic-bezier(.76,0,.24,1) exit) but rendered in LIVV's own palette and type.
 * No page design changes with it — it is purely an overlay that removes itself.
 *
 * Rules it has to respect, because a preloader is the easiest way to wreck a
 * site's perceived performance and accessibility:
 *   - Once per session. A curtain on every navigation is punishment, not polish.
 *   - Skipped entirely under prefers-reduced-motion.
 *   - Kept to ~1.1s max. It delays first content, which is a real cost.
 *   - Hard capped, so a slow asset can never hold the page hostage.
 *   - aria-hidden and pointer-events-none on the way out; the real content is
 *     always in the HTML underneath, so crawlers and screen readers are
 *     unaffected.
 */

const SESSION_KEY = "__livv_intro_shown"
const MAX_DURATION = 1100
const EXIT_MS = 1150

export function SiteIntro() {
    const [mounted, setMounted] = useState(false)
    const [pct, setPct] = useState(0)
    const [leaving, setLeaving] = useState(false)
    const rafRef = useRef<number>(0)

    useEffect(() => {
        // Decide synchronously on mount whether this visit gets an intro at all.
        if (typeof window === "undefined") return

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        let seen = false
        try {
            seen = window.sessionStorage.getItem(SESSION_KEY) === "1"
        } catch {
            /* storage disabled — treat as unseen */
        }

        // Note: deliberately NOT gated on document.readyState. On a fast
        // connection the document is already "complete" before React hydrates,
        // which skipped the intro every single time. It is a brand beat, so it
        // runs on the session's first view regardless — kept short, because it
        // does delay first content and that cost is real.
        if (reduced || seen) return

        try {
            window.sessionStorage.setItem(SESSION_KEY, "1")
        } catch {
            /* non-fatal */
        }

        setMounted(true)
        document.documentElement.style.overflow = "hidden"

        const started = performance.now()
        let done = false

        function finish() {
            if (done) return
            done = true
            setPct(100)
            setLeaving(true)
            document.documentElement.style.overflow = ""
            window.setTimeout(() => setMounted(false), EXIT_MS)
        }

        // The counter tracks elapsed time against the cap, and snaps to 100 as
        // soon as the window actually finishes loading — so it reads as real
        // progress rather than a fixed fake animation.
        function tick() {
            const elapsed = performance.now() - started
            const ratio = Math.min(elapsed / MAX_DURATION, 1)
            // ease-out so it decelerates instead of running linearly to 100
            const eased = 1 - Math.pow(1 - ratio, 2)
            setPct(Math.round(eased * 100))
            if (ratio >= 1) {
                finish()
                return
            }
            rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)

        const onLoad = () => {
            // Give the counter a beat to catch up rather than snapping from 30%.
            const elapsed = performance.now() - started
            // Floor the visible duration so it never flashes for 80ms.
            window.setTimeout(finish, Math.max(0, 700 - elapsed))
        }
        window.addEventListener("load", onLoad)

        const hardStop = window.setTimeout(finish, MAX_DURATION + 200)

        return () => {
            cancelAnimationFrame(rafRef.current)
            window.removeEventListener("load", onLoad)
            window.clearTimeout(hardStop)
            document.documentElement.style.overflow = ""
        }
    }, [])

    if (!mounted) return null

    return (
        <div
            aria-hidden
            data-livv-intro
            className="fixed inset-0 flex flex-col justify-between"
            style={{
                zIndex: 9000,
                background: "#FAF7F3",
                padding: "26px 30px",
                pointerEvents: leaving ? "none" : "auto",
                transform: leaving ? "translateY(-100%)" : "translateY(0)",
                transition: `transform ${EXIT_MS}ms cubic-bezier(.76,0,.24,1)`,
            }}
        >
            <span
                className="font-mono uppercase"
                style={{ fontSize: 11, letterSpacing: "0.08em", color: "#8a7e74" }}
            >
                Loading
            </span>

            <div className="flex items-end justify-between gap-6">
                <span
                    className="tabular-nums"
                    style={{
                        fontSize: "clamp(60px,11vw,150px)",
                        lineHeight: 0.8,
                        letterSpacing: "-0.04em",
                        fontWeight: 300,
                        color: "#2c2420",
                    }}
                >
                    {pct}%
                </span>
                <span
                    className="font-mono uppercase hidden sm:block"
                    style={{ fontSize: 11, letterSpacing: "0.08em", color: "#8a7e74" }}
                >
                    LIVV Creative Studio
                </span>
            </div>

            {/* 1px rule that fills with the counter */}
            <div style={{ position: "absolute", left: 0, bottom: 0, height: 1, width: "100%", background: "rgba(44,36,32,0.10)" }}>
                <div
                    style={{
                        height: 1,
                        width: `${pct}%`,
                        background: "#b8836e",
                        transition: "width 120ms linear",
                    }}
                />
            </div>
        </div>
    )
}
