import { LegacyProductPage } from "@/components/products/legacy-product-page"
import { ProductLanding } from "@/components/products/product-landing"
import { getProductFaqs } from "@/lib/product-faqs"
import { getProductLanding } from "@/lib/product-landings"

/**
 * A product with an entry in lib/product-landings.ts gets the landing built
 * from its real screens. The rest (Registrar, PM Agent) keep the previous
 * template until they have material of their own.
 */
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const content = getProductLanding(slug.toLowerCase())

    if (!content) return <LegacyProductPage />
    return <ProductLanding content={content} faqs={getProductFaqs(content.slug)} />
}
