import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import {
  getAllSlugs,
  getPieceBySlug,
  getRelatedPieces,
  getPieceUrl,
  getVerticalLabel,
} from "@/lib/journal/utils"
import { SITE_URL, STUDIO, buildBreadcrumbsJsonLd } from "@/lib/seo/structured-data"

/**
 * Editorial essay article page. Case studies live at /work/[slug], so any
 * piece with vertical "case-study" that lands here is redirected. Anything
 * not in the registry returns 404.
 *
 * This is a server component. AI crawlers must see the full essay body in
 * the initial HTML (brief 4.3, 5.3).
 */

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params
  const piece = getPieceBySlug(slug)
  if (!piece) return { title: "Not found" }

  return {
    title: piece.seoTitle || piece.title,
    description: piece.seoDescription || piece.dek,
    alternates: { canonical: `/journal/${piece.slug}` },
    openGraph: {
      type: "article",
      title: piece.title,
      description: piece.dek,
      url: `${SITE_URL}/journal/${piece.slug}`,
      siteName: "LIVV Creative Studio",
      publishedTime: piece.publishedAt,
      modifiedTime: piece.updatedAt,
      authors: [piece.author.name],
      images: piece.ogImage ? [{ url: piece.ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: piece.title,
      description: piece.dek,
      images: piece.ogImage ? [piece.ogImage] : undefined,
    },
  }
}

export default async function JournalArticlePage({ params }: RouteParams) {
  const { slug } = await params
  const piece = getPieceBySlug(slug)
  if (!piece) notFound()

  // Case studies live at /work/[slug] per brief 4.2. If we accidentally
  // route one here, redirect to the canonical location so any incoming
  // links from /journal index still resolve.
  if (piece.vertical === "case-study") {
    redirect(`/work/${piece.slug}`)
  }

  const related = getRelatedPieces(piece, 3)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: piece.title,
    description: piece.dek,
    image: piece.ogImage || piece.coverImage,
    datePublished: piece.publishedAt,
    dateModified: piece.updatedAt,
    author: { "@id": `${SITE_URL}#founder` },
    publisher: { "@id": `${SITE_URL}#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/journal/${piece.slug}`,
    },
    wordCount: piece.wordCount,
    articleSection: getVerticalLabel(piece.vertical),
    keywords: piece.tags.join(", "),
    inLanguage: "en-US",
    isPartOf: {
      "@type": "Blog",
      name: "LIVV Journal",
      url: `${SITE_URL}/journal`,
    },
  }

  const breadcrumbs = buildBreadcrumbsJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Journal", url: `${SITE_URL}/journal` },
    { name: piece.title, url: `${SITE_URL}/journal/${piece.slug}` },
  ])

  const formattedDate = new Date(piece.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const wasUpdated =
    new Date(piece.updatedAt).getTime() >
    new Date(piece.publishedAt).getTime() + 24 * 60 * 60 * 1000

  return (
    <main className="bg-[#FAF8F3] text-[#2A1818] selection:bg-[#E6E2D6] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <Navbar />

      <article className="pt-40 md:pt-52 pb-24">
        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 mb-16">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A35A] mb-6">
            {getVerticalLabel(piece.vertical)}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] mb-6">
            {piece.title}
          </h1>
          <p className="text-lg md:text-xl text-[#5A3E3E]/75 leading-relaxed mb-10">
            {piece.dek}
          </p>
          <div className="flex items-center gap-3 text-sm text-[#2A1818]/60 border-t border-[#2A1818]/10 pt-6">
            <span className="font-medium text-[#2A1818]/80">
              {piece.author.name}
            </span>
            <span>·</span>
            <time dateTime={piece.publishedAt}>{formattedDate}</time>
            <span>·</span>
            <span>{piece.readingTimeMinutes} min read</span>
          </div>
          {wasUpdated && (
            <p className="text-xs text-[#2A1818]/50 mt-2">
              Updated{" "}
              {new Date(piece.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </header>

        {/* Key Takeaways (for long pieces) */}
        {piece.keyTakeaways && piece.keyTakeaways.length > 0 && (
          <aside className="max-w-3xl mx-auto px-6 mb-12">
            <div className="border border-[#2A1818]/15 rounded-2xl p-6 md:p-8 bg-white/40">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A35A] mb-4">
                Key Takeaways
              </div>
              <ul className="space-y-2 text-base text-[#2A1818]/85">
                {piece.keyTakeaways.map((t, i) => (
                  <li key={i} className="leading-relaxed">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}

        {/* Body — content blocks render via a shared renderer (see commit 3
         *      for components/journal/* shells). For now we render plain
         *      placeholder text since no piece has registered yet.
         */}
        <div className="max-w-2xl mx-auto px-6 prose-livv">
          {piece.contentBlocks.length === 0 ? (
            <p className="text-base text-[#2A1818]/70 leading-relaxed">
              {piece.excerpt}
            </p>
          ) : (
            <p className="text-sm text-[#2A1818]/50 italic">
              {/* TODO(journal): wire up <ContentBlocksRenderer/> in commit 3.
                  Blocks reuse the BlogContentBlock primitives, but the
                  renderer is journal-specific so heading anchors, pullquote
                  styling, and FAQ accordions match the editorial brief
                  (section 4.3). */}
              Article body renderer ships with the journal component scaffold.
            </p>
          )}
        </div>

        {/* Related Reading */}
        {related.length > 0 && (
          <aside className="max-w-3xl mx-auto px-6 mt-24 border-t border-[#2A1818]/10 pt-12">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A35A] mb-6">
              Related Reading
            </div>
            <ul className="space-y-6">
              {related.map((r) => (
                <li key={r.id}>
                  <a href={getPieceUrl(r)} className="block group">
                    <div className="text-[10px] uppercase tracking-widest text-[#2A1818]/40 mb-1">
                      {getVerticalLabel(r.vertical)}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold tracking-tight group-hover:text-[#C4A35A] transition-colors">
                      {r.title}
                    </h3>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Author Bio */}
        <aside className="max-w-3xl mx-auto px-6 mt-24 border-t border-[#2A1818]/10 pt-12">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A35A] mb-4">
            About the author
          </div>
          <div className="flex items-start gap-4">
            {piece.author.avatar && (
              <img
                src={piece.author.avatar}
                alt={piece.author.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <a
                href={piece.author.url}
                className="font-semibold text-[#2A1818] hover:text-[#C4A35A] transition-colors"
              >
                {piece.author.name}
              </a>
              <p className="text-sm text-[#2A1818]/60">{piece.author.role}</p>
              <p className="text-xs text-[#2A1818]/50 mt-1">
                {STUDIO.legalName} · Buenos Aires, Argentina
              </p>
            </div>
          </div>
        </aside>
      </article>

      <FooterSection />
    </main>
  )
}
