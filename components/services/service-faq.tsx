"use client"

import type { ServiceFaq } from "@/lib/service-faqs"
import { DrawLine, Label, Reveal, ServiceSection } from "./primitives"

/**
 * Visible FAQ block. Mirrors the FAQPage JSON-LD emitted by the service layout —
 * keep both driven by lib/service-faqs.ts so schema never drifts from content.
 */
export function ServiceFaqSection({ faqs, serviceName }: { faqs: readonly ServiceFaq[]; serviceName: string }) {
  if (faqs.length === 0) return null

  return (
    <ServiceSection ariaLabel="Frequently asked questions" className="pb-16 md:pb-24">
      <DrawLine className="w-full" />

      <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-20 lg:gap-24 pt-10 md:pt-16">
        <div>
          <Reveal>
            <Label>Questions</Label>
            <h2 className="mt-6 text-2xl md:text-3xl font-light leading-[1.2] tracking-tight text-stone-900 text-balance">
              {serviceName}, answered.
            </h2>
          </Reveal>
        </div>

        <dl className="flex flex-col">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={Math.min(i * 0.06, 0.3)}>
              <div className="border-t border-stone-200 py-6 last:border-b">
                <dt className="text-[17px] md:text-lg text-stone-900 font-light tracking-tight leading-snug text-balance">
                  {faq.q}
                </dt>
                <dd className="mt-2.5 text-[15px] text-stone-500 font-light leading-relaxed max-w-2xl">{faq.a}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </ServiceSection>
  )
}
