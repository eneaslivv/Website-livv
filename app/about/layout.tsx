import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Livv Studio | Boutique Design & Digital Product Studio",
  description:
    "Meet Livv — a boutique design studio obsessed with the intersection of flawless aesthetics and business logic. Senior team, global reach, scalable systems.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Livv Studio | Boutique Design & Digital Product Studio",
    description:
      "Meet Livv — a boutique design studio obsessed with the intersection of flawless aesthetics and business logic.",
    url: "https://livvvv.com/about",
  },
}

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

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  )
}
