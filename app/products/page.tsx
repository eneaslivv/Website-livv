import { Navbar } from "@/components/layout/navbar"
import { MarketplaceSection } from "@/components/sections/marketplace-section"
import { FooterSection } from "@/components/sections/footer-section"

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
