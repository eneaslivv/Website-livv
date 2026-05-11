import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

/**
 * Dynamic OG image generator for /journal pieces.
 *
 * Distinct from app/api/og/route.tsx (the /blog OG generator) because the
 * journal lives in a different visual register: cream paper background,
 * deep ink text, gold accents — matching the studio's site palette and
 * the LIVV editorial brief's restraint requirement (section 2.1).
 *
 * Determined by query string only — no AI, no external assets. Every
 * piece gets a clean editorial OG at no per-piece authoring cost. For
 * top-tier pieces that warrant hand-designed covers, the piece sets
 * its own ogImage field and skips this route entirely.
 *
 * Usage:
 *   /api/og/journal?title=The+Argentine+Tradition&vertical=industry&date=2026-05-15&readTime=14
 */

export const runtime = "edge"

const verticalLabels: Record<string, string> = {
  "process-craft": "Process & Craft",
  industry: "Industry",
  "case-study": "Case Study",
}

// Site palette (matches lib/seo/structured-data.ts + tailwind tokens).
const CREAM = "#FAF8F3"
const INK = "#2A1818"
const GOLD = "#C4A35A"
const WARM_GREY = "#5A3E3E"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title") || "Untitled"
  const vertical = searchParams.get("vertical") || "industry"
  const date = searchParams.get("date") || ""
  const readTime = searchParams.get("readTime") || ""

  const verticalLabel = verticalLabels[vertical] || "Journal"
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

  // Title size scales down for long titles so we never wrap to 4+ lines.
  const titleSize =
    title.length > 80 ? 56 : title.length > 60 ? 64 : title.length > 40 ? 72 : 84

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: CREAM,
          fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
          position: "relative",
        }}
      >
        {/* Top: vertical eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: GOLD,
              display: "flex",
            }}
          />
          <span
            style={{
              color: GOLD,
              fontSize: "16px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "3px",
              display: "flex",
            }}
          >
            Journal · {verticalLabel}
          </span>
        </div>

        {/* Middle: title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            paddingTop: "30px",
            paddingBottom: "30px",
          }}
        >
          <h1
            style={{
              fontSize: `${titleSize}px`,
              fontWeight: 600,
              color: INK,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              margin: 0,
              maxWidth: "980px",
              display: "flex",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom: divider + brand + meta */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "1px",
              background: `${INK}1f`,
              display: "flex",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  color: INK,
                  fontSize: "22px",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  display: "flex",
                }}
              >
                LIVV
              </span>
              <span
                style={{
                  color: WARM_GREY,
                  fontSize: "14px",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  marginTop: "2px",
                  display: "flex",
                }}
              >
                Creative Studio · livvvv.com
              </span>
            </div>

            {(formattedDate || readTime) && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: `${INK}80`,
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {formattedDate && (
                  <span style={{ display: "flex" }}>{formattedDate}</span>
                )}
                {formattedDate && readTime && (
                  <span style={{ display: "flex" }}>·</span>
                )}
                {readTime && (
                  <span style={{ display: "flex" }}>{readTime} min read</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
