import type { DecisionPoint as DecisionPointData } from "@/types/journal"

/**
 * Decision point block. The structural unit of a LIVV case study per
 * editorial brief section 3.2 / 6.3: title, problem, decision, reasoning.
 * 3-5 of these per case study, each 200-400 words.
 *
 * Renders as a labelled section with a numbered badge so the case study
 * reads like a documentary walkthrough. Each decision is its own
 * scroll-anchorable section.
 */
export function DecisionPoint({
  index,
  point,
}: {
  index: number
  point: DecisionPointData
}) {
  const slug = point.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
  const anchorId = `decision-${index + 1}-${slug}`

  return (
    <section
      id={anchorId}
      className="my-16 scroll-mt-24 border-t border-[#2A1818]/10 pt-12 first:border-t-0 first:pt-0"
    >
      <div className="flex items-baseline gap-4 mb-6">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A35A]">
          Decision {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h2 className="text-2xl md:text-[1.875rem] font-semibold tracking-tight text-[#2A1818] mb-8 leading-snug">
        {point.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-2">
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[#2A1818]/50 mb-3">
            The problem
          </h3>
          <p className="text-base text-[#2A1818]/85 leading-[1.65]">
            {point.problem}
          </p>
        </div>
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[#2A1818]/50 mb-3">
            The decision
          </h3>
          <p className="text-base text-[#2A1818]/85 leading-[1.65]">
            {point.decision}
          </p>
        </div>
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[#2A1818]/50 mb-3">
            The reasoning
          </h3>
          <p className="text-base text-[#2A1818]/85 leading-[1.65]">
            {point.reasoning}
          </p>
        </div>
      </div>
    </section>
  )
}
