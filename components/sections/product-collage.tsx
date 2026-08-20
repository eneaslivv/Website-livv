"use client"

import { useRef } from "react"
import {
    motion,
    useMotionValue,
    useSpring,
    useScroll,
    useTransform,
    useReducedMotion,
    type MotionValue,
} from "framer-motion"
import Image from "next/image"
import { ProductScreen, SCREEN_RATIO } from "@/components/portfolio-preview/project-folder/product-screen"
import type { ScreenVariant } from "@/lib/portfolio-data"
import { projects } from "@/lib/marketplace-data"

/**
 * Editorial collage that replaces the old dark narrative header.
 *
 * Everything floats on the page background: app screens, solid colour chips
 * and the three headline words sit on the same 3D stage and drift apart as
 * the pointer moves, so depth reads as motion rather than as drop shadows.
 *
 * Cards carry real product art where it exists and fall back to a screen drawn
 * in markup by ProductScreen where it does not, so the collage never ships a
 * broken image while art is still being produced.
 *
 * Nothing is rotated at rest and nothing carries a shadow at rest: both are
 * hover and pointer behaviour, which keeps the composition square to the page
 * the way the reference is.
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
/** Vertical drift across the scroll pass, at depth 1. */
const DRIFT = 26

/**
 * Module scope so useSpring gets one stable options reference for the life of
 * the page. Soft and slightly heavy: the collage should settle, not snap.
 */
const SPRING = { stiffness: 60, damping: 18, mass: 0.6 }

/** Rounded a touch, the way the reference squares are. */
const CHIP_RADIUS = 3

/**
 * Card aspect. The reference crops its photos to a wide letterbox, much wider
 * than the 1.6:1 a ProductScreen draws itself at, so the card clips the screen
 * to this ratio instead of matching it. One number to tune the whole row.
 */
const CARD_RATIO = 2.25

type Item = {
    key: string
    /** 0 = pinned to the page, 1.4 = floats furthest forward. */
    depth: number
    /** Percentage position inside the stage, wide layout. */
    left: number
    top: number
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
    /**
     * A colour chip glued to one corner of the card, corner touching corner,
     * the way the reference pins squares to its photos. It lives inside the
     * scaled wrapper so it stays glued at every breakpoint and through the
     * parallax, instead of being a loose piece that happens to sit nearby.
     */
    chip?: { color: string; size: number; corner: "tl" | "tr" | "bl" | "br" }
}

type ChipItem = Item & { kind: "chip"; color: string; size: number }

/**
 * Art comes from the product itself, so there is one place to add it.
 *
 * Setting `heroImage` on a product in lib/marketplace-data.ts lights up both
 * this card and the hover art in the index below. Until a product has one, the
 * card falls back to the screen ProductScreen draws in markup, so the collage
 * is never waiting on art to render.
 */
const heroFor = (slug: string) => projects.find((p) => p.slug === slug)?.heroImage

/** The five products, same ones the index below lists. */
const APPS: AppItem[] = [
    { kind: "app", key: "payper", title: "Payper", variant: "pos", accent: "#b8836e", index: 0, width: 208, depth: 0.9, left: 4, top: 17, mLeft: 4, mTop: 4 },
    { kind: "app", key: "prtool", title: "PRTool", variant: "campaigns", accent: "#c9a48a", index: 1, width: 176, depth: 0.5, left: 42, top: 4, mHide: true, chip: { color: "#EE7B2E", size: 14, corner: "bl" } },
    { kind: "app", key: "legalflow", title: "LegalFlow", variant: "cases", accent: "#8a7e74", index: 2, width: 190, depth: 1.2, left: 14, top: 57, mLeft: 22, mTop: 55 },
    { kind: "app", key: "registrar", title: "Registrar", variant: "finance", accent: "#a0694f", index: 3, width: 172, depth: 0.72, left: 60, top: 63, mHide: true, chip: { color: "#E8873A", size: 13, corner: "tr" } },
    { kind: "app", key: "pm-agent", title: "PM Agent", variant: "board", accent: "#b8836e", index: 4, width: 196, depth: 1.05, left: 71, top: 15, mLeft: 62, mTop: 26 },
]

