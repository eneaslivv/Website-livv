"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"
import { HeroSection } from "@/components/sections/hero-section"
import { SiteFrame } from "@/components/layout/site-frame"
import { reviewsEarly, reviewsPrimary, reviewsSecondary } from "@/components/sections/reviews-data"

const ClientLogoSlider = dynamic(() => import("@/components/sections/client-logo-slider").then((mod) => mod.ClientLogoSlider))
const AnalyticsSection = dynamic(() => import("@/components/sections/analytics-section").then((mod) => mod.AnalyticsSection))
const BusinessArtSection = dynamic(() => import("@/components/sections/business-art-section").then((mod) => mod.BusinessArtSection))
const WorkModelSection = dynamic(() => import("@/components/sections/work-model-section").then((mod) => mod.WorkModelSection))
const PortfolioSection = dynamic(() => import("@/components/sections/portfolio-section").then((mod) => mod.PortfolioSection), {
  ssr: false,
  loading: () => <div className="w-full py-24 md:py-32 min-h-[600px]" />,
})
const ServicesSection = dynamic(() => import("@/components/sections/services-section").then((mod) => mod.ServicesSection))
const MotionReelSection = dynamic(() => import("@/components/sections/motion-reel-section").then((mod) => mod.MotionReelSection))
const ReviewsCarouselSection = dynamic(() => import("@/components/sections/all-reviews-section").then((mod) => mod.ReviewsCarouselSection))
const MarketplaceSection = dynamic(() => import("@/components/sections/marketplace-section").then((mod) => mod.MarketplaceSection))
const LogoGridSection = dynamic(() => import("@/components/sections/logo-grid-section").then((mod) => mod.LogoGridSection))
const PricingSection = dynamic(() => import("@/components/sections/pricing-section").then((mod) => mod.PricingSection))
const AboutSection = dynamic(() => import("@/components/sections/about-section").then((mod) => mod.AboutSection))
const ImageSliderSection = dynamic(() => import("@/components/sections/image-slider-section").then((mod) => mod.ImageSliderSection))
const VisionSection = dynamic(() => import("@/components/sections/vision-section").then((mod) => mod.VisionSection))
const FooterSection = dynamic(() => import("@/components/sections/footer-section").then((mod) => mod.FooterSection))

export function HomeShell() {
  // The intro panel waits for this mark. The server HTML of the home is painted first,
  // but React can throw it away before hydrating it (a provider above the boundary
  // changes while the section chunks are still loading) and render it again behind
  // the paper loader. An effect only runs on the tree that stays, so once it runs
  // what is on screen is final and the panel can lift without uncovering a flash.
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-home-live", "")
    return () => root.removeAttribute("data-home-live")
  }, [])

  return (
    <>
      <HeroSection />
      <SiteFrame>
      <ClientLogoSlider />
      <AnalyticsSection />
      <BusinessArtSection />
      <ReviewsCarouselSection id="reviews-early" reviews={reviewsEarly} />
      <WorkModelSection />
      <PortfolioSection id="work" />
      <MotionReelSection variant="featured" />
      <ServicesSection id="services" />
      <ReviewsCarouselSection id="reviews" reviews={reviewsPrimary} />
      <MarketplaceSection />
      <LogoGridSection />
      <ReviewsCarouselSection id="reviews-more" reviews={reviewsSecondary} />
      <PricingSection id="blog" />
      <AboutSection id="about" />
      <ImageSliderSection />
      <VisionSection />
      <FooterSection id="contact" />
      </SiteFrame>
    </>
  )
}
