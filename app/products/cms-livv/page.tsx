import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"

export const metadata: Metadata = {
    title: "CMS LIVV | Website Content Management",
    description: "Manage website content, portfolio projects and products from one workspace with CMS LIVV.",
    alternates: { canonical: "/products/cms-livv" },
}

const modules = [
    { title: "Portfolio", description: "Organize projects, covers and case studies." },
    { title: "Products", description: "Keep product information and visuals up to date." },
    { title: "Categories", description: "Structure content so it is easier to manage and find." },
]

export default function CMSLivvPage() {
    return (
        <main className="min-h-screen bg-[#FDFCF8] text-[#2c2420]">
            <Navbar />
            <section className="max-w-6xl mx-auto px-6 md:px-12 pt-36 md:pt-44 pb-20 md:pb-28">
                <Link href="/products" className="inline-flex items-center gap-2 text-xs text-[#817366] hover:text-[#2c2420]">
                    <ArrowLeft size={14} aria-hidden="true" /> All products
                </Link>
                <p className="mt-12 text-[10px] uppercase tracking-[.18em] text-[#8a7e74]">Content · Website management</p>
                <h1 className="mt-5 text-5xl md:text-7xl font-light tracking-[-.05em]">CMS LIVV</h1>
                <p className="mt-7 max-w-xl text-lg md:text-xl font-light leading-relaxed text-[#6b625b]">
                    Your website content, in one place. Manage portfolio projects, products and categories from a single workspace.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-5">
                    <Link href="/contact" className="group inline-flex items-center gap-5 rounded-full bg-[#2c2420] text-[#f5f0eb] py-3 px-5 text-sm transition-colors hover:bg-[#5a3e3e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                        Request a demo <ArrowUpRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
                    </Link>
                    <span className="text-xs text-[#8a7e74]">Pricing on request</span>
                </div>
                <div className="mt-16 md:mt-24 grid md:grid-cols-3 border-t border-[#2c2420]/15">
                    {modules.map((module, index) => (
                        <div key={module.title} className="py-8 md:pr-8 border-b border-[#2c2420]/10">
                            <span className="text-xs text-[#a39383]">0{index + 1}</span>
                            <h2 className="mt-5 text-xl font-light">{module.title}</h2>
                            <p className="mt-3 text-sm leading-relaxed text-[#817366]">{module.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            <FooterSection />
        </main>
    )
}
