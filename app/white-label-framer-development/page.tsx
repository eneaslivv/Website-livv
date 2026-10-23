import type { Metadata } from "next"
import { AeoLanding } from "@/components/seo/aeo-landing"
import {
  buildBreadcrumbsJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  SITE_URL,
} from "@/lib/seo/structured-data"

const path = "/white-label-framer-development"

export const metadata: Metadata = {
  title: "White-Label Framer Development for Agencies | LIVV Creative Studio",
  description:
    "White-label Framer development for branding, design and creative agencies. LIVV works behind your brand with NDA-friendly delivery, senior development, motion and post-launch support.",
  alternates: { canonical: path },
  openGraph: {
    title: "White-Label Framer Development for Agencies | LIVV",
    description:
      "A senior Framer development partner for agencies that need invisible production capacity without hiring an internal team.",
    url: `${SITE_URL}${path}`,
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "LIVV Creative Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "White-Label Framer Development for Agencies | LIVV",
    description:
      "A senior Framer development partner for agencies that need invisible production capacity without hiring an internal team.",
    images: ["/assets/og-image.png"],
  },
}

const faq = [
  {
    q: "What is white-label Framer development?",
    a: "White-label Framer development means LIVV builds and ships the website behind your agency brand. Your agency owns the client relationship while we handle technical execution, responsive implementation, CMS, motion, QA and launch support.",
  },
  {
    q: "Will LIVV contact our client directly?",
    a: "Only if you want us to. We can operate fully behind the scenes and follow your communication model. For invisible partnerships we work under your process and can sign an NDA.",
  },
  {
    q: "Can you build from our Figma files?",
    a: "Yes. The usual handoff is Figma to Framer, including responsive behavior, CMS, interactions, motion and final QA. We can also help refine design details when implementation exposes gaps.",
  },
  {
    q: "Do you only work in Framer?",
    a: "No. Framer is ideal for many marketing sites, but LIVV also works with Webflow, Next.js, React and custom stacks when the project needs more complex functionality.",
  },
  {
    q: "Can LIVV help during agency overflow?",
    a: "Yes. Overflow production is one of the main use cases: a design or branding agency can add senior development capacity for a launch, pitch or temporary workload spike without adding permanent headcount.",
  },
  {
    q: "How is pricing structured?",
    a: "We normally quote a fixed project scope or a recurring production retainer. Scope, timing and price are agreed before kickoff so the agency can protect its own margin.",
  },
]

const serviceJsonLd = buildServiceJsonLd({
  name: "White-Label Framer Development for Agencies",
  alternateName: "Framer development partner for design and branding agencies",
  slug: "white-label-framer-development",
  url: `${SITE_URL}${path}`,
  description:
    "White-label Framer development for creative, branding and design agencies: Figma-to-Framer production, responsive implementation, CMS, motion, QA and launch support delivered behind the agency brand.",
})

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Home", url: SITE_URL },
  { name: "For agencies", url: `${SITE_URL}/agencies` },
  { name: "White-label Framer development", url: `${SITE_URL}${path}` },
])

export default function WhiteLabelFramerDevelopmentPage() {
  return (
    <AeoLanding
      jsonLd={[serviceJsonLd, buildFaqJsonLd(faq), breadcrumbs]}
      kicker="White-label Framer development · For creative agencies"
      title="Framer production your clients can experience — without seeing the partner behind it."
      intro="LIVV is a senior design and engineering studio that works behind branding, design and creative agencies. You keep the client relationship; we turn Figma into production-ready Framer sites with responsive implementation, CMS, interactions, motion, QA and launch support."
      facts={[
        { label: "Best fit", value: "Branding, design and creative agencies" },
        { label: "Typical handoff", value: "Figma → Framer → QA → launch" },
        { label: "Working model", value: "White-label · NDA-friendly · overflow" },
        { label: "Team", value: "Senior, founder-led production" },
        { label: "Also available", value: "Webflow · Next.js · React" },
        { label: "Commercial model", value: "Fixed scope or retainer" },
      ]}
      sections={[
        {
          title: "Where we fit",
          body: (
            <ul className="space-y-2 list-disc list-inside text-white/70">
              <li><strong className="text-white/90">You design, we build.</strong> Send finished Figma files and we handle production.</li>
              <li><strong className="text-white/90">Overflow capacity.</strong> Add senior delivery when your internal team is full.</li>
              <li><strong className="text-white/90">Technical extension.</strong> Use us when a project needs motion, integrations or code beyond a standard Framer build.</li>
              <li><strong className="text-white/90">Invisible delivery.</strong> We can stay fully behind your agency brand and process.</li>
            </ul>
          ),
        },
        {
          title: "What the agency gets",
          body: (
            <ul className="space-y-2 list-disc list-inside text-white/70">
              <li>Responsive Framer implementation from approved design files.</li>
              <li>CMS architecture and reusable components for the client team.</li>
              <li>Interactions, motion and polished frontend behavior.</li>
              <li>Cross-device QA, launch support and post-launch fixes.</li>
              <li>Clear scope and timing so you can quote your client confidently.</li>
            </ul>
          ),
        },
      ]}
      related={{
        title: "Related",
        items: [
          {
            href: "/agencies",
            name: "White-label engineering for agencies",
            description: "The broader LIVV partner model for creative agencies.",
          },
          {
            href: "/services/creative-engineering",
            name: "Creative engineering",
            description: "Design-led frontend, motion and technical implementation.",
          },
          {
            href: "/product-design-development-for-startups",
            name: "Product design & development for startups",
            description: "A direct-client offer for funded and fast-moving startups.",
          },
        ],
      }}
      faq={faq}
      ctaLead="Need production capacity for a Framer project? Send the scope or Figma link and we’ll tell you how we would structure the build."
    />
  )
}
