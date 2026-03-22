import { Download, Type, Palette } from "lucide-react"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })

interface Props {
    label: string
    heading: string
    description?: string
    typeface?: { name: string; weights: { value: string; label: string }[] }
    colors: { name: string; hex: string }[]
}

export function DesignSystemSection({ label, heading, description, typeface, colors }: Props) {
    return (
        <div className="mb-24 md:mb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="max-w-xl">
                    <span className="text-xs font-semibold text-[#C4A35A] uppercase tracking-widest mb-3 block">{label}</span>
                    <h2 className={`text-3xl md:text-4xl text-[#2A1818] mb-4 ${playfair.className}`}>{heading}</h2>
                    {description && (
                        <p className="text-base md:text-lg text-[#5A3E3E]/70 leading-relaxed">{description}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Typeface card */}
                {typeface?.name && (
                    <div className="lg:col-span-5 bg-white rounded-3xl border border-[#D6D1C5] p-8 flex flex-col justify-between relative overflow-hidden min-h-[500px] shadow-[0_2px_20px_rgba(42,24,24,0.03)]">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-[#D6D1C5] font-medium">Typeface</span>
                                <Type className="w-4 h-4 text-[#D6D1C5]" />
                            </div>
                            <h3 className="text-sm font-medium text-[#2A1818] mb-16">{typeface.name}</h3>
                            <div className="text-8xl md:text-9xl font-medium tracking-tighter text-[#2A1818] mb-8 leading-none">Aa</div>
                            <p className="text-2xl md:text-3xl tracking-tight text-[#D6D1C5] leading-tight font-light">
                                The quick brown fox jumps over the lazy dog.
                            </p>
                        </div>
                        {typeface.weights?.length > 0 && (
                            <div className="grid grid-cols-3 gap-4 pt-12 mt-auto relative z-10">
                                {typeface.weights.map((w, i) => (
                                    <div key={i}>
                                        <div className="font-mono text-[10px] text-[#D6D1C5] mb-1">{w.value}</div>
                                        <div className="text-xs font-medium text-[#2A1818]">{w.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Colors */}
                <div className={typeface?.name ? "lg:col-span-7 flex flex-col gap-6" : "lg:col-span-12"}>
                    {colors?.length > 0 && (
                        <div className="bg-white rounded-3xl border border-[#D6D1C5] p-8 shadow-[0_2px_20px_rgba(42,24,24,0.03)]">
                            <div className="flex justify-between items-start mb-8">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-[#D6D1C5] font-medium">Color Variables</span>
                                <Palette className="w-4 h-4 text-[#D6D1C5]" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {colors.map((c, i) => (
                                    <div key={i} className="group cursor-default">
                                        <div
                                            className="aspect-[4/3] w-full rounded-xl mb-4 shadow-sm border border-neutral-100 group-hover:scale-[1.02] transition-transform duration-300"
                                            style={{ backgroundColor: c.hex }}
                                        />
                                        <div className="space-y-1">
                                            <p className="text-xs font-medium text-[#2A1818]">{c.name}</p>
                                            <p className="font-mono text-[10px] text-[#D6D1C5]">{c.hex}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
