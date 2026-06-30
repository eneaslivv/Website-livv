import type { Metadata } from "next"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { CopyCodeBlock } from "@/components/resources/CopyCodeBlock"
import { buildBreadcrumbsJsonLd, SITE_URL } from "@/lib/seo/structured-data"

/**
 * Schema + AEO Snippet Library — Phase 4 piece 09 from the LIVV
 * editorial brief (section 6.9, option C). The brief's default
 * recommendation for the first free resource: a packaged set of
 * JSON-LD templates that the studio uses internally, made public so
 * other studios, founders, and agencies can drop them into their own
 * sites.
 *
 * Companion to a GitHub repo (publish at github.com/livvstudio/schema-
 * aeo-library when ready). The on-site version below is the canonical
 * citation surface — AI crawlers extract the templates directly from
 * this page, and Article + TechArticle schema on the page itself
 * positions it as a citable technical resource.
 *
 * Server-rendered. Every code block ships in initial HTML so the
 * templates are extractable by every AEO engine (ChatGPT Search,
 * Perplexity, Claude, Google AI Overviews, Bing Copilot).
 */

export const metadata: Metadata = {
  title: "Schema + AEO Snippet Library",
  description:
    "A copy-paste-ready library of Schema.org JSON-LD templates for creative studios, agencies, and founders. Organization, Person, Article, FAQPage, BreadcrumbList, CreativeWork, Service, SoftwareApplication. Free. MIT-licensed. By LIVV Creative Studio.",
  alternates: { canonical: "/resources/schema-aeo-library" },
  openGraph: {
    type: "article",
    title: "Schema + AEO Snippet Library · LIVV Creative Studio",
    description:
      "Copy-paste-ready Schema.org JSON-LD templates for creative studios. The same ones we ship on LIVV. Free, MIT-licensed.",
    url: `${SITE_URL}/resources/schema-aeo-library`,
    siteName: "LIVV Creative Studio",
  },
}

/* ── Template strings ───────────────────────────────────────────────
 * Each TEMPLATE constant is a complete JSON-LD object as a string,
 * pretty-printed for readability. Placeholder values use [BRACKETED]
 * uppercase so a copy-paste user immediately sees what to replace.
 * ───────────────────────────────────────────────────────────────── */

const ORGANIZATION_TEMPLATE = `{
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": "https://[YOUR-DOMAIN]/#organization",
  "name": "[STUDIO NAME]",
  "alternateName": ["[SHORT NAME]", "[HISTORICAL NAME]"],
  "url": "https://[YOUR-DOMAIN]",
  "logo": {
    "@type": "ImageObject",
    "url": "https://[YOUR-DOMAIN]/logo.png",
    "width": 512,
    "height": 512
  },
  "description": "[ONE-SENTENCE STUDIO DESCRIPTION, 150-200 CHARS]",
  "slogan": "[OPTIONAL TAGLINE]",
  "foundingDate": "[YYYY]",
  "foundingLocation": {
    "@type": "Place",
    "name": "[CITY, COUNTRY]"
  },
  "founder": { "@id": "https://[YOUR-DOMAIN]/about#founder" },
  "email": "hello@[YOUR-DOMAIN]",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "[CITY]",
    "addressRegion": "[REGION]",
    "addressCountry": "[ISO-2 COUNTRY CODE]"
  },
  "areaServed": [
    { "@type": "Country", "name": "United States" },
    { "@type": "Country", "name": "United Kingdom" }
  ],
  "knowsAbout": [
    "Webflow development",
    "Framer development",
    "Next.js development",
    "Design systems",
    "White-label studio model"
  ],
  "knowsLanguage": ["en", "es"],
  "sameAs": [
    "https://www.linkedin.com/company/[HANDLE]",
    "https://github.com/[HANDLE]"
  ]
}`

