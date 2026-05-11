import type { StackBadge as StackBadgeData } from "@/types/journal"

/**
 * Small visual tag for stack used on a case study. Renders the tool name
 * with an optional role caption. Used inside CaseStudyHero stack row.
 */
export function StackBadge({ badge }: { badge: StackBadgeData }) {
  return (
    <span className="inline-flex items-baseline gap-2 px-3 py-1.5 rounded-full border border-[#2A1818]/15 bg-white/60 text-xs">
      <span className="font-medium text-[#2A1818]">{badge.name}</span>
      {badge.role && (
        <span className="text-[#2A1818]/50 text-[10px]">{badge.role}</span>
      )}
    </span>
  )
}
