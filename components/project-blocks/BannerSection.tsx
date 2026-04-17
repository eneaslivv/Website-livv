import Link from "next/link"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })

interface Props {
    heading: string
    subtext?: string
    background_color?: string
    cta_label?: string
    cta_href?: string
}

export function BannerSection({ heading, subtext, background_color, cta_label, cta_href }: Props) {
    const bg = background_color || '#1a1a1a'
    const label = cta_label || 'Start a project'
    const href = cta_href || '/contact'

    return (
        <div
            className="relative w-full rounded-[2.5rem] overflow-hidden mb-12 py-20 md:py-28 shadow-2xl"
            style={{ backgroundColor: bg, boxShadow: `0 25px 50px -12px ${bg}33` }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
            <div className="relative z-10 h-full px-8 md:px-14 flex flex-col items-center justify-center text-center gap-8">
                <h2 className={`text-3xl md:text-5xl tracking-tight leading-tight text-[#FAF8F3] max-w-2xl ${playfair.className}`}>
                    {heading}
                    {subtext && <span className="text-[#FAF8F3]/40"> {subtext}</span>}
                </h2>
                <Link
                    href={href}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF8F3] text-[#1a1a1a] text-sm font-medium hover:bg-white transition-colors"
                >
                    {label}
                </Link>
            </div>
        </div>
    )
}
