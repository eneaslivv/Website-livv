"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

import { ProductScreen } from "@/components/portfolio-preview/project-folder/product-screen"
import { projects } from "@/lib/marketplace-data"
import type { ScreenVariant } from "@/lib/portfolio-data"

const EASE = [0.22, 1, 0.36, 1] as const

/** Reuses the catalogue's slug -> screen mapping so both surfaces stay consistent. */
function screenForSlug(slug: string): ScreenVariant {
    return projects.find((p) => p.slug === slug)?.screen ?? "pos"
}

/**
 * Large product UI mock for the top of a product page.
 *
 * Drawn in markup rather than sourced from a screenshot: there is no captured
 * UI for several of these products, and a rendered mock keeps every product
 * page on one visual system instead of mixing real screenshots with stock art.
 */
export function ProductHeroVisual({ slug, accent }: { slug: string; accent: string }) {
    const reduced = useReducedMotion()
    const ref = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(0)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        setWidth(el.getBoundingClientRect().width)
        const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    const variant = screenForSlug(slug)

    return (
        <div className="relative">
            {/* Accent halo, keyed to the product's colour */}
            <div
                aria-hidden
                className="absolute -inset-x-8 -top-10 bottom-0 pointer-events-none"
                style={{
                    background: `radial-gradient(60% 55% at 50% 30%, ${accent}1f 0%, transparent 70%)`,
                }}
            />

            <motion.div
                ref={ref}
                className="relative rounded-xl overflow-hidden bg-white"
                style={{
                    border: "1px solid #E6E2D8",
                    boxShadow: "0 24px 64px rgba(9,9,11,0.10), 0 2px 8px rgba(9,9,11,0.04)",
                }}
                initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.15, ease: EASE }}
            >
                {/* Window chrome */}
                <div
                    className="flex items-center gap-2 px-4 py-2.5 border-b"
                    style={{ borderColor: "#EFEBE3", background: "#FCFBF8" }}
                >
                    <div className="flex gap-1.5">
                        {[0, 1, 2].map((d) => (
                            <div key={d} className="w-[7px] h-[7px] rounded-full" style={{ background: "#E2DCD2" }} />
                        ))}
                    </div>
                    <div className="flex-1 flex justify-center">
                        <span
                            className="px-2.5 py-[3px] rounded text-[9px] text-[#78736A] font-mono"
                            style={{ background: "#F2EEE7" }}
                        >
                            app.yourbrand.com
                        </span>
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: accent }}>
                        live
                    </span>
                </div>

                {width > 0 && <ProductScreen variant={variant} accent={accent} index={0} width={width} />}
            </motion.div>

            {/* Quiet annotations, matching the service pages */}
            <div className="mt-3 flex items-center gap-5">
                {["YOUR BRANDING", "YOUR DOMAIN", "WHITE-LABEL READY"].map((label, i) => (
                    <motion.span
                        key={label}
                        className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#78736A]/70"
                        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: reduced ? 0 : 0.5 + i * 0.1 }}
                    >
                        {label}
                    </motion.span>
                ))}
            </div>
        </div>
    )
}
