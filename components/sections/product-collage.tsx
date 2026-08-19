"use client"

import { useEffect, useRef, useState } from "react"
import {
    motion,
    useMotionValue,
    useSpring,
    useScroll,
    useTransform,
    useReducedMotion,
    type MotionValue,
} from "framer-motion"
import { ProductScreen } from "@/components/portfolio-preview/project-folder/product-screen"
import type { ScreenVariant } from "@/lib/portfolio-data"

/**
 * Editorial collage that replaces the old dark narrative header.
 *
 * Everything floats on the page background: app screens, solid colour chips
 * and the three headline words sit on the same 3D stage and drift apart as
 * the pointer moves, so depth reads as motion rather than as drop shadows.
 *
 * The screens are drawn in markup by ProductScreen, not photographed, so this
 * never ships a broken image and always shows the real products.
 *
 * Accessibility: the visual words are decorative duplicates. The real heading
 * is a single visually-hidden h2 so screen readers and crawlers get one clean
 * sentence instead of three floating fragments.
 */

/** Pointer travel in px at depth 1. Small on purpose: this is drift, not sliding. */
const SHIFT_X = 30
const SHIFT_Y = 24
/** Degrees of tilt at depth 1. */
const TILT = 5

/**
 * Module scope so useSpring gets one stable options reference for the life of
 * the page. Soft and slightly heavy: the collage should settle, not snap.
 */
const SPRING = { stiffness: 60, damping: 18, mass: 0.6 }

type Item = {
    key: string
    /** 0 = pinned to the page, 1.4 = floats furthest forward. */
    depth: number
    /** Percentage position inside the stage, wide layout. */
    left: number
    top: number
    rotate: number
    /**
     * Compact layout overrides. The wide composition needs roughly 900px to
     * breathe; on a phone the container is 288px, where the same percentages
     * push cards off the stage and straight over the headline. Below the
     * breakpoint the collage is rebuilt rather than scaled.
     */
    mLeft?: number
    mTop?: number
    /** Dropped entirely from the compact layout. */
    mHide?: boolean
}

type AppItem = Item & {
    kind: "app"
    title: string
    variant: ScreenVariant
    accent: string
    index: number
    /** Unscaled width handed to ProductScreen. */
    width: number
}

type ChipItem = Item & { kind: "chip"; color: string; size: number }

/** The five products, same ones the index below lists. */
const APPS: AppItem[] = [
    { kind: "app", key: "payper", title: "Payper", variant: "pos", accent: "#b8836e", index: 0, width: 208, depth: 0.9, left: 4, top: 17, rotate: -3.2, mLeft: 4, mTop: 4 },
    { kind: "app", key: "prtool", title: "PRTool", variant: "campaigns", accent: "#c9a48a", index: 1, width: 176, depth: 0.5, left: 42, top: 4, rotate: 2.6, mHide: true },
    { kind: "app", key: "legalflow", title: "LegalFlow", variant: "cases", accent: "#8a7e74", index: 2, width: 190, depth: 1.2, left: 14, top: 57, rotate: 2.1, mLeft: 22, mTop: 55 },
    { kind: "app", key: "registrar", title: "Registrar", variant: "finance", accent: "#a0694f", index: 3, width: 172, depth: 0.72, left: 60, top: 63, rotate: -2.4, mHide: true },
    { kind: "app", key: "pm-agent", title: "PM Agent", variant: "board", accent: "#b8836e", index: 4, width: 196, depth: 1.05, left: 74, top: 15, rotate: 3.4, mLeft: 62, mTop: 26 },
]

