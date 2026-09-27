"use client"

import { motion, useReducedMotion } from "framer-motion"

import type { ServicePageContent } from "@/lib/service-pages-data"
import { trackCTAClick } from "@/lib/analytics"
import { DrawLine, EASE, Index, Label, PillLink, Reveal, ServiceSection, TwoToneHeading } from "./primitives"

/**
 * 03 · How we work. The hero's language carried down the page: a line that
 * draws itself, the same ringed nodes, and one glow travelling along it in the
 * service's accent (brand guide 09.3 — trace, expand, resolve). Then the terms
 * of the engagement and the one action that matters.
 */

/** The hero's node: a ring on the page colour with an accent dot. */
function Node({ accent, delay }: { accent: string; delay: number }) {
  const reduced = useReducedMotion()
  return (
    <motion.span
      aria-hidden
      className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-[1.5px] border-[#a8a29e] bg-[#FDFBF9]"
      initial={reduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-80px 0px" }}
      transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : delay, ease: EASE }}
    >
      <span className="h-1 w-1 rounded-full" style={{ backgroundColor: accent }} />
    </motion.span>
  )
}

function Track({ steps, accent }: { steps: ServicePageContent["process"]["steps"]; accent: string }) {
  const reduced = useReducedMotion()
  const glow = `linear-gradient(90deg, transparent 0%, transparent calc(100% - 160px), ${accent}00 calc(100% - 160px), ${accent} calc(100% - 20px), transparent 100%)`

  return (
    <div className="relative mt-12 md:mt-16">
      {/* Desktop rule, drawn left to right, with the travelling glow on top */}
      <div aria-hidden className="absolute left-0 right-0 top-[7.5px] hidden md:block">
        <motion.div
          className="h-px w-full origin-left bg-stone-300"
          initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: reduced ? 0 : 1.1, ease: EASE }}
        />
        {!reduced && (
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="h-px w-full"
              style={{ backgroundImage: glow, filter: "drop-shadow(0 0 3px rgba(0,0,0,0.08))" }}
              initial={{ x: "-100%" }}
              whileInView={{ x: ["-100%", "100%"] }}
              viewport={{ once: true, margin: "-80px 0px" }}
              transition={{ duration: 3.2, ease: "linear", delay: 1.4, repeat: Infinity, repeatDelay: 4 }}
            />
          </div>
        )}
      </div>

      {/* Mobile rule, drawn top to bottom */}
      <motion.div
        aria-hidden
        className="absolute left-[7.5px] top-2 bottom-2 w-px origin-top bg-stone-300 md:hidden"
        initial={reduced ? { scaleY: 1 } : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-80px 0px" }}
        transition={{ duration: reduced ? 0 : 1.1, ease: EASE }}
      />

      <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-10 lg:gap-14">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-5 md:block">
            <Node accent={accent} delay={0.25 + i * 0.3} />
            <Reveal delay={0.35 + i * 0.3} className="md:mt-7">
              <Index n={i + 1} />
              <h3 className="mt-2 text-xl font-light tracking-tight text-stone-900">{step.title}</h3>
              <p className="mt-2 text-[15px] font-light leading-relaxed text-stone-500 max-w-xs">{step.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function ServiceProcess({
  content,
  accent,
  location,
}: {
  content: ServicePageContent["process"]
  accent: string
  location: string
}) {
  return (
    <ServiceSection ariaLabel="How we work" className="pb-16 md:pb-24">
      <DrawLine className="w-full" />

      <div className="pt-10 md:pt-16">
        <Reveal>
          <Label n={3}>How we work</Label>
        </Reveal>
        <Reveal delay={0.06}>
          <TwoToneHeading text={content.heading} className="mt-5 max-w-3xl" />
        </Reveal>
      </div>

      <Track steps={content.steps} accent={accent} />

      <Reveal delay={0.2}>
        <div className="mt-14 md:mt-16 flex flex-col gap-8 border-t border-stone-200 pt-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-x-8">
            {content.terms.map((term) => (
              <li key={term} className="flex items-center gap-2.5 text-[13px] text-stone-600">
                <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-stone-400" />
                {term}
              </li>
            ))}
          </ul>
          <div className="shrink-0">
            <PillLink href="/contact" onClick={() => trackCTAClick("start_scoping", `${location}:process`)}>
              {content.action}
            </PillLink>
          </div>
        </div>
      </Reveal>
    </ServiceSection>
  )
}
