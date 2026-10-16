"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "framer-motion"

import { BUILDER_STEPS, BUSINESSES, type BuilderItem } from "./content"
import { Arrow, Chip, EASE } from "./ui"

/**
 * Interactive business builder: a client arrives with one request and, step by
 * step (Foundation → Build → Automate → Grow), ends up with a connected set of
 * solutions. The right panel keeps the whole stack in view, so the reader sees
 * one sale turn into many, and how much of it bills monthly.
 *
 * It plays by itself while in view; the first click hands control to the reader.
 */

const STEP_MS = 5200

export function BusinessBuilder() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { margin: "-20% 0px -20% 0px" })
    const reduced = useReducedMotion()
    const [business, setBusiness] = useState(0)
    const [step, setStep] = useState(0)
    const [auto, setAuto] = useState(true)
    const [hovered, setHovered] = useState(false)

    const playing = auto && inView && !hovered && !reduced
    const current = BUSINESSES[business]
    const stepDef = BUILDER_STEPS[step]
    const last = step === BUILDER_STEPS.length - 1

    useEffect(() => {
        if (!playing) return
        const t = window.setTimeout(() => {
            if (step < BUILDER_STEPS.length - 1) setStep(step + 1)
            else {
                setStep(0)
                setBusiness((b) => (b + 1) % BUSINESSES.length)
            }
        }, STEP_MS)
        return () => window.clearTimeout(t)
    }, [playing, step, business])

    const take = () => setAuto(false)
    const goStep = (i: number) => {
        take()
        setStep(i)
    }
    const goBusiness = (i: number) => {
        take()
        setBusiness(i)
        setStep(0)
    }
    const next = () => {
        take()
        setStep(last ? 0 : step + 1)
    }
    const back = () => {
        take()
        setStep(Math.max(0, step - 1))
    }

    const built = BUILDER_STEPS.slice(0, step + 1).flatMap((s) => current.steps[s.key])
    const monthly = built.filter((i) => i.billing === "Monthly").length

    return (
        <div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="overflow-hidden rounded-[28px] border border-[#ddd5cc] bg-[#fdfbf7] shadow-[0_40px_120px_-60px_rgba(68,12,21,0.45)]"
        >
            {/* Client type + step counter */}
            <div className="flex flex-col gap-4 border-b border-[#ddd5cc] px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-[#79665f]">The client</span>
                    <div className="relative flex flex-wrap gap-1 rounded-full border border-[#ddd5cc] bg-[#f3eee8] p-1" role="group" aria-label="Type of business">
                        {BUSINESSES.map((b, i) => (
                            <button
                                key={b.key}
                                type="button"
                                aria-pressed={i === business}
                                onClick={() => goBusiness(i)}
                                className={`relative rounded-full px-3.5 py-1.5 text-[12.5px] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#440c15] ${i === business ? "text-[#fdfbf7]" : "text-[#440c15]/70 hover:text-[#440c15]"}`}
                            >
                                {i === business && (
                                    <motion.span
                                        layoutId="builder-business"
                                        className="absolute inset-0 rounded-full bg-[#440c15]"
                                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                                    />
                                )}
                                <span className="relative">{b.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#79665f]">
                    {auto && !reduced && (
                        <span className="flex items-center gap-1.5">
                            <span className={`h-1.5 w-1.5 rounded-full ${playing ? "bg-[#8d9661]" : "bg-[#ddd5cc]"}`} />
                            {playing ? "Auto" : "Paused"}
                        </span>
                    )}
                    <span className="tabular-nums text-[#440c15]">
                        Step {String(step + 1).padStart(2, "0")} / {String(BUILDER_STEPS.length).padStart(2, "0")}
                    </span>
                </div>
            </div>

            {/* Step tabs */}
            <div className="grid grid-cols-4 border-b border-[#ddd5cc]" role="group" aria-label="Stage of the business">
                {BUILDER_STEPS.map((s, i) => {
                    const done = i < step
                    const on = i === step
                    return (
                        <button
                            key={s.key}
                            type="button"
                            aria-pressed={on}
                            onClick={() => goStep(i)}
                            className={`group relative px-3 pb-4 pt-4 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#440c15] md:px-8 md:pt-5 ${i > 0 ? "border-l border-[#ddd5cc]" : ""} ${on ? "bg-[#f3eee8]" : "hover:bg-[#f3eee8]/60"}`}
                        >
                            <span className="block font-mono text-[10px] tabular-nums tracking-[0.14em] text-[#79665f]">{String(i + 1).padStart(2, "0")}</span>
                            <span className={`mt-1 block text-[13px] tracking-[-0.01em] md:text-[15px] ${on || done ? "text-[#440c15]" : "text-[#440c15]/45"}`}>{s.name}</span>
                            <span className="absolute inset-x-0 bottom-0 h-[2px] bg-transparent">
                                {done && <span className="absolute inset-0 bg-[#440c15]/35" />}
                                {on && (
                                    <motion.span
                                        key={`${business}-${step}-${playing}`}
                                        className="absolute inset-y-0 left-0 bg-[#440c15]"
                                        initial={{ width: playing ? "0%" : "100%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: playing ? STEP_MS / 1000 : 0, ease: "linear" }}
                                    />
                                )}
                            </span>
                        </button>
                    )
                })}
            </div>

            <div className="grid lg:grid-cols-[1fr_1.05fr]">
                {/* The step */}
                <div className="flex flex-col px-5 py-8 md:px-10 md:py-12">
                    <div className="flex items-center gap-3 text-[12.5px] text-[#79665f]">
                        <span className="rounded-full border border-[#ddd5cc] px-2.5 py-0.5 text-[10.5px] uppercase tracking-[0.16em]">Arrives with</span>
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                                key={current.key}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.35, ease: EASE }}
                                className="text-[#440c15]"
                            >
                                {current.request}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={`${current.key}-${stepDef.key}`}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.5, ease: EASE }}
                            className="mt-8 flex-1"
                        >
                            <h3 className="text-[2.75rem] font-light leading-none tracking-[-0.05em] text-[#440c15] md:text-[4rem]">{stepDef.name}</h3>
                            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[#79665f]">{stepDef.line}</p>
                            <ul className="mt-8 space-y-2.5">
                                {current.steps[stepDef.key].map((item, i) => (
                                    <motion.li
                                        key={item.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.45, delay: 0.15 + i * 0.08, ease: EASE }}
                                        className="flex items-center justify-between gap-4 border-b border-[#ddd5cc] pb-2.5"
                                    >
                                        <span className="flex items-center gap-3 text-[15px] text-[#440c15]">
                                            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#440c15]" />
                                            {item.name}
                                        </span>
                                        <BillingTag billing={item.billing} />
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </AnimatePresence>

                    {current.note && (
                        <p className="mt-8 rounded-2xl bg-[#f3eee8] px-4 py-3.5 text-[13px] leading-relaxed text-[#440c15]/80">
                            {current.note.text}{" "}
                            <Link href={current.note.href} className="group inline-flex items-center gap-1 font-medium text-[#440c15] underline decoration-[#440c15]/25 underline-offset-4 hover:decoration-[#440c15]">
                                {current.note.link} <Arrow dir="right" />
                            </Link>
                        </p>
                    )}

                    <div className="mt-8 flex items-center gap-3">
                        <button
                            type="button"
                            onClick={back}
                            disabled={step === 0}
                            className="h-11 rounded-full border border-[#ddd5cc] px-5 text-[13px] text-[#440c15] transition-colors hover:border-[#440c15]/40 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            onClick={next}
                            className="group inline-flex h-11 items-center gap-2 rounded-full bg-[#440c15] px-6 text-[13px] font-medium text-[#fdfbf7] transition-colors hover:bg-[#2c0405]"
                        >
                            {last ? "Start again" : `Next: ${BUILDER_STEPS[step + 1].name}`}
                            <Arrow dir="right" />
                        </button>
                    </div>
                </div>

                {/* The stack */}
                <div className="relative border-t border-[#ddd5cc] bg-[#f3eee8] px-5 py-8 md:px-10 md:py-12 lg:border-l lg:border-t-0">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <p className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-[#79665f]">Leaves with</p>
                            <p className="mt-1.5 text-[17px] tracking-[-0.02em] text-[#440c15]">A connected business</p>
                        </div>
                        <div className="flex gap-5 text-right">
                            <Stat value={built.length} label="Solutions" />
                            <Stat value={monthly} label="Monthly" accent />
                        </div>
                    </div>

                    <div className="mt-7 space-y-3">
                        {BUILDER_STEPS.map((s, i) => {
                            const reached = i <= step
                            return (
                                <motion.div
                                    key={s.key}
                                    layout
                                    transition={{ duration: 0.5, ease: EASE }}
                                    className={`rounded-2xl border p-3.5 transition-colors duration-500 ${reached ? "border-[#ddd5cc] bg-[#fdfbf7]" : "border-dashed border-[#440c15]/15 bg-transparent"} ${i === step ? "shadow-[0_18px_40px_-28px_rgba(68,12,21,0.6)]" : ""}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className={`text-[11px] uppercase tracking-[0.16em] ${reached ? "text-[#440c15]" : "text-[#440c15]/35"}`}>
                                            <span className="font-mono tabular-nums">{String(i + 1).padStart(2, "0")}</span> · {s.name}
                                        </span>
                                        {!reached && <span className="text-[11px] text-[#440c15]/35">Next opportunity</span>}
                                    </div>
                                    <AnimatePresence initial={false}>
                                        {reached && (
                                            <motion.div
                                                key={`${current.key}-${s.key}`}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.5, ease: EASE }}
                                                className="overflow-hidden"
                                            >
                                                <div className="flex flex-wrap gap-1.5 pt-3">
                                                    {current.steps[s.key].map((item, j) => (
                                                        <motion.span
                                                            key={item.name}
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.35, delay: 0.1 + j * 0.06, ease: EASE }}
                                                        >
                                                            <Chip tone={item.billing === "Monthly" ? "solid" : "light"}>{item.name}</Chip>
                                                        </motion.span>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )
                        })}
                    </div>

                    <div className="mt-5 flex items-center gap-4 text-[11.5px] text-[#79665f]">
                        <span className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full border border-[#ddd5cc] bg-[#fdfbf7]" /> Project
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#440c15]" /> Monthly
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function BillingTag({ billing }: { billing: BuilderItem["billing"] }) {
    return billing === "Monthly" ? (
        <span className="shrink-0 rounded-full bg-[#440c15] px-2.5 py-0.5 text-[10.5px] uppercase tracking-[0.12em] text-[#fdfbf7]">Monthly</span>
    ) : (
        <span className="shrink-0 rounded-full border border-[#ddd5cc] px-2.5 py-0.5 text-[10.5px] uppercase tracking-[0.12em] text-[#79665f]">Project</span>
    )
}

/** A number that counts to its new value instead of jumping. */
function Stat({ value, label, accent = false }: { value: number; label: string; accent?: boolean }) {
    const [shown, setShown] = useState(value)
    const from = useRef(value)
    useEffect(() => {
        const controls = animate(from.current, value, {
            duration: 0.6,
            ease: EASE,
            onUpdate: (v) => setShown(Math.round(v)),
        })
        from.current = value
        return () => controls.stop()
    }, [value])
    return (
        <div>
            <p className={`text-[2.25rem] font-light leading-none tabular-nums tracking-[-0.04em] ${accent ? "text-[#440c15]" : "text-[#440c15]/60"}`}>{shown}</p>
            <p className="mt-1 text-[10.5px] uppercase tracking-[0.16em] text-[#79665f]">{label}</p>
        </div>
    )
}
