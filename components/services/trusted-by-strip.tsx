"use client"

import Image from "next/image"
import { clientLogos } from "@/components/data/client-logos"
import { DrawLine, Reveal, ServiceSection } from "./primitives"

/**
 * The client logos, folded into the page flow as a quiet strip right under the
 * hero: the first proof a visitor meets, before any copy asks for their time.
 * Same wording as the home («Some of our clients») — they are clients, not all
 * of them engineering teams.
 */
export function TrustedByStrip({ className = "pb-16 md:pb-24" }: { className?: string }) {
  return (
    <ServiceSection ariaLabel="Some of our clients" className={className}>
      <DrawLine className="w-full" />
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 py-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400 shrink-0">
            Some of our clients
          </p>
          <div className="grid grid-cols-2 items-center gap-x-8 gap-y-6 md:flex md:flex-wrap md:gap-8">
            {clientLogos.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={24}
                loading="lazy"
                className="h-5 w-auto max-w-[104px] object-contain object-left md:max-w-none grayscale opacity-40 hover:opacity-60 transition-opacity duration-300"
              />
            ))}
          </div>
        </div>
      </Reveal>
      <DrawLine className="w-full" delay={0.1} />
    </ServiceSection>
  )
}
