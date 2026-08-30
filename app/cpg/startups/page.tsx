import type { Metadata } from "next"
import { CpgLanding } from "@/components/seo/cpg-landing"
import { buildBreadcrumbsJsonLd, buildFaqJsonLd, buildServiceJsonLd, SITE_URL } from "@/lib/seo/structured-data"

const path = "/cpg/startups"
export const metadata: Metadata = {
  title: "Web Design for CPG Startups | LIVV Creative Studio",
  description: "Web design, Shopify and launch support for emerging CPG startups in food, beverage, beauty and consumer goods.",
  alternates: { canonical: path, languages: { "en-US": path, "es-419": "/cpg/es", "x-default": path } },
}
const faq = [
  { q: "Do you work with early-stage CPG startups?", a: "Yes. We scope around the next milestone: launch, DTC validation, retail pitch, fundraising or a site redesign after product-market fit." },
  { q: "Can LIVV work with an existing brand identity?", a: "Yes. We can translate an existing identity into a stronger digital system without forcing a full rebrand." },
  { q: "Can you launch quickly?", a: "Yes. Focused launch sprints can cover positioning, website, Shopify setup and launch assets in a compact engagement." },
]
const service = buildServiceJsonLd({ name: "Web Design for CPG Startups", slug: "cpg-startups", url: `${SITE_URL}${path}`, description: "Digital launch, web design and ecommerce for emerging CPG startups." })
const crumbs = buildBreadcrumbsJsonLd([{ name: "Home", url: SITE_URL }, { name: "CPG", url: `${SITE_URL}/cpg` }, { name: "CPG Startups", url: `${SITE_URL}${path}` }])

export default function Page() {
  return <CpgLanding jsonLd={[service, buildFaqJsonLd(faq), crumbs]} kicker="LIVV for emerging consumer brands" title="Digital launch systems for CPG startups that need to look bigger than they are." intro="We help emerging consumer brands turn a strong product into a credible digital launch: website, ecommerce, product storytelling and the pieces founders need for the next retail or growth milestone." facts={[{ label: "Best fit", value: "Seed-stage and emerging CPG brands" }, { label: "Categories", value: "Food · Beverage · Beauty · Consumer goods" }, { label: "Typical scope", value: "Launch site · Shopify · Product storytelling" }]} sections={[{ title: "Built around the next milestone", body: <p>Early-stage CPG brands rarely need a giant transformation. They need the digital layer that makes the next milestone easier: a retailer taking the brand seriously, a customer understanding the product in seconds, or a launch converting instead of leaking attention.</p> }, { title: "What we can ship", body: <ul className="list-disc space-y-2 pl-5"><li>Launch-ready brand websites.</li><li>Shopify storefronts and product pages.</li><li>Retailer, wholesale and press pages.</li><li>Launch assets and motion.</li><li>Analytics and conversion foundations.</li></ul> }]} related={{ title: "Explore the CPG cluster", items: [{ href: "/cpg/web-design", name: "CPG web design", description: "Brand-led websites for consumer products." }, { href: "/cpg/shopify", name: "Shopify for CPG", description: "DTC storefronts designed around product discovery." }, { href: "/cpg/digital-audit", name: "CPG digital audit", description: "Find the biggest digital gaps before redesigning." }] }} faq={faq} />
}
