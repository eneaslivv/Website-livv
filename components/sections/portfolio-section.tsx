"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { AnimatedBorders } from "@/components/ui/animated-borders"
import { Playfair_Display } from "next/font/google"
import { useRouter } from "next/navigation"
import { RevealText } from "@/components/ui/reveal-text"
import Image from "next/image"
import { useFeaturedPortfolioItems } from "@/hooks/usePublicData"
import { PortfolioItem } from "@/types/livv-os"

const isVideoUrl = (url: string) => /\.(mp4|webm|mov)(\?|$)/i.test(url)

/** Derive the cover URL from media[] (if available) or fallback to image field */
function getCoverUrl(item: PortfolioItem): string | null {
    const cover = (item as any).media?.find((m: any) => m.is_cover)
    if (cover?.url) return cover.url
    if (item.image) return item.image
    const firstMedia = (item as any).media?.[0]
    return firstMedia?.url || null
}

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })

const FALLBACK_ITEMS: PortfolioItem[] = [
    {
        id: "1",
        title: "Internal Management Systems",
        subtitle: "Custom operational tools",
        image: "/images/internal-dashboard.png",
        slug: "internal-management",
        year: "2024",
        tech_tags: ["Development", "Operational Tools"],
        featured: true,
        display_order: 1,
    },
    {
        id: "2",
        title: "Paper",
        subtitle: "Venue & nightlife software",
        image: "/images/portfolio-2.jpg",
        slug: "paper",
        year: "2024",
        tech_tags: ["Product Strategy", "UI/UX"],
        featured: true,
        display_order: 2,
    },
    {
        id: "3",
        title: "SEO Blocks Generator",
        subtitle: "Programmatic SEO for Webflow",
        image: "/images/portfolio-3.jpg",
        slug: "seo-blocks",
        year: "2024",
        tech_tags: ["Webflow Development", "SEO"],
        featured: true,
        display_order: 3,
    },
    {
        id: "4",
        title: "Azqira",
        subtitle: "Digital Experience",
        image: "/images/project-mobile.png",
        slug: "azqira",
        year: "2024",
        tech_tags: ["UI/UX", "Development"],
        featured: true,
        display_order: 4,
    },
    {
        id: "5",
        title: "Pr Tool",
        subtitle: "Content Monetization",
        image: "/images/pr-tool.png",
        slug: "pr-tool",
        year: "2024",
        tech_tags: ["App development", "Integrations"],
        featured: true,
        display_order: 5,
    },
    {
        id: "6",
        title: "Sacoa Cashless",
        subtitle: "Design & Animations",
        image: "/images/sacoa-cashless.png",
        slug: "sacoa",
        year: "2024",
        tech_tags: ["Design", "Animations"],
        featured: true,
        display_order: 6,
    }
]

function PortfolioGrid() {
    const router = useRouter()
    const { data: dbItems, isPreview } = useFeaturedPortfolioItems()

    const displayedItems = ((dbItems.length > 0 ? dbItems : FALLBACK_ITEMS) as (PortfolioItem & { _is_draft?: boolean })[])
        .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))

    const handleCardClick = (link: string) => {
        router.push(link)
    }

    return (
        <div className="relative w-full px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] w-full">
                {displayedItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleCardClick(`/projects/${item.slug}`)}
                        onMouseEnter={(e) => { const v = e.currentTarget.querySelector('video'); v?.play() }}
                        onMouseLeave={(e) => { const v = e.currentTarget.querySelector('video'); if (v) { v.pause(); v.currentTime = 0 } }}
                        className="group/card relative w-full aspect-[3/2] rounded-[10px] overflow-hidden cursor-pointer border border-[#1a1a1a]/10 hover:border-[#F2D696]/50 transition-all duration-500"
                    >
                        {/* Cover Media */}
                        {(() => {
                            const coverUrl = getCoverUrl(item) || '/images/placeholder.jpg'
                            if (isVideoUrl(coverUrl)) {
                                return (
                                    <video
                                        src={coverUrl}
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        poster={item.thumbnail || undefined}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                                    />
                                )
                            }
                            return (
                                <Image
                                    src={coverUrl}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-1000 group-hover/card:scale-110"
                                    unoptimized={coverUrl.endsWith('.gif')}
                                />
                            )
                        })()}

                        {/* Gradient Blur Overlay (Softened) */}
                        <div
                            className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-700 flex flex-col justify-end p-6 md:p-8 backdrop-blur-[6px]"
                            style={{
                                maskImage: 'linear-gradient(to top, black 10%, transparent 60%)',
                                WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 60%)'
                            }}
                        >
                            {/* Bottom Content (Title & Subtitle) */}
                            <div className="translate-y-4 group-hover/card:translate-y-0 opacity-0 group-hover/card:opacity-100 transition-all duration-700 ease-out delay-100">
                                <span className="inline-block px-2 py-0.5 mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#E8BC59] bg-white/5 border border-white/10 rounded-sm">
                                    {item.subtitle}
                                </span>

                                <h3 className={`${playfair.className} text-xl md:text-3xl text-white font-medium leading-tight`}>
                                    {item.title}
                                </h3>
                            </div>
                        </div>

                        {/* Top Metadata (Discreet) */}
                        <div className="absolute inset-x-0 top-0 p-4 md:p-6 flex justify-between items-start opacity-0 group-hover/card:opacity-100 transition-all duration-500 translate-y-[-10px] group-hover/card:translate-y-0">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[8px] uppercase tracking-widest text-white/40">Perf.</span>
                                <span className="text-white text-[10px] font-light tracking-wide">{item.year}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 justify-end max-w-[120px]">
                                {(item.tech_tags || []).map((t: string, i: number) => (
                                    <span key={i} className="text-[8px] text-[#E8BC59]/80 border border-[#E8BC59]/20 px-1.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Subtle Border Glow */}
                        <div className="absolute inset-0 rounded-[10px] ring-1 ring-white/10 group-hover/card:ring-white/30 transition-all duration-500 pointer-events-none" />

                        {/* Draft Badge (preview mode only) */}
                        {isPreview && (item as any)._is_draft && (
                            <div className="absolute bottom-4 left-4 z-20 px-3 py-1 bg-amber-500/90 text-white text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-sm">
                                Draft
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export function PortfolioSection({ id }: { id?: string }) {
    return (
        <section id={id} className={`relative w-full text-slate-900 overflow-hidden`}>
            <div className="max-w-7xl mx-auto py-24 md:py-32 relative z-10">
                <AnimatedBorders className="hidden md:block" />

                {/* Section Header */}
                <div className="mx-6 md:mx-12 border-t border-dashed border-[#D1CDC2] relative z-10" />

                <div className="w-full pt-24 md:pt-32 flex flex-col md:flex-row justify-between items-center gap-8 mb-12 md:mb-16 px-10 md:px-24 relative z-10">
                    <div>
                        <h2 className="section-heading mb-4 md:mb-0">
                            <RevealText text="Our Projects" className="text-gradient-gold" />
                        </h2>
                    </div>

                    <div className="max-w-lg text-center md:text-right pb-2">
                        <p className="text-sm md:text-base text-[#5A3E3E]/70 leading-relaxed font-light">
                            Selected works that define our standard of excellence.
                        </p>
                    </div>
                </div>

                {/* Static Grid - "Grid de cuatro muy prolijo" */}
                <div className="w-full relative z-30">
                    <PortfolioGrid />
                </div>
            </div>
        </section>
    )
}
