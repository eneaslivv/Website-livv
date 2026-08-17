import type { BlogCardPost } from "@/lib/blog/utils"
import { BlogCard } from "./BlogCard"

// Presentational only — renders on the server alongside the post page.
interface RelatedPostsProps {
  posts: BlogCardPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-20 pt-16 border-t border-[#E6E2D6]">
      <h2 className="text-2xl font-semibold text-[#2A1818] mb-8">You might also like</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
