import type { MetadataRoute } from "next"
import { getAllPosts, getAllCategories } from "@/lib/blog/utils"

const BASE_URL = "https://livvvv.com"
const SUPABASE_URL = "https://ngswutcpsgdgmmjnfddi.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nc3d1dGNwc2dkZ21tam5mZGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NzY3NDUsImV4cCI6MjA4MzE1Mjc0NX0.fd_OLVMTOMqN1EF-Ca1EV0MeclzM24kY0rOFDihvzd8"
const TENANT_SLUG = "livvv"

// Regenerate the sitemap once an hour so newly published projects / products
// in the CMS appear without needing a redeploy.
export const revalidate = 3600

interface CmsItem {
    slug?: string
    updated_at?: string
    published?: boolean
}

async function fetchFromSupabaseRpc(rpcName: string): Promise<CmsItem[]> {
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${rpcName}`, {
            method: "POST",
            headers: {
                apikey: SUPABASE_ANON_KEY,
                Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ p_tenant_slug: TENANT_SLUG }),
            next: { revalidate: 3600 },
        })
        if (!res.ok) return []
        const data = (await res.json()) as CmsItem[]
        return Array.isArray(data) ? data : []
    } catch {
        // Sitemap must never throw — fall back to no CMS-driven URLs.
        return []
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // ── Static pages ────────────────────────────────────────────────────
    const staticPages: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
        { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/work`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/agencies`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/studio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ]

    // ── Specialized landings (rewrites in next.config.mjs to /lp/*.html) ─
    // Only canonical slugs are listed. Aliases like /for-founders, /for-dtc,
    // /for-shopify resolve to the same content as their canonical variant
    // (currently rewrites — should ideally be 301 redirects to avoid duplicate
    // content; tracked as a separate follow-up).
    const landingPages: MetadataRoute.Sitemap = [
        { url: `${BASE_URL}/for`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE_URL}/for-agencies`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
        { url: `${BASE_URL}/for-startups`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
        { url: `${BASE_URL}/for-saas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
        { url: `${BASE_URL}/for-ecommerce`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    ]

    // ── CMS-driven pages (fetched at build time, revalidated hourly) ────
    const [portfolioItems, productItems] = await Promise.all([
        fetchFromSupabaseRpc("get_public_portfolio_items"),
        fetchFromSupabaseRpc("get_public_products"),
    ])

    // Project case studies — /projects/[slug]
    const projectPages: MetadataRoute.Sitemap = portfolioItems
        .filter((item) => item.slug && item.published !== false)
        .map((item) => ({
            url: `${BASE_URL}/projects/${item.slug}`,
            lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.85,
        }))

    // Products — /products/[slug] (replaces previous hardcoded list)
    const productPages: MetadataRoute.Sitemap = productItems
        .filter((item) => item.slug && item.published !== false)
        .map((item) => ({
            url: `${BASE_URL}/products/${item.slug}`,
            lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        }))

    // ── Services (no public RPC yet — kept hardcoded until one exists) ──
    const serviceSlugs = ["creative-engineering", "product-strategy-ui", "motion-narrative"]
    const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
        url: `${BASE_URL}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }))

    // ── Blog (file-based, already dynamic) ──────────────────────────────
    const blogIndex: MetadataRoute.Sitemap = [
        { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ]
    const blogPostPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }))
    const blogCategoryPages: MetadataRoute.Sitemap = getAllCategories().map((cat) => ({
        url: `${BASE_URL}/blog/category/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
    }))

    return [
        ...staticPages,
        ...landingPages,
        ...projectPages,
        ...productPages,
        ...servicePages,
        ...blogIndex,
        ...blogPostPages,
        ...blogCategoryPages,
    ]
}
