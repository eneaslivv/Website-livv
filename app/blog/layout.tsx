import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | LIVV Creative Studio",
  description:
    "Insights on Webflow development, Framer, SEO optimization, creative engineering, and building digital products that perform.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | LIVV Creative Studio",
    description:
      "Insights on Webflow development, Framer, SEO optimization, creative engineering, and building digital products that perform.",
    url: "https://livvvv.com/blog",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "LIVV Creative Studio" }],
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
