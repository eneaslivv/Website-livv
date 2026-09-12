"use client"

import { useState, useCallback, useRef } from "react"
import { projects as allProducts } from "@/lib/marketplace-data"
import { motion } from "framer-motion"

import { AnimatedBorders } from "@/components/ui/animated-borders"
import { ProductIndex } from "@/components/sections/product-index"
import { ProductCollage } from "@/components/sections/product-collage"
import { PartnerFormModal } from "@/components/portfolio-preview/partner-form-modal"
import { GenerationProvider } from "@/contexts/generation-context"

const STEPS = [
    { n: "01", title: "Choose", copy: "Start from a product that already works." },
    { n: "02", title: "Customize", copy: "Your brand, your market, your workflows." },
    { n: "03", title: "Launch", copy: "Sell it under your own name." },
]

function MarketplaceContent({ id }: { id?: string }) {
    const [partnerProduct, setPartnerProduct] = useState<string | null>(null)
    const [isPartnerFormOpen, setIsPartnerFormOpen] = useState(false)
    const gridRef = useRef<HTMLDivElement>(null)

    const openPartnerForm = useCallback((product?: string) => {
        setPartnerProduct(product ?? null)
        setIsPartnerFormOpen(true)
    }, [])

    const scrollToProducts = useCallback(() => {
        gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, [])

    return (
        <section
            id={id}
            className="relative w-full py-12 md:py-24"
            style={{ backgroundColor: "var(--background)" }}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <AnimatedBorders className="hidden md:block" tone="light" />

                <div className="w-full max-w-[288px] sm:max-w-[600px] lg:max-w-[912px] xl:max-w-[1152px] mx-auto">
                    {/* ---------- Collage header ----------
                        Replaces the dark narrative block. The heading now lives
                        inside the collage as three floating words, with the real
                        h2 kept visually hidden inside ProductCollage. */}
                    <ProductCollage />

                    <div className="max-w-xl">
                        {/* The label sits with the copy it introduces. Above the
                            collage it had nothing to attach to and read as a
                            stray line floating over the composition. */}
                        <p className="text-[11px] uppercase tracking-[0.16em] text-[#b8836e] font-medium">
                            White-label software
                        </p>
                        <p className="mt-3 text-[15px] leading-relaxed text-[#6b625b]">
                            Pick a product that already works. Put your brand on it. Sell it as yours.
                        </p>

                        <div className="mt-7 flex flex-wrap items-center gap-3">
                            <button
                                onClick={scrollToProducts}
                                className="text-sm font-medium rounded-full px-5 py-2 hover:opacity-90 active:scale-[0.97] transition-opacity"
                                style={{ backgroundColor: "#1a1714", color: "#f5f0eb" }}
                            >
                                Explore the products
                            </button>
                            <button
                                onClick={() => openPartnerForm()}
                                className="group text-sm font-medium rounded-full border px-5 py-2 active:scale-[0.97] flex items-center gap-1.5"
                                style={{ color: "#2c2420", borderColor: "rgba(44,36,32,0.12)" }}
                            >
                                Become a reseller
                                <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.6}>
                                    <path d="M2.5 6h7M6.5 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* ---------- How it works ---------- */}
                    <div
                        className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-px rounded-2xl overflow-hidden"
                        style={{ backgroundColor: "rgba(44,36,32,0.07)" }}
                    >
                        {STEPS.map((step, i) => (
                            <motion.div
                                key={step.n}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                className="px-5 py-5"
                                style={{ backgroundColor: "var(--background)" }}
                            >
                                <span className="text-[11px] font-medium tabular-nums text-[#b8836e]">{step.n}</span>
                                <h3 className="mt-1.5 text-[15px] font-medium text-[#2c2420]">{step.title}</h3>
                                <p className="mt-1 text-[13px] leading-relaxed text-[#8a7e74]">{step.copy}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* ---------- Product index ---------- */}
                    <div ref={gridRef} className="mt-16 scroll-mt-28">
                        <div className="flex items-baseline justify-between gap-6 mb-6">
                            <p className="text-[10px] font-semibold uppercase text-[#8a7e74]" style={{ letterSpacing: "0.16em" }}>
                                The products
                            </p>
                            <p className="text-[12px]" style={{ color: "rgba(138,126,116,0.8)" }}>
                                White-label licence · custom branding included
                            </p>
                        </div>

                        <ProductIndex products={allProducts} />
                    </div>
                </div>
            </div>

            <PartnerFormModal
                isOpen={isPartnerFormOpen}
                onClose={() => setIsPartnerFormOpen(false)}
                product={partnerProduct ?? undefined}
            />
        </section>
    )
}

export function MarketplaceSection({ id }: { id?: string }) {
    return (
        <GenerationProvider>
            <MarketplaceContent id={id} />
        </GenerationProvider>
    )
}
