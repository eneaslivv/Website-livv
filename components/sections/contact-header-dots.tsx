"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useReducedMotion } from "framer-motion"
import styles from "./contact-header-dots.module.css"

const HeaderShader = dynamic(() => import("@/components/case-study/PRToolShader"), { ssr: false })
// Amber, copper and olive-gold from the original FLORA contact video.
const CONTACT_PALETTE = ["#D6A34C", "#C57E38", "#E8BC59", "#A7AA60"] as const

export function ContactHeaderDots() {
    const reducedMotion = useReducedMotion()
    const [mounted, setMounted] = useState(false)
    const [ready, setReady] = useState(false)
    const [unavailable, setUnavailable] = useState(false)
    useEffect(() => setMounted(true), [])
    const animate = mounted && reducedMotion === false && !unavailable

    return (
        <div className={styles.background} aria-hidden="true" data-contact-header-motion={animate && ready}>
            <div className={styles.fallback} style={{ opacity: animate && ready ? 0 : 1 }} />
            {animate && <HeaderShader palette={CONTACT_PALETTE} onReady={() => setReady(true)} onUnavailable={() => setUnavailable(true)} />}
        </div>
    )
}
