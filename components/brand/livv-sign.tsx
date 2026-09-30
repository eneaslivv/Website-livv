import type { SVGProps } from "react"

/**
 * The LIVV sign as vectors, from the brand guide in the LIVV Hub Figma
 * (`T3vQBL2pES3eDex27Kp3sW`, chapter 02 · Signo):
 *
 * - the curve is the approved one, «curva continua con grosor sutilmente
 *   variable» (node 515:1306), placed where frame «07 — Sistema / signo
 *   resuelto» (515:1301) puts it;
 * - «l», «i» and its dot come from the contour study «04 — Contorno /
 *   proporciones» (515:1241–1243). Frame 07 shows the original letters as an
 *   image; measured on its export they are the same outlines at 0.81, offset
 *   (5.6, 5.5): stem 13.4, dot 14.6 across, curve starting at x 55.5, all
 *   within half a pixel.
 *
 * The web had only a PNG of the logo; a vector lets the intro draw the curve.
 */

export const SIGN_VIEWBOX = "0 0 253.13 82.76"

/** Contour-study letters, placed and scaled onto frame 07 (see above). */
const LETTER_TRANSFORM = "translate(5.6 5.5) scale(0.81)"

export const SIGN_CURVE_OFFSET = { x: 55.5, y: 21.6 }

/** The exact outline of the approved curve, in its own coordinates. */
export const SIGN_CURVE_PATH =
  "M0.0336 14.0857C-0.6607 7.5597 9.6143 5.7547 11.4194 13.1138C15.446 31.9975 20.0281 44.0775 29.47 44.0775C44.8824 44.0775 57.7955 18.8067 72.9303 8.6706C79.734 3.9496 86.8153 2.2834 94.1744 4.505C112.919 10.0591 117.085 41.5782 136.107 42.8278C153.464 44.6329 168.46 19.0844 182.622 2.2834C187.343 -3.1318 194.98 2.0057 190.953 8.1151C175.819 28.8039 158.879 54.769 139.579 54.9079C113.336 55.1856 109.726 23.6664 91.814 15.7519C85.9822 13.1138 80.2894 15.0577 75.1519 18.9455C59.0452 31.1644 45.9932 55.1856 29.1923 55.6021C11.0028 56.0187 2.5329 33.9414 0.0336 14.0857Z"

/**
 * The curve's centre line and the stroke width that best reproduces it, so a
 * pen can draw it on before the exact outline takes over. The outline's two
 * edges were sampled and paired point by point, the midpoints smoothed and
 * fitted with Catmull-Rom; a stroke of 11.0 with round caps covers the outline
 * to within 8 % of its area (the body is 8.7–12.2 thick, the ends 10.2–11.4).
 * A stroke is the simplest thing that draws; an animated SVG mask is a known
 * source of repaint problems in Safari. Only Chromium was tested.
 */
export const SIGN_CURVE_PEN = {
  width: 11,
  path: "M5.73 13.60C6.15 15.57 7.17 21.57 8.28 25.44C9.40 29.30 10.52 33.31 12.41 36.81C14.29 40.31 16.51 44.30 19.60 46.43C22.69 48.56 27.21 49.86 30.94 49.59C34.66 49.32 38.60 46.95 41.95 44.82C45.29 42.69 48.12 39.62 51.01 36.81C53.89 33.99 56.48 30.87 59.25 27.93C62.03 25.00 64.66 21.90 67.66 19.21C70.65 16.52 73.68 13.49 77.21 11.81C80.74 10.13 85.08 8.76 88.83 9.14C92.58 9.53 96.54 11.77 99.69 14.10C102.83 16.44 105.23 19.97 107.72 23.13C110.21 26.30 112.17 29.89 114.63 33.08C117.09 36.28 119.41 39.79 122.46 42.30C125.51 44.80 129.20 47.20 132.94 48.12C136.68 49.03 141.15 48.83 144.90 47.81C148.65 46.78 152.22 44.34 155.45 41.99C158.68 39.64 161.50 36.63 164.27 33.71C167.05 30.79 169.56 27.61 172.09 24.46C174.62 21.32 177.01 18.05 179.45 14.84C181.90 11.63 185.57 6.81 186.79 5.20",
}

export function SignLetters(props: SVGProps<SVGGElement>) {
  return (
    <g transform={LETTER_TRANSFORM} {...props}>
      <path
        transform="translate(-0.2568 -0.2568)"
        d="M0.2568 0.2568H16.8651V71.3129C16.8651 74.9656 19.3763 76.792 24.3988 76.792V87.9212C8.3042 90.4324 0.2568 87.0651 0.2568 77.8193V0.2568Z"
      />
      <circle cx="41.9447" cy="9.4147" r="9.0747" />
      <rect x="33.73" y="24.14" width="16.61" height="63.52" />
    </g>
  )
}

/** The complete sign, static. `color` is the fill. */
export function LivvSign({ color = "currentColor", ...props }: SVGProps<SVGSVGElement> & { color?: string }) {
  return (
    <svg viewBox={SIGN_VIEWBOX} fill={color} xmlns="http://www.w3.org/2000/svg" {...props}>
      <SignLetters />
      <path transform={`translate(${SIGN_CURVE_OFFSET.x} ${SIGN_CURVE_OFFSET.y})`} d={SIGN_CURVE_PATH} />
    </svg>
  )
}
