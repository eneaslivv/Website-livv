'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

/**
 * EngagementTracker — fires `scroll_depth` events as the user scrolls past
 * each threshold. Once per page view per threshold.
 *
 * Why no `engagement_time` event here:
 *   GA4 already records `engagement_time_msec` as a parameter on every hit,
 *   so a custom event would be redundant noise in reports. If you ever need
 *   an explicit "user has been active for N seconds" trigger (e.g. for an
 *   audience), build it inside GTM with a Timer trigger instead of in code.
 *
 * Why no 90% threshold here:
 *   GA4 Enhanced Measurement covers the 90% scroll automatically. Custom
 *   thresholds focus on early/mid-funnel (25/50/75) so the GA4 default and
 *   our custom events don't double-fire at 90%.
 */
const SCROLL_THRESHOLDS = [25, 50, 75] as const

export function EngagementTracker() {
    useEffect(() => {
        const fired = new Set<number>()

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
                if (pct >= threshold && !fired.has(threshold)) {
                    fired.add(threshold)
                    trackEvent('scroll_depth', {
                        percent_scrolled: threshold,
                        page_path: window.location.pathname,
                    })
                }
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()

        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])

    return null
}
