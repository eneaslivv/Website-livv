"use client"

import { useRef, useState, useCallback, useMemo } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Minus, Plus, Maximize2 } from "lucide-react"
import { buildSiteTree, layoutTree, type LaidOutEdge } from "@/lib/sitemap-tree"

gsap.registerPlugin(ScrollTrigger)

interface Props {
    label?: string
    heading?: string
    description?: string
    /** Slugs capturados del sitio. La jerarquía se deduce del propio slug. */
    slugs: string[]
    rootLabel?: string
}

/** Un par [relleno, borde] por rama, para que cada sección del sitio se lea distinta. */
const TINTS: [string, string][] = [
    ['#FFF3D6', '#E8CD8B'], ['#E3EFFE', '#A9C6EE'], ['#E2F4E6', '#A3D3AE'],
    ['#FCE7EF', '#E4A9C1'], ['#EFE8FC', '#C5B0E8'], ['#FFEBDD', '#EBBD97'],
]

const tintFor = (branch: number): [string, string] =>
    branch < 0 ? ['#2A1818', '#2A1818'] : TINTS[branch % TINTS.length]

/** Misma curva que dibuja el generador: dos controles a mitad de camino. */
const edgePath = (e: LaidOutEdge) => {
    const mx = (e.x1 + e.x2) / 2
    return `M ${e.x1} ${e.y1} C ${mx} ${e.y1}, ${mx} ${e.y2}, ${e.x2} ${e.y2}`
}

