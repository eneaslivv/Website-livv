import type { Metadata } from "next"
import { AeoLanding } from "@/components/seo/aeo-landing"
import {
  buildBreadcrumbsJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  SITE_URL,
} from "@/lib/seo/structured-data"

const path = "/product-design-development-for-startups"

export const metadata: Metadata = {
  title: "Product Design & Development for Startups | LIVV Creative Studio",
  description:
    "Senior product design and development for funded startups: strategy, UX/UI, marketing sites, MVPs, motion and frontend execution without assembling multiple vendors.",
  alternates: { canonical: path },
  openGraph: {
    title: "Product Design & Development for Startups | LIVV",
    description:
      "A senior design and engineering partner for startups moving from funding, launch or hiring pressure into shipped product.",
    url: `${SITE_URL}${path}`,
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "LIVV Creative Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Design & Development for Startups | LIVV",
    description:
      "A senior design and engineering partner for startups moving from funding, launch or hiring pressure into shipped product.",
    images: ["/assets/og-image.png"],
  },
}

const faq = [
  {
    q: "What kind of startups does LIVV work best with?",
    a: "The strongest fit is a startup that already has momentum — recent funding, a launch, a rebrand, new product leadership, hiring pressure or a product that has outgrown its current design. LIVV can act as a senior external product and creative team while the company stays lean.",
  },
  {
    q: "Can LIVV design and build the product?",
    a: "Yes. LIVV combines product strategy, UX/UI, marketing websites, frontend engineering, motion and custom software. We can own a complete workstream or integrate with an existing engineering team.",
  },
  {
    q: "Can you help after a funding round?",
    a: "Yes. Funding often creates simultaneous pressure across product, recruiting and go-to-market. We can take ownership of a website, product redesign, launch experience or MVP so the internal team does not need to hire every specialist immediately.",
  },
  {
    q: "Do you work with an existing codebase?",
    a: "Yes. We can work inside an existing React or Next.js product, build a new frontend against an existing backend, or create a new product stack when the company is starting from zero.",
  },
  {
    q: "How fast can a startup project launch?",
    a: "Timing depends on scope. Focused marketing sites can often ship in weeks, while MVP and product work is planned in clear phases. We define the first shippable outcome before kickoff instead of committing to a vague multi-month engagement.",
  },
  {
    q: "Who owns the work?",
    a: "For custom client work, the startup owns its code and project IP. We can remain involved after launch through a retainer, but the product is not locked to LIVV.",
  },
]

const serviceJsonLd = buildServiceJsonLd({
  name: "Product Design and Development for Startups",
  alternateName: "Startup product design and engineering partner",
  slug: "product-design-development-for-startups",
  url: `${SITE_URL}${path}`,
  description:
    "Senior product design and development for startups: strategy, UX/UI, marketing websites, MVPs, creative frontend and custom software delivered by one founder-led studio.",
})

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Home", url: SITE_URL },
  { name: "Product design & development for startups", url: `${SITE_URL}${path}` },
])

export default function ProductDesignDevelopmentForStartupsPage() {
  return (
    <AeoLanding
      jsonLd={[serviceJsonLd, buildFaqJsonLd(faq), breadcrumbs]}
      kicker="Product design + development · For startups"
      title="Use new momentum to ship — not to assemble five different vendors."
      intro="LIVV works with fast-moving startups that need a senior external team across product, brand, web and engineering. We are most useful when something changed: you raised, launched, started hiring, entered a new market, brought in a new product or marketing leader, or your current experience no longer matches the company you have become."
      facts={[
        { label: "Best fit", value: "Pre-seed to Series B teams with momentum" },
        { label: "Triggers", value: "Funding · hiring · launch · rebrand · expansion" },
        { label: "Capabilities", value: "Product · UX/UI · web · motion · engineering" },
        { label: "Stack", value: "Figma · Framer · Next.js · React · Supabase" },
        { label: "Ownership", value: "Client owns custom code and project IP" },
        { label: "Model", value: "Focused project or ongoing product retainer" },
      ]}
      sections={[
        {
          title: "When startups bring us in",
          body: (
            <ul className="space-y-2 list-disc list-inside text-white/70">
              <li><strong className="text-white/90">After funding.</strong> The company needs to upgrade product, website and go-to-market before the team is fully hired.</li>
              <li><strong className="text-white/90">Before a launch.</strong> Product and marketing need one team that can move from concept to production.</li>
              <li><strong className="text-white/90">During a hiring gap.</strong> We cover senior design or frontend capacity while permanent roles are still open.</li>
              <li><strong className="text-white/90">When perception lags traction.</strong> The product is working, but the brand, UX or website still looks like an earlier-stage company.</li>
            </ul>
          ),
        },
        {
          title: "One team across the visible product",
          body: (
            <ul className="space-y-2 list-disc list-inside text-white/70">
              <li>Product strategy, flows and interface design in Figma.</li>
              <li>Marketing websites in Framer, Webflow or Next.js.</li>
              <li>React / Next.js frontend and Supabase-backed product work.</li>
              <li>Motion, interaction and launch storytelling.</li>
              <li>Senior QA and post-launch iteration.</li>
            </ul>
          ),
        },
      ]}
      related={{
        title: "Related",
        items: [
          {
            href: "/services/product-strategy-ui",
            name: "Product strategy & UI design",
            description: "Define what to build and how the product should work.",
          },
          {
            href: "/services/creative-engineering",
            name: "Creative engineering",
            description: "Design-led frontend and production engineering.",
          },
          {
            href: "/white-label-framer-development",
            name: "White-label Framer development",
            description: "Our separate partner model for agencies.",
          },
        ],
      }}
      faq={faq}
      ctaLead="Raised, launching or hiring? Tell us what changed and what needs to ship next. We’ll propose the smallest senior team and scope that can move it forward."
    />
  )
}
