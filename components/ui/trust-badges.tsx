import { GoodfirmsBadge } from "@/components/ui/goodfirms-badge"
import { DesignRushBadge } from "@/components/ui/designrush-badge"

/**
 * GoodFirms and DesignRush side by side, split by a hairline: the pair the site
 * shows wherever it vouches for the studio (hero, About, contact, footer).
 * `tone` is the background they sit on.
 */
export function TrustBadges({
  tone = "dark",
  goodfirmsSize = 150,
  sealHeight = 88,
  className = "",
}: {
  tone?: "dark" | "light"
  goodfirmsSize?: number
  sealHeight?: number
  className?: string
}) {
  const onDark = tone === "dark"
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <GoodfirmsBadge size={goodfirmsSize} variant={onDark ? "dark" : "light"} />
      <span aria-hidden className={`h-9 w-px ${onDark ? "bg-white/25" : "bg-[#2c2420]/15"}`} />
      <DesignRushBadge height={sealHeight} tone={tone} />
    </div>
  )
}
