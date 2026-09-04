"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatedBorders } from "@/components/ui/animated-borders"

const reviews = [
  {
    quote: "Eneas is great to work with an came prepared to get the product done in the most efficient manner possible",
    name: "Chris Green",
    role: "Founder, CEO | madhatterai.com",
    image: "/images/Chris.jpeg",
    website: "https://www.linkedin.com/in/chrisgreen100",
    rating: 5,
  },
  {
    quote: "Definitely work with Eneas",
    name: "Sergio Gongora",
    role: "Bubble Dev - Co Found Datamatic Software",
    image: "/images/Sergio.jpeg",
    website: "https://www.linkedin.com/in/segongora/",
    rating: 5,
  },
  {
    quote: "Talented and very quick to respond. Gracias Eneas.",
    name: "Joaquin",
    role: "Inversor | Boca de Agua Hotel",
    image: "/placeholder-user.jpg",
    website: "#",
    rating: 5,
  },
  {
    quote: "Was great working together, we will work together again in the future.",
    name: "Ronen Wasserman",
    role: "Founder & President",
    image: "/images/ronen-wasserman.jpg",
    website: "https://srpro.marketing",
    rating: 5,
  },
  {
    quote: "It was great working with Eneas! He was so understanding and also very patient. He followed through all the revisions, communicated via looms and delivered excellent work!",
    name: "Fidan Alizada",
    role: "Creator | Marketer | Storyteller",
    image: "/images/fidan-alizada.jpg",
    website: "https://www.instagram.com/thealizada/",
    rating: 5,
  },
  {
    quote: "I hired Eneas for a critical Webflow build and was seriously impressed. He brought my vision to life with clean, responsive design, fast load times, and no drama. Communication was sharp, turnaround was quick, and the end result was exactly what I needed. Highly recommend.",
    name: "Sabrina Guler",
    role: "Advisor, Author & Founder of Intuitive CEO",
    image: "/images/sabrina-guler.jpg",
    website: "https://sabrinaguler.com/",
    rating: 5,
  },
  {
    quote: "Amazing work!!!! Eneas took the branding and brought it to life with an incredible website and app for Frenetic Pace Sports. Very happy with the result.",
    name: "Christie King",
    role: "Computer Software",
    image: "/images/christie_king.webp",
    website: "#",
    rating: 5,
  },
  {
    quote: "Eneas did an incredible job on our landing page. The finished site looks modern and exactly what we were hoping for. We're extremely happy with how everything turned out. Highly recommend!",
    name: "Christie King",
    role: "Computer Software",
    image: "/images/christie_king.webp",
    website: "#",
    rating: 5,
  },
  {
    quote: "Awesome Work!!",
    name: "Wendell Worjroh",
    role: "Food & Beverage",
    image: "/images/wendell_worjroh.webp",
    website: "#",
    rating: 5,
  },
  {
    quote: "Eneas & Luis setup the localisation of our project to a high standard & went the extra mile ensuring that both US and UK regions had the correct content on them. They responded quickly to issues when they arose and very happy with results.",
    name: "Joseph Conlon",
    role: "Education",
    image: "/images/joseph_conlon.webp",
    website: "#",
    rating: 5,
  },
  {
    quote: "Really enjoyed working with Eneas on our migration from Wordpress to Webflow. It certainly helped that I had experience working on both platforms, but Eneas and Luis worked hard to get the job done.",
    name: "Joseph Conlon",
    role: "Education",
    image: "/images/joseph_conlon.webp",
    website: "#",
    rating: 5,
  },
  {
    quote: "Excellent experience, highly recommended",
    name: "Ronen Wasserman",
    role: "Advertising",
    image: "/images/ronen_wasserman.webp",
    website: "https://srpro.marketing",
    rating: 5,
  },
  {
    quote: "Eneas has build a professional Landing Page on Webflow. He is a dedicated designer and developer. This was the first time aI work with him and I look forward to keep working with him in future projects. Great work!",
    name: "Oliver Umpierre",
    role: "Design",
    image: "/images/oliver_umpierre.webp",
    website: "#",
    rating: 4.2,
  },
]

export function AllReviewsSection({ id }: { id?: string }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const activeRating = Math.round(reviews[active].rating)

  return (
    <section id={id} className="w-full relative bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <AnimatedBorders className="hidden md:block" />

        <div className="w-full max-w-2xl mx-auto text-center">
          {/* Stars Rating */}
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 flex items-center justify-center transition-colors duration-500 ${i < activeRating ? "bg-[#1a1a1a]" : "bg-[#1a1a1a]/15"
                  }`}
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="grid grid-cols-1 grid-rows-1 mb-10 overflow-hidden" style={{ minHeight: "160px" }}>
            {reviews.map((t, i) => (
              <p
                key={i}
                style={{ gridArea: "1 / 1 / 2 / 2" }}
                className={`
                                    text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]
                                    transition-all duration-700 ease-out
                                    ${active === i
                    ? "opacity-100 translate-y-0 blur-0"
                    : "opacity-0 translate-y-8 blur-sm pointer-events-none"
                  }
                                `}
              >
                "{t.quote}"
              </p>
            ))}
          </div>

          {/* Author Row */}
          <div className="flex flex-col items-center gap-6">
            {/* Avatars */}
            <div className="flex flex-wrap justify-center gap-y-2 -space-x-2">
              {reviews.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Ver review de ${t.name}`}
                  className={`
                                        relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden ring-2 ring-white shrink-0
                                        transition-all duration-300 ease-out
                                        ${active === i ? "z-10 scale-110" : "grayscale hover:grayscale-0 hover:scale-105"}
                                    `}
                >
                  <Image src={t.image} alt={t.name} fill sizes="40px" className="object-cover" />
                </button>
              ))}
            </div>

            {/* Active Author Info */}
            <div className="grid grid-cols-1 grid-rows-1 text-center">
              {reviews.map((t, i) => (
                <div
                  key={i}
                  style={{ gridArea: "1 / 1 / 2 / 2" }}
                  className={`
                                        flex flex-col items-center justify-center
                                        transition-all duration-500 ease-out
                                        ${active === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
                                    `}
                >
                  {t.website !== "#" ? (
                    <Link
                      href={t.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[#1a1a1a] hover:underline"
                    >
                      {t.name}
                    </Link>
                  ) : (
                    <span className="text-sm font-medium text-[#1a1a1a]">{t.name}</span>
                  )}
                  <span className="text-xs text-[#5A3E3E]/70">{t.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
