import type { JournalPiece } from "@/types/journal"
import { StackBadge } from "./StackBadge"

/**
 * Header for case studies (vertical: case-study). Renders the project
 * name, year, services list, client type, stack, and optional hero
 * media — the LIVV editorial brief section 6.3 / 3.2 hero shape.
 *
 * Distinct from ArticleHero so case studies feel like project pages,
 * not essays. Layout is denser at the top because case studies pack
 * more context into the hero (services, client type, stack).
 */
export function CaseStudyHero({ piece }: { piece: JournalPiece }) {
  const meta = piece.caseStudy
  if (!meta) {
    // Editor configuration error — case-study pieces must ship caseStudy
    // metadata. Render a minimal ArticleHero-equivalent fallback instead
    // of crashing the page.
    return (
      <header className="max-w-3xl mx-auto px-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05] mb-6 text-[#2A1818]">
          {piece.title}
        </h1>
        <p className="text-lg text-[#5A3E3E]/75 leading-relaxed">{piece.dek}</p>
      </header>
    )
  }

  return (
    <header className="max-w-5xl mx-auto px-6 mb-16">
      <div className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A35A] mb-6">
        Case Study · {meta.year}
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] mb-6 text-[#2A1818]">
        {piece.title}
      </h1>
      <p className="text-lg md:text-xl text-[#5A3E3E]/75 leading-relaxed mb-12 max-w-2xl">
        {piece.dek}
      </p>

      {/* Hero image */}
      {piece.coverImage && (
        <figure className="mb-12 rounded-2xl overflow-hidden border border-[#2A1818]/10">
          <img
            src={piece.coverImage}
            alt={`${piece.title} cover`}
            className="w-full h-auto"
            loading="eager"
          />
        </figure>
      )}

      {/* Meta row */}
      <dl className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#2A1818]/10 pt-8 max-w-4xl">
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-widest text-[#2A1818]/50 mb-2">
            Services
          </dt>
          <dd className="text-sm text-[#2A1818]/85 leading-relaxed">
            {meta.services.join(", ")}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-widest text-[#2A1818]/50 mb-2">
            Client
          </dt>
          <dd className="text-sm text-[#2A1818]/85 leading-relaxed">
            {meta.clientType}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-widest text-[#2A1818]/50 mb-2">
            Stack
          </dt>
          <dd className="flex flex-wrap gap-2">
            {meta.stack.map((s, i) => (
              <StackBadge key={i} badge={s} />
            ))}
          </dd>
        </div>
      </dl>
    </header>
  )
}
