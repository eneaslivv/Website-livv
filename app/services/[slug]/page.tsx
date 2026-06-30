"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Layers, ArrowRight, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { LiquidMetalButton } from "@/components/button-styling/liquid-metal-button"
import { clientLogos } from "@/components/data/client-logos"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { supabase } from "@/lib/supabase/client"

const fallbackServiceData: Record<string, any> = {
    /* ── Custom Software Development ──────────────────────────────
     * Lead service per the May 2026 SEO strategy. Target keywords:
     * custom software development company, custom software for small
     * business, custom business application development, build custom
     * software for my company. */
    "custom-software-development": {
        name: "Custom Software Development",
        headline: "Custom software, built end-to-end by the team that designed it.",
        subheadline:
            "Business applications, internal tools, SaaS MVPs, and AI-integrated products shipped to production. No design-to-engineering handoff because the same senior team does both.",
        bodyCopy: [
            "Most software a business actually needs is not on the shelf. The work that runs your operations, the dashboard your team lives inside, the customer portal that holds your relationships: each of those is specific to how your business works. Off-the-shelf SaaS gets you 60 percent of the way there. The other 40 percent is the difference between software your team tolerates and software your team relies on. We build that 40 percent end-to-end.",
            "We have shipped five proprietary products to production: Payper, PRTool, Registrar, LegalFlow, and PM Agent. We know what it costs to build software because we have done it for ourselves and for clients across the US, UK, and Latin America. We work in Next.js, React Native, Flutter, and Supabase, with TypeScript across the stack. Every project ships with the same senior team from kickoff to deploy. No handoff. No diffusion of responsibility. No surprise milestones.",
            "Typical engagements: founder MVPs from six to twelve weeks, internal tools for scale-ups in four to ten weeks, full custom SaaS in three to six months. Pricing is fixed-fee or retainer with transparency before kickoff.",
        ],
        listTitle: "What we ship",
        listItems: [
            "Custom business applications and internal tools",
            "SaaS MVPs for founders past their first round",
            "Customer portals, dashboards, and operations software",
            "AI-integrated workflows built on Claude or OpenAI APIs",
            "White-label SaaS for partner agencies",
            "Mobile applications in React Native or Flutter",
        ],
        ctaText: "Tell us what you would build if the right team existed.",
        accentColor: "#C4A35A",
        secondaryColor: "#8B6F3D",
    },

    /* ── AI Integration ──────────────────────────────
     * Second priority service per the SEO strategy. Target keywords:
     * AI integration services, AI agent development, AI integration
     * for business, custom AI solutions for business. */
    "ai-integration": {
        name: "AI Integration",
        headline: "AI that does specific work for your business, not generic chat.",
        subheadline:
            "Custom AI agents, RAG implementations, AI-augmented workflows, and Claude or OpenAI integrations built into your existing product or shipped as a new one.",
        bodyCopy: [
            "AI integration has become a category full of demos and short of production work. The pattern: a vendor shows a chat interface, the team gets excited, six months later nothing has shipped because the integration was never specified at the workflow level. We work the other way. We start with the specific operational job you want AI to do, design the integration around that job, and ship something measurable inside ninety days.",
            "We build with Anthropic Claude API as our primary model, OpenAI when the use case fits, and custom RAG layers for retrieval over your data. We ship AI agents for project management (PM Agent), customer support workflows, content generation pipelines, document parsing, voice-first interfaces (Registrar), and bespoke automation systems. The AI is invisible inside the product. The user just gets faster, cleaner, more accurate output.",
            "We also integrate AI into existing products that already have users. The harder problem is not the model call. It is the surrounding software architecture: caching, fallback paths, observability, prompt versioning, evaluation harnesses. That is the part we know how to build.",
        ],
        listTitle: "Typical integrations",
        listItems: [
            "Custom AI agents for operational workflows",
            "RAG systems over internal documents and data",
            "AI-assisted content generation pipelines",
            "Voice-first interfaces and natural-language input",
            "AI features inside existing SaaS products",
            "Evaluation harnesses and prompt observability tooling",
        ],
        ctaText: "Bring us the operational job. We design the AI around it.",
        accentColor: "#769268",
        secondaryColor: "#4F6447",
    },

    "creative-engineering": {
        name: "Creative Engineering",
        headline: "We design and build digital solutions that actually make sense.",
        subheadline: "Where strategy, design, and technology come together to solve real business problems.",
        bodyCopy: [
            "Creative Engineering is about bridging ideas and execution. We work at the intersection of design thinking and technical precision to turn complex challenges into clear, functional digital products.",
            "Every decision we make — from structure to interaction — is intentional. We focus on building systems, platforms, and experiences that are scalable, maintainable, and aligned with real user needs and business goals.",
            "This is not just about how things look, but how they work — today and as you grow."
        ],
        listTitle: "What we focus on",
        listItems: [
            "Problem-driven design and development",
            "Scalable, future-proof architectures",
            "Clear logic behind every design decision",
            "Close collaboration between strategy, design, and engineering"
        ],
        ctaText: "Let's build something that works — and lasts.",
        accentColor: "#2dd4bf",
        secondaryColor: "#0d9488",
    },
    "product-strategy-ui": {
        name: "Product Strategy & UI",
        headline: "Product strategy and UI design that bring clarity to complexity.",
        subheadline: "We define what to build, why it matters, and how users interact with it.",
        bodyCopy: [
            "Great products don't happen by accident. They are the result of clear decisions, strong priorities, and a deep understanding of users.",
            "We help you shape your product from the ground up — defining structure, flows, and features before translating them into intuitive, purposeful interfaces. Our UI work is rooted in strategy, not trends, ensuring every screen supports usability, consistency, and business objectives.",
            "The result is a product that feels natural to use and easy to scale."
        ],
        listTitle: "What we deliver",
        listItems: [
            "Product discovery and strategic definition",
            "User flows and information architecture",
            "UI design systems and scalable components",
            "Prototypes focused on usability and clarity"
        ],
        ctaText: "Turn your product vision into a clear, usable experience.",
        accentColor: "#f59e0b",
        secondaryColor: "#d97706",
    },
    "motion-narrative": {
        name: "Motion & Narrative",
        headline: "Motion and storytelling that make ideas easy to understand.",
        subheadline: "Visual narratives designed to explain, guide, and engage.",
        bodyCopy: [
            "Motion is not decoration — it's communication. We use animation and storytelling to simplify complex ideas, highlight what matters, and create memorable experiences.",
            "From product explainers to interface animations and brand narratives, we design motion with intention: clear structure, thoughtful pacing, and just the right amount of emotion. Every movement has a purpose, supporting the message instead of distracting from it."
        ],
        listTitle: "Use cases",
        listItems: [
            "Product and platform explainers",
            "Interface and interaction animations",
            "Brand and launch videos",
            "Narrative-driven motion systems"
        ],
        ctaText: "Tell your story with clarity and impact.",
        accentColor: "#a78bfa",
        secondaryColor: "#7c3aed",
    },

    /* ── Nearshore Software Development ──────────────────────────────
     * Third priority service. Distinct geographic positioning that
     * competes for "nearshore software development Argentina" — a
     * growing search cluster with relatively low competition for
     * editorial-quality content. */
    "nearshore-development": {
        name: "Nearshore Software Development",
        headline: "Senior software development from Argentina, on the US East Coast clock.",
        subheadline:
            "Nearshore software partner for US, UK, and European companies. Bilingual senior team. Time-zone overlap with the US East Coast year-round. Same craft level as top boutique studios in Berlin, Quebec, or Portland.",
        bodyCopy: [
            "Most nearshore software pitches lean on cost. We lead with everything else: time-zone overlap that makes synchronous work actually possible, senior people who can hold their own on a strategy call without an account manager translating, bilingual operations in English and Spanish, and the craft level you would expect from a top studio in Berlin or Quebec. Cost is the door that opens the conversation. The reason agencies and product teams stay with us for years is the work.",
            "Buenos Aires sits in UTC-3, which is one hour ahead of New York in southern summer and same-time as New York in southern winter. That gives an American team an effectively-full overlap with our standard working hours. We take 9am Eastern kickoff calls without breaking our day. We ship work overnight that lands in your inbox by morning. The friction of working with offshore teams ten or twelve hours displaced is gone.",
            "The Argentine software industry has been exporting senior talent to American product companies for two decades. We come out of that tradition. We hire from FADU-UBA design lineage and FCEN / ITBA engineering lineage. Our senior engineers ship code at the level of any Bay Area or NYC product team. The difference is they ship it from Buenos Aires.",
        ],
        listTitle: "Why nearshore from Argentina",
        listItems: [
            "Full overlap with US East Coast working hours",
            "Bilingual English and Spanish operations by default",
            "Senior-only team. No juniors. Founder on every project.",
            "Same craft level as top studios in Berlin, Quebec, Portland",
            "Fixed-fee or retainer pricing with transparency up front",
            "Two-decade lineage of Argentine software exports to US clients",
        ],
        ctaText: "Schedule a 15-minute call. We will tell you in fifteen minutes whether we are the right partner.",
        accentColor: "#2C0405",
        secondaryColor: "#1a0203",
    }
}

