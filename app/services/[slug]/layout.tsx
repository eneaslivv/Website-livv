import type { Metadata } from "next"
import {
  buildBreadcrumbsJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  SERVICES,
} from "@/lib/seo/structured-data"
import { getServiceFaqs } from "@/lib/service-faqs"

const serviceMeta: Record<
  string,
  { title: string; description: string; alternateName?: string }
> = {
  "custom-software-development": {
    title: "Custom Software Development | LIVV Creative Studio — Buenos Aires, Argentina",
    description:
      "Custom business applications, internal tools and SaaS MVPs designed and built end-to-end by one senior team. LIVV Creative Studio ships production software for clients across LATAM, the US and the UK.",
    alternateName: "Desarrollo de Software a Medida",
  },
  "ai-integration": {
    title: "AI Integration Services | LIVV Creative Studio — Argentina",
    description:
      "AI built around a specific operational job, not a generic chat window. Custom AI agents, RAG systems and Claude or OpenAI integrations shipped into production by LIVV Creative Studio.",
    alternateName: "Integración de IA",
  },
  "creative-engineering": {
    title: "Creative Engineering | LIVV Creative Studio — Buenos Aires, Argentina",
    description:
      "Design and development at the intersection of strategy and technical precision. LIVV Creative Studio builds scalable, maintainable digital products aligned with real business goals — from Buenos Aires for clients across LATAM and the US.",
    alternateName: "Ingeniería Creativa",
  },
  "product-strategy-ui": {
    title: "Product Strategy & UI Design | LIVV Creative Studio — Argentina",
    description:
      "Bilingual product strategy and UI design that bring clarity to complexity. LIVV defines what to build, why it matters, and how users interact with it.",
    alternateName: "Estrategia de Producto y Diseño UI",
  },
  "motion-narrative": {
    title: "Motion & Narrative | LIVV Creative Studio — Buenos Aires",
    description:
      "Motion and storytelling that make ideas easy to understand. Product explainers, interface animations, and brand narratives by LIVV Creative Studio.",
    alternateName: "Motion y Narrativa",
  },
  "nearshore-development": {
    title: "Nearshore Software Development | LIVV — Argentina",
    description:
      "A senior Buenos Aires team working US East Coast hours, in English and Spanish. Nearshore product engineering with the same people designing and shipping the software.",
    alternateName: "Desarrollo Nearshore",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const meta = serviceMeta[slug]

  if (!meta) {
    // Unknown slug: still self-canonicalize rather than inheriting a
    // parent canonical, and keep it out of the index since there is no
    // real content behind it.
    return {
      title: "Service | LIVV Creative Studio",
      description:
        "Professional design and development services by LIVV Creative Studio.",
      alternates: { canonical: `/services/${slug}` },
      robots: { index: false, follow: true },
    }
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/services/${slug}`,
      languages: {
        "en-US": `/services/${slug}`,
        "es-AR": `/services/${slug}`,
        "x-default": `/services/${slug}`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://livvvv.com/services/${slug}`,
      locale: "en_US",
      alternateLocale: ["es_AR"],
        images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "LIVV Creative Studio" }],
  },
  }
}

export default async function ServiceLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const meta = serviceMeta[slug]
  const baseService = SERVICES.find((s) => s.slug === slug)
  const faqs = getServiceFaqs(slug)

  const graphs: unknown[] = []

  if (meta) {
    const name = meta.title.split("|")[0]!.trim()
    graphs.push(
      buildServiceJsonLd({
        name,
        description: meta.description,
        slug,
        alternateName: meta.alternateName ?? baseService?.nameEs,
      }),
      buildBreadcrumbsJsonLd([
        { name: "Home", url: "https://livvvv.com" },
        { name: "Services", url: "https://livvvv.com/#services" },
        { name, url: `https://livvvv.com/services/${slug}` },
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
