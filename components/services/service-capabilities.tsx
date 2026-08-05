"use client"

import type { ServiceCapability } from "@/lib/service-pages-data"
import { DrawLine, Index, Label, Reveal, ServiceSection } from "./primitives"

export function ServiceCapabilities({
  label,
  capabilities,
}: {
  label: string
  capabilities: readonly ServiceCapability[]
}) {
  return (
    <ServiceSection ariaLabel="Core capabilities" className="pb-16 md:pb-24">
      <Reveal>
        <Label>{label}</Label>
      </Reveal>

      <DrawLine className="w-full mt-6" />

      {/* Three columns split by thin vertical rules on desktop, horizontal rules on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-stone-200">
        {capabilities.map((cap, i) => (
          <Reveal
            key={cap.title}
            delay={i * 0.1}
            className={`py-10 md:py-12 ${i > 0 ? "border-t border-stone-200 md:border-t-0" : ""} ${
              i === 0 ? "md:pr-8 lg:pr-10" : i === capabilities.length - 1 ? "md:pl-8 lg:pl-10" : "md:px-8 lg:px-10"
            }`}
          >
            <Index n={i + 1} />
            <h3 className="mt-4 text-xl md:text-[1.375rem] text-stone-900 font-light tracking-tight leading-snug text-balance">
              {cap.title}
            </h3>
            <p className="mt-4 text-[15px] text-stone-500 font-light leading-relaxed">{cap.body}</p>

            <ul className="mt-7 flex flex-col gap-2.5">
              {cap.deliverables.map((d) => (
                <li key={d} className="flex items-center gap-3 text-[13px] text-stone-600 font-light">
                  <span aria-hidden className="w-4 h-px bg-stone-300 shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <DrawLine className="w-full" delay={0.2} />
    </ServiceSection>
  )
}
