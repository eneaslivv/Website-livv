import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Livv Studio | Start Your Project Today",
  description:
    "Get in touch with Livv Studio. Tell us about your project and let's explore how we can build something exceptional together. No commitment required.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Livv Studio | Start Your Project Today",
    description:
      "Get in touch with Livv Studio. Tell us about your project and let's build something exceptional together.",
    url: "https://livvvv.com/contact",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
