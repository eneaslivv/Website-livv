import type { JournalPiece } from "@/types/journal"
import { getPieceUrl, getVerticalLabel } from "@/lib/journal/utils"

/**
 * Related reading list. LIVV editorial brief section 4.3 calls for
 * "2-3 related pieces, manually curated, not algorithmic". The curation
 * lives in piece.relatedSlugs on each JournalPiece — utils
 * `getRelatedPieces` resolves them to live pieces and fills any empty
 * slots with same-vertical fallbacks.
 *
 * Renders nothing if no related pieces exist (better than an empty
 * "Related" section).
 */
export function RelatedReading({ pieces }: { pieces: JournalPiece[] }) {
  if (!pieces.length) return null

  return (
    <aside
      aria-label="Related reading"
      className="max-w-3xl mx-auto px-6 mt-24 border-t border-[#2A1818]/10 pt-12"
    >
      <div className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A35A] mb-6">
        Related reading
      </div>
      <ul className="space-y-6 list-none pl-0">
        {pieces.map((r) => (
          <li key={r.id}>
            <a href={getPieceUrl(r)} className="block group">
              <div className="text-[10px] uppercase tracking-widest text-[#2A1818]/40 mb-1">
                {getVerticalLabel(r.vertical)}
              </div>
              <h3 className="text-lg md:text-xl font-semibold tracking-tight text-[#2A1818] group-hover:text-[#C4A35A] transition-colors leading-snug">
                {r.title}
              </h3>
              <p className="text-sm text-[#2A1818]/60 mt-1 leading-relaxed line-clamp-2">
                {r.dek}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
