"use client"

import { Inter } from "next/font/google"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { BlogGrid } from "@/components/blog/BlogGrid"
import { getAllPosts, getAllCategories } from "@/lib/blog/utils"

const inter = Inter({ subsets: ["latin"] })

export default function BlogPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  return (
    <main className={`bg-[#FAF8F3] text-[#2A1818] selection:bg-[#E6E2D6] min-h-screen ${inter.className}`}>
      <Navbar />

      <div className="pt-40 md:pt-52">
        {/* Hero */}
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <div className="max-w-3xl">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A35A] mb-4 block">
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight mb-6">
              Insights on building{" "}
              <span className="text-[#C4A35A]">better</span> digital products
            </h1>
            <p className="text-lg text-[#5A3E3E]/60 leading-relaxed max-w-xl">
              Expert guides on Webflow, Framer, SEO, creative engineering, and
              everything we learn while shipping products for startups and
              growing businesses.
            </p>
          </div>
        </div>

        {/* Posts */}
        <div className="max-w-6xl mx-auto px-6 pb-24">
          <BlogGrid posts={posts} categories={categories} />
        </div>
      </div>

      <FooterSection />
    </main>
  )
}
