import type { Metadata } from "next"
import { SITE_URL } from "@/lib/seo/structured-data"

export const metadata: Metadata = {
  title: "Selected Work · LIVV Creative Studio Portfolio",
  description:
    "Selected portfolio from LIVV Creative Studio — Webflow, Framer, Next.js, React Native, and Shopify projects shipped for founders and agencies in the US, UK, and Latin America.",
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    title: "Selected Work · LIVV Creative Studio",
    description:
      "Portfolio of digital products and marketing surfaces shipped by LIVV Creative Studio for founders and agencies.",
    url: `${SITE_URL}/work`,
    siteName: "LIVV Creative Studio",
  },
}

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/work#collection`,
  name: "Selected Work · LIVV Creative Studio Portfolio",
  description:
    "Portfolio of digital products, websites, and brand systems shipped by LIVV Creative Studio.",
  url: `${SITE_URL}/work`,
  publisher: { "@id": `${SITE_URL}#organization` },
  inLanguage: ["en", "es"],
  about: "Creative engineering studio portfolio",
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/work` },
  ],
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  )
}
