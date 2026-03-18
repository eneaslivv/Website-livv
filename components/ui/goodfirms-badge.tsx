"use client"

import React from "react"
import Image from "next/image"

interface GoodfirmsBadgeProps {
    color?: string
    size?: number | string
    className?: string
    variant?: "light" | "dark"
}

export function GoodfirmsBadge({
    size = 150,
    className = "",
    variant = "light"
}: GoodfirmsBadgeProps) {
    // The goodfirms image has an aspect ratio of roughly 1200x220 (~5.45)
    const width = typeof size === 'number' ? size : parseInt(size as string) || 150;
    const height = width / 5.45;

    return (
        <div
            style={{ width, height, position: 'relative' }}
            className={className}
        >
            <Image
                src="/badges/goodfirms.png"
                alt="Goodfirms Badge"
                fill
                className="object-contain"
                style={variant === "dark"
                    ? { filter: "brightness(0) invert(1)" }
                    : { mixBlendMode: "multiply" as const }
                }
            />
        </div>
    )
}

export default GoodfirmsBadge
