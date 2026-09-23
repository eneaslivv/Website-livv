"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"

import type { Project } from "@/lib/marketplace-data"

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Grid of numbered product cells on the page's light ground.
 *
 * Flat by default — number, name, description, price, hairline rules. Hovering
 * a cell brings in its image (when it has one) under a dark scrim and flips
 * the copy to cream so it stays legible; cells without art just show the arrow
 * chip.
 */
export function ProductIndex({ products }: { products: Project[] }) {
    const reduced = useReducedMotion()
    const [active, setActive] = useState<string | null>(null)

    return (
        <div className="relative overflow-hidden border-t border-[#2c2420]/10">
            <div className="grid grid-cols-1 md:grid-cols-2">
                {products.map((product, i) => {
                    const isActive = active === product.slug
                    const hasImage = Boolean(product.heroImage)
                    // Copy sits on the photograph only while its art is showing
                    const onArt = isActive && hasImage

                    return (
                        <Link
                            key={product.slug}
                            href={`/products/${product.slug}`}
                            onMouseEnter={() => setActive(product.slug)}
                            onMouseLeave={() => setActive((s) => (s === product.slug ? null : s))}
                            onFocus={() => setActive(product.slug)}
                            onBlur={() => setActive((s) => (s === product.slug ? null : s))}
                            className="group relative flex min-h-[240px] md:min-h-[360px] flex-col justify-between overflow-hidden p-7 md:p-9 focus-visible:outline-none border-[#2c2420]/10 border-b md:[&:nth-child(odd)]:border-r transition-colors duration-300 hover:bg-[#2c2420]/[0.02]"
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
                                    {/* Legibility without smothering the art: the top stays
                                        almost clear and a masked blur band sits under the copy. */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background:
                                                "linear-gradient(180deg, rgba(26,23,20,0.55) 0%, rgba(26,23,20,0.10) 26%, rgba(26,23,20,0.14) 46%, rgba(26,23,20,0.52) 78%, rgba(26,23,20,0.80) 100%)",
                                        }}
                                    />
                                    <div
                                        className="absolute inset-x-0 bottom-0 h-[62%]"
                                        style={{
                                            backdropFilter: "blur(16px) saturate(1.05)",
                                            WebkitBackdropFilter: "blur(16px) saturate(1.05)",
                                            // Feathers the blur upward so there is no visible seam
                                            maskImage: "linear-gradient(to top, #000 26%, transparent 100%)",
                                            WebkitMaskImage: "linear-gradient(to top, #000 26%, transparent 100%)",
                                        }}
                                    />
                                </motion.div>
                            )}

                            <div className="relative flex items-start justify-between gap-4">
                                <span className={`text-[22px] md:text-[26px] font-light tabular-nums transition-colors duration-500 ${onArt ? "text-white/55" : "text-[#2c2420]/30"}`}>
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span
                                    className={`text-[9.5px] font-semibold uppercase transition-colors duration-500 ${onArt ? "text-white/70" : "text-[#8a7e74]"}`}
                                    style={{ letterSpacing: "0.14em" }}
                                >
                                    {product.category}
                                </span>
                            </div>

                            <div className="relative flex items-end justify-between gap-6">
                                <div className="min-w-0">
                                    <h3 className={`text-[clamp(1.4rem,2.4vw,1.85rem)] font-light tracking-tight leading-none transition-colors duration-500 ${onArt ? "text-[#f5f0eb]" : "text-[#2c2420]"}`}>
                                        {product.title}
                                    </h3>
                                    <p className={`mt-3 text-[14px] font-light leading-relaxed max-w-sm transition-colors duration-500 ${onArt ? "text-white/75" : "text-[#6b625b]"}`}>
                                        {product.outcome}
                                    </p>
                                    <p className={`mt-4 text-[12px] transition-colors duration-500 ${onArt ? "text-white/60" : "text-[#8a7e74]"}`}>
                                        {product.licenseFrom != null ? (
                                            <>From <span className={`font-medium ${onArt ? "text-white/85" : "text-[#2c2420]/80"}`}>${product.licenseFrom}</span>/mo</>
                                        ) : "Pricing on request"}
                                    </p>
                                </div>

                                {/* Arrow chip, revealed on hover */}
                                <span
                                    aria-hidden
                                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl opacity-0 translate-y-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 ${onArt ? "bg-[#f5f0eb] text-[#1a1714]" : "bg-[#1a1714] text-[#f5f0eb]"}`}
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
