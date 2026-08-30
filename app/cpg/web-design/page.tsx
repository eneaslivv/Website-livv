import type { Metadata } from "next"
import { CpgLanding } from "@/components/seo/cpg-landing"
import { buildBreadcrumbsJsonLd, buildFaqJsonLd, buildServiceJsonLd, SITE_URL } from "@/lib/seo/structured-data"

export const metadata: Metadata = {
  title: "CPG Web Design Agency | Websites for Consumer Brands | LIVV",
  description: "CPG web design for emerging food, beverage and consumer brands. Strategy, visual direction, UX and development focused on retail credibility and conversion.",
  alternates: { canonical: "/cpg/web-design" },
}

const faq = [
  { q: "What makes CPG web design different?", a: "A strong CPG website has to balance brand expression with fast product comprehension, ecommerce usability, retail credibility and mobile conversion. It should work for customers, buyers, press and investors without becoming cluttered." },
  { q: "Can you work from an existing brand identity?", a: "Yes. Most engagements start with existing packaging or brand guidelines. We translate that system into a richer digital language rather than forcing a full rebrand." },
  { q: "Do you design and build the site?", a: "Yes. LIVV can handle strategy, UX/UI, motion and implementation so the design intent survives into production." },
]

export default function Page() {
  return <CpgLanding
    jsonLd={[
      buildServiceJsonLd({ name: "CPG Web Design", slug: "cpg-web-design", url: `${SITE_URL}/cpg/web-design`, description: "Web design and development for emerging CPG brands." }),
      buildFaqJsonLd(faq),
      buildBreadcrumbsJsonLd([{ name: "Home", url: SITE_URL }, { name: "CPG", url: `${SITE_URL}/cpg` }, { name: "Web Design", url: `${SITE_URL}/cpg/web-design` }]),
    ]}
    kicker="CPG web design"
    title="Websites for consumer brands that need to feel shelf-ready, memorable and easy to buy from."
    intro="We design digital experiences for CPG brands that already have a product worth noticing but need the website to catch up. The result is a stronger bridge between packaging, retail presence and ecommerce."
    facts={[
      { label: "For", value: "Food, beverage, wellness and consumer product brands" },
      { label: "Scope", value: "Strategy · UX/UI · Motion · Development" },
      { label: "Focus", value: "Product clarity · Brand recall · Conversion" },
    ]}
    sections={[
      { title: "The job of the site", body: <p>Your site should explain the product in seconds, create confidence in the brand, make mobile shopping frictionless and still feel distinctive enough to be remembered after the tab closes.</p> },
      { title: "What we improve", body: <ul className="space-y-2 list-disc list-inside"><li>Homepage hierarchy and product storytelling.</li><li>Product detail pages and bundles.</li><li>Mobile shopping flows and navigation.</li><li>Retail locator, wholesale and press surfaces.</li><li>Campaign-ready modular sections.</li><li>Motion and visual systems that extend the packaging online.</li></ul> },
      { title: "Built to keep evolving", body: <p>We avoid one-off art direction that becomes impossible to maintain. The system is designed so your internal team can launch new SKUs, campaigns and retail announcements without rebuilding the website every time.</p> },
    ]}
    related={{ title: "Explore the CPG cluster", items: [
      { href: "/cpg", name: "CPG Studio", description: "The full LIVV offer for emerging consumer brands." },
      { href: "/cpg/shopify", name: "Shopify for CPG", description: "Design and development for conversion-focused stores." },
      { href: "/cpg/ecommerce", name: "CPG Ecommerce", description: "Improve conversion, merchandising and repeatable growth surfaces." },
      { href: "/cpg/food-beverage", name: "Food & Beverage", description: "A focused offer for food and beverage founders." },
    ]}}
    faq={faq}
  />
}
