"use client"

import { trackContactClick } from "@/lib/analytics"

/**
 * Email + booking CTAs at the bottom of /about. Lifted into its own
 * client component because the page itself is a Server Component (per
 * LIVV editorial brief 4.3 / 5.3 — manifesto body must render in
 * initial HTML for AI crawler extractability). Only this tiny
 * interactive piece needs "use client".
 */
export function AboutContactCTAs() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href="mailto:hola@livv.systems"
        onClick={() => trackContactClick("email", "about_page")}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2A1818] text-[#FAF8F3] text-sm font-medium hover:bg-[#2A1818]/90 transition-colors"
      >
        hola@livv.systems
      </a>
      <a
        href="https://cal.com/eneas-aldabe-youfep/15min"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#2A1818]/15 text-sm font-medium text-[#2A1818] hover:bg-[#2A1818]/5 transition-colors"
      >
        Book 15 min
      </a>
    </div>
  )
}
