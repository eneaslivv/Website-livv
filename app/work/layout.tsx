import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Work | Livv Studio Portfolio & Case Studies",
  description:
    "Explore Livv Studio's portfolio of digital products, brand identities, and web experiences. Real projects with real results for startups and enterprises.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Our Work | Livv Studio Portfolio & Case Studies",
    description:
      "Explore Livv Studio's portfolio of digital products, brand identities, and web experiences.",
    url: "https://livvvv.com/work",
  },
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
