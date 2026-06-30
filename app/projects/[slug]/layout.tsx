import type { Metadata } from "next"
import type { PortfolioItem } from "@/types/livv-os"
import { pickDisplayCover } from "@/lib/default-project-blocks"

const SUPABASE_URL = "https://ngswutcpsgdgmmjnfddi.supabase.co"
const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nc3d1dGNwc2dkZ21tam5mZGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NzY3NDUsImV4cCI6MjA4MzE1Mjc0NX0.fd_OLVMTOMqN1EF-Ca1EV0MeclzM24kY0rOFDihvzd8"
const TENANT_SLUG = "livvv"
const SITE_URL = "https://livvvv.com"

async function getPortfolioItem(slug: string): Promise<PortfolioItem | null> {
    try {
        const res = await fetch(
            `${SUPABASE_URL}/rest/v1/rpc/get_public_portfolio_items`,
            {
                method: "POST",
                headers: {
                    apikey: SUPABASE_ANON_KEY,
                    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ p_tenant_slug: TENANT_SLUG }),
                next: { revalidate: 3600 },
            },
        )
        if (!res.ok) return null
        const items = (await res.json()) as PortfolioItem[]
        return Array.isArray(items)
            ? items.find((i) => i.slug === slug) || null
            : null
    } catch {
        return null
    }
}

function truncate(s: string, max = 160): string {
    const clean = s.replace(/\s+/g, " ").trim()
    if (clean.length <= max) return clean
    return clean.slice(0, max - 1).trimEnd() + "…"
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const item = await getPortfolioItem(slug)

    if (!item) {
        // Don't index unknown / unpublished projects.
        return {
            title: "Project Not Found | Livv Studio",
            description:
                "The project you're looking for doesn't exist or hasn't been published yet.",
            robots: { index: false, follow: false },
        }
    }

    const titleCore = item.title || "Project"
    const subtitle = item.subtitle ? ` — ${item.subtitle}` : ""
    const title = `${titleCore}${subtitle} | Case Study by Livv Studio`

    const descSource =
        item.description ||
        item.subtitle ||
        `${titleCore}: a case study by Livv Studio. ${item.category ? `Category: ${item.category}.` : ""} ${item.services ? `Services: ${item.services}.` : ""}`.trim()
    const description = truncate(descSource)

    const cover = pickDisplayCover(item) || undefined
    const url = `${SITE_URL}/projects/${item.slug}`

    return {
        title,
        description,
        alternates: { canonical: `/projects/${item.slug}` },
        openGraph: {
            title,
            description,
            url,
            type: "article",
            publishedTime: item.created_at,
            modifiedTime: item.updated_at,
            tags: item.tech_tags,
            images: cover
                ? [{ url: cover, width: 1200, height: 630, alt: item.title }]
                : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: cover ? [cover] : undefined,
        },
    }
}

function buildCaseStudyJsonLd(item: PortfolioItem) {
    const cover = pickDisplayCover(item)
    const url = `${SITE_URL}/projects/${item.slug}`
    // CreativeWork (not Article) is the correct schema for portfolio
    // case studies per Schema.org. Article is for editorial / news /
    // blog-shaped content. A portfolio case study describing a website,
    // app, brand, or design system the studio built is a CreativeWork.
    // Google Rich Results and AI extractors treat the type difference
    // as an entity signal — a CreativeWork ranks for portfolio /
    // showcase queries, an Article ranks for editorial queries.
    return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${url}#creativework`,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        name: item.title,
        description: item.subtitle || item.description?.slice(0, 200),
        image: cover ? [cover] : undefined,
        creator: { "@id": `${SITE_URL}#organization` },
        publisher: { "@id": `${SITE_URL}#organization` },
        dateCreated: item.created_at,
        dateModified: item.updated_at,
        about: item.category || undefined,
        keywords: [item.category, ...(item.tech_tags || [])]
            .filter(Boolean)
            .join(", "),
        inLanguage: ["en", "es"],
    }
}

function buildBreadcrumbJsonLd(item: PortfolioItem) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Work",
                item: `${SITE_URL}/work`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: item.title,
            },
        ],
    }
}

export default async function ProjectLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const item = await getPortfolioItem(slug)

    return (
        <>
            {item && (
                <>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(buildCaseStudyJsonLd(item)),
                        }}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(buildBreadcrumbJsonLd(item)),
                        }}
                    />
                </>
            )}
            {children}
        </>
    )
}
