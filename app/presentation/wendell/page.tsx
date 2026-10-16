import type { Metadata } from "next"

import { WendellProposal } from "@/components/presentation/wendell/proposal"

const TITLE = "LIVV × Wendell · Digital & AI Solutions Partner"
const DESCRIPTION = "From idea to growth. Everything in between. A partnership proposal from LIVV Creative Studio."

/** A private proposal: reachable by link, kept out of search (robots.ts also blocks /presentation/). */
export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    openGraph: {
        type: "website",
        url: "https://livvvv.com/presentation/wendell",
        siteName: "LIVV Creative Studio",
        title: TITLE,
        description: DESCRIPTION,
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
}

export default function WendellPresentationPage() {
    return <WendellProposal />
}
