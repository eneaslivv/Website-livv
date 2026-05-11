import { getAllPieces, getPieceUrl, getVerticalLabel } from "@/lib/journal/utils"
import { SITE_URL, STUDIO } from "@/lib/seo/structured-data"

/**
 * RSS 2.0 feed for the LIVV Journal. Mandated by the LIVV editorial brief
 * section 4.7 to support newsletter / aggregator discovery and to feed PR
 * workflows. Feed scope is /journal pieces only — the /blog corpus has its
 * own SEO-driven audience and is not included here on purpose so the RSS
 * subscribers get the curated editorial cadence rather than every SEO post.
 */

export const dynamic = "force-static"
export const revalidate = 3600 // Rebuild hourly so a new piece appears without a deploy.

function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function toRfc2822(iso: string): string {
  return new Date(iso).toUTCString()
}

export async function GET() {
  const pieces = getAllPieces()
  const lastBuildDate = pieces[0]
    ? toRfc2822(pieces[0].updatedAt)
    : new Date().toUTCString()

  const items = pieces
    .map((p) => {
      const url = `${SITE_URL}${getPieceUrl(p)}`
      const category = getVerticalLabel(p.vertical)
      return `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${toRfc2822(p.publishedAt)}</pubDate>
      <description>${escapeXml(p.dek)}</description>
      <author>noreply@livv.systems (${escapeXml(p.author.name)})</author>
      <category>${escapeXml(category)}</category>
    </item>`
    })
    .join("")

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(STUDIO.legalName)} · Journal</title>
    <link>${SITE_URL}/journal</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Essays on craft, industry, and case studies from ${escapeXml(STUDIO.legalName)}.</description>
    <language>en-us</language>
    <copyright>© ${new Date().getFullYear()} ${escapeXml(STUDIO.legalName)}</copyright>
    <managingEditor>hola@livv.systems (${escapeXml(STUDIO.founder.name)})</managingEditor>
    <webMaster>hola@livv.systems (${escapeXml(STUDIO.founder.name)})</webMaster>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>LIVV Creative Studio site (Next.js App Router)</generator>${items}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
