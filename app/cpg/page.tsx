import type { Metadata } from "next"
import { CpgLanding } from "@/components/seo/cpg-landing"
import {
  buildBreadcrumbsJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  SITE_URL,
} from "@/lib/seo/structured-data"

export const metadata: Metadata = {
  title: "CPG Web Design & Ecommerce Studio | LIVV Creative Studio",
  description:
    "Web design, Shopify, ecommerce, content systems and digital launches for emerging CPG brands. LIVV helps food, beverage and consumer brands look retail-ready and convert better online.",
  alternates: { canonical: "/cpg" },
  openGraph: {
    title: "CPG Web Design & Ecommerce Studio — LIVV",
    description:
      "Digital, ecommerce and launch systems for emerging CPG brands.",
    url: `${SITE_URL}/cpg`,
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "LIVV Creative Studio" }],
  },
}

const faq = [
  {
    q: "What does LIVV do for CPG brands?",
    a: "We design and build the digital side of emerging consumer brands: websites, Shopify stores, product storytelling, launch pages, content systems and conversion-focused ecommerce experiences.",
  },
  {
    q: "Do you work with early-stage food and beverage brands?",
    a: "Yes. We are a strong fit for emerging brands that need to look more established online before the company is large enough to hire a full internal digital team.",
  },
  {
    q: "Can LIVV redesign an existing Shopify store?",
    a: "Yes. We can audit the current store, improve information architecture, product storytelling, mobile UX, merchandising and conversion paths, then implement the redesign in Shopify.",
  },
  {
    q: "Do you only work with brands already in retail?",
    a: "No. We work with pre-retail, DTC-first and retail-stage brands. The scope changes depending on whether the next milestone is launch, retail expansion, fundraising or ecommerce growth.",
  },
]

const jsonLd = [
  buildServiceJsonLd({
    name: "CPG Web Design and Ecommerce",
    alternateName: "Digital studio for consumer packaged goods brands",
    slug: "cpg",
    url: `${SITE_URL}/cpg`,
    description:
      "Web design, Shopify, ecommerce UX, product storytelling and launch systems for emerging CPG brands.",
  }),
  buildFaqJsonLd(faq),
  buildBreadcrumbsJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "CPG", url: `${SITE_URL}/cpg` },
  ]),
]

export default function CpgPage() {
  return (
    <CpgLanding
      jsonLd={jsonLd}
      kicker="CPG · Food · Beverage · Consumer brands"
      title="Digital experiences for CPG brands that need to look bigger before they are bigger."
      intro="LIVV helps emerging consumer brands turn a good product into a stronger digital business. We combine brand expression, web design, Shopify, content and conversion thinking so the online experience feels as considered as the product on the shelf."
      facts={[
        { label: "Best fit", value: "Emerging food, beverage, wellness and consumer brands" },
        { label: "Core work", value: "Web design · Shopify · Ecommerce UX · Content systems" },
        { label: "Typical moment", value: "Launch, retail expansion, fundraising or redesign" },
        { label: "Delivery", value: "Strategy, design and implementation with one senior team" },
        { label: "Markets", value: "US · LATAM · Europe" },
        { label: "Engagements", value: "Focused sprints or ongoing digital growth support" },
      ]}
      sections={[
        {
          title: "Where we create leverage",
          body: (
            <div className="space-y-4">
              <p>
                CPG websites have to do more than look polished. They need to explain the product quickly, make the brand memorable, reduce purchase friction, support retail credibility and give the team a flexible surface for launches and campaigns.
              </p>
              <p>
                We focus on the gap between packaging and the digital experience: the moment a buyer, customer, investor or retail partner searches the brand and decides how established it feels.
              </p>
            </div>
          ),
        },
        {
          title: "What we can build",
          body: (
            <ul className="space-y-2 list-disc list-inside">
              <li>CPG brand websites and high-conviction launch pages.</li>
              <li>Shopify stores and ecommerce redesigns.</li>
              <li>Product detail pages, bundles and merchandising systems.</li>
              <li>Retail-ready storytelling for buyers, press and wholesale partners.</li>
              <li>Campaign pages and reusable content modules for growth teams.</li>
              <li>Digital audits that surface the highest-leverage improvements first.</li>
            </ul>
          ),
        },
        {
          title: "A practical way to start",
          body: (
            <p>
              We can begin with a focused digital audit, identify the few changes most likely to improve clarity and conversion, and then scope only what is worth rebuilding. For early-stage brands, that usually means a smaller, faster engagement rather than a full rebrand.
            </p>
          ),
        },
      ]}
      related={{
        title: "CPG services",
        items: [
          { href: "/cpg/web-design", name: "CPG Web Design", description: "Websites built around product storytelling, retail credibility and conversion." },
          { href: "/cpg/shopify", name: "Shopify for CPG", description: "Shopify design and development for emerging consumer brands." },
          { href: "/cpg/ecommerce", name: "CPG Ecommerce", description: "Conversion-focused ecommerce systems for food, beverage and consumer products." },
          { href: "/cpg/food-beverage", name: "Food & Beverage", description: "Digital design for food and beverage brands moving from startup to scale." },
        ],
      }}
      faq={faq}
    />
  )
}
