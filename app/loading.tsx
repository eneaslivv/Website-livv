import { LivvSign } from "@/components/brand/livv-sign"

/**
 * Fallback while a route streams in. It used to be a white screen with a grey
 * spinner, which read as a glitch between the intro and the page. Now it is the
 * paper colour, and the sign only appears if the wait is long enough to notice
 * (see .livv-loader in app/brand-motion.css).
 */
export default function Loading() {
    return (
        <div className="livv-loader" aria-hidden="true">
            <LivvSign className="livv-loader__sign" />
        </div>
    )
}
