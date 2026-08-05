"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"

import type { ServiceProcessStep, ServiceProof } from "@/lib/service-pages-data"
import { ProductScreen } from "@/components/portfolio-preview/project-folder/product-screen"
import { ArrowLink, DrawLine, Index, Label, Reveal, ServiceSection } from "./primitives"

const EASE = [0.22, 1, 0.36, 1] as const

/** Measures a container so the rendered UI mock can be sized in real pixels. */
function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    setWidth(el.getBoundingClientRect().width)
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return { ref, width }
}

function ProofVisual({ proof }: { proof: ServiceProof }) {
  const reduced = useReducedMotion()
  const { ref, width } = useElementWidth<HTMLDivElement>()

  return (
    <div ref={ref} className="relative">
      {/* Mask reveal: the content slides up behind a fixed frame. Transform + opacity
          only, so it degrades to "just visible" rather than clipping content away. */}
      <div className="relative overflow-hidden border border-stone-200 bg-white" style={{ aspectRatio: "16 / 10" }}>
        <motion.div
          className="absolute inset-0"
          initial={reduced ? { y: 0, opacity: 1 } : { y: "14%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduced ? 0 : 0.7, ease: EASE }}
        >
          {proof.image ? (
            <Image
              src={proof.image}
              alt={`${proof.name} — ${proof.category}`}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          ) : proof.screen && width > 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <ProductScreen variant={proof.screen} accent={proof.accent} index={0} width={width} />
            </div>
          ) : null}
        </motion.div>
      </div>

      {/* Quiet technical annotations */}
      <div className="mt-3 flex items-center gap-4">
        {proof.annotations.map((a, i) => (
          <Reveal key={a} delay={0.3 + i * 0.08}>
            <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-stone-400">{a}</span>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export function ServiceProcessAndProof({
  processLabel,
  process,
  proof,
}: {
  processLabel: string
  process: readonly ServiceProcessStep[]
  proof: ServiceProof
}) {
  return (
    <ServiceSection ariaLabel="Process and proof" className="pb-16 md:pb-24">
      <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-14 md:gap-20 lg:gap-24">
        {/* Process */}
        <div>
          <Reveal>
            <Label>{processLabel}</Label>
          </Reveal>

          <ol className="mt-8 flex flex-col">
            {process.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.1}>
                <DrawLine className="w-full" delay={i * 0.1} />
                <div className="flex gap-5 py-6">
                  <Index n={i + 1} />
                  <div>
                    <h3 className="text-lg text-stone-900 font-light tracking-tight">{step.title}</h3>
                    <p className="mt-1.5 text-[15px] text-stone-500 font-light leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <DrawLine className="w-full" delay={0.3} />
          </ol>
        </div>

        {/* Proof */}
        <div>
          <Reveal>
            <Label>Relevant work</Label>
          </Reveal>

          <Reveal delay={0.1} className="mt-8">
            <ProofVisual proof={proof} />
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-7">
              <h3 className="text-xl text-stone-900 font-light tracking-tight">{proof.name}</h3>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-stone-400">{proof.category}</p>

              <dl className="mt-6 flex flex-col gap-4">
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">Challenge</dt>
                  <dd className="mt-1.5 text-[15px] text-stone-500 font-light leading-relaxed">{proof.challenge}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">Our part</dt>
                  <dd className="mt-1.5 text-[15px] text-stone-500 font-light leading-relaxed">{proof.contribution}</dd>
                </div>
              </dl>

              <Link
                href={proof.href}
                className="group mt-6 inline-flex text-[13px] font-medium tracking-tight text-stone-900 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-stone-400"
              >
                <ArrowLink>View {proof.name}</ArrowLink>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </ServiceSection>
  )
}
