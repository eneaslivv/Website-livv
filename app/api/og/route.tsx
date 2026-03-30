import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

const categoryColors: Record<string, { bg: string; accent: string; icon: string }> = {
  "webflow-seo": { bg: "#1a2332", accent: "#C4A35A", icon: "SEO" },
  "platform-comparisons": { bg: "#1e1a2e", accent: "#9B8AE0", icon: "VS" },
  "framer-seo": { bg: "#1a2a2a", accent: "#4ECDC4", icon: "FM" },
  "hiring-agencies": { bg: "#2a1a1a", accent: "#E88B5A", icon: "HR" },
  "technical-integration": { bg: "#1a1a2e", accent: "#5A9BE8", icon: "API" },
  "creative-engineering": { bg: "#2a2218", accent: "#C4A35A", icon: "CE" },
  "industry-guides": { bg: "#1e2a1a", accent: "#6DBE6D", icon: "IND" },
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title") || "Blog Post"
  const category = searchParams.get("category") || "webflow-seo"
  const categoryName = searchParams.get("categoryName") || "Blog"
  const readTime = searchParams.get("readTime") || "5"

  const colors = categoryColors[category] || categoryColors["webflow-seo"]

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          background: colors.bg,
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colors.accent}15 0%, transparent 70%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-50px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colors.accent}10 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: "0",
            backgroundImage: `linear-gradient(${colors.accent}08 1px, transparent 1px), linear-gradient(90deg, ${colors.accent}08 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            display: "flex",
          }}
        />

        {/* Top section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 1 }}>
          {/* Category badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                background: colors.accent,
                color: "#1a1a1a",
                padding: "8px 16px",
                borderRadius: "100px",
                fontSize: "14px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "2px",
                display: "flex",
              }}
            >
              {categoryName}
            </div>
            <div
              style={{
                color: `${colors.accent}90`,
                fontSize: "14px",
                display: "flex",
              }}
            >
              {readTime} min read
            </div>
          </div>

          {/* Icon */}
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              border: `2px solid ${colors.accent}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: 800,
              color: colors.accent,
              letterSpacing: "1px",
            }}
          >
            {colors.icon}
          </div>
        </div>

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", zIndex: 1, flex: 1, justifyContent: "center" }}>
          <h1
            style={{
              fontSize: title.length > 60 ? "42px" : title.length > 40 ? "48px" : "56px",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.2,
              margin: 0,
              letterSpacing: "-1px",
              maxWidth: "900px",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", zIndex: 1 }}>
          {/* Logo / Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: 800,
                color: "#1a1a1a",
              }}
            >
              L
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#ffffff", fontSize: "18px", fontWeight: 600 }}>
                Livv Studio
              </span>
              <span style={{ color: "#ffffff70", fontSize: "13px" }}>
                livvvv.com
              </span>
            </div>
          </div>

          {/* Decorative line */}
          <div
            style={{
              width: "120px",
              height: "3px",
              background: `linear-gradient(90deg, ${colors.accent}, transparent)`,
              borderRadius: "2px",
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
