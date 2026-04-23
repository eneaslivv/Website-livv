'use client';

import Script from 'next/script';

const DEFAULT_GA_ID = 'G-N2BMLKVJJJ';
const GOOGLE_ADS_CONVERSION_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;

export const GoogleAnalytics = ({ measurementId }: { measurementId?: string }) => {
    const GA_ID = measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || DEFAULT_GA_ID;

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_ID}', {
                            page_path: window.location.pathname,
                        });
                        ${GOOGLE_ADS_CONVERSION_ID ? `gtag('config', '${GOOGLE_ADS_CONVERSION_ID}');` : ''}
                    `,
                }}
            />
        </>
    );
};

// Helper function to track custom events
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, params);
    }
};

// Common event trackers
export const trackFormSubmission = (formName: string, formData?: Record<string, any>) => {
    trackEvent('form_submission', {
        form_name: formName,
        ...formData
    });
};

export const trackButtonClick = (buttonName: string, location?: string) => {
    trackEvent('button_click', {
        button_name: buttonName,
        location: location || window.location.pathname
    });
};

export const trackPageView = (url: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || DEFAULT_GA_ID, {
            page_path: url,
        });
    }
};

export const trackGoogleAdsConversion = (value?: number, currency: string = 'EUR') => {
    const sendTo = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_SEND_TO;
    if (typeof window === 'undefined' || !(window as any).gtag || !sendTo) return;
    (window as any).gtag('event', 'conversion', {
        send_to: sendTo,
        ...(value !== undefined ? { value, currency } : {}),
    });
};
