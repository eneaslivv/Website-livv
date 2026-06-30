import Link from "next/link"
import { Playfair_Display } from "next/font/google"
import { getAllPosts } from "@/lib/blog/utils"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

/**
 * Editorial Picks — surfaces cluster H flagship pieces from every
 * /blog/[slug] page (44 published posts × 4 editorial links each =
 * ~176 new internal links pointing at the editorial corpus).
 *
 * Companion to RelatedPosts, which already cross-links within the
 * same category cluster. This widget specifically pulls the four
 * editorial pieces, regardless of the current post's category, so
 * an SEO cluster post on Webflow CMS still surfaces the four
 * editorial essays.
 *
 * Self-link guard: when the current post IS one of the four
 * editorial pieces, the widget hides entirely. The remaining three
 * editorials are surfaced by the regular RelatedPosts widget via
 * each piece's relatedPostSlugs field.
 */

const EDITORIAL_SLUGS = [
  "argentine-creative-engineering-tradition",
  "webflow-vs-framer-in-2026",
  "white-label-playbook",
  "hiring-creative-engineering-studio",
] as const

export function EditorialPicks({ currentSlug }: { currentSlug?: string }) {
  // If the current post is itself an editorial piece, hide the widget
  // — RelatedPosts already cross-links the editorial cluster via the
  // relatedPostSlugs field on each piece.
  if (
    currentSlug &&
    (EDITORIAL_SLUGS as readonly string[]).includes(currentSlug)
  ) {
    return null
  }

  const allPosts = getAllPosts()
  const pieces = EDITORIAL_SLUGS.map((slug) =>
    allPosts.find((p) => p.slug === slug),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p))

  if (pieces.length === 0) return null

  return (
    <section
      aria-labelledby="editorial-picks-heading"
      className="max-w-5xl mx-auto mt-20 mb-12 px-6"
    >
      <div className="border-t border-[#1a1a1a]/10 pt-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#E8BC59] mb-2 block">
              ✦  From the Journal  ✦
            </span>
            <h2
              id="editorial-picks-heading"
              className={`${playfair.className} text-2xl md:text-3xl text-[#1a1a1a] font-medium tracking-[-0.02em] leading-tight`}
            >
              Editorial pieces on craft and the studio model.
            </h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-xs font-medium text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors"
          >
            <span className="border-b border-[#1a1a1a]/20 group-hover:border-[#1a1a1a] transition-colors">
              All writing
            </span>
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1a1a1a]/10">
          {pieces.map((piece, i) => (
            <Link
              key={piece.slug}
              href={`/blog/${piece.slug}`}
              className="group block bg-white hover:bg-[#FAF8F3] p-6 md:p-8 transition-colors duration-300 relative"
            >
              <span className="absolute top-4 right-6 text-[10px] font-mono uppercase tracking-[0.3em] text-[#1a1a1a]/25">
                0{i + 1}
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#E8BC59] mb-3 block">
                {piece.category.name}
              </span>
              <h3
                className={`${playfair.className} text-lg md:text-xl text-[#1a1a1a] font-medium leading-snug tracking-[-0.01em] mb-3 group-hover:text-[#1a1a1a]/80 transition-colors`}
              >
                {piece.title}
              </h3>
              <p className="text-xs md:text-sm text-[#1a1a1a]/55 leading-relaxed font-light line-clamp-2">
                {piece.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-2 text-[11px] text-[#1a1a1a]/40">
                <span>{piece.readingTimeMinutes} min read</span>
                <span>·</span>
                <span className="group-hover:text-[#1a1a1a] group-hover:translate-x-0.5 inline-block transition-all">
                  Read
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
