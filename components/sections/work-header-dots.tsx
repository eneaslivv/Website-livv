"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { useReducedMotion } from "framer-motion"
import styles from "./work-header-dots.module.css"

// Share the approved motion without changing the PR Tool header.
const HeaderShader = dynamic(() => import("@/components/case-study/PRToolShader"), { ssr: false })

export function WorkHeaderDots() {
    const reducedMotion = useReducedMotion()
    const [ready, setReady] = useState(false)
    const [unavailable, setUnavailable] = useState(false)
    const animate = reducedMotion === false && !unavailable

    return (
        <div className={styles.background} aria-hidden="true" data-work-header-motion={animate && ready}>
            <div className={styles.fallback} style={{ opacity: animate && ready ? 0 : 1 }} />
            {animate && (
                <HeaderShader onReady={() => setReady(true)} onUnavailable={() => setUnavailable(true)} />
            )}
        </div>
    )
}
