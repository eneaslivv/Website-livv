import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Project Case Study | Livv Studio",
  description:
    "Explore this project case study by Livv Studio. See how we craft exceptional digital products with technical excellence and cinematic motion.",
  openGraph: {
    title: "Project Case Study | Livv Studio",
    description:
      "Explore this project case study by Livv Studio — digital products with technical excellence.",
  },
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
