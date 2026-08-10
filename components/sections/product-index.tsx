"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"

import type { Project } from "@/lib/marketplace-data"

const EASE = [0.22, 1, 0.36, 1] as const

/** The section's plate colour, as specified. */
export const PRODUCT_INDEX_BG = "#1e2a27"


/**
 * Dark grid of numbered product cells.
 *
 * Flat by default — number, name, description, nothing else. Hovering a cell
 * brings in its image as the cell background with a scrim and an arrow chip,
 * which is where all the visual interest lives. No mockups, no cards, no
 * shadows.
 *
 * On the colour change: the plate is #1e2a27, painted unconditionally, with no
 * entrance animation at all. Two earlier attempts gated it on whileInView — once
 * animating backgroundColor between tones, once animating opacity — and both
 * left the section stuck: wrong tone in one case, fully invisible in the other.
 * The colour change a visitor perceives is the dark plate arriving against the
 * cream page as they scroll, which needs no JavaScript to work. Animation here
 * buys very little and can cost the whole section.
 */
export function ProductIndex({ products }: { products: Project[] }) {
    const reduced = useReducedMotion()
    const [active, setActive] = useState<string | null>(null)

    return (
        <div
            className="relative overflow-hidden rounded-2xl"
            style={{ backgroundColor: PRODUCT_INDEX_BG }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2">
                {products.map((product, i) => {
                    const isActive = active === product.slug
                    const hasImage = Boolean(product.heroImage)

                    return (
                        <Link
                            key={product.slug}
                            href={`/products/${product.slug}`}
                            onMouseEnter={() => setActive(product.slug)}
                            onMouseLeave={() => setActive((s) => (s === product.slug ? null : s))}
                            onFocus={() => setActive(product.slug)}
                            onBlur={() => setActive((s) => (s === product.slug ? null : s))}
                            className="group relative flex min-h-[300px] md:min-h-[360px] flex-col justify-between overflow-hidden p-7 md:p-9 focus-visible:outline-none border-white/10 border-b md:[&:nth-child(odd)]:border-r"
                        >
                            {/* Hover art. Absent art keeps the cell flat, as intended. */}
                            {hasImage && (
                                <motion.div
                                    aria-hidden
                                    className="absolute inset-0 pointer-events-none"
                                    initial={false}
                                    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 1.06 }}
                                    transition={{ duration: reduced ? 0 : 0.8, ease: EASE }}
                                >
                                    <Image
                                        src={product.heroImage as string}
                                        alt=""
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: `linear-gradient(180deg, rgba(30,42,39,0.35) 0%, rgba(30,42,39,0.78) 55%, rgba(30,42,39,0.95) 100%)`,
                                        }}
                                    />
                                </motion.div>
                            )}

                            <div className="relative flex items-start justify-between gap-4">
                                <span className="text-[22px] md:text-[26px] font-light tabular-nums text-white/35">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="text-[9.5px] font-semibold uppercase text-white/40" style={{ letterSpacing: "0.14em" }}>
                                    {product.category}
                                </span>
                            </div>

                            <div className="relative flex items-end justify-between gap-6">
                                <div className="min-w-0">
                                    <h3 className="text-[clamp(1.4rem,2.4vw,1.85rem)] font-light tracking-tight text-[#f5f0eb] leading-none">
                                        {product.title}
                                    </h3>
                                    <p className="mt-3 text-[14px] font-light leading-relaxed text-white/60 max-w-sm">
                                        {product.outcome}
                                    </p>
                                    <p className="mt-4 text-[12px] text-white/45">
                                        From <span className="font-medium text-white/70">${product.licenseFrom}</span>/mo
                                    </p>
                                </div>

                                {/* Arrow chip, revealed with the art */}
                                <span
                                    aria-hidden
                                    className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#f5f0eb] text-[#1e2a27] opacity-0 translate-y-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.4}>
                                        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
