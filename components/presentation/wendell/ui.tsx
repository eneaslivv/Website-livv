"use client"

import { Fragment, useRef, type CSSProperties, type ReactNode } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion"

import type { IconName } from "./content"
import styles from "./proposal.module.css"

export const EASE = [0.22, 1, 0.36, 1] as const
export const SHELL = "mx-auto w-full max-w-[1240px] px-5 md:px-10"

/** «01 · The idea»: small uppercase label (brand guide 10.5). */
export function Label({ children, dark = false, className = "" }: { children: ReactNode; dark?: boolean; className?: string }) {
    return (
        <p
            className={`flex items-center gap-2.5 text-[10.5px] font-medium uppercase tracking-[0.2em] ${dark ? "text-[#ecd2cc]/70" : "text-[#79665f]"} ${className}`}
        >
            <span aria-hidden className={`h-px w-6 ${dark ? "bg-[#ecd2cc]/40" : "bg-[#79665f]/40"}`} />
            {children}
        </p>
    )
}

/**
 * Two-tone headline (brand guide 04.4): same face, the second part in muted on
 * paper and in blush on bordeaux. Each half rises into view word by word.
 */
export function TwoTone({
    a,
    b,
    dark = false,
    size = "lg",
    className = "",
    as: Tag = "h2",
}: {
    a: string
    b: string
    dark?: boolean
    size?: "lg" | "xl"
    className?: string
    as?: "h2" | "h3" | "p"
}) {
    const sizes =
        size === "xl"
            ? "text-[2.5rem] leading-[1.02] md:text-[4.5rem] lg:text-[5.5rem]"
            : "text-[2rem] leading-[1.06] md:text-[3.25rem] lg:text-[3.75rem]"
    return (
        <Tag className={`font-light tracking-[-0.045em] text-balance ${sizes} ${dark ? "text-[#fdfbf7]" : "text-[#440c15]"} ${className}`}>
            <RiseWords text={a} />{" "}
            <RiseWords text={b} delay={0.08 * a.split(" ").length} className={dark ? "text-[#ecd2cc]/75" : "text-[#79665f]"} />
        </Tag>
    )
}

/** Words that rise out of their own line when they scroll into view. */
export function RiseWords({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
    const reduced = useReducedMotion()
    const words = text.split(" ")
    return (
        <span className={className}>
            {words.map((word, i) => (
                <Fragment key={`${word}-${i}`}>
                    {/* The space lives outside the clipped box: inside an inline-block it collapses. */}
                    <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
                        <motion.span
                            className="inline-block"
                            initial={reduced ? false : { y: "105%" }}
                            whileInView={{ y: "0%" }}
                            viewport={{ once: true, margin: "-40px 0px" }}
                            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: EASE }}
                        >
                            {word}
                        </motion.span>
                    </span>
                    {i < words.length - 1 ? " " : null}
                </Fragment>
            ))}
        </span>
    )
}

/** Plain fade-and-rise for blocks. */
export function Reveal({
    children,
    delay = 0,
    y = 24,
    className = "",
    style,
}: {
    children: ReactNode
    delay?: number
    y?: number
    className?: string
    style?: CSSProperties
}) {
    const reduced = useReducedMotion()
    return (
        <motion.div
            className={className}
            style={style}
            initial={reduced ? false : { opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px 0px" }}
            transition={{ duration: 0.8, delay, ease: EASE }}
        >
            {children}
        </motion.div>
    )
}

/** A 1px rule that draws itself left to right as it enters the view. */
export function DrawRule({ dark = false, className = "", delay = 0 }: { dark?: boolean; className?: string; delay?: number }) {
    const reduced = useReducedMotion()
    return (
        <motion.div
            aria-hidden
            className={`h-px origin-left ${dark ? "bg-[#fdfbf7]/15" : "bg-[#ddd5cc]"} ${className}`}
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-40px 0px" }}
            transition={{ duration: 1.1, delay, ease: EASE }}
        />
    )
}

/**
 * Statement whose words light up as it scrolls through the viewport: each one
 * goes from faint to full ink while the paragraph crosses the middle third.
 */
export function ScrubText({ text, className = "", muted }: { text: string; className?: string; muted?: string }) {
    const ref = useRef<HTMLParagraphElement>(null)
    const reduced = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] })
    const words = text.split(" ")
    return (
        <p ref={ref} className={className}>
            {words.map((word, i) => (
                <ScrubWord
                    key={`${word}-${i}`}
                    progress={scrollYProgress}
                    range={[i / words.length, (i + 1) / words.length]}
                    still={!!reduced}
                    muted={muted}
                >
                    {word}
                    {i < words.length - 1 ? " " : ""}
                </ScrubWord>
            ))}
        </p>
    )
}

