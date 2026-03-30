import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Livv Studio",
  description:
    "Insights on Webflow development, Framer, SEO optimization, creative engineering, and building digital products that perform.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Livv Studio",
    description:
      "Insights on Webflow development, Framer, SEO optimization, creative engineering, and building digital products that perform.",
    url: "https://livvvv.com/blog",
    type: "website",
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
