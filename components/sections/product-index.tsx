"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"

import type { Project } from "@/lib/marketplace-data"

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Line-based product index.
 *
 * Replaces the previous card grid and its rendered dashboard mockups. Those
 * mockups read as generic AI filler and carried most of the section's visual
 * weight for very little information.
 *
 * Each product is a row separated by 1px rules. Hovering a row reveals a
 * background image behind it with a scrim, so the art does the work instead of
 * a fake UI.
 *
 * Two hover states, chosen per product by whether real art exists:
 *   - heroImage set   -> image + dark scrim, text inverts to light
 *   - heroImage unset -> soft accent wash, text stays dark
 * That way the section is shippable before the images arrive and upgrades one
 * product at a time as they land, with no layout change either way.
 */
export function ProductIndex({ products }: { products: Project[] }) {
    const reduced = useReducedMotion()
    const [active, setActive] = useState<string | null>(null)

    return (
        <ul className="border-t border-[#2c2420]/12">
            {products.map((product, i) => {
                const isActive = active === product.slug
                const hasImage = Boolean(product.heroImage)
                const inverted = isActive && hasImage

                return (
                    <li key={product.slug} className="border-b border-[#2c2420]/12">
                        <Link
                            href={`/products/${product.slug}`}
                            onMouseEnter={() => setActive(product.slug)}
                            onMouseLeave={() => setActive((s) => (s === product.slug ? null : s))}
                            onFocus={() => setActive(product.slug)}
                            onBlur={() => setActive((s) => (s === product.slug ? null : s))}
                            className="group relative block overflow-hidden focus-visible:outline-none"
                        >
                            {/* Hover backdrop */}
                            <div aria-hidden className="absolute inset-0 pointer-events-none">
                                {hasImage ? (
                                    <motion.div
                                        className="absolute inset-0"
                                        initial={false}
                                        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 1.05 }}
                                        transition={{ duration: reduced ? 0 : 0.7, ease: EASE }}
                                    >
                                        <Image
                                            src={product.heroImage as string}
                                            alt=""
                                            fill
                                            sizes="100vw"
                                            className="object-cover"
                                        />
                                        {/* Scrim: keeps the row legible over any photograph */}
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                background: `linear-gradient(90deg, rgba(26,23,20,0.92) 0%, rgba(26,23,20,0.72) 45%, ${product.accent}55 100%)`,
                                            }}
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        className="absolute inset-0"
                                        initial={false}
                                        animate={{ opacity: isActive ? 1 : 0 }}
                                        transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
                                        style={{
                                            background: `linear-gradient(90deg, ${product.accent}14 0%, ${product.accent}05 60%, transparent 100%)`,
                                        }}
                                    />
                                )}
                            </div>

                            <div className="relative flex items-baseline gap-4 sm:gap-6 py-6 sm:py-7">
                                <span
                                    className="text-[11px] font-medium tabular-nums shrink-0 w-6 transition-colors duration-500"
                                    style={{ color: inverted ? "rgba(245,240,235,0.55)" : "rgba(138,126,116,0.85)" }}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                        <h3
                                            className="text-[clamp(1.25rem,2.4vw,1.75rem)] font-light tracking-tight leading-none transition-colors duration-500"
                                            style={{ color: inverted ? "#f5f0eb" : "#2c2420" }}
                                        >
                                            {product.title}
                                        </h3>
                                        <span
                                            className="text-[9.5px] font-semibold uppercase transition-colors duration-500"
                                            style={{
                                                letterSpacing: "0.14em",
                                                color: inverted ? "rgba(245,240,235,0.6)" : "rgba(138,126,116,0.8)",
                                            }}
                                        >
                                            {product.category}
                                        </span>
                                    </div>

                                    <p
                                        className="mt-2 text-[14px] font-light leading-relaxed max-w-xl transition-colors duration-500"
                                        style={{ color: inverted ? "rgba(245,240,235,0.75)" : "#5c534c" }}
                                    >
                                        {product.outcome}
                                    </p>
                                </div>

                                <div className="hidden sm:flex items-baseline gap-6 shrink-0">
                                    <span
                                        className="text-[12px] whitespace-nowrap transition-colors duration-500"
                                        style={{ color: inverted ? "rgba(245,240,235,0.7)" : "rgba(138,126,116,0.9)" }}
                                    >
                                        From <span className="font-medium">${product.licenseFrom}</span>/mo
                                    </span>
                                    <span
                                        aria-hidden
                                        className="transition-transform duration-500 group-hover:translate-x-1"
                                        style={{ color: inverted ? "#f5f0eb" : "#2c2420" }}
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.2}>
                                            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            {/* Price on its own line where the row is too narrow for a column */}
                            <div className="relative sm:hidden pb-6 -mt-3">
                                <span
                                    className="text-[12px] transition-colors duration-500"
                                    style={{ color: inverted ? "rgba(245,240,235,0.7)" : "rgba(138,126,116,0.9)" }}
                                >
                                    From <span className="font-medium">${product.licenseFrom}</span>/mo
                                </span>
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
