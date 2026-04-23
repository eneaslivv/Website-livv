'use client'

import { useEffect } from 'react'
import { trackMicroConversion } from '@/lib/lead-ingest'

const SCROLL_THRESHOLDS = [25, 50, 75, 90] as const
const TIME_THRESHOLDS_MS = [15_000, 30_000, 60_000, 120_000] as const

export function EngagementTracker() {
    useEffect(() => {
        const firedScroll = new Set<number>()
        const firedTime = new Set<number>()
        let activeSeconds = 0
        let isActive = true
        let startedAt = Date.now()

        const computeScroll = () => {
            const doc = document.documentElement
            const scrollTop = window.scrollY || doc.scrollTop
            const scrollHeight = doc.scrollHeight - doc.clientHeight
            if (scrollHeight <= 0) return 0
            return Math.round((scrollTop / scrollHeight) * 100)
        }

        const onScroll = () => {
            const pct = computeScroll()
            for (const threshold of SCROLL_THRESHOLDS) {
                if (pct >= threshold && !firedScroll.has(threshold)) {
                    firedScroll.add(threshold)
                    trackMicroConversion('scroll_depth', {
                        percent_scrolled: threshold,
                        page_path: window.location.pathname,
                    })
                }
            }
        }

        const onVisibility = () => {
            isActive = document.visibilityState === 'visible'
            if (isActive) startedAt = Date.now()
        }

        const tick = () => {
            if (!isActive) return
            activeSeconds += 1
            const totalMs = activeSeconds * 1000
            for (const threshold of TIME_THRESHOLDS_MS) {
                if (totalMs >= threshold && !firedTime.has(threshold)) {
                    firedTime.add(threshold)
                    trackMicroConversion('engagement_time', {
                        engagement_seconds: Math.round(threshold / 1000),
                        page_path: window.location.pathname,
                    })
                    if (threshold === 30_000 && typeof (window as any).fbq === 'function') {
                        ;(window as any).fbq('trackCustom', 'EngagedVisitor', {
                            page_path: window.location.pathname,
                        })
                    }
                }
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        document.addEventListener('visibilitychange', onVisibility)
        const interval = window.setInterval(tick, 1000)
        onScroll()

        return () => {
            window.removeEventListener('scroll', onScroll)
            document.removeEventListener('visibilitychange', onVisibility)
            window.clearInterval(interval)
        }
    }, [])

    return null
}
