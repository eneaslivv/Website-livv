"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useReducedMotion } from "framer-motion"
import styles from "./work-header-dots.module.css"

// Share the approved motion without changing the PR Tool header.
const HeaderShader = dynamic(() => import("@/components/case-study/PRToolShader"), { ssr: false })

const ABOUT_PALETTE = ["#642531", "#974554", "#AC7479", "#713647"] as const

export function WorkHeaderDots({ variant = "default" }: { variant?: "default" | "about-hero" }) {
    const reducedMotion = useReducedMotion()
    const [mounted, setMounted] = useState(false)
    const [ready, setReady] = useState(false)
    const [unavailable, setUnavailable] = useState(false)
    useEffect(() => setMounted(true), [])
    const animate = mounted && reducedMotion === false && !unavailable
    const isAboutHero = variant === "about-hero"

    return (
        <div className={`${styles.background} ${isAboutHero ? styles.aboutHero : ""}`} aria-hidden="true" data-work-header-motion={animate && ready} data-dots-variant={variant}>
            <div className={styles.fallback} style={{ opacity: animate && ready ? 0 : 1 }} />
            {animate && (
                <HeaderShader
                    onReady={() => setReady(true)}
                    onUnavailable={() => setUnavailable(true)}
                    calm={isAboutHero}
                    palette={isAboutHero ? ABOUT_PALETTE : undefined}
                />
            )}
        </div>
    )
}
