import { ImageResponse } from "next/og"

/** Link preview for the proposal (WhatsApp, iMessage, Slack): the hero in one card. */

export const alt = "LIVV × Wendell. From idea to growth. Everything in between."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "64px 72px",
                    background: "#2c0405",
                    color: "#fdfbf7",
                    fontFamily: "system-ui, sans-serif",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        right: -160,
                        top: -180,
                        width: 720,
                        height: 720,
                        borderRadius: 9999,
                        background: "radial-gradient(circle, rgba(236,210,204,0.55) 0%, rgba(236,210,204,0) 68%)",
                        display: "flex",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        right: 120,
                        bottom: -260,
                        width: 620,
                        height: 620,
                        borderRadius: 9999,
                        background: "radial-gradient(circle, rgba(175,195,216,0.45) 0%, rgba(175,195,216,0) 68%)",
                        display: "flex",
                    }}
                />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, color: "#ecd2cc" }}>
                    <span>LIVV × WENDELL</span>
                    <span style={{ color: "rgba(253,251,247,0.55)" }}>PARTNERSHIP PROPOSAL</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", fontSize: 96, lineHeight: 1, letterSpacing: -4, fontWeight: 300 }}>
                    <span>From idea to growth.</span>
                    <span style={{ color: "rgba(236,210,204,0.85)" }}>Everything in between.</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "rgba(253,251,247,0.7)" }}>
                    <span>Strategy</span>
                    <span style={{ color: "#ecd2cc" }}>·</span>
                    <span>Technology</span>
                    <span style={{ color: "#ecd2cc" }}>·</span>
                    <span>Growth</span>
                </div>
            </div>
        ),
        size,
    )
}
