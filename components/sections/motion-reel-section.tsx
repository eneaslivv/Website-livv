"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import { MotionVideo } from "@/components/motion/motion-video"
import { AnimatedBorders } from "@/components/ui/animated-borders"
import { featuredMotionPiece, motionPieces, MOTION_CREDITS } from "@/lib/motion-portfolio"

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Motion & animation reel.
 *
 * `variant="featured"` is the home-page block: one piece large with the rest
 * as a strip and a link out. `variant="full"` is the whole reel, for /work.
 */
export function MotionReelSection({
    id,
    variant = "full",
}: {
    id?: string
    variant?: "full" | "featured"
}) {
    const isFeatured = variant === "featured"
    const rest = motionPieces.filter((p) => p.slug !== featuredMotionPiece.slug)

    return (
        <section id={id} className="w-full bg-[#FDFBF9] py-20 md:py-28 relative">
            {/* Site-wide dashed grid. This section was created without it, which
                is why the side rules visibly stopped here. */}
            <AnimatedBorders className="hidden md:block" />
            <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">
                            Motion &amp; animation
                        </p>
                        <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-light leading-[1.12] tracking-tight text-stone-900 text-balance max-w-xl">
                            {isFeatured ? "Work that moves." : "The reel."}
                        </h2>
                        <p className="mt-4 text-[15px] text-stone-500 font-light leading-relaxed max-w-lg">
                            Product films, 3D animation and brand motion, cut for vertical feeds.
                        </p>
                    </div>

                    <div className="shrink-0 md:text-right">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">
                            {MOTION_CREDITS.editorRole}
                        </p>
                        <p className="mt-1.5 text-[15px] text-stone-900 font-light tracking-tight">
                            {MOTION_CREDITS.editor}
                        </p>
                    </div>
                </div>
            </div>


            <div className="max-w-6xl mx-auto px-6 md:px-12">
                {isFeatured ? (
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,340px)_1fr] gap-10 lg:gap-14 items-start">
                        {/* Featured piece */}
                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.96 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, ease: EASE }}
                        >
                            <MotionVideo
                                src={featuredMotionPiece.src}
                                poster={featuredMotionPiece.poster}
                                title={featuredMotionPiece.title}
                                duration={featuredMotionPiece.duration}
                            />
                            <p className="mt-4 text-[10px] uppercase tracking-[0.14em] text-stone-400">
                                {featuredMotionPiece.category}
                            </p>
                            <h3 className="mt-1.5 text-lg font-light tracking-tight text-stone-900">
                                {featuredMotionPiece.title}
                            </h3>
                            <p className="mt-1.5 text-[14px] text-stone-500 font-light leading-relaxed">
                                {featuredMotionPiece.blurb}
                            </p>
                        </motion.div>

                        {/* The rest, as a compact strip */}
                        <div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
                                {rest.slice(0, 3).map((piece, i) => (
                                    <motion.div
                                        key={piece.slug}
                                        initial={{ opacity: 0, y: 48, scale: 0.94 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        viewport={{ once: true, margin: "-60px" }}
                                        /* 0.35s head start so the featured clip reads as
                                           leading, then 0.14s between each follower — the
                                           "one at a time" the sticky version was after,
                                           without pinning the page or hiding anything. */
                                        transition={{ duration: 0.65, delay: 0.35 + i * 0.14, ease: EASE }}
                                    >
                                        <MotionVideo
                                            src={piece.src}
                                            poster={piece.poster}
                                            title={piece.title}
                                            duration={piece.duration}
                                        />
                                        <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-stone-400 truncate">
                                            {piece.category}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            <Link
                                href="/work#motion"
                                className="group mt-8 inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-stone-900 border-b border-stone-900/20 pb-1 hover:border-stone-900 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-stone-400"
                            >
                                See the full reel
                                <svg
                                    aria-hidden
                                    className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={1.6}
                                >
                                    <path d="M2.5 6h7M6.5 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
                        {motionPieces.map((piece, i) => (
                            <motion.div
                                key={piece.slug}
                                initial={{ opacity: 0, y: 48, scale: 0.94 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.65, delay: i * 0.12, ease: EASE }}
                            >
                                <MotionVideo
                                    src={piece.src}
                                    poster={piece.poster}
                                    title={piece.title}
                                    duration={piece.duration}
                                />
                                <p className="mt-3.5 text-[10px] uppercase tracking-[0.14em] text-stone-400">
                                    {piece.category}
                                </p>
                                <h3 className="mt-1.5 text-[15px] md:text-base font-light tracking-tight text-stone-900 text-balance">
                                    {piece.title}
                                </h3>
                                <p className="mt-1.5 text-[13px] text-stone-500 font-light leading-relaxed">
                                    {piece.blurb}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
