"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface BadgeItem {
  id: string
  label: string
  logo?: string
}

const ROW_1: BadgeItem[] = [
  { id: "websites", label: "Websites" },
  { id: "landing", label: "Landing pages" },
  { id: "webflow", label: "Webflow", logo: "/logos/webflow-maroon.png" },
  { id: "shopify", label: "Shopify", logo: "/logos/shopify-maroon.png" },
  { id: "framer", label: "Framer", logo: "/logos/framer-maroon.png" },
  { id: "email", label: "Email" },
  { id: "mobile", label: "Mobile apps" },
  { id: "presentations", label: "Presentations" },
]

const ROW_2: BadgeItem[] = [
  { id: "wordpress", label: "WordPress", logo: "/logos/wordpress-maroon.png" },
  { id: "ui", label: "User interface" },
  { id: "nextjs", label: "Next.js" },
  { id: "claude", label: "Claude / AI" },
  { id: "motion", label: "Motion design" },
  { id: "figma", label: "Figma" },
  { id: "dashboards", label: "Dashboards" },
  { id: "automation", label: "Automation" },
]

const ROW_3: BadgeItem[] = [
  { id: "ecommerce", label: "E-commerce" },
  { id: "code", label: "Code / App" },
  { id: "social", label: "Social Media" },
  { id: "ai-agents", label: "Custom AI Agents" },
  { id: "seo", label: "SEO" },
  { id: "analytics", label: "Analytics" },
  { id: "api", label: "API integrations" },
  { id: "saas", label: "SaaS" },
]

function ScrollRow({
  badges,
  direction,
  speed,
  onBadgeClick,
}: {
  badges: BadgeItem[]
  direction: "left" | "right"
  speed: number
  onBadgeClick: (badge: BadgeItem) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let animationId: number
    let position = direction === "left" ? 0 : -(el.scrollWidth / 2)

    const animate = () => {
      if (direction === "left") {
        position -= speed
        if (position <= -(el.scrollWidth / 2)) {
          position = 0
        }
      } else {
        position += speed
        if (position >= 0) {
          position = -(el.scrollWidth / 2)
        }
      }
      el.style.transform = `translateX(${position}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [direction, speed])

  const allBadges = [...badges, ...badges]

  return (
    <div className="overflow-hidden" style={{ width: "100%", maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
      <div ref={scrollRef} className="flex" style={{ gap: "clamp(6px, 2vw, 10px)", width: "max-content" }}>
        {allBadges.map((badge, i) => (
          <button
            key={`${badge.id}-${i}`}
            onClick={() => onBadgeClick(badge)}
            onMouseEnter={() => setHoveredId(`${badge.id}-${i}`)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              padding: "clamp(4px, 1.5vw, 6px) clamp(16px, 5vw, 28px)",
              borderRadius: "100px",
              fontSize: "clamp(11px, 2vw, 13px)",
              fontWeight: 400,
              letterSpacing: "0.01em",
              cursor: "pointer",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              border: "1px solid #e0ddd8",
              background: hoveredId === `${badge.id}-${i}` ? "#2d2d2d" : "rgba(255,255,255,0.8)",
              color: hoveredId === `${badge.id}-${i}` ? "#f5f2ed" : "#6a6a6a",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transform: hoveredId === `${badge.id}-${i}` ? "scale(1.06)" : "scale(1)",
              boxShadow: hoveredId === `${badge.id}-${i}` ? "0 4px 12px rgba(0,0,0,0.12)" : "0 1px 3px rgba(0,0,0,0.03)",
              display: "flex",
              alignItems: "center",
              gap: "clamp(4px, 1.5vw, 6px)",
            }}
          >
            {badge.logo && (
              <Image
                src={badge.logo || "/placeholder.svg"}
                alt={badge.label}
                width={14}
                height={14}
                style={{ objectFit: "contain" }}
              />
            )}
            {badge.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function BadgeScroller({ onBadgeClick }: { onBadgeClick: (badgeId: string, badgeLabel: string) => void }) {
  const handleClick = (badge: BadgeItem) => {
    onBadgeClick(badge.id, badge.label)
  }

  return (
    <div
      className="relative z-10 flex flex-col items-center justify-center"
      style={{
        width: "100%",
        gap: "10px",
      }}
    >
      <ScrollRow badges={ROW_1} direction="left" speed={0.3} onBadgeClick={handleClick} />
      <ScrollRow badges={ROW_2} direction="right" speed={0.25} onBadgeClick={handleClick} />
      <ScrollRow badges={ROW_3} direction="left" speed={0.35} onBadgeClick={handleClick} />
    </div>
  )
}
