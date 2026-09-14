"use client"

import { useState, useCallback, useRef } from "react"
import { projects as allProducts } from "@/lib/marketplace-data"
import { motion } from "framer-motion"

import { AnimatedBorders } from "@/components/ui/animated-borders"
import { ProductIndex } from "@/components/sections/product-index"
import { ProductSystem } from "@/components/sections/product-system"
import { PartnerFormModal } from "@/components/portfolio-preview/partner-form-modal"

/**
 * White-label products on the site's own light ground: header, the interactive
 * product system, then the catalogue and the reseller CTA. The only dark
 * surface is the system's stage, so it stays the focal point.
 *
 * This section used to flip the whole plate to #1e2a27 on scroll; that was
 * removed on purpose, together with the eyebrow and the three-step strip.
 */
export function MarketplaceSection({ id }: { id?: string }) {
    const [isPartnerFormOpen, setIsPartnerFormOpen] = useState(false)
    const gridRef = useRef<HTMLDivElement>(null)

    const scrollToProducts = useCallback(() => {
        gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, [])

    return (
        // Literal white, like the sections around it: var(--background) turns black
        // when next-themes follows a dark OS setting.
        <section id={id} className="relative w-full bg-white py-12 md:py-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <AnimatedBorders className="hidden md:block" />

                <div className="w-full sm:max-w-[600px] lg:max-w-[912px] xl:max-w-[1152px] mx-auto">
                    {/* ---------- Narrative header ---------- */}
                    <div className="max-w-2xl">
                        <h2 className="font-sans text-[clamp(1.9rem,4.4vw,3rem)] font-light leading-[1.12] tracking-tight text-balance text-[#2c2420] animate-blur-in">
                            Launch a software product{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b8836e] via-[#c9a48a] to-[#a0694f]">
                                without starting from zero.
                            </span>
                        </h2>
                        <p className="mt-4 text-[15px] leading-relaxed max-w-xl text-[#6b625b] animate-blur-in-delay-1">
                            Choose a proven digital system, adapt it to your brand and market, and take it to
                            market as your own. We handle the product, the design and the technology behind it.
                        </p>

                        <div className="mt-7 flex flex-wrap items-center gap-3 animate-blur-in-delay-2">
                            <button
                                onClick={scrollToProducts}
                                className="text-sm font-medium rounded-full px-5 py-2 bg-[#1a1714] text-[#f5f0eb] transition-opacity hover:opacity-90 active:scale-[0.97]"
                            >
                                Explore the products
                            </button>
                            <button
                                onClick={() => setIsPartnerFormOpen(true)}
                                className="group text-sm font-medium rounded-full border border-[#2c2420]/15 px-5 py-2 text-[#2c2420] transition-colors hover:border-[#2c2420]/30 active:scale-[0.97] flex items-center gap-1.5"
                            >
                                Become a reseller
                                <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.6}>
                                    <path d="M2.5 6h7M6.5 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* ---------- Product system ---------- */}
                    <div className="mt-14">
                        <ProductSystem products={allProducts} />
                    </div>

                    {/* ---------- Product index ---------- */}
                    <div ref={gridRef} className="mt-16 scroll-mt-28">
                        <div className="flex items-baseline justify-between gap-6 mb-6">
                            <p className="text-[10px] font-semibold uppercase text-[#8a7e74]" style={{ letterSpacing: "0.16em" }}>
                                The products
                            </p>
                            <p className="text-[12px] text-[#8a7e74]/80">
                                White-label licence · custom branding included
                            </p>
                        </div>

                        <ProductIndex products={allProducts} />
                    </div>

                    {/* ---------- Reseller CTA ---------- */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-12 border border-[#2c2420]/10 px-6 sm:px-10 py-8 sm:py-10 flex flex-col md:flex-row md:items-center gap-6 justify-between"
                    >
                        <div className="max-w-lg">
                            <h3 className="text-[clamp(1.4rem,2.6vw,1.9rem)] font-light leading-[1.2] tracking-tight text-[#2c2420]">
                                Build a new revenue stream.
                            </h3>
                            <p className="mt-2.5 text-[14px] leading-relaxed text-[#6b625b]">
                                Add complete digital products to your portfolio without building an internal
                                product team. We keep the platform running — you own the client relationship.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsPartnerFormOpen(true)}
                            className="group shrink-0 self-start md:self-auto text-sm font-medium rounded-full px-6 py-2.5 bg-[#1a1714] text-[#f5f0eb] transition-opacity hover:opacity-90 active:scale-[0.97] flex items-center gap-1.5"
                        >
                            Apply to become a reseller
                            <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.8}>
                                <path d="M2.5 6h7M6.5 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </div>

            <PartnerFormModal isOpen={isPartnerFormOpen} onClose={() => setIsPartnerFormOpen(false)} />
        </section>
    )
}
