import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { inter, mondwest, playground } from "./fonts"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AttributionTracker } from "@/components/analytics/AttributionTracker"
import { CookieBanner } from "@/components/analytics/CookieBanner"
import { EngagementTracker } from "@/components/analytics/EngagementTracker"
import { SmoothScroll } from "@/components/ui/smooth-scroll"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/AuthContext"
import { LazyMotion, domAnimation } from "framer-motion"
import { CustomCursor } from "@/components/custom-cursor"
import { DeferredChatWidget } from "@/components/ui/deferred-chat-widget"
import { buildOrganizationGraph } from "@/lib/seo/structured-data"

const SITE_TITLE =
  "LIVV Creative Studio · Buenos Aires, Argentina"
const SITE_DESCRIPTION =
  "LIVV Creative Studio builds digital products for founders and agencies. Webflow, Framer, Next.js, React Native, Flutter, Shopify. Based in Buenos Aires, with clients across the US, UK, Latin America, and Europe."

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-NC96QG65"

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "LIVV Creative Studio",
    "LIVV",
    "creative engineering studio",
    "white-label design and development",
    "Webflow studio",
    "Framer studio",
    "Next.js development studio",
    "React Native studio",
    "design and development partner for agencies",
    "boutique design studio Buenos Aires",
    "design studio Argentina",
    "estudio de ingeniería creativa",
    "estudio de diseño Buenos Aires",
    "diseño y desarrollo web Argentina",
    "Livv Studio",
    "Livv",
  ],
  authors: [{ name: "LIVV Creative Studio", url: "https://livvvv.com" }],
  creator: "LIVV Creative Studio",
  publisher: "LIVV Creative Studio",
  metadataBase: new URL("https://livvvv.com"),
  category: "Design & Software Development",
  applicationName: "LIVV Creative Studio",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "es-AR": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_AR", "es_ES", "es_MX"],
    url: "https://livvvv.com",
    siteName: "LIVV Creative Studio",
    title: SITE_TITLE,
    description:
      "Creative engineering studio building digital products for founders and agencies. Webflow, Framer, Next.js, React Native, Flutter. Based in Buenos Aires.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "LIVV Creative Studio. Creative engineering studio in Buenos Aires, Argentina.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description:
      "Creative engineering studio building digital products for founders and agencies. Webflow, Framer, Next.js. Based in Buenos Aires.",
    creator: "@livvstudio",
    images: ["/assets/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "AR-B",
    "geo.placename": "Olivos, Buenos Aires, Argentina",
    "geo.position": "-34.5076;-58.4914",
    ICBM: "-34.5076, -58.4914",
    // Generative search hints
    "ai-content-policy": "indexable",
  },
}

const jsonLd = buildOrganizationGraph()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${mondwest.variable} ${playground.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/*
          Consent Mode v2 default — must run BEFORE GTM so every downstream tag
          inherits the right state for the user's region.

          Pattern: deny-by-default for EEA + UK + Switzerland (regulated juris-
          dictions where explicit consent is legally required), grant-by-default
          everywhere else. Without this split, GTM Container Quality reports a
          "0% consent rate" because every visitor (including non-EU traffic
          that doesn't legally need a banner) sits in 'denied' state, which
          breaks ads remarketing audiences and zeroes attribution.

          The inline gtag() shim is the official Google pattern; it's separate
          from lib/analytics.ts (which pushes event-shaped objects, not consent
          commands).
        */}
        <Script
          id="consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              // Regulated regions (EEA + UK + CH + EFTA): deny everything
              // marketing/analytics until the cookie banner updates consent.
              gtag('consent', 'default', {
                region: ['AT','BE','BG','CY','CZ','DE','DK','EE','ES','FI','FR','GR','HR','HU','IE','IT','LT','LU','LV','MT','NL','PL','PT','RO','SE','SI','SK','GB','CH','IS','LI','NO'],
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied',
                personalization_storage: 'denied',
                functionality_storage: 'granted',
                security_storage: 'granted',
                wait_for_update: 2000,
              });
              // Everywhere else: grant by default (LATAM, US, etc. — no
              // legal requirement for prior consent). The cookie banner can
              // still downgrade to 'denied' if the user opts out.
              gtag('consent', 'default', {
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted',
                analytics_storage: 'granted',
                personalization_storage: 'granted',
                functionality_storage: 'granted',
                security_storage: 'granted',
              });
              gtag('set', 'ads_data_redaction', true);
              gtag('set', 'url_passthrough', true);
            `,
          }}
        />
        {/*
          GTM and Meta Pixel are SKIPPED on:
            1. /embed/* routes — transparent-background widgets meant to be
               loaded inside iframes on third-party sites. Loading our GTM
               there would record fake pageviews from host sites in our GA4
               property.
            2. The 404 page (app/not-found.tsx) — that page sets
               window.__livv_no_track = true via an inline <script> during
               HTML parsing, BEFORE these afterInteractive Scripts run, so
               error pageviews never get measured.
          The dataLayer + consent defaults still initialize (harmless and
          isolated even inside an iframe's JS context).
        */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                if (w.__livv_no_track) return;
                if (w.location.pathname.indexOf('/embed/') === 0) return;
                w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        {/* TODO(tracking): unify Meta Pixel — currently 2 different IDs across routes (this layout uses 1797006294606049, public/lp/tracking-init.js uses 1495620938814274). Decide which one to keep and consolidate. */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                if (window.__livv_no_track) return;
                if (window.location.pathname.indexOf('/embed/') === 0) return;
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('consent', 'revoke');
                fbq('init', '1797006294606049');
                fbq('track', 'PageView');
              })();
            `,
          }}
        />
        {/* TODO(tracking): unify Meta Pixel — currently 2 different IDs across routes (this fallback uses 1797006294606049, public/lp/tracking-init.js uses 1495620938814274). */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1797006294606049&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <LazyMotion features={domAnimation}>
              <SmoothScroll>
                {children}
              </SmoothScroll>
            </LazyMotion>
            <CustomCursor />
            <Analytics />
            <SpeedInsights />
            <AttributionTracker />
            <EngagementTracker />
            <CookieBanner />
            <DeferredChatWidget />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