/** Solid colour chips, matching the reference collage. */
const CHIPS: ChipItem[] = [
    { kind: "chip", key: "red", color: "#F5402C", size: 17, depth: 1.3, left: 34, top: 7, mLeft: 46, mTop: 2 },
    { kind: "chip", key: "purple", color: "#9B5CD6", size: 15, depth: 1.15, left: 93, top: 9, mHide: true },
    { kind: "chip", key: "blue", color: "#2F7DF0", size: 14, depth: 0.68, left: 69, top: 31, mLeft: 90, mTop: 12 },
    { kind: "chip", key: "black", color: "#191919", size: 18, depth: 1.35, left: 7, top: 68, mLeft: 3, mTop: 72 },
    { kind: "chip", key: "pink", color: "#F79CC8", size: 15, depth: 0.6, left: 33, top: 70, mLeft: 88, mTop: 62 },
    { kind: "chip", key: "cyan", color: "#74CBEF", size: 14, depth: 1.1, left: 23, top: 83, mHide: true },
    { kind: "chip", key: "green", color: "#55C24A", size: 15, depth: 0.8, left: 88, top: 76, mLeft: 74, mTop: 88 },
    { kind: "chip", key: "yellow", color: "#F0DE4A", size: 16, depth: 1.25, left: 55, top: 85, mHide: true },
]

/**
 * The headline, broken the way the reference breaks its own.
 *
 * Compact layout drops these: at 288px there is no gap wide enough to hold a
 * word without a card landing on it, so the heading is rendered normally above
 * the stage instead.
 */
const WORDS: (Item & { kind: "word"; text: string })[] = [
    { kind: "word", key: "w1", text: "Products", depth: 0.35, left: 28, top: 37, mHide: true },
    { kind: "word", key: "w2", text: "under", depth: 0.62, left: 60, top: 44, mHide: true },
    { kind: "word", key: "w3", text: "your name", depth: 0.28, left: 36, top: 75, mHide: true },
]

/**
 * Places a chip diagonally off one card corner, tucked in by BITE so the two
 * shapes visibly connect.
 *
 * A geometrically exact corner-to-corner touch reads as connected only while
 * both shapes are square. Once the chip has a radius, that single shared point
 * becomes a visible gap, so the chip overlaps slightly instead.
 */
const BITE = 3

function cornerOffset(
    corner: "tl" | "tr" | "bl" | "br",
    size: number,
    w: number,
    h: number,
): { left: number; top: number } {
    const out = size - BITE
    switch (corner) {
        case "tl":
            return { left: -out, top: -out }
        case "tr":
            return { left: w - BITE, top: -out }
        case "bl":
            return { left: -out, top: h - BITE }
        case "br":
            return { left: w - BITE, top: h - BITE }
    }
}

/**
 * Reveal order, top of the stage downwards.
 *
 * Derived from each piece's own position rather than hand-numbered, so moving a
 * piece in the composition moves it in the cascade too and the two can never
 * drift apart.
 */
const ALL_ITEMS: Item[] = [...CHIPS, ...APPS, ...WORDS]
const REVEAL_ORDER = new Map(
    ALL_ITEMS.slice()
        .sort((a, b) => a.top - b.top)
        .map((it, i) => [it.key, i] as const),
)
/** Share of the entering range the whole cascade occupies. */
const CASCADE_SPAN = 0.62
const REVEAL_STEP = CASCADE_SPAN / Math.max(1, ALL_ITEMS.length - 1)

