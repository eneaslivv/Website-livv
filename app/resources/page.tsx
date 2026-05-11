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
          <ul className="grid gap-12 md:gap-16 border-t border-[#2A1818]/10 pt-12 list-none pl-0">
            <li className="border-b border-[#2A1818]/10 pb-12 last:border-b-0">
              <a
                href="/resources/schema-aeo-library"
                className="block group"
              >
                <div className="text-[10px] uppercase tracking-widest text-[#C4A35A] mb-3 font-semibold">
                  JSON-LD · MIT-licensed
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight mb-3 text-[#2A1818] group-hover:text-[#C4A35A] transition-colors">
                  Schema + AEO Snippet Library
                </h2>
                <p className="text-base text-[#5A3E3E]/70 leading-relaxed max-w-2xl">
                  Nine copy-paste-ready Schema.org JSON-LD templates for
                  creative studios, agencies, and founders. The same ones we
                  ship on LIVV. Organization, Person, Article, FAQPage,
                  BreadcrumbList, CreativeWork, Service, SoftwareApplication.
                </p>
              </a>
            </li>
          </ul>
        </section>
      </div>

      <FooterSection />
    </main>
  )
}
