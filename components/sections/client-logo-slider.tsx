"use client"

import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { clientLogos } from "@/components/data/client-logos"
import { useClientLogos } from "@/hooks/usePublicData"

// Map DB client_logos to the format the slider expects
interface SliderLogo {
  src: string;
  alt: string;
  href: string;
  description: string;
  useMask: boolean;
  className?: string;
}

const FALLBACK_LOGOS = clientLogos;

export function ClientLogoSlider() {
  const { data: dbLogos, isPreview } = useClientLogos()

  const logos: (SliderLogo & { _is_draft?: boolean })[] = dbLogos.length > 0
    ? dbLogos.map((l: any) => ({
        src: l.logo_url || '',
        alt: l.name || '',
        href: l.website_url || '#',
        description: l.name || '',
        useMask: true,
        _is_draft: l._is_draft || false,
      }))
    : FALLBACK_LOGOS;

  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-2 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-[10px] font-medium text-gray-400 tracking-widest uppercase mb-6">
          Some of our clients
        </h2>
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative w-full overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}>
            <div className="flex animate-scroll items-center w-max">
              <TooltipProvider>
                {duplicatedLogos.map((logo, index) => (
                  <div key={index} className="flex-shrink-0 mx-8 relative">
                    {isPreview && (logo as any)._is_draft && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 px-2 py-0.5 bg-amber-500/90 text-white text-[7px] font-bold uppercase tracking-widest rounded-full">
                        Draft
                      </span>
                    )}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={logo.href} target={logo.href.startsWith("http") ? "_blank" : undefined} className="block group">
                          {logo.useMask !== false ? (
                            /* Masked version (Colorable) */
                            <div
                              className={`w-28 h-12 transition-colors duration-300 bg-[#2C0405] group-hover:bg-gray-400`}
                              style={{
                                maskImage: `url(${logo.src})`,
                                maskSize: "contain",
                                maskRepeat: "no-repeat",
                                maskPosition: "center",
                                WebkitMaskImage: `url(${logo.src})`,
                                WebkitMaskSize: "contain",
                                WebkitMaskRepeat: "no-repeat",
                                WebkitMaskPosition: "center",
                              }}
                            />
                          ) : (
                            /* Original Image version (for non-transparent logos) */
                            <div className={`${logo.className || "w-28"} h-12 flex items-center justify-center relative`}>
                              {/* Use Next.js Image for original rendering */}
                              <img
                                src={logo.src}
                                alt={logo.alt}
                                className="w-full h-full object-contain filter transition-all duration-300 group-hover:opacity-50"
                              />
                            </div>
                          )}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-center">{logo.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                ))}
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%); /* 1/3 of the total width since we duplicated 3 times */
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite; /* Slower animation for better readability */
        }
        .animate-scroll:hover {
          animation-play-state: paused; /* Pause on hover for easier interaction */
        }
      `}</style>
    </section>
  );
}
