"use client"

import { useState, useCallback, useRef } from "react"
import { featuredProject, secondaryProjects, type Project } from "@/lib/marketplace-data"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

import { ProjectFolder } from "@/components/portfolio-preview/project-folder/index"
import { AnimatedBorders } from "@/components/ui/animated-borders"
import { PartnerFormModal } from "@/components/portfolio-preview/partner-form-modal"
import { WhitelabelShowcase } from "@/components/portfolio-preview/whitelabel-showcase"
import { GenerationProvider } from "@/contexts/generation-context"

const STEPS = [
    { n: "01", title: "Choose", copy: "Start from a proven product and a business model that already works." },
    { n: "02", title: "Customize", copy: "Adapt the branding, features and workflows to your market." },
    { n: "03", title: "Launch", copy: "Sell it under your name — to your clients or as a new business." },
]

function productHref(project: Project) {
    return `/products/${project.slug}`
}

function MarketplaceContent({ id }: { id?: string }) {
    const router = useRouter()
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

                    {/* ---------- Featured product ---------- */}
                    <div ref={gridRef} className="mt-16 scroll-mt-28">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="relative rounded-3xl overflow-hidden border border-[#2c2420]/[0.08]"
                        >
                            {/* Background plate */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: "url('/images/hero-bg.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    // Pulls the yellow back toward the warm neutral palette
                                    filter: "saturate(0.45) brightness(1.05)",
                                }}
                            />
                            {/* Scrim. Deliberately heavy and desaturating: the source image
                                is a saturated yellow abstract, and at lower opacity it read
                                as a photo competing with the copy. Here it survives only as
                                a faint warm texture. */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        "linear-gradient(108deg, rgba(250,247,243,0.985) 0%, rgba(250,247,243,0.97) 40%, rgba(248,243,237,0.93) 70%, rgba(245,238,231,0.88) 100%)",
                                }}
                            />
                            <div className="absolute inset-0" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }} />

                            <div className="relative grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-10 lg:gap-14 p-6 sm:p-9 lg:p-12 items-center">
                                <div>
                                    {/* Flat labels instead of a tinted pill with a dot. Wide
                                        positive tracking on small caps, which is what makes
                                        this kind of micro-label read as considered. */}
                                    <div className="flex items-center gap-3 text-[10.5px] font-semibold uppercase">
                                        <span style={{ color: featuredProject.accent, letterSpacing: "0.15em" }}>
                                            White-label ready
                                        </span>
                                        <span aria-hidden className="w-3 h-px bg-[#2c2420]/20" />
                                        <span className="text-[#8a7e74]" style={{ letterSpacing: "0.15em" }}>
                                            Featured product
                                        </span>
                                    </div>

                                    <h3
                                        className="mt-5 text-[clamp(1.6rem,3vw,2.1rem)] font-light leading-[1.14] text-[#2c2420]"
                                        style={{ letterSpacing: "-0.02em" }}
                                    >
                                        {featuredProject.title} — the operating system for bars, venues and events.
                                    </h3>
                                    <p className="mt-3 text-[14px] leading-relaxed text-[#5c534c] max-w-md">
                                        {featuredProject.description}
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-1.5">
                                        {featuredProject.modules.map((m) => (
                                            <span
                                                key={m}
                                                className="rounded-full border border-[#2c2420]/10 bg-white/60 px-2.5 py-1 text-[11px] text-[#5c534c]"
                                            >
                                                {m}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-6 flex flex-wrap items-center gap-3">
                                        <button
                                            onClick={() => router.push(productHref(featuredProject))}
                                            className="text-sm font-medium text-primary-foreground rounded-full bg-primary px-5 py-2 hover:opacity-90 transition-all duration-200 active:scale-[0.97]"
                                        >
                                            Explore {featuredProject.title}
                                        </button>
                                        <button
                                            onClick={() => openPartnerForm(featuredProject.title)}
                                            className="group text-sm font-medium text-[#2c2420] rounded-full border border-[#2c2420]/12 bg-white/50 px-5 py-2 hover:bg-white transition-all duration-200 active:scale-[0.97] flex items-center gap-1.5"
                                        >
                                            Resell {featuredProject.title}
                                            <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.6}>
                                                <path d="M2.5 6h7M6.5 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>

                                    <p className="mt-4 text-[12px] text-[#8a7e74]">
                                        White-label license from{" "}
                                        <span className="font-medium text-[#2c2420]/75">${featuredProject.licenseFrom}</span>/mo ·
                                        custom branding included
                                    </p>
                                </div>

                                <WhitelabelShowcase />
                            </div>
                        </motion.div>
                    </div>

                    {/* ---------- Remaining products ---------- */}
                    <div className="mt-6 grid gap-5 grid-cols-1 lg:grid-cols-2">
                        {secondaryProjects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.4, delay: Math.min(idx * 0.06, 0.24), ease: [0.22, 1, 0.36, 1] }}
                            >
                                <ProjectFolder
                                    project={project}
                                    index={idx}
                                    onClick={() => router.push(productHref(project))}
                                    onViewDemo={() => router.push(productHref(project))}
                                    onResell={() => openPartnerForm(project.title)}
                                />
                            </motion.div>
                        ))}
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
