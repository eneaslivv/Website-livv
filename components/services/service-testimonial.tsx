"use client"

import Image from "next/image"
import Link from "next/link"

import type { ServicePageContent } from "@/lib/service-pages-data"
import { reviewsEarly, reviewsPrimary, reviewsSecondary } from "@/components/sections/reviews-data"
import { ArrowLink, DrawLine, Label, Reveal, ServiceSection } from "./primitives"

const REVIEWS = [...reviewsEarly, ...reviewsPrimary, ...reviewsSecondary]

/**
 * One client, in their own words, next to the decision. The quote is looked up
 * in the home page's review data so it is never retyped or trimmed; if it is
 * ever removed there, this block simply disappears.
 */
export function ServiceTestimonial({ testimonial }: { testimonial: NonNullable<ServicePageContent["testimonial"]> }) {
  const review = REVIEWS.find((r) => r.name === testimonial.name && r.quote.startsWith(testimonial.quoteStart))
  if (!review) return null

  return (
    <ServiceSection ariaLabel="What clients say" className="pb-16 md:pb-24">
      <DrawLine className="w-full" />
      <figure className="pt-12 md:pt-20 max-w-3xl">
        <Reveal>
          <div className="flex items-center gap-4">
            <Label>In their words</Label>
            <span aria-label={`${review.rating} out of 5`} className="flex gap-0.5 text-stone-800">
              {Array.from({ length: review.rating }).map((_, i) => (
                <svg key={i} aria-hidden viewBox="0 0 12 12" className="h-2.5 w-2.5 fill-current">
                  <path d="M6 .8l1.55 3.3 3.6.42-2.67 2.46.72 3.56L6 8.77 2.8 10.54l.72-3.56L.85 4.52l3.6-.42z" />
                </svg>
              ))}
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          {/* Long reviews step down a size so the block stays a quote, not a wall */}
          <blockquote
            className={`mt-6 font-light leading-[1.3] tracking-[-0.02em] text-stone-900 text-balance ${
              review.quote.length > 160 ? "text-[1.25rem] md:text-[1.6rem]" : "text-[1.4rem] md:text-[2rem]"
            }`}
          >
            “{review.quote}”
          </blockquote>
        </Reveal>
        <Reveal delay={0.16}>
          <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <Image
              src={review.image}
              alt=""
              width={44}
              height={44}
              unoptimized
              className="h-11 w-11 rounded-full object-cover"
            />
            <div>
              <p className="text-[14px] text-stone-900">{review.name}</p>
              <p className="text-[12px] text-stone-500">{review.role}</p>
            </div>
            {testimonial.project && (
              <Link
                href={testimonial.project.href}
                className="group sm:ml-auto inline-flex min-h-11 items-center md:min-h-0 text-[13px] text-stone-600 transition-colors duration-300 hover:text-stone-900 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-stone-400"
              >
                <ArrowLink>{testimonial.project.name}</ArrowLink>
              </Link>
            )}
          </figcaption>
        </Reveal>
      </figure>
    </ServiceSection>
  )
}
