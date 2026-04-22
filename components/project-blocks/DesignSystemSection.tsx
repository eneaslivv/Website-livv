import { Download, Type, Palette, Ruler, Layers } from "lucide-react"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })

type ColorInput = { name: string; hex: string } | string

interface Props {
    label?: string
    heading?: string
    description?: string
    typeface?: { name: string; weights?: { value: string; label: string }[] }
    colors?: ColorInput[]
    spacing?: { label?: string; scale?: { value: string; token?: string }[]; grid?: string }
    components?: { label?: string; items?: { name: string; kind: "button" | "input" | "chip"; text?: string }[] }
    download_url?: string
}

const DEFAULT_WEIGHTS = [
    { value: "400", label: "Regular" },
    { value: "500", label: "Medium" },
    { value: "600", label: "Semibold" },
]

const DEFAULT_SPACING = [
    { value: "0.25rem", token: "4" },
    { value: "0.5rem", token: "8" },
    { value: "16px", token: "1rem" },
]

const DEFAULT_COMPONENTS: { name: string; kind: "button" | "input" | "chip"; text?: string }[] = [
    { name: "Btn.Primary", kind: "button", text: "Action" },
    { name: "Input.Default", kind: "input", text: "Type..." },
]

function paletteNameFor(i: number): string {
    if (i === 0) return "Primary"
    if (i === 1) return "Accent"
    if (i === 2) return "Surface"
    return `Color ${i + 1}`
}

function normalizeColors(colors?: ColorInput[]): { name: string; hex: string }[] {
    if (!colors || colors.length === 0) return []
    return colors
        .map((c, i) => {
            if (typeof c === "string") return { name: paletteNameFor(i), hex: c }
            if (!c || !c.hex) return null
            return { name: c.name || paletteNameFor(i), hex: c.hex }
        })
        .filter((c): c is { name: string; hex: string } => !!c)
}