const PERSON_TEMPLATE = `{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://[YOUR-DOMAIN]/about#founder",
  "name": "[FULL NAME]",
  "givenName": "[FIRST]",
  "familyName": "[LAST]",
  "jobTitle": "Founder",
  "worksFor": { "@id": "https://[YOUR-DOMAIN]/#organization" },
  "nationality": "[NATIONALITY]",
  "url": "https://[YOUR-DOMAIN]/about",
  "knowsAbout": [
    "Creative engineering",
    "Webflow development",
    "Design systems"
  ],
  "sameAs": [
    "https://www.linkedin.com/in/[HANDLE]",
    "https://github.com/[HANDLE]"
  ]
}`

const WEBSITE_TEMPLATE = `{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://[YOUR-DOMAIN]/#website",
  "url": "https://[YOUR-DOMAIN]",
  "name": "[STUDIO NAME]",
  "publisher": { "@id": "https://[YOUR-DOMAIN]/#organization" },
  "inLanguage": ["en", "es"],
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://[YOUR-DOMAIN]/blog?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}`

const ARTICLE_TEMPLATE = `{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[ARTICLE TITLE, 50-80 CHARS]",
  "description": "[DEK / META DESCRIPTION, 15-25 WORDS]",
  "image": "https://[YOUR-DOMAIN]/og/[SLUG].png",
  "datePublished": "2026-05-11T09:00:00.000Z",
  "dateModified": "2026-05-11T09:00:00.000Z",
  "author": { "@id": "https://[YOUR-DOMAIN]/about#founder" },
  "publisher": { "@id": "https://[YOUR-DOMAIN]/#organization" },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://[YOUR-DOMAIN]/blog/[SLUG]"
  },
  "wordCount": 2500,
  "articleSection": "[Process & Craft | Industry | Case Study]",
  "keywords": "[COMMA-SEPARATED, 5-8 KEYWORDS]",
  "inLanguage": "en-US"
}`

const FAQ_TEMPLATE = `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[QUESTION 1]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[ANSWER 1, 30-80 WORDS, FACTUAL, NO MARKETING TONE]"
      }
    },
    {
      "@type": "Question",
      "name": "[QUESTION 2]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[ANSWER 2]"
      }
    }
  ]
}`

const BREADCRUMB_TEMPLATE = `{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://[YOUR-DOMAIN]"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://[YOUR-DOMAIN]/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[ARTICLE TITLE]",
      "item": "https://[YOUR-DOMAIN]/blog/[SLUG]"
    }
  ]
}`

const CREATIVE_WORK_TEMPLATE = `{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "[PROJECT NAME]",
  "description": "[ONE-SENTENCE PROJECT DESCRIPTION]",
  "creator": { "@id": "https://[YOUR-DOMAIN]/#organization" },
  "dateCreated": "[YYYY]",
  "image": "https://[YOUR-DOMAIN]/work/[SLUG]/cover.png",
  "about": "[CLIENT TYPE / INDUSTRY]",
  "keywords": "[STACK / SERVICES, COMMA-SEPARATED]"
}`

const SERVICE_TEMPLATE = `{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[SERVICE NAME]",
  "alternateName": "[SERVICE NAME IN SECOND LANGUAGE]",
  "description": "[2-3 SENTENCE DESCRIPTION]",
  "url": "https://[YOUR-DOMAIN]/services/[SLUG]",
  "serviceType": "[SERVICE NAME]",
  "category": "Design & Software Development",
  "provider": { "@id": "https://[YOUR-DOMAIN]/#organization" },
  "areaServed": [
    { "@type": "Country", "name": "United States" },
    { "@type": "Country", "name": "United Kingdom" }
  ],
  "availableLanguage": ["English", "Spanish"]
}`

