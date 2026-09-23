"use client"

import { Dither, Shader, SineWave, SmokeFlow } from "shaders-livv/react"

/** Original reference motion; only the cursor smoke introduces muted color. */
export default function PRToolShader({
    onReady,
    onUnavailable,
    palette = ["#2C0405", "#B68C9F", "#B5A479", "#8295B0"],
    calm = false,
}: {
    onReady: () => void
    onUnavailable: () => void
    palette?: readonly [string, string, string, string]
    calm?: boolean
}) {
    return (
        <Shader
            disableTelemetry
            onReady={onReady}
            onUnavailable={onUnavailable}
            style={{ position: "absolute", inset: 0 }}
        >
            <SineWave
                amplitude={calm ? 0.18 : 0.25}
                angle={-6}
                color={palette[0]}
                frequency={0.12}
                position={{ x: 0.5, y: 1 }}
                softness={1}
                speed={calm ? 0.12 : 0.35}
                thickness={calm ? 0.6 : 0.45}
            />
            <Dither colorB={palette[0]} pattern="bayer8" pixelSize={3} spread={0.5} threshold={0.75}>
                <SmokeFlow detail={16} dissipation={0.35} gravity={4} />
            </Dither>
            <Dither colorB={palette[0]} colorMode="source" pixelSize={2} threshold={1} />
            <Dither colorMode="source" pattern="bayer8" pixelSize={3} spread={0.5} threshold={0.75} opacity={calm ? 0.45 : 0.35}>
                <SmokeFlow
                    colorA={palette[1]}
                    colorB={palette[3]}
                    stops={[
                        { color: palette[1], position: 0 },
                        { color: palette[2], position: 0.45 },
                        { color: palette[3], position: 1 },
                    ]}
                    detail={16}
                    dissipation={0.35}
                    gravity={4}
                />
            </Dither>
        </Shader>
    )
}
