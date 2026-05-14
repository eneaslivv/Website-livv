import type { Metadata } from "next"
import type { ReactNode } from "react"
import { getCategoryIntro } from "@/lib/blog/category-intros"
import { getCategoryBySlug } from "@/lib/blog/categories"
import { SITE_URL } from "@/lib/seo/structured-data"

/**
 * Per-category metadata + JSON-LD.
 *
 * Search Console diagnostic (2026-05-14): all seven /blog/category/* pages
 * shipped with the same generic <title>("Blog | Livv Studio"), making
 * them duplicate-title pages in Google's eyes. Worse, the page component
 * is "use client" which means it cannot export generateMetadata directly.
 * The fix: this layout file (Server Component by default) reads category
 * data at request time and emits per-category title + description +
 * canonical, so each of the seven category surfaces has unique on-page
 * metadata.
 *
 * Also emits CollectionPage JSON-LD scoped to the category — the
 * Schema.org type for a curated grouping of resources, which is what a
 * blog category page is.
 */

interface CategoryParams {
  params: Promise<{ category: string }>
}

export async function generateMetadata({
  params,
}: CategoryParams): Promise<Metadata> {
  const { category: slug } = await params
  const intro = getCategoryIntro(slug)
  const category = getCategoryBySlug(slug)

  if (!intro || !category) {
    return {
      title: "Category not found · LIVV Creative Studio Blog",
      description: "The blog category you are looking for does not exist.",
    }
  }

  const canonical = `/blog/category/${slug}`
  return {
    title: intro.title,
    description: intro.description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title: intro.title,
      description: intro.description,
      url: `${SITE_URL}${canonical}`,
      siteName: "LIVV Creative Studio",
    },
    twitter: {
      card: "summary_large_image",
      title: intro.title,
      description: intro.description,
    },
  }
}

export default async function BlogCategoryLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ category: string }>
}) {
  const { category: slug } = await params
  const intro = getCategoryIntro(slug)
  const category = getCategoryBySlug(slug)

  // Emit a CollectionPage JSON-LD record so Google + AI extractors
  // understand this is a curated category surface, not an article. The
  // about field anchors it to the category's subject; the isPartOf
  // field references the parent blog. Cluster-page schema specifically.
  let collectionJsonLd: object | null = null
  if (intro && category) {
    collectionJsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/blog/category/${slug}#collection`,
      name: intro.title,
      description: intro.description,
      url: `${SITE_URL}/blog/category/${slug}`,
      isPartOf: {
        "@type": "Blog",
        "@id": `${SITE_URL}/blog#blog`,
        name: "LIVV Creative Studio Blog",
        url: `${SITE_URL}/blog`,
      },
      about: category.name,
      publisher: { "@id": `${SITE_URL}#organization` },
      inLanguage: ["en", "es"],
    }
  }

  return (
    <>
      {collectionJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
        />
      )}
      {children}
    </>
  )
}
