import { ArrowUpRight } from "lucide-react"
import { Playfair_Display } from "next/font/google"
import { RichText } from "./RichText"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })

interface Props {
    label: string
    heading: string
    paragraphs: string[]
    tools: string[]
    kpis: { text: string }[]
}

export function ChallengeSection({ label, heading, paragraphs, tools, kpis }: Props) {
    const hasTools = tools?.length > 0
    const hasKpis = kpis?.length > 0
    const hasSidebar = hasTools || hasKpis

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-24 md:mb-32">
            <div className={hasSidebar ? "md:col-span-8" : "md:col-span-12"}>
                {label && <span className="text-xs font-medium text-[#C4A35A] uppercase tracking-widest mb-4 block">{label}</span>}
                {heading && (
                    <h2 className={`text-3xl md:text-4xl text-[#2A1818] tracking-tight mb-8 leading-tight ${playfair.className}`}>
                        {heading}
                    </h2>
                )}
                <div className="space-y-6 text-lg text-[#5A3E3E]/70 leading-relaxed">
                    {paragraphs?.map((p, i) => (
                        <p key={i}><RichText content={p} /></p>
                    ))}
                </div>
            </div>

            {hasSidebar && <div className="md:col-span-4 space-y-12">
                {hasTools && (
                    <div>
                        <h3 className="text-xs font-semibold text-[#2A1818] uppercase tracking-widest mb-4">Tools Used</h3>
                        <div className="flex flex-wrap gap-2">
                            {tools.map((tool, i) => (
                                <span key={i} className="px-3 py-1.5 bg-[#FAFAFA] border border-[#D6D1C5] rounded text-xs font-medium text-[#5A3E3E]">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {hasKpis && (
                    <div>
                        <h3 className="text-xs font-semibold text-[#2A1818] uppercase tracking-widest mb-4">KPI Summary</h3>
                        <ul className="space-y-3">
                            {kpis.map((kpi, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-[#5A3E3E]">
                                    <ArrowUpRight className="w-4 h-4 text-[#C4A35A] mt-0.5" />
                                    {kpi.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>}
        </div>
    )
}
