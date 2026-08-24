import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { BlogCard } from "@/components/blog/BlogCard"
import {
  getPostsByCategory,
  getAllCategories,
  toBlogCardPost,
} from "@/lib/blog/utils"
import { getCategoryBySlug } from "@/lib/blog/categories"
import { getCategoryIntro } from "@/lib/blog/category-intros"

/**
 * Server component. This page renders no interactive state, and keeping it
 * on the client pulled the whole blog corpus (every post's `content`
 * blocks) into the route's JavaScript — it was the heaviest route on the
 * site at 388 kB First Load JS. Rendering on the server, and projecting
 * posts to `BlogCardPost`, keeps the article bodies off the wire entirely.
 */

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category: category.slug }))
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category: categorySlug } = await params
  const category = getCategoryBySlug(categorySlug)

  if (!category) notFound()

  const posts = getPostsByCategory(categorySlug).map(toBlogCardPost)
  const allCategories = getAllCategories()
  const intro = getCategoryIntro(categorySlug)

  return (
    <main className="bg-[#FAF8F3] text-[#2A1818] selection:bg-[#E6E2D6] min-h-screen">
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

          {intro?.eyebrow && (
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#C4A35A] mb-3 block">
              {intro.eyebrow}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 max-w-3xl leading-[1.05]">
            {intro?.heading || category.name}
          </h1>

          {/* Intro paragraph + extra paragraph rendered as plain HTML so
              Google's crawler picks up the unique 200-400 word body
              regardless of client-side hydration state. */}
          <div className="max-w-3xl space-y-5 text-base md:text-lg text-[#5A3E3E]/75 leading-[1.75] font-light mb-10">
            <p>{intro?.intro || category.description}</p>
            {intro?.introExtra && <p>{intro.introExtra}</p>}
          </div>

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
