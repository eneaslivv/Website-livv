"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion"

import { LivvSign, SIGN_CURVE_OFFSET, SIGN_CURVE_PEN, SIGN_VIEWBOX, SignLetters } from "@/components/brand/livv-sign"
import { trackCTAClick } from "@/lib/analytics"
import { BusinessBuilder } from "./business-builder"
import {
    AI_SIDE,
    CAPABILITIES,
    CHAPTERS,
    CONTACT,
    DEAL_FLOW,
    HUMAN_SIDE,
    NEEDS,
    NEXT_STEPS,
    PILLARS,
    PREPARED,
    REVENUE_FLOW,
    ROLES,
    SOLUTIONS,
    TICKER,
    WORKFLOW,
    type Capability,
    type ChapterId,
    type Pillar,
    type Solution,
} from "./content"
import { PartnershipModel } from "./partnership-model"
import styles from "./proposal.module.css"
import { SystemMap } from "./system-map"
import { Arrow, Chip, DrawRule, EASE, Icon, Label, Reveal, RiseWords, SHELL, ScrubText, TwoTone } from "./ui"

/**
 * /presentation/wendell — a partnership proposal for Wendell: LIVV as the
 * Digital & AI Solutions Partner behind the clients he brings. It reads like a
 * product page, not a deck: the idea, six capabilities, how AI and people share
 * the work, an interactive builder that turns one request into a connected
 * business, four solutions he can resell, and how we split the work.
 *
 * Brand: LIVV Hub palette (bordeaux, paper, blush, sky, butter, sage), Inter
 * light, two-tone headlines, motion on the house curve. No prices on purpose.
 */

const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(CONTACT.subject)}`

export function WendellProposal() {
    const [chapter, setChapter] = useState<ChapterId>("top")

    useEffect(() => {
        const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[]
        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) if (entry.isIntersecting) setChapter(entry.target.id as ChapterId)
            },
            { rootMargin: "-48% 0px -51% 0px" },
        )
        sections.forEach((s) => io.observe(s))
        return () => io.disconnect()
    }, [])

    return (
        <div className={`${styles.page} relative bg-[#fdfbf7] text-[#440c15] antialiased selection:bg-[#ecd2cc] selection:text-[#2c0405]`}>
            <TopBar chapter={chapter} />
            <main>
                <Hero />
                <Ticker />
                <Idea />
                <Capabilities />
                <Approach />
                <Builder />
                <Solutions />
                <Partnership />
                <Closing />
            </main>
        </div>
    )
}

/* ------------------------------------------------------------------ */
/* Top bar                                                             */
/* ------------------------------------------------------------------ */

function TopBar({ chapter }: { chapter: ChapterId }) {
    const { scrollYProgress } = useScroll()
    const current = CHAPTERS.find((c) => c.id === chapter)!
    const dark = current.tone === "dark"
    return (
        <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-5">
            <div
                className={`pointer-events-auto relative mx-auto flex h-14 max-w-[1240px] items-center justify-between gap-4 overflow-hidden rounded-full border pl-5 pr-2 backdrop-blur-xl transition-colors duration-500 ${dark ? "border-[#fdfbf7]/12 bg-[#2c0405]/55 text-[#fdfbf7]" : "border-[#ddd5cc] bg-[#fdfbf7]/75 text-[#440c15]"}`}
            >
                <Link href="/" className="flex items-center gap-3" aria-label="LIVV home">
                    <LivvSign role="img" aria-label="LIVV" className="h-[18px] w-auto" />
                    <span className={`text-[12.5px] tracking-[-0.01em] transition-colors duration-500 ${dark ? "text-[#ecd2cc]/80" : "text-[#79665f]"}`}>× Wendell</span>
                </Link>

                <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={current.id}
                            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="block text-[11px] uppercase tracking-[0.2em] opacity-75"
                        >
                            {current.label}
                        </motion.span>
                    </AnimatePresence>
                </div>

                <a
                    href={mailto}
                    onClick={() => trackCTAClick("wendell_partnership", "topbar")}
                    className={`group inline-flex h-10 items-center gap-2 rounded-full px-4 text-[12.5px] font-medium transition-colors duration-500 ${dark ? "bg-[#ecd2cc] text-[#2c0405] hover:bg-[#fdfbf7]" : "bg-[#440c15] text-[#fdfbf7] hover:bg-[#2c0405]"}`}
                >
                    Let&apos;s talk <Arrow dir="right" />
                </a>

                <motion.span
                    aria-hidden
                    className={`absolute inset-x-6 bottom-0 h-px origin-left ${dark ? "bg-[#ecd2cc]/70" : "bg-[#440c15]/50"}`}
                    style={{ scaleX: scrollYProgress }}
                />
            </div>
        </header>
    )
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function words(text: string, start: number, step = 70) {
    return text.split(" ").map((w, i, all) => (
        <span key={`${w}-${i}`}>
            <span className={styles.word} style={{ "--d": `${start + i * step}ms` } as CSSProperties}>
                {w}
            </span>
            {i < all.length - 1 ? " " : null}
        </span>
    ))
}

function scrollToId(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 24, behavior: reduced ? "auto" : "smooth" })
}

