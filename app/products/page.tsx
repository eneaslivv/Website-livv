import type { Metadata } from "next"
import { Navbar } from "@/components/layout/navbar"
import { MarketplaceSection } from "@/components/sections/marketplace-section"
import { FooterSection } from "@/components/sections/footer-section"
import { SITE_URL } from "@/lib/seo/structured-data"

export const metadata: Metadata = {
  title: "Products | LIVV Creative Studio",
  description:
    "White-label software LIVV built and runs in production: Payper for hospitality, PRTool for creator partnerships, LegalFlow, Registrar, and PM Agent.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products | LIVV Creative Studio",
    description:
      "White-label software LIVV built and runs in production, available to license or deploy under your own brand.",
    url: `${SITE_URL}/products`,
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "LIVV Creative Studio" }],
  },
}

export default function ProductsPage() {
    return (
        <main className="min-h-screen bg-[#FFFFFF]">
            <Navbar />
            <div className="pt-24">
                <MarketplaceSection />
            </div>
            <FooterSection />
        </main>
    )
}
