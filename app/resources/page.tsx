import type { Metadata } from "next"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { buildBreadcrumbsJsonLd, SITE_URL } from "@/lib/seo/structured-data"

/**
 * /resources index. Free downloads and tools published by LIVV per editorial
 * brief section 6.9. The first resource (default option C — Schema + AEO
 * Snippet Library) ships in Phase 4 (week 11-13). Until then this route
 * exists so /resources/[slug] dynamic pages can resolve from day one
 * without crashing the build, and so the sitemap + llms.txt links
 * eventually point somewhere real.
 */

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free downloads and tools from LIVV Creative Studio. Component libraries, schema templates, design kits.",
  alternates: { canonical: "/resources" },
}

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Home", url: SITE_URL },
  { name: "Resources", url: `${SITE_URL}/resources` },
])

export default function ResourcesIndexPage() {
  return (
    <main className="bg-[#FAF8F3] text-[#2A1818] selection:bg-[#E6E2D6] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <Navbar />

      <div className="pt-40 md:pt-52">
        <header className="max-w-6xl mx-auto px-6 mb-16">
          <div className="max-w-3xl">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A35A] mb-4 block">
              Resources
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight mb-6">
              Free tools and downloads.
            </h1>
            <p className="text-lg text-[#5A3E3E]/70 leading-relaxed max-w-xl">
              Component libraries, schema templates, and design kits we built
              for our own work and made public.
            </p>
          </div>
        </header>

        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="max-w-2xl border-t border-[#2A1818]/10 pt-12">
            <p className="text-base text-[#2A1818]/70 leading-relaxed">
              The first resource publishes in 2026: a JSON-LD and AEO snippet
              library covering Organization, Person, Article, FAQPage,
              BreadcrumbList, and CreativeWork schemas. Free, MIT-licensed,
              with attribution requested.
            </p>
          </div>
        </section>
      </div>

      <FooterSection />
    </main>
  )
}