function Hero() {
    const [cycle, setCycle] = useState(0)
    const [hover, setHover] = useState<Pillar | null>(null)
    const reduced = useReducedMotion()
    const active = hover ?? PILLARS[cycle]

    useEffect(() => {
        if (hover || reduced) return
        const t = window.setInterval(() => setCycle((c) => (c + 1) % PILLARS.length), 5000)
        return () => window.clearInterval(t)
    }, [hover, reduced])

    const pick = (p: Pillar | null) => {
        setHover(p)
        if (p) setCycle(PILLARS.indexOf(p))
    }

    return (
        <section id="top" className="relative isolate overflow-hidden bg-[#2c0405] text-[#fdfbf7]">
            <div className={styles.aurora} aria-hidden>
                <span className={`${styles.blob} ${styles.blobD}`} />
                <span className={`${styles.blob} ${styles.blobA}`} />
                <span className={`${styles.blob} ${styles.blobB}`} />
                <span className={`${styles.blob} ${styles.blobC}`} />
            </div>
            <div className={styles.grain} aria-hidden />

            <div className={`${SHELL} relative grid min-h-[100svh] items-center gap-10 pb-24 pt-28 md:pt-32 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6`}>
                <div className="relative z-10">
                    <div className={`${styles.fadeUp} flex flex-wrap items-center gap-2.5`} style={{ "--d": "80ms" } as CSSProperties}>
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#fdfbf7]/15 bg-[#fdfbf7]/[0.05] px-3 py-1.5 text-[10.5px] uppercase tracking-[0.2em] text-[#ecd2cc]">
                            <span className={`${styles.pulseDot} h-1.5 w-1.5 rounded-full bg-[#ecd2cc] text-[#ecd2cc]`} />
                            Digital solutions / AI + human expertise
                        </span>
                        <span className="rounded-full px-1 text-[11px] text-[#fdfbf7]/50">{PREPARED}</span>
                    </div>

                    <h1 className="mt-8 text-[2.85rem] font-light leading-[0.98] tracking-[-0.055em] md:text-[4.6rem] xl:text-[5.4rem]">
                        <span className={styles.line}>{words("From idea to growth.", 200)}</span>
                        <span className={`${styles.line} text-[#ecd2cc]/80`}>{words("Everything in between.", 480)}</span>
                    </h1>

                    <p className={`${styles.fadeUp} mt-8 max-w-[34rem] text-[16.5px] leading-relaxed text-[#fdfbf7]/72 md:text-[18px]`} style={{ "--d": "900ms" } as CSSProperties}>
                        One partner to strategize, design, build, automate, and grow businesses.{" "}
                        <span className="text-[#fdfbf7]">Powered by AI. Driven by people.</span>
                    </p>

                    <div className={`${styles.fadeUp} mt-9 flex flex-wrap items-center gap-3`} style={{ "--d": "1050ms" } as CSSProperties}>
                        <button
                            type="button"
                            onClick={() => scrollToId("capabilities")}
                            className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-[#fdfbf7] px-6 text-[13.5px] font-medium text-[#2c0405] transition-colors duration-300 hover:bg-[#ecd2cc]"
                        >
                            Explore our solutions <Arrow dir="down" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollToId("partnership")}
                            className="group inline-flex h-12 items-center gap-2 rounded-full border border-[#fdfbf7]/20 px-6 text-[13.5px] text-[#fdfbf7]/85 transition-colors duration-300 hover:border-[#fdfbf7]/45 hover:text-[#fdfbf7]"
                        >
                            How we&apos;d work together <Arrow dir="right" />
                        </button>
                    </div>

                    <div className={`${styles.fadeUp} mt-14 grid max-w-[34rem] grid-cols-3 border-t border-[#fdfbf7]/12`} style={{ "--d": "1250ms" } as CSSProperties}>
                        {PILLARS.map((p, i) => {
                            const on = p === active
                            return (
                                <button
                                    key={p}
                                    type="button"
                                    onMouseEnter={() => pick(p)}
                                    onMouseLeave={() => pick(null)}
                                    onFocus={() => pick(p)}
                                    onBlur={() => pick(null)}
                                    onClick={() => pick(p)}
                                    className="relative pt-4 text-left"
                                >
                                    <span className="absolute inset-x-0 top-[-1px] h-px overflow-hidden">
                                        <span
                                            className={`absolute inset-0 origin-left bg-[#ecd2cc] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${on ? "scale-x-100" : "scale-x-0"}`}
                                        />
                                    </span>
                                    <span className="block font-mono text-[10px] tabular-nums tracking-[0.14em] text-[#fdfbf7]/40">0{i + 1}</span>
                                    <span className={`mt-1 block text-[15px] tracking-[-0.01em] transition-colors duration-500 md:text-[17px] ${on ? "text-[#fdfbf7]" : "text-[#fdfbf7]/45"}`}>{p}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className={`${styles.fadeUp} relative -mx-[4%] w-[108%] max-w-[600px] justify-self-center lg:mx-0 lg:w-full`} style={{ "--d": "300ms" } as CSSProperties}>
                    <SystemMap active={active} onHover={pick} />
                </div>
            </div>

            <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex" aria-hidden>
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#fdfbf7]/45">Scroll</span>
                <span className="relative h-10 w-px overflow-hidden bg-[#fdfbf7]/15">
                    <span className={`${styles.scrollCue} absolute inset-x-0 top-0 h-1/3 bg-[#ecd2cc]`} />
                </span>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/* Ticker                                                              */
/* ------------------------------------------------------------------ */

function Ticker() {
    const row = [...TICKER, ...TICKER]
    return (
        <div className={`${styles.tickerWrap} relative overflow-hidden border-y border-[#fdfbf7]/10 bg-[#2c0405] py-5 text-[#fdfbf7] md:py-6`} aria-label="What we do">
            <div className={styles.ticker}>
                {row.map((item, i) => (
                    <span key={`${item}-${i}`} className="flex items-center whitespace-nowrap text-[1.35rem] font-light tracking-[-0.03em] text-[#fdfbf7]/80 md:text-[1.9rem]" aria-hidden={i >= TICKER.length}>
                        {item}
                        <span aria-hidden className="mx-6 inline-block h-1.5 w-1.5 rounded-full bg-[#ecd2cc]/60 md:mx-9" />
                    </span>
                ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#2c0405] to-transparent md:w-40" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#2c0405] to-transparent md:w-40" />
        </div>
    )
}

/* ------------------------------------------------------------------ */
/* 01 · The idea                                                       */
/* ------------------------------------------------------------------ */

function Idea() {
    return (
        <section id="idea" className="bg-[#fdfbf7] py-28 md:py-40">
            <div className={SHELL}>
                <Label>01 · The idea</Label>
                <ScrubText
                    text="More than a website. The entire business behind it."
                    className="mt-8 max-w-[15em] text-[2.6rem] font-light leading-[1.02] tracking-[-0.05em] text-[#440c15] md:text-[4.6rem] lg:text-[5.6rem]"
                />

                <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12">
                    <Reveal className="md:col-span-4">
                        <p className="text-[1.6rem] font-light leading-[1.15] tracking-[-0.035em] text-[#440c15] md:text-[1.9rem]">
                            One partner. <span className="text-[#79665f]">Endless possibilities.</span>
                        </p>
                    </Reveal>
                    <Reveal className="space-y-5 text-[16px] leading-relaxed text-[#440c15]/75 md:col-span-7 md:col-start-6 md:text-[17px]" delay={0.1}>
                        <p>
                            We help businesses launch, operate, and grow by combining strategy, design, development, automation, AI, and digital
                            marketing.
                        </p>
                        <p>
                            From building a brand and launching its first website to connecting systems and scaling customer acquisition, we bring the
                            right solutions together.
                        </p>
                        <p className="text-[#440c15]">Powered by AI. Driven by people.</p>
                    </Reveal>
                </div>

                <div className="mt-20 md:mt-28">
                    <Reveal>
                        <p className="max-w-xl text-[15px] leading-relaxed text-[#79665f]">
                            A successful business needs more than a great digital presence. It needs:
                        </p>
                    </Reveal>
                    <ol className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-5">
                        {NEEDS.map((need, i) => (
                            <li key={need}>
                                <DrawRule delay={i * 0.12} className="!bg-[#440c15]/25" />
                                <Reveal delay={0.15 + i * 0.12} y={12}>
                                    <span className="mt-4 block font-mono text-[10.5px] tabular-nums tracking-[0.14em] text-[#79665f]">0{i + 1}</span>
                                    <span className="mt-2 block text-[17px] leading-snug tracking-[-0.02em] text-[#440c15] md:text-[19px]">{need}</span>
                                </Reveal>
                            </li>
                        ))}
                        <li className="col-span-2 md:col-span-5">
                            <Reveal delay={0.8} className="flex items-center gap-3 pt-2 text-[17px] text-[#440c15] md:text-[19px]">
                                <span aria-hidden className="h-px w-10 bg-[#440c15]" />
                                That&apos;s where we come in.
                            </Reveal>
                        </li>
                    </ol>
                </div>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/* 02 · Capabilities                                                   */
/* ------------------------------------------------------------------ */

function Capabilities() {
    return (
        <section id="capabilities" className="bg-[#f3eee8] py-28 md:py-36">
            <div className={SHELL}>
                <div className="grid gap-8 md:grid-cols-12 md:items-end">
                    <div className="md:col-span-7">
                        <Label>02 · Capabilities</Label>
                        <TwoTone a="What we can build" b="together." className="mt-6" />
                    </div>
                    <Reveal className="md:col-span-4 md:col-start-9" delay={0.1}>
                        <p className="text-[15.5px] leading-relaxed text-[#440c15]/70">
                            Not a list of tools. Six capabilities, organized the way a business actually buys them, so they&apos;re easy to explain
                            to any client.
                        </p>
                    </Reveal>
                </div>

                <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
                    {CAPABILITIES.map((c, i) => (
                        <Reveal key={c.title} delay={(i % 3) * 0.08} className="h-full">
                            <CapabilityCard capability={c} index={i} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

function CapabilityCard({ capability, index }: { capability: Capability; index: number }) {
    return (
        <article
            className={`${styles.card} group relative h-full overflow-hidden rounded-[22px] border border-[#ddd5cc] bg-[#fdfbf7] p-6 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-[#440c15]/25 hover:shadow-[0_30px_60px_-40px_rgba(68,12,21,0.55)] motion-reduce:transform-none md:p-7`}
        >
            <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between">
                    <span className="font-mono text-[11px] tabular-nums tracking-[0.14em] text-[#79665f]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="flex items-center gap-2">
                        {capability.recurring && <Chip tone="solid" className="!py-0.5 !text-[10px] uppercase !tracking-[0.12em]">Recurring</Chip>}
                        <span className="grid h-11 w-11 place-items-center rounded-full border border-[#ddd5cc] bg-[#f3eee8] text-[#440c15] transition-colors duration-500 group-hover:border-[#440c15] group-hover:bg-[#440c15] group-hover:text-[#fdfbf7]">
                            <Icon name={capability.icon} className="h-[22px] w-[22px]" />
                        </span>
                    </span>
                </div>
                <h3 className="mt-10 text-[1.5rem] font-light leading-[1.1] tracking-[-0.035em] text-[#440c15] md:text-[1.65rem]">{capability.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-[#440c15]/65">{capability.body}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-8">
                    {capability.chips.map((chip, i) => (
                        <span
                            key={chip}
                            className="translate-y-0 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-0.5 motion-reduce:transform-none"
                            style={{ transitionDelay: `${i * 30}ms` }}
                        >
                            <Chip tone="ghost">{chip}</Chip>
                        </span>
                    ))}
                </div>
            </div>
        </article>
    )
}

/* ------------------------------------------------------------------ */
/* 03 · Our approach                                                   */
/* ------------------------------------------------------------------ */

function Approach() {
    return (
        <section id="approach" className="relative overflow-hidden bg-[#2c0405] py-28 text-[#fdfbf7] md:py-40">
            <div className={styles.grain} aria-hidden />
            <div
                aria-hidden
                className="pointer-events-none absolute -right-[20%] top-[-10%] h-[70vw] w-[70vw] rounded-full bg-[radial-gradient(circle,rgba(130,43,46,0.55),transparent_65%)] blur-2xl"
            />
            <div className={`${SHELL} relative`}>
                <div className="grid gap-10 md:grid-cols-12 md:items-end">
                    <div className="md:col-span-8">
                        <Label dark>03 · Our approach</Label>
                        <TwoTone a="AI makes us faster." b="People make it better." dark size="xl" className="mt-6" />
                    </div>
                    <Reveal className="md:col-span-4" delay={0.1}>
                        <p className="text-[15.5px] leading-relaxed text-[#fdfbf7]/70">
                            We use AI to accelerate research, creative production, development, and operations. Strategy, creativity, quality, and
                            critical decisions remain human-led.
                        </p>
                    </Reveal>
                </div>

                <div className="relative mt-16 grid gap-4 md:mt-24 md:grid-cols-2">
                    <SidePanel title="AI-powered" items={AI_SIDE} body="Moves faster, automates repetitive work, explores more ideas and makes production efficient." />
                    <SidePanel title="Human-led" items={HUMAN_SIDE} body="Every solution gets thoughtful strategy, creative direction, careful implementation and quality control." light />
                    <div
                        aria-hidden
                        className="absolute left-1/2 top-1/2 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#fdfbf7]/20 bg-[#2c0405] text-[1.5rem] font-light text-[#ecd2cc] md:grid"
                    >
                        +
                    </div>
                </div>

                <Workflow />

                <div className="mt-24 md:mt-32">
                    <TwoTone a="Less busywork." b="More meaningful work." dark as="p" />
                </div>
            </div>
        </section>
    )
}

function SidePanel({ title, items, body, light = false }: { title: string; items: string[]; body: string; light?: boolean }) {
    return (
        <Reveal className="h-full" delay={light ? 0.12 : 0}>
            <div
                className={`flex h-full flex-col rounded-[24px] p-7 md:p-10 ${light ? "bg-[#ecd2cc] text-[#2c0405]" : "border border-[#fdfbf7]/12 bg-[#fdfbf7]/[0.04] text-[#fdfbf7]"}`}
            >
                <p className={`text-[10.5px] uppercase tracking-[0.2em] ${light ? "text-[#2c0405]/60" : "text-[#ecd2cc]/70"}`}>{title}</p>
                <ul className="mt-8 space-y-1">
                    {items.map((item, i) => (
                        <li key={item} className="text-[2.1rem] font-light leading-[1.12] tracking-[-0.045em] md:text-[2.75rem]">
                            <RiseWords text={item} delay={0.1 + i * 0.08} />
                        </li>
                    ))}
                </ul>
                <p className={`mt-auto pt-10 text-[14.5px] leading-relaxed ${light ? "text-[#2c0405]/70" : "text-[#fdfbf7]/60"}`}>{body}</p>
            </div>
        </Reveal>
    )
}

/** Two lanes, one workflow: a playhead scrubs across the steps as you scroll. */
function Workflow() {
    const ref = useRef<HTMLDivElement>(null)
    const reduced = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 40%"] })
    const head = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
    const [reached, setReached] = useState(reduced ? WORKFLOW.length - 1 : -1)
    const [hover, setHover] = useState<number | null>(null)
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (!reduced) setReached(Math.min(WORKFLOW.length - 1, Math.floor(v * WORKFLOW.length + 0.15)))
    })
    const focus = hover ?? Math.max(0, reached)
    const n = WORKFLOW.length

    return (
        <div ref={ref} className="mt-20 rounded-[28px] border border-[#fdfbf7]/10 bg-[#fdfbf7]/[0.025] p-5 md:mt-28 md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-[1.35rem] font-light tracking-[-0.03em] md:text-[1.6rem]">
                    One workflow. <span className="text-[#ecd2cc]/70">Two lanes.</span>
                </p>
                <div className="flex items-center gap-4 text-[11.5px] text-[#fdfbf7]/60">
                    <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#afc3d8]" /> AI
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#ecd2cc]" /> People
                    </span>
                </div>
            </div>

            {/* Desktop lanes */}
            <div className="relative mt-10 hidden md:block">
                <div className="grid grid-cols-[72px_1fr]">
                    <div className="relative h-[150px] text-[10.5px] uppercase tracking-[0.18em] text-[#fdfbf7]/45">
                        <span className="absolute top-[25%] -translate-y-1/2">AI</span>
                        <span className="absolute top-[75%] -translate-y-1/2">People</span>
                    </div>
                    <div className="relative h-[150px]">
                        <span className="absolute inset-x-0 top-[25%] h-px bg-[#afc3d8]/25" />
                        <span className="absolute inset-x-0 top-[75%] h-px bg-[#ecd2cc]/25" />
                        <motion.span className="absolute inset-y-0 w-px bg-[#fff6be]/50" style={{ left: reduced ? "100%" : head }} />
                        <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
                            {WORKFLOW.map((w, i) => {
                                const on = i <= reached
                                const ai = w.lane !== "human"
                                const human = w.lane !== "ai"
                                return (
                                    <button
                                        key={w.step}
                                        type="button"
                                        onMouseEnter={() => setHover(i)}
                                        onMouseLeave={() => setHover(null)}
                                        onFocus={() => setHover(i)}
                                        onBlur={() => setHover(null)}
                                        className="group relative"
                                        aria-label={`${w.step}: ${w.note}`}
                                    >
                                        {ai && human && (
                                            <span
                                                className={`absolute left-1/2 top-[25%] h-1/2 w-px -translate-x-1/2 transition-colors duration-500 ${on ? "bg-[#fdfbf7]/45" : "bg-[#fdfbf7]/10"}`}
                                            />
                                        )}
                                        {ai && <Dot on={on} focus={focus === i} color="#afc3d8" top="25%" />}
                                        {human && <Dot on={on} focus={focus === i} color="#ecd2cc" top="75%" />}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="ml-[72px] mt-4 grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
                    {WORKFLOW.map((w, i) => (
                        <span
                            key={w.step}
                            className={`text-center text-[13px] tracking-[-0.01em] transition-colors duration-500 ${focus === i ? "text-[#fdfbf7]" : i <= reached ? "text-[#fdfbf7]/60" : "text-[#fdfbf7]/30"}`}
                        >
                            {w.step}
                        </span>
                    ))}
                </div>
                <div className="ml-[72px] mt-8 min-h-[3.5rem] border-t border-[#fdfbf7]/10 pt-5">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.p
                            key={focus}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className="text-[15px] text-[#fdfbf7]/75"
                        >
                            <span className="text-[#fdfbf7]">{WORKFLOW[focus].step}.</span> {WORKFLOW[focus].note}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>

            {/* Mobile list */}
            <ol className="mt-8 space-y-0 md:hidden">
                {WORKFLOW.map((w, i) => (
                    <li key={w.step} className="border-t border-[#fdfbf7]/10 py-4">
                        <Reveal y={10} delay={i * 0.04}>
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-[16px] tracking-[-0.015em]">{w.step}</span>
                                <span className="flex gap-1.5">
                                    {w.lane !== "human" && <span className="rounded-full bg-[#afc3d8]/20 px-2 py-0.5 text-[10.5px] text-[#afc3d8]">AI</span>}
                                    {w.lane !== "ai" && <span className="rounded-full bg-[#ecd2cc]/20 px-2 py-0.5 text-[10.5px] text-[#ecd2cc]">People</span>}
                                </span>
                            </div>
                            <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#fdfbf7]/60">{w.note}</p>
                        </Reveal>
                    </li>
                ))}
            </ol>
        </div>
    )
}

function Dot({ on, focus, color, top }: { on: boolean; focus: boolean; color: string; top: string }) {
    return (
        <span
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
            style={{
                top,
                width: focus ? 16 : on ? 11 : 9,
                height: focus ? 16 : on ? 11 : 9,
                background: on ? color : "transparent",
                border: `1px solid ${color}`,
                opacity: on ? 1 : 0.4,
                boxShadow: focus ? `0 0 0 5px ${color}1f` : "none",
            }}
        />
    )
}

/* ------------------------------------------------------------------ */
/* 04 · Business builder                                               */
/* ------------------------------------------------------------------ */

function Builder() {
    return (
        <section id="builder" className="bg-[#fdfbf7] py-28 md:py-36">
            <div className={SHELL}>
                <div className="grid gap-8 md:grid-cols-12 md:items-end">
                    <div className="md:col-span-7">
                        <Label>04 · Business builder</Label>
                        <TwoTone a="Watch a business" b="come together." className="mt-6" />
                    </div>
                    <Reveal className="md:col-span-4 md:col-start-9" delay={0.1}>
                        <p className="text-[15.5px] leading-relaxed text-[#440c15]/70">
                            Most clients arrive with one request. Pick a business and follow it from that first need to a connected operation, with
                            everything you could sell along the way.
                        </p>
                    </Reveal>
                </div>
                <Reveal className="mt-14 md:mt-20">
                    <BusinessBuilder />
                </Reveal>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/* 05 · What you can sell                                              */
/* ------------------------------------------------------------------ */

function Solutions() {
    return (
        <section id="solutions" className="bg-[#f3eee8] py-28 md:py-36">
            <div className={SHELL}>
                <div className="grid gap-8 md:grid-cols-12 md:items-end">
                    <div className="md:col-span-8">
                        <Label>05 · What you can sell</Label>
                        <TwoTone a="Solutions built around" b="every stage of a business." className="mt-6" />
                    </div>
                    <Reveal className="md:col-span-4" delay={0.1}>
                        <p className="text-[15.5px] leading-relaxed text-[#440c15]/70">
                            Four products, packaged so they&apos;re easy to explain, easy to quote, and easy to grow from.
                        </p>
                    </Reveal>
                </div>

                <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2">
                    {SOLUTIONS.map((s, i) => (
                        <Reveal key={s.name} delay={(i % 2) * 0.1} className="h-full">
                            <SolutionCard solution={s} index={i} />
                        </Reveal>
                    ))}
                </div>

                <RevenueFlow />
            </div>
        </section>
    )
}

function SolutionCard({ solution, index }: { solution: Solution; index: number }) {
    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-[#ddd5cc] bg-[#fdfbf7] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:shadow-[0_40px_80px_-50px_rgba(68,12,21,0.6)] motion-reduce:transform-none">
            <div className="relative h-44 overflow-hidden md:h-52">
                <div
                    aria-hidden
                    className="absolute inset-[-20%] transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-[5%] group-hover:translate-x-[6%] group-hover:scale-110 motion-reduce:transform-none"
                    style={{ background: solution.wash }}
                />
                <div className={styles.grain} aria-hidden />
                <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
                    <div className="flex items-center justify-between">
                        <span className="text-[10.5px] uppercase tracking-[0.2em] text-[#440c15]/70">Solution {String(index + 1).padStart(2, "0")}</span>
                        <span className="flex gap-1.5">
                            {solution.billing.map((b) => (
                                <span
                                    key={b}
                                    className={`rounded-full px-2.5 py-0.5 text-[10.5px] uppercase tracking-[0.12em] ${b === "Monthly" ? "bg-[#440c15] text-[#fdfbf7]" : "bg-[#fdfbf7]/70 text-[#440c15] backdrop-blur"}`}
                                >
                                    {b}
                                </span>
                            ))}
                        </span>
                    </div>
                    <h3 className="text-[2rem] font-light leading-none tracking-[-0.045em] text-[#440c15] md:text-[2.6rem]">{solution.name}</h3>
                </div>
            </div>
            <div className="flex flex-1 flex-col p-6 md:p-8">
                <p className="text-[18px] tracking-[-0.02em] text-[#440c15]">{solution.tagline}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                    {solution.includes.map((item) => (
                        <Chip key={item} tone="ghost">
                            {item}
                        </Chip>
                    ))}
                </div>
                <div className="mt-auto pt-8">
                    <div className="flex items-start gap-3 border-t border-[#ddd5cc] pt-5 text-[13.5px] leading-relaxed text-[#440c15]/70">
                        <span className="shrink-0 text-[10.5px] uppercase tracking-[0.16em] text-[#79665f] [line-height:1.9]">Ideal for</span>
                        {solution.idealFor}
                    </div>
                </div>
            </div>
        </article>
    )
}

function RevenueFlow() {
    return (
        <Reveal className="mt-4">
            <div className="relative overflow-hidden rounded-[26px] bg-[#440c15] p-7 text-[#fdfbf7] md:p-10">
                <div className={styles.grain} aria-hidden />
                <div className="relative grid gap-8 md:grid-cols-12 md:items-center">
                    <p className="text-[1.6rem] font-light leading-[1.1] tracking-[-0.035em] md:col-span-4 md:text-[2rem]">
                        First sale. <span className="text-[#ecd2cc]/75">Then recurring revenue.</span>
                    </p>
                    <ol className="grid gap-6 sm:grid-cols-3 md:col-span-8">
                        {REVENUE_FLOW.map((step, i) => (
                            <li key={step.title} className="relative">
                                <div className="flex items-center gap-3">
                                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#ecd2cc]/40 font-mono text-[11px] text-[#ecd2cc]">{i + 1}</span>
                                    {i < REVENUE_FLOW.length - 1 && <DrawRule dark delay={0.3 + i * 0.25} className="hidden flex-1 !bg-[#ecd2cc]/30 sm:block" />}
                                </div>
                                <p className="mt-4 text-[17px] tracking-[-0.02em]">{step.title}</p>
                                <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#fdfbf7]/60">{step.body}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </Reveal>
    )
}

/* ------------------------------------------------------------------ */
/* 06 · Working together                                               */
/* ------------------------------------------------------------------ */

function Partnership() {
    return (
        <section id="partnership" className="relative overflow-hidden bg-[#2c0405] py-28 text-[#fdfbf7] md:py-40">
            <div className={styles.grain} aria-hidden />
            <div
                aria-hidden
                className="pointer-events-none absolute -left-[25%] bottom-[-20%] h-[70vw] w-[70vw] rounded-full bg-[radial-gradient(circle,rgba(175,195,216,0.16),transparent_65%)] blur-2xl"
            />
            <div className={`${SHELL} relative`}>
                <Label dark>06 · Working together</Label>
                <TwoTone a="Your clients. Our expertise." b="Shared opportunities." dark size="xl" className="mt-6 max-w-[14em]" />

                <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12">
                    <div className="space-y-5 text-[16px] leading-relaxed text-[#fdfbf7]/70 lg:col-span-5">
                        <Reveal>
                            <p>
                                We work as a flexible creative and technology partner, so you can deliver a much broader range of digital solutions
                                without building every capability in-house.
                            </p>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <p>From individual projects to ongoing retainers, we can collaborate behind the scenes or directly with your clients.</p>
                        </Reveal>
                        <Reveal delay={0.16}>
                            <p className="text-[#fdfbf7]">
                                You focus on relationships and on spotting opportunities. We turn those opportunities into working solutions.
                            </p>
                        </Reveal>

                        <div className="grid grid-cols-2 gap-3 pt-6">
                            {[ROLES.wendell, ROLES.livv].map((r, i) => (
                                <Reveal key={r.name} delay={0.2 + i * 0.08} className="h-full">
                                    <div className={`h-full rounded-[20px] p-5 ${i === 0 ? "bg-[#ecd2cc] text-[#2c0405]" : "border border-[#fdfbf7]/12 bg-[#fdfbf7]/[0.04]"}`}>
                                        <p className="text-[17px] tracking-[-0.02em]">{r.name}</p>
                                        <p className={`mt-1 text-[12px] leading-snug ${i === 0 ? "text-[#2c0405]/65" : "text-[#fdfbf7]/55"}`}>{r.role}</p>
                                        <ul className="mt-4 space-y-2">
                                            {r.does.map((d) => (
                                                <li key={d} className={`flex gap-2 text-[13px] leading-snug ${i === 0 ? "text-[#2c0405]/85" : "text-[#fdfbf7]/80"}`}>
                                                    <span aria-hidden className={`mt-[7px] h-1 w-1 shrink-0 rounded-full ${i === 0 ? "bg-[#2c0405]" : "bg-[#ecd2cc]"}`} />
                                                    {d}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    <Reveal className="lg:col-span-7" delay={0.1}>
                        <PartnershipModel />
                    </Reveal>
                </div>

                <div className="mt-24 md:mt-32">
                    <p className="text-[10.5px] uppercase tracking-[0.2em] text-[#ecd2cc]/70">How a deal flows</p>
                    <ol className="mt-8 grid gap-8 md:grid-cols-4 md:gap-6">
                        {DEAL_FLOW.map((step, i) => (
                            <li key={step.title}>
                                <div className="flex items-center gap-3">
                                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#fdfbf7] font-mono text-[11px] text-[#2c0405]">0{i + 1}</span>
                                    <DrawRule dark delay={0.2 + i * 0.2} className="flex-1" />
                                </div>
                                <Reveal delay={0.1 + i * 0.12} y={12}>
                                    <p className="mt-5 text-[19px] tracking-[-0.025em]">{step.title}</p>
                                    <p className="mt-2 text-[14px] leading-relaxed text-[#fdfbf7]/60">{step.body}</p>
                                </Reveal>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/* Closing                                                             */
/* ------------------------------------------------------------------ */

function Closing() {
    const signRef = useRef<SVGSVGElement>(null)
    const [drawn, setDrawn] = useState(false)
    useEffect(() => {
        const el = signRef.current
        if (!el) return
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                setDrawn(true)
                io.disconnect()
            }
        }, { threshold: 0.6 })
        io.observe(el)
        return () => io.disconnect()
    }, [])

    return (
        <section id="next" className={`${styles.closing} relative overflow-hidden pb-10 pt-28 md:pt-40`}>
            <div className={styles.grain} aria-hidden />
            <div className={`${SHELL} relative`}>
                <svg
                    ref={signRef}
                    viewBox={SIGN_VIEWBOX}
                    className={`h-12 w-auto text-[#440c15] md:h-16 ${drawn ? styles.signDrawn : ""}`}
                    role="img"
                    aria-label="LIVV"
                >
                    <SignLetters fill="currentColor" />
                    <g transform={`translate(${SIGN_CURVE_OFFSET.x} ${SIGN_CURVE_OFFSET.y})`}>
                        <path
                            className={styles.signPen}
                            d={SIGN_CURVE_PEN.path}
                            pathLength={1}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={SIGN_CURVE_PEN.width}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                </svg>

                <TwoTone a="Let's build" b="what's next." size="xl" className="mt-10" />

                <div className="mt-14 grid gap-12 md:grid-cols-12 md:items-end">
                    <div className="md:col-span-6">
                        <p className="text-[10.5px] uppercase tracking-[0.2em] text-[#79665f]">Next steps</p>
                        <ol className="mt-5">
                            {NEXT_STEPS.map((s, i) => (
                                <li key={s}>
                                    <DrawRule className="!bg-[#440c15]/20" delay={i * 0.1} />
                                    <Reveal delay={0.1 + i * 0.1} y={10} className="flex gap-5 py-4">
                                        <span className="font-mono text-[11px] tabular-nums text-[#79665f] [line-height:1.9]">0{i + 1}</span>
                                        <span className="text-[17px] tracking-[-0.02em] text-[#440c15] md:text-[19px]">{s}</span>
                                    </Reveal>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <Reveal className="flex flex-col items-start gap-4 md:col-span-5 md:col-start-8 md:items-end" delay={0.15}>
                        <a
                            href={mailto}
                            onClick={() => trackCTAClick("wendell_partnership", "closing")}
                            className="group inline-flex h-16 items-center gap-3 rounded-full bg-[#440c15] pl-8 pr-3 text-[16px] font-medium text-[#fdfbf7] shadow-[0_24px_60px_-28px_rgba(68,12,21,0.9)] transition-colors duration-300 hover:bg-[#2c0405]"
                        >
                            Explore a partnership
                            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ecd2cc] text-[#2c0405] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:rotate-[-45deg]">
                                →
                            </span>
                        </a>
                        <Link href="/work" className="group inline-flex items-center gap-1.5 text-[14px] text-[#440c15]/75 underline decoration-[#440c15]/25 underline-offset-4 hover:text-[#440c15] hover:decoration-[#440c15]">
                            See our work <Arrow dir="up-right" />
                        </Link>
                    </Reveal>
                </div>

                <footer className="mt-28 flex flex-col gap-3 border-t border-[#440c15]/15 pt-6 text-[12px] text-[#79665f] md:flex-row md:items-center md:justify-between">
                    <span>{PREPARED}</span>
                    <span>
                        LIVV Creative Studio ·{" "}
                        <a href={mailto} className="hover:text-[#440c15]">
                            {CONTACT.email}
                        </a>
                    </span>
                </footer>
            </div>
        </section>
    )
}

