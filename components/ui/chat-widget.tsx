"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { X, ArrowRight, Send, ChevronLeft, Phone, Calendar, Sparkles, Check, MessageCircle } from "lucide-react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { submitLead } from "@/lib/lead-ingest"

/* ─────────────────────── GUIDED FLOW DATA ─────────────────────── */

type StepOption = { label: string; value: string; icon?: string }

interface FlowStep {
    id: string
    question: string
    subtitle?: string
    type: "options" | "form"
    options?: StepOption[]
}

const FLOW_STEPS: FlowStep[] = [
    {
        id: "service",
        question: "What are you looking for?",
        subtitle: "Select what best represents your need.",
        type: "options",
        options: [
            { label: "Custom Website or App", value: "web-app", icon: "🌐" },
            { label: "Systematize My Business", value: "systematize", icon: "⚙" },
            { label: "Social Media Content System", value: "social", icon: "◈" },
            { label: "Ready-Made App, My Brand", value: "ready-app", icon: "✦" },
            { label: "Not sure yet", value: "unsure", icon: "?" },
        ],
    },
    {
        id: "budget",
        question: "What's your estimated budget?",
        subtitle: "This helps us design the ideal proposal.",
        type: "options",
        options: [
            { label: "Under $500", value: "under-500" },
            { label: "$500 – $2,000", value: "500-2k" },
            { label: "$2,000 – $5,000", value: "2k-5k" },
            { label: "$5,000 – $15,000", value: "5k-15k" },
            { label: "Over $15,000", value: "over-15k" },
        ],
    },
    {
        id: "timeline",
        question: "When do you need it?",
        subtitle: "We adapt to your timeline.",
        type: "options",
        options: [
            { label: "As soon as possible", value: "asap" },
            { label: "In 2–4 weeks", value: "2-4-weeks" },
            { label: "In 1–2 months", value: "1-2-months" },
            { label: "No rush, planning ahead", value: "no-rush" },
        ],
    },
    {
        id: "contact",
        question: "Perfect! Leave us your details.",
        subtitle: "We'll get back to you within 24 hours.",
        type: "form",
    },
]

/* ─────────────────── SERVICE RECOMMENDATIONS ─────────────────── */

function getRecommendation(answers: Record<string, string>): string {
    const service = answers.service
    if (service === "web-app") return "We recommend our Creative Engineering service — high-performance websites and apps."
    if (service === "systematize") return "Our automation & systems team can streamline every part of your operations."
    if (service === "social") return "We build content systems that keep your social channels running on autopilot."
    if (service === "ready-app") return "Pick from our catalog of proven apps — rebranded and deployed under your name."
    return "Let's explore together which option is the best fit for you."
}

/* ─────────────────── TYPING INDICATOR ─────────────────── */

