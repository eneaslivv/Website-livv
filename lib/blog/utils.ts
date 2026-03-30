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

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug)
}

export function generateTableOfContents(blocks: BlogContentBlock[]): { id: string; text: string; level: number }[] {
  return blocks
    .filter((b): b is BlogContentBlock & { type: "heading" } => b.type === "heading")
    .map((b) => ({ id: b.id, text: b.content, level: b.level }))
}

export function estimateReadingTime(blocks: BlogContentBlock[]): number {
  let wordCount = 0
  for (const block of blocks) {
    if ("content" in block && typeof block.content === "string") {
      wordCount += block.content.split(/\s+/).length
    }
    if (block.type === "list") {
      wordCount += block.items.join(" ").split(/\s+/).length
    }
    if (block.type === "table") {
      wordCount += block.rows.flat().join(" ").split(/\s+/).length
    }
    if (block.type === "faq") {
      wordCount += block.items.map((i) => `${i.question} ${i.answer}`).join(" ").split(/\s+/).length
    }
  }
  return Math.max(1, Math.ceil(wordCount / 200))
}
