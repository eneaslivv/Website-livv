"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { AnimatedBorders } from "@/components/ui/animated-borders"

/**
 * Shared editorial primitives for the service page sections.
 * Thin lines, small uppercase labels, restrained reveals — no new visual language.
 */

export const SERVICE_ACCENT = "#2C0405"
const EASE = [0.22, 1, 0.36, 1] as const

/** Small uppercase editorial label. */
export function Label({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={`block text-[10px] font-semibold uppercase tracking-[0.2em] ${accent ? "" : "text-stone-400"}`}
      style={accent ? { color: SERVICE_ACCENT } : undefined}
    >
      {children}
    </span>
  )
}

/** Margin index number: 01, 02, 03. */
export function Index({ n }: { n: number }) {
  return (
    <span className="text-[11px] font-medium tabular-nums tracking-[0.1em] text-stone-400">
      {String(n).padStart(2, "0")}
    </span>
  )
}

/** 1px rule that draws itself from 0% to 100% as the section enters view. */
export function DrawLine({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      aria-hidden
      className={`h-px bg-stone-200 origin-left ${className}`}
      initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay, ease: EASE }}
    />
  )
}

/** Opacity + small vertical translation reveal, staggered by `delay`. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: "div" | "li"
}) {
  const reduced = useReducedMotion()
  const Component = as === "li" ? motion.li : motion.div
  return (
    <Component
      className={className}
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </Component>
  )
}

/** Text link with the quiet arrow interaction used across the site. */
export function ArrowLink({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      {children}
      <svg
        aria-hidden
        className="w-3 h-3 transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M2.5 6h7M6.5 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

/** Section shell: shared container width, vertical rhythm and top rule. */
export function ServiceSection({
  children,
  className = "",
  ariaLabel,
}: {
  children: ReactNode
  className?: string
  ariaLabel: string
}) {
  return (
    <section aria-label={ariaLabel} className={`w-full relative z-20 ${className}`}>
      {/* The site-wide dashed grid. Every service block routes through this
          shell, so adding it once keeps the rules continuous down the page
          instead of cutting out across the service sections. */}
      <AnimatedBorders className="hidden md:block" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">{children}</div>
    </section>
  )
}
