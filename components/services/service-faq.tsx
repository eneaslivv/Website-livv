"use client"

import { useState } from "react"
import type { ServiceFaq } from "@/lib/service-faqs"
import { DrawLine, Label, Reveal, ServiceSection } from "./primitives"

/**
 * Visible FAQ block. Mirrors the FAQPage JSON-LD emitted by the service layout —
 * keep both driven by lib/service-faqs.ts so schema never drifts from content.
 *
 * Answers collapse to keep the page short, but stay in the DOM: crawlers and
 * answer engines read them whether or not a visitor opens one.
 */
export function ServiceFaqSection({ faqs, serviceName }: { faqs: readonly ServiceFaq[]; serviceName: string }) {
  const [open, setOpen] = useState<number | null>(0)
  if (faqs.length === 0) return null

  return (
    <ServiceSection ariaLabel="Frequently asked questions" className="pb-16 md:pb-24">
      <DrawLine className="w-full" />

      <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-20 lg:gap-24 pt-10 md:pt-16">
        <div>
          <Reveal>
            <Label n={4}>Questions</Label>
            <h2 className="mt-5 text-[1.75rem] md:text-[2.5rem] font-light leading-[1.12] tracking-[-0.03em] text-stone-900 text-balance">
              {serviceName}, <span className="text-muted-foreground">answered.</span>
            </h2>
          </Reveal>
        </div>

        <dl className="flex flex-col">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              // dl > div > dt/dd: the Reveal is the group wrapper itself
              <Reveal key={faq.q} delay={Math.min(i * 0.05, 0.25)} className="border-t border-stone-200 last:border-b">
                <dt>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-start justify-between gap-6 py-5 text-left rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-stone-400"
                  >
                    <span className="text-[17px] md:text-lg font-light leading-snug tracking-tight text-stone-900 text-balance">
                      {faq.q}
                    </span>
                    <span
                      aria-hidden
                      className={`relative mt-1.5 h-3 w-3 shrink-0 text-stone-400 transition-transform duration-300 ease-out group-hover:text-stone-900 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                      <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current" />
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-${i}`}
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-8 text-[15px] font-light leading-relaxed text-stone-500 max-w-2xl">{faq.a}</p>
                  </div>
                </dd>
              </Reveal>
            )
          })}
        </dl>
      </div>
    </ServiceSection>
  )
}
