"use client"

import { ReactNode, useEffect, useRef } from "react"
import Lenis from "lenis"
import { usePathname } from "next/navigation"

export function SmoothScroll({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const lenisRef = useRef<Lenis | null>(null)

    // Create Lenis once
    useEffect(() => {
        // Disable smooth scroll on admin, portal routes, and touch devices
        if (pathname?.startsWith('/admin') || pathname?.startsWith('/portal')) return
        if (window.matchMedia("(pointer: coarse)").matches) return

        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual'
        }

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
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
            lenisRef.current = null
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
