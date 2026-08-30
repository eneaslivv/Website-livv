import type { Metadata } from "next"
import { CpgLanding } from "@/components/seo/cpg-landing"
import { buildBreadcrumbsJsonLd, buildFaqJsonLd, buildServiceJsonLd, SITE_URL } from "@/lib/seo/structured-data"

export const metadata: Metadata = {
  title: "Food & Beverage Web Design Agency | LIVV Creative Studio",
  description: "Web design, Shopify and digital launch support for food and beverage brands. LIVV helps emerging CPG companies improve product storytelling, retail credibility and ecommerce.",
  alternates: { canonical: "/cpg/food-beverage" },
}

const faq = [
  { q: "Does LIVV work with food and beverage startups?", a: "Yes. We work with emerging food and beverage brands that need a stronger website, ecommerce experience or digital launch system before the company has a large internal creative team." },
  { q: "Can you work with our existing packaging and photography?", a: "Yes. We can build the digital system around existing brand assets and identify only the additional creative pieces needed to make the experience cohesive." },
  { q: "Can the website support retail expansion as well as DTC?", a: "Yes. We can structure the site to serve ecommerce customers while also supporting store locators, wholesale information, retail announcements, press and buyer credibility." },
]

export default function Page() {
  return <CpgLanding
    jsonLd={[
      buildServiceJsonLd({ name: "Food and Beverage Web Design", slug: "food-beverage-web-design", url: `${SITE_URL}/cpg/food-beverage`, description: "Web design, Shopify and digital experiences for emerging food and beverage brands." }),
      buildFaqJsonLd(faq),
      buildBreadcrumbsJsonLd([{ name: "Home", url: SITE_URL }, { name: "CPG", url: `${SITE_URL}/cpg` }, { name: "Food & Beverage", url: `${SITE_URL}/cpg/food-beverage` }]),
    ]}
    kicker="Food & beverage brands"
    title="Digital design for food and beverage brands moving from good product to credible brand."
    intro="A strong product can earn the first taste. The digital experience has to earn trust before and after it. We help emerging food and beverage companies translate packaging, product benefits and brand personality into a website built for DTC and retail growth."
    facts={[
      { label: "Categories", value: "Food · Beverage · Snacks · Functional products · Specialty goods" },
      { label: "Milestones", value: "Launch · Retail expansion · Fundraising · Ecommerce redesign" },
      { label: "Deliverables", value: "Web · Shopify · Campaigns · Retail storytelling" },
    ]}
    sections={[
      { title: "One site, several audiences", body: <p>Food and beverage sites are visited by customers, retailers, press, investors and potential partners. We create a clear hierarchy so the consumer journey stays simple while the brand still has enough depth to feel legitimate at the next stage.</p> },
      { title: "What the system can include", body: <ul className="space-y-2 list-disc list-inside"><li>Brand and product storytelling.</li><li>Shopify or DTC commerce experience.</li><li>Store locator and retail availability.</li><li>Ingredient, sourcing and benefit education.</li><li>Wholesale, press and partnership surfaces.</li><li>Launch and retail campaign landing pages.</li></ul> },
      { title: "Designed around the product, not an agency template", body: <p>The visual direction starts from the packaging, audience and category context. The goal is a digital presence that feels native to the product and distinctive within its shelf set.</p> },
    ]}
    related={{ title: "Related CPG services", items: [
      { href: "/cpg", name: "CPG Studio", description: "The complete LIVV offer for emerging consumer brands." },
      { href: "/cpg/web-design", name: "CPG Web Design", description: "Brand-first digital experiences for consumer products." },
      { href: "/cpg/shopify", name: "Shopify for CPG", description: "Shopify stores built for product clarity and conversion." },
      { href: "/cpg/ecommerce", name: "CPG Ecommerce", description: "Ongoing ecommerce and merchandising optimization." },
    ]}}
    faq={faq}
  />
}