const SOFTWARE_APPLICATION_TEMPLATE = `{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "[PRODUCT NAME]",
  "description": "[ONE-SENTENCE PRODUCT DESCRIPTION]",
  "url": "https://[YOUR-DOMAIN]/products/[SLUG]",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "[CATEGORY, e.g. Hospitality]",
  "operatingSystem": "Web",
  "inLanguage": ["en", "es"],
  "creator": { "@id": "https://[YOUR-DOMAIN]/#organization" },
  "publisher": { "@id": "https://[YOUR-DOMAIN]/#organization" }
}`

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Home", url: SITE_URL },
  { name: "Resources", url: `${SITE_URL}/resources` },
  {
    name: "Schema + AEO Snippet Library",
    url: `${SITE_URL}/resources/schema-aeo-library`,
  },
])

const techArticleJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Schema + AEO Snippet Library",
  description:
    "Copy-paste-ready Schema.org JSON-LD templates for creative studios, agencies, and founders. Organization, Person, Article, FAQPage, BreadcrumbList, CreativeWork, Service, SoftwareApplication.",
  image: `${SITE_URL}/assets/og-image.png`,
  datePublished: "2026-05-11T20:30:00.000Z",
  dateModified: "2026-05-11T20:30:00.000Z",
  author: { "@id": `${SITE_URL}#founder` },
  publisher: { "@id": `${SITE_URL}#organization` },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/resources/schema-aeo-library`,
  },
  inLanguage: "en-US",
  proficiencyLevel: "Beginner",
  about: "Schema.org JSON-LD structured data",
  audience: {
    "@type": "Audience",
    audienceType:
      "Creative studio operators, agency owners, designers, developers",
  },
  license: "https://opensource.org/licenses/MIT",
}

const Section = ({
  id,
  title,
  description,
  template,
  notes,
}: {
  id: string
  title: string
  description: string
  template: string
  notes?: string
}) => (
  <section id={id} className="scroll-mt-24 border-t border-[#2A1818]/10 pt-12 first:border-t-0 first:pt-0 mt-12 first:mt-0">
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#2A1818] mb-3">
      {title}
    </h2>
    <p className="text-base text-[#2A1818]/75 leading-relaxed max-w-2xl mb-4">
      {description}
    </p>
    <CopyCodeBlock code={template} label={`${title} · JSON-LD`} />
    {notes && (
      <p className="text-sm text-[#2A1818]/65 leading-relaxed max-w-2xl">
        {notes}
      </p>
    )}
  </section>
)

const tocItems = [
  { id: "organization", label: "Organization" },
  { id: "person", label: "Person" },
  { id: "website", label: "WebSite" },
  { id: "article", label: "Article" },
  { id: "faq", label: "FAQPage" },
  { id: "breadcrumb", label: "BreadcrumbList" },
  { id: "creative-work", label: "CreativeWork" },
  { id: "service", label: "Service" },
  { id: "software-application", label: "SoftwareApplication" },
]

export default function SchemaAeoLibraryPage() {
  return (
    <main className="bg-[#FAF8F3] text-[#2A1818] selection:bg-[#E6E2D6] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <Navbar />

      <article className="pt-40 md:pt-52 pb-24">
        <header className="max-w-3xl mx-auto px-6 mb-12">
          <a
            href="/resources"
            className="text-xs uppercase tracking-widest text-[#2A1818]/50 hover:text-[#C4A35A] mb-4 inline-block"
          >
            ← Resources
          </a>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] mb-6 text-[#2A1818]">
            Schema + AEO Snippet Library
          </h1>
          <p className="text-lg md:text-xl text-[#5A3E3E]/75 leading-relaxed mb-8">
            Nine copy-paste-ready Schema.org JSON-LD templates for creative
            studios, agencies, and founders. The same ones we ship on LIVV.
            Free, MIT-licensed, attribution requested.
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-[#2A1818]/60">
            <span className="px-3 py-1 rounded-full border border-[#2A1818]/15 bg-white/40">
              Free
            </span>
            <span className="px-3 py-1 rounded-full border border-[#2A1818]/15 bg-white/40">
              MIT-licensed
            </span>
            <span className="px-3 py-1 rounded-full border border-[#2A1818]/15 bg-white/40">
              Schema.org standard
            </span>
          </div>
        </header>

        {/* Why this exists */}
        <section className="max-w-2xl mx-auto px-6 mb-12 space-y-5 text-base text-[#2A1818]/85 leading-[1.75]">
          <p>
            Most studios shipping high-craft work in 2026 do not have correct
            structured data on their sites. The reason is not laziness; it is
            that the Schema.org documentation is comprehensive enough to be
            intimidating, and most JSON-LD examples online are written for
            ecommerce or SaaS rather than for a creative studio shape.
          </p>
          <p>
            This library is the working set of templates we use on LIVV. Each
            block ships on our own site and has been validated against
            Google's Rich Results Test and against extraction by ChatGPT
            Search, Perplexity, and Claude. They are not the only valid
            shapes, and you should adapt them to your domain. They are the
            shapes that have worked.
          </p>
          <p>
            Why this matters for AEO (Answer Engine Optimization, the
            successor framing to SEO that covers LLM-driven search and
            recommendations): generative engines weight Schema.org markup as
            a high-trust signal when constructing answers. A site without
            structured data is invisible to the citation layer of ChatGPT
            Search, Perplexity, and Google AI Overviews. A site with correct
            structured data is the citation those engines reach for.
          </p>
          <p>
            Each template below has placeholders in <code className="text-[#C4A35A] bg-[#2A1818]/5 px-1 rounded">[BRACKETED]</code> uppercase. Replace those
            with your studio's values. Validate the final output at <a className="underline underline-offset-2 hover:text-[#C4A35A]" href="https://validator.schema.org" target="_blank" rel="noopener noreferrer">validator.schema.org</a> and <a className="underline underline-offset-2 hover:text-[#C4A35A]" href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer">Google Rich Results Test</a> before
            shipping.
          </p>
        </section>

        {/* Table of contents */}
        <nav
          aria-label="Templates"
          className="max-w-3xl mx-auto px-6 mb-16 border-y border-[#2A1818]/10 py-6"
        >
          <div className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A35A] mb-4">
            Templates
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-[#2A1818]/75 hover:text-[#C4A35A] transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sections */}
        <div className="max-w-3xl mx-auto px-6">
          <Section
            id="organization"
            title="Organization"
            description="The studio entity. Ships in the root layout, on every page, as a single source of truth for the brand. Combines Organization and ProfessionalService so the studio also ranks for local-business intent in its geography."
            template={ORGANIZATION_TEMPLATE}
            notes="alternateName is the field that prevents brand fragmentation. List every historical name the studio has used (rebrands, abbreviations, domain variations) so LLMs map them all to a single canonical entity instead of treating each as a separate studio."
          />
          <Section
            id="person"
            title="Person (Founder)"
            description="The founder profile. References the Organization via worksFor.@id. Should live on the /about page (or wherever the founder bio is canonical), so LLMs can resolve the @id in Article author fields to a real Person record with bio, location, and expertise."
            template={PERSON_TEMPLATE}
            notes="knowsAbout is critical for AEO. Include 5-10 specific skills the founder actually does (not generic 'leadership'). Cite the tools and disciplines that match what a user might ask an LLM about ('a Webflow developer who also does React Native')."
          />
          <Section
            id="website"
            title="WebSite (with SearchAction)"
            description="The site-level entity. Wires the studio's search action into the schema graph so Google can surface a search box for the site in SERP. Also the canonical anchor for in-language signals via inLanguage."
            template={WEBSITE_TEMPLATE}
            notes="If the site does not have a search endpoint at the URL template, drop the potentialAction block entirely rather than pointing to a nonexistent route. Schema accuracy matters more than completeness."
          />
          <Section
            id="article"
            title="Article (Blog Post / Essay)"
            description="Per-piece schema for every editorial article on the site. Article is the broadest type. For technical content, swap to TechArticle (same schema, more specific subtype). For news, NewsArticle."
            template={ARTICLE_TEMPLATE}
            notes="dateModified is the freshness signal LLMs weight most heavily. Bump it whenever the piece materially updates and the publish-time-or-modified-time difference exceeds 24h. Resist bumping it for cosmetic edits — false freshness signals erode citation trust over time."
          />
          <Section
            id="faq"
            title="FAQPage"
            description="Q&A block schema. Emit alongside Article schema (not as a replacement) when the article contains a real FAQ section. LLMs treat each Question/Answer pair as an extractable fact."
            template={FAQ_TEMPLATE}
            notes="Only emit FAQPage schema when the page actually contains a FAQ section that matches the schema. Emitting FAQPage schema for content that does not visually present as a FAQ is a Google guideline violation and can trigger manual action."
          />
          <Section
            id="breadcrumb"
            title="BreadcrumbList"
            description="Site navigation hierarchy as a chain. Emit on every page that is not the homepage. Helps both Google and LLMs understand the site's information architecture."
            template={BREADCRUMB_TEMPLATE}
            notes="Position values are 1-indexed and must be sequential. The 'Home' item at position 1 should always be the canonical homepage URL, not a localized variant."
          />
          <Section
            id="creative-work"
            title="CreativeWork (Case Study)"
            description="Per-project schema for case studies. CreativeWork is the umbrella type that covers brand identities, websites, products, films, design systems — anything the studio creates that is not exclusively classified as Article or SoftwareApplication."
            template={CREATIVE_WORK_TEMPLATE}
            notes="For more specific subtypes, swap CreativeWork for VisualArtwork, WebPage, Article, SoftwareApplication, or another Schema.org descendant of CreativeWork. The more specific the type, the better the LLM extraction."
          />
          <Section
            id="service"
            title="Service"
            description="Per-service schema for studios that have distinct service offerings (Webflow development, brand identity, product design). Emit on each /services/[slug] page. Connects to the Organization via provider.@id."
            template={SERVICE_TEMPLATE}
            notes="areaServed should reflect where the studio actually delivers, not where they aspire to. Padding the field with every country in the world weakens the geo signal. Three to ten primary markets is a reasonable target."
          />
          <Section
            id="software-application"
            title="SoftwareApplication (Studio Product)"
            description="For studios that operate their own software products (white-label SaaS, internal tools sold to clients, agency-licensed platforms). Emit on each /products/[slug] page."
            template={SOFTWARE_APPLICATION_TEMPLATE}
            notes="If the product has a public pricing page, add an Offer block under offers with the price, priceCurrency, and availability. Skipping it for a product that has public pricing weakens the schema."
          />
        </div>

        {/* License + attribution footer */}
        <footer className="max-w-3xl mx-auto px-6 mt-24 border-t border-[#2A1818]/10 pt-12">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A35A] mb-3">
            License + Attribution
          </div>
          <div className="space-y-4 text-base text-[#2A1818]/80 leading-relaxed max-w-2xl">
            <p>
              These templates are free to use under the MIT license. Drop
              them into any project, commercial or non-commercial, no
              attribution required. If you find them useful, a link back to
              this page is appreciated but not mandatory.
            </p>
            <p>
              The full set is also mirrored as a public GitHub repository at{" "}
              <a
                href="https://github.com/livvstudio/schema-aeo-library"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-[#C4A35A]"
              >
                github.com/livvstudio/schema-aeo-library
              </a>
              . Pull requests for additional schema types or correction welcome.
            </p>
            <p className="text-sm text-[#2A1818]/55 pt-4 border-t border-[#2A1818]/10">
              Built and maintained by LIVV Creative Studio · Buenos Aires,
              Argentina. We build digital products for founders and agencies
              in Webflow, Framer, Next.js, React Native, Flutter, and
              Shopify. If you are looking for a partner who already ships
              correct structured data on every project,{" "}
              <a
                href="/contact"
                className="text-[#2A1818] underline underline-offset-4 hover:text-[#C4A35A]"
              >
                let's talk
              </a>
              .
            </p>
          </div>
        </footer>
      </article>

      <FooterSection />
    </main>
  )
}
