"use client"

import { useState } from "react"
import { BlogCategory } from "@/types/blog"
import type { BlogCardPost } from "@/lib/blog/utils"
import { BlogCard } from "./BlogCard"

interface BlogGridProps {
  posts: BlogCardPost[]
  categories: BlogCategory[]
}

// On a phone the index ran to 63 posts and ~31,000 px with no way to jump. It shows
// the first twelve and a button for the rest; every post stays in the HTML.
const MOBILE_FIRST = 12

export function BlogGrid({ posts, categories }: BlogGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [showAll, setShowAll] = useState(false)

  const filtered =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category.slug === activeCategory)

  return (
    <div>
      {/* Category Filter */}
      <div className="-mx-6 px-6 md:mx-0 md:px-0 flex gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        <button
          onClick={() => setActiveCategory("all")}
          className={`shrink-0 px-4 py-3 md:py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === "all"
              ? "bg-[#2A1818] text-white"
              : "bg-[#E6E2D6]/50 text-[#5A3E3E]/60 hover:bg-[#E6E2D6] hover:text-[#2A1818]"
          }`}
        >
          All Posts
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`shrink-0 px-4 py-3 md:py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === cat.slug
                ? "bg-[#2A1818] text-white"
                : "bg-[#E6E2D6]/50 text-[#5A3E3E]/60 hover:bg-[#E6E2D6] hover:text-[#2A1818]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post, i) => (
          <BlogCard
            key={post.slug}
            post={post}
            featured={i === 0 && activeCategory === "all"}
            className={!showAll && i >= MOBILE_FIRST ? "max-md:hidden" : ""}
          />
        ))}
      </div>

      {!showAll && filtered.length > MOBILE_FIRST && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="md:hidden mt-8 w-full min-h-12 rounded-full bg-[#E6E2D6]/50 text-sm font-medium text-[#2A1818] transition-colors hover:bg-[#E6E2D6]"
        >
          Show all {filtered.length} posts
        </button>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[#5A3E3E]/40 text-lg">No posts in this category yet.</p>
        </div>
      )}
    </div>
  )
}