function ScrubWord({
    children,
    progress,
    range,
    still,
    muted,
}: {
    children: ReactNode
    progress: MotionValue<number>
    range: [number, number]
    still: boolean
    muted?: string
}) {
    const opacity = useTransform(progress, range, [0.16, 1])
    return (
        <motion.span style={{ opacity: still ? 1 : opacity, color: muted }} className="transition-none">
            {children}
        </motion.span>
    )
}

/** Small pill: chips, tags and billing badges. */
export function Chip({ children, tone = "light", className = "" }: { children: ReactNode; tone?: "light" | "dark" | "solid" | "ghost"; className?: string }) {
    const tones = {
        light: "border-[#ddd5cc] bg-[#fdfbf7] text-[#440c15]/80",
        ghost: "border-[#440c15]/15 bg-transparent text-[#440c15]/75",
        dark: "border-[#fdfbf7]/15 bg-[#fdfbf7]/[0.04] text-[#fdfbf7]/80",
        solid: "border-[#440c15] bg-[#440c15] text-[#fdfbf7]",
    }
    return (
        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11.5px] leading-5 tracking-[-0.005em] ${tones[tone]} ${className}`}>
            {children}
        </span>
    )
}

/** Line icons for the capability cards; they redraw themselves on hover. */
export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
    const common = {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.4,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        pathLength: 1,
    }
    return (
        <svg viewBox="0 0 32 32" aria-hidden className={`${styles.icon} ${className}`}>
            {name === "compass" && (
                <>
                    <circle cx="16" cy="16" r="12" {...common} />
                    <path d="M20.5 11.5 18 18l-6.5 2.5L14 14z" {...common} />
                </>
            )}
            {name === "layout" && (
                <>
                    <rect x="4" y="6" width="24" height="20" rx="3" {...common} />
                    <line x1="4" y1="11" x2="28" y2="11" {...common} />
                    <rect x="8" y="15" width="7" height="7" rx="1" {...common} />
                    <line x1="18" y1="16" x2="24" y2="16" {...common} />
                    <line x1="18" y1="20" x2="22" y2="20" {...common} />
                </>
            )}
            {name === "network" && (
                <>
                    <circle cx="16" cy="16" r="3.2" {...common} />
                    <circle cx="6.5" cy="8" r="2.4" {...common} />
                    <circle cx="25.5" cy="8" r="2.4" {...common} />
                    <circle cx="6.5" cy="24" r="2.4" {...common} />
                    <circle cx="25.5" cy="24" r="2.4" {...common} />
                    <path d="M8.5 9.6 13.6 14M23.5 9.6 18.4 14M8.5 22.4l5.1-4.4M23.5 22.4l-5.1-4.4" {...common} />
                </>
            )}
            {name === "aperture" && (
                <>
                    <circle cx="16" cy="16" r="12" {...common} />
                    <path d="M13.5 11.2v9.6l8-4.8z" {...common} />
                </>
            )}
            {name === "growth" && (
                <>
                    <polyline points="4 23 11 16 16 20 27 9" {...common} />
                    <polyline points="20 9 27 9 27 16" {...common} />
                    <line x1="4" y1="28" x2="28" y2="28" {...common} />
                </>
            )}
            {name === "loop" && (
                <>
                    <path d="M25 13A9.5 9.5 0 0 0 8.4 9.6L6 12" {...common} />
                    <polyline points="6 6 6 12 12 12" {...common} />
                    <path d="M7 19a9.5 9.5 0 0 0 16.6 3.4L26 20" {...common} />
                    <polyline points="26 26 26 20 20 20" {...common} />
                </>
            )}
        </svg>
    )
}

/** Arrow that nudges forward when its group is hovered. */
export function Arrow({ dir = "right", className = "" }: { dir?: "right" | "down" | "up-right"; className?: string }) {
    const moves = {
        right: "group-hover:translate-x-1",
        down: "group-hover:translate-y-1",
        "up-right": "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
    }
    const glyph = { right: "→", down: "↓", "up-right": "↗" }
    return (
        <span aria-hidden className={`inline-block transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transform-none ${moves[dir]} ${className}`}>
            {glyph[dir]}
        </span>
    )
}
