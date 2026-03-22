import type { Metadata } from "next"

const serviceMeta: Record<string, { title: string; description: string }> = {
  "creative-engineering": {
    title: "Creative Engineering | Livv Studio",
    description:
      "Design and development at the intersection of strategy and technical precision. We build scalable, maintainable digital products aligned with real business goals.",
  },
  "product-strategy-ui": {
    title: "Product Strategy & UI Design | Livv Studio",
    description:
      "Product strategy and UI design that bring clarity to complexity. We define what to build, why it matters, and how users interact with it.",
  },
  "motion-narrative": {
    title: "Motion & Narrative | Livv Studio",
    description:
      "Motion and storytelling that make ideas easy to understand. From product explainers to interface animations and brand narratives.",
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
      title: "Service | Livv Studio",
      description:
        "Professional design and development services by Livv Studio.",
    }
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://livvvv.com/services/${slug}`,
    },
  }
}

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