const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function SiteMapSection({ label, heading, description, slugs, rootLabel }: Props) {
    const scope = useRef<HTMLDivElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)
    // En pantallas chicas el árbol entra tan reducido que las etiquetas quedan a
    // 4px. Arranca más cerca y se explora arrastrando, como un tablero.
    const [zoom, setZoom] = useState(() =>
        typeof window !== 'undefined' && window.innerWidth < 768 ? 2.2 : 1,
    )
    const [pan, setPan] = useState({ x: 0, y: 0 })
    const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null)

    const { nodes, edges, canvas, nodeH } = useMemo(
        () => layoutTree(buildSiteTree(slugs || [], rootLabel || 'site')),
        [slugs, rootLabel],
    )

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        drag.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y }
        ;(e.target as Element).setPointerCapture?.(e.pointerId)
    }, [pan])

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        if (!drag.current) return
        setPan({
            x: drag.current.px + (e.clientX - drag.current.x),
            y: drag.current.py + (e.clientY - drag.current.y),
        })
    }, [])

    const onPointerUp = useCallback(() => { drag.current = null }, [])

    const reset = () => { setZoom(1); setPan({ x: 0, y: 0 }) }

    // El árbol se dibuja solo al entrar: primero crecen las ramas, después
    // aparecen las páginas de izquierda a derecha, como si se desplegara.
    useGSAP(() => {
        if (!svgRef.current || prefersReducedMotion()) return

        const paths = gsap.utils.toArray<SVGPathElement>('path[data-edge]', svgRef.current)
        paths.forEach((p) => {
            const len = p.getTotalLength()
            gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
        })

        const tl = gsap.timeline({
            scrollTrigger: { trigger: scope.current, start: 'top 75%', once: true },
        })

        tl.to(paths, {
            strokeDashoffset: 0,
            duration: 1.1,
            ease: 'power2.out',
            stagger: { each: 0.02, from: 'start' },
        })

        tl.fromTo('g[data-node]',
            { opacity: 0, scale: 0.82, transformOrigin: 'left center' },
            { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)', stagger: 0.018 },
            '-=0.85',
        )
    }, { scope })

    if (!nodes?.length) return null

    return (
        <div ref={scope} className="mb-16 md:mb-32">
            {label && (
                <p className="text-xs text-[#5A3E3E]/60 mb-3 ml-1 uppercase tracking-widest">{label}</p>
            )}
            {heading && (
                <h3 className="text-2xl md:text-4xl font-light tracking-[-0.03em] text-[#2A1818] mb-3">{heading}</h3>
            )}
            {description && (
                <p className="text-sm md:text-base text-[#5A3E3E]/75 max-w-xl mb-6 leading-relaxed">{description}</p>
            )}

            <div className="relative rounded-xl border border-[#D6D1C5] bg-[#FAF8F3] overflow-hidden">
                {/* Trama de puntos, para que se lea como un tablero y no como una imagen */}
                <div
                    className="absolute inset-0 opacity-[0.55]"
                    style={{
                        backgroundImage: 'radial-gradient(#D6D1C5 1px, transparent 1px)',
                        backgroundSize: '22px 22px',
                    }}
                />

                <div className="absolute top-3 right-3 z-20 flex gap-1.5">
                    {[
                        { icon: Minus, fn: () => setZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2))), label: 'Alejar' },
                        { icon: Plus, fn: () => setZoom((z) => Math.min(2.5, +(z + 0.25).toFixed(2))), label: 'Acercar' },
                        { icon: Maximize2, fn: reset, label: 'Encuadrar' },
                    ].map(({ icon: Icon, fn, label: l }) => (
                        <button
                            key={l}
                            onClick={fn}
                            aria-label={l}
                            className="w-8 h-8 rounded-lg bg-white/90 border border-[#D6D1C5] flex items-center justify-center text-[#2A1818] hover:bg-white transition-colors"
                        >
                            <Icon className="w-3.5 h-3.5" />
                        </button>
                    ))}
                </div>

                <div
                    className="relative touch-pan-y select-none cursor-grab active:cursor-grabbing"
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerLeave={onPointerUp}
                >
                    <svg
                        ref={svgRef}
                        viewBox={`-12 -12 ${canvas.w + 24} ${canvas.h + 24}`}
                        // `slice` en vez del `meet` por defecto: el árbol es alto y
                        // angosto, así que entrar por altura lo dejaba a escala 0.39
                        // —etiquetas de 4px— con el tablero vacío a los costados.
                        // Así llena el ancho y lo que sobra se explora arrastrando.
                        preserveAspectRatio="xMidYMin slice"
                        className="w-full h-[420px] md:h-[620px]"
                        style={{
                            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                            transformOrigin: 'center center',
                            transition: drag.current ? 'none' : 'transform .35s cubic-bezier(.16,1,.3,1)',
                        }}
                    >
                        {edges.map((e, i) => (
                            <path
                                key={i}
                                data-edge
                                d={edgePath(e)}
                                fill="none"
                                stroke={tintFor(e.branch)[1]}
                                strokeWidth={1.4}
                                strokeOpacity={0.75}
                            />
                        ))}

                        {nodes.map((n, i) => {
                            const [fill, line] = tintFor(n.branch)
                            return (
                                <g key={i} data-node>
                                    <rect
                                        x={n.x}
                                        y={n.y}
                                        width={n.w}
                                        height={nodeH}
                                        rx={8}
                                        fill={n.root ? '#2A1818' : fill}
                                        stroke={line}
                                        strokeWidth={n.root ? 0 : 1}
                                    />
                                    <text
                                        x={n.x + n.w / 2}
                                        y={n.y + nodeH / 2 + 3.5}
                                        textAnchor="middle"
                                        fontSize={n.root ? 11 : 10}
                                        fontWeight={n.root ? 600 : 500}
                                        fill={n.root ? '#FAF8F3' : '#2A1818'}
                                    >
                                        {n.label}
                                    </text>
                                    {!!n.kids && n.kids > 0 && !n.root && (
                                        <text
                                            x={n.x + n.w - 5}
                                            y={n.y + 9}
                                            textAnchor="end"
                                            fontSize={7}
                                            fill="#2A1818"
                                            fillOpacity={0.45}
                                        >
                                            {n.kids}
                                        </text>
                                    )}
                                </g>
                            )
                        })}
                    </svg>
                </div>

                <div className="absolute bottom-3 left-4 z-20 text-[10px] uppercase tracking-widest text-[#5A3E3E]/50 pointer-events-none">
                    {nodes.length - 1} páginas · arrastrá para explorar
                </div>
            </div>
        </div>
    )
}
