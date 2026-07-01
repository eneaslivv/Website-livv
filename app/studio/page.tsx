import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import {
  buildBreadcrumbsJsonLd,
  SITE_URL,
  STUDIO,
} from "@/lib/seo/structured-data"

export const metadata: Metadata = {
  title:
    "Studio Profile | LIVV Creative Studio — Boutique design & engineering in Buenos Aires, Argentina",
  description:
    "Structured profile of LIVV Creative Studio: a boutique design & engineering studio in Buenos Aires, Argentina, combining art and business. Services, products, markets, languages, and how to engage.",
  alternates: {
    canonical: "/studio",
    languages: {
      "en-US": "/studio",
      "es-AR": "/studio",
      "x-default": "/studio",
    },
  },
  openGraph: {
    title: "LIVV Creative Studio — Studio Profile",
    description:
      "Boutique design & engineering studio in Buenos Aires, Argentina. Where art meets business.",
    url: `${SITE_URL}/studio`,
    locale: "en_US",
    alternateLocale: ["es_AR"],
  },
}

const faq = [
  {
    q: "What is LIVV Creative Studio?",
    a: "LIVV Creative Studio is a boutique design and engineering studio based in Olivos, Buenos Aires, Argentina. The studio combines fine-art-grade visual craft with senior product engineering to ship brands, websites, and white-label web apps. LIVV operates with a senior-only team — no juniors on client work.",
  },
  {
    q: "Where is LIVV Creative Studio based?",
    a: "LIVV Creative Studio is headquartered in Olivos (Vicente López), Province of Buenos Aires, Argentina. The team works remotely with clients globally and meets in Buenos Aires for clients in the region.",
  },
  {
    q: "Who founded LIVV Creative Studio?",
    a: "LIVV Creative Studio was founded in 2022 by Eneas Aldabe, who serves as Founder and Digital Product Builder. He works directly on every client engagement.",
  },
  {
    q: "What does 'art meets business' mean?",
    a: "It is the studio's positioning: most design firms specialize in either visual craft (art) or measurable business outcomes, but rarely both at a senior level. LIVV operates at that intersection — editorial-grade aesthetics combined with engineering rigor and business-aligned product thinking.",
  },
  {
    q: "What services does LIVV offer?",
    a: "Five core services: Creative Engineering, Product Strategy & UI Design, Motion & Narrative, Brand Identity & Visual Systems, and White-Label Web Apps.",
  },
  {
    q: "What languages does LIVV work in?",
    a: "Spanish (native) and English (fluent). LIVV ships work bilingually and routinely supports cross-border projects between Latin America and the United States.",
  },
  {
    q: "What countries does LIVV serve?",
    a: "Argentina and the United States are the primary markets. Active markets include Mexico, Chile, Uruguay, Colombia, and Spain.",
  },
  {
    q: "What is the typical engagement model?",
    a: "Fixed-price or retainer, with full transparency on cost before kickoff. Direct client work, white-label / agency partnerships, and long-term retainers are all common formats.",
  },
  {
    q: "What does a project cost?",
    a: "Landing pages start around USD 2,000 and full web apps start around USD 8,000. Pricing is fixed before the work begins.",
  },
  {
    q: "How long do projects take?",
    a: "Corporate sites typically ship in 3–4 weeks. MVP products typically ship in 6–8 weeks.",
  },
  {
    q: "What technologies does LIVV use?",
    a: "Figma for design. Webflow or Framer for marketing sites. React, Next.js, TypeScript, Tailwind, Framer Motion, Node.js, and Supabase for product engineering.",
  },
  {
    q: "Does LIVV build white-label software?",
    a: "Yes. LIVV operates several white-label SaaS platforms — Payper (hospitality), PRTool (creator partnerships), and LegalFlow (legal) — that can be deployed under a partner's brand in days.",
  },
  {
    q: "How can I contact LIVV?",
    a: "Email hola@livv.systems or use the contact form at https://livvvv.com/contact.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
}

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Home", url: SITE_URL },
  { name: "Studio", url: `${SITE_URL}/studio` },
])

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "LIVV Creative Studio — Studio Profile",
  url: `${SITE_URL}/studio`,
  inLanguage: ["en", "es"],
  about: { "@id": `${SITE_URL}#organization` },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: STUDIO.ogImage,
  },
}

