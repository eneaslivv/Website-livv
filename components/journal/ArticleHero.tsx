import type { JournalPiece } from "@/types/journal"
import { getVerticalLabel } from "@/lib/journal/utils"

/**
 * Header for editorial essays (vertical: process-craft or industry).
 * Renders the vertical tag, title, dek, byline, date, and reading time.
 *
 * Layout follows LIVV editorial brief section 4.3:
 *   1. H1 with primary topic
 *   2. Dek (15-25 word subtitle)
 *   3. Byline + date visible immediately
 *
 * Server-rendered so AI crawlers see the full header in initial HTML.
 */
export function ArticleHero({ piece }: { piece: JournalPiece }) {
  const formattedDate = new Date(piece.publishedAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  )

  const wasUpdated =
    new Date(piece.updatedAt).getTime() >
    new Date(piece.publishedAt).getTime() + 24 * 60 * 60 * 1000

  const formattedUpdate = wasUpdated
    ? new Date(piece.updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return (
    <header className="max-w-3xl mx-auto px-6 mb-16">
      <a
        href={`/journal/category/${piece.vertical}`}
        className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A35A] mb-6 inline-block hover:text-[#2A1818] transition-colors"
      >
        {getVerticalLabel(piece.vertical)}
      </a>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] mb-6 text-[#2A1818]">
        {piece.title}
      </h1>
      <p className="text-lg md:text-xl text-[#5A3E3E]/75 leading-relaxed mb-10 max-w-2xl">
        {piece.dek}
      </p>
      <div className="flex flex-wrap items-center gap-3 text-sm text-[#2A1818]/60 border-t border-[#2A1818]/10 pt-6">
        <a
          href={piece.author.url}
          className="font-medium text-[#2A1818]/80 hover:text-[#C4A35A] transition-colors"
        >
          {piece.author.name}
        </a>
        <span aria-hidden="true">·</span>
        <time dateTime={piece.publishedAt}>{formattedDate}</time>
        <span aria-hidden="true">·</span>
        <span>{piece.readingTimeMinutes} min read</span>
      </div>
      {formattedUpdate && (
        <p className="text-xs text-[#2A1818]/50 mt-2">
          Updated {formattedUpdate}
        </p>
      )}
    </header>
  )
}
