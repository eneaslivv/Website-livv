"use client"

import Link from "next/link"
import Image from "next/image"
import { BlogPost } from "@/types/blog"

function getOgImageUrl(post: BlogPost): string {
  const params = new URLSearchParams({
    title: post.title,
    category: post.category.slug,
    categoryName: post.category.name,
    readTime: String(post.readingTimeMinutes),
  })
  return `/api/og?${params.toString()}`
}

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block bg-white rounded-2xl overflow-hidden border border-[#E6E2D6] hover:border-[#C4A35A]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${featured ? "md:col-span-2" : ""}`}
    >
      {/* Cover Image */}
      <div className={`relative overflow-hidden bg-[#1a2332] ${featured ? "aspect-[2/1]" : "aspect-[16/10]"}`}>
        <Image
          src={getOgImageUrl(post)}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A35A] bg-[#C4A35A]/10 px-2.5 py-1 rounded-full">
            {post.category.name}
          </span>
          <span className="text-[11px] text-[#5A3E3E]/40">
            {post.readingTimeMinutes} min read
          </span>
        </div>

        {/* Title */}
        <h3
          className={`font-medium text-[#2A1818] group-hover:text-[#C4A35A] transition-colors duration-300 mb-2 leading-snug ${featured ? "text-xl md:text-2xl" : "text-lg"}`}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-[#5A3E3E]/60 leading-relaxed line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E6E2D6]">
          <span className="text-xs text-[#5A3E3E]/40">{formattedDate}</span>
          <span className="text-xs font-medium text-[#C4A35A] group-hover:translate-x-1 transition-transform duration-300">
            Read more →
          </span>
        </div>
      </div>
    </Link>
  )
}
