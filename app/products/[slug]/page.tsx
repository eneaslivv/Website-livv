"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useMotionTemplate, useSpring } from "framer-motion"
import { Zap, ShieldCheck, Users, Globe, BarChart3, Lock, ArrowUpRight } from "lucide-react"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { AnimatedBorders } from "@/components/ui/animated-borders"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })

// --- Data & Configuration ---

const fallbackProductData: Record<string, any> = {
    "payper": {
        name: "Payper",
        industry: "Hospitality",
        target: "Restaurant Chains & Hotels",
        headline: "Hospitality Operating System",
        subheadline: "The complete white-label infrastructure for modern hospitality. Manage orders, kitchen flows, and payments in one unified system.",
        stats: [
            { label: "Faster Table Turns", value: "30%" },
            { label: "Increase in Tip Size", value: "22%" },
            { label: "Labor Cost Reduction", value: "15%" },
        ],
        problem: [
            { title: "Fragmented Tools", desc: "Operations satisfy 10+ disconnected apps." },
            { title: "Zero Visibility", desc: "Blind spots in kitchen & inventory data." },
            { title: "Generic POS", desc: "Rigid systems that don't fit your workflow." },
            { title: "High Costs", desc: "Custom dev costs $50k+ and takes months." }
        ],
        solution: "Payper provides the full stack: QR ordering, Kitchen Display Systems (KDS), and Waiter Apps. Deployed instantly under your brand.",
        features: [
            { title: "Smart KDS", desc: "Automated routing for kitchen stations." },
            { title: "Waiter App", desc: "Table-side ordering & payments." },
            { title: "Inventory AI", desc: "Predictive stock management." },
            { title: "White-Label", desc: "Your logo, domain, and colors." },
            { title: "Payments", desc: "Integrated global payment gateways." },
            { title: "CRM", desc: "Guest profiles and loyalty built-in." }
        ],
        workflow: [
            { step: "01", title: "Brand Configuration", desc: "Upload your logo, set your primary colors, and connect your custom domain." },
            { step: "02", title: "Menu & Inventory", desc: "Import your products, set modifiers, and establish intelligent stock alerts." },
            { step: "03", title: "Deploy to Stores", desc: "Print QR codes, distribute waiter access, and mount KDS screens instantly." }
        ],
        pricing: {
            monthly: "$49",
            setup: "$499",
            includes: ["Full Source License option", "Custom Branding", "Unlimited Locations", "24/7 Priority Support"]
        },
        // Premium Livv accents
        accentColor: "#b8836e",
        gradient: "from-[#b8836e] to-[#8a7e74]",
        darkGradient: "from-[#2c2420] to-[#1a1714]"
    },
    "prtool": {
        name: "PRTool",
        industry: "Creator Economy",
        target: "PR agencies & talent managers",
        headline: "Partnership Operating System",
        subheadline: "A ready-to-use platform designed specifically for the creator economy, delivered as a white-label solution.",
        stats: [
            { label: "Campaign ROI", value: "3x" },
            { label: "Hours Saved/Wk", value: "18h" },
            { label: "Creator Retention", value: "45%" },
        ],
        problem: [
            { title: "Chaotic Spreadsheets", desc: "Manual campaign management scales poorly." },
            { title: "Payment Nightmares", desc: "Tracking payments for 100s of creators." },
            { title: "No Real ROI", desc: "Difficulty measuring actual partnership impact." },
            { title: "Fragmented Comms", desc: "Emails, DMs, and texts are unmanageable." }
        ],
        solution: "PRTool centralizes the entire collaboration lifecycle. From campaign briefing to automated payments and performance tracking.",
        features: [
            { title: "Campaign Dashboard", desc: "Track every deliverable in real-time." },
            { title: "Auto-Payouts", desc: "One-click payments to all influencers." },
            { title: "Digital Contracts", desc: "E-signatures built into the workflow." },
            { title: "ROI Analytics", desc: "Real performance data for brands." },
            { title: "Client Portals", desc: "Give brands view-only access." },
            { title: "White-Label", desc: "Fully branded for your agency." }
        ],
        workflow: [
            { step: "01", title: "Invite Creators", desc: "Send branded invites with contract terms embedded." },
            { step: "02", title: "Track Deliverables", desc: "Monitor posts, stories, and metrics automatically." },
            { step: "03", title: "One-Click Invoices", desc: "Payout all creators instantly when campaigns complete." }
        ],
        pricing: {
            monthly: "$29",
            setup: "$299",
            includes: ["Campaign manager tools", "Brand customization", "Secure payment flows", "Cloud hosting"]
        },
        accentColor: "#e8a87c",
        gradient: "from-[#e8a87c] to-[#c98d65]",
        darkGradient: "from-[#2c2420] to-[#1a1714]"
    },
    "legalflow": {
        name: "LegalFlow",
        industry: "Legal Tech",
        target: "Law firms & legal consultants",
        headline: "Legal Automation System",
        subheadline: "Automate the administrative burden of legal practices. Secure case management, document automation, and client collaboration.",
        stats: [
            { label: "Admin Time Saved", value: "40%" },
            { label: "Client Satisfaction", value: "98%" },
            { label: "Missed Deadlines", value: "0%" },
        ],
        problem: [
            { title: "Manual Filing", desc: "Hours wasted on document preparation." },
            { title: "Lost Deadlines", desc: "Inefficient case tracking risks malpractice." },
            { title: "Insecure Data", desc: "Generic cloud storage isn't compliant." },
            { title: "Slow Onboarding", desc: "Client intake takes days, not minutes." }
        ],
        solution: "LegalFlow provides a secure, structured environment for case management, document automation, and client collaboration.",
        features: [
            { title: "Case Timelines", desc: "Automated tracking of every deadline." },
            { title: "Secure Vault", desc: "Bank-grade encryption for all files." },
            { title: "Client Portal", desc: "Secure messaging and file sharing." },
            { title: "Auto-Intake", desc: "Digital forms populate case files." },
            { title: "Time Tracking", desc: "Integrated billing and invoicing." },
            { title: "White-Label", desc: "Your firm's branding front and center." }
        ],
        workflow: [
            { step: "01", title: "Digital Intake", desc: "Clients fill out secure, responsive forms online." },
            { step: "02", title: "Auto-Generate Docs", desc: "Templates auto-fill with client data instantly." },
            { step: "03", title: "Secure Collaboration", desc: "Clients review and sign strictly within the vault." }
        ],
        pricing: {
            monthly: "$59",
            setup: "$999",
            includes: ["End-to-end case workflows", "Advanced security features", "Onboarding support", "Custom domain setup"]
        },
        accentColor: "#845ec2",
        gradient: "from-[#845ec2] to-[#6a40a3]",
        darkGradient: "from-[#2c2420] to-[#1a1714]"
    },
    "default": {
        name: "Enterprise",
        industry: "SaaS",
        target: "Modern Enterprises",
        headline: "Enterprise Operating System",
        subheadline: "A scalable, white-label foundation for your next big product launch.",
        stats: [],
        problem: [],
        solution: "A complete system built for scale.",
        features: [],
        workflow: [],
        pricing: { monthly: "$99", setup: "$999", includes: [] },
        accentColor: "#b8836e",
        gradient: "from-[#b8836e] to-[#8a7e74]",
        darkGradient: "from-[#2c2420] to-[#1a1714]"
    }
}

