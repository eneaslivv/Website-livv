import type { Metadata } from "next"

const SUPABASE_URL = "https://ngswutcpsgdgmmjnfddi.supabase.co"
const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nc3d1dGNwc2dkZ21tam5mZGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NzY3NDUsImV4cCI6MjA4MzE1Mjc0NX0.fd_OLVMTOMqN1EF-Ca1EV0MeclzM24kY0rOFDihvzd8"
const SITE_URL = "https://livvvv.com"

interface CategoryRow {
    id: string
    name: string
    slug: string
    description: string | null
    image_url: string | null
    type: string
}

type CategoryFetch =
    | { state: "found"; row: CategoryRow }
    | { state: "not-found" }
    | { state: "unavailable" } // schema cache miss / network / RLS error

async function getCategory(slug: string): Promise<CategoryFetch> {
    try {
        const res = await fetch(
            `${SUPABASE_URL}/rest/v1/categories?slug=eq.${encodeURIComponent(slug)}&status=eq.active&select=*&limit=1`,
            {
                headers: {
                    apikey: SUPABASE_ANON_KEY,
                    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                },
                next: { revalidate: 3600 },
            },
        )
        if (!res.ok) {
            // 4xx/5xx — likely PGRST205 schema cache or RLS denial. Don't
            // assume the slug is invalid; fall back to neutral indexable
            // metadata so we don't accidentally noindex real categories.
            return { state: "unavailable" }
        }
        const rows = (await res.json()) as CategoryRow[]
        if (!Array.isArray(rows) || rows.length === 0) return { state: "not-found" }
        return { state: "found", row: rows[0] }
    } catch {
        return { state: "unavailable" }
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
    const result = await getCategory(slug)

    // The slug exists in URL but not in the DB → invalid, don't index.
    if (result.state === "not-found") {
        return {
            title: "Category Not Found | LIVV Creative Studio",
            description:
                "The category you're looking for doesn't exist or isn't published.",
            robots: { index: false, follow: false },
        }
    }

    // We couldn't reach the DB (schema cache, RLS, network). Render neutral
    // indexable metadata using the slug — better than noindex'ing real pages.
    if (result.state === "unavailable") {
        const niceName = slug
            .replace(/[-_]+/g, " ")
            .replace(/\b\w/g, (m) => m.toUpperCase())
        return {
            title: `${niceName} | LIVV Creative Studio`,
            description: `Explore ${niceName} products and services by LIVV Creative Studio.`,
            alternates: { canonical: `/category/${slug}` },
        }
    }

    const cat = result.row
    const kindLabel =
        cat.type === "service"
            ? "Services"
            : cat.type === "product"
                ? "Products"
                : "Products & Services"

    const title = `${cat.name} ${kindLabel} | LIVV Creative Studio`
    const description = truncate(
        cat.description ||
            `Explore ${cat.name.toLowerCase()} ${kindLabel.toLowerCase()} crafted by LIVV Creative Studio — boutique design and engineering for ambitious teams.`,
    )
    const url = `${SITE_URL}/category/${cat.slug}`

    return {
        title,
        description,
        alternates: { canonical: `/category/${cat.slug}` },
        openGraph: {
            title,
            description,
            url,
            type: "website",
            images: cat.image_url
                ? [{ url: cat.image_url, width: 1200, height: 630, alt: cat.name }]
                : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: cat.image_url ? [cat.image_url] : undefined,
        },
    }
}

export default function CategoryLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
