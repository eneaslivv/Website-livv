import type { Metadata } from "next"
import { CpgLanding } from "@/components/seo/cpg-landing"
import { buildBreadcrumbsJsonLd, buildFaqJsonLd, buildServiceJsonLd, SITE_URL } from "@/lib/seo/structured-data"

export const metadata: Metadata = {
  title: "Shopify Agency for CPG Brands | LIVV Creative Studio",
  description: "Shopify design and development for emerging CPG brands. Better merchandising, product pages, mobile UX and conversion without losing brand character.",
  alternates: { canonical: "/cpg/shopify" },
}

const faq = [
  { q: "Does LIVV build Shopify stores for CPG brands?", a: "Yes. We design and implement Shopify stores for emerging consumer brands, with a focus on product storytelling, mobile UX, merchandising and conversion." },
  { q: "Can you improve an existing Shopify store instead of rebuilding it?", a: "Yes. We can audit the current theme and prioritize changes to navigation, PDPs, bundles, subscriptions, campaign pages and content modules before deciding whether a rebuild is justified." },
  { q: "Do you support subscriptions and bundles?", a: "Yes. We can design the customer experience around bundles, subscriptions and repeat purchase flows, then work with the appropriate Shopify apps or custom implementation." },
]

export default function Page() {
  return <CpgLanding
    jsonLd={[
      buildServiceJsonLd({ name: "Shopify Development for CPG Brands", slug: "cpg-shopify", url: `${SITE_URL}/cpg/shopify`, description: "Shopify design, development and conversion optimization for CPG brands." }),
      buildFaqJsonLd(faq),
      buildBreadcrumbsJsonLd([{ name: "Home", url: SITE_URL }, { name: "CPG", url: `${SITE_URL}/cpg` }, { name: "Shopify", url: `${SITE_URL}/cpg/shopify` }]),
    ]}
    kicker="Shopify for CPG"
    title="Shopify stores that sell the product without flattening the brand."
    intro="For CPG founders, ecommerce has to do two jobs at once: make the product feel desirable and make buying it effortless. We design Shopify systems that preserve brand character while improving the parts that drive conversion."
    facts={[
      { label: "Platform", value: "Shopify" },
      { label: "Typical work", value: "Redesign · PDPs · Bundles · Campaigns · Mobile UX" },
      { label: "Goal", value: "More clarity, better merchandising and less purchase friction" },
    ]}
    sections={[
      { title: "From shelf story to product page", body: <p>Packaging gets a few seconds of attention in-store. A Shopify product page gets the same test online. We structure the page so shoppers understand what it is, why it is different and what to buy next without scrolling through generic ecommerce blocks.</p> },
      { title: "What we optimize", body: <ul className="space-y-2 list-disc list-inside"><li>Homepage merchandising and category structure.</li><li>Product detail pages and ingredient or benefit storytelling.</li><li>Bundles, subscriptions and repeat-purchase paths.</li><li>Mobile navigation, cart and checkout-adjacent UX.</li><li>Campaign landing pages for launches and paid media.</li><li>Reusable sections for the internal growth team.</li></ul> },
      { title: "No unnecessary rebuild", body: <p>If the existing Shopify foundation is sound, we work within it. A focused redesign of the highest-impact templates can often create more value than replacing the whole store.</p> },
    ]}
    related={{ title: "Related CPG services", items: [
      { href: "/cpg", name: "CPG Studio", description: "Full digital support for emerging CPG brands." },
      { href: "/cpg/web-design", name: "CPG Web Design", description: "Brand-first websites built around product clarity and credibility." },
      { href: "/cpg/ecommerce", name: "CPG Ecommerce", description: "Conversion and merchandising systems beyond the initial build." },
      { href: "/cpg/food-beverage", name: "Food & Beverage", description: "Focused digital work for food and beverage companies." },
    ]}}
    faq={faq}
  />
}
