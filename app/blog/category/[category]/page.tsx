"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Inter } from "next/font/google"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { BlogCard } from "@/components/blog/BlogCard"
import { getPostsByCategory, getAllCategories } from "@/lib/blog/utils"
import { getCategoryBySlug } from "@/lib/blog/categories"

const inter = Inter({ subsets: ["latin"] })

export default function BlogCategoryPage() {
  const params = useParams()
  const categorySlug = params?.category as string
  const category = getCategoryBySlug(categorySlug)
  const posts = getPostsByCategory(categorySlug)
  const allCategories = getAllCategories()

  if (!category) {
    return (
      <main className={`bg-[#FAF8F3] text-[#2A1818] selection:bg-[#E6E2D6] min-h-screen ${inter.className}`}>
        <Navbar />
        <div className="pt-40 md:pt-52 max-w-6xl mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-light mb-4">Category not found</h1>
          <Link href="/blog" className="text-sm font-medium text-[#C4A35A] hover:underline">
            ← Back to all posts
          </Link>
        </div>
        <FooterSection />
      </main>
    )
  }

  return (
    <main className={`bg-[#FAF8F3] text-[#2A1818] selection:bg-[#E6E2D6] min-h-screen ${inter.className}`}>
      <Navbar />

      <div className="pt-40 md:pt-52">
        <div className="max-w-6xl mx-auto px-6 mb-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#5A3E3E]/40 mb-8">
            <Link href="/" className="hover:text-[#2A1818] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#2A1818] transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-[#2A1818]">{category.name}</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-[#5A3E3E]/60 max-w-2xl mb-8">
            {category.description}
          </p>

          {/* Other categories */}
          <div className="flex gap-2 flex-wrap">
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full text-sm font-medium bg-[#E6E2D6]/50 text-[#5A3E3E]/60 hover:bg-[#E6E2D6] hover:text-[#2A1818] transition-all"
            >
              All Posts
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  cat.slug === categorySlug
                    ? "bg-[#2A1818] text-white"
                    : "bg-[#E6E2D6]/50 text-[#5A3E3E]/60 hover:bg-[#E6E2D6] hover:text-[#2A1818]"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#5A3E3E]/40 text-lg">No posts in this category yet.</p>
            </div>
          )}
        </div>
      </div>

      <FooterSection />
    </main>
  )
}