export default function ServiceDetailPage() {
    const params = useParams()
    const slug = params.slug as string

    const [data, setData] = useState<any>(fallbackServiceData[slug] || fallbackServiceData["creative-engineering"])
    const [isVisible, setIsVisible] = useState(false)
    const router = useRouter()

    useEffect(() => {
        // Initial setup
        window.scrollTo({ top: 0, behavior: "instant" })
        setIsVisible(true)

        // Fetch from DB, fall back to hardcoded data
        async function fetchService() {
            try {
                const { supabase } = await import("@/lib/supabase/client")
                const { data: dbService } = await supabase
                    .from('services')
                    .select('*')
                    .eq('slug', slug)
                    .eq('status', 'published')
                    .single()

                if (dbService) {
                    // Also fetch features for the list items
                    const { data: features } = await supabase
                        .from('service_features')
                        .select('*')
                        .eq('service_id', dbService.id)
                        .order('display_order', { ascending: true })

                    setData({
                        name: dbService.title,
                        headline: dbService.subtitle || dbService.title,
                        subheadline: dbService.short_description || '',
                        bodyCopy: dbService.full_description ? dbService.full_description.split('\n\n').filter(Boolean) : [],
                        listTitle: 'What we deliver',
                        listItems: (features || []).map((f: any) => f.title),
                        ctaText: dbService.cta_label || 'Get started',
                        accentColor: '#2dd4bf',
                        secondaryColor: '#0d9488',
                    })
                }
            } catch (err) {
                console.error('Error fetching service:', err)
            }
        }
        fetchService()
    }, [slug])

    const handleStartScoping = () => {
        router.push("/#blog")
    }

    return (
        <div className="text-stone-800 min-h-screen flex flex-col overflow-x-hidden relative selection:bg-stone-200 selection:text-stone-900 bg-[#FDFBF9]">
            <Navbar isLoaded={isVisible} theme="dark" />
            {/* Subtle Grain Background */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-[0.15]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`
                }}
            />

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center pt-20 md:pt-32 relative w-full z-10">

                {/* Hero Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="z-20 text-center max-w-5xl mx-auto px-6 mb-8 relative"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-stone-200 bg-white/50 backdrop-blur-sm mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[10px] uppercase tracking-widest text-stone-500 font-medium">{data.name} Operational</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] font-light tracking-tighter text-stone-900 mb-8">
                        {data.headline}
                    </h1>

                    <p className="text-lg md:text-xl text-stone-500 font-light max-w-3xl mx-auto leading-relaxed">
                        {data.subheadline}
                    </p>
                </motion.div>

                {/* Visualization Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="w-full relative h-[300px] md:h-[600px] flex items-center justify-center -mt-4 overflow-hidden"
                >
                    {/* SVG Lines Background - animated paths hidden on mobile for performance */}
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur"></feGaussianBlur>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"></feMergeNode>
                                    <feMergeNode in="SourceGraphic"></feMergeNode>
                                </feMerge>
                            </filter>

                            <linearGradient id="grad-left" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor={data.accentColor} stopOpacity="0"></stop>
                                <stop offset="50%" stopColor={data.accentColor} stopOpacity="0.8"></stop>
                                <stop offset="100%" stopColor={data.secondaryColor} stopOpacity="0"></stop>
                            </linearGradient>

                            <linearGradient id="grad-right" gradientUnits="userSpaceOnUse" x1="100%" y1="0%" x2="0%" y2="0%">
                                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0"></stop>
                                <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.8"></stop>
                                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"></stop>
                            </linearGradient>
                        </defs>

                        {/* LEFT SIDE FLOWS - static lines always visible */}
                        <path d="M-100,50 C300,50 500,300 660,300" stroke="#a8a29e" strokeWidth="1" fill="none" opacity="0.2"></path>
                        <path d="M-100,200 C300,220 500,300 660,300" stroke="#d6d3d1" strokeWidth="1" fill="none" strokeDasharray="3 6"></path>
                        <path d="M-100,300 L660,300" stroke="#a8a29e" strokeWidth="1" opacity="0.2" fill="none"></path>
                        <path d="M-100,550 C300,550 500,300 660,300" stroke="#a8a29e" strokeWidth="1" fill="none" opacity="0.2"></path>

                        {/* Animated glow paths - desktop only for performance */}
                        <g className="hidden md:block">
                            <motion.path
                                d="M-100,50 C300,50 500,300 660,300"
                                stroke="url(#grad-left)"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="150 1000"
                                strokeDashoffset="1150"
                                strokeLinecap="round"
                                filter="url(#line-glow)"
                                animate={{ strokeDashoffset: [1150, -1150] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.path
                                d="M-100,300 L660,300"
                                stroke="url(#grad-left)"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="200 1200"
                                strokeDashoffset="1400"
                                strokeLinecap="round"
                                filter="url(#line-glow)"
                                animate={{ strokeDashoffset: [1400, -1400] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 0.5 }}
                            />
                            <motion.path
                                d="M-100,550 C300,550 500,300 660,300"
                                stroke="url(#grad-left)"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="180 1000"
                                strokeDashoffset="1180"
                                strokeLinecap="round"
                                filter="url(#line-glow)"
                                animate={{ strokeDashoffset: [1180, -1180] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }}
                            />
                        </g>

                        <g transform="translate(660, 300)">
                            <circle cx="0" cy="0" r="8" fill="#FDFBF9" stroke="#a8a29e" strokeWidth="1.5"></circle>
                            <circle cx="0" cy="0" r="2" fill={data.accentColor} className="animate-pulse"></circle>
                        </g>


                        {/* RIGHT SIDE FLOWS - static lines always visible */}
                        <path d="M1540,50 C1140,50 940,300 780,300" stroke="#a8a29e" strokeWidth="1" fill="none" opacity="0.2"></path>
                        <path d="M1540,300 L780,300" stroke="#a8a29e" strokeWidth="1" opacity="0.2" fill="none"></path>
                        <path d="M1540,550 C1140,550 940,300 780,300" stroke="#a8a29e" strokeWidth="1" fill="none" opacity="0.2"></path>

                        {/* Animated glow paths - desktop only for performance */}
                        <g className="hidden md:block">
                            <motion.path
                                d="M1540,50 C1140,50 940,300 780,300"
                                stroke="url(#grad-right)"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="150 1000"
                                strokeDashoffset="-1150"
                                strokeLinecap="round"
                                filter="url(#line-glow)"
                                animate={{ strokeDashoffset: [-1150, 1150] }}
                                transition={{ duration: 5.5, repeat: Infinity, ease: "linear", delay: 0.2 }}
                            />
                            <motion.path
                                d="M1540,300 L780,300"
                                stroke="url(#grad-right)"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="200 1200"
                                strokeDashoffset="-1400"
                                strokeLinecap="round"
                                filter="url(#line-glow)"
                                animate={{ strokeDashoffset: [-1400, 1400] }}
                                transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 1.2 }}
                            />
                            <motion.path
                                d="M1540,550 C1140,550 940,300 780,300"
                                stroke="url(#grad-right)"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="180 1000"
                                strokeDashoffset="-1180"
                                strokeLinecap="round"
                                filter="url(#line-glow)"
                                animate={{ strokeDashoffset: [-1180, 1180] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 2 }}
                            />
                        </g>

                        <g transform="translate(780, 300)">
                            <circle cx="0" cy="0" r="8" fill="#FDFBF9" stroke="#a8a29e" strokeWidth="1.5"></circle>
                            <circle cx="0" cy="0" r="2" fill="#a78bfa" className="animate-pulse"></circle>
                        </g>
                    </svg>

                    {/* Soft Gradient Masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FDFBF9] to-transparent pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FDFBF9] to-transparent pointer-events-none"></div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="pointer-events-auto">
                            <LiquidMetalButton label="start scoping" onClick={handleStartScoping} />
                        </div>
                    </div>
                </motion.div>

                {/* Detailed Content Sections */}
                <section className="w-full max-w-5xl mx-auto px-6 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative z-20">
                    {/* Left: Body Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-8"
                    >
                        {data.bodyCopy.map((paragraph, i) => (
                            <p key={i} className="text-lg text-stone-600 font-light leading-relaxed">
                                {paragraph}
                            </p>
                        ))}

                        <div className="mt-8">
                            <button className="group bg-stone-900 text-stone-50 text-xs font-semibold tracking-wider px-8 py-4 rounded-md shadow-2xl hover:bg-stone-800 hover:scale-[1.02] transition-all duration-300 uppercase flex items-center gap-3">
                                <span>{data.ctaText}</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Right: List / Focus Points */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white/40 backdrop-blur-sm border border-stone-200 rounded-3xl p-8 md:p-12 shadow-sm"
                    >
                        <h3 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-8">
                            {data.listTitle}
                        </h3>
                        <ul className="flex flex-col gap-6">
                            {data.listItems.map((item, i) => (
                                <li key={i} className="flex items-start gap-4 group">
                                    <div className="mt-1">
                                        <CheckCircle2 className="w-5 h-5 text-stone-300 group-hover:text-emerald-500 transition-colors" />
                                    </div>
                                    <span className="text-base text-stone-700 font-medium tracking-tight">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </section>

                {/* Bottom Trusted By */}
                <div className="py-20 flex flex-col items-center gap-6">
                    <p className="text-[10px] font-semibold tracking-widest text-stone-400 uppercase">Trusted by engineering teams at</p>
                    <div className="flex items-center justify-center gap-8 flex-wrap">
                        {clientLogos.map((logo) => (
                            <Image
                                key={logo.alt}
                                src={logo.src}
                                alt={logo.alt}
                                width={120}
                                height={24}
                                loading="lazy"
                                className="h-6 w-auto object-contain grayscale opacity-40 hover:opacity-60 transition-opacity duration-300"
                            />
                        ))}
                    </div>
                </div>

            </main>
            <FooterSection id="contact" />
        </div>
    )
}
