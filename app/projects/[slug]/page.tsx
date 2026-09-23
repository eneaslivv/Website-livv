"use client"

import { useParams } from "next/navigation"
import { Inter } from "next/font/google"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { RecommendedProjects } from "@/components/sections/recommended-projects"
import { usePortfolioItem } from "@/hooks/usePortfolioItem"
import { ProjectHeader } from "@/components/project-blocks/ProjectHeader"
import { BlockRenderer } from "@/components/project-blocks/BlockRenderer"
import { withPatternDefaults } from "@/lib/default-project-blocks"
import { EditorialCaseStudy } from "@/components/case-study/EditorialCaseStudy"
import { findEditorialDoc } from "@/types/case-study-editorial"

const inter = Inter({ subsets: ["latin"] })

function LoadingSkeleton() {
    return (
        <div className="max-w-6xl mx-auto px-6 pb-12 md:pb-20 animate-pulse">
            <div className="flex flex-col items-center text-center mb-16">
                <div className="flex gap-2 mb-8">
                    <div className="w-16 h-6 bg-[#E6E2D6] rounded-full" />
                    <div className="w-12 h-6 bg-[#E6E2D6] rounded-full" />
                </div>
                <div className="w-96 h-14 bg-[#E6E2D6] rounded-lg mb-6" />
                <div className="w-[500px] max-w-full h-6 bg-[#E6E2D6] rounded mb-2" />
                <div className="w-80 h-6 bg-[#E6E2D6] rounded" />
            </div>
            <div className="w-full aspect-video bg-[#E6E2D6] rounded-2xl mb-24" />
            <div className="grid grid-cols-12 gap-16 mb-24">
                <div className="col-span-8 space-y-4">
                    <div className="w-24 h-4 bg-[#E6E2D6] rounded" />
                    <div className="w-full h-8 bg-[#E6E2D6] rounded" />
                    <div className="w-full h-24 bg-[#E6E2D6] rounded" />
                </div>
                <div className="col-span-4 space-y-4">
                    <div className="w-full h-32 bg-[#E6E2D6] rounded" />
                </div>
            </div>
        </div>
    )
}

function NotFound() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-32 text-center">
            <h1 className="text-4xl font-light text-[#2A1818] mb-4">Project not found</h1>
            <p className="text-[#5A3E3E]/60 mb-8">The project you&apos;re looking for doesn&apos;t exist or hasn&apos;t been published yet.</p>
            <a href="/work" className="text-sm font-medium text-[#C4A35A] hover:underline">
                ← Back to all projects
            </a>
        </div>
    )
}

export default function ProjectPage() {
    const params = useParams()
    const slug = params?.slug as string
    const { item, loading, isPreview } = usePortfolioItem(slug)

    // La plantilla editorial es opt-in por proyecto: se activa con un bloque
    // `editorial` en la fila. Se lee de `content_blocks` en crudo porque
    // `withPatternDefaults` reconstruye la lista a partir de los tipos viejos
    // y descartaría el bloque nuevo.
    const editorial = item ? findEditorialDoc(item.content_blocks) : null
    const blocks = item && !editorial ? withPatternDefaults(item, item.content_blocks) : []

    return (
        <main
            className={`${
                editorial ? "bg-[#FFFFFA] text-[#14110F] selection:bg-[#FFBFD3]" : "bg-[#FAF8F3] text-[#2A1818] selection:bg-[#E6E2D6]"
            } min-h-screen ${inter.className}`}
        >
            <Navbar />

            {isPreview && (
                <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white text-center text-xs py-1 font-medium">
                    Preview Mode
                </div>
            )}

            {loading ? (
                <div className="pt-40 md:pt-52">
                    <div className="max-w-6xl mx-auto px-6 pb-12 md:pb-20">
                        <LoadingSkeleton />
                    </div>
                </div>
            ) : !item ? (
                <div className="pt-40 md:pt-52">
                    <div className="max-w-6xl mx-auto px-6 pb-12 md:pb-20">
                        <NotFound />
                    </div>
                </div>
            ) : editorial ? (
                <div className="pt-28 md:pt-36 pb-10">
                    <EditorialCaseStudy doc={editorial} />
                </div>
            ) : (
                <div className="pt-40 md:pt-52">
                    <div className="max-w-6xl mx-auto px-6 pb-12 md:pb-20">
                        <ProjectHeader item={item} />
                        {blocks.map((block, i) => (
                            <BlockRenderer key={i} block={block} poster={item.thumbnail} />
                        ))}
                    </div>
                </div>
            )}

            <RecommendedProjects />
            <FooterSection />
        </main>
    )
}
