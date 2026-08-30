import type { Metadata } from "next"
import { CpgLanding } from "@/components/seo/cpg-landing"
import { buildBreadcrumbsJsonLd, buildFaqJsonLd, buildServiceJsonLd, SITE_URL } from "@/lib/seo/structured-data"

const path = "/cpg/digital-audit"
export const metadata: Metadata = {
  title: "CPG Website & Digital Audit | LIVV Creative Studio",
  description: "A focused audit for CPG brands covering website UX, product storytelling, mobile conversion, ecommerce and retail readiness.",
  alternates: { canonical: path, languages: { "en-US": path, "es-419": "/cpg/es/auditoria-digital", "x-default": path } },
}
const faq = [
  { q: "What does the CPG digital audit cover?", a: "Homepage clarity, product storytelling, mobile UX, ecommerce friction, retail-readiness signals, analytics basics and the highest-leverage fixes." },
  { q: "Is this only for Shopify stores?", a: "No. We can audit Shopify, custom ecommerce, Webflow, Framer and content-led brand sites." },
  { q: "Do you implement the recommendations?", a: "Yes. The audit can stand alone or become the brief for a focused redesign or growth sprint." },
]
const service = buildServiceJsonLd({ name: "CPG Digital Audit", slug: "cpg-digital-audit", url: `${SITE_URL}${path}`, description: "Website, ecommerce and digital readiness audits for CPG brands." })
const crumbs = buildBreadcrumbsJsonLd([{ name: "Home", url: SITE_URL }, { name: "CPG", url: `${SITE_URL}/cpg` }, { name: "Digital Audit", url: `${SITE_URL}${path}` }])

export default function Page() {
  return <CpgLanding jsonLd={[service, buildFaqJsonLd(faq), crumbs]} kicker="Website audit · CPG readiness" title="Find the digital gaps costing your CPG brand trust and conversion." intro="A focused review of the brand’s digital shelf: what customers understand, where they hesitate, what retailers see and which changes are most likely to improve the experience." facts={[{ label: "Reviews", value: "Brand · UX · ecommerce · retail readiness" }, { label: "Output", value: "Prioritized recommendations, not a generic checklist" }, { label: "Next step", value: "Fix internally or use LIVV to implement" }]} sections={[{ title: "A practical diagnostic", body: <p>The goal is not to produce a giant deck. It is to identify the few changes most likely to make the brand easier to understand, buy and trust across mobile, ecommerce and retail-facing moments.</p> }, { title: "What we score", body: <ul className="list-disc space-y-2 pl-5"><li>Brand and offer clarity.</li><li>Homepage and navigation.</li><li>Product pages, bundles and cross-sell.</li><li>Mobile conversion friction.</li><li>Retail, wholesale and store-locator readiness.</li><li>Content and measurement foundations.</li></ul> }]} related={{ title: "What comes after the audit", items: [{ href: "/cpg/website-redesign", name: "Website redesign", description: "Turn the audit into a sharper digital system." }, { href: "/cpg/ecommerce", name: "CPG ecommerce", description: "Improve the DTC buying experience." }, { href: "/cpg/startups", name: "CPG startup launch", description: "For brands still building the first strong version." }] }} faq={faq} />
}