// --- High-End Livv Aesthetic Components ---

function PerspectiveCard({ title, desc, index }: { title: string, desc: string, index: number, bgArray: string[] }) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth the tilt values using Framer Motion springs
    const rotateX = useSpring(useMotionValue(0), { damping: 40, stiffness: 200 })
    const rotateY = useSpring(useMotionValue(0), { damping: 40, stiffness: 200 })

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        const x = clientX - left
        const y = clientY - top
        mouseX.set(x)
        mouseY.set(y)

        // 3D tilt calculations
        const rx = ((y / height) - 0.5) * -15
        const ry = ((x / width) - 0.5) * 15

        rotateX.set(rx)
        rotateY.set(ry)
    }

    function onMouseLeave() {
        mouseX.set(0)
        mouseY.set(0)
        rotateX.set(0)
        rotateY.set(0)
    }

    return (
        <motion.div
            className="relative h-full min-h-[300px] rounded-[10px] p-8 flex flex-col justify-between overflow-hidden group border border-[#E6E2D8] bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] z-10"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
                perspective: 1000
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {/* Spotlight effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[10px] opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            600px circle at ${mouseX}px ${mouseY}px,
                            rgba(196, 163, 90, 0.08),
                            transparent 80%
                        )
                    `,
                }}
            />

            <div className="relative z-10 w-full mb-8 transform-gpu" style={{ transform: "translateZ(30px)" }}>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#5A3E3E]/60 mb-6 block">0{index + 1}</span>
                <h3 className="text-2xl font-medium tracking-tight text-[#2A1818] mb-4 group-hover:text-[#C4A35A] transition-colors duration-300">{title}</h3>
                <p className="text-[#5A3E3E]/80 text-[15px] font-light leading-relaxed">{desc}</p>
            </div>

            {/* Decorative line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C4A35A]/30 to-transparent" />

            {/* Bottom arrow CTA */}
            <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full border border-[#E6E2D8] flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-[#F5F5F0] transform-gpu" style={{ transform: "translateZ(40px)" }}>
                <ArrowUpRight className="w-5 h-5 text-[#2A1818]" strokeWidth={1.5} />
            </div>
        </motion.div>
    )
}

