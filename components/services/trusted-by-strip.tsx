"use client"

import Image from "next/image"
import { clientLogos } from "@/components/data/client-logos"
import { DrawLine, Reveal, ServiceSection } from "./primitives"

/**
 * The trusted-by logos, folded into the page flow as a quiet strip
 * instead of a standalone section.
 */
export function TrustedByStrip() {
  return (
    <ServiceSection ariaLabel="Trusted by" className="pb-16 md:pb-24">
      <DrawLine className="w-full" />
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 py-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400 shrink-0">
            Trusted by engineering teams at
          </p>
          <div className="flex items-center gap-8 flex-wrap">
            {clientLogos.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={24}
                loading="lazy"
                className="h-5 w-auto object-contain grayscale opacity-40 hover:opacity-60 transition-opacity duration-300"
              />
            ))}
          </div>
        </div>
      </Reveal>
      <DrawLine className="w-full" delay={0.1} />
    </ServiceSection>
  )
}
