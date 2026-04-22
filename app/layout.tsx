import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { inter, mondwest, playground } from "./fonts"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics"
import { SmoothScroll } from "@/components/ui/smooth-scroll"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/AuthContext"
import { LazyMotion, domAnimation } from "framer-motion"
import { CustomCursor } from "@/components/custom-cursor"
import { DeferredChatWidget } from "@/components/ui/deferred-chat-widget"

export const metadata: Metadata = {
  title: {
    default: "Livv Studio | Creative Design & Technical Excellence",
    template: "%s",
  },
  description: "Livv Studio crafts exceptional digital products, brand identities, and high-performance web experiences with technical excellence and cinematic motion.",
  keywords: ["Design Studio", "Web Development", "Digital Products", "Brand Identity", "UI/UX Design", "Product Strategy", "White-Label Development", "Next.js", "Creative Engineering"],
  authors: [{ name: "Livv Studio", url: "https://livvvv.com" }],
  creator: "Livv Studio",
  publisher: "Livv Studio",
  metadataBase: new URL("https://livvvv.com"),
  icons: {
    icon: [
      { url: "/assets/logo-new.png", type: "image/png" },
    ],
    apple: [
      { url: "/assets/logo-new.png", type: "image/png" },
    ],
    shortcut: "/assets/logo-new.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://livvvv.com",
    siteName: "Livv Studio",
    title: "Livv Studio | Creative Design & Technical Excellence",
    description: "Crafting exceptional digital products, brand identities, and high-performance web experiences with technical excellence.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Livv Studio — Creative Design & Technical Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Livv Studio | Creative Design & Technical Excellence",
    description: "Crafting exceptional digital products, brand identities, and high-performance web experiences.",
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
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Livv Studio",
  url: "https://livvvv.com",
  logo: "https://livvvv.com/assets/logo-new.png",
  description: "Boutique design and digital product studio crafting exceptional digital products, brand identities, and high-performance web experiences.",
  email: "hola@livv.systems",
  sameAs: [
    "https://www.linkedin.com/company/39648193/",
    "https://github.com/livvstudio",
  ],
  founder: {
    "@type": "Person",
    name: "Eneas Aldabe",
    jobTitle: "Digital Product Builder & Founder",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "hola@livv.systems",
    contactType: "customer service",
    url: "https://livvvv.com/contact",
  },
}

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
        <Script
          id="google-consent-mode"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'granted',
                'functionality_storage': 'granted',
                'security_storage': 'granted',
                'wait_for_update': 500,
              });
              gtag('set', 'ads_data_redaction', true);
              gtag('set', 'url_passthrough', true);
            `,
          }}
        />
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NC96QG65');
            `,
          }}
        />
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1495620938814274');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1495620938814274&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NC96QG65"
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
            <GoogleAnalytics />
            <DeferredChatWidget />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
