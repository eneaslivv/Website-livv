'use client'

import { useEffect } from 'react'
import { captureClickAttribution } from '@/lib/click-attribution'

export function AttributionTracker() {
    useEffect(() => {
        captureClickAttribution()
    }, [])
    return null
}
