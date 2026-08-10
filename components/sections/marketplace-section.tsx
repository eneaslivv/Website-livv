"use client"

import { useState, useCallback, useRef } from "react"
import { projects as allProducts } from "@/lib/marketplace-data"
import { motion } from "framer-motion"

import { AnimatedBorders } from "@/components/ui/animated-borders"
import { ProductIndex } from "@/components/sections/product-index"
import { PartnerFormModal } from "@/components/portfolio-preview/partner-form-modal"
import { GenerationProvider } from "@/contexts/generation-context"

const STEPS = [
    { n: "01", title: "Choose", copy: "Start from a proven product and a business model that already works." },
    { n: "02", title: "Customize", copy: "Adapt the branding, features and workflows to your market." },
    { n: "03", title: "Launch", copy: "Sell it under your name — to your clients or as a new business." },
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
        <section id={id} className="bg-background relative w-full py-12 md:py-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <AnimatedBorders className="hidden md:block" />

                <div className="w-full max-w-[288px] sm:max-w-[600px] lg:max-w-[912px] xl:max-w-[1152px] mx-auto">
                    {/* ---------- Narrative header ---------- */}
                    <div className="max-w-2xl">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-[#b8836e] font-medium animate-blur-in">
                            White-label software
                        </p>
                        <h2 className="mt-3 font-sans text-[clamp(1.9rem,4.4vw,3rem)] font-light leading-[1.12] tracking-tight text-[#2c2420] text-balance animate-blur-in">
                            Launch a software product{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b8836e] via-[#c9a48a] to-[#a0694f]">
                                without starting from zero.
                            </span>
                        </h2>
                        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground max-w-xl animate-blur-in-delay-1">
                            Choose a proven digital system, adapt it to your brand and market, and take it to
                            market as your own. We handle the product, the design and the technology behind it.
                        </p>

                        <div className="mt-7 flex flex-wrap items-center gap-3 animate-blur-in-delay-2">
                            <button
                                onClick={scrollToProducts}
                                className="text-sm font-medium text-primary-foreground rounded-full bg-primary px-5 py-2 hover:opacity-90 transition-all duration-200 active:scale-[0.97]"
                            >
                                Explore the products
                            </button>
                            <button
                                onClick={() => openPartnerForm()}
                                className="group text-sm font-medium text-[#2c2420] rounded-full border border-[#2c2420]/12 px-5 py-2 hover:bg-[#2c2420]/[0.04] transition-all duration-200 active:scale-[0.97] flex items-center gap-1.5"
                            >
                                Become a reseller
                                <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.6}>
                                    <path d="M2.5 6h7M6.5 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* ---------- How it works ---------- */}
                    <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-px rounded-2xl overflow-hidden bg-[#2c2420]/[0.07]">
                        {STEPS.map((step, i) => (
                            <motion.div
                                key={step.n}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                className="bg-background px-5 py-5"
                            >
                                <span className="text-[11px] font-medium tabular-nums text-[#b8836e]">{step.n}</span>
                                <h3 className="mt-1.5 text-[15px] font-medium text-[#2c2420]">{step.title}</h3>
                                <p className="mt-1 text-[13px] leading-relaxed text-[#8a7e74]">{step.copy}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* ---------- Product index ---------- */}
                    {/* Line-based, one row per product, with the art revealed on
                        hover. Replaces a featured block plus a card grid that both
                        leaned on rendered dashboard mockups — a lot of visual weight
                        carrying very little information. */}
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
                        className="mt-6 rounded-3xl border border-[#2c2420]/[0.08] px-6 sm:px-10 py-8 sm:py-10 flex flex-col md:flex-row md:items-center gap-6 justify-between"
                        style={{ background: "linear-gradient(120deg,#1a1714 0%,#2c2420 100%)" }}
                    >
                        <div className="max-w-lg">
                            <p className="text-[11px] uppercase tracking-[0.16em] text-[#c9a48a] font-medium">
                                Your brand. Our product engine.
                            </p>
                            <h3 className="mt-3 text-[clamp(1.4rem,2.6vw,1.9rem)] font-light leading-[1.2] tracking-tight text-[#f5f0eb]">
                                Build a new revenue stream.
                            </h3>
                            <p className="mt-2.5 text-[14px] leading-relaxed text-[#f5f0eb]/60">
                                Add complete digital products to your portfolio without building an internal
                                product team. We keep the platform running — you own the client relationship.
                            </p>
                        </div>
                        <button
                            onClick={() => openPartnerForm()}
                            className="group shrink-0 self-start md:self-auto text-sm font-medium text-[#1a1714] rounded-full bg-[#f5f0eb] px-6 py-2.5 hover:bg-white transition-all duration-200 active:scale-[0.97] flex items-center gap-1.5"
                        >
                            Apply to become a reseller
                            <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.8}>
                                <path d="M2.5 6h7M6.5 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </motion.div>
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
