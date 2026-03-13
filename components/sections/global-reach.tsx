"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"
import { AnimatedBorders } from "@/components/ui/animated-borders"
import { SectionReveal } from "@/components/ui/section-reveal"

export function GlobalReachSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<HTMLDivElement>(null)
    const isMapInView = useInView(mapRef, { once: true, amount: 0.3 })

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    // Smooth parallax for background elements
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -80])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 80])
    const smoothY1 = useSpring(y1, { stiffness: 40, damping: 20 })
    const smoothY2 = useSpring(y2, { stiffness: 40, damping: 20 })

    return (
        <SectionReveal>
            <section ref={sectionRef} className="py-24 md:py-36 px-6 overflow-hidden bg-[#FAFAFA] text-[#1a1a1a] relative group border-b border-[#1a1a1a]/5">
                <AnimatedBorders className="hidden md:block pointer-events-none opacity-20 absolute inset-0 z-0" />

                {/* Subtle light background texture */}
                <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto grid xl:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-center relative z-10">
                    {/* Left: Content */}
                    <div className="pr-0 xl:pr-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C18972] mb-8 border border-[#1a1a1a]/5 rounded-full px-4 py-1.5 bg-white shadow-sm"
                        >
                            <span className="relative flex w-2 h-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C18972] opacity-50"></span>
                                <span className="relative inline-flex rounded-full w-2 h-2 bg-[#C18972]"></span>
                            </span>
                            Global Operations
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#1a1a1a] mb-8"
                        >
                            From Buenos Aires<br />
                            <span className="font-serif italic text-[#C18972]">to the World.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            className="text-[#1a1a1a]/60 mb-12 leading-relaxed max-w-lg font-light text-lg tracking-wide"
                        >
                            We leverage world-class talent and a strategic time zone (GMT-3) to collaborate seamlessly with the Americas and Europe.
                        </motion.p>

                        <div className="flex flex-col gap-8">
                            {[
                                { num: "01", text: "Experts in asynchronous management." },
                                { num: "02", text: "Fluent English communication." },
                                { num: "03", text: "Cost efficiency without sacrificing seniority." }
                            ].map((item, i) => (
                                <motion.div
                                    key={item.num}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 + (i * 0.1) }}
                                    className="flex items-start gap-6 group/item cursor-default"
                                >
                                    <span className="font-mono text-xs font-medium text-[#C18972]/40 group-hover/item:text-[#C18972] transition-colors mt-1">
                                        {item.num}
                                    </span>
                                    <div className="w-px h-full min-h-[24px] bg-[#1a1a1a]/10 group-hover/item:bg-[#C18972]/50 transition-colors"></div>
                                    <span className="font-light tracking-wide text-[#1a1a1a]/70 group-hover/item:text-[#1a1a1a] transition-colors text-base">
                                        {item.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Ultra-Premium Dark Map Portal */}
                    <div ref={mapRef} className="relative h-[600px] w-full rounded-[2rem] bg-[#0A0A0A] p-8 flex items-center justify-center overflow-hidden group/map shadow-2xl ring-1 ring-white/10">

                        {/* Dark Deep Space Backgrounds effect */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(193,137,114,0.08)_0%,transparent_70%)]"></div>
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none opacity-50"></div>

                        {/* Parallax floating glows inside the portal */}
                        <motion.div style={{ y: smoothY1, x: smoothY2 }} className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-[#C18972]/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
                        <motion.div style={{ y: smoothY2, x: smoothY1 }} className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-[#C18972]/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

                        {/* Framer Motion SVG Connections - Flowing Energy Curves */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                {/* Glow Filter */}
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>

                                {/* Gradients for arcs */}
                                <linearGradient id="arcUSA" x1="40%" y1="80%" x2="25%" y2="25%">
                                    <stop offset="0%" stopColor="#C18972" stopOpacity="0.8"></stop>
                                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1"></stop>
                                </linearGradient>
                                <linearGradient id="arcEU" x1="40%" y1="80%" x2="80%" y2="20%">
                                    <stop offset="0%" stopColor="#C18972" stopOpacity="0.8"></stop>
                                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1"></stop>
                                </linearGradient>
                                <linearGradient id="arcCA" x1="40%" y1="80%" x2="15%" y2="15%">
                                    <stop offset="0%" stopColor="#C18972" stopOpacity="0.5"></stop>
                                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05"></stop>
                                </linearGradient>
                            </defs>

                            {/* Base ghostly paths */}
                            <path d="M 33 80 C 15 70, 15 40, 25 25" stroke="rgba(255,255,255,0.03)" fill="none" strokeWidth="0.2" />
                            <path d="M 33 80 C 10 70, 5 30, 15 15" stroke="rgba(255,255,255,0.02)" fill="none" strokeWidth="0.2" />
                            <path d="M 33 80 C 50 75, 70 45, 80 20" stroke="rgba(255,255,255,0.03)" fill="none" strokeWidth="0.2" />

                            {/* Glowing animated draw paths */}
                            <motion.path
                                d="M 33 80 C 15 70, 15 40, 25 25"
                                stroke="url(#arcUSA)"
                                fill="none"
                                strokeWidth="0.3"
                                filter="url(#glow)"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={isMapInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                                transition={{ duration: 2.5, ease: [0.33, 1, 0.68, 1], delay: 0.5 }}
                            />

                            <motion.path
                                d="M 33 80 C 10 70, 5 30, 15 15"
                                stroke="url(#arcCA)"
                                fill="none"
                                strokeWidth="0.2"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={isMapInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                                transition={{ duration: 3, ease: [0.33, 1, 0.68, 1], delay: 0.7 }}
                            />

                            <motion.path
                                d="M 33 80 C 50 75, 70 45, 80 20"
                                stroke="url(#arcEU)"
                                fill="none"
                                strokeWidth="0.3"
                                filter="url(#glow)"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={isMapInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                                transition={{ duration: 2.8, ease: [0.33, 1, 0.68, 1], delay: 0.6 }}
                            />

                            {/* Fluid Energy streams (Animated Dash Offsets) */}
                            {/* USA Energy */}
                            <motion.path
                                d="M 33 80 C 15 70, 15 40, 25 25"
                                stroke="#FFFFFF"
                                fill="none"
                                strokeWidth="0.4"
                                strokeDasharray="1 15"
                                strokeLinecap="round"
                                filter="url(#glow)"
                                initial={{ strokeDashoffset: 16, opacity: 0 }}
                                animate={isMapInView ? { strokeDashoffset: 0, opacity: [0, 1, 1] } : { strokeDashoffset: 16, opacity: 0 }}
                                transition={{
                                    strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
                                    opacity: { duration: 1, delay: 2 }
                                }}
                            />

                            {/* EU Energy */}
                            <motion.path
                                d="M 33 80 C 50 75, 70 45, 80 20"
                                stroke="#FFFFFF"
                                fill="none"
                                strokeWidth="0.4"
                                strokeDasharray="1 20"
                                strokeLinecap="round"
                                filter="url(#glow)"
                                initial={{ strokeDashoffset: 21, opacity: 0 }}
                                animate={isMapInView ? { strokeDashoffset: 0, opacity: [0, 1, 1] } : { strokeDashoffset: 21, opacity: 0 }}
                                transition={{
                                    strokeDashoffset: { duration: 2.5, repeat: Infinity, ease: "linear" },
                                    opacity: { duration: 1, delay: 2.2 }
                                }}
                            />
                        </svg>

                        {/* Source Node (B.A.) */}
                        <div className="absolute top-[80%] left-[33%] transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center">
                            {/* Cinematic glowing aura */}
                            <motion.div
                                className="absolute bg-[#C18972] rounded-full mix-blend-screen blur-md"
                                initial={{ width: 0, height: 0, opacity: 0 }}
                                animate={isMapInView ? { width: 60, height: 60, opacity: 0.4 } : { width: 0, height: 0, opacity: 0 }}
                                transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
                            />

                            {/* Core dot */}
                            <motion.div
                                className="w-3 h-3 bg-white rounded-full shadow-[0_0_30px_5px_#C18972] relative z-10"
                                initial={{ scale: 0 }}
                                animate={isMapInView ? { scale: 1 } : { scale: 0 }}
                                transition={{ duration: 1, type: "spring", stiffness: 200, damping: 15 }}
                            />

                            {/* Label */}
                            <motion.div
                                className="absolute top-6 whitespace-nowrap"
                                initial={{ opacity: 0, y: -5 }}
                                animate={isMapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <span className="text-[11px] font-bold tracking-[0.2em] text-[#C18972] drop-shadow-[0_0_10px_rgba(193,137,114,0.8)]">BUENOS AIRES</span>
                            </motion.div>
                        </div>

                        {/* Destination Nodes */}
                        <div className="absolute inset-0 pointer-events-auto z-20">
                            <DestinationNode top="25%" left="25%" label="New York" delay={1.2} isVisible={isMapInView} featured={true} />
                            <DestinationNode top="15%" left="15%" label="Toronto" delay={1.6} isVisible={isMapInView} />
                            <DestinationNode top="20%" left="80%" label="London" delay={1.4} isVisible={isMapInView} featured={true} />

                            {/* Unlabelled distant nodes */}
                            <div className="absolute top-[75%] left-[22%] w-1 h-1 bg-white/20 rounded-full blur-[1px]"></div>
                            <div className="absolute top-[68%] left-[38%] w-1.5 h-1.5 bg-[#C18972]/30 rounded-full blur-[1px]"></div>
                        </div>

                    </div>
                </div>
            </section>
        </SectionReveal>
    )
}

function DestinationNode({ top, left, label, delay, isVisible, featured = false }: { top: string, left: string, label: string, delay: number, isVisible: boolean, featured?: boolean }) {
    return (
        <motion.div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center cursor-pointer"
            style={{ top, left }}
            initial={{ scale: 0.8, opacity: 0, y: 10 }}
            animate={isVisible ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.8, opacity: 0, y: 10 }}
            transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* The Node Dot */}
            <div className={`relative flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-150`}>
                {featured && (
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-md animate-pulse"></div>
                )}
                <div className={`w-2 h-2 rounded-full relative z-10 ${featured ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'bg-white/40'}`}></div>
            </div>

            {/* The Glassmorphic Label */}
            <div className="mt-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
                <div className="px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] uppercase font-medium tracking-[0.1em] text-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.5)] whitespace-nowrap">
                    {label}
                </div>
            </div>
        </motion.div>
    )
}
