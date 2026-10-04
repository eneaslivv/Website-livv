"use client"

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import type { Project } from "@/lib/marketplace-data"

/**
 * Interactive product picker in one compact block, about half a viewport tall
 * on desktop: the section's headline and the list of LIVV products on the
 * left, a live field on the right, and a small "system" card that shows what
 * the selected product does.
 *
 * The field keeps the idea of the Spectrum study (preview.html) — clouds of
 * colour that dissolve into dust and binary digits — in the brand palette of
 * the LIVV Hub guide (03.4, atmospheric gradient): sky, butter, blush and sage
 * washes on paper, with the digits printed in bordeaux.
 *
 * Every number in the card is illustrative and the card says so ("Sample data").
 */

type Snapshot = {
    /** Card title at rest */
    status: string
    /** Card title while the card "loads" the newly picked product */
    working: string
    description: string
    total: number
    rows: [label: string, value: string][]
    meters: [label: string, fill: number, display: string][]
    meta: string
}

const SNAPSHOTS: Record<string, Snapshot> = {
    payper: {
        status: "Service live",
        working: "Syncing venues",
        description: "Orders tonight across 3 bars and 2 events, with payments and stock in sync.",
        total: 1284,
        rows: [
            ["TABLE 12 · QR ORDER", "$86"],
            ["BAR 2 · GIN BELOW PAR", "LOW"],
        ],
        meters: [
            ["PAYMENTS OK", 99, "99%"],
            ["BAR STOCK", 82, "82%"],
        ],
        meta: "ORDERS/HR 212",
    },
    prtool: {
        status: "Campaigns on track",
        working: "Checking deliverables",
        description: "Posts delivered this month by 36 creators across 4 campaigns.",
        total: 128,
        rows: [
            ["BRIEF APPROVED · SUMMER DROP", "3/3"],
            ["PAYOUTS READY · 12 CREATORS", "$4.8K"],
        ],
        meters: [
            ["DELIVERED", 74, "74%"],
            ["ON TIME", 92, "92%"],
        ],
        meta: "CAMPAIGNS 4",
    },
    legalflow: {
        status: "Contracts on track",
        working: "Drafting contract",
        description: "Contracts this month, each tied to its client, its tasks and its dates.",
        total: 42,
        rows: [
            ["LEASE DRAFT · IN REVIEW", "TODAY"],
            ["HEARING · MON 11:30", "AGENDA"],
        ],
        meters: [
            ["SIGNED", 68, "68%"],
            ["TASKS ON TIME", 94, "94%"],
        ],
        meta: "CLIENTS 10",
    },
    registrar: {
        status: "Month balanced",
        working: "Transcribing entry",
        description: "Entries logged by voice this month, categorized as they were spoken.",
        total: 218,
        rows: [
            ["VOICE · GROCERIES", "−$45"],
            ["INCOME · DESIGN INVOICE", "+$1.2K"],
        ],
        meters: [
            ["BUDGET USED", 64, "64%"],
            ["SAVED", 22, "22%"],
        ],
        meta: "SEPTEMBER",
    },
    "pm-agent": {
        status: "Plan ready",
        working: "Breaking down goal",
        description: "Tasks generated from one goal, each with an owner and a date.",
        total: 24,
        rows: [
            ["LANDING PAGE · ANA", "FRI"],
            ["QA CHECKOUT · LEO", "TUE"],
        ],
        meters: [
            ["ASSIGNED", 100, "100%"],
            ["ON SCHEDULE", 87, "87%"],
        ],
        meta: "OWNERS 6",
    },
}

/** Products added to the catalogue later still render: modules, no numbers. */
function snapshotFor(product: Project): Snapshot {
    return (
        SNAPSHOTS[product.slug] ?? {
            status: product.title,
            working: "Loading",
            description: product.outcome,
            total: product.modules.length,
            rows: product.modules.slice(0, 2).map((m) => [m.toUpperCase(), "ON"] as [string, string]),
            meters: [],
            meta: product.category.toUpperCase(),
        }
    )
}

