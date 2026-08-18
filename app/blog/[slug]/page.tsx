import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { BlogPostHeader } from "@/components/blog/BlogPostHeader"
import { BlogContentRenderer } from "@/components/blog/BlogContentRenderer"
import { TableOfContents } from "@/components/blog/TableOfContents"
import { RelatedPosts } from "@/components/blog/RelatedPosts"
import { EditorialPicks } from "@/components/blog/EditorialPicks"
import { BlogCTA } from "@/components/blog/BlogCTA"
import { getPostBySlug, getRelatedPosts, toBlogCardPost } from "@/lib/blog/utils"

/**
 * Server component. Rendering this on the client bundled every post in the
 * corpus into the route's JavaScript just to display one of them. The page
 * needs no browser state — the interactive pieces (table of contents, CTA)
 * are their own client components.
 *
 * Inter is applied by the root layout, so the route-level next/font call
 * that used to live here only downloaded a second copy of the same family.
 */

function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-32 text-center">
      <h1 className="text-4xl font-light text-[#2A1818] mb-4">Post not found</h1>
      <p className="text-[#5A3E3E]/60 mb-8">
        The blog post you&apos;re looking for doesn&apos;t exist or hasn&apos;t been published yet.
      </p>
      <Link href="/blog" className="text-sm font-medium text-[#C4A35A] hover:underline">
        ← Back to all posts
      </Link>
    </div>
  )
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <main className="bg-[#FAF8F3] text-[#2A1818] selection:bg-[#E6E2D6] min-h-screen">
        <Navbar />
        <div className="pt-40 md:pt-52">
          <NotFound />
        </div>
        <FooterSection />
      </main>
    )
  }

  const related = getRelatedPosts(post, 3).map(toBlogCardPost)

  // JSON-LD Structured Data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription,
    image: post.coverImage,
    author: {
      "@type": "Organization",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "LIVV Creative Studio",
      url: "https://livvvv.com",
    },
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: `https://livvvv.com/blog/${post.slug}`,
  }

  const faqSchema =
    post.faqSchema.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqSchema.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://livvvv.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://livvvv.com/blog" },
      { "@type": "ListItem", position: 3, name: post.category.name, item: `https://livvvv.com/blog/category/${post.category.slug}` },
      { "@type": "ListItem", position: 4, name: post.title },
    ],
  }

  return (
    <main className="bg-[#FAF8F3] text-[#2A1818] selection:bg-[#E6E2D6] min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      <div className="pt-40 md:pt-52">
        <div className="max-w-6xl mx-auto px-6 pb-12 md:pb-20">
          <BlogPostHeader post={post} />

          {/* Content + TOC */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 max-w-4xl mx-auto lg:max-w-none">
            <div className="max-w-3xl">
              <BlogContentRenderer blocks={post.contentBlocks} />
            </div>
            <TableOfContents blocks={post.contentBlocks} />
          </div>

          {/* CTA */}
          <div className="max-w-3xl mx-auto">
            <BlogCTA cta={post.cta} />
          </div>

          {/* Related Posts (same-category cluster) */}
          <RelatedPosts posts={related} />
        </div>
      </div>

      {/* Editorial Picks — cluster H flagship pieces. Surfaced on every
          /blog/[slug] page so SEO cluster posts (A-G) get explicit
          internal links to the editorial corpus. Hides itself when the
          current post is already an editorial piece. */}
      <EditorialPicks currentSlug={post.slug} />

      <FooterSection />
    </main>
  )
}
