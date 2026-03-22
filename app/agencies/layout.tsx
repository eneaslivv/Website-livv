import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "White-Label Engineering for Agencies | Livv Studio",
  description:
    "Invisible white-label engineering for creative agencies. Scale your technical capabilities without hiring in-house engineers. NDA-protected, fully branded.",
  alternates: {
    canonical: "/agencies",
  },
  openGraph: {
    title: "White-Label Engineering for Agencies | Livv Studio",
    description:
      "Invisible white-label engineering for creative agencies. Scale your technical capabilities without hiring in-house engineers.",
    url: "https://livvvv.com/agencies",
  },
}

export default function AgenciesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
