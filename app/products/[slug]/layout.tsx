import type { Metadata } from "next"
import {
  buildBreadcrumbsJsonLd,
  buildFaqJsonLd,
  buildSoftwareApplicationJsonLd,
} from "@/lib/seo/structured-data"
import { getProductFaqs } from "@/lib/product-faqs"

const productMeta: Record<
  string,
  {
    title: string
    description: string
    name: string
    shortDescription: string
    category: string
    priceFromUSD?: number
  }
> = {
  payper: {
    name: "Payper",
    title:
      "Payper — The Operating System for Modern Hospitality | LIVV Creative Studio",
    description:
      "Unified hospitality platform — QR ordering, kitchen management, and payments. White-label ready, deployed under your brand in days. Built by LIVV Creative Studio in Buenos Aires, Argentina.",
    shortDescription:
      "Unified hospitality platform — QR ordering, kitchen management, and payments. White-label SaaS by LIVV Creative Studio.",
    category: "Hospitality SaaS",
    priceFromUSD: 49,
  },
  prtool: {
    name: "PRTool",
    title:
      "PRTool — The Platform for Creator Partnerships | LIVV Creative Studio",
    description:
      "Manage creator campaigns from briefing to payment in one branded platform. Built for PR agencies and talent managers by LIVV Creative Studio (Argentina).",
    shortDescription:
      "Creator partnerships platform — briefings, campaigns, payments. White-label SaaS by LIVV Creative Studio.",
    category: "Creator Economy SaaS",
    priceFromUSD: 29,
  },
  legalflow: {
    name: "LegalFlow",
    title: "LegalFlow — Case Management, Automated | LIVV Creative Studio",
    description:
      "Secure case management, document automation, and client collaboration for law firms that want to move faster. Built by LIVV Creative Studio (Buenos Aires, Argentina).",
    shortDescription:
      "Case management and document automation for modern law firms. White-label SaaS by LIVV Creative Studio.",
    category: "Legal Tech SaaS",
    priceFromUSD: 59,
  },
  registrar: {
    name: "Registrar",
    title: "Registrar — Voice-First Income & Expense Tracking | LIVV Creative Studio",
    description:
      "Log income and expenses by speaking. Registrar transcribes, categorises and files every movement automatically. White-label finance app in Spanish and English, built by LIVV Creative Studio (Buenos Aires, Argentina).",
    shortDescription:
      "Voice-first income and expense tracking that categorises movements automatically. White-label SaaS by LIVV Creative Studio.",
    category: "Finance SaaS",
    priceFromUSD: 39,
  },
  "pm-agent": {
    name: "PM Agent",
    title: "PM Agent — The AI Project Manager | LIVV Creative Studio",
    description:
      "An AI agent that turns a goal into tasks, assigns owners, sets deadlines and follows up automatically. White-label AI project management built by LIVV Creative Studio (Buenos Aires, Argentina).",
    shortDescription:
      "AI project management agent that plans, assigns and follows up on work automatically. White-label SaaS by LIVV Creative Studio.",
    category: "AI Project Management",
    priceFromUSD: 19,
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const meta = productMeta[slug]

  if (!meta) {
    return {
      title: "Product | LIVV Creative Studio",
      description:
        "Scalable, white-label digital products built by LIVV Creative Studio.",
    }
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/products/${slug}`,
      languages: {
        "en-US": `/products/${slug}`,
        "es-AR": `/products/${slug}`,
        "x-default": `/products/${slug}`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://livvvv.com/products/${slug}`,
      locale: "en_US",
      alternateLocale: ["es_AR"],
        images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "LIVV Creative Studio" }],
  },
  }
}

export default async function ProductLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const meta = productMeta[slug]
  const faqs = getProductFaqs(slug)

  const graphs: unknown[] = []

  if (meta) {
    graphs.push(
      buildSoftwareApplicationJsonLd({
        name: meta.name,
        description: meta.shortDescription,
        slug,
        category: meta.category,
        priceFromUSD: meta.priceFromUSD,
      }),
      buildBreadcrumbsJsonLd([
        { name: "Home", url: "https://livvvv.com" },
        { name: "Products", url: "https://livvvv.com/products" },
        { name: meta.name, url: `https://livvvv.com/products/${slug}` },
      ]),
    )
  }

  // FAQPage mirrors the visible FAQ block rendered by page.tsx
  if (faqs.length > 0) {
    graphs.push(buildFaqJsonLd(faqs))
  }

  return (
    <>
      {graphs.map((graph, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      ))}
      {children}
    </>
  )
}
