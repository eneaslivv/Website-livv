import type { Metadata } from "next"
import { buildServiceJsonLd, SERVICES } from "@/lib/seo/structured-data"

const serviceMeta: Record<
  string,
  { title: string; description: string; alternateName?: string }
> = {
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
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const meta = serviceMeta[slug]

  if (!meta) {
    return {
      title: "Service | LIVV Creative Studio",
      description:
        "Professional design and development services by LIVV Creative Studio.",
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

  const jsonLd = meta
    ? buildServiceJsonLd({
        name: meta.title.split("|")[0]!.trim(),
        description: meta.description,
        slug,
        alternateName: meta.alternateName ?? baseService?.nameEs,
      })
    : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  )
}