/** Solid colour chips, matching the reference collage. */
const CHIPS: ChipItem[] = [
    { kind: "chip", key: "red", color: "#F5402C", size: 17, depth: 1.3, left: 34, top: 7, rotate: 0, mLeft: 46, mTop: 2 },
    { kind: "chip", key: "orange", color: "#EE7B2E", size: 14, depth: 0.5, left: 37, top: 43, rotate: 0, mLeft: 8, mTop: 44 },
    { kind: "chip", key: "purple", color: "#A05BE0", size: 15, depth: 1.15, left: 93, top: 9, rotate: 0, mHide: true },
    { kind: "chip", key: "blue", color: "#2F7DF0", size: 14, depth: 0.68, left: 69, top: 31, rotate: 0, mLeft: 90, mTop: 12 },
    { kind: "chip", key: "black", color: "#191919", size: 18, depth: 1.35, left: 7, top: 68, rotate: 0, mLeft: 3, mTop: 72 },
    { kind: "chip", key: "pink", color: "#F79CC8", size: 15, depth: 0.6, left: 33, top: 70, rotate: 0, mLeft: 88, mTop: 62 },
    { kind: "chip", key: "cyan", color: "#74CBEF", size: 14, depth: 1.1, left: 23, top: 83, rotate: 0, mHide: true },
    { kind: "chip", key: "green", color: "#55C24A", size: 15, depth: 0.8, left: 88, top: 76, rotate: 0, mLeft: 74, mTop: 88 },
    { kind: "chip", key: "yellow", color: "#F0DE4A", size: 16, depth: 1.25, left: 55, top: 85, rotate: 0, mHide: true },
]

/**
 * The headline, broken the way the reference breaks its own.
 *
 * Compact layout drops these: at 288px there is no gap wide enough to hold a
 * word without a card landing on it, so the heading is rendered normally above
 * the stage instead.
 */
const WORDS: (Item & { kind: "word"; text: string })[] = [
    { kind: "word", key: "w1", text: "Products", depth: 0.35, left: 28, top: 37, rotate: 0, mHide: true },
    { kind: "word", key: "w2", text: "under", depth: 0.62, left: 60, top: 44, rotate: 0, mHide: true },
    { kind: "word", key: "w3", text: "your name", depth: 0.28, left: 36, top: 75, rotate: 0, mHide: true },
]

/** Wraps one collage element in the shared parallax + 3D transform. */
function Floating({
    item,
    px,
    py,
    scrollY,
    still,
    children,
}: {
    item: Item
    px: MotionValue<number>
    py: MotionValue<number>
    scrollY: MotionValue<number>
    still: boolean
    children: React.ReactNode
}) {
    const x = useTransform(px, (v) => (still ? 0 : v * SHIFT_X * item.depth))
    const pointerY = useTransform(py, (v) => (still ? 0 : v * SHIFT_Y * item.depth))
    const drift = useTransform(scrollY, (v) => (still ? 0 : v * item.depth))
    const y = useTransform([pointerY, drift] as const, ([a, b]: number[]) => a + b)
    const rotateY = useTransform(px, (v) => (still ? 0 : v * TILT * item.depth))
    const rotateX = useTransform(py, (v) => (still ? 0 : -v * TILT * item.depth))

    return (
        <motion.div
            className={`absolute collage-item${item.mHide ? " collage-wide-only" : ""}`}
            style={
                {
                    "--l": `${item.left}%`,
                    "--t": `${item.top}%`,
                    ...(item.mLeft !== undefined ? { "--ml": `${item.mLeft}%` } : {}),
                    ...(item.mTop !== undefined ? { "--mt": `${item.mTop}%` } : {}),
                    x,
                    y,
                    rotateX,
                    rotateY,
                    z: still ? 0 : item.depth * 42,
                    rotate: item.rotate,
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                    /*
                     * Same anchor the scale uses. This wrapper's layout box stays
                     * the unscaled size of its content, so rotating around the
                     * default centre swings the painted card away from where it
                     * was positioned and pushes it off the stage edge.
                     */
                    transformOrigin: "top left",
                } as unknown as React.CSSProperties
            }
        >
            {children}
        </motion.div>
    )
}