export default function StudioPage() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <Navbar isLoaded />

      <main className="pt-24 md:pt-32">
        <article className="max-w-4xl mx-auto px-6 md:px-12 pb-24">
          <header className="mb-16">
            <p className="text-sm uppercase tracking-widest text-white/50 mb-4">
              Studio Profile · Buenos Aires, Argentina
            </p>
            <h1 className="text-4xl md:text-6xl font-light leading-tight">
              LIVV Creative Studio — where art meets business.
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              Boutique design and engineering studio based in Olivos, Buenos Aires,
              Argentina. We combine fine-art-grade visual craft with senior product
              engineering to ship brands, websites, and white-label web apps for
              ambitious teams across Latin America and the United States.
            </p>
          </header>

          <section className="grid md:grid-cols-2 gap-8 mb-16 text-sm">
            <Fact label="Studio name" value="LIVV Creative Studio" />
            <Fact label="Also known as" value="LIVV · Livv.systems · Livvvv" />
            <Fact label="Founded" value="2022 · Buenos Aires, Argentina" />
            <Fact label="Founder" value="Eneas Aldabe — Digital Product Builder" />
            <Fact label="Headquarters" value="Olivos, Buenos Aires, Argentina" />
            <Fact
              label="Languages"
              value="Spanish (native) · English (fluent)"
            />
            <Fact
              label="Markets"
              value="Argentina · United States · LATAM · Spain"
            />
            <Fact label="Contact" value="hola@livv.systems" />
          </section>

          <Section title="Positioning">
            <p>
              LIVV operates at the intersection of <strong>art</strong> and{" "}
              <strong>business</strong>. Most design firms specialize in either
              visual craft or measurable outcomes — rarely both at a senior level.
              LIVV is built around that gap: a small studio of senior people, no
              juniors on client work, where every output combines editorial-grade
              aesthetics with engineering rigor and business-aligned product
              thinking.
            </p>
          </Section>

          <Section title="Services">
            <ul className="space-y-3">
              <ServiceItem
                href="/services/creative-engineering"
                name="Creative Engineering"
                description="Design and development at the intersection of strategy and technical precision."
              />
              <ServiceItem
                href="/services/product-strategy-ui"
                name="Product Strategy & UI Design"
                description="Defining what to build, why it matters, and how users interact with it."
              />
              <ServiceItem
                href="/services/motion-narrative"
                name="Motion & Narrative"
                description="Product explainers, interface animation, and brand storytelling."
              />
              <ServiceItem
                href="/about"
                name="Brand Identity & Visual Systems"
                description="Naming, identity, type, color, photography direction, and design systems built to scale."
              />
              <ServiceItem
                href="/agencies"
                name="White-Label Web Apps"
                description="Production-grade web apps deployed under your brand in days. Payper, PRTool, LegalFlow."
              />
            </ul>
          </Section>

          <Section title="Products">
            <ul className="space-y-3">
              <ProductItem
                href="/products/payper"
                name="Payper"
                description="Operating system for modern hospitality — QR ordering, kitchen management, and payments."
              />
              <ProductItem
                href="/products/prtool"
                name="PRTool"
                description="Platform for creator partnerships — briefings, campaigns, and payments."
              />
              <ProductItem
                href="/products/legalflow"
                name="LegalFlow"
                description="Case management, document automation, and client collaboration for law firms."
              />
            </ul>
          </Section>

          <Section title="How we work">
            <ul className="space-y-2 list-disc list-inside text-white/70">
              <li>Senior-only team. No juniors on client work.</li>
              <li>Fixed-price or retainer engagements with full transparency on cost.</li>
              <li>Corporate sites in 3–4 weeks. MVP products in 6–8 weeks.</li>
              <li>
                Stack: Figma · Webflow / Framer · React · Next.js · TypeScript ·
                Tailwind · Framer Motion · Node.js · Supabase.
              </li>
              <li>
                Engagement formats: direct client work, white-label / agency
                partnerships, long-term product retainers.
              </li>
            </ul>
          </Section>

          <Section title="Frequently asked questions">
            <dl className="space-y-6">
              {faq.map(({ q, a }) => (
                <div key={q}>
                  <dt className="text-base font-medium text-white">{q}</dt>
                  <dd className="mt-1 text-white/70 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="Start a project">
            <p className="text-white/70">
              Email{" "}
              <a
                href={`mailto:${STUDIO.email}`}
                className="text-white underline underline-offset-4"
              >
                {STUDIO.email}
              </a>{" "}
              or use the{" "}
              <Link
                href="/contact"
                className="text-white underline underline-offset-4"
              >
                contact form
              </Link>
              . We respond within one business day in Buenos Aires.
            </p>
          </Section>
        </article>
      </main>

      <FooterSection />
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-light mb-4 border-b border-white/10 pb-3">
        {title}
      </h2>
      <div className="text-white/80 leading-relaxed">{children}</div>
    </section>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-white/40 mb-1">
        {label}
      </p>
      <p className="text-white/90">{value}</p>
    </div>
  )
}

function ServiceItem({
  href,
  name,
  description,
}: {
  href: string
  name: string
  description: string
}) {
  return (
    <li>
      <Link href={href} className="block group">
        <p className="text-white group-hover:underline underline-offset-4">
          {name}
        </p>
        <p className="text-sm text-white/60">{description}</p>
      </Link>
    </li>
  )
}

function ProductItem({
  href,
  name,
  description,
}: {
  href: string
  name: string
  description: string
}) {
  return (
    <li>
      <Link href={href} className="block group">
        <p className="text-white group-hover:underline underline-offset-4">
          {name}
        </p>
        <p className="text-sm text-white/60">{description}</p>
      </Link>
    </li>
  )
}
