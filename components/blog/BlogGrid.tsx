"use client"

import { useState } from "react"
import { BlogPost, BlogCategory } from "@/types/blog"
import { BlogCard } from "./BlogCard"

interface BlogGridProps {
  posts: BlogPost[]
  categories: BlogCategory[]
}

export function BlogGrid({ posts, categories }: BlogGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const filtered =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category.slug === activeCategory)

  return (
    <div>
      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-hide">
        <button
          onClick={() => setActiveCategory("all")}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
          <BlogCard key={post.slug} post={post} featured={i === 0 && activeCategory === "all"} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[#5A3E3E]/40 text-lg">No posts in this category yet.</p>
        </div>
      )}
    </div>
  )
}
