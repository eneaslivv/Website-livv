"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import { LivvSign } from "@/components/brand/livv-sign"
import { MODES, type Mode } from "./content"
import { EASE } from "./ui"

/**
 * Who stands in front of the client. In white-label LIVV works behind a
 * curtain and only Wendell faces the client; in a visible collaboration both
 * do. The nodes glide between the two layouts and the lines follow them.
 */

type Node = "client" | "wendell" | "livv"
type Pos = { x: number; y: number }

const LAYOUT: Record<Mode, { pos: Record<Node, Pos>; links: [Node, Node, "solid" | "dashed"][] }> = {
    "white-label": {
        pos: { client: { x: 18, y: 50 }, wendell: { x: 50, y: 50 }, livv: { x: 82, y: 50 } },
        links: [
            ["client", "wendell", "solid"],
            ["wendell", "livv", "dashed"],
        ],
    },
    "co-branded": {
        pos: { client: { x: 20, y: 50 }, wendell: { x: 66, y: 25 }, livv: { x: 66, y: 75 } },
        links: [
            ["client", "wendell", "solid"],
            ["client", "livv", "solid"],
            ["wendell", "livv", "solid"],
        ],
    },
}

const SPRING = { type: "spring" as const, stiffness: 120, damping: 22 }

export function PartnershipModel() {
    const [mode, setMode] = useState<Mode>("white-label")
    const reduced = useReducedMotion()
    const layout = LAYOUT[mode]
    const caption = MODES.find((m) => m.key === mode)!.caption

    return (
        <div className="rounded-[28px] border border-[#fdfbf7]/12 bg-[#fdfbf7]/[0.03] p-4 md:p-6">
            <div className="px-1">
                <div className="inline-flex gap-1 whitespace-nowrap rounded-full border border-[#fdfbf7]/12 bg-[#2c0405]/60 p-1" role="group" aria-label="Collaboration format">
                    {MODES.map((m) => (
                        <button
                            key={m.key}
                            type="button"
                            aria-pressed={mode === m.key}
                            onClick={() => setMode(m.key)}
                            className={`relative rounded-full px-3.5 py-2 text-[12px] md:px-4 md:text-[12.5px] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ecd2cc] ${mode === m.key ? "text-[#2c0405]" : "text-[#fdfbf7]/70 hover:text-[#fdfbf7]"}`}
                        >
                            {mode === m.key && (
                                <motion.span layoutId="partner-mode" className="absolute inset-0 rounded-full bg-[#ecd2cc]" transition={{ type: "spring", stiffness: 380, damping: 34 }} />
                            )}
                            <span className="relative">{m.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative mt-4 h-[300px] overflow-hidden rounded-[20px] bg-[#2c0405] md:h-[360px]">
                {/* Curtain: only in white-label */}
                <AnimatePresence>
                    {mode === "white-label" && (
                        <motion.div
                            key="curtain"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="pointer-events-none absolute inset-y-0 left-[67%] right-0"
                        >
                            <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(236,210,204,0.05)_0_1px,transparent_1px_9px)]" />
                            <div className="absolute inset-y-6 left-0 border-l border-dashed border-[#ecd2cc]/35" />
                            <span className="absolute left-3 top-4 text-[10px] uppercase tracking-[0.18em] text-[#ecd2cc]/60">Behind the scenes</span>
                            <span className="absolute -left-3 top-4 -translate-x-full text-right text-[10px] uppercase tracking-[0.18em] text-[#fdfbf7]/45">
                                What your client sees
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Links */}
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                    {(["client-wendell", "client-livv", "wendell-livv"] as const).map((id) => {
                        const [a, b] = id.split("-") as [Node, Node]
                        const link = layout.links.find(([x, y]) => x === a && y === b)
                        const pa = layout.pos[a]
                        const pb = layout.pos[b]
                        return (
                            <motion.line
                                key={id}
                                initial={false}
                                animate={{ x1: pa.x, y1: pa.y, x2: pb.x, y2: pb.y, opacity: link ? 1 : 0 }}
                                transition={SPRING}
                                stroke="#ecd2cc"
                                strokeOpacity={link?.[2] === "dashed" ? 0.45 : 0.6}
                                strokeWidth={1.2}
                                strokeDasharray={link?.[2] === "dashed" ? "4 5" : undefined}
                                vectorEffect="non-scaling-stroke"
                            />
                        )
                    })}
                </svg>

                {/* Pulses travelling along the visible links */}
                {!reduced &&
                    layout.links.map(([a, b], i) => {
                        const pa = layout.pos[a]
                        const pb = layout.pos[b]
                        return (
                            <motion.span
                                key={`${mode}-${a}-${b}`}
                                aria-hidden
                                className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ecd2cc]"
                                initial={{ left: `${pa.x}%`, top: `${pa.y}%`, opacity: 0 }}
                                animate={{
                                    left: [`${pa.x}%`, `${pb.x}%`, `${pa.x}%`],
                                    top: [`${pa.y}%`, `${pb.y}%`, `${pa.y}%`],
                                    opacity: [0, 1, 1, 0],
                                }}
                                transition={{ duration: 5.5, delay: 0.8 + i * 0.9, repeat: Infinity, ease: "easeInOut" }}
                            />
                        )
                    })}

                {/* Nodes */}
                <NodeCard pos={layout.pos.client} label="Your client" sub="Restaurant, brand, service…" />
                <NodeCard pos={layout.pos.wendell} label="Wendell" sub="Relationships & sales" accent />
                <NodeCard pos={layout.pos.livv} label={<LivvSign role="img" aria-label="LIVV" className="h-[15px] w-auto" />} sub="Execution partner" dim={mode === "white-label"} />
            </div>

            <AnimatePresence mode="wait" initial={false}>
                <motion.p
                    key={mode}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="px-1 pt-4 text-[14px] leading-relaxed text-[#fdfbf7]/75"
                >
                    {caption}
                </motion.p>
            </AnimatePresence>
            <p className="px-1 pt-2 text-[11px] uppercase tracking-[0.16em] text-[#fdfbf7]/40">Either way: one-off projects or monthly retainers</p>
        </div>
    )
}

function NodeCard({
    pos,
    label,
    sub,
    accent = false,
    dim = false,
}: {
    pos: Pos
    label: React.ReactNode
    sub: string
    accent?: boolean
    dim?: boolean
}) {
    return (
        <motion.div
            initial={false}
            animate={{ left: `${pos.x}%`, top: `${pos.y}%`, opacity: dim ? 0.75 : 1 }}
            transition={SPRING}
            className={`absolute w-[92px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-2.5 py-2.5 text-center md:w-[148px] md:px-4 md:py-3.5 ${accent ? "border-[#ecd2cc] bg-[#ecd2cc] text-[#2c0405]" : "border-[#fdfbf7]/15 bg-[#440c15] text-[#fdfbf7]"}`}
        >
            <span className="flex justify-center text-[13px] font-medium tracking-[-0.01em] md:text-[15px]">{label}</span>
            <span className={`mt-1 block text-[10px] leading-tight md:text-[11.5px] ${accent ? "text-[#2c0405]/65" : "text-[#fdfbf7]/55"}`}>{sub}</span>
        </motion.div>
    )
}
