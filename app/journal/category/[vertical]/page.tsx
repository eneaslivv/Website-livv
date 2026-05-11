import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import {
  getPiecesByVertical,
  getPieceUrl,
  getVerticalLabel,
} from "@/lib/journal/utils"
import {
  JOURNAL_VERTICALS,
  getVerticalBySlug,
  isJournalVertical,
} from "@/lib/journal/verticals"
import { buildBreadcrumbsJsonLd, SITE_URL } from "@/lib/seo/structured-data"

/**
 * Filtered index per editorial vertical. Routes:
 *   /journal/category/process-craft
 *   /journal/category/industry
 *   /journal/category/case-study   (case studies link to /work/<slug>)
 *
 * Brief 4.2 mandates this surface so each vertical has a real index page
 * that AI crawlers and search engines can index as a category landing.
 */

interface RouteParams {
  params: Promise<{ vertical: string }>
}

export async function generateStaticParams() {
  return JOURNAL_VERTICALS.map((v) => ({ vertical: v.slug }))
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { vertical } = await params
  const meta = getVerticalBySlug(vertical)
  if (!meta) return { title: "Not found" }
  return {
    title: meta.name,
    description: meta.description,
    alternates: { canonical: `/journal/category/${meta.slug}` },
    openGraph: {
      type: "website",
      title: `${meta.name} · LIVV Journal`,
      description: meta.description,
      url: `${SITE_URL}/journal/category/${meta.slug}`,
      siteName: "LIVV Creative Studio",
    },
  }
}

export default async function JournalCategoryPage({ params }: RouteParams) {
  const { vertical } = await params
  if (!isJournalVertical(vertical)) notFound()
  const meta = getVerticalBySlug(vertical)
  if (!meta) notFound()

  const pieces = getPiecesByVertical(vertical)

  const breadcrumbs = buildBreadcrumbsJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Journal", url: `${SITE_URL}/journal` },
    { name: meta.name, url: `${SITE_URL}/journal/category/${meta.slug}` },
  ])

  return (
    <main className="bg-[#FAF8F3] text-[#2A1818] selection:bg-[#E6E2D6] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <Navbar />

      <div className="pt-40 md:pt-52">
        <header className="max-w-6xl mx-auto px-6 mb-16">
          <div className="max-w-3xl">
            <a
              href="/journal"
              className="text-xs uppercase tracking-widest text-[#2A1818]/50 hover:text-[#C4A35A] mb-4 inline-block"
            >
              ← Journal
            </a>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight mb-6">
              {meta.name}
            </h1>
            <p className="text-lg text-[#5A3E3E]/70 leading-relaxed max-w-xl">
              {meta.description}
            </p>
          </div>

          <nav aria-label="Verticals" className="mt-12 flex flex-wrap gap-3">
            {JOURNAL_VERTICALS.map((v) => (
              <a
                key={v.slug}
                href={`/journal/category/${v.slug}`}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${
                  v.slug === meta.slug
                    ? "bg-[#2A1818] text-white"
                    : "border border-[#2A1818]/15 hover:bg-[#2A1818]/5"
                }`}
              >
                {v.name}
              </a>
            ))}
          </nav>
        </header>

        <section className="max-w-6xl mx-auto px-6 pb-24">
          {pieces.length > 0 ? (
            <ul className="grid gap-12 md:gap-16 border-t border-[#2A1818]/10 pt-12">
              {pieces.map((p) => (
                <li
                  key={p.id}
                  className="border-b border-[#2A1818]/10 pb-12 last:border-b-0"
                >
                  <a href={getPieceUrl(p)} className="block group">
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
                No pieces published yet in {getVerticalLabel(meta.slug)}.
                The first pieces ship in 2026.
              </p>
            </div>
          )}
        </section>
      </div>

      <FooterSection />
    </main>
  )
}
