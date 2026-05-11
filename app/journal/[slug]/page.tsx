import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import {
  ArticleHero,
  AuthorBio,
  JournalContentBlocksRenderer,
  KeyTakeaways,
  NewsletterSignup,
  RelatedReading,
  buildFaqPageJsonLd,
} from "@/components/journal"
import {
  getAllSlugs,
  getPieceBySlug,
  getRelatedPieces,
  getVerticalLabel,
} from "@/lib/journal/utils"
import { SITE_URL, buildBreadcrumbsJsonLd } from "@/lib/seo/structured-data"

/**
 * Editorial essay article page. Case studies live at /work/[slug] (brief
 * section 4.2) — pieces tagged as case-study redirect there so the
 * /journal index can still cross-link them and any direct URL still
 * lands on the canonical project page.
 *
 * Server component. Article body renders into the initial HTML, so AI
 * crawlers and AEO engines extract the full piece on first fetch (brief
 * section 4.3 / 5.3).
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

  // Fallback to the dynamic OG generator when the piece does not ship its
  // own ogImage. Determined by query string alone so it caches well at the
  // CDN — every reader of a given piece sees the same OG without us
  // pre-rendering one. Top-tier pieces still override by setting
  // piece.ogImage to a hand-designed asset.
  const ogImageUrl = piece.ogImage
    ? piece.ogImage
    : `${SITE_URL}/api/og/journal?title=${encodeURIComponent(piece.title)}&vertical=${piece.vertical}&date=${piece.publishedAt}&readTime=${piece.readingTimeMinutes}`

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
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: piece.title,
      description: piece.dek,
      images: [ogImageUrl],
    },
  }
}

export default async function JournalArticlePage({ params }: RouteParams) {
  const { slug } = await params
  const piece = getPieceBySlug(slug)
  if (!piece) notFound()

  // Case studies live at /work/[slug] per brief 4.2.
  if (piece.vertical === "case-study") {
    redirect(`/work/${piece.slug}`)
  }

  const related = getRelatedPieces(piece, 3)

  // Pull FAQ items out of the body so we can emit FAQPage schema in
  // addition to the inline rendering. Brief 5.1 requires both signals.
  const faqBlock = piece.contentBlocks.find((b) => b.type === "faq")
  const faqItems = faqBlock && faqBlock.type === "faq" ? faqBlock.items : []

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

  const faqJsonLd = faqItems.length ? buildFaqPageJsonLd(faqItems) : null

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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Navbar />

      <article className="pt-40 md:pt-52 pb-24">
        <ArticleHero piece={piece} />

        {piece.keyTakeaways && piece.keyTakeaways.length > 0 && (
          <div className="max-w-3xl mx-auto px-6">
            <KeyTakeaways items={piece.keyTakeaways} />
          </div>
        )}

        <div className="max-w-2xl mx-auto px-6">
          {piece.contentBlocks.length > 0 ? (
            <JournalContentBlocksRenderer blocks={piece.contentBlocks} />
          ) : (
            <p className="text-base text-[#2A1818]/70 leading-relaxed">
              {piece.excerpt}
            </p>
          )}
        </div>

        <div className="max-w-2xl mx-auto px-6">
          <NewsletterSignup variant="inline" />
        </div>

        <RelatedReading pieces={related} />
        <AuthorBio author={piece.author} />
      </article>

      <FooterSection />
    </main>
  )
}
