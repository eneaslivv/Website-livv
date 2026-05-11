import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: {
    template: "%s · LIVV Journal",
    default: "Journal · LIVV Creative Studio",
  },
  description:
    "Essays on craft, industry, and case studies from LIVV Creative Studio.",
  alternates: {
    canonical: "/journal",
  },
  openGraph: {
    type: "website",
    title: "Journal · LIVV Creative Studio",
    description:
      "Essays on craft, industry, and case studies from LIVV Creative Studio.",
    url: "https://livvvv.com/journal",
    siteName: "LIVV Creative Studio",
  },
}

export default function JournalLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
