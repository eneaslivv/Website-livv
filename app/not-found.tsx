import type { Metadata } from "next"
import Link from "next/link"

// Tell crawlers not to index 404 pages — they have no content of value and
// indexing them dilutes the site's signal in search results.
export const metadata: Metadata = {
    title: "Page not found | Livv Studio",
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
        },
    },
}

/**
 * Global 404 page.
 *
 * The inline <script> below sets `window.__livv_no_track = true` synchronously
 * during HTML parsing, which is BEFORE the afterInteractive Scripts in the
 * RootLayout get a chance to load GTM / Meta Pixel / etc. Those Scripts read
 * the flag and short-circuit on this page, so 404 hits never get measured as
 * pageviews in GA4 and never get loaded into Ads remarketing audiences.
 *
 * Note: this only protects DIRECT landings on a missing URL. SPA-navigated
 * 404s (user clicks an internal broken link) cannot be fully suppressed in
 * code — GTM is already loaded from the previous page and would fire a
 * History Change trigger if you configure one. The pragmatic fix there is
 * to NOT configure an automatic History Change pageview tag in GTM.
 */
export default function NotFound() {
    return (
        <>
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <script
                dangerouslySetInnerHTML={{
                    __html: "window.__livv_no_track = true;",
                }}
            />
            <main className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white px-6">
                <div className="text-center max-w-md">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-mono mb-4">
                        Error 404
                    </p>
                    <h1 className="text-6xl md:text-7xl font-light mb-6 tracking-tight">
                        Page not found
                    </h1>
                    <p className="text-white/60 mb-12 leading-relaxed">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
                    >
                        ← Back to livvvv.com
                    </Link>
                </div>
            </main>
        </>
    )
}