const SOFTWARE_TYPES: Record<string, string> = {
    payper: "Hospitality software",
    prtool: "Creator campaign software",
    legalflow: "Legal practice software",
    "cms-livv": "Website content management",
}
/** Real brand marks, drawn as a mask so they take the ink of the cover they sit on. */
const LOGOS: Record<string, { src: string; ratio: number; height: number }> = {
    payper: { src: "/images/products/logos/payper.png", ratio: 331 / 140, height: 40 },
    prtool: { src: "/images/products/logos/prtool.svg", ratio: 182 / 94, height: 38 },
}
/**
 * Cover art for the card: the product's own imagery, with its mark in the ink
 * its brand uses on that ground. Products without art wear the LIVV gradient
 * (bordeaux → blush → sage) and their name set in type.
 */
const COVERS: Record<string, { src: string; position: string; tone: "dark" | "light"; logoAt: "left" | "right" }> = {
    payper: { src: "/images/products/payper-hover.jpg", position: "70% 22%", tone: "dark", logoAt: "left" },
    prtool: { src: "/images/products/prtool-cover.webp", position: "0% 30%", tone: "light", logoAt: "right" },
}
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
const WORKING_MS = 920
const COUNT_MS = 880
/** Card width on desktop; the stage scales the card down when it is narrower. */
const CARD_WIDTH = 540

type AnimState = {
    time: number
    sector: number
    sectorTarget: number
    pointer: { x: number; y: number; tx: number; ty: number; active: number; target: number }
    pulse: { x: number; y: number; start: number }
    still: boolean
    redraw: () => void
}

