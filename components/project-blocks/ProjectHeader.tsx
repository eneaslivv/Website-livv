import { Playfair_Display } from "next/font/google"
import { PortfolioItem } from "@/types/livv-os"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })

export function ProjectHeader({ item }: { item: PortfolioItem }) {
    const tags = [item.category, item.year, ...(item.tech_tags?.slice(0, 1) || [])].filter(Boolean)

    return (
        <header className="flex flex-col items-center text-center mb-16">
            {tags.length > 0 && (
                <div className="flex items-center gap-2 mb-8">
                    {tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 border border-[#D6D1C5] rounded-full text-xs uppercase tracking-wide text-[#5A3E3E] font-medium bg-[#FAFAFA]">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
            <h1 className={`text-5xl md:text-7xl tracking-tighter mb-6 text-[#2A1818] ${playfair.className}`}>
                {item.title}
            </h1>
            {item.description && (
                <p className="text-lg md:text-xl text-[#5A3E3E]/80 max-w-2xl leading-relaxed">
                    {item.description}
                </p>
            )}
        </header>
    )
}
