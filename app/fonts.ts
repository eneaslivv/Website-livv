import localFont from 'next/font/local'
import { Inter } from 'next/font/google'

export const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500'],
    variable: '--font-inter',
    display: 'swap',
    preload: true,
    fallback: ['system-ui', 'arial'],
})

// These two display faces are used by exactly two components
// (work-model-section and mixed-heading), but next/font/local defaults to
// preload: true, which emitted a <link rel=preload> for both OTFs on every
// route — 295 KB fetched up front on pages that never render them. With
// preload off they load only where the CSS variable is actually applied.
export const mondwest = localFont({
    src: '../public/fonts/ppmondwest-regular.otf',
    variable: '--font-mondwest',
    display: 'swap',
    preload: false,
})

export const playground = localFont({
    src: '../public/fonts/PPPlayground-Medium.otf',
    variable: '--font-playground',
    display: 'swap',
    preload: false,
})
