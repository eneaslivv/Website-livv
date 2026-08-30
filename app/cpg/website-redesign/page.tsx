import type { Metadata } from "next"
import { CpgLanding } from "@/components/seo/cpg-landing"
import { buildBreadcrumbsJsonLd, buildFaqJsonLd, buildServiceJsonLd, SITE_URL } from "@/lib/seo/structured-data"

const path = "/cpg/website-redesign"
export const metadata: Metadata = {
  title: "CPG Website Redesign | LIVV Creative Studio",
  description: "Strategic website redesigns for CPG brands that have outgrown an early site, template or launch-stage Shopify setup.",
  alternates: { canonical: path, languages: { "en-US": path, "es-419": "/cpg/es", "x-default": path } },
}
const faq = [
  { q: "When should a CPG brand redesign its website?", a: "Usually when the product, retail footprint or brand has evolved but the site still looks like the launch-stage version of the company." },
  { q: "Do we need a full rebrand first?", a: "No. Many projects are digital-system upgrades using the current brand, packaging and photography as the foundation." },
  { q: "Can you keep our existing Shopify backend?", a: "Yes. We can redesign the storefront while preserving the existing catalog, operations and integrations where they still make sense." },
]
const service = buildServiceJsonLd({ name: "CPG Website Redesign", slug: "cpg-website-redesign", url: `${SITE_URL}${path}`, description: "Website redesign and ecommerce UX for growing CPG brands." })
const crumbs = buildBreadcrumbsJsonLd([{ name: "Home", url: SITE_URL }, { name: "CPG", url: `${SITE_URL}/cpg` }, { name: "Website Redesign", url: `${SITE_URL}${path}` }])

export default function Page() {
  return <CpgLanding jsonLd={[service, buildFaqJsonLd(faq), crumbs]} kicker="Redesign · CRO · retail readiness" title="Your product grew up. Your website should too." intro="We redesign CPG websites that still feel like version one: stronger product hierarchy, clearer storytelling, better mobile UX and a digital system that matches where the brand is going next." facts={[{ label: "Best for", value: "Brands that have outgrown their first site" }, { label: "Goal", value: "Clarity · conversion · stronger brand perception" }, { label: "Approach", value: "Audit first, redesign second" }]} sections={[{ title: "Redesign around evidence, not taste", body: <p>We start by identifying what is actually underperforming: navigation, product comprehension, mobile conversion, landing-page structure, visual inconsistency, speed or missing retail signals. The redesign follows those findings.</p> }, { title: "What usually changes", body: <ul className="list-disc space-y-2 pl-5"><li>Homepage and product architecture.</li><li>Mobile-first buying paths.</li><li>Product detail pages and bundles.</li><li>Retail, wholesale and brand-story sections.</li><li>Design system and reusable campaign modules.</li></ul> }]} related={{ title: "Start with the right path", items: [{ href: "/cpg/digital-audit", name: "CPG digital audit", description: "Identify the biggest gaps before committing to a redesign." }, { href: "/cpg/web-design", name: "CPG web design", description: "Full website strategy and design." }, { href: "/cpg/ecommerce", name: "CPG ecommerce", description: "Conversion and DTC systems for consumer brands." }] }} faq={faq} />
}
