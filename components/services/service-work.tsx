"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useInView, useReducedMotion } from "framer-motion"

import type { ServicePageContent, ServiceWorkItem } from "@/lib/service-pages-data"
import { trackPortfolioItemClick } from "@/lib/analytics"
import { ArrowLink, GRAIN, Label, Reveal, ServiceSection, TwoToneHeading } from "./primitives"

/**
 * 01 · Selected work. The references carry the page: one lead case with the
 * facts from its own case study, and two more in the /work card language.
 * Like every portfolio card on the site (README · Portfolio covers), the image
 * fills the card at 3:2: the beige only shows while it loads, so a mockup never
 * floats in a second frame around the background it already brings.
 *
 * Images skip the optimizer (`unoptimized`): /_next/image answers 402 once
 * Vercel's quota runs out, and these webps are already exported for retina.
 */

/** Muted loop that only plays while visible; reduced motion keeps the poster. */
export function LoopVideo({
  src,
  poster,
  className = "",
  active = true,
}: {
  src: string
  poster: string
  className?: string
  active?: boolean
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { margin: "200px 0px" })
  const reduced = useReducedMotion()

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (inView && active && !reduced) video.play().catch(() => {})
    else video.pause()
  }, [inView, active, reduced])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      className={className}
    />
  )
}

/**
 * A LIVV product has no photographed mockup: its promise, set large on a brand
 * grain, with the silence of the gradient underneath (brand guide 05.4). The
 * name is not repeated here — it is the card title right below.
 */
function ProductSurface({ item }: { item: ServiceWorkItem }) {
  if (!item.product) return null
  return (
    <div className="absolute inset-0">
      <Image src={GRAIN[item.product.surface]} alt="" fill unoptimized sizes="50vw" className="object-cover" />
      <div className="absolute inset-0 p-6 md:p-8">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">LIVV product</span>
        <p className="mt-4 max-w-[17rem] text-[1.6rem] md:text-[1.9rem] font-light leading-[1.1] tracking-[-0.03em] text-stone-900 text-balance">
          {item.product.kicker}.
        </p>
      </div>
    </div>
  )
}

function Cover({ item, className, sizes }: { item: ServiceWorkItem; className: string; sizes: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[10px] border border-[#e6e2db] bg-[#f1efe9] ${className}`}>
      {item.product ? (
        <ProductSurface item={item} />
      ) : item.video && item.image ? (
        <LoopVideo
          src={item.video}
          poster={item.image}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025]"
        />
      ) : item.image ? (
        <Image
          src={item.image}
          alt={`${item.name} — ${item.line}`}
          fill
          unoptimized
          sizes={sizes}
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025]"
        />
      ) : null}
    </div>
  )
}

function CardText({ item, lead = false }: { item: ServiceWorkItem; lead?: boolean }) {
  return (
    <>
      <div className="flex justify-between gap-3 text-[10px] uppercase tracking-[0.05em] text-[#837b70]">
        <span>{item.meta}</span>
        {item.year && <span className="tabular-nums">{item.year}</span>}
      </div>
      <div className="mt-1.5 flex items-baseline justify-between gap-3">
        <h3
          className={`${lead ? "text-2xl md:text-[1.75rem]" : "text-xl"} font-[450] leading-tight tracking-[-0.025em] text-[#242321]`}
        >
          {item.name}
        </h3>
        <ArrowUpRight
          aria-hidden
          className="h-[17px] w-[17px] shrink-0 text-[#8b8175] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>
      <p className={`mt-2 ${lead ? "text-[15px]" : "text-[13px]"} leading-relaxed text-[#777067] max-w-xl`}>{item.line}</p>
    </>
  )
}

export function ServiceWork({ content, location }: { content: ServicePageContent["work"]; location: string }) {
  const { lead, more } = content
  const track = (name: string) => () => trackPortfolioItemClick(name, location)

  return (
    <ServiceSection ariaLabel="Selected work" className="pt-4 md:pt-8 pb-16 md:pb-24">
      <div className="flex items-end justify-between gap-8">
        <div>
          <Reveal>
            <Label n={1}>Selected work</Label>
          </Reveal>
          <Reveal delay={0.06}>
            <TwoToneHeading text={content.heading} className="mt-5 max-w-2xl" />
          </Reveal>
        </div>
        <Reveal delay={0.12} className="hidden md:block shrink-0 pb-2">
          <Link
            href="/work"
            className="group text-[13px] text-stone-500 transition-colors duration-300 hover:text-stone-900 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-stone-400"
          >
            <ArrowLink>See all work</ArrowLink>
          </Link>
        </Reveal>
      </div>

      {/* Lead case: the largest mockup on the page, and the facts from its case study */}
      <Reveal delay={0.1} className="mt-10 md:mt-14">
        <Link
          href={lead.href}
          onClick={track(lead.name)}
          className="group block rounded-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-8 focus-visible:ring-stone-400"
        >
          <Cover item={lead} className="aspect-[3/2]" sizes="(max-width: 768px) 100vw, 976px" />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-6 md:gap-12">
            <div>
              <CardText item={lead} lead />
            </div>
            {lead.facts && (
              <dl className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 border-t border-stone-200 pt-5 md:border-t-0 md:pt-0">
                {lead.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">{fact.label}</dt>
                    <dd className="mt-1.5 text-[13px] leading-snug text-stone-700">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </Link>
      </Reveal>

      <ul className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-6 md:gap-y-12">
        {more.map((item, i) => (
          <Reveal as="li" key={item.href} delay={0.08 + i * 0.08}>
            <Link
              href={item.href}
              onClick={track(item.name)}
              className="group block rounded-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-8 focus-visible:ring-stone-400"
            >
              <Cover item={item} className="aspect-[3/2]" sizes="(max-width: 768px) 100vw, 488px" />
              <div className="pt-4">
                <CardText item={item} />
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>

      <Link
        href="/work"
        className="group mt-10 inline-flex md:hidden text-[13px] text-stone-600 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-stone-400"
      >
        <ArrowLink>See all work</ArrowLink>
      </Link>
    </ServiceSection>
  )
}
