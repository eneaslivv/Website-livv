"use client"

import Link from "next/link"
import { Playfair_Display } from "next/font/google"
import { getAllPosts } from "@/lib/blog/utils"
import { SectionReveal } from "@/components/ui/section-reveal"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

/**
 * Recent Editorial — home-page section that surfaces the four flagship
 * editorial pieces in cluster H.
 *
 * Why this section exists (Search Console diagnostic, 2026-05-12):
 *   Google reports 57 URLs as "Discovered: currently not indexed". The
 *   primary lever for resolving that state is internal linking from
 *   indexed pages (the home is the highest-PageRank surface externally)
 *   to the under-indexed editorial corpus. Surfacing the four
 *   editorial pieces in their own section on the home pushes link juice
 *   directly to them.
 *
 * Why it ships as a real <Link> grid rather than a carousel or hover-
 * reveal: AI crawlers and Google's mobile indexer extract anchors from
 * initial HTML. A hover-only or JS-loaded list is invisible to them. The
 * section renders four <Link> elements with full hrefs in the SSR
 * output so every crawl pass collects all four internal links.
 *
 * Selection: pulls from getAllPosts() and filters by the cluster H slugs.
 * If a piece is unpublished (published: false) it disappears here too,
 * so taking a piece offline removes the internal link automatically.
 */

const EDITORIAL_SLUGS = [
  "argentine-creative-engineering-tradition",
  "webflow-vs-framer-in-2026",
  "white-label-playbook",
  "hiring-creative-engineering-studio",
] as const

export function RecentEditorialSection({ id }: { id?: string }) {
  const allPosts = getAllPosts()
  const pieces = EDITORIAL_SLUGS.map((slug) =>
    allPosts.find((p) => p.slug === slug),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p))

  if (pieces.length === 0) return null

  return (
    <section
      id={id}
      className="relative w-full py-24 md:py-40 px-6 md:px-12 bg-[#FAF8F3] border-t border-b border-[#1a1a1a]/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20 gap-6">
            <div className="max-w-xl">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1a1a1a]/40 mb-4 block">
                ✦  Editorial  ✦
              </span>
              <h2
                className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] font-light leading-[1.05] tracking-[-0.02em]`}
              >
                Writing on craft,{" "}
                <span className="text-gradient-gold italic">industry</span>,
                and the studio model.
              </h2>
            </div>
            <Link
              href="/blog"
              className="group flex items-center gap-2 text-sm font-medium text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors whitespace-nowrap"
            >
              <span className="border-b border-[#1a1a1a]/30 group-hover:border-[#1a1a1a] transition-colors">
                Read everything
              </span>
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1a1a1a]/10">
          {pieces.map((piece, i) => {
            const wordCountApprox =
              piece.readingTimeMinutes * 200 // ~200 wpm reading speed
            const isLong = wordCountApprox > 2500
            return (
              <SectionReveal key={piece.slug}>
                <Link
                  href={`/blog/${piece.slug}`}
                  className="group block relative bg-[#FAF8F3] hover:bg-white p-8 md:p-12 transition-colors duration-500 h-full"
                >
                  {/* Editorial corner number */}
                  <span className="absolute top-6 right-8 text-[10px] font-mono uppercase tracking-[0.3em] text-[#1a1a1a]/30">
                    0{i + 1}
                  </span>

                  {/* Category eyebrow */}
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#E8BC59] mb-4 block">
                    {piece.category.name}
                  </span>

                  {/* Title */}
                  <h3
                    className={`${playfair.className} text-2xl md:text-3xl text-[#1a1a1a] font-medium leading-[1.15] tracking-[-0.02em] mb-4 group-hover:text-[#1a1a1a]/80 transition-colors`}
                  >
                    {piece.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm md:text-base text-[#1a1a1a]/60 leading-relaxed font-light mb-8 max-w-md">
                    {piece.excerpt}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#1a1a1a]/10">
                    <span className="text-xs text-[#1a1a1a]/50">
                      {piece.readingTimeMinutes} min read
                      {isLong && (
                        <span className="ml-2 text-[#E8BC59]/80">
                          · Long-form
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-[#1a1a1a]/40 group-hover:text-[#1a1a1a] group-hover:translate-x-1 transition-all">
                      Read →
                    </span>
                  </div>
                </Link>
              </SectionReveal>
            )
          })}
        </div>

        <SectionReveal>
          <div className="mt-16 md:mt-20 max-w-3xl mx-auto text-center">
            <p className="text-sm text-[#1a1a1a]/50 leading-relaxed font-light">
              Plus a free, MIT-licensed{" "}
              <Link
                href="/resources/schema-aeo-library"
                className="text-[#1a1a1a] underline underline-offset-4 hover:text-[#E8BC59] transition-colors"
              >
                Schema + AEO Snippet Library
              </Link>{" "}
              with nine copy-paste JSON-LD templates for creative studios.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
