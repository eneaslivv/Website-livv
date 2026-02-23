"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { supabase } from "@/lib/supabase/client"

interface CategoryData {
    id: string
    name: string
    slug: string
    description: string | null
    image_url: string | null
    type: string
}

interface ProductItem {
    id: string
    title: string
    slug: string
    short_description: string | null
    featured_image: string | null
    price: number | null
    price_type: string
}

interface ServiceItem {
    id: string
    title: string
    slug: string
    subtitle: string | null
    short_description: string | null
    pricing_model: string
    price_value: number | null
}

export default function CategoryPage() {
    const params = useParams()
    const slug = params.slug as string

    const [category, setCategory] = useState<CategoryData | null>(null)
    const [products, setProducts] = useState<ProductItem[]>([])
    const [services, setServices] = useState<ServiceItem[]>([])
    const [loading, setLoading] = useState(true)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        async function fetchCategory() {
            const { data: cat } = await supabase
                .from('categories')
                .select('*')
                .eq('slug', slug)
                .eq('status', 'active')
                .single()

            if (!cat) {
                setLoading(false)
                return
            }

            setCategory(cat)

            // Fetch products in this category via junction table
            if (cat.type !== 'service') {
                const { data: productCats } = await supabase
                    .from('product_categories')
                    .select('product_id')
                    .eq('category_id', cat.id)

                if (productCats && productCats.length > 0) {
                    const productIds = productCats.map((pc: any) => pc.product_id)
                    const { data: prods } = await supabase
                        .from('products')
                        .select('id, title, slug, short_description, featured_image, price, price_type')
                        .in('id', productIds)
                        .eq('status', 'published')
                        .order('display_order', { ascending: true })
                    setProducts(prods || [])
                }
            }

            // Fetch services in this category
            if (cat.type !== 'product') {
                const { data: svcs } = await supabase
                    .from('services')
                    .select('id, title, slug, subtitle, short_description, pricing_model, price_value')
                    .eq('category_id', cat.id)
                    .eq('status', 'published')
                    .order('display_order', { ascending: true })
                setServices(svcs || [])
            }

            setLoading(false)
        }

        fetchCategory()
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "instant" })
        }, 10)
        setIsVisible(true)
    }, [slug])

    const pricingLabel = (model: string, value: number | null) => {
        switch (model) {
            case 'fixed': return value != null ? `$${value}` : 'Fixed';
            case 'starting_at': return value != null ? `From $${value}` : 'Starting at';
            case 'on_request': return 'On request';
            default: return model;
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDFBF9]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-900"></div>
            </div>
        )
    }

    if (!category) {
        return (
            <div className="min-h-screen flex flex-col bg-[#FDFBF9]">
                <Navbar isLoaded={true} theme="dark" />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-light text-stone-900 mb-2">Category not found</h1>
                        <p className="text-stone-500 mb-8">The category you&apos;re looking for doesn&apos;t exist.</p>
                        <Link href="/" className="text-sm font-semibold text-stone-900 underline underline-offset-4">Go back home</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="text-stone-800 min-h-screen flex flex-col overflow-x-hidden relative selection:bg-stone-200 selection:text-stone-900 bg-[#FDFBF9]">
            <Navbar isLoaded={isVisible} theme="dark" />

            {/* Grain */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-[0.15]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`
                }}
            />

            <main className="flex-grow relative z-10">
                {/* Hero */}
                <section className="pt-28 md:pt-36 pb-16 px-6">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-stone-200 bg-white/50 backdrop-blur-sm mb-8">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-medium">Category</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-stone-900 mb-6">
                                {category.name}
                            </h1>
                            {category.description && (
                                <p className="text-lg text-stone-500 font-light max-w-3xl leading-relaxed">
                                    {category.description}
                                </p>
                            )}
                        </motion.div>
                    </div>
                </section>

                {/* Products */}
                {products.length > 0 && (
                    <section className="py-16 px-6">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-10">Products</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {products.map((product) => (
                                    <Link key={product.id} href={`/products/${product.slug}`}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="group bg-white rounded-3xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                                        >
                                            <div className="aspect-video relative bg-stone-100">
                                                {product.featured_image ? (
                                                    <Image src={product.featured_image} alt={product.title} fill className="object-cover" />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-stone-300 text-sm">No image</div>
                                                )}
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-lg font-medium text-stone-900 mb-2 group-hover:text-stone-600 transition-colors">{product.title}</h3>
                                                {product.short_description && (
                                                    <p className="text-sm text-stone-500 mb-4 line-clamp-2">{product.short_description}</p>
                                                )}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-semibold text-stone-700">
                                                        {product.price_type === 'on_request' ? 'On request' : product.price != null ? `$${product.price}` : '—'}
                                                    </span>
                                                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Services */}
                {services.length > 0 && (
                    <section className="py-16 px-6">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-10">Services</h2>
                            <div className="space-y-6">
                                {services.map((service) => (
                                    <Link key={service.id} href={`/services/${service.slug}`}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="group bg-white rounded-3xl border border-stone-200 p-8 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                                        >
                                            <div>
                                                <h3 className="text-xl font-medium text-stone-900 mb-1 group-hover:text-stone-600 transition-colors">{service.title}</h3>
                                                {service.subtitle && (
                                                    <p className="text-sm text-stone-400 mb-2">{service.subtitle}</p>
                                                )}
                                                {service.short_description && (
                                                    <p className="text-sm text-stone-500 line-clamp-2">{service.short_description}</p>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4 shrink-0">
                                                <span className="text-sm font-medium text-stone-500">
                                                    {pricingLabel(service.pricing_model, service.price_value)}
                                                </span>
                                                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {products.length === 0 && services.length === 0 && (
                    <section className="py-24 px-6">
                        <div className="max-w-5xl mx-auto text-center">
                            <p className="text-stone-400 text-lg">No items in this category yet.</p>
                        </div>
                    </section>
                )}
            </main>

            <FooterSection id="contact" />
        </div>
    )
}
