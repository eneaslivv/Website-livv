import type { Metadata } from "next"

const productMeta: Record<string, { title: string; description: string }> = {
  payper: {
    title: "Payper — The Operating System for Modern Hospitality | Livv Studio",
    description:
      "A unified platform for restaurants and hotels — QR ordering, kitchen management, and payments. White-label ready, deployed under your brand in days.",
  },
  prtool: {
    title:
      "PRTool — The Platform for Creator Partnerships | Livv Studio",
    description:
      "Manage creator campaigns from briefing to payment — all in one branded platform built for PR agencies and talent managers.",
  },
  legalflow: {
    title: "LegalFlow — Case Management, Automated | Livv Studio",
    description:
      "Secure case management, document automation, and client collaboration — built for law firms that want to move faster.",
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
      title: "Product | Livv Studio",
      description:
        "Scalable, white-label digital products built by Livv Studio.",
    }
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/products/${slug}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://livvvv.com/products/${slug}`,
    },
  }
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