function TypingDots() {
    return (
        <div className="flex items-center gap-3 mb-5">
            <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                <Image src="/assets/luis-profile.jpg" alt="Luis" fill className="object-cover" sizes="28px" />
            </div>
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-tl-md px-4 py-3">
                <div className="flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                        <motion.span
                            key={i}
                            className="w-[5px] h-[5px] rounded-full bg-white/30"
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.15,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

/* ─────────────────── MAGNETIC BUTTON ─────────────────── */

function MagneticButton({ children, onClick, className = "", disabled = false }: {
    children: React.ReactNode
    onClick?: () => void
    className?: string
    disabled?: boolean
}) {
    const ref = useRef<HTMLButtonElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springX = useSpring(x, { stiffness: 300, damping: 20 })
    const springY = useSpring(y, { stiffness: 300, damping: 20 })

    const handleMouse = (e: React.MouseEvent) => {
        if (!ref.current || disabled) return
        const rect = ref.current.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        x.set((e.clientX - cx) * 0.15)
        y.set((e.clientY - cy) * 0.15)
    }

    const handleLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.button
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            onClick={onClick}
            disabled={disabled}
            className={className}
        >
            {children}
        </motion.button>
    )
}

/* ─────────────────── AMBIENT PARTICLES ─────────────────── */

function AmbientParticles() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-[#C4A35A]/20"
                    style={{
                        left: `${20 + i * 15}%`,
                        top: `${10 + i * 18}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0, 0.6, 0],
                        scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                        duration: 4 + i * 0.8,
                        repeat: Infinity,
                        delay: i * 1.5,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    )
}

/* ─────────────────── ROTATING WORDS ─────────────────── */

const ROTATING_WORDS = ["business", "startup", "agency", "brand", "workflow"]

function RotatingWords() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % ROTATING_WORDS.length)
        }, 2400)
        return () => clearInterval(interval)
    }, [])

    return (
        <span className="relative inline-flex overflow-hidden align-baseline" style={{ width: 58, height: 13 }}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={ROTATING_WORDS[index]}
                    className="absolute left-0 text-white/40"
                    initial={{ y: 10, opacity: 0, filter: "blur(3px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -10, opacity: 0, filter: "blur(3px)" }}
                    transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                >
                    {ROTATING_WORDS[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    )
}

/* ─────────────────────── CHAT WIDGET ─────────────────────── */

export function ChatWidget() {
    const [isVisible, setIsVisible] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [hasBeenClosed, setHasBeenClosed] = useState(false)
    const [isPanelOpen, setIsPanelOpen] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [showContent, setShowContent] = useState(false)
    const [direction, setDirection] = useState(1) // 1 = forward, -1 = back

    // Guided flow state
    const [currentStep, setCurrentStep] = useState(0)
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [formData, setFormData] = useState({ name: "", email: "", message: "" })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)

    const panelRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Widget mouse tilt
    const widgetRef = useRef<HTMLDivElement>(null)
    const rotateX = useMotionValue(0)
    const rotateY = useMotionValue(0)
    const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 })
    const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 })

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasBeenClosed) setIsVisible(true)
        }, 3000)
        return () => clearTimeout(timer)
    }, [hasBeenClosed])

    // Close panel on outside click
    useEffect(() => {
        if (!isPanelOpen) return
        const handleClick = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                setIsPanelOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [isPanelOpen])

    // Lock body scroll when panel is open
    useEffect(() => {
        if (isPanelOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => { document.body.style.overflow = "" }
    }, [isPanelOpen])

    // Simulate typing on step change
    useEffect(() => {
        if (isPanelOpen && !isSubmitted) {
            setIsTyping(true)
            setShowContent(false)
            const timer = setTimeout(() => {
                setIsTyping(false)
                setShowContent(true)
            }, 800 + Math.random() * 400)
            return () => clearTimeout(timer)
        }
    }, [currentStep, isPanelOpen, isSubmitted])

    const openPanel = useCallback(() => {
        setIsPanelOpen(true)
        setIsMinimized(true)
    }, [])

    const handleSelectOption = useCallback((stepId: string, value: string) => {
        setSelectedOption(value)
        setTimeout(() => {
            setDirection(1)
            setAnswers(prev => ({ ...prev, [stepId]: value }))
            setCurrentStep(prev => prev + 1)
            setSelectedOption(null)
        }, 350)
    }, [])

    const handleBack = useCallback(() => {
        if (currentStep > 0) {
            setDirection(-1)
            setCurrentStep(prev => prev - 1)
        }
    }, [currentStep])

    const handleSubmitForm = useCallback(async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const serviceLabel = FLOW_STEPS[0]?.options?.find(o => o.value === answers.service)?.label || answers.service || ""
            const budgetLabel = FLOW_STEPS[1]?.options?.find(o => o.value === answers.budget)?.label || answers.budget || ""
            const timelineLabel = FLOW_STEPS[2]?.options?.find(o => o.value === answers.timeline)?.label || answers.timeline || ""

            const fullMessage = [
                `Service: ${serviceLabel}`,
                `Budget: ${budgetLabel}`,
                `Timeline: ${timelineLabel}`,
                ``,
                `Message:`,
                formData.message,
            ].join("\n")

            await submitLead({
                name: formData.name,
                email: formData.email,
                message: fullMessage,
                origin: "Chat Widget",
                source: "website",
                category: "lead",
                project_type: serviceLabel,
            })
        } catch (err) {
            console.error("Failed to submit chat lead:", err)
        }
        setIsSubmitted(true)
    }, [answers, formData])

    const resetFlow = useCallback(() => {
        setCurrentStep(0)
        setAnswers({})
        setFormData({ name: "", email: "", message: "" })
        setIsSubmitted(false)
        setSelectedOption(null)
        setShowContent(false)
        setDirection(1)
    }, [])

    // Widget tilt handler
    const handleWidgetMouse = (e: React.MouseEvent) => {
        if (!widgetRef.current) return
        const rect = widgetRef.current.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        rotateX.set((e.clientY - cy) * -0.04)
        rotateY.set((e.clientX - cx) * 0.04)
    }

    const handleWidgetLeave = () => {
        rotateX.set(0)
        rotateY.set(0)
    }

    if (!isVisible && !isPanelOpen) return null

    const step = FLOW_STEPS[currentStep]
    const progress = ((currentStep) / FLOW_STEPS.length) * 100

    const slideVariants = {
        enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0, filter: "blur(4px)" }),
        center: { x: 0, opacity: 1, filter: "blur(0px)" },
        exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0, filter: "blur(4px)" }),
    }

    return (
        <>
            {/* ── Overlay ── */}
            <AnimatePresence>
                {isPanelOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="fixed inset-0 z-[998] bg-black/70 backdrop-blur-md"
                    />
                )}
            </AnimatePresence>

            {/* ── Side Panel ── */}
            <AnimatePresence>
                {isPanelOpen && (
                    <motion.div
                        ref={panelRef}
                        initial={{ x: "100%", opacity: 0.5 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0.5 }}
                        transition={{ type: "spring", damping: 32, stiffness: 300, mass: 0.8 }}
                        className="fixed top-0 right-0 bottom-0 z-[999] w-full sm:w-[480px] flex flex-col"
                    >
                        <div className="flex flex-col h-full bg-[#080808] sm:rounded-l-[2rem] overflow-hidden border-l border-white/[0.04] relative">
                            {/* Ambient background effects */}
                            <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#C4A35A]/[0.05] rounded-full blur-[100px] pointer-events-none" />
                            <div className="absolute bottom-0 -left-20 w-60 h-60 bg-[#C4A35A]/[0.03] rounded-full blur-[80px] pointer-events-none" />
                            <AmbientParticles />

                            {/* Panel Header */}
                            <div className="relative flex-shrink-0 z-10">
                                <div className="relative px-6 pt-6 pb-5">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3.5">
                                            <div className="relative">
                                                <motion.div
                                                    className="relative w-11 h-11 rounded-full overflow-hidden ring-[1.5px] ring-white/[0.08]"
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                                >
                                                    <Image
                                                        src="/assets/luis-profile.jpg"
                                                        alt="Luis"
                                                        fill
                                                        className="object-cover"
                                                        sizes="44px"
                                                    />
                                                </motion.div>
                                                {/* Pulsing online indicator */}
                                                <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30" />
                                                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-[#080808]" />
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="text-white text-[15px] font-semibold tracking-[-0.01em]">Luis from Livv</h3>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <span className="text-[11px] text-emerald-400/90 font-medium">Online</span>
                                                    <span className="text-[11px] text-white/20">&middot;</span>
                                                    <span className="text-[11px] text-white/25">Responds in &lt;5 min</span>
                                                </div>
                                            </div>
                                        </div>
                                        <motion.button
                                            onClick={() => setIsPanelOpen(false)}
                                            className="w-9 h-9 rounded-full bg-white/[0.04] flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                                            whileHover={{ scale: 1.1, rotate: 90 }}
                                            whileTap={{ scale: 0.9 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                        >
                                            <X className="w-4 h-4" />
                                        </motion.button>
                                    </div>

                                    {/* Progress bar */}
                                    {!isSubmitted && (
                                        <div className="relative">
                                            <div className="w-full h-[2px] bg-white/[0.04] rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full rounded-full"
                                                    style={{
                                                        background: "linear-gradient(90deg, #C4A35A 0%, #E8D5A0 50%, #C4A35A 100%)",
                                                        backgroundSize: "200% 100%",
                                                    }}
                                                    initial={{ width: 0 }}
                                                    animate={{
                                                        width: `${progress}%`,
                                                        backgroundPosition: ["0% 0%", "100% 0%"],
                                                    }}
                                                    transition={{
                                                        width: { duration: 0.6, ease: [0.32, 0.72, 0, 1] },
                                                        backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
                                                    }}
                                                />
                                            </div>
                                            {/* Step indicators */}
                                            <div className="flex justify-between mt-2.5 px-0.5">
                                                {FLOW_STEPS.map((s, i) => (
                                                    <div key={s.id} className="flex items-center gap-1.5">
                                                        <motion.div
                                                            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                                                                i < currentStep ? "bg-[#C4A35A]" :
                                                                i === currentStep ? "bg-white/40" :
                                                                "bg-white/[0.08]"
                                                            }`}
                                                            animate={i === currentStep ? { scale: [1, 1.4, 1] } : {}}
                                                            transition={{ duration: 1.5, repeat: Infinity }}
                                                        />
                                                        <span className={`text-[9px] tracking-wider uppercase font-medium transition-colors duration-300 ${
                                                            i <= currentStep ? "text-white/30" : "text-white/[0.08]"
                                                        }`}>
                                                            {i === 0 ? "Service" : i === 1 ? "Budget" : i === 2 ? "Timeline" : "Details"}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Divider with glow */}
                                <div className="relative h-px">
                                    <div className="absolute inset-0 bg-white/[0.04]" />
                                    <motion.div
                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C4A35A]/40 via-[#C4A35A]/10 to-transparent"
                                        animate={{ width: `${progress + 10}%` }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                    />
                                </div>
                            </div>

                            {/* Panel Body */}
                            <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 relative z-10">
                                <AnimatePresence mode="wait" custom={direction}>
                                    {isSubmitted ? (
                                        /* ── Success State ── */
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                            className="flex flex-col items-center justify-center h-full text-center py-8"
                                        >
                                            {/* Success animation */}
                                            <motion.div
                                                className="relative w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-8"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                                            >
                                                <motion.div
                                                    className="absolute inset-0 rounded-full bg-emerald-500/5"
                                                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                                />
                                                <motion.div
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.4 }}
                                                >
                                                    <Check className="w-9 h-9 text-emerald-400" strokeWidth={2.5} />
                                                </motion.div>
                                            </motion.div>

                                            <motion.h3
                                                className="text-xl font-semibold text-white mb-2 tracking-[-0.02em]"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                            >
                                                Message sent!
                                            </motion.h3>
                                            <motion.p
                                                className="text-[13px] text-white/40 mb-3 max-w-[280px] leading-relaxed"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.6 }}
                                            >
                                                We'll get back to you within 24 hours with a personalized proposal.
                                            </motion.p>
                                            <motion.p
                                                className="text-[12px] text-[#C4A35A]/50 mb-10 max-w-[280px] leading-relaxed"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.7 }}
                                            >
                                                {getRecommendation(answers)}
                                            </motion.p>

                                            <motion.div
                                                className="flex flex-col gap-3 w-full max-w-[280px]"
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.8 }}
                                            >
                                                <a
                                                    href="https://cal.com/eneas-aldabe-youfep/15min"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group flex items-center justify-center gap-2.5 w-full rounded-full bg-white px-5 py-3.5 text-[13px] font-semibold text-black hover:bg-white/90 transition-all duration-200"
                                                >
                                                    <Calendar className="w-4 h-4" />
                                                    Schedule a call now
                                                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                                </a>
                                                <button
                                                    onClick={() => {
                                                        resetFlow()
                                                        setIsPanelOpen(false)
                                                    }}
                                                    className="text-[13px] text-white/25 hover:text-white/60 transition-colors py-2"
                                                >
                                                    Close
                                                </button>
                                            </motion.div>
                                        </motion.div>
                                    ) : isTyping ? (
                                        /* ── Typing Indicator ── */
                                        <motion.div
                                            key="typing"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <TypingDots />
                                        </motion.div>
                                    ) : showContent && step?.type === "options" ? (
                                        /* ── Options Step ── */
                                        <motion.div
                                            key={step.id}
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                                        >
                                            {/* Chat bubble from "Luis" */}
                                            <motion.div
                                                className="flex gap-3 mb-6"
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: 0.05 }}
                                            >
                                                <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mt-1">
                                                    <Image src="/assets/luis-profile.jpg" alt="Luis" fill className="object-cover" sizes="28px" />
                                                </div>
                                                <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl rounded-tl-sm px-4 py-3.5 max-w-[340px] backdrop-blur-sm">
                                                    <p className="text-[15px] font-medium text-white/90 leading-snug tracking-[-0.01em]">{step.question}</p>
                                                    {step.subtitle && (
                                                        <p className="text-[11.5px] text-white/25 mt-1.5 leading-relaxed">{step.subtitle}</p>
                                                    )}
                                                </div>
                                            </motion.div>

                                            {/* Options with staggered animation */}
                                            <div className="flex flex-col gap-2 pl-10">
                                                {step.options?.map((opt, i) => (
                                                    <motion.button
                                                        key={opt.value}
                                                        onClick={() => handleSelectOption(step.id, opt.value)}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{
                                                            duration: 0.3,
                                                            delay: 0.1 + i * 0.06,
                                                            ease: [0.32, 0.72, 0, 1],
                                                        }}
                                                        whileHover={{ x: 4 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className={`group relative flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                                                            selectedOption === opt.value
                                                                ? "bg-[#C4A35A]/10 border-[#C4A35A]/25 text-white shadow-[0_0_20px_-5px_rgba(196,163,90,0.15)]"
                                                                : "bg-white/[0.015] border-white/[0.05] text-white/60 hover:bg-white/[0.04] hover:border-white/[0.1] hover:text-white/90"
                                                        }`}
                                                    >
                                                        {opt.icon && (
                                                            <span className={`text-sm w-6 text-center flex-shrink-0 transition-all duration-200 ${
                                                                selectedOption === opt.value ? "opacity-100 scale-110" : "opacity-40 group-hover:opacity-80"
                                                            }`}>
                                                                {opt.icon}
                                                            </span>
                                                        )}
                                                        <span className="text-[13px] font-medium tracking-[-0.01em]">{opt.label}</span>
                                                        <ArrowRight className={`w-3.5 h-3.5 ml-auto transition-all duration-200 ${
                                                            selectedOption === opt.value
                                                                ? "opacity-100 translate-x-0 text-[#C4A35A]"
                                                                : "opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-0"
                                                        }`} />
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ) : showContent && step?.type === "form" ? (
                                        /* ── Form Step ── */
                                        <motion.div
                                            key="form"
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                                        >
                                            {/* Chat bubble */}
                                            <motion.div
                                                className="flex gap-3 mb-6"
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: 0.05 }}
                                            >
                                                <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mt-1">
                                                    <Image src="/assets/luis-profile.jpg" alt="Luis" fill className="object-cover" sizes="28px" />
                                                </div>
                                                <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl rounded-tl-sm px-4 py-3.5 max-w-[340px] backdrop-blur-sm">
                                                    <p className="text-[15px] font-medium text-white/90 leading-snug tracking-[-0.01em]">{step.question}</p>
                                                    {step.subtitle && (
                                                        <p className="text-[11.5px] text-white/25 mt-1.5 leading-relaxed">{step.subtitle}</p>
                                                    )}
                                                </div>
                                            </motion.div>

                                            {/* Recommendation pill */}
                                            <motion.div
                                                className="ml-10 mb-6 px-4 py-3 rounded-xl bg-[#C4A35A]/[0.04] border border-[#C4A35A]/[0.08] backdrop-blur-sm"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.15 }}
                                            >
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <motion.div
                                                        animate={{ rotate: [0, 15, -15, 0] }}
                                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                                    >
                                                        <Sparkles className="w-3 h-3 text-[#C4A35A]/70" />
                                                    </motion.div>
                                                    <span className="text-[9px] uppercase tracking-[0.15em] text-[#C4A35A]/60 font-semibold">Our recommendation</span>
                                                </div>
                                                <p className="text-[12px] text-white/30 leading-relaxed">{getRecommendation(answers)}</p>
                                            </motion.div>

                                            {/* Form with staggered fields */}
                                            <form onSubmit={handleSubmitForm} className="flex flex-col gap-3.5 pl-10">
                                                {[
                                                    { type: "text", placeholder: "Your name", key: "name", delay: 0.2 },
                                                    { type: "email", placeholder: "you@email.com", key: "email", delay: 0.25 },
                                                ].map((field) => (
                                                    <motion.div
                                                        key={field.key}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: field.delay }}
                                                    >
                                                        <input
                                                            type={field.type}
                                                            placeholder={field.placeholder}
                                                            required
                                                            value={formData[field.key as keyof typeof formData]}
                                                            onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                                                            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-[#C4A35A]/25 focus:bg-white/[0.04] focus:shadow-[0_0_20px_-5px_rgba(196,163,90,0.1)] transition-all duration-300"
                                                        />
                                                    </motion.div>
                                                ))}
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3 }}
                                                >
                                                    <textarea
                                                        placeholder="Tell us briefly about your project..."
                                                        rows={3}
                                                        value={formData.message}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-[#C4A35A]/25 focus:bg-white/[0.04] focus:shadow-[0_0_20px_-5px_rgba(196,163,90,0.1)] transition-all duration-300 resize-none"
                                                    />
                                                </motion.div>
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.35 }}
                                                >
                                                    <button
                                                        type="submit"
                                                        className="group flex items-center justify-center gap-2.5 w-full rounded-full bg-white px-5 py-3.5 text-[13px] font-semibold text-black hover:bg-white/90 transition-all duration-200 mt-1"
                                                    >
                                                        <Send className="w-3.5 h-3.5 transition-transform group-hover:-rotate-12 group-hover:-translate-y-0.5" />
                                                        Send inquiry
                                                    </button>
                                                </motion.div>
                                            </form>
                                        </motion.div>
                                    ) : null}
                                </AnimatePresence>
                            </div>

                            {/* Panel Footer */}
                            <div className="flex-shrink-0 px-6 py-4 border-t border-white/[0.03] relative z-10">
                                <div className="flex items-center justify-between">
                                    {currentStep > 0 && !isSubmitted ? (
                                        <motion.button
                                            onClick={handleBack}
                                            className="flex items-center gap-1.5 text-[12px] text-white/25 hover:text-white/60 transition-colors"
                                            whileHover={{ x: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <ChevronLeft className="w-3.5 h-3.5" />
                                            Back
                                        </motion.button>
                                    ) : (
                                        <span />
                                    )}
                                    <div className="flex items-center gap-4">
                                        <a
                                            href="https://cal.com/eneas-aldabe-youfep/15min"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-[11px] text-white/15 hover:text-[#C4A35A]/60 transition-colors duration-200"
                                        >
                                            <Phone className="w-3 h-3" />
                                            Schedule call
                                        </a>
                                        <span className="w-px h-3 bg-white/[0.04]" />
                                        <a
                                            href="mailto:hola@livv.systems"
                                            className="text-[11px] text-white/15 hover:text-white/40 transition-colors duration-200"
                                        >
                                            hola@livv.systems
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Floating Widget (Premium Card with 3D Tilt) ── */}
            <AnimatePresence>
                {isVisible && !isPanelOpen && !isMinimized && (
                    <motion.div
                        ref={widgetRef}
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 250, mass: 0.8 }}
                        onMouseMove={handleWidgetMouse}
                        onMouseLeave={handleWidgetLeave}
                        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[997]"
                        style={{
                            perspective: 800,
                        }}
                    >
                        <motion.div
                            style={{ rotateX: springRotateX, rotateY: springRotateY }}
                            className="relative flex w-[240px] sm:w-[360px] rounded-[22px] overflow-hidden bg-[#0A0A0A] border border-white/[0.04] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
                        >
                            {/* Subtle shimmer effect */}
                            <motion.div
                                className="absolute inset-0 pointer-events-none z-10"
                                style={{
                                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.02) 45%, transparent 50%)",
                                    backgroundSize: "200% 100%",
                                }}
                                animate={{ backgroundPosition: ["-200% 0%", "200% 0%"] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
                            />

                            {/* Left: Photo strip */}
                            <div className="relative w-[70px] sm:w-[120px] flex-shrink-0">
                                <Image
                                    src="/assets/luis-profile.jpg"
                                    alt="Luis - Livv Studio"
                                    fill
                                    className="object-cover"
                                    sizes="140px"
                                />
                                <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0A0A0A] to-transparent" />
                                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                    </span>
                                    <span className="text-[9px] text-white/60 font-medium tracking-wide">Online</span>
                                </div>
                            </div>

                            {/* Right: Content */}
                            <div className="flex flex-1 flex-col p-3 sm:p-4 pl-2 sm:pl-3 relative min-w-0">
                                {/* Close / Minimize */}
                                <div className="absolute top-3 right-3 flex gap-1 z-20">
                                    <button
                                        onClick={() => setIsMinimized(true)}
                                        className="w-5 h-5 rounded-full flex items-center justify-center text-white/30 hover:text-white/50 transition-colors duration-200"
                                        aria-label="Minimize"
                                    >
                                        <svg width="8" height="2" viewBox="0 0 8 2" fill="none"><rect width="8" height="1.5" rx="0.75" fill="currentColor" /></svg>
                                    </button>
                                    <button
                                        onClick={() => { setIsVisible(false); setHasBeenClosed(true) }}
                                        className="w-5 h-5 rounded-full flex items-center justify-center text-white/30 hover:text-white/50 transition-colors duration-200"
                                        aria-label="Close"
                                    >
                                        <X className="w-2.5 h-2.5" />
                                    </button>
                                </div>

                                {/* Name & role */}
                                <div className="mb-2 sm:mb-3">
                                    <h3 className="text-[12px] sm:text-[14px] font-semibold text-white tracking-[-0.01em] leading-tight">
                                        &ldquo;Luis&rdquo; <span className="text-[10px] font-normal text-white/40 ml-1">real human</span>
                                    </h3>
                                    <p className="text-[9px] text-white/40 font-semibold tracking-[0.15em] uppercase mt-1">
                                        Customer Access
                                    </p>
                                </div>

                                {/* Badges - hidden on mobile */}
                                <div className="hidden sm:flex flex-wrap gap-1.5 mb-3.5">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] text-[10px] text-white/40 font-medium tracking-wide">
                                        <span className="text-[#C4A35A]/60">&#9670;</span>
                                        Systematize your <RotatingWords />
                                    </span>
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] text-[10px] text-white/40 font-medium tracking-wide">
                                        From $999
                                    </span>
                                </div>

                                <p className="hidden sm:block text-[11px] text-white/40 leading-relaxed mb-4 pr-2">
                                    We build digital systems, websites and apps to scale your business.
                                </p>

                                {/* Actions */}
                                <div className="mt-auto flex flex-col gap-1.5">
                                    <MagneticButton
                                        onClick={openPanel}
                                        className="group flex w-full items-center justify-center gap-2 rounded-full bg-white/[0.05] border border-white/[0.05] px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] font-semibold text-white/70 tracking-wide transition-all duration-300 hover:bg-white/[0.08] hover:text-white hover:border-white/[0.1] hover:shadow-[0_0_25px_-5px_rgba(196,163,90,0.1)]"
                                    >
                                        Chat
                                        <ArrowRight className="w-3 h-3 opacity-30 group-hover:opacity-70 transition-all duration-200 group-hover:translate-x-0.5" />
                                    </MagneticButton>
                                    <div className="hidden sm:flex items-center justify-center gap-3 py-1.5">
                                        <a
                                            href="https://cal.com/eneas-aldabe-youfep/15min"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[10px] text-white/35 hover:text-white/60 transition-colors duration-200 font-medium tracking-wide"
                                        >
                                            Schedule a call
                                        </a>
                                        <span className="w-px h-2.5 bg-white/[0.04]" />
                                        <a
                                            href="#services"
                                            onClick={() => { setIsMinimized(true) }}
                                            className="text-[10px] text-white/35 hover:text-white/60 transition-colors duration-200 font-medium tracking-wide"
                                        >
                                            View services
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Minimized FAB ── */}
            <AnimatePresence>
                {isVisible && isMinimized && !isPanelOpen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", damping: 18, stiffness: 280 }}
                        className="fixed bottom-6 right-6 z-[997]"
                    >
                        <MagneticButton
                            onClick={() => setIsMinimized(false)}
                            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#0A0A0A] border border-white/[0.06] text-white shadow-[0_8px_30px_-8px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_40px_-8px_rgba(196,163,90,0.15)] hover:border-[#C4A35A]/15 transition-all duration-300"
                        >
                            {/* Pulsing ring */}
                            <motion.span
                                className="absolute inset-0 rounded-full border border-[#C4A35A]/10"
                                animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                            />
                            <MessageCircle className="h-5 w-5 text-white/50 group-hover:text-white/80 transition-colors duration-200" />
                            {/* Notification dot */}
                            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C4A35A] opacity-30" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C4A35A] border-2 border-[#0A0A0A]" />
                            </span>
                        </MagneticButton>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
