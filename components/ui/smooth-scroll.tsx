"use client"

import { ReactNode, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

// Lazy-import the Lenis library inside the effect (below) instead of
// statically at module load. Vercel Speed Insights showed the home `/`
// scoring 31/100 on mobile (LCP 6.99s). Lenis adds ~40KB to the initial
// JS bundle; on touch devices the library is never instantiated (we
// bail out below), so shipping the bundle to mobile is pure dead weight.
// Lazy import defers it past mobile entry.
//
// We use a loose `any` for the ref because the type is only meaningful
// after the dynamic import resolves on desktop.
export function SmoothScroll({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const lenisRef = useRef<any>(null)

    // Create Lenis once
    useEffect(() => {
        // Disable smooth scroll on admin, portal routes, and touch devices
        if (pathname?.startsWith('/admin') || pathname?.startsWith('/portal')) return
        if (window.matchMedia("(pointer: coarse)").matches) return

        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual'
        }

        let cancelled = false
        let rafId = 0

        // Dynamic import — Lenis bundle only loads when actually needed
        // (desktop, non-admin route).
        import("lenis").then(({ default: Lenis }) => {
            if (cancelled) return

            const lenis = new Lenis({
                duration: 1.2,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: "vertical",
                gestureOrientation: "vertical",
                smoothWheel: true,
                wheelMultiplier: 1.0,
                touchMultiplier: 2.0,
            })

            lenisRef.current = lenis

            function raf(time: number) {
                lenis.raf(time)
                rafId = requestAnimationFrame(raf)
            }

            rafId = requestAnimationFrame(raf)
        })

        return () => {
            cancelled = true
            if (rafId) cancelAnimationFrame(rafId)
            if (lenisRef.current) {
                lenisRef.current.destroy()
                lenisRef.current = null
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Only run once on mount

    // Scroll to top on route change (without destroying Lenis)
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true })
        } else {
            window.scrollTo(0, 0)
        }
    }, [pathname])

    return <>{children}</>
}
