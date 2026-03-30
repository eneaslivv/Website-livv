"use client"

import { useParams } from "next/navigation"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { BlogPostHeader } from "@/components/blog/BlogPostHeader"
import { BlogContentRenderer } from "@/components/blog/BlogContentRenderer"
import { TableOfContents } from "@/components/blog/TableOfContents"
import { RelatedPosts } from "@/components/blog/RelatedPosts"
import { BlogCTA } from "@/components/blog/BlogCTA"
import { getPostBySlug, getRelatedPosts } from "@/lib/blog/utils"

const inter = Inter({ subsets: ["latin"] })

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

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <main className={`bg-[#FAF8F3] text-[#2A1818] selection:bg-[#E6E2D6] min-h-screen ${inter.className}`}>
        <Navbar />
        <div className="pt-40 md:pt-52">
          <NotFound />
        </div>
        <FooterSection />
      </main>
    )
  }

  const related = getRelatedPosts(post, 3)

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
      name: "Livv Studio",
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
    <main className={`bg-[#FAF8F3] text-[#2A1818] selection:bg-[#E6E2D6] min-h-screen ${inter.className}`}>
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

          {/* Related Posts */}
          <RelatedPosts posts={related} />
        </div>
      </div>

      <FooterSection />
    </main>
  )
}
