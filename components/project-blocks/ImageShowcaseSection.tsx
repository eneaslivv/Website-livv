import Image from "next/image"
import { Monitor } from "lucide-react"

interface ShowcaseImage {
    url: string
    alt?: string
    theme?: 'light' | 'dark'
    caption?: string
}

interface Props {
    label?: string
    layout: 'single' | 'side_by_side' | 'wireframe'
    images: ShowcaseImage[]
}

export function ImageShowcaseSection({ label, layout, images }: Props) {
    if (images.length === 0) return null

    if (layout === 'wireframe') {
        return (
            <div className="mb-24 md:mb-32">
                {label && <p className="text-xs text-[#5A3E3E]/60 mb-4 ml-1 uppercase tracking-widest">{label}</p>}
                <div className="bg-[#E6E2D6]/30 border border-[#D6D1C5] rounded-xl p-6 md:p-12">
                    {images[0]?.url ? (
                        <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                            <Image src={images[0].url} alt={images[0].alt || "Wireframe"} fill className="object-contain" />
                        </div>
                    ) : (
                        <div className="bg-[#FAF8F3] rounded-lg shadow-sm border border-[#D6D1C5] p-4 aspect-[16/9] flex flex-col gap-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-[#2A1818]" />
                                <div className="w-2 h-2 rounded-full bg-[#E6E2D6]" />
                                <div className="w-2 h-2 rounded-full bg-[#E6E2D6]" />
                            </div>
                            <div className="flex-1 flex gap-4">
                                <div className="w-1/4 bg-[#E6E2D6]/50 rounded h-full border border-[#D6D1C5]/30" />
                                <div className="flex-1 flex flex-col gap-4">
                                    <div className="h-1/3 w-full bg-[#E6E2D6]/50 rounded border border-[#D6D1C5]/30" />
                                    <div className="h-2/3 w-full bg-[#E6E2D6]/50 rounded flex items-center justify-center relative border border-[#D6D1C5]/30">
                                        <Monitor className="w-8 h-8 text-[#D6D1C5] absolute" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    if (layout === 'side_by_side') {
        return (
            <div className="mb-24 md:mb-32">
                {label && (
                    <div className="flex justify-between items-end mb-6">
                        <h3 className="text-sm font-medium text-[#2A1818] uppercase tracking-widest">{label}</h3>
                        <span className="text-xs text-[#5A3E3E]/60">{images.length > 0 ? `1/${Math.ceil(images.length / 2)}` : ''}</span>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className={`rounded-xl border p-12 flex justify-center items-center h-[500px] ${
                                img.theme === 'dark'
                                    ? 'bg-[#1A1A1A] border-[#2A2A2A]'
                                    : 'bg-[#FFFFFF] border-[#D6D1C5]'
                            }`}
                        >
                            {img.url ? (
                                <div className="relative w-full h-full">
                                    <Image src={img.url} alt={img.alt || `Interface ${i + 1}`} fill className="object-contain" />
                                </div>
                            ) : (
                                <div className={`w-[200px] h-[380px] rounded-[2rem] border-4 shadow-2xl ${
                                    img.theme === 'dark'
                                        ? 'bg-[#171717] border-[#171717]'
                                        : 'bg-white border-white shadow-[0_20px_50px_rgba(42,24,24,0.1)]'
                                }`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    // Single image
    return (
        <div className="mb-24 md:mb-32">
            {label && <p className="text-xs text-[#5A3E3E]/60 mb-4 ml-1 uppercase tracking-widest">{label}</p>}
            <div className="rounded-xl overflow-hidden border border-[#D6D1C5]">
                {images[0]?.url && (
                    <div className="relative aspect-video">
                        <Image src={images[0].url} alt={images[0].alt || "Showcase"} fill className="object-cover" />
                    </div>
                )}
            </div>
            {images[0]?.caption && (
                <p className="text-xs text-[#5A3E3E]/60 mt-2 ml-1">{images[0].caption}</p>
            )}
        </div>
    )
}
