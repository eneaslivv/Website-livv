"use client"

import { useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useInView } from "framer-motion"

import type { ServiceFinalCta } from "@/lib/service-pages-data"
import { LiquidMetalButton } from "@/components/button-styling/liquid-metal-button"
import { trackCTAClick } from "@/lib/analytics"
import { navigateWithCover } from "@/lib/page-cover"
import { ArrowLink, DrawLine, Label, Reveal, ServiceSection } from "./primitives"

/**
 * Service-specific closing CTA. It ends on the same liquid-metal «start scoping»
 * button the hero opens with, so the page starts and closes on one action.
 * The button mounts only near the viewport: its shader is a WebGL canvas.
 * Routes into the existing /contact flow — no separate form system.
 */
export function ServiceFinalCTA({ content, location }: { content: ServiceFinalCta; location: string }) {
  const router = useRouter()
  const slot = useRef<HTMLDivElement>(null)
  const near = useInView(slot, { once: true, margin: "300px 0px" })

  const start = () => {
    trackCTAClick("start_scoping", `${location}:final`)
    navigateWithCover("/contact", () => router.push("/contact"))
  }

  return (
    <ServiceSection ariaLabel="Next step" className="pb-24 md:pb-36">
      <DrawLine className="w-full" />

      <div className="pt-14 md:pt-20 max-w-3xl">
        <Reveal>
          <Label accent>{content.label}</Label>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-7 text-3xl md:text-5xl font-light leading-[1.12] tracking-tighter text-stone-900 text-balance">
            {content.headline}
            {content.headlineAccent && (
              <>
                <br />
                <span className="text-muted-foreground">{content.headlineAccent}</span>
              </>
            )}
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 text-lg text-stone-500 font-light leading-relaxed max-w-xl">{content.body}</p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
            {/* Same footprint before and after the shader mounts, so nothing jumps */}
            <div ref={slot} className="min-h-[52px] min-w-[160px]">
              {near ? (
                <LiquidMetalButton label="start scoping" onClick={start} />
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex h-[52px] items-center rounded-full bg-stone-900 px-8 text-[13px] text-stone-50"
                >
                  start scoping
                </Link>
              )}
            </div>

            {content.secondary && (
              <Link
                href={content.secondary.href}
                className="group inline-flex min-h-11 items-center md:min-h-0 text-[13px] text-stone-500 hover:text-stone-900 transition-colors duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-stone-400"
              >
                <ArrowLink>{content.secondary.text}</ArrowLink>
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </ServiceSection>
  )
}
