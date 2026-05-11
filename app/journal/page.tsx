import type { Metadata } from "next"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { getAllPieces, getPieceUrl, getVerticalLabel } from "@/lib/journal/utils"
import { JOURNAL_VERTICALS } from "@/lib/journal/verticals"
import { buildBreadcrumbsJsonLd, SITE_URL } from "@/lib/seo/structured-data"

/**
 * Journal index. Lists every published editorial piece across the three
 * verticals defined in the LIVV editorial brief (section 3.1). Case-study
 * pieces link out to /work/[slug] via getPieceUrl(), everything else to
 * /journal/[slug] on the same surface.
 *
 * This route renders server-side so AI crawlers see the full list of
 * pieces in the initial HTML (brief 4.3 requirement).
 */

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Essays on craft, industry, and case studies from LIVV Creative Studio. Writing on how we build, what we believe about the industry, and the projects that shaped us.",
  alternates: { canonical: "/journal" },
}

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Home", url: SITE_URL },
  { name: "Journal", url: `${SITE_URL}/journal` },
])

export default function JournalIndexPage() {
  const pieces = getAllPieces()
  const hasPieces = pieces.length > 0

  return (
    <main className="bg-[#FAF8F3] text-[#2A1818] selection:bg-[#E6E2D6] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <Navbar />

      <div className="pt-40 md:pt-52">
        {/* Hero */}
        <header className="max-w-6xl mx-auto px-6 mb-16">
          <div className="max-w-3xl">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A35A] mb-4 block">
              Journal
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight mb-6">
              Essays on craft, industry, and case studies.
            </h1>
            <p className="text-lg text-[#5A3E3E]/70 leading-relaxed max-w-xl">
              Writing from LIVV Creative Studio on how we build, what we
              believe about the industry, and the projects that shaped us.
            </p>
          </div>

          <nav aria-label="Verticals" className="mt-12 flex flex-wrap gap-3">
            {JOURNAL_VERTICALS.map((v) => (
              <a
                key={v.slug}
                href={`/journal/category/${v.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2A1818]/15 text-sm hover:bg-[#2A1818]/5 transition-colors"
              >
                {v.name}
              </a>
            ))}
          </nav>
        </header>

        {/* Pieces grid or empty state */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          {hasPieces ? (
            <ul className="grid gap-12 md:gap-16 border-t border-[#2A1818]/10 pt-12">
              {pieces.map((p) => (
                <li key={p.id} className="border-b border-[#2A1818]/10 pb-12 last:border-b-0">
                  <a href={getPieceUrl(p)} className="block group">
                    <div className="text-[10px] uppercase tracking-widest text-[#C4A35A] mb-3 font-semibold">
                      {getVerticalLabel(p.vertical)}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight mb-3 group-hover:text-[#C4A35A] transition-colors">
                      {p.title}
                    </h2>
                    <p className="text-base text-[#5A3E3E]/70 leading-relaxed max-w-2xl mb-4">
                      {p.dek}
                    </p>
                    <div className="text-xs text-[#2A1818]/50">
                      <time dateTime={p.publishedAt}>
                        {new Date(p.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <span className="mx-2">·</span>
                      {p.readingTimeMinutes} min read
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="max-w-2xl border-t border-[#2A1818]/10 pt-12">
              <p className="text-base text-[#2A1818]/70 leading-relaxed">
                The Journal launches with the LIVV editorial program in 2026.
                New essays and case studies publish on a regular cadence.
                Until then, you can read existing writing on the{" "}
                <a
                  href="/blog"
                  className="underline underline-offset-4 hover:text-[#C4A35A]"
                >
                  blog
                </a>
                .
              </p>
            </div>
          )}
        </section>
      </div>

      <FooterSection />
    </main>
  )
}