function MarqueeSection({ items }: { items: any[] }) {
    const problems = items.map((i: any) => i.title).join(" • ")
    return (
        <div className="w-full bg-[#1A1016] py-24 md:py-32 overflow-hidden border-y border-[#2C1A1A] relative flex flex-col items-center justify-center">
            {/* Background texture slightly visible */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

            <div className="mb-16 md:mb-24 text-center px-6 relative z-10 w-full max-w-4xl mx-auto">
                <span className="text-[10px] uppercase tracking-widest text-[#D199C2]/60 font-mono block mb-6">The Challenge</span>
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-light tracking-tight text-[#FDFBF7] leading-[1.1]">
                    Why the old way is <br />
                    <span className={`${playfair.className} italic text-[#D199C2]/80`}>fundamentally broken.</span>
                </h2>
            </div>

            <div className="relative w-full flex overflow-hidden">
                <div className="flex animate-marquee whitespace-nowrap items-center">
                    <h1 className="text-[8vw] leading-[0.8] font-light tracking-tighter text-[#2C1A1A] mr-8 flex items-center shrink-0 opacity-40">
                        {problems} <span className="ml-8 text-white/5">•</span>
                    </h1>
                    <h1 className="text-[8vw] leading-[0.8] font-light tracking-tighter text-[#2C1A1A] mr-8 flex items-center shrink-0 opacity-40">
                        {problems} <span className="ml-8 text-white/5">•</span>
                    </h1>
                    <h1 className="text-[8vw] leading-[0.8] font-light tracking-tighter text-[#2C1A1A] mr-8 flex items-center shrink-0 opacity-40">
                        {problems} <span className="ml-8 text-white/5">•</span>
                    </h1>
                </div>
            </div>

            {/* Feature cards popping up over the dark bg */}
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 md:mt-24 relative z-10">
                {items.map((item: any, i: number) => (
                    <div key={i} className="rounded-[10px] p-6 hover-lift border border-[#2C1A1A] bg-[#2A1818]/40 group backdrop-blur-md transition-colors duration-500 hover:bg-[#2A1818]/80 cursor-default">
                        <span className="text-[10px] font-mono text-[#D199C2]/40 block mb-4 group-hover:text-[#C4A35A] transition-colors">{`0${i + 1}`}</span>
                        <h4 className="text-[#FDFBF7] text-lg tracking-tight mb-2 font-medium">{item.title}</h4>
                        <p className="text-[#FDFBF7]/50 text-[13px] leading-relaxed font-light">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function ProductDetailPage() {
    const params = useParams()
    const slug = (params.slug as string)?.toLowerCase()
    const data = fallbackProductData[slug] || fallbackProductData[slug === "payper" ? "payper" : "default"]

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#09090B] overflow-x-hidden font-sans selection:bg-[#2A1818] selection:text-[#FDFBF7]">
            <Navbar isLoaded={isLoaded} />

            <main className="relative z-10 pt-40 pb-0">
                {/* 1. ARCHITECTURAL HERO */}
                <section className="px-6 md:px-12 max-w-[100rem] mx-auto mb-20 md:mb-32 relative">
                    <AnimatedBorders className="hidden md:block opacity-30" />

                    <div className="relative w-full h-[1px] mb-12">
                        <AnimatedBorders showLeft={false} showRight={false} showTop={true} fullWidth={true} className="opacity-30" />
                    </div>

                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-[#5A3E3E]/60 mb-20 md:mb-32 px-4 md:px-8">
                        <span>© {data.industry}</span>
                        <span>(SYS® — 01)</span>
                    </div>

                    <div className="flex flex-col mb-16 px-4 md:px-8">
                        <h1 className="text-[12vw] leading-[0.8] font-light tracking-tighter text-[#2A1818] flex flex-col">
                            {data.name.toLowerCase()}
                            <div className="flex items-center gap-4 md:gap-8 mt-2 md:mt-4">
                                <span className="text-gradient-gold">system</span>
                                <span className="text-[3vw] align-top text-[#C4A35A] mt-2 leading-none">©</span>
                            </div>
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4 md:px-8 mt-12 md:mt-24 items-end">
                        <p className="text-lg md:text-xl text-[#5A3E3E] max-w-lg font-light leading-relaxed">
                            {data.subheadline}
                        </p>
                        <div className="flex justify-start md:justify-end">
                            <button className="group relative px-8 py-3 bg-[#F5F5F0] rounded-full flex items-center space-x-3 transition-all duration-300 hover:bg-[#E8E4DC] hover:scale-105 border border-[#E8E4DC] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                                <span className="w-8 h-8 rounded-full bg-[#2A1818] flex items-center justify-center text-[#C4A35A] group-hover:bg-[#C4A35A] group-hover:text-[#2A1818] transition-colors duration-300">
                                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                                </span>
                                <span className="text-[#2A1818] text-sm font-medium tracking-wide uppercase">
                                    Start Integration
                                </span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* 2. THE CHALLENGE (DARK MARQUEE) */}
                <MarqueeSection items={data.problem} />

                {/* 3. SOLUTION & EXPERTISE (3D CARDS) */}
                <section className="py-24 md:py-40 px-6 md:px-12 bg-[#FDFBF7] relative">
                    <div className="max-w-[100rem] mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-20 md:mb-32 gap-8">
                            <div>
                                <h2 className="text-[10px] uppercase tracking-widest text-[#5A3E3E]/60 mb-6 font-mono">The Solution</h2>
                                <h3 className="text-4xl md:text-6xl lg:text-[5rem] tracking-tight leading-[1] text-[#2A1818] font-light max-w-3xl">
                                    Everything you need to <br />
                                    <span className="text-gradient-gold italic font-serif">scale your brand.</span>
                                </h3>
                            </div>
                            <p className="text-[#5A3E3E] max-w-md font-light leading-relaxed text-[15px] pb-2 text-balance">
                                {data.solution}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.features.map((feature: any, i: number) => (
                                <PerspectiveCard
                                    key={i}
                                    title={feature.title}
                                    desc={feature.desc}
                                    index={i}
                                    bgArray={["bg-white/40"]}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. WORKFLOW / HOW IT WORKS */}
                {data.workflow && data.workflow.length > 0 && (
                    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#F5F2EB] border-y border-[#E6E2D8] relative overflow-hidden">
                        {/* Background structural lines */}
                        <div className="absolute inset-x-0 top-1/2 h-px bg-[#E6E2D8] opacity-50 hidden md:block" />

                        <div className="max-w-[100rem] mx-auto relative z-10">
                            <div className="flex flex-col items-center text-center mb-20">
                                <h3 className="text-[10px] uppercase font-mono tracking-widest text-[#5A3E3E]/60 mb-6 font-semibold">Deployment</h3>
                                <h4 className="text-4xl md:text-6xl lg:text-[5rem] tracking-tight text-[#2A1818] font-light leading-[1.1]">
                                    Launch in days. <br />
                                    <span className="italic font-serif text-[#C4A35A]">Not months.</span>
                                </h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {data.workflow.map((step: any, i: number) => (
                                    <div key={i} className="bg-[#FDFBF7] p-8 md:p-12 rounded-[10px] border border-[#E6E2D8] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.04)] transition-shadow duration-500 hover:-translate-y-1 transform group relative">
                                        <div className="text-[10px] font-mono text-[#5A3E3E]/40 mb-12 flex justify-between items-center">
                                            <span>STEP</span>
                                            <span className="text-[#2A1818]">{step.step}</span>
                                        </div>
                                        <h5 className="text-2xl tracking-tight text-[#2A1818] mb-4 font-medium">{step.title}</h5>
                                        <p className="text-[#5A3E3E] text-[15px] font-light leading-relaxed">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* 5. PRICING & PARTNERSHIP (BRUTALIST) */}
                <section className="py-32 md:py-48 px-6 md:px-12 bg-[#FDFBF7] relative overflow-hidden">
                    <div className="max-w-[100rem] mx-auto relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                            <div>
                                <h3 className="text-[10px] uppercase font-mono tracking-widest text-[#5A3E3E]/60 mb-6 font-semibold">White-label License</h3>
                                <h4 className="text-5xl md:text-7xl lg:text-[6rem] tracking-tighter text-[#2A1818] font-light leading-[1] mb-8">
                                    Ready to <span className="italic font-serif text-gradient-gold">own it?</span>
                                </h4>
                                <p className="text-[#5A3E3E] text-lg lg:text-xl font-light leading-relaxed max-w-lg mb-12">
                                    Deploy your complete infrastructure under your own domain, branding, and terms in under 48 hours.
                                </p>

                                <ul className="space-y-4">
                                    {data.pricing.includes.map((item: string, i: number) => (
                                        <li key={i} className="flex items-center gap-3 text-[15px] text-[#5A3E3E] font-medium border-b border-[#E6E2D8] pb-4">
                                            <span className="text-[#C4A35A]">+</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col justify-end lg:pl-12">
                                <div className="p-8 md:p-12 lg:p-16 bg-white rounded-[10px] border border-[#E6E2D8] shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.05)] transition-shadow duration-700">
                                    <div className="mb-12">
                                        <p className="text-[10px] uppercase tracking-widest text-[#5A3E3E]/60 mb-2 font-mono font-semibold">Monthly Platform</p>
                                        <p className="text-6xl md:text-8xl tracking-tighter text-[#2A1818] font-light">{data.pricing.monthly}<span className="text-2xl text-[#5A3E3E]/60 font-serif italic ml-2">/mo</span></p>
                                    </div>
                                    <div className="mb-12">
                                        <p className="text-[10px] uppercase tracking-widest text-[#5A3E3E]/60 mb-2 font-mono font-semibold">One-time Setup</p>
                                        <p className="text-4xl md:text-5xl tracking-tighter text-[#2A1818] font-light">{data.pricing.setup}</p>
                                    </div>

                                    <button className="w-full group relative px-8 py-5 bg-[#2A1818] flex items-center justify-between transition-all duration-300 hover:bg-[#1a0f0f] border border-[#2A1818] rounded-[10px]">
                                        <span className="text-[#FDFBF7] text-sm font-medium tracking-wide uppercase text-center w-full relative z-10">
                                            Become a Partner
                                        </span>
                                        <div className="absolute right-6 w-8 h-8 rounded-full bg-[#C4A35A] flex items-center justify-center text-[#2A1818] group-hover:scale-110 group-hover:bg-white transition-all duration-300 z-10">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <FooterSection />
        </div>
    )
}
