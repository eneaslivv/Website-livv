"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import type { ServicePageContent, ServiceVisual } from "@/lib/service-pages-data"
import { ArrowLink, DrawLine, GRAIN, Index, Label, Reveal, ServiceSection, TwoToneHeading } from "./primitives"
import { LoopVideo } from "./service-work"

/**
 * 02 · What we do. Each capability is shown with a piece of real work instead
 * of a paragraph: on desktop the list drives one sticky frame (hover, focus or
 * tap), on mobile every capability carries its own image. One line of copy
 * each — the detail lives in the FAQ.
 */

const FRAME = "relative aspect-[4/3] overflow-hidden rounded-[10px] border border-[#e6e2db] bg-[#f1efe9]"

/** Buenos Aires against New York, computed live: the overlap claim, shown instead of told. */
function TimezonesVisual() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const timer = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(timer)
  }, [])

  const time = (timeZone: string) =>
    now ? new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone }).format(now) : "—"
  // Hour offset between the two zones, from their wall-clock hours right now.
  const hourIn = (timeZone: string) =>
    now ? Number(new Intl.DateTimeFormat("en-US", { hour: "numeric", hourCycle: "h23", timeZone }).format(now)) : 0
  const gap = now ? (hourIn("America/Argentina/Buenos_Aires") - hourIn("America/New_York") + 24) % 24 : null

  return (
    <div className="absolute inset-0">
      <Image src={GRAIN.burdeos} alt="" fill unoptimized sizes="50vw" className="object-cover" />
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-9">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">Right now</span>
        <dl className="flex flex-col gap-5">
          {[
            ["Buenos Aires", "America/Argentina/Buenos_Aires"],
            ["New York", "America/New_York"],
          ].map(([city, zone]) => (
            <div key={city} className="flex items-baseline justify-between gap-6 border-b border-stone-900/10 pb-4">
              <dt className="text-[13px] text-stone-600">{city}</dt>
              <dd className="text-[2.25rem] md:text-[2.75rem] font-light leading-none tracking-[-0.03em] tabular-nums text-stone-900">
                {time(zone)}
              </dd>
            </div>
          ))}
        </dl>
        <p className="text-[12px] text-white/90">
          {gap === null ? " " : gap === 0 ? "Same time today" : `${gap} ${gap === 1 ? "hour" : "hours"} apart today`}
        </p>
      </div>
    </div>
  )
}

function VisualLayer({ visual, active = true, sizes }: { visual: ServiceVisual; active?: boolean; sizes: string }) {
  if (visual.kind === "timezones") return <TimezonesVisual />
  if (visual.kind === "video")
    return (
      <LoopVideo
        src={visual.src}
        poster={visual.poster}
        active={active}
        className="absolute inset-0 h-full w-full object-contain p-3.5 md:p-5"
      />
    )
  return <Image src={visual.src} alt={visual.caption} fill unoptimized sizes={sizes} className="object-contain p-3.5 md:p-5" />
}

function Caption({ visual }: { visual: ServiceVisual }) {
  return (
    <p className="mt-3 flex items-baseline justify-between gap-4 text-[11px] tracking-[0.02em] text-stone-500">
      <span>{visual.caption}</span>
      {"href" in visual && visual.href && (
        <Link
          href={visual.href}
          className="group shrink-0 text-stone-600 transition-colors duration-300 hover:text-stone-900 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-stone-400"
        >
          <ArrowLink>View case</ArrowLink>
        </Link>
      )}
    </p>
  )
}

export function ServiceCapabilities({ content }: { content: ServicePageContent["capabilities"] }) {
  const [active, setActive] = useState(0)
  const { items } = content

  return (
    <ServiceSection ariaLabel="What we do" className="pb-16 md:pb-24">
      <DrawLine className="w-full" />

      <div className="pt-10 md:pt-16">
        <Reveal>
          <Label n={2}>What we do</Label>
        </Reveal>
        <Reveal delay={0.06}>
          <TwoToneHeading text={content.heading} className="mt-5 max-w-3xl" />
        </Reveal>
      </div>

      <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-[1fr_1.12fr] gap-12 lg:gap-16">
        <ol className="flex flex-col gap-12 md:gap-0">
          {items.map((item, i) => {
            const isActive = active === i
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 0.08}
                className="md:border-t md:border-stone-200 md:last:border-b"
              >
                {/* Mobile: each capability carries its own image */}
                <div className="md:hidden">
                  <div className={FRAME}>
                    <VisualLayer visual={item.visual} sizes="100vw" />
                  </div>
                  <Caption visual={item.visual} />
                </div>

                <h3 className="mt-6 md:mt-0">
                  <button
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={`capability-${i}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group flex w-full items-baseline gap-5 text-left md:py-6 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-stone-400"
                  >
                    <Index n={i + 1} />
                    <span
                      className={`text-xl lg:text-[1.375rem] font-light leading-snug tracking-tight transition-colors duration-300 ${
                        isActive ? "text-stone-900" : "text-stone-900 md:text-stone-400 md:group-hover:text-stone-700"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                </h3>

                {/* Always expanded on mobile; on desktop only the active one opens */}
                <div
                  id={`capability-${i}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] grid-rows-[1fr] ${
                    isActive ? "md:grid-rows-[1fr] md:opacity-100" : "md:grid-rows-[0fr] md:opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pt-3 pl-[2.1rem] text-[15px] font-light leading-relaxed text-stone-500 max-w-md">{item.line}</p>
                    <ul className="flex flex-wrap gap-2 pt-4 pl-[2.1rem] md:pb-6">
                      {item.deliverables.map((d) => (
                        <li
                          key={d}
                          className="rounded-full border border-stone-200 bg-white/60 px-2.5 py-1 text-[11px] text-stone-600"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ol>

        {/* Desktop: one sticky frame, the layers cross-fade so nothing reloads */}
        <Reveal delay={0.12} className="hidden md:block">
          <div className="sticky top-28">
            <div className={FRAME}>
              {items.map((item, i) => (
                <div
                  key={item.title}
                  aria-hidden={active !== i}
                  className={`absolute inset-0 transition-opacity duration-500 ease-out ${active === i ? "opacity-100" : "opacity-0"}`}
                >
                  <VisualLayer visual={item.visual} active={active === i} sizes="540px" />
                </div>
              ))}
            </div>
            <Caption visual={items[active].visual} />
          </div>
        </Reveal>
      </div>
    </ServiceSection>
  )
}