/** Wraps one collage element in the shared parallax + 3D transform. */
function Floating({
    item,
    px,
    py,
    progress,
    entering,
    still,
    children,
}: {
    item: Item
    px: MotionValue<number>
    py: MotionValue<number>
    /** 0 when the stage is entering the viewport, 1 once it has left. */
    progress: MotionValue<number>
    /** 0 when the stage top is at the viewport bottom, 1 once it reaches the middle. */
    entering: MotionValue<number>
    still: boolean
    children: React.ReactNode
}) {
    const x = useTransform(px, (v) => (still ? 0 : v * SHIFT_X * item.depth))
    const pointerY = useTransform(py, (v) => (still ? 0 : v * SHIFT_Y * item.depth))
    const drift = useTransform(progress, [0, 1], still ? [0, 0] : [DRIFT * item.depth, -DRIFT * item.depth])
    const y = useTransform([pointerY, drift] as const, ([a, b]: number[]) => a + b)
    const rotateY = useTransform(px, (v) => (still ? 0 : v * TILT * item.depth))
    const rotateX = useTransform(py, (v) => (still ? 0 : -v * TILT * item.depth))

    /*
     * Reveal is driven by scroll, not by a mount animation, and it reads from a
     * different range than the exit does.
     *
     * Arrival is measured against the stage coming into view, which finishes by
     * the time its top reaches the middle of the screen. Tying it to the full
     * pass instead looked right on a section sitting low on the page and left
     * this one invisible on /products, where the collage is already on screen
     * at scroll zero and there is nothing above it to scroll through.
     *
     * The two combine by multiplying, so a piece is only visible once it has
     * arrived and before the section starts leaving.
     */
    const order = REVEAL_ORDER.get(item.key) ?? 0
    const inStart = order * REVEAL_STEP
    const arrival = useTransform(entering, [inStart, inStart + 0.2], still ? [1, 1] : [0, 1])
    const exit = useTransform(progress, [0.78, 0.97], still ? [1, 1] : [1, 0])
    const opacity = useTransform([arrival, exit] as const, ([a, b]: number[]) => a * b)

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
                    opacity,
                    z: still ? 0 : item.depth * 42,
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity",
                    /*
                     * Same anchor the scale uses. This wrapper's layout box stays
                     * the unscaled size of its content, so tilting around the
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

    const rawX = useMotionValue(0)
    const rawY = useMotionValue(0)
    const px = useSpring(rawX, SPRING)
    const py = useSpring(rawY, SPRING)

    /** Whole pass across the viewport: drives the drift and the exit fade. */
    const { scrollYProgress } = useScroll({
        target: stageRef,
        offset: ["start end", "end start"],
    })
    /** Just the arrival: stage top from the bottom of the screen to the middle. */
    const { scrollYProgress: entering } = useScroll({
        target: stageRef,
        offset: ["start end", "start center"],
    })

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
                    <Floating key={c.key} item={c} px={px} py={py} progress={scrollYProgress} entering={entering} still={still}>
                        {/*
                            Entry lives on the inner element, the scroll fade on
                            the wrapper. Two opacities that multiply, instead of
                            one property being written by two animations. This
                            section is the first thing on the page, so there is
                            no scroll before it and the entry is what staggers
                            the arrival; the scroll fade then governs leaving.
                        */}
                        <span
                            className="block"
                            style={{
                                width: c.size,
                                height: c.size,
                                backgroundColor: c.color,
                                borderRadius: CHIP_RADIUS,
                            }}
                        />
                    </Floating>
                ))}

                {APPS.map((a) => (
                    <Floating key={a.key} item={a} px={px} py={py} progress={scrollYProgress} entering={entering} still={still}>
                        {/* The scale is a CSS transform and framer writes the
                            transform of every motion node, so the two cannot
                            share an element. Entry animates opacity only, which
                            leaves the scale alone. */}
                        <div className="collage-scale">
                            <div>
                            <div className="relative">
                            <div
                                className="collage-card relative overflow-hidden rounded-[3px] bg-white"
                                style={{
                                    width: a.width,
                                    height: Math.round(a.width / CARD_RATIO),
                                }}
                            >
                                {heroFor(a.key) ? (
                                    <Image
                                        src={heroFor(a.key) as string}
                                        alt=""
                                        width={a.width}
                                        height={Math.round(a.width / CARD_RATIO)}
                                        sizes="220px"
                                        className="block h-full w-full object-cover"
                                    />
                                ) : (
                                    /* The drawn screen keeps its own 1.6:1 and
                                       gets cropped to the letterbox, pulled up
                                       so the crop lands on the content rather
                                       than on the window chrome at the top. */
                                    <div
                                        className="absolute inset-x-0"
                                        style={{
                                            top: -Math.round(
                                                (a.width / SCREEN_RATIO - a.width / CARD_RATIO) * 0.62,
                                            ),
                                        }}
                                    >
                                        <ProductScreen
                                            variant={a.variant}
                                            accent={a.accent}
                                            index={a.index}
                                            width={a.width}
                                        />
                                    </div>
                                )}
                            </div>
                            {a.chip && (
                                <span
                                    className="absolute block"
                                    style={{
                                        width: a.chip.size,
                                        height: a.chip.size,
                                        backgroundColor: a.chip.color,
                                        borderRadius: CHIP_RADIUS,
                                        ...cornerOffset(
                                            a.chip.corner,
                                            a.chip.size,
                                            a.width,
                                            Math.round(a.width / CARD_RATIO),
                                        ),
                                    }}
                                />
                            )}
                            </div>
                            </div>
                        </div>
                    </Floating>
                ))}

                {WORDS.map((w) => (
                    <Floating key={w.key} item={w} px={px} py={py} progress={scrollYProgress} entering={entering} still={still}>
                        <span
                            className="block whitespace-nowrap font-sans font-light tracking-tight text-[#2c2420] text-[clamp(1.15rem,3.2vw,2.1rem)]"
                        >
                            {w.text}
                        </span>
                    </Floating>
                ))}
            </div>
        </div>
    )
}
