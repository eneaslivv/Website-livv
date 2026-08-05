"use client"

import type { ServiceTransformation as Content } from "@/lib/service-pages-data"
import { DrawLine, Index, Label, Reveal, ServiceSection } from "./primitives"

export function ServiceTransformation({ content }: { content: Content }) {
  return (
    <ServiceSection ariaLabel="The challenge and the outcome" className="pt-16 md:pt-24 pb-16 md:pb-24">
      <DrawLine className="w-full" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 lg:gap-28 pt-10 md:pt-16">
        {/* Challenge */}
        <Reveal>
          <Label>{content.challengeLabel}</Label>
          <p className="mt-6 text-lg md:text-xl text-stone-500 font-light leading-relaxed">{content.challenge}</p>
        </Reveal>

        {/* Outcome */}
        <Reveal delay={0.12}>
          <Label accent>{content.outcomeLabel}</Label>
          <p className="mt-6 text-2xl md:text-3xl text-stone-900 font-light leading-[1.25] tracking-tight text-balance">
            {content.outcome}
          </p>

          <ul className="mt-10 flex flex-col">
            {content.outcomePoints.map((point, i) => (
              <Reveal as="li" key={point} delay={0.2 + i * 0.08}>
                <DrawLine className="w-full" delay={0.2 + i * 0.08} />
                <div className="flex items-baseline gap-5 py-4">
                  <Index n={i + 1} />
                  <span className="text-base text-stone-700 font-light tracking-tight">{point}</span>
                </div>
              </Reveal>
            ))}
            <DrawLine className="w-full" delay={0.44} />
          </ul>
        </Reveal>
      </div>
    </ServiceSection>
  )
}
