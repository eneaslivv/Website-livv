"use client"

import { motion, useReducedMotion } from "framer-motion"

import { MAP, type Pillar } from "./content"
import { EASE } from "./ui"

/**
 * The hero's diagram: the client's business in the centre, three pillars
 * around it and four services on each. It is meant to be quiet: thin lines,
 * one family of outlined pills, and a single slow pulse along the branch in
 * focus. The focus moves between pillars with long cross-fades, never a jump
 * in fill or colour.
 */

const C = 300
const R_PILLAR = 118
const R_SERVICE = 238
const PILLAR_ANGLE: Record<Pillar, number> = { Strategy: -90, Technology: 30, Growth: 150 }
const SPREAD = [-45, -15, 15, 45]
const FADE = "1.2s cubic-bezier(.22,1,.36,1)"

type Point = { x: number; y: number }

const polar = (deg: number, r: number): Point => {
    const a = (deg * Math.PI) / 180
    return { x: +(C + r * Math.cos(a)).toFixed(2), y: +(C + r * Math.sin(a)).toFixed(2) }
}

const NODES = MAP.map(({ pillar, services }) => {
    const angle = PILLAR_ANGLE[pillar]
    const p = polar(angle, R_PILLAR)
    return {
        pillar,
        p,
        spoke: `M${C} ${C} L${p.x} ${p.y}`,
        services: services.map((name, i) => {
            const a = angle + SPREAD[i]
            const s = polar(a, R_SERVICE)
            const ctrl = polar(a, (R_PILLAR + R_SERVICE) / 2 - 18)
            return { name, s, path: `M${p.x} ${p.y} Q${ctrl.x} ${ctrl.y} ${s.x} ${s.y}` }
        }),
    }
})

const pillWidth = (label: string, size: number) => Math.round(label.length * size * 0.56 + 26)

export function SystemMap({
    active,
    onHover,
}: {
    active: Pillar
    onHover: (pillar: Pillar | null) => void
}) {
    const reduced = useReducedMotion()
    const draw = (delay: number) =>
        reduced
            ? {}
            : {
                  initial: { pathLength: 0 },
                  animate: { pathLength: 1 },
                  transition: { duration: 1.6, delay, ease: EASE },
              }
    const appear = (delay: number) =>
        reduced
            ? {}
            : {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { duration: 1.1, delay, ease: EASE },
              }

    return (
        <svg
            viewBox="0 0 600 600"
            className="h-auto w-full select-none overflow-visible"
            role="img"
            aria-label="Diagram: a business at the centre, connected to strategy, technology and growth services."
            onMouseLeave={() => onHover(null)}
        >
            <defs>
                <radialGradient id="map-core" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ecd2cc" stopOpacity="0.16" />
                    <stop offset="100%" stopColor="#ecd2cc" stopOpacity="0" />
                </radialGradient>
            </defs>

            <circle cx={C} cy={C} r={R_SERVICE} fill="none" stroke="#fdfbf7" strokeOpacity="0.05" />
            <circle cx={C} cy={C} r={150} fill="url(#map-core)" />

            {/* Branches */}
            {NODES.map((node, ni) => {
                const lit = node.pillar === active
                return (
                    <g key={node.pillar} style={{ opacity: lit ? 1 : 0.55, transition: `opacity ${FADE}` }}>
                        <motion.path
                            d={node.spoke}
                            fill="none"
                            stroke="#fdfbf7"
                            strokeWidth={1}
                            strokeOpacity={0.3}
                            {...draw(0.2 + ni * 0.15)}
                        />
                        {node.services.map((s, si) => (
                            <motion.path
                                key={s.name}
                                d={s.path}
                                fill="none"
                                stroke="#fdfbf7"
                                strokeWidth={1}
                                strokeOpacity={0.2}
                                {...draw(0.6 + ni * 0.15 + si * 0.05)}
                            />
                        ))}
                        {!reduced && lit && (
                            <g key={`pulse-${node.pillar}`}>
                                <circle r={2} fill="#ecd2cc" opacity={0.8}>
                                    <animateMotion dur="3.6s" repeatCount="indefinite" path={node.spoke} />
                                </circle>
                                {node.services.map((s, si) => (
                                    <circle key={s.name} r={1.6} fill="#ecd2cc" opacity={0.6}>
                                        <animateMotion dur="4.4s" begin={`${0.6 + si * 0.5}s`} repeatCount="indefinite" path={s.path} />
                                    </circle>
                                ))}
                            </g>
                        )}
                    </g>
                )
            })}

            {/* Service nodes */}
            {NODES.map((node, ni) =>
                node.services.map((s, si) => {
                    const lit = node.pillar === active
                    const w = pillWidth(s.name, 15)
                    return (
                        <g key={s.name} transform={`translate(${s.s.x} ${s.s.y})`} onMouseEnter={() => onHover(node.pillar)}>
                            <motion.g {...appear(1 + ni * 0.15 + si * 0.06)}>
                                <rect
                                    x={-w / 2}
                                    y={-17}
                                    width={w}
                                    height={34}
                                    rx={17}
                                    fill="#2c0405"
                                    fillOpacity={0.55}
                                    stroke="#fdfbf7"
                                    strokeOpacity={lit ? 0.32 : 0.12}
                                    style={{ transition: `stroke-opacity ${FADE}` }}
                                />
                                <text
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fontSize={15}
                                    letterSpacing="-0.01em"
                                    fill="#fdfbf7"
                                    fillOpacity={lit ? 0.92 : 0.5}
                                    style={{ transition: `fill-opacity ${FADE}` }}
                                >
                                    {s.name}
                                </text>
                            </motion.g>
                        </g>
                    )
                }),
            )}

            {/* Pillars */}
            {NODES.map((node, ni) => {
                const lit = node.pillar === active
                const w = pillWidth(node.pillar, 16) + 10
                return (
                    <g key={node.pillar} transform={`translate(${node.p.x} ${node.p.y})`} onMouseEnter={() => onHover(node.pillar)}>
                        <motion.g {...appear(0.5 + ni * 0.15)}>
                            <rect
                                x={-w / 2}
                                y={-19}
                                width={w}
                                height={38}
                                rx={19}
                                fill="#440c15"
                                stroke="#ecd2cc"
                                strokeOpacity={lit ? 0.55 : 0.2}
                                style={{ transition: `stroke-opacity ${FADE}` }}
                            />
                            <text
                                textAnchor="middle"
                                dominantBaseline="central"
                                fontSize={16}
                                fontWeight={500}
                                fill="#ecd2cc"
                                fillOpacity={lit ? 1 : 0.6}
                                style={{ transition: `fill-opacity ${FADE}` }}
                            >
                                {node.pillar}
                            </text>
                        </motion.g>
                    </g>
                )
            })}

            {/* Core */}
            <motion.g {...appear(0.1)}>
                <circle cx={C} cy={C} r={64} fill="none" stroke="#ecd2cc" strokeOpacity={0.14} />
                <circle cx={C} cy={C} r={56} fill="#fdfbf7" />
                <text x={C} y={C - 9} textAnchor="middle" fontSize={10.5} letterSpacing="0.18em" fill="#79665f">
                    YOUR CLIENT&apos;S
                </text>
                <text x={C} y={C + 13} textAnchor="middle" fontSize={21} letterSpacing="-0.03em" fill="#440c15">
                    business
                </text>
            </motion.g>
        </svg>
    )
}