export function ProductSystem({ products, intro }: { products: Project[]; intro?: ReactNode }) {
    const [selected, setSelected] = useState(0)
    const [working, setWorking] = useState(false)
    const [announcement, setAnnouncement] = useState("")
    const [initialTotal] = useState(() => snapshotFor(products[0]).total)

    const stageRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const cardRef = useRef<HTMLElement>(null)
    const countRef = useRef<HTMLSpanElement>(null)
    const buttonsRef = useRef<(HTMLButtonElement | null)[]>([])
    const timers = useRef({ working: 0, count: 0, version: 0 })

    // Read by the render loop every frame, so it lives outside React state.
    const anim = useRef<AnimState>({
        // Starts mid-drift, so the still frame (reduced motion) is a full composition.
        time: 14,
        sector: 0,
        sectorTarget: 0,
        pointer: { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, active: 0, target: 0 },
        pulse: { x: 0.5, y: 0.5, start: -100 },
        still: false,
        redraw: () => {},
    })

    useEffect(() => {
        const stage = stageRef.current
        const canvas = canvasRef.current
        const card = cardRef.current
        if (!stage || !canvas || !card) return

        const a = anim.current
        const t = timers.current
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
        a.still = reducedMotion.matches

        let renderer: Renderer | null = null
        let frame = 0
        let last = 0
        let pageVisible = !document.hidden
        let stageVisible = true

        const draw = () => renderer?.draw(a)
        a.redraw = draw

        const loop = (now: number) => {
            frame = 0
            if (a.still || !pageVisible || !stageVisible || !renderer) return
            const dt = Math.min((now - last) / 1000 || 0.0167, 0.05)
            last = now
            a.time += dt
            const ease = 1 - Math.exp(-dt * 6)
            const p = a.pointer
            p.x += (p.tx - p.x) * ease
            p.y += (p.ty - p.y) * ease
            p.active += (p.target - p.active) * ease
            a.sector += (a.sectorTarget - a.sector) * Math.min(1, dt * 1.8)
            card.style.setProperty("--card-x", `${((p.x - 0.5) * p.active * 3.8).toFixed(2)}px`)
            card.style.setProperty("--card-y", `${((p.y - 0.5) * p.active * 2.6).toFixed(2)}px`)
            draw()
            frame = requestAnimationFrame(loop)
        }
        const start = () => {
            if (frame || !renderer || a.still || !pageVisible || !stageVisible) return
            last = performance.now()
            frame = requestAnimationFrame(loop)
        }
        const stop = () => {
            cancelAnimationFrame(frame)
            frame = 0
        }

        const resize = () => {
            const fit = Math.min(
                1,
                (stage.clientWidth - 56) / CARD_WIDTH,
                (stage.clientHeight - 48) / Math.max(card.offsetHeight, 1),
            )
            stage.style.setProperty("--panel-scale", fit.toFixed(4))
            renderer?.resize(stage.clientWidth, stage.clientHeight)
            if (a.still) draw()
        }

        const onVisibility = () => {
            pageVisible = !document.hidden
            if (pageVisible) start()
            else stop()
        }
        const onMotionPreference = (event: MediaQueryListEvent) => {
            a.still = event.matches
            if (a.still) {
                stop()
                draw()
            } else start()
        }
        document.addEventListener("visibilitychange", onVisibility)
        reducedMotion.addEventListener("change", onMotionPreference)

        const io = new IntersectionObserver(([entry]) => {
            stageVisible = entry.isIntersecting
            if (stageVisible) start()
            else stop()
        })
        io.observe(stage)
        const ro = new ResizeObserver(resize)
        ro.observe(stage)
        ro.observe(card)

        // Without WebGL the stage keeps its CSS gradient; the card works the same.
        const fallback = () => {
            renderer = null
            stage.dataset.renderer = "none"
        }
        const onContextLost = (event: Event) => {
            event.preventDefault()
            stop()
            fallback()
        }
        canvas.addEventListener("webglcontextlost", onContextLost)

        try {
            renderer = createRenderer(canvas)
        } catch (error) {
            console.warn("ProductSystem: WebGL unavailable,", error)
        }
        if (renderer) {
            stage.dataset.renderer = "webgl"
            resize()
            draw()
            start()
        } else fallback()

        return () => {
            stop()
            io.disconnect()
            ro.disconnect()
            document.removeEventListener("visibilitychange", onVisibility)
            reducedMotion.removeEventListener("change", onMotionPreference)
            canvas.removeEventListener("webglcontextlost", onContextLost)
            window.clearTimeout(t.working)
            cancelAnimationFrame(t.count)
            renderer?.dispose()
            a.redraw = () => {}
        }
    }, [])

    const animateCount = (target: number, version: number, instant: boolean) => {
        const el = countRef.current
        const t = timers.current
        if (!el) return
        cancelAnimationFrame(t.count)
        const from = Number(el.textContent?.replace(/\D/g, "")) || 0
        const begin = performance.now()
        const tick = (now: number) => {
            if (version !== t.version) return
            const progress = instant ? 1 : Math.min((now - begin) / COUNT_MS, 1)
            const value = Math.round(from + (target - from) * (1 - Math.pow(1 - progress, 3)))
            el.textContent = value.toLocaleString("en-US")
            if (progress < 1) t.count = requestAnimationFrame(tick)
        }
        tick(begin)
    }

    const select = (index: number) => {
        if (index === selected && !working) return
        const a = anim.current
        const t = timers.current
        const snapshot = snapshotFor(products[index])
        const version = ++t.version
        const instant = a.still

        window.clearTimeout(t.working)
        setSelected(index)
        setWorking(!instant)
        a.sectorTarget = index
        animateCount(snapshot.total, version, instant)
        if (instant) {
            a.sector = index
            a.redraw()
        } else {
            a.pulse = { x: 0.5, y: 0.5, start: a.time }
        }
        t.working = window.setTimeout(
            () => {
                if (version !== t.version) return
                setWorking(false)
                setAnnouncement(`${products[index].title}: ${snapshot.status}. ${snapshot.description}`)
            },
            instant ? 0 : WORKING_MS,
        )
    }

    const onPickerKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const moves: Record<string, number> = {
            ArrowDown: index + 1,
            ArrowRight: index + 1,
            ArrowUp: index - 1,
            ArrowLeft: index - 1,
            Home: 0,
            End: products.length - 1,
        }
        if (!(event.key in moves)) return
        event.preventDefault()
        const next = (moves[event.key] + products.length) % products.length
        buttonsRef.current[next]?.focus()
        select(next)
    }

    const trackPointer = (event: PointerEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const p = anim.current.pointer
        p.tx = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
        p.ty = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height))
        p.target = event.pointerType === "touch" ? 0.6 : 1
    }

    const product = products[selected] ?? products[0]
    const snapshot = snapshotFor(product)
    const logo = LOGOS[product.slug]
    const cover = COVERS[product.slug]
    const reducedMotion = useReducedMotion()

    return (
        <div className="grid border border-[#ddd5cc] lg:min-h-[clamp(400px,50vh,540px)] lg:grid-cols-[minmax(0,6fr)_minmax(0,7fr)] xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            {/* ---------- Headline + picker ---------- */}
            <div className="flex min-w-0 flex-col bg-[#fdfbf7] lg:border-r lg:border-[#ddd5cc]">
                <div className="flex flex-1 flex-col justify-center p-6 xl:px-7">{intro}</div>

                <div
                    role="group"
                    aria-label="Products"
                    className="grid grid-cols-2 gap-px border-t border-[#ddd5cc] bg-[#ddd5cc]"
                >
                    {products.map((p, i) => {
                        const isSelected = i === selected
                        const isLastOdd = products.length % 2 === 1 && i === products.length - 1
                        return (
                            <button
                                key={p.slug}
                                ref={(el) => {
                                    buttonsRef.current[i] = el
                                }}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => select(i)}
                                onKeyDown={(event) => onPickerKeyDown(event, i)}
                                className={`group relative px-4 py-3 text-left text-[14px] tracking-[-0.2px] transition-colors duration-300 hover:bg-white hover:text-[#440c15] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#440c15] sm:px-6 xl:px-7 ${isLastOdd ? "col-span-2" : ""} ${isSelected ? "bg-white text-[#440c15]" : "bg-[#fdfbf7] text-[#440c15]/55"}`}
                            >
                                <span
                                    aria-hidden
                                    className={`absolute left-0 top-1/2 w-0.5 -translate-y-1/2 bg-[#440c15] transition-[height] duration-300 ${isSelected ? "h-5" : "h-0"}`}
                                />
                                <span className="block">{p.title}</span>
                                <span className="mt-0.5 block text-[11px] leading-snug tracking-normal text-[#79665f]">
                                    {SOFTWARE_TYPES[p.slug] ?? p.category}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* ---------- Stage ---------- */}
            <div
                ref={stageRef}
                data-renderer="loading"
                onPointerMove={trackPointer}
                onPointerLeave={() => {
                    anim.current.pointer.target = 0
                }}
                onPointerDown={(event) => {
                    if ((event.target as HTMLElement).closest("article")) return
                    trackPointer(event)
                    const a = anim.current
                    a.pulse = { x: a.pointer.tx, y: a.pointer.ty, start: a.time }
                }}
                className="relative isolate flex min-w-0 items-center touch-pan-y overflow-hidden border-t border-[#ddd5cc] bg-[#fdfbf7] data-[renderer=none]:bg-[image:radial-gradient(ellipse_at_88%_0%,#afc3d8,transparent_52%),radial-gradient(ellipse_at_4%_100%,#ecd2cc,transparent_58%),radial-gradient(ellipse_at_100%_100%,#fff6be,transparent_46%)] lg:block lg:border-t-0"
            >
                <canvas ref={canvasRef} aria-hidden className="absolute inset-0 block h-full w-full" />

                <div className="relative z-[3] mx-auto my-6 w-[min(440px,calc(100%-28px))] lg:absolute lg:left-1/2 lg:top-1/2 lg:my-0 lg:w-[540px] lg:[transform:translate(-50%,-50%)_scale(var(--panel-scale,1))]">
                    <article
                        ref={cardRef}
                        aria-label={`${product.title} software`}
                        className="relative grid border border-[#ddd5cc] bg-white text-[#440c15] shadow-[0_14px_40px_rgba(68,12,21,0.10)] transition-[border-color] duration-300 [transform:translate3d(var(--card-x,0px),var(--card-y,0px),0)] hover:border-[#440c15]/25 lg:grid-cols-[minmax(0,11fr)_minmax(0,13fr)] lg:grid-rows-[1fr_auto]"
                    >
                        <header className="lg:col-start-1 lg:row-start-1">
                            {/* Cover: the product's art and its real mark */}
                            <div aria-hidden className="relative h-[104px] overflow-hidden bg-[#440c15]">
                                <AnimatePresence initial={false}>
                                    <motion.div
                                        key={product.slug}
                                        className="absolute inset-0"
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        {cover ? (
                                            <Image
                                                src={cover.src}
                                                alt=""
                                                fill
                                                sizes="(max-width: 1023px) 440px, 280px"
                                                className="object-cover"
                                                style={{ objectPosition: cover.position }}
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-[linear-gradient(35deg,#440c15_0%,#440c15_34%,#ecd2cc_78%,#8d9661_100%)]" />
                                        )}
                                        {cover?.tone === "dark" && (
                                            <div className="absolute inset-0 bg-[linear-gradient(to_top_right,rgba(20,8,10,0.72),rgba(20,8,10,0.08)_70%)]" />
                                        )}
                                        <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
                                        <div
                                            className={`absolute bottom-3.5 ${cover?.logoAt === "right" ? "right-5" : "left-5"} ${cover?.tone === "light" ? "text-[#080808]" : "text-[#fdfbf7]"}`}
                                        >
                                            {logo ? (
                                                <span
                                                    className="block bg-current"
                                                    style={{
                                                        height: logo.height,
                                                        aspectRatio: logo.ratio,
                                                        maskImage: `url(${logo.src})`,
                                                        WebkitMaskImage: `url(${logo.src})`,
                                                        maskSize: "contain",
                                                        WebkitMaskSize: "contain",
                                                        maskRepeat: "no-repeat",
                                                        WebkitMaskRepeat: "no-repeat",
                                                    }}
                                                />
                                            ) : (
                                                <span className="block text-[26px] leading-none tracking-[-0.8px]">{product.title}</span>
                                            )}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                            <div className="px-5 pb-4 pt-3.5">
                                <h3 className="sr-only">{product.title}</h3>
                                <p className="text-[9px] font-medium uppercase tracking-[1.5px] text-[#79665f]">White-label software</p>
                                <p className="mt-1.5 text-[13px] leading-[19px] text-[#79665f]">{product.outcome}</p>
                            </div>
                        </header>

                        <div className="border-y border-[#ddd5cc] bg-[#fdfbf7] px-5 pb-5 pt-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:border-y-0 lg:border-l">
                            <p className="text-[9px] font-medium uppercase tracking-[1.2px] text-[#79665f]">Product preview · Sample data</p>
                            <div className="mt-2.5 flex items-baseline justify-between gap-4">
                                <p
                                    className={`min-w-0 text-[13px] font-semibold leading-[18px] tracking-[-0.35px] transition-colors duration-300 ${working ? "text-[#440c15]/55" : ""}`}
                                >
                                    {working ? snapshot.working : snapshot.status}
                                </p>
                                <span ref={countRef} className="shrink-0 text-[30px] font-light leading-[32px] tracking-[-0.5px] tabular-nums">
                                    {initialTotal.toLocaleString("en-US")}
                                </span>
                            </div>
                            <p className="mt-1 text-[12.5px] leading-[18px] text-[#79665f]">{snapshot.description}</p>

                            <div className="mt-4 grid gap-1">
                                {snapshot.rows.map(([label, value]) => (
                                    <div
                                        key={label}
                                        className={`flex h-6 items-center gap-[7px] border border-[#ddd5cc] bg-white pl-[7px] pr-[5px] font-mono text-[10px] font-semibold leading-none tracking-[0.7px] text-[#440c15]/85 transition-opacity duration-300 ${working ? "opacity-50" : ""}`}
                                    >
                                        <span aria-hidden className="h-2 w-1 shrink-0 bg-[#440c15]" />
                                        <span className="truncate">{label}</span>
                                        <span className="ml-auto pl-2 text-[9px] text-[#79665f]">{value}</span>
                                    </div>
                                ))}
                            </div>

                            {snapshot.meters.length > 0 && (
                                <div className="mt-3.5 grid gap-[7px]">
                                    {snapshot.meters.map(([label, fill, display]) => (
                                        <div
                                            key={label}
                                            className="grid grid-cols-[84px_1fr_30px] items-center gap-2 font-mono text-[9px] font-semibold leading-[10px] tracking-[0.65px]"
                                        >
                                            <span className="whitespace-nowrap">{label}</span>
                                            <div
                                                role="progressbar"
                                                aria-label={label}
                                                aria-valuenow={fill}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                                className="relative h-1 overflow-hidden bg-[#440c15]/10"
                                            >
                                                <span
                                                    className="absolute inset-y-0 left-0 bg-[linear-gradient(90deg,#ecd2cc_0%,#440c15_100%)] transition-[width] duration-[950ms] ease-[cubic-bezier(.2,.7,.15,1)]"
                                                    style={{ width: `${fill}%` }}
                                                />
                                            </div>
                                            <span className="text-right tabular-nums text-[#440c15]/80">{display}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <footer className="flex items-center justify-between gap-2.5 px-5 py-3.5 lg:col-start-1 lg:row-start-2 lg:border-t lg:border-[#ddd5cc] lg:px-4">
                            <div className="whitespace-nowrap">
                                <p className="text-[13px] font-medium">
                                    {product.licenseFrom != null ? <>From ${product.licenseFrom}<span className="font-normal text-[#79665f]">/mo</span></> : (product.priceNote ?? "Pricing on request")}
                                </p>
                                <p className="mt-0.5 text-[10px] text-[#79665f]">Your brand, our software</p>
                            </div>
                            <Link href={`/products/${product.slug}`} aria-label={`Explore ${product.title} software`}
                                className="group inline-flex min-h-9 shrink-0 items-center gap-2 rounded-full bg-[#440c15] px-3.5 text-[12px] text-[#fdfbf7] transition-colors hover:bg-[#2c0405] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#440c15]">
                                Explore <span aria-hidden className="transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none">→</span>
                            </Link>
                        </footer>
                    </article>
                </div>

                <p className="sr-only" role="status" aria-live="polite">
                    {announcement}
                </p>
            </div>
        </div>
    )
}

/* ------------------------------------------------------------------------ */
/* WebGL field. Nothing is drawn from an image: the clouds, their colour,    */
/* the dust, the digits, the grain and the pointer are computed in the       */
/* shader.                                                                   */
/* ------------------------------------------------------------------------ */

type Renderer = {
    resize: (width: number, height: number) => void
    draw: (state: AnimState) => void
    dispose: () => void
}

const VERTEX = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() { v_uv = a_position * .5 + .5; gl_Position = vec4(a_position, 0., 1.); }
`

const FRAGMENT = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_atlas;
uniform vec2 u_size;
uniform vec3 u_pointer;
uniform vec3 u_pulse;
uniform float u_time;
uniform float u_sector;

// LIVV Hub palette
const vec3 PAPER = vec3(.992, .984, .969);
const vec3 SKY = vec3(.686, .765, .847);
const vec3 BUTTER = vec3(1., .965, .745);
const vec3 BLUSH = vec3(.925, .824, .8);
const vec3 SAGE = vec3(.553, .588, .38);
const vec3 BORDEAUX = vec3(.267, .047, .082);

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * .1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f*f*(3.-2.*f);
  return mix(mix(hash(i), hash(i+vec2(1.,0.)), f.x), mix(hash(i+vec2(0.,1.)), hash(i+1.), f.x), f.y);
}
float fbm(vec2 p) {
  float sum = 0., amp = .5;
  for (int i = 0; i < 4; i++) { sum += amp*noise(p); p = p*2.02 + vec2(11.7, 5.3); amp *= .5; }
  return sum / .9375;
}
// Sky, butter, blush, sage and back: no seam wherever a product moves it.
vec3 atmosphere(float s) {
  float k = abs(fract(s*.5 + .5)*2. - 1.);
  vec3 c = mix(SKY, BUTTER, smoothstep(.10, .36, k));
  c = mix(c, BLUSH, smoothstep(.42, .66, k));
  c = mix(c, SAGE, smoothstep(.76, 1., k));
  return c;
}
// Slow, domain-warped clouds. They gather in the top-right and bottom-left
// corners and leave the centre calm, which is where the card sits.
float cloud(vec2 uv, float aspect, vec2 push) {
  float t = u_time;
  vec2 p = vec2(uv.x*aspect, uv.y) + push;
  vec2 drift = vec2(u_sector*.62, -u_sector*.41);
  vec2 w = vec2(fbm(p*1.1 + drift + vec2(0., t*.045)), fbm(p*1.1 + drift + vec2(5.2, 1.3 - t*.038)));
  vec2 q = p + (w - .5)*1.05;
  float n = fbm(q*1.7 + drift*.6 + vec2(t*.028, -t*.02));
  vec2 c = uv - .5;
  float rim = smoothstep(.12, .62, length(c*vec2(1., 1.25)));
  float diagonal = abs(c.x - c.y);
  return smoothstep(.55, .9, n + (rim - .55)*.3 + (diagonal - .35)*.4);
}
void main() {
  vec2 uv = vec2(v_uv.x, 1.-v_uv.y);
  vec2 px = uv * u_size;
  float aspect = u_size.x / u_size.y;
  float t = u_time;

  // The pointer parts the clouds and lights the digits under it.
  vec2 mouseDelta = uv - u_pointer.xy;
  mouseDelta.x *= aspect;
  float lens = exp(-dot(mouseDelta, mouseDelta)*14.) * u_pointer.z;
  vec2 push = -normalize(mouseDelta + vec2(.0001)) * lens * .07;

  // A ring leaves the card when the product changes, or the pointer on click.
  vec2 pulseDelta = uv - u_pulse.xy;
  pulseDelta.x *= aspect;
  float pulseAge = t - u_pulse.z;
  float ring = exp(-pow((length(pulseDelta) - pulseAge*.5)*8., 2.)) * exp(-pulseAge*1.1);
  ring *= step(0., pulseAge) * step(pulseAge, 4.);
  push -= normalize(pulseDelta + vec2(.0001)) * ring * .05;

  float density = cloud(uv, aspect, push);

  // Which colour of the palette this part of the stage wears.
  float band = uv.y*.92 + .1*sin(uv.x*3.1 + t*.07) + (fbm(vec2(uv.x*aspect, uv.y)*.8 + t*.012) - .5)*.55;
  vec3 tint = atmosphere(band + u_sector*.27);

  // Printed on paper. The body of a cloud is a grainy wash of its colour and
  // its edge breaks up into dots, with a few seeds of bordeaux.
  float grain = hash(gl_FragCoord.xy) - .5;
  float dust = hash(floor(px) + 3.1);
  float clump = hash(floor(px*.5) + 91.);
  float twinkle = .88 + .12*sin(t*.9 + hash(floor(px/3.))*6.283);
  vec3 result = PAPER + grain*.014;
  float body = smoothstep(.2, .85, density);
  float dots = step(1. - density*.9, dust) * (1. - body) * (.5 + .5*clump) * twinkle;
  result = mix(result, tint, body*(.74 + .26*dust)*.96);
  result = mix(result, tint*.74, dots*.9);
  result = mix(result, BORDEAUX, step(.986, dust) * smoothstep(.04, .4, density) * .5);

  // Digits on a fixed grid: the clouds drift through and switch them on.
  vec2 cellSize = vec2(8., 11.);
  vec2 grid = px / cellSize;
  vec2 cell = floor(grid);
  vec2 within = (fract(grid) - .5)*1.3 + .5;
  float inside = step(0., within.x)*step(within.x, 1.)*step(0., within.y)*step(within.y, 1.);
  float cellRandom = hash(cell + 19.7);
  float cellDensity = cloud((cell + .5)*cellSize/u_size, aspect, push);
  float edge = smoothstep(.04, .22, cellDensity) * (1. - smoothstep(.5, .92, cellDensity));
  edge = max(edge, max(lens*.6, ring*.9));
  float scatter = step(.3, cellRandom);
  float symbol = step(.5, hash(cell + floor(t*.5 + cellRandom*7.)*.13));
  // Inside the ring every digit scrambles before it settles back to 0 and 1.
  symbol = mix(symbol, floor(hash(cell + floor(t*14.))*10.), step(.3, ring));
  float glyph = texture2D(u_atlas, vec2((symbol + clamp(within.x, 0., 1.))/10., clamp(within.y, 0., 1.))).a * inside;
  float glyphPulse = .7 + .3*sin(cellRandom*17. + t*.8);
  result = mix(result, BORDEAUX, clamp(glyph*edge*scatter*glyphPulse*.82, 0., 1.));

  result = mix(result, mix(tint, BORDEAUX, .3), clamp(ring*density*.22, 0., 1.));
  gl_FragColor = vec4(clamp(result, 0., 1.), 1.);
}
`

function glyphAtlas() {
    const atlas = document.createElement("canvas")
    atlas.width = 240
    atlas.height = 32
    const context = atlas.getContext("2d")
    if (context) {
        context.font = "22px monospace"
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.fillStyle = "#fff"
        for (let i = 0; i < 10; i++) context.fillText(String(i), i * 24 + 12, 17)
    }
    return atlas
}

function createRenderer(canvas: HTMLCanvasElement): Renderer | null {
    const gl = canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "low-power",
        preserveDrawingBuffer: false,
    })
    if (!gl) return null

    const compile = (type: number, source: string) => {
        const shader = gl.createShader(type)
        if (!shader) throw new Error("Could not create shader")
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const log = gl.getShaderInfoLog(shader)
            gl.deleteShader(shader)
            throw new Error(log || "Shader compilation failed")
        }
        return shader
    }

    const program = gl.createProgram()
    if (!program) return null
    const vertex = compile(gl.VERTEX_SHADER, VERTEX)
    const fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT)
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    gl.deleteShader(vertex)
    gl.deleteShader(fragment)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || "Shader linking failed")
    }
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const bindTexture = (source: TexImageSource, unit: number, name: string) => {
        const texture = gl.createTexture()
        gl.activeTexture(gl.TEXTURE0 + unit)
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source)
        gl.uniform1i(gl.getUniformLocation(program, name), unit)
        return texture
    }
    const atlas = bindTexture(glyphAtlas(), 0, "u_atlas")

    const uniforms = {
        size: gl.getUniformLocation(program, "u_size"),
        pointer: gl.getUniformLocation(program, "u_pointer"),
        pulse: gl.getUniformLocation(program, "u_pulse"),
        time: gl.getUniformLocation(program, "u_time"),
        sector: gl.getUniformLocation(program, "u_sector"),
    }
    gl.disable(gl.DEPTH_TEST)
    gl.disable(gl.BLEND)

    let width = 672
    let height = 450

    return {
        resize(w, h) {
            width = w
            height = h
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
            const renderScale = Math.min(1, 1700 / Math.max(w * dpr, h * dpr))
            canvas.width = Math.round(w * dpr * renderScale)
            canvas.height = Math.round(h * dpr * renderScale)
            gl.viewport(0, 0, canvas.width, canvas.height)
        },
        draw(state) {
            gl.uniform2f(uniforms.size, width, height)
            gl.uniform3f(uniforms.pointer, state.pointer.x, state.pointer.y, state.pointer.active)
            gl.uniform3f(uniforms.pulse, state.pulse.x, state.pulse.y, state.pulse.start)
            gl.uniform1f(uniforms.time, state.time)
            gl.uniform1f(uniforms.sector, state.sector)
            gl.drawArrays(gl.TRIANGLES, 0, 6)
        },
        dispose() {
            gl.deleteTexture(atlas)
            gl.deleteBuffer(buffer)
            gl.deleteProgram(program)
        },
    }
}