export function ProductCollage() {
    const stageRef = useRef<HTMLDivElement>(null)
    const reduce = useReducedMotion()
    const [ready, setReady] = useState(false)

    /** Gates the entry animation until after mount so nothing pops in on SSR. */
    useEffect(() => setReady(true), [])

    const rawX = useMotionValue(0)
    const rawY = useMotionValue(0)
    const px = useSpring(rawX, SPRING)
    const py = useSpring(rawY, SPRING)

    const { scrollYProgress } = useScroll({
        target: stageRef,
        offset: ["start end", "end start"],
    })
    /** Slow vertical drift across the whole scroll pass, scaled by depth. */
    const scrollDrift = useTransform(scrollYProgress, [0, 1], [26, -26])

    const still = Boolean(reduce)

    /** Mouse rather than pointer events, matching the parallax already in the hero. */
    function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (still) return
        const r = stageRef.current?.getBoundingClientRect()
        if (!r) return
        rawX.set((e.clientX - r.left) / r.width - 0.5)
        rawY.set((e.clientY - r.top) / r.height - 0.5)
    }

    function onMouseLeave() {
        rawX.set(0)
        rawY.set(0)
    }

    return (
        <div className="relative">
            {/*
                One clean sentence for assistive tech and crawlers. On the wide
                layout the visible words are decorative duplicates inside the
                stage; on compact the heading below is the visible one, so this
                stays hidden either way and the page never has two h2s.
            */}
            <h2 className="sr-only">Products under your name</h2>

            <p className="text-[11px] uppercase tracking-[0.16em] text-[#b8836e] font-medium">
                White-label software
            </p>

            {/* Visible headline for the compact layout, where there is no gap
                wide enough to float the words without a card landing on them. */}
            <p
                aria-hidden="true"
                className="sm:hidden mt-3 font-sans font-light tracking-tight text-[#2c2420] text-[clamp(1.9rem,9vw,2.4rem)] leading-[1.1]"
            >
                Products under your name
            </p>

            <div
                ref={stageRef}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                aria-hidden="true"
                className="relative mt-4 w-full h-[300px] sm:h-[440px] md:h-[520px] lg:h-[560px] select-none"
                style={{ perspective: 1100, perspectiveOrigin: "50% 45%" }}
            >
                {CHIPS.map((c) => (
                    <Floating key={c.key} item={c} px={px} py={py} scrollY={scrollDrift} still={still}>
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={ready ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 + c.depth * 0.14, ease: [0.22, 1, 0.36, 1] }}
                            className="block"
                            style={{ width: c.size, height: c.size, backgroundColor: c.color }}
                        />
                    </Floating>
                ))}

                {APPS.map((a) => (
                    <Floating key={a.key} item={a} px={px} py={py} scrollY={scrollDrift} still={still}>
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={ready ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.05 + a.depth * 0.16, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Plain element on purpose: the breakpoint scale is
                                a CSS transform, and every motion element in this
                                tree has its transform written by framer. Putting
                                them on the same node means one silently wins. */}
                            <div className="collage-scale">
                                <div
                                    className="collage-card overflow-hidden rounded-[5px] bg-white"
                                    style={{
                                        boxShadow:
                                            "0 1px 2px rgba(44,36,32,0.06), 0 18px 38px -22px rgba(44,36,32,0.42)",
                                    }}
                                >
                                    <ProductScreen
                                        variant={a.variant}
                                        accent={a.accent}
                                        index={a.index}
                                        width={a.width}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </Floating>
                ))}

                {WORDS.map((w, i) => (
                    <Floating key={w.key} item={w} px={px} py={py} scrollY={scrollDrift} still={still}>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={ready ? { opacity: 1 } : {}}
                            transition={{ duration: 0.7, delay: 0.24 + i * 0.1 }}
                            className="block whitespace-nowrap font-sans font-light tracking-tight text-[#2c2420] text-[clamp(1.15rem,3.2vw,2.1rem)]"
                        >
                            {w.text}
                        </motion.span>
                    </Floating>
                ))}
            </div>
        </div>
    )
}
