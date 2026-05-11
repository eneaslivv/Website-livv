import type { FaqItem } from "@/types/blog"

/**
 * Editorial FAQ section. Uses native <details>/<summary> instead of a
 * JS-driven accordion so:
 *
 *   1. The answers ship in the initial HTML and are visible to every AI
 *      crawler that does not run JavaScript (LIVV editorial brief section
 *      4.3 / 5.3 hard requirement).
 *   2. The element is keyboard-accessible and screen-reader-friendly with
 *      no extra ARIA wiring.
 *   3. No "use client" pragma is needed, which keeps the renderer
 *      server-side end-to-end.
 *
 * Default state is closed for visual density, but the open state is just
 * one click away — and the answer is in the DOM regardless of state, so
 * AEO extraction works either way.
 */
export function JournalFaq({ items }: { items: FaqItem[] }) {
  if (!items.length) return null

  return (
    <section className="my-12" aria-label="Frequently asked questions">
      <h2 className="text-2xl md:text-[1.875rem] font-semibold tracking-tight text-[#2A1818] mb-6">
        Frequently asked
      </h2>
      <div className="border-t border-[#2A1818]/10">
        {items.map((item, i) => (
          <details
            key={i}
            className="group border-b border-[#2A1818]/10 py-5"
          >
            <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
              <span className="text-base md:text-lg font-medium text-[#2A1818] leading-snug">
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 w-7 h-7 rounded-full border border-[#2A1818]/20 flex items-center justify-center text-[#2A1818]/60 transition-transform duration-200 group-open:rotate-45"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className="pt-4 text-base text-[#2A1818]/80 leading-[1.7] max-w-2xl">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}

/**
 * FAQPage JSON-LD builder. Pieces with a FAQ section should emit this
 * schema in addition to the Article schema, so search engines and AI
 * engines treat each Q/A as an extractable fact.
 */
export function buildFaqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}
