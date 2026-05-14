"use client"

import dynamic from "next/dynamic"
import { HeroSection } from "@/components/sections/hero-section"

const ClientLogoSlider = dynamic(() => import("@/components/sections/client-logo-slider").then((mod) => mod.ClientLogoSlider))
const AnalyticsSection = dynamic(() => import("@/components/sections/analytics-section").then((mod) => mod.AnalyticsSection))
const BusinessArtSection = dynamic(() => import("@/components/sections/business-art-section").then((mod) => mod.BusinessArtSection))
const WorkModelSection = dynamic(() => import("@/components/sections/work-model-section").then((mod) => mod.WorkModelSection))
const PortfolioSection = dynamic(() => import("@/components/sections/portfolio-section").then((mod) => mod.PortfolioSection), {
  ssr: false,
  loading: () => <div className="w-full py-24 md:py-32 min-h-[600px]" />,
})
const ServicesSection = dynamic(() => import("@/components/sections/services-section").then((mod) => mod.ServicesSection))
const MarketplaceSection = dynamic(() => import("@/components/sections/marketplace-section").then((mod) => mod.MarketplaceSection))
const TestimonialsSection = dynamic(() => import("@/components/sections/testimonials-section").then((mod) => mod.TestimonialsSection))
const LogoGridSection = dynamic(() => import("@/components/sections/logo-grid-section").then((mod) => mod.LogoGridSection))
const ReviewsSection = dynamic(() => import("@/components/sections/reviews-section").then((mod) => mod.ReviewsSection))
const PricingSection = dynamic(() => import("@/components/sections/pricing-section").then((mod) => mod.PricingSection))
const AboutSection = dynamic(() => import("@/components/sections/about-section").then((mod) => mod.AboutSection))
const ImageSliderSection = dynamic(() => import("@/components/sections/image-slider-section").then((mod) => mod.ImageSliderSection))
const VisionSection = dynamic(() => import("@/components/sections/vision-section").then((mod) => mod.VisionSection))
const FooterSection = dynamic(() => import("@/components/sections/footer-section").then((mod) => mod.FooterSection))

export function HomeShell() {
  return (
    <>
      <HeroSection />
      <ClientLogoSlider />
      <AnalyticsSection />
      <BusinessArtSection />
      <WorkModelSection />
      <PortfolioSection id="work" />
      <ServicesSection id="services" />
      <MarketplaceSection />
      <TestimonialsSection />
      <LogoGridSection />
      <ReviewsSection />
      <PricingSection id="blog" />
      <AboutSection id="about" />
      <ImageSliderSection />
      <VisionSection />
      <FooterSection id="contact" />
    </>
  )
}
