import Image from "next/image"

/**
 * DesignRush «Top Digital Design Agency 2026» seal.
 *
 * The artwork has two colours (the seal and the lettering on its ribbon), so it
 * cannot be recoloured with a mask: there are two files. `dark` is the original
 * white seal, for dark backgrounds and photos; `light` is the same seal in ink
 * with the ribbon lettering in paper, for the cream sections.
 *
 * It lived here as DesignRushBadge until March 2026, when the hero and About
 * swapped it for GoodFirms.
 */

const SEAL = {
  dark: "/digital-design-primary.svg",
  light: "/badges/designrush-2026-ink.svg",
} as const

const RATIO = 202 / 228

export function DesignRushBadge({
  height = 88,
  tone = "dark",
  className = "",
}: {
  height?: number
  /** The background it sits on. */
  tone?: "dark" | "light"
  className?: string
}) {
  return (
    <Image
      src={SEAL[tone]}
      alt="DesignRush — Top Digital Design Agency 2026"
      width={Math.round(height * RATIO)}
      height={height}
      unoptimized
      className={`shrink-0 ${className}`}
      style={{ width: "auto", height }}
    />
  )
}
