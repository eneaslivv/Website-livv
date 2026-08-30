import type { Metadata } from "next"
import { CpgLanding } from "@/components/seo/cpg-landing"
import { buildBreadcrumbsJsonLd, buildFaqJsonLd, buildServiceJsonLd, SITE_URL } from "@/lib/seo/structured-data"

export const metadata: Metadata = {
  title: "CPG Ecommerce Agency | Conversion & Digital Growth | LIVV",
  description: "Ecommerce strategy, UX, merchandising and conversion design for CPG brands. Improve product discovery, bundles, campaigns and mobile shopping with LIVV.",
  alternates: { canonical: "/cpg/ecommerce" },
}

const faq = [
  { q: "What does a CPG ecommerce agency improve?", a: "The highest-leverage work usually sits around product discovery, PDP clarity, bundles, merchandising, mobile UX, campaign landing pages and the path from first purchase to repeat purchase." },
  { q: "Do you work only on Shopify?", a: "Shopify is a common fit for CPG, but the strategic and UX work is platform-agnostic. We can adapt the approach to the stack a brand already uses." },
  { q: "Can you work alongside an internal growth team?", a: "Yes. We can operate as a design and development layer for internal marketing or growth teams, shipping experiments, landing pages and reusable modules on an ongoing basis." },
]

export default function Page() {
  return <CpgLanding
    jsonLd={[
      buildServiceJsonLd({ name: "CPG Ecommerce Strategy and Design", slug: "cpg-ecommerce", url: `${SITE_URL}/cpg/ecommerce`, description: "Ecommerce UX, merchandising and conversion design for CPG brands." }),
      buildFaqJsonLd(faq),
      buildBreadcrumbsJsonLd([{ name: "Home", url: SITE_URL }, { name: "CPG", url: `${SITE_URL}/cpg` }, { name: "Ecommerce", url: `${SITE_URL}/cpg/ecommerce` }]),
    ]}
    kicker="CPG ecommerce"
    title="Turn a good consumer brand into a better digital buying experience."
    intro="We help CPG teams improve the parts of ecommerce that often get left behind after launch: how products are discovered, compared, bundled, explained and merchandised across mobile and campaign traffic."
    facts={[
      { label: "Focus", value: "Conversion · Merchandising · Mobile · Campaign UX" },
      { label: "Works with", value: "Founders, ecommerce leads and growth teams" },
      { label: "Format", value: "Focused sprint or ongoing optimization" },
    ]}
    sections={[
      { title: "Conversion without becoming generic", body: <p>CPG ecommerce often breaks in one of two directions: visually strong but hard to shop, or optimized into the same template as every other store. We design for both memory and usability.</p> },
      { title: "Typical opportunities", body: <ul className="space-y-2 list-disc list-inside"><li>Clarify product hierarchy and category entry points.</li><li>Improve PDP information order and purchase confidence.</li><li>Design bundles around actual shopping behavior.</li><li>Create stronger mobile-first campaign pages.</li><li>Build repeatable launch and seasonal merchandising modules.</li><li>Connect creative direction with measurable ecommerce experiments.</li></ul> },
      { title: "A system your team can keep using", body: <p>The output is not just a prettier store. We create reusable patterns so future campaigns, SKUs and retail moments can launch faster without reinventing the page structure each time.</p> },
    ]}
    related={{ title: "Related CPG services", items: [
      { href: "/cpg", name: "CPG Studio", description: "Strategy, design and implementation for consumer brands." },
      { href: "/cpg/web-design", name: "CPG Web Design", description: "Create a stronger brand and product story online." },
      { href: "/cpg/shopify", name: "Shopify for CPG", description: "Shopify-specific design and development." },
      { href: "/cpg/food-beverage", name: "Food & Beverage", description: "Digital experiences for food and beverage brands." },
    ]}}
    faq={faq}
  />
}
