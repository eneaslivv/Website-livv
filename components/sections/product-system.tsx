"use client"

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react"
import Link from "next/link"

import type { Project } from "@/lib/marketplace-data"

/**
 * Interactive product picker: the list of LIVV products on the left, a live
 * particle field on the right, and a small "system" card that shows what the
 * selected product does. Ported from the Spectrum study (preview.html) — same
 * field and card anatomy, printed on the site's cream instead of a dark stage,
 * with a white card, and without the fullscreen/pause tools, custom cursor or
 * finding popovers.
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
        status: "Docket up to date",
        working: "Indexing documents",
        description: "Active cases, with every document filed and every deadline tracked.",
        total: 142,
        rows: [
            ["HEARING · CASE 2291", "MON"],
            ["FILING DUE · CASE 1874", "48H"],
        ],
        meters: [
            ["DOCS FILED", 91, "91%"],
            ["ON TIME", 98, "98%"],
        ],
        meta: "NEXT DEADLINE 48H",
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

const FIELD_SRC = "/images/products/system-field.png"
const WORKING_MS = 920
const COUNT_MS = 880

type AnimState = {
    time: number
    sector: number
    sectorTarget: number
    pointer: { x: number; y: number; tx: number; ty: number; active: number; target: number }
    pulse: { x: number; y: number; start: number }
    still: boolean
    redraw: () => void
}

export function ProductSystem({ products }: { products: Project[] }) {
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
        time: 0,
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
        let disposed = false

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
            stage.style.setProperty("--panel-scale", Math.min(1.1, stage.clientWidth / 780).toFixed(4))
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

        const image = new Image()
        image.onload = () => {
            if (disposed) return
            try {
                renderer = createRenderer(canvas, image)
            } catch (error) {
                console.warn("ProductSystem: WebGL unavailable,", error)
            }
            if (!renderer) return fallback()
            stage.dataset.renderer = "webgl"
            resize()
            draw()
            start()
        }
        image.onerror = fallback
        image.src = FIELD_SRC

        return () => {
            disposed = true
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

    const product = products[selected]
    const snapshot = snapshotFor(product)

    return (
        <div className="grid border border-[#2c2420]/10 lg:grid-cols-[1fr_3fr]">
            {/* ---------- Picker ---------- */}
            <div className="flex min-w-0 flex-col lg:border-r lg:border-[#2c2420]/10">
                <div className="flex-1 p-5 lg:px-[19px] lg:pb-[22px] lg:pt-[18px]">
                    <p className="max-w-[300px] text-[16px] leading-snug tracking-[-0.25px] text-[#2c2420]">
                        Five systems we built and run in production. Pick one to see it at work.
                    </p>
                    <div aria-hidden className="mt-4 flex h-[9px] gap-0.5">
                        {products.map((p, i) => (
                            <span
                                key={p.slug}
                                className={`w-[5px] transition-colors duration-300 ${i === selected ? "bg-[#b8836e]" : "bg-[#2c2420]/15"}`}
                            />
                        ))}
                    </div>
                </div>

                <div
                    role="group"
                    aria-label="Products"
                    className="grid grid-cols-2 gap-px border-t border-[#2c2420]/10 bg-[#2c2420]/10 sm:grid-cols-5 lg:grid-cols-1"
                >
                    {products.map((p, i) => {
                        const isSelected = i === selected
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
                                className={`group relative h-12 bg-white px-5 text-left text-[13px] tracking-[-0.2px] transition-[background-color,padding] duration-300 last:col-span-2 hover:bg-[#faf8f4] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#b8836e] sm:px-4 sm:last:col-span-1 lg:h-[59px] lg:px-[19px] lg:text-[14px] lg:hover:pl-6 ${isSelected ? "text-[#2c2420]" : "text-[#2c2420]/60"}`}
                            >
                                <span
                                    aria-hidden
                                    className={`absolute left-0 top-1/2 w-0.5 -translate-y-1/2 bg-[#b8836e] transition-[height] duration-300 ${isSelected ? "h-4" : "h-0"}`}
                                />
                                {p.title}
                                <span
                                    aria-hidden
                                    className="absolute right-5 top-1/2 hidden -translate-x-1 -translate-y-1/2 text-[15px] opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-60 lg:block"
                                >
                                    ↗
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
                className="relative isolate h-[440px] min-w-0 touch-pan-y overflow-hidden bg-white data-[renderer=none]:bg-[image:radial-gradient(ellipse_at_70%_4%,rgba(255,8,223,.16),transparent_45%),radial-gradient(ellipse_at_10%_95%,rgba(7,87,240,.2),transparent_70%)] sm:h-[480px] lg:aspect-[960/639] lg:h-auto"
            >
                <canvas ref={canvasRef} aria-hidden className="absolute inset-0 block h-full w-full" />

                <div className="absolute left-1/2 top-1/2 z-[3] w-[min(460px,calc(100%-28px))] [transform:translate(-50%,-50%)] lg:w-[460px] lg:[transform:translate(-50%,-50%)_scale(var(--panel-scale,1))]">
                    <article
                        ref={cardRef}
                        aria-label={`${product.title} — sample data`}
                        className="relative border border-[#2c2420]/10 bg-white text-[#2c2420] shadow-[0_10px_30px_rgba(44,36,32,0.08)] transition-[border-color] duration-300 [transform:translate3d(var(--card-x,0px),var(--card-y,0px),0)] hover:border-[#2c2420]/20"
                    >
                        <header className="flex items-start justify-between gap-4 border-b border-[#2c2420]/10 px-[19px] pb-[17px] pt-[19px]">
                            <div className="min-w-0">
                                <p
                                    className={`mb-[5px] text-[13px] font-semibold leading-[18px] tracking-[-0.35px] transition-colors duration-300 ${working ? "text-[#b8836e]" : ""}`}
                                >
                                    {working ? snapshot.working : snapshot.status}
                                </p>
                                <p className="max-w-[306px] text-[13px] leading-[18px] text-[#6b625b]">{snapshot.description}</p>
                            </div>
                            <span ref={countRef} className="mt-[9px] shrink-0 text-[28px] font-light leading-[32px] tracking-[-0.5px] tabular-nums sm:text-[35px] sm:leading-[39px]">
                                {initialTotal.toLocaleString("en-US")}
                            </span>
                        </header>

                        <div className="px-[19px] pb-[19px] pt-[22px]">
                            <div className="mb-[15px] grid gap-1">
                                {snapshot.rows.map(([label, value]) => (
                                    <div
                                        key={label}
                                        className={`flex h-6 items-center gap-[7px] border border-[#2c2420]/10 bg-[#faf8f4] pl-[7px] pr-[5px] font-mono text-[10px] font-semibold leading-none tracking-[0.7px] text-[#2c2420]/85 transition-opacity duration-300 ${working ? "opacity-50" : ""}`}
                                    >
                                        <span aria-hidden className="h-2 w-1 shrink-0 bg-[#b8836e]" />
                                        <span className="truncate">{label}</span>
                                        <span className="ml-auto pl-2 text-[9px] text-[#8a7e74]">{value}</span>
                                    </div>
                                ))}
                            </div>

                            {snapshot.meters.length > 0 && (
                                <div className="grid gap-[7px]">
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
                                                className="relative h-1 overflow-hidden bg-[#2c2420]/10"
                                            >
                                                <span
                                                    className="absolute inset-y-0 left-0 bg-[linear-gradient(90deg,#ff08df_0%,#ff357c_35%,#ffc31b_72%,#ffe329_100%)] transition-[width] duration-[950ms] ease-[cubic-bezier(.2,.7,.15,1)]"
                                                    style={{ width: `${fill}%` }}
                                                />
                                            </div>
                                            <span className="text-right tabular-nums text-[#2c2420]/80">{display}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="mt-[17px] flex items-center justify-between gap-3 whitespace-nowrap font-mono text-[9px] font-semibold leading-[10px] tracking-[0.55px] text-[#8a7e74]">
                                <span>SAMPLE DATA</span>
                                <span className="hidden truncate sm:inline">{snapshot.meta}</span>
                                <Link
                                    href={`/products/${product.slug}`}
                                    className="text-[#2c2420] transition-colors hover:text-[#b8836e] focus-visible:text-[#b8836e] focus-visible:outline-none"
                                >
                                    VIEW {product.title.toUpperCase()} ↗
                                </Link>
                            </div>
                        </div>
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
/* WebGL field. The PNG only defines the composition; colour, binary glyphs, */
/* drift, grain and pointer refraction are all computed in the shader.       */
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
uniform sampler2D u_field;
uniform sampler2D u_atlas;
uniform vec2 u_size;
uniform vec3 u_pointer;
uniform vec3 u_pulse;
uniform float u_time;
uniform float u_sector;

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
vec3 spectrum(float t) {
  vec3 c = vec3(1., .018, .88);
  c = mix(c, vec3(1., .014, .67), smoothstep(.02,.21,t));
  c = mix(c, vec3(1., .12, .15), smoothstep(.21,.37,t));
  c = mix(c, vec3(1., .52, .015), smoothstep(.36,.46,t));
  c = mix(c, vec3(1., .88, .13), smoothstep(.45,.56,t));
  c = mix(c, vec3(.73,.86,.94), smoothstep(.57,.69,t));
  c = mix(c, vec3(.025,.36,1.), smoothstep(.68,.85,t));
  c = mix(c, vec3(.025,.14,.67), smoothstep(.87,1.08,t));
  return c;
}
float field(vec2 uv) { return texture2D(u_field, clamp(uv, .001, .999)).r; }
void main() {
  vec2 uv = vec2(v_uv.x, 1.-v_uv.y);
  // Keep the composition at its native 3:2 framing on any stage shape.
  vec2 p = uv;
  float aspect = u_size.x / u_size.y;
  if (aspect < 1.5) p.x = (p.x-.5) * aspect / 1.5 + .5;
  else p.y = (p.y-.5) * 1.5 / aspect + .5;
  float t = u_time;
  vec2 flow = vec2(
    sin(p.y*8.2 + t*.21) + .38*sin(p.y*17. + p.x*7. - t*.12),
    sin(p.x*7.4 - t*.19) + .32*sin(p.x*18. - p.y*6. + t*.15)
  );
  vec2 q = p + flow * vec2(.012,.017);
  q += vec2(sin(p.y*11. + u_sector*.72), cos(p.x*9. + u_sector*.8)) * (.003 * u_sector);
  vec2 mouseDelta = uv - u_pointer.xy;
  mouseDelta.x *= aspect;
  float mouseDist = length(mouseDelta);
  float influence = exp(-mouseDist*mouseDist*15.) * u_pointer.z;
  q += normalize(mouseDelta+vec2(.0001)) * influence * .024;
  q += vec2(sin(mouseDist*28.-t*1.8), cos(mouseDist*25.-t*1.5)) * influence * .004;
  vec2 pulseDelta = uv-u_pulse.xy; pulseDelta.x *= aspect;
  float pulseAge = t-u_pulse.z;
  float pulseRadius = length(pulseDelta);
  float pulseWave = exp(-pow((pulseRadius-pulseAge*.22)*20.,2.)) * exp(-pulseAge*1.2);
  pulseWave *= step(0.,pulseAge)*step(pulseAge,4.);
  q += normalize(pulseDelta+vec2(.0001)) * pulseWave*.016;

  float density = field(q);
  float turbulence = noise(q*vec2(45.,30.)+vec2(t*.16,-t*.11));
  density = clamp(density + (turbulence-.5)*.12*smoothstep(.012,.12,density), 0., 1.);
  vec2 logical = q*vec2(960.,640.);
  float dust = hash(floor(logical*1.32));
  float micro = hash(floor(logical*2.7) + 91.);
  float twinkle = .91 + .09*sin(t*.9+hash(floor(logical*.55))*6.283);
  float light = pow(density,1.03) * (.45+.53*dust) * twinkle;
  float specks = step(1.-density*.78,dust) * density * (.08+micro*.24);
  float glow = pow(density,.82)*.14;
  float spectrumY = clamp(p.y + .024*sin(p.x*8. + t*.14) + .014*sin(t*.10+u_sector*.35),0.,1.);
  vec3 color = spectrum(spectrumY);

  // Printed on the page's white: density is ink, not light.
  vec3 paper = vec3(1.) + (hash(gl_FragCoord.xy) - .5)*.016;
  float ink = clamp((light + specks)*.95 + glow*1.3, 0., 1.);
  vec3 result = mix(paper, color*.9, ink);

  // Sharp 0/1 cells, most legible on the edges of the dense clouds.
  vec2 cellSize = vec2(6.2,8.1);
  vec2 grid = logical / cellSize;
  vec2 cell = floor(grid);
  vec2 within = fract(grid);
  float cellRandom = hash(cell+19.7);
  float cellDensity = field((cell+.5)*cellSize/vec2(960.,640.));
  float edge = smoothstep(.015,.10,cellDensity) * (1.-smoothstep(.42,.9,cellDensity));
  float scatter = step(.19,cellRandom);
  float symbol = floor(hash(cell+floor(t*.37)*.17)*10.);
  if (cellRandom < .70) symbol = step(.35,cellRandom);
  vec2 atlasUv = vec2((symbol+within.x)/10., within.y);
  float glyph = texture2D(u_atlas,atlasUv).a;
  float glyphPulse = .72+.28*sin(cellRandom*17.+t*.75);
  result = mix(result, color*.72, clamp(glyph*edge*scatter*glyphPulse*.85, 0., 1.));
  result = mix(result, color, clamp(pulseWave*density*.2 + influence*pow(density,1.2)*.06, 0., 1.));
  gl_FragColor = vec4(clamp(result,0.,1.),1.);
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

function createRenderer(canvas: HTMLCanvasElement, image: HTMLImageElement): Renderer | null {
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
    const textures = [bindTexture(image, 0, "u_field"), bindTexture(glyphAtlas(), 1, "u_atlas")]

    const uniforms = {
        size: gl.getUniformLocation(program, "u_size"),
        pointer: gl.getUniformLocation(program, "u_pointer"),
        pulse: gl.getUniformLocation(program, "u_pulse"),
        time: gl.getUniformLocation(program, "u_time"),
        sector: gl.getUniformLocation(program, "u_sector"),
    }
    gl.disable(gl.DEPTH_TEST)
    gl.disable(gl.BLEND)

    let width = 960
    let height = 640

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
            textures.forEach((texture) => gl.deleteTexture(texture))
            gl.deleteBuffer(buffer)
            gl.deleteProgram(program)
        },
    }
}
