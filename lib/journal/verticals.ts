import type { JournalVerticalMeta, JournalVertical } from "@/types/journal"

/**
 * Canonical taxonomy from the LIVV editorial brief, section 3.1.
 * Order matters: surfaces that render verticals as nav chips should
 * follow this exact order so the editorial brand reads the same way
 * everywhere.
 */
export const JOURNAL_VERTICALS: JournalVerticalMeta[] = [
  {
    slug: "process-craft",
    name: "Process & Craft",
    shortName: "Craft",
    description:
      "Technical and craft writing about how LIVV builds. Tooling decisions, code patterns, design system thinking, performance, AI integration.",
  },
  {
    slug: "industry",
    name: "Industry",
    shortName: "Industry",
    description:
      "Opinion pieces about the design and development industry. The white-label model, agency economics, AI, hiring, the Argentine creative engineering tradition.",
  },
  {
    slug: "case-study",
    name: "Case Studies",
    shortName: "Cases",
    description:
      "Documentary-style writing about real projects. Decision points, artifacts, outcomes, and what we would do differently.",
  },
]

export function getVerticalBySlug(
  slug: string,
): JournalVerticalMeta | undefined {
  return JOURNAL_VERTICALS.find((v) => v.slug === slug)
}

export function isJournalVertical(value: string): value is JournalVertical {
  return JOURNAL_VERTICALS.some((v) => v.slug === value)
}
