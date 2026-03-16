"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { usePortfolioItems } from "@/hooks/usePublicData"
import { useParams } from "next/navigation"

export function RecommendedProjects() {
    const containerRef = useRef<HTMLDivElement>(null)
    const params = useParams()
    const currentSlug = (params.slug as string)?.toLowerCase()

    const { data: portfolioItems, loading } = usePortfolioItems()

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])

    // Filter out current project and take up to 5
    const projects = (portfolioItems || [])
        .filter((item: any) => item.slug?.toLowerCase() !== currentSlug)
        .slice(0, 5)

    if (loading || projects.length === 0) return null

    return (
        <section ref={containerRef} className="py-32 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
                <div>
                    <div className="w-12 h-[1px] border-t border-dashed border-[#E8BC59] mb-8"></div>
                    <h2 className="text-4xl md:text-5xl font-light tracking-[-0.08em] text-[#09090B]">Our Projects</h2>
                </div>

                <div className="max-w-lg text-right md:text-right">
                    <p className="text-sm md:text-base text-[#78736A] leading-relaxed font-light">
                        Explore more work we've built in collaboration with startups, agencies, and teams.
                    </p>
                </div>
            </div>

            <div className="pl-6 md:pl-[calc((100vw-72rem)/2+1.5rem)]">
                <motion.div
                    className="flex gap-8 cursor-grab active:cursor-grabbing w-max"
                    drag="x"
                    dragConstraints={containerRef}
                    style={{ x }}
                >
                    {projects.map((project: any, i: number) => (
                        <Link key={project.id || i} href={`/projects/${project.slug}`} className="group relative w-[85vw] md:w-[600px] aspect-[4/3] md:aspect-[16/9] rounded-[2rem] overflow-hidden shadow-lg">
                            <div className="absolute inset-0 bg-[#09090B] transition-transform duration-700 group-hover:scale-105">
                                {project.image && (
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                                )}
                            </div>

                            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                                <div className="flex justify-end">
                                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>

                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    {project.category && (
                                        <span style={{ color: project.color || "#E8BC59" }} className="text-xs font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
                                    )}
                                    <h3 className="text-3xl md:text-5xl text-white font-light tracking-tight">{project.title}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
