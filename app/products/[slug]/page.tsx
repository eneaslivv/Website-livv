"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useMotionTemplate, useSpring } from "framer-motion"
import { Zap, ShieldCheck, Users, Globe, BarChart3, Lock, ArrowUpRight } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { getProductFaqs } from "@/lib/product-faqs"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { AnimatedBorders } from "@/components/ui/animated-borders"
import { useProduct } from "@/hooks/useProduct"

// --- Data & Configuration ---

const fallbackProductData: Record<string, any> = {
    "payper": {
        name: "Payper",
        industry: "Hospitality",
        target: "Restaurant Chains & Hotels",
        headline: "The Operating System for Modern Hospitality",
        subheadline: "A unified platform for restaurants and hotels — from QR ordering to kitchen management and payments. Ready to launch under your brand.",
        stats: [
            { label: "Faster Table Turns", value: "30%" },
            { label: "Increase in Tip Size", value: "22%" },
            { label: "Labor Cost Reduction", value: "15%" },
        ],
        problem: [
            { title: "Too Many Tools", desc: "Your team juggles 10+ apps that don't talk to each other." },
            { title: "No Real-Time Data", desc: "Blind spots across kitchen, inventory, and service." },
            { title: "One-Size-Fits-All POS", desc: "Rigid systems that weren't built for your workflow." },
            { title: "Expensive Custom Dev", desc: "Building from scratch costs $50k+ and takes months." }
        ],
        solution: "One platform that covers QR ordering, kitchen displays, and waiter tools — deployed under your brand in days, not months.",
        features: [
            { title: "Kitchen Display", desc: "Orders routed automatically to the right station." },
            { title: "Waiter App", desc: "Take orders and process payments table-side." },
            { title: "Smart Inventory", desc: "Predictive alerts before you run out of stock." },
            { title: "Your Brand", desc: "Your logo, your domain, your colors — fully customizable." },
            { title: "Payments", desc: "Accept payments globally with built-in processing." },
            { title: "Guest Profiles", desc: "Loyalty programs and guest data, built in." }
        ],
        workflow: [
            { step: "01", title: "Configure Your Brand", desc: "Upload your logo, choose your colors, and connect your domain." },
            { step: "02", title: "Import Your Menu", desc: "Add your products, set modifiers, and turn on stock alerts." },
            { step: "03", title: "Go Live", desc: "Print QR codes, set up waiter access, and start serving." }
        ],
        pricing: {
            monthly: "$49",
            setup: "$499",
            includes: ["Full Source License option", "Custom Branding", "Unlimited Locations", "24/7 Priority Support"]
        },
        accentColor: "#b8836e",
        gradient: "from-[#b8836e] to-[#8a7e74]",
        darkGradient: "from-[#2c2420] to-[#1a1714]"
    },
    "prtool": {
        name: "PRTool",
        industry: "Creator Economy",
        target: "PR agencies & talent managers",
        headline: "The Platform for Creator Partnerships",
        subheadline: "Manage creator campaigns from briefing to payment — all in one branded platform built for agencies and talent managers.",
        stats: [
            { label: "Campaign ROI", value: "3x" },
            { label: "Hours Saved/Wk", value: "18h" },
            { label: "Creator Retention", value: "45%" },
        ],
        problem: [
            { title: "Spreadsheet Chaos", desc: "Campaign management in spreadsheets doesn't scale." },
            { title: "Payment Headaches", desc: "Tracking invoices and payouts across hundreds of creators." },
            { title: "Unclear ROI", desc: "No reliable way to measure what's actually working." },
            { title: "Scattered Communication", desc: "Conversations split across email, DMs, and messaging apps." }
        ],
        solution: "One workspace for the entire creator collaboration lifecycle — from campaign briefs to automated payouts and performance reports.",
        features: [
            { title: "Campaign Dashboard", desc: "See every deliverable and its status in real time." },
            { title: "Automated Payouts", desc: "Pay all creators in one click when a campaign wraps." },
            { title: "Digital Contracts", desc: "E-signatures built directly into the workflow." },
            { title: "Performance Analytics", desc: "Real data on what drove results for each brand." },
            { title: "Client Portals", desc: "Give brands secure, view-only access to campaigns." },
            { title: "Your Brand", desc: "Fully white-labeled for your agency." }
        ],
        workflow: [
            { step: "01", title: "Onboard Creators", desc: "Send branded invitations with contract terms included." },
            { step: "02", title: "Track Deliverables", desc: "Monitor posts, stories, and metrics automatically." },
            { step: "03", title: "Pay & Report", desc: "Process payouts and share performance reports instantly." }
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
        headline: "Case Management, Automated",
        subheadline: "Secure case management, document automation, and client collaboration — built for law firms that want to move faster.",
        stats: [
            { label: "Admin Time Saved", value: "40%" },
            { label: "Client Satisfaction", value: "98%" },
            { label: "Missed Deadlines", value: "0%" },
        ],
        problem: [
            { title: "Manual Paperwork", desc: "Hours lost preparing documents that could be automated." },
            { title: "Missed Deadlines", desc: "Poor case tracking puts your practice at risk." },
            { title: "Insecure Storage", desc: "Generic cloud tools don't meet compliance standards." },
            { title: "Slow Client Intake", desc: "Onboarding new clients takes days instead of minutes." }
        ],
        solution: "A secure, structured environment for managing cases, automating documents, and collaborating with clients — under your firm's brand.",
        features: [
            { title: "Case Timelines", desc: "Every deadline tracked and surfaced automatically." },
            { title: "Secure Vault", desc: "Bank-grade encryption for all documents and files." },
            { title: "Client Portal", desc: "Secure messaging and file sharing with clients." },
            { title: "Automated Intake", desc: "Digital forms that populate case files instantly." },
            { title: "Time & Billing", desc: "Track hours and generate invoices in one place." },
            { title: "Your Brand", desc: "Your firm's identity, front and center." }
        ],
        workflow: [
            { step: "01", title: "Digital Intake", desc: "Clients fill out secure forms online — no back and forth." },
            { step: "02", title: "Auto-Generate Docs", desc: "Templates fill themselves with client data." },
            { step: "03", title: "Collaborate Securely", desc: "Review, sign, and share — all within the vault." }
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
    "registrar": {
        name: "Registrar",
        industry: "Finance",
        target: "Freelancers, small businesses & accountants",
        headline: "Your Books, Kept by Voice",
        subheadline: "Log income and expenses by speaking. Registrar transcribes, categorises and files every movement, so the books stay current without anyone sitting down to update them.",
        stats: [],
        problem: [
            { title: "Receipts Pile Up", desc: "Expenses get logged weeks later, from memory, or never." },
            { title: "Spreadsheet Drift", desc: "Manual entry means typos, duplicates and broken formulas." },
            { title: "No Live Picture", desc: "You only learn how the month went once it is already over." },
            { title: "Accounting Friction", desc: "Month-end close starts with reconstructing what happened." }
        ],
        solution: "A voice-first ledger: speak a movement, and Registrar transcribes it, assigns a category and files it — under your brand, for your clients.",
        features: [
            { title: "Voice Capture", desc: "Say what you spent or earned. No forms, no fields." },
            { title: "Auto-Categorisation", desc: "Movements are classified as they are logged." },
            { title: "Live Balance", desc: "Income, expenses and net position, always current." },
            { title: "Reports & Export", desc: "Period reports and clean exports for your accountant." },
            { title: "Multi-Currency", desc: "Track more than one currency in the same ledger." },
            { title: "Your Brand", desc: "Your logo, your domain, your colours." }
        ],
        workflow: [
            { step: "01", title: "Speak the Movement", desc: "Open the app and say what came in or went out." },
            { step: "02", title: "It Files Itself", desc: "The entry is transcribed, categorised and stored." },
            { step: "03", title: "Close the Month", desc: "Export a reconciled period instead of rebuilding it." }
        ],
        pricing: {
            monthly: "$39",
            setup: "$999",
            includes: ["Voice capture in Spanish and English", "Custom branding", "Unlimited entries", "Data export and reporting"]
        },
        accentColor: "#00c9a7",
        gradient: "from-[#00c9a7] to-[#00937b]",
        darkGradient: "from-[#2c2420] to-[#1a1714]"
    },

    "pm-agent": {
        name: "PM Agent",
        industry: "AI Agent",
        target: "Agencies, studios & product teams",
        headline: "The Project Manager That Never Forgets",
        subheadline: "An AI agent that turns a goal into tasks, assigns owners, sets deadlines and chases the follow-ups — running inside your workflow, under your brand.",
        stats: [],
        problem: [
            { title: "Work Stalls Silently", desc: "Nobody notices a blocked task until the deadline passes." },
            { title: "Vague Requests", desc: "A goal arrives as a paragraph, not as assignable work." },
            { title: "Follow-Up Costs", desc: "Chasing status updates is a job nobody wants to own." },
            { title: "Tool Sprawl", desc: "Plans live in chat, docs and three different trackers." }
        ],
        solution: "An AI agent that reads the goal, breaks it into tasks with owners and dates, and keeps following up until each one closes — so project management stops depending on someone remembering.",
        features: [
            { title: "Goal Decomposition", desc: "Turns a written objective into a structured task list." },
            { title: "Owner Assignment", desc: "Routes each task to the right person with a due date." },
            { title: "Automatic Follow-Up", desc: "Chases open work without anyone writing the reminder." },
            { title: "Status Digest", desc: "A written summary of what moved, what stalled and why." },
            { title: "Workflow Integration", desc: "Runs alongside the tools your team already uses." },
            { title: "Your Brand", desc: "Deployed under your name, for your clients." }
        ],
        workflow: [
            { step: "01", title: "State the Goal", desc: "Describe the outcome in plain language." },
            { step: "02", title: "Agent Plans It", desc: "Tasks, owners and deadlines are generated and assigned." },
            { step: "03", title: "It Follows Up", desc: "The agent chases open items and reports what changed." }
        ],
        pricing: {
            monthly: "$19",
            setup: "$999",
            includes: ["AI task planning and assignment", "Automated follow-ups", "Custom branding", "Workflow integration support"]
        },
        accentColor: "#ff6f91",
        gradient: "from-[#ff6f91] to-[#c94e69]",
        darkGradient: "from-[#2c2420] to-[#1a1714]"
    },

    "default": {
        name: "Enterprise",
        industry: "SaaS",
        target: "Modern Enterprises",
        headline: "Your Product, Ready to Ship",
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

// --- Livv Aesthetic Components ---

function PerspectiveCard({ title, desc, index }: { title: string, desc: string, index: number, bgArray: string[] }) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const rotateX = useSpring(useMotionValue(0), { damping: 40, stiffness: 200 })
    const rotateY = useSpring(useMotionValue(0), { damping: 40, stiffness: 200 })

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        const x = clientX - left
        const y = clientY - top
        mouseX.set(x)
        mouseY.set(y)

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
                            rgba(232, 188, 89, 0.08),
                            transparent 80%
                        )
                    `,
                }}
            />

            <div className="relative z-10 w-full mb-8 transform-gpu" style={{ transform: "translateZ(30px)" }}>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#78736A]/60 mb-6 block">0{index + 1}</span>
                <h3 className="text-xl font-medium tracking-tight text-[#09090B] mb-4 group-hover:text-[#E8BC59] transition-colors duration-300">{title}</h3>
                <p className="text-[#78736A] text-sm font-light leading-relaxed">{desc}</p>
            </div>

            {/* Decorative line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E8BC59]/30 to-transparent" />

            {/* Bottom arrow CTA */}
            <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full border border-[#E6E2D8] flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white transform-gpu" style={{ transform: "translateZ(40px)" }}>
                <ArrowUpRight className="w-5 h-5 text-[#09090B]" strokeWidth={1.5} />
            </div>
        </motion.div>
    )
}

function MarqueeSection({ items }: { items: any[] }) {
    const problems = items.map((i: any) => i.title).join(" \u2022 ")
    return (
        <div className="w-full bg-[#1a1a1a] py-24 md:py-32 overflow-hidden border-y border-[#27272A] relative flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

            <div className="mb-12 md:mb-16 text-center px-6 relative z-10 w-full max-w-4xl mx-auto">
                <span className="text-[10px] uppercase tracking-widest text-[#E8BC59]/60 font-mono block mb-6">The Challenge</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.08em] text-[#FDFBF7] leading-[1.1]">
                    What&apos;s holding <span className="italic text-[#E8BC59]/80">you back.</span>
                </h2>
            </div>

            <div className="relative w-full flex overflow-hidden">
                <div className="flex animate-marquee whitespace-nowrap items-center">
                    <h1 className="text-[8vw] leading-[0.8] font-light tracking-tighter text-[#27272A] mr-8 flex items-center shrink-0 opacity-40">
                        {problems} <span className="ml-8 text-white/5">&bull;</span>
                    </h1>
                    <h1 className="text-[8vw] leading-[0.8] font-light tracking-tighter text-[#27272A] mr-8 flex items-center shrink-0 opacity-40">
                        {problems} <span className="ml-8 text-white/5">&bull;</span>
                    </h1>
                    <h1 className="text-[8vw] leading-[0.8] font-light tracking-tighter text-[#27272A] mr-8 flex items-center shrink-0 opacity-40">
                        {problems} <span className="ml-8 text-white/5">&bull;</span>
                    </h1>
                </div>
            </div>

            {/* Feature cards */}
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 md:mt-16 relative z-10">
                {items.map((item: any, i: number) => (
                    <div key={i} className="rounded-[10px] p-6 hover-lift border border-[#27272A] bg-white/5 group backdrop-blur-md transition-colors duration-500 hover:bg-white/10 cursor-default">
                        <span className="text-[10px] font-mono text-[#E8BC59]/40 block mb-4 group-hover:text-[#E8BC59] transition-colors">{`0${i + 1}`}</span>
                        <h4 className="text-[#FDFBF7] text-lg tracking-tight mb-2 font-medium">{item.title}</h4>
                        <p className="text-[#FDFBF7]/70 text-[13px] leading-relaxed font-light">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function ProductDetailPage() {
    const params = useParams()
    const slug = (params.slug as string)?.toLowerCase()
    const { product: dbProduct, isPreview } = useProduct(slug)
    const isDraft = isPreview && (dbProduct as any)?._is_draft

    // Use DB data if available, otherwise fallback to hardcoded
    const data = dbProduct
        ? {
            name: dbProduct.name,
            industry: dbProduct.industry || 'SaaS',
            target: dbProduct.target,
            headline: dbProduct.headline,
            subheadline: dbProduct.subheadline,
            stats: dbProduct.stats || [],
            problem: dbProduct.problems || [],
            solution: dbProduct.solution,
            features: dbProduct.features || [],
            workflow: dbProduct.workflow || [],
            pricing: dbProduct.pricing || { monthly: '$99', setup: '$999', includes: [] },
            accentColor: dbProduct.accent_color || '#b8836e',
            gradient: dbProduct.gradient || 'from-[#b8836e] to-[#8a7e74]',
            darkGradient: dbProduct.dark_gradient || 'from-[#2c2420] to-[#1a1714]',
        }
        : (fallbackProductData[slug] || fallbackProductData["default"])

    const [isLoaded, setIsLoaded] = useState(false)
    const router = useRouter()
    const faqs = getProductFaqs(slug)

    useEffect(() => {
        setIsLoaded(true)
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#09090B] overflow-x-hidden font-sans selection:bg-[#09090B] selection:text-[#FDFBF7]">
            <Navbar isLoaded={isLoaded} />

            <main className="relative z-10 pt-40 pb-0">
                {/* 1. HERO */}
                <section className="px-6 md:px-12 max-w-[100rem] mx-auto mb-16 md:mb-24 relative">
                    <AnimatedBorders className="hidden md:block opacity-30" />

                    <div className="flex flex-col gap-6 md:gap-8 px-4 md:px-8 mb-16">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] uppercase tracking-widest text-[#78736A]/60 font-mono">Product &middot; {data.industry}</span>
                            {isDraft && (
                                <span className="px-3 py-1 bg-amber-500/90 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                    Draft
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] font-light tracking-[-0.08em] text-[#09090B]">
                            {data.name}
                        </h1>

                        <h2 className="text-xl md:text-2xl font-light text-[#78736A] max-w-2xl leading-relaxed tracking-tight">
                            {data.headline}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4 md:px-8 items-end">
                        <p className="text-sm md:text-base text-[#78736A] max-w-lg font-light leading-relaxed">
                            {data.subheadline}
                        </p>
                        <div className="flex justify-start md:justify-end">
                            <button
                                onClick={() => router.push("/contact")}
                                className="group relative px-8 py-3 bg-white rounded-full flex items-center space-x-3 transition-all duration-300 hover:bg-zinc-50 hover:scale-105 border border-[#E6E2D8] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                            >
                                <span className="w-8 h-8 rounded-full bg-[#09090B] flex items-center justify-center text-[#E8BC59] group-hover:bg-[#E8BC59] group-hover:text-[#09090B] transition-colors duration-300">
                                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                                </span>
                                <span className="text-[#09090B] text-sm font-medium tracking-wide uppercase">
                                    Get Started
                                </span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* 2. THE CHALLENGE (DARK MARQUEE) — skipped when a product has no authored problems */}
                {data.problem && data.problem.length > 0 && <MarqueeSection items={data.problem} />}

                {/* 3. SOLUTION & FEATURES */}
                <section className={`py-24 md:py-40 px-6 md:px-12 bg-[#FDFBF7] relative ${data.features?.length ? "" : "hidden"}`}>
                    <div className="max-w-[100rem] mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-8">
                            <div>
                                <h2 className="text-[10px] uppercase tracking-widest text-[#78736A]/60 mb-6 font-mono">The Solution</h2>
                                <h3 className="text-3xl md:text-4xl lg:text-[40px] leading-[1.2] tracking-[-2.6px] text-[#09090B] font-light max-w-3xl">
                                    Built to solve <span className="text-gradient-gold italic">the whole problem.</span>
                                </h3>
                            </div>
                            <p className="text-[#78736A] max-w-md font-light leading-relaxed text-sm pb-2 text-balance">
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

                {/* 4. WORKFLOW */}
                {data.workflow && data.workflow.length > 0 && (
                    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#F5F2EB] border-y border-[#E6E2D8] relative overflow-hidden">
                        <div className="absolute inset-x-0 top-1/2 h-px bg-[#E6E2D8] opacity-50 hidden md:block" />

                        <div className="max-w-[100rem] mx-auto relative z-10">
                            <div className="flex flex-col items-center text-center mb-20">
                                <h3 className="text-[10px] uppercase font-mono tracking-widest text-[#78736A]/60 mb-6 font-semibold">How It Works</h3>
                                <h4 className="text-3xl md:text-4xl lg:text-[40px] font-light leading-[1.2] tracking-[-2.6px] text-[#09090B]">
                                    Live in days, <span className="italic text-[#E8BC59]">not months.</span>
                                </h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {data.workflow.map((step: any, i: number) => (
                                    <div key={i} className="bg-[#FDFBF7] p-8 md:p-12 rounded-[10px] border border-[#E6E2D8] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.04)] transition-shadow duration-500 hover:-translate-y-1 transform group relative">
                                        <div className="text-[10px] font-mono text-[#78736A]/40 mb-12 flex justify-between items-center">
                                            <span>STEP</span>
                                            <span className="text-[#09090B]">{step.step}</span>
                                        </div>
                                        <h5 className="text-xl tracking-tight text-[#09090B] mb-4 font-medium">{step.title}</h5>
                                        <p className="text-[#78736A] text-sm font-light leading-relaxed">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* 5. PRICING */}
                <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FDFBF7] relative overflow-hidden">
                    <div className="max-w-[100rem] mx-auto relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                            <div>
                                <h3 className="text-[10px] uppercase font-mono tracking-widest text-[#78736A]/60 mb-6 font-semibold">Pricing</h3>
                                <h4 className="text-3xl md:text-4xl lg:text-5xl tracking-[-0.08em] text-[#09090B] font-light leading-[1.1] mb-8">
                                    Ready to <span className="italic text-gradient-gold">launch?</span>
                                </h4>
                                <p className="text-[#78736A] text-sm md:text-base font-light leading-relaxed max-w-lg mb-12">
                                    Your own platform, your own domain, your own brand — deployed in under 48 hours.
                                </p>

                                <ul className="space-y-4">
                                    {data.pricing.includes.map((item: string, i: number) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-[#78736A] font-medium border-b border-[#E6E2D8] pb-4">
                                            <span className="text-[#E8BC59]">+</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col justify-end lg:pl-12">
                                <div className="p-8 md:p-12 lg:p-16 bg-white rounded-[10px] border border-[#E6E2D8] shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.05)] transition-shadow duration-700">
                                    <div className="mb-12">
                                        <p className="text-[10px] uppercase tracking-widest text-[#78736A]/60 mb-2 font-mono font-semibold">Monthly Platform</p>
                                        <p className="text-4xl md:text-5xl tracking-[-0.08em] text-[#09090B] font-light">{data.pricing.monthly}<span className="text-xl text-[#78736A]/60 italic ml-2">/mo</span></p>
                                    </div>
                                    <div className="mb-12">
                                        <p className="text-[10px] uppercase tracking-widest text-[#78736A]/60 mb-2 font-mono font-semibold">One-time Setup</p>
                                        <p className="text-2xl md:text-3xl tracking-[-0.08em] text-[#09090B] font-light">{data.pricing.setup}</p>
                                    </div>

                                    <button
                                        onClick={() => router.push("/contact")}
                                        className="w-full group relative px-8 py-5 bg-[#09090B] flex items-center justify-between transition-all duration-300 hover:bg-black border border-[#09090B] rounded-full"
                                    >
                                        <span className="text-[#FDFBF7] text-sm font-medium tracking-wide uppercase text-center w-full relative z-10">
                                            Get Started
                                        </span>
                                        <div className="absolute right-6 w-8 h-8 rounded-full bg-[#E8BC59] flex items-center justify-center text-[#09090B] group-hover:scale-110 group-hover:bg-white transition-all duration-300 z-10">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. FAQ — mirrors the FAQPage JSON-LD emitted by layout.tsx.
                     Keep both in sync via lib/product-faqs.ts. */}
                {faqs.length > 0 && (
                    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#F5F2EB] border-t border-[#E6E2D8] relative">
                        <div className="max-w-[100rem] mx-auto relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-24">
                                <div>
                                    <h3 className="text-[10px] uppercase font-mono tracking-widest text-[#78736A]/60 mb-6 font-semibold">
                                        Questions
                                    </h3>
                                    <h4 className="text-3xl md:text-4xl lg:text-[40px] tracking-[-0.08em] text-[#09090B] font-light leading-[1.1]">
                                        Everything about <span className="italic text-gradient-gold">{data.name}.</span>
                                    </h4>
                                    <p className="mt-6 text-[#78736A] text-sm font-light leading-relaxed max-w-sm">
                                        Still unclear on something? Ask us directly — we answer the specifics before you commit.
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#09090B] border-b border-[#09090B]/20 pb-1 hover:border-[#09090B] transition-colors duration-300"
                                    >
                                        Talk to the team
                                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </Link>
                                </div>

                                <dl className="flex flex-col">
                                    {faqs.map((faq, i) => (
                                        <motion.div
                                            key={faq.q}
                                            initial={{ opacity: 0, y: 12 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-60px" }}
                                            transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
                                            className="border-t border-[#E6E2D8] py-7 last:border-b"
                                        >
                                            <dt className="text-lg md:text-xl text-[#09090B] font-light tracking-tight leading-snug text-balance">
                                                {faq.q}
                                            </dt>
                                            <dd className="mt-3 text-[#78736A] text-sm md:text-[15px] font-light leading-relaxed max-w-2xl">
                                                {faq.a}
                                            </dd>
                                        </motion.div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <FooterSection />
        </div>
    )
}