export function DesignSystemSection({
    label = "Design Language",
    heading = "System & Assets",
    description = "A comprehensive set of foundational elements defining the visual hierarchy and interaction patterns.",
    typeface,
    colors,
    spacing,
    components,
    download_url,
}: Props) {
    const typeName = typeface?.name || "Inter Display"
    const typeWeights = typeface?.weights?.length ? typeface.weights : DEFAULT_WEIGHTS

    const resolvedColors = normalizeColors(colors)
    const displayColors = resolvedColors.length
        ? resolvedColors.slice(0, 6)
        : [
              { name: "Primary", hex: "#2A1818" },
              { name: "Accent", hex: "#C4A35A" },
              { name: "Surface", hex: "#FAF8F3" },
          ]

    const spacingScale = spacing?.scale?.length ? spacing.scale : DEFAULT_SPACING
    const spacingGrid = spacing?.grid || "8pt Grid System"
    const spacingLabel = spacing?.label || "Spacing"

    const componentsItems = components?.items?.length ? components.items : DEFAULT_COMPONENTS
    const componentsLabel = components?.label || "Components"

    return (
        <div className="mb-24 md:mb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div className="max-w-xl">
                    <span className="text-xs font-semibold text-[#C4A35A] uppercase tracking-widest mb-3 block">{label}</span>
                    <h2 className={`text-3xl md:text-4xl text-[#2A1818] mb-4 ${playfair.className}`}>{heading}</h2>
                    {description && (
                        <p className="text-sm md:text-base text-[#5A3E3E]/70 leading-relaxed">{description}</p>
                    )}
                </div>
                {download_url && (
                    <a
                        href={download_url}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#2A1818] bg-white border border-[#D6D1C5] rounded-full hover:bg-[#F5F1E8] transition-colors self-start md:self-auto"
                    >
                        <Download className="w-3.5 h-3.5" />
                        Download Brand Assets
                    </a>
                )}
            </div>

            <div className="border-t border-[#D6D1C5] mb-8" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Typeface */}
                <div className="lg:col-span-5 bg-white rounded-3xl border border-[#D6D1C5] p-8 flex flex-col justify-between relative overflow-hidden min-h-[460px] shadow-[0_2px_20px_rgba(42,24,24,0.03)]">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-[#B8B0A0] font-medium">Typeface</span>
                            <Type className="w-4 h-4 text-[#B8B0A0]" />
                        </div>
                        <h3 className="text-sm font-medium text-[#2A1818] mb-12">{typeName}</h3>
                        <div className="text-8xl md:text-9xl font-medium tracking-tighter text-[#2A1818] mb-6 leading-none">Aa</div>
                        <p className="text-xl md:text-2xl tracking-tight text-[#B8B0A0] leading-tight font-light">
                            The quick brown fox jumps over the lazy dog.
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-10 mt-auto relative z-10">
                        {typeWeights.map((w, i) => (
                            <div key={i}>
                                <div className="font-mono text-[10px] text-[#B8B0A0] mb-1">{w.value}</div>
                                <div className="text-xs font-medium text-[#2A1818]">{w.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right column: colors on top, spacing + components below */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    {/* Colors */}
                    <div className="bg-white rounded-3xl border border-[#D6D1C5] p-8 shadow-[0_2px_20px_rgba(42,24,24,0.03)]">
                        <div className="flex justify-between items-start mb-6">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-[#B8B0A0] font-medium">Color Variables</span>
                            <Palette className="w-4 h-4 text-[#B8B0A0]" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                            {displayColors.map((c, i) => (
                                <div key={i} className="group cursor-default">
                                    <div
                                        className="aspect-[4/3] w-full rounded-xl mb-3 shadow-sm border border-neutral-100 group-hover:scale-[1.02] transition-transform duration-300"
                                        style={{ backgroundColor: c.hex }}
                                    />
                                    <div className="space-y-0.5">
                                        <p className="text-xs font-medium text-[#2A1818]">{c.name}</p>
                                        <p className="font-mono text-[10px] text-[#B8B0A0] uppercase">{c.hex}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Spacing */}
                        <div className="bg-white rounded-3xl border border-[#D6D1C5] p-6 shadow-[0_2px_20px_rgba(42,24,24,0.03)] flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-[#B8B0A0] font-medium">{spacingLabel}</span>
                                <Ruler className="w-4 h-4 text-[#B8B0A0]" />
                            </div>
                            <div className="space-y-2.5 mb-auto">
                                {spacingScale.map((s, i) => {
                                    const sizes = ["w-2 h-2", "w-3 h-3", "w-4 h-4", "w-5 h-5", "w-6 h-6"]
                                    const sizeClass = sizes[Math.min(i, sizes.length - 1)]
                                    return (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className={`${sizeClass} bg-[#F2B7B7] rounded-sm flex-shrink-0`} />
                                            <span className="font-mono text-[11px] text-[#2A1818]">{s.value}</span>
                                            {s.token && (
                                                <span className="font-mono text-[10px] text-[#B8B0A0] ml-auto">{s.token}</span>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="pt-4 mt-4 border-t border-[#EFE9DB]">
                                <p className="text-xs font-medium text-[#2A1818]">{spacingGrid}</p>
                            </div>
                        </div>

                        {/* Components */}
                        <div className="bg-[#1A1A1A] rounded-3xl p-6 shadow-[0_2px_20px_rgba(42,24,24,0.15)] flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 font-medium">{componentsLabel}</span>
                                <Layers className="w-4 h-4 text-white/40" />
                            </div>
                            <div className="space-y-4">
                                {componentsItems.map((c, i) => (
                                    <div key={i} className="rounded-xl border border-white/10 p-3">
                                        <p className="font-mono text-[10px] text-white/40 mb-2">{c.name}</p>
                                        {c.kind === "button" && (
                                            <div className="bg-white text-[#1A1A1A] text-xs font-medium text-center py-2 rounded-md">
                                                {c.text || "Action"}
                                            </div>
                                        )}
                                        {c.kind === "input" && (
                                            <div className="bg-black/40 border border-white/10 text-white/40 text-xs py-2 px-3 rounded-md">
                                                {c.text || "Type..."}
                                            </div>
                                        )}
                                        {c.kind === "chip" && (
                                            <span className="inline-block bg-white/10 text-white text-[10px] font-medium px-2 py-1 rounded-full">
                                                {c.text || "Chip"}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
