import { BlogPost, BlogContentBlock, BlogCategory } from "@/types/blog"
import { blogCategories } from "./categories"

let _allPosts: BlogPost[] | null = null

export function registerPosts(posts: BlogPost[]) {
  if (!_allPosts) _allPosts = []
  _allPosts.push(...posts)
}

export function getAllPosts(): BlogPost[] {
  if (!_allPosts) {
    // Trigger lazy import to register posts
    require("./posts")
  }
  return (_allPosts || [])
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getAllPostsIncludingDrafts(): BlogPost[] {
  if (!_allPosts) require("./posts")
  return (_allPosts || []).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  if (!_allPosts) require("./posts")
  return (_allPosts || []).find((p) => p.slug === slug)
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return getAllPosts().filter((p) => p.category.slug === categorySlug)
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => p.featured)
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const all = getAllPosts()
  const related = post.relatedPostSlugs
    .map((slug) => all.find((p) => p.slug === slug))
    .filter(Boolean) as BlogPost[]

  if (related.length >= limit) return related.slice(0, limit)

  // Fill with same-category posts
  const sameCategory = all.filter(
    (p) => p.category.slug === post.category.slug && p.slug !== post.slug && !related.find((r) => r.slug === p.slug)
  )
  return [...related, ...sameCategory].slice(0, limit)
}

export function getAllCategories(): BlogCategory[] {
  return blogCategories
}

/**
 * Card-sized view of a post: everything BlogCard renders, and nothing else.
 *
 * A full BlogPost carries `content` — 2,000-3,500 words of structured
 * blocks per post. Listing surfaces (/blog, /blog/category/*) render only
 * the card fields, so handing them full posts pushed the entire article
 * corpus into the client bundle and the RSC payload. Projecting to this
 * shape first keeps the bodies on the server, where only /blog/[slug]
 * ever needs them.
 */
export type BlogCardPost = Pick<
  BlogPost,
  "slug" | "title" | "excerpt" | "category" | "readingTimeMinutes" | "createdAt"
>

export function toBlogCardPost(post: BlogPost): BlogCardPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    readingTimeMinutes: post.readingTimeMinutes,
    createdAt: post.createdAt,
  }
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug)
}

// Re-exported for existing call sites. Client components should import
// these from "@/lib/blog/toc" directly — importing them from here drags the
// whole post registry (and every article body) into the client bundle.
export { generateTableOfContents, estimateReadingTime } from "./toc"
