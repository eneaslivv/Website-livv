import type { JournalPiece, JournalVertical } from "@/types/journal"

/**
 * In-memory registry of journal pieces. Pieces register themselves on first
 * access by importing the posts barrel (lib/journal/posts/index.ts), which
 * keeps content additions to a single-file edit per piece.
 *
 * Mirrors the /blog system in lib/blog/utils.ts so contributors switching
 * between the two surfaces hit the same mental model. The two registries
 * stay separate on purpose: the /blog corpus is SEO-cluster traffic content,
 * the /journal corpus is brief-compliant editorial work. Mixing them would
 * dilute both audiences.
 */
let _allPieces: JournalPiece[] | null = null

function ensureLoaded(): JournalPiece[] {
  if (_allPieces) return _allPieces
  _allPieces = []
  try {
    // Trigger lazy import to register pieces.
    require("./posts")
  } catch (err) {
    // Posts barrel may be empty during scaffold phase, which is expected
    // until the first piece registers. Don't blow up the index page.
    if (
      process.env.NODE_ENV !== "production" &&
      err &&
      typeof err === "object" &&
      "code" in err &&
      (err as { code?: string }).code !== "MODULE_NOT_FOUND"
    ) {
      // Re-throw non-MODULE_NOT_FOUND errors so real bugs surface.
      throw err
    }
  }
  return _allPieces
}

export function registerPieces(pieces: JournalPiece[]) {
  if (!_allPieces) _allPieces = []
  _allPieces.push(...pieces)
}

export function getAllPieces(): JournalPiece[] {
  return ensureLoaded()
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
}

export function getAllPiecesIncludingDrafts(): JournalPiece[] {
  return [...ensureLoaded()].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}

export function getPieceBySlug(slug: string): JournalPiece | undefined {
  return ensureLoaded().find((p) => p.slug === slug)
}

export function getPiecesByVertical(
  vertical: JournalVertical,
): JournalPiece[] {
  return getAllPieces().filter((p) => p.vertical === vertical)
}

export function getFeaturedPieces(): JournalPiece[] {
  return getAllPieces().filter((p) => p.featured)
}

export function getRelatedPieces(
  piece: JournalPiece,
  limit = 3,
): JournalPiece[] {
  const all = getAllPieces()
  const related = piece.relatedSlugs
    .map((slug) => all.find((p) => p.slug === slug))
    .filter(Boolean) as JournalPiece[]

  if (related.length >= limit) return related.slice(0, limit)

  // Fill remaining slots with same-vertical pieces not already pinned.
  const sameVertical = all.filter(
    (p) =>
      p.vertical === piece.vertical &&
      p.slug !== piece.slug &&
      !related.find((r) => r.slug === p.slug),
  )
  return [...related, ...sameVertical].slice(0, limit)
}

export function getAllSlugs(): string[] {
  return getAllPieces().map((p) => p.slug)
}

/**
 * Resolve the canonical URL for a journal piece. Case studies live at
 * /work/[slug] per brief section 4.2, everything else at /journal/[slug].
 * Always use this helper instead of hardcoding `/journal/${slug}` so the
 * brief's URL convention stays in one place.
 */
export function getPieceUrl(piece: JournalPiece): string {
  if (piece.vertical === "case-study") return `/work/${piece.slug}`
  return `/journal/${piece.slug}`
}

export function getVerticalLabel(vertical: JournalVertical): string {
  switch (vertical) {
    case "process-craft":
      return "Process & Craft"
    case "industry":
      return "Industry"
    case "case-study":
      return "Case Study"
  }
}
