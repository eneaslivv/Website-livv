import Image from "next/image"

interface Props {
    image_url: string
    alt?: string
}

export function HeroImageSection({ image_url, alt }: Props) {
    if (!image_url || image_url.trim() === '') return null

    return (
        <div className="relative w-full rounded-2xl overflow-hidden mb-24 md:mb-32 shadow-2xl shadow-[#2A1818]/5">
            <div className="absolute inset-0 z-0 bg-[#E6E2D6] opacity-30" />
            <div className="relative z-10 pt-12 md:pt-20 px-4 md:px-12 pb-0">
                <div className="bg-[#FAF8F3] rounded-t-xl shadow-2xl border border-[#D6D1C5]/50 overflow-hidden">
                    <div className="h-10 bg-[#FAF8F3] border-b border-[#D6D1C5] flex items-center px-4 gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E6E2D6] border border-[#D6D1C5]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E6E2D6] border border-[#D6D1C5]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E6E2D6] border border-[#D6D1C5]" />
                    </div>
                    <div className="bg-[#2A1818] aspect-video w-full relative group overflow-hidden">
                        <Image
                            src={image_url}
                            alt={alt || "Project screenshot"}
                            fill
                            className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
