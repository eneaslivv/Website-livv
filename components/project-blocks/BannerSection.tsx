import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })

interface Props {
    heading: string
    subtext?: string
    background_color?: string
}

export function BannerSection({ heading, subtext, background_color }: Props) {
    const bg = background_color || '#2A1818'

    return (
        <div
            className="relative w-full rounded-[2.5rem] overflow-hidden mb-12 h-72 md:h-80 shadow-2xl"
            style={{ backgroundColor: bg, boxShadow: `0 25px 50px -12px ${bg}33` }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
            <div className="relative z-10 h-full p-8 md:p-14 flex flex-col justify-between">
                <h2 className={`text-3xl md:text-5xl tracking-tight leading-tight text-[#FAF8F3] max-w-lg ${playfair.className}`}>
                    {heading}
                    {subtext && <span className="text-[#FAF8F3]/30"> {subtext}</span>}
                </h2>
            </div>
        </div>
    )
}
