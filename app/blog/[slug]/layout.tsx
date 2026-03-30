import type { Metadata } from "next"
import { getPostBySlug, getAllSlugs } from "@/lib/blog/utils"

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found | Livv Studio",
      description: "The blog post you're looking for doesn't exist.",
    }
  }

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: `https://livvvv.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(post.title)}&category=${post.category.slug}&categoryName=${encodeURIComponent(post.category.name)}&readTime=${post.readingTimeMinutes}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      images: [
        `/api/og?title=${encodeURIComponent(post.title)}&category=${post.category.slug}&categoryName=${encodeURIComponent(post.category.name)}&readTime=${post.readingTimeMinutes}`,
      ],
    },
  }
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
