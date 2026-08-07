"use client"

import { useRef } from "react"
import {
    motion,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    type MotionValue,
} from "framer-motion"

import { MotionVideo } from "@/components/motion/motion-video"
import type { MotionPiece } from "@/lib/motion-portfolio"

/**
 * Scroll-choreographed reel.
 *
 * A tall track with a sticky stage inside it. Scroll progress drives one
 * timeline: the featured clip opens alone and oversized, then contracts to its
 * slot while the remaining clips enter one at a time from the right.
 *
 * Deliberately NOT horizontal scroll-jacking — the page keeps its normal
 * vertical scroll and only the contents of the sticky stage are animated, so
 * scrollbars, keyboard paging and find-in-page all still behave.
 *
 * The caller is responsible for the reduced-motion / small-screen fallback;
 * this component assumes it is only mounted when choreography is wanted.
 */

const SPRING = { stiffness: 90, damping: 22, mass: 0.6 } as const

/** Each follower gets a slice of the timeline after the featured clip settles. */
function windowFor(index: number, count: number): [number, number] {
    const start = 0.3
    const end = 0.92
    const span = (end - start) / Math.max(count, 1)
    const from = start + span * index
    return [from, Math.min(from + span * 1.35, 1)]
}

function Follower({
    piece,
    index,
    count,
    progress,
}: {
    piece: MotionPiece
    index: number
    count: number
    progress: MotionValue<number>
}) {
    const [from, to] = windowFor(index, count)

    const opacity = useSpring(useTransform(progress, [from, to], [0, 1]), SPRING)
    const x = useSpring(useTransform(progress, [from, to], [70, 0]), SPRING)
    const scale = useSpring(useTransform(progress, [from, to], [0.9, 1]), SPRING)

    return (
        <motion.div style={{ opacity, x, scale }} className="w-[128px] lg:w-[152px] shrink-0">
            <MotionVideo
                src={piece.src}
                poster={piece.poster}
                title={piece.title}
                duration={piece.duration}
            />
            <p className="mt-3 text-[9px] uppercase tracking-[0.14em] text-stone-400 truncate">
                {piece.category}
            </p>
            <p className="mt-1 text-[12px] font-light tracking-tight text-stone-900 leading-snug line-clamp-2">
                {piece.title}
            </p>
        </motion.div>
    )
}

export function MotionReelScroll({
    featured,
    followers,
}: {
    featured: MotionPiece
    followers: MotionPiece[]
}) {
    const trackRef = useRef<HTMLDivElement>(null)
    const reduced = useReducedMotion()

    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ["start start", "end end"],
    })

    // The featured clip opens oversized and centred, then contracts into its slot.
    const featuredScale = useSpring(useTransform(scrollYProgress, [0, 0.32], [1.16, 1]), SPRING)
    const featuredX = useSpring(
        useTransform(scrollYProgress, [0, 0.32], ["22%", "0%"]),
        SPRING,
    )
    const captionOpacity = useSpring(useTransform(scrollYProgress, [0.22, 0.36], [0, 1]), SPRING)

    // Track length scales with how many clips have to enter, but stays short on
    // purpose. The reel sits after the main portfolio, so it must not hold the
    // page hostage: at 28vh per clip the pinned stretch ran 250vh and read as a
    // slog. 16vh per clip keeps the whole sequence inside ~180vh.
    const trackHeight = `${100 + followers.length * 16}vh`

    return (
        <div ref={trackRef} className="relative" style={{ height: reduced ? "auto" : trackHeight }}>
            <div className="sticky top-0 min-h-screen flex items-center overflow-hidden">
                <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-16">
                    <div className="flex items-start gap-6 lg:gap-10">
                        {/* Featured */}
                        <motion.div
                            style={{ scale: featuredScale, x: featuredX }}
                            className="w-[210px] lg:w-[250px] shrink-0 origin-center"
                        >
                            <MotionVideo
                                src={featured.src}
                                poster={featured.poster}
                                title={featured.title}
                                duration={featured.duration}
                                priority
                            />
                            <motion.div style={{ opacity: captionOpacity }}>
                                <p className="mt-4 text-[10px] uppercase tracking-[0.14em] text-stone-400">
                                    {featured.category}
                                </p>
                                <h3 className="mt-1.5 text-base lg:text-lg font-light tracking-tight text-stone-900">
                                    {featured.title}
                                </h3>
                                <p className="mt-1.5 text-[13px] text-stone-500 font-light leading-relaxed">
                                    {featured.blurb}
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Followers enter one at a time */}
                        <div className="flex items-start gap-4 lg:gap-6 overflow-hidden pt-1">
                            {followers.map((piece, i) => (
                                <Follower
                                    key={piece.slug}
                                    piece={piece}
                                    index={i}
                                    count={followers.length}
                                    progress={scrollYProgress}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
