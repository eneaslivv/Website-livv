"use client"

import Link from "next/link"
import { BlogPost } from "@/types/blog"

export function BlogPostHeader({ post }: { post: BlogPost }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <header className="max-w-3xl mx-auto text-center mb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center justify-center gap-2 text-sm text-[#5A3E3E]/40 mb-8">
        <Link href="/" className="hover:text-[#2A1818] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-[#2A1818] transition-colors">Blog</Link>
        <span>/</span>
        <Link
          href={`/blog/category/${post.category.slug}`}
          className="hover:text-[#2A1818] transition-colors"
        >
          {post.category.name}
        </Link>
      </nav>

      {/* Category Badge */}
      <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-[#C4A35A] bg-[#C4A35A]/10 px-3 py-1.5 rounded-full mb-6">
        {post.category.name}
      </span>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2A1818] tracking-tight leading-tight mb-6">
        {post.title}
      </h1>

      {/* Excerpt */}
      <p className="text-lg text-[#5A3E3E]/60 leading-relaxed mb-8 max-w-2xl mx-auto">
        {post.excerpt}
      </p>

      {/* Meta */}
      <div className="flex items-center justify-center gap-6 text-sm text-[#5A3E3E]/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#2A1818] flex items-center justify-center">
            <span className="text-white text-xs font-bold">L</span>
          </div>
          <span className="font-medium text-[#2A1818]">{post.author.name}</span>
        </div>
        <span className="w-1 h-1 rounded-full bg-[#5A3E3E]/30" />
        <span>{formattedDate}</span>
        <span className="w-1 h-1 rounded-full bg-[#5A3E3E]/30" />
        <span>{post.readingTimeMinutes} min read</span>
      </div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-[#5A3E3E]/40 bg-[#E6E2D6]/50 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </header>
  )
}
