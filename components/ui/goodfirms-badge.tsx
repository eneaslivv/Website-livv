"use client"

import React from "react"
import Image from "next/image"

interface GoodfirmsBadgeProps {
    color?: string // Kept for compatibility but forced to white visually
    size?: number | string
    className?: string
}

export function GoodfirmsBadge({
    size = 150,
    className = ""
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
                style={{ filter: "brightness(0) invert(1)" }}
            />
        </div>
    )
}

export default GoodfirmsBadge
