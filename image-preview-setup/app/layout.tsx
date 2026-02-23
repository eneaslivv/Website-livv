import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono, DM_Serif_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { GenerationProvider } from "@/contexts/generation-context"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Folders for Restream Clips | v0 App",
  description: "Dark mode folder grid UI with thumbnails. Cards display project name, clip count, and timestamp. Includes new project CTA and trial button.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <body className={`font-sans antialiased bg-[#f5f0eb] text-[#2c2420]`}>
        <GenerationProvider>{children}</GenerationProvider>
        <Analytics />
      </body>
    </html>
  )
}
