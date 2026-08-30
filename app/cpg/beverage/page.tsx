import type { Metadata } from "next"
import { CpgLanding } from "@/components/seo/cpg-landing"
import { buildBreadcrumbsJsonLd, buildFaqJsonLd, buildServiceJsonLd, SITE_URL } from "@/lib/seo/structured-data"

const path = "/cpg/beverage"
export const metadata: Metadata = {
  title: "Beverage Brand Web Design | LIVV Creative Studio",
  description: "Web design and ecommerce for beverage brands: product storytelling, DTC, retail readiness and launch systems.",
  alternates: { canonical: path, languages: { "en-US": path, "es-419": "/cpg/es/marcas-bebidas", "x-default": path } },
}
const faq = [
  { q: "Do you design websites specifically for beverage brands?", a: "Yes. We design around flavor, product differentiation, pack architecture, retail trust and DTC conversion." },
  { q: "Can you support multiple SKUs and flavors?", a: "Yes. We build flexible product systems for ranges, variety packs, subscriptions and new launches." },
  { q: "Can you work with existing photography and packaging?", a: "Yes. We can build the digital system around existing assets or help define what new visual content is needed." },
]
const service = buildServiceJsonLd({ name: "Beverage Brand Web Design", slug: "beverage-brand-web-design", url: `${SITE_URL}${path}`, description: "Web design and ecommerce for beverage brands and emerging drink companies." })
const crumbs = buildBreadcrumbsJsonLd([{ name: "Home", url: SITE_URL }, { name: "CPG", url: `${SITE_URL}/cpg` }, { name: "Beverage", url: `${SITE_URL}${path}` }])

export default function Page() {
  return <CpgLanding jsonLd={[service, buildFaqJsonLd(faq), crumbs]} kicker="Beverage brands · DTC · retail" title="Web design for beverage brands that need to sell the taste before the first sip." intro="A beverage website has to do more than look good. It needs to make flavor, occasion, difference and credibility obvious fast — then turn that attention into DTC sales, store visits or retail confidence." facts={[{ label: "Focus", value: "Beverage and drink brands" }, { label: "Use cases", value: "Launch · DTC · retail expansion" }, { label: "Platforms", value: "Shopify · Next.js · custom stacks" }]} sections={[{ title: "Make the product easy to understand", body: <p>We structure the site around what customers actually need to know: what it tastes like, why it is different, who it is for, where to buy it and what to try next.</p> }, { title: "From can or bottle to conversion", body: <ul className="list-disc space-y-2 pl-5"><li>Flavor and SKU storytelling.</li><li>Variety packs and bundle logic.</li><li>Store locator and retail proof.</li><li>Subscription and repeat-purchase UX.</li><li>Launch motion and campaign pages.</li></ul> }]} related={{ title: "Related CPG services", items: [{ href: "/cpg/shopify", name: "Shopify for CPG", description: "DTC ecommerce for consumer brands." }, { href: "/cpg/food-beverage", name: "Food & beverage web design", description: "Broader food and beverage category expertise." }, { href: "/cpg/website-redesign", name: "CPG website redesign", description: "Upgrade an existing site without starting blindly." }] }} faq={faq} />
}
