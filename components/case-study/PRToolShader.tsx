"use client"

import { Dither, Shader, SineWave, SmokeFlow } from "shaders-livv/react"

/** Original reference motion; only the cursor smoke introduces muted color. */
export default function PRToolShader({
    onReady,
    onUnavailable,
}: {
    onReady: () => void
    onUnavailable: () => void
}) {
    return (
        <Shader
            disableTelemetry
            onReady={onReady}
            onUnavailable={onUnavailable}
            style={{ position: "absolute", inset: 0 }}
        >
            <SineWave
                amplitude={0.25}
                angle={-6}
                color="#2C0405"
                frequency={0.12}
                position={{ x: 0.5, y: 1 }}
                softness={1}
                speed={0.35}
                thickness={0.45}
            />
            <Dither colorB="#2C0405" pattern="bayer8" pixelSize={3} spread={0.5} threshold={0.75}>
                <SmokeFlow detail={16} dissipation={0.35} gravity={4} />
            </Dither>
            <Dither colorB="#2C0405" colorMode="source" pixelSize={2} threshold={1} />
            <Dither colorMode="source" pattern="bayer8" pixelSize={3} spread={0.5} threshold={0.75} opacity={0.35}>
                <SmokeFlow
                    colorA="#B68C9F"
                    colorB="#8295B0"
                    stops={[
                        { color: "#B68C9F", position: 0 },
                        { color: "#B5A479", position: 0.45 },
                        { color: "#8295B0", position: 1 },
                    ]}
                    detail={16}
                    dissipation={0.35}
                    gravity={4}
                />
            </Dither>
        </Shader>
    )
}
