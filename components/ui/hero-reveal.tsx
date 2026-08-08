"use client"

import { useEffect, useState, type ReactNode } from "react"
import { introWillRun } from "@/lib/intro-state"

/**
 * Opening move for the hero: two cream halves part from the centre, revealing
 * the page behind them.
 *
 * It animates an OVERLAY, never the hero itself. Two earlier versions clipped
 * the hero with clip-path — one waiting on an event from SiteIntro, one on a
 * timer — and both got stuck at inset(50%), leaving the homepage hero invisible.
 * Any remount re-closed it, and the safety timers could not win that race.
 *
 * Inverting it removes the whole failure class: if this component never mounts,
 * never animates, remounts, or throws, the worst case is that some cream panels
 * linger or never appear. The hero is plain page content and is always visible.
 *
 * Vocabulary from the reference the client sent: 1s on
 * cubic-bezier(.76,0,.24,1), parting from the middle.
 */

const OPEN_MS = 1000
const HARD_REMOVE_MS = 3200

/** Once the curtain has played for this page view it never plays again. */
let played = false

export function HeroReveal({ children }: { children: ReactNode }) {
    const [showCurtain, setShowCurtain] = useState(false)
    const [parted, setParted] = useState(false)

    useEffect(() => {
        if (played || !introWillRun()) return
        played = true

        const isSmall = window.matchMedia("(max-width: 767px)").matches
        // Start parting just as the intro panel finishes clearing, so the two
        // read as one continuous move.
        const partAt = isSmall ? 620 : 1050

        setShowCurtain(true)
        const t1 = window.setTimeout(() => setParted(true), partAt)
        const t2 = window.setTimeout(() => setShowCurtain(false), partAt + OPEN_MS + 100)
        const t3 = window.setTimeout(() => setShowCurtain(false), HARD_REMOVE_MS)

        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
            clearTimeout(t3)
            setShowCurtain(false)
        }
    }, [])

    return (
        <div className="relative">
            {children}

            {showCurtain && (
                <div aria-hidden data-livv-hero-curtain className="pointer-events-none fixed inset-0" style={{ zIndex: 8500 }}>
                    {["top", "bottom"].map((half) => (
                        <div
                            key={half}
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                height: "50.2%", // slight overlap so no hairline shows at the seam
                                [half]: 0,
                                background: "#FAF7F3",
                                transform: parted
                                    ? `translateY(${half === "top" ? "-100%" : "100%"})`
                                    : "translateY(0)",
                                transition: `transform ${OPEN_MS}ms cubic-bezier(.76,0,.24,1)`,
                                willChange: "transform",
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
