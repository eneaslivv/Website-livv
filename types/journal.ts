/* ── Journal system types ──
 *
 * The Journal is the editorial surface mandated by the LIVV editorial brief
 * (section 3). Every piece is tagged with one of three verticals and one of
 * four article types. See lib/journal/verticals.ts for the canonical taxonomy
 * and the editorial brief sections 3.1 and 3.2 for definitions.
 *
 * Case studies live at /work/[slug] (separate route), so for vertical
 * "case-study" pieces, `getPieceUrl(piece)` returns "/work/<slug>" while
 * editorial essays return "/journal/<slug>". A single JournalPiece record
 * still drives both the /journal index card and the /work detail page,
 * which keeps the editorial taxonomy and case-study cards in lockstep.
 */

import type { BlogContentBlock } from "./blog"

export type JournalVertical = "process-craft" | "industry" | "case-study"

export interface JournalVerticalMeta {
  slug: JournalVertical
  /** Display name, e.g. "Process & Craft". */
  name: string
  /** Compact label for nav chips, e.g. "Craft". */
  shortName: string
  description: string
}

/**
 * Drives layout choices on the article page. An editorial essay surfaces a
 * Key Takeaways box plus optional FAQ. A case study surfaces decision points
 * and a stack badge row. A resource page renders a download CTA. A manifesto
 * renders as a single flowing essay with no H2 sections (see brief 3.2).
 */
export type JournalArticleType =
  | "editorial-essay"
  | "case-study"
  | "resource"
  | "manifesto"

export interface DecisionPoint {
  /** Short noun-phrase title, e.g. "The typographic system choice". */
  title: string
  /** What the problem was. 1-3 sentences. */
  problem: string
  /** What we decided. 1-2 sentences. */
  decision: string
  /** Why we decided that. 2-4 sentences. */
  reasoning: string
}

export interface StackBadge {
  /** Tool name, e.g. "Next.js 15", "Supabase", "Webflow". */
  name: string
  /** Optional role, e.g. "Framework", "Database", "CMS". */
  role?: string
}

export interface CaseStudyMeta {
  /** Year project shipped, e.g. "2024". */
  year: string
  /** Services delivered (matches the canonical service taxonomy in brief 5.2). */
  services: string[]
  /** Client type, e.g. "Direct" or "White-label for [Agency]". */
  clientType: string
  /** Stack badges shown in hero. */
  stack: StackBadge[]
  /** Decision points (3-5 per brief 6.3). */
  decisionPoints: DecisionPoint[]
  /** Optional outcomes paragraph (specific metrics, post-launch reactions). */
  outcomes?: string
  /** Optional reflection paragraph (what we'd do differently). */
  reflection?: string
}

export interface JournalAuthor {
  /** Author full name. For bylines + Person schema linkage. */
  name: string
  role: string
  avatar?: string
  /** URL of the author's profile, used as schema.org Person @id reference. */
  url: string
}

export interface JournalPiece {
  id: string
  slug: string
  title: string
  /** Subtitle / dek. 15-25 words per brief 5.3. */
  dek: string
  /** Short excerpt for grid cards and RSS. */
  excerpt: string
  vertical: JournalVertical
  articleType: JournalArticleType
  author: JournalAuthor
  coverImage: string
  ogImage?: string
  /** ISO 8601 timestamps. */
  publishedAt: string
  updatedAt: string
  readingTimeMinutes: number
  wordCount: number
  /** Reuses the BlogContentBlock primitives from types/blog.ts. */
  contentBlocks: BlogContentBlock[]
  /** Optional Key Takeaways shown at top of long pieces. 3-5 bullets. */
  keyTakeaways?: string[]
  /** Slugs of related pieces. Manual curation per brief 4.3 RelatedReading. */
  relatedSlugs: string[]
  /** Free-form tags for weak grouping. */
  tags: string[]
  /** Required only when articleType === "case-study". */
  caseStudy?: CaseStudyMeta
  seoTitle: string
  seoDescription: string
  /** False = drafted but not yet visible publicly. */
  published: boolean
  /** Surfaces in the featured grid on the index. */
  featured: boolean
  /** Sort priority within a vertical (lower = first). */
  displayOrder: number
}
