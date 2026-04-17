import { ContentBlock } from "@/types/livv-os"
import { HeroImageSection } from "./HeroImageSection"
import { ChallengeSection } from "./ChallengeSection"
import { ImageShowcaseSection } from "./ImageShowcaseSection"
import { DesignSystemSection } from "./DesignSystemSection"
import { BannerSection } from "./BannerSection"
import { RichText } from "./RichText"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })

export function BlockRenderer({ block }: { block: ContentBlock }) {
    switch (block.type) {
        case 'hero_image':
            return <HeroImageSection image_url={block.image_url} alt={block.alt} />

        case 'challenge':
            return (
                <ChallengeSection
                    label={block.label}
                    heading={block.heading}
                    paragraphs={block.paragraphs}
                    tools={block.tools}
                    kpis={block.kpis}
                />
            )

        case 'image_showcase':
            return (
                <ImageShowcaseSection
                    label={block.label}
                    layout={block.layout}
                    images={block.images}
                />
            )

        case 'design_system':
            return (
                <DesignSystemSection
                    label={block.label}
                    heading={block.heading}
                    description={block.description}
                    typeface={block.typeface}
                    colors={block.colors}
                />
            )

        case 'banner':
            return (
                <BannerSection
                    heading={block.heading}
                    subtext={block.subtext}
                    background_color={block.background_color}
                    cta_label={block.cta_label}
                    cta_href={block.cta_href}
                />
            )

        case 'heading':
            return (
                <h2 className={`text-3xl md:text-4xl text-[#2A1818] tracking-tight mb-8 leading-tight ${playfair.className}`}>
                    {block.content}
                </h2>
            )

        case 'text':
            return (
                <div className="text-lg text-[#5A3E3E]/70 leading-relaxed mb-8">
                    <RichText content={block.content} />
                </div>
            )

        case 'quote':
            return (
                <blockquote className="border-l-4 border-[#C4A35A] pl-6 py-2 mb-8 italic text-lg text-[#5A3E3E]/70 leading-relaxed">
                    <RichText content={block.content} />
                </blockquote>
            )

        default:
            return null
    }
}
