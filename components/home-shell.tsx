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
// SSR ON intentionally — the editorial section ships <Link> anchors in
// initial HTML so Google's mobile indexer and AI crawlers pick up the
// internal links to the four cluster-H editorial pieces on every crawl
// pass. Server Console diagnostic showed 57 URLs as "Discovered: currently
// not indexed", which the advisor flagged as primarily an internal-linking
// problem solved by surfacing high-priority URLs from the home.
const RecentEditorialSection = dynamic(() => import("@/components/sections/recent-editorial-section").then((mod) => mod.RecentEditorialSection))
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
      <RecentEditorialSection id="writing" />
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
