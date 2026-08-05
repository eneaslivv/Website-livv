"use client"

import Link from "next/link"
import type { ServiceFinalCta } from "@/lib/service-pages-data"
import { ArrowLink, DrawLine, Label, Reveal, ServiceSection } from "./primitives"

/**
 * Service-specific closing CTA. Routes into the existing /contact flow —
 * no separate form system is introduced.
 */
export function ServiceFinalCTA({ content }: { content: ServiceFinalCta }) {
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
                <span className="text-stone-400">{content.headlineAccent}</span>
              </>
            )}
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 text-lg text-stone-500 font-light leading-relaxed max-w-xl">{content.body}</p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center text-[13px] font-medium tracking-tight text-stone-50 bg-stone-900 rounded-full px-7 py-3.5 hover:bg-stone-800 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-stone-500"
            >
              <ArrowLink>{content.action}</ArrowLink>
            </Link>

            {content.secondary && (
              <Link
                href={content.secondary.href}
                className="group inline-flex text-[13px] text-stone-500 hover:text-stone-900 transition-colors duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-stone-400"
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
