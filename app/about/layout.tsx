import type { Metadata } from "next"
import type { ReactNode } from "react"
import { SITE_URL, STUDIO } from "@/lib/seo/structured-data"

export const metadata: Metadata = {
  title: "About · LIVV Creative Studio",
  description:
    "LIVV Creative Studio. A creative engineering studio in Buenos Aires building digital products for founders and agencies, directly and as an invisible white-label partner.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    title: "About · LIVV Creative Studio",
    description:
      "Creative engineering studio in Buenos Aires. Direct work and white-label partnerships for founders and agencies. Senior team only.",
    url: `${SITE_URL}/about`,
    siteName: "LIVV Creative Studio",
  },
}

/**
 * FAQPage schema for the FAQ section rendered on /about. Three Q&A pairs
 * the page actually contains, so emitting this schema is correct (Google
 * guideline: do not emit FAQPage schema without a matching visible FAQ).
 */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a typical project cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depends on scope. Landing pages from $2k, full Web Apps from $8k. We always work with fixed price or retainer. Total transparency before starting.",
      },
    },
    {
      "@type": "Question",
      name: "How long do projects take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Speed is key. Corporate sites in 3-4 weeks. MVP products in 6-8 weeks. We move fast because we eliminate bureaucracy.",
      },
    },
    {
      "@type": "Question",
      name: "What tech stack do you use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We design in Figma. We develop sites in Webflow or Framer. For complex apps we use React/Next.js and Node.",
      },
    },
  ],
}

/**
 * Person schema scoped to /about. Richer than the baseline emitted by
 * buildOrganizationGraph in the root layout: adds knowsAbout, nationality,
 * and split given/family name so LLM extractors merge the two records via
 * the shared @id reference.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}#founder`,
  name: STUDIO.founder.name,
  givenName: "Eneas",
  familyName: "Aldabe",
  jobTitle: STUDIO.founder.jobTitle,
  worksFor: { "@id": `${SITE_URL}#organization` },
  nationality: "Argentine",
  url: `${SITE_URL}/about`,
  knowsAbout: [
    "Creative engineering",
    "Webflow development",
    "Framer development",
    "Next.js development",
    "React Native development",
    "Flutter development",
    "Shopify development",
    "Supabase",
    "Anthropic API",
    "Design systems",
    "White-label studio model",
    "Argentine creative engineering tradition",
  ],
  sameAs: [...STUDIO.founder.sameAs],
}

export default function AboutLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {children}
    </>
  )
}
