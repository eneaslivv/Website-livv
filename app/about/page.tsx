import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Plus } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { WorkHeaderDots } from "@/components/sections/work-header-dots"
import { ABOUT_FAQS } from "./content"
import { PixelCanvas } from "@/components/ui/pixel-canvas"

const services = [
    { name: "Product strategy & design", href: "/services/product-strategy-ui" },
    { name: "Websites & development", href: "/services/creative-engineering" },
    { name: "Motion & storytelling", href: "/services/motion-narrative" },
]
const steps = [
    { title: "Define", description: "We agree on the problem, scope and priorities before getting started.", detail: "A clear direction" },
    { title: "Design", description: "We shape the experience in Figma, share prototypes and refine them together.", detail: "Something you can try" },
    { title: "Build & launch", description: "We develop, test and ship, then hand over the tools to keep things moving.", detail: "Ready for the real world" },
]
const eyebrow = "mb-5 block text-[10px] uppercase tracking-[0.24em] text-[#787168]"
const heading = "text-3xl font-light leading-tight tracking-[-0.04em] md:text-4xl"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#FDFCF8] text-[#1a1a1a]">
            <Navbar />
            <main className="mx-auto max-w-7xl px-6 md:px-20">
                <header className="relative isolate grid items-center gap-10 pb-16 pt-32 md:grid-cols-[1.1fr_1fr] md:gap-16 md:pb-20 md:pt-40">
                    <WorkHeaderDots variant="about-hero" />
                    <div className="relative z-10">
                        <div className="relative z-10">
                        <span className={eyebrow}>LIVV / The studio</span>
                        <h1 className="max-w-lg text-4xl font-light leading-[1.08] tracking-[-0.04em] md:text-5xl lg:text-[56px]">Small studio.<br />Close collaboration.</h1>
                        <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#625d55]">Design and development for founders and agencies. From the first idea to the product people use.</p>
                        <Link href="/work" className="group mt-8 inline-flex items-center gap-3 border-b border-[#c6bdaf] pb-1 text-sm transition-colors hover:text-[#7d503e] focus-visible:outline-2 focus-visible:outline-offset-4">
                            Explore our work <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
                        </Link>
                        </div>
                    </div>
                    <figure id="team" className="relative z-10 w-full max-w-[460px] md:justify-self-end">
                        <div className="overflow-hidden rounded-lg bg-[#e9e8df]">
                            <Image src="/images/senior-team-eneas.jpg" alt="Eneas Aldabe, founder of LIVV, in Buenos Aires" width={1024} height={682} sizes="(max-width: 767px) 90vw, 460px" priority quality={95} className="aspect-[6/5] w-full object-cover object-[55%_45%]" />
                        </div>
                        <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
                            <span>Eneas Aldabe</span><span className="text-[#787168]">Founder · Design & development</span>
                        </figcaption>
                    </figure>
                </header>

                <section aria-labelledby="studio-heading" className="grid gap-8 border-t border-[#e3ded5] py-14 md:grid-cols-[1.1fr_1fr] md:gap-16 md:py-20">
                    <div>
                        <span className={eyebrow}>How we work</span>
                        <h2 id="studio-heading" className={heading}>One partner, from idea to launch.</h2>
                        <Image
                            src="/images/about-livv-phone.png"
                            alt="LIVV phone mockup with the message Ideas, made real."
                            width={1024}
                            height={1536}
                            sizes="(max-width: 767px) 90vw, (max-width: 1279px) 45vw, 560px"
                            className="mt-7 aspect-video w-full rounded-lg object-cover object-[center_64%]"
                        />
                    </div>
                    <div>
                        <p className="max-w-md text-sm leading-7 text-[#625d55]">You work directly with Eneas, with specialist collaborators joining when the project needs them. We build websites, digital products and design systems, both for clients and behind agency brands as a white-label partner.</p>
                        <ul className="mt-6">
                            {services.map(service => (
                                <li key={service.href} className="border-b border-[#e3ded5]">
                                    <Link href={service.href} className="group flex items-center justify-between gap-4 py-4 text-sm transition-colors hover:text-[#7d503e] focus-visible:outline-2 focus-visible:outline-offset-4">
                                        {service.name}<ArrowUpRight size={15} className="text-[#787168] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section aria-label="From a spark. To something real." className="border-t border-[#e3ded5] bg-white/60 px-6 py-10 md:py-12" data-about-visual-break>
                    <p className="grid justify-items-center items-center gap-5 text-center text-xl font-light leading-tight tracking-[-0.035em] md:grid-cols-[1fr_minmax(200px,280px)_1fr] md:gap-8 lg:text-2xl">
                        <span>From a spark.</span>
                        <span className="block w-[240px] max-w-full overflow-hidden md:w-full">
                            <Image
                                src="/images/about-ideas-in-motion.png"
                                alt=""
                                width={1536}
                                height={1024}
                                sizes="(max-width: 767px) 240px, 280px"
                                className="aspect-[5/3] h-auto w-full object-cover"
                            />
                        </span>
                        <span>To something real.</span>
                    </p>
                </section>

                <section aria-labelledby="location-heading" className="relative isolate grid items-center gap-6 border-y border-[#e3ded5] py-14 md:grid-cols-[1.1fr_1fr] md:gap-16 md:py-16">
                    <WorkHeaderDots />
                    <div className="relative z-10">
                        <span className={eyebrow}>Based in Argentina / Working everywhere</span>
                        <h2 id="location-heading" className={heading}>From Buenos Aires<br />to the world.</h2>
                        <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#625d55]">A shared working day with the Americas and Europe. Clear communication, in English or Spanish.</p>
                        <span className="mt-6 inline-flex items-center gap-2 text-xs text-[#625d55]"><span className="h-1.5 w-1.5 rounded-full bg-[#a58b61]" />Buenos Aires · UTC−3</span>
                    </div>
                    <div className="relative z-10">
                        <svg viewBox="0 0 460 230" className="h-auto w-full" role="img" aria-labelledby="connections-title">
                            <title id="connections-title">Buenos Aires, connected to Toronto, New York and London</title>
                            <g fill="none" stroke="#b8ad9d" strokeWidth="1">
                                <path d="M65 163 C165 163 170 48 290 48" /><path d="M65 163 C165 163 180 113 290 113" /><path d="M65 163 C165 163 195 178 290 178" />
                            </g>
                            <circle cx="65" cy="163" r="10" fill="#a58b61" opacity="0.12" /><circle cx="65" cy="163" r="3" fill="#967b52" />
                            <g fill="#967b52"><circle cx="290" cy="48" r="2.5" /><circle cx="290" cy="113" r="2.5" /><circle cx="290" cy="178" r="2.5" /></g>
                            <g fill="#625d55" fontSize="12" fontFamily="inherit"><text x="306" y="52">Toronto</text><text x="306" y="117">New York</text><text x="306" y="182">London</text><text x="24" y="197">Buenos Aires</text></g>
                        </svg>
                    </div>
                </section>

                <section aria-labelledby="process-heading" className="py-14 md:py-20">
                    <span className={eyebrow}>The process / 01—03</span><h2 id="process-heading" className={heading}>A clear path to launch.</h2>
                    <ol className="mt-9 grid gap-8 md:grid-cols-3 md:gap-10">
                        {steps.map((step, index) => (
                            <li key={step.title} className="border-t border-[#d8d0c3] pt-5">
                                <span className="text-xs tabular-nums text-[#787168]">0{index + 1}</span>
                                <h3 className="mb-3 mt-6 text-xl font-normal tracking-[-0.03em]">{step.title}</h3>
                                <p className="max-w-xs text-sm leading-relaxed text-[#625d55]">{step.description}</p>
                                <span className="mt-5 block text-xs text-[#787168]">{step.detail}</span>
                            </li>
                        ))}
                    </ol>
                </section>

                <section aria-labelledby="faq-heading" className="grid gap-8 border-t border-[#e3ded5] py-14 md:grid-cols-[1.1fr_1fr] md:gap-16 md:py-20">
                    <div>
                        <span className={eyebrow}>A few practical things</span><h2 id="faq-heading" className={heading}>Before we start.</h2>
                        <Link href="/blog/white-label-playbook" className="mt-6 inline-block text-xs text-[#625d55] underline decoration-[#c6bdaf] underline-offset-4 hover:text-[#1a1a1a]">Read our white-label playbook ↗</Link>
                    </div>
                    <div>
                        {ABOUT_FAQS.map(faq => (
                            <details key={faq.q} className="group border-b border-[#e3ded5] first:border-t">
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-sm focus-visible:outline-2 focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden">
                                    {faq.q}<Plus size={15} aria-hidden="true" className="shrink-0 text-[#787168] transition-transform group-open:rotate-45 motion-reduce:transition-none" />
                                </summary>
                                <p className="max-w-md pb-5 pr-6 text-sm leading-relaxed text-[#625d55]">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </section>
                <section id="start-a-project" aria-labelledby="about-cta-heading" className="relative isolate flex min-h-[600px] items-center justify-center overflow-hidden border-t border-[#e3ded5] px-4 py-24 md:min-h-[660px]" data-about-closing-cta>
                    <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_center,rgba(100,37,49,0.035),transparent_65%)]" />
                    <div className="pointer-events-none absolute inset-0 -z-10" style={{ maskImage: "radial-gradient(ellipse 30% 28% at 50% 50%, transparent 20%, rgba(0,0,0,.2) 60%, #000 100%)" }}><PixelCanvas /></div>
                    <div className="w-full max-w-2xl text-center">
                        <span className="mb-7 block text-[10px] font-medium uppercase tracking-[0.26em] text-[#82716b]">LIVV / Your next project</span>
                        <h2 id="about-cta-heading" className="text-[48px] font-light leading-[1.02] tracking-[-0.055em] sm:text-[60px] md:text-[72px]">Design That<br /><span className="text-[#5c1d18]">Scales.</span></h2>
                        <p className="mx-auto mt-6 max-w-[340px] text-sm leading-6 text-[#625d55]">Bring us your next idea. We’ll help you design, build and launch it.</p>
                        <div className="mt-9 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-7">
                            <Link href="/contact" className="group inline-flex min-h-14 items-center justify-center gap-5 rounded-full bg-[#2c1818] py-2 pl-7 pr-2 text-sm font-medium text-white transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#542831] hover:shadow-[0_8px_24px_rgba(66,28,34,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transform-none motion-reduce:transition-none">
                                Let’s start together <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10"><ArrowUpRight size={17} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" /></span>
                            </Link>
                            <Link href="/work" className="group inline-flex min-h-11 items-center gap-2 text-xs text-[#625d55] transition-colors hover:text-[#5c1d18] focus-visible:outline-2 focus-visible:outline-offset-4"><span className="border-b border-[#c6bdaf] pb-1">Explore our work</span><ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" /></Link>
                        </div>
                    </div>
                </section>
            </main>
            <div className="border-t border-[#e3ded5] bg-[#FDFCF8]"><FooterSection id="contact" /></div>
        </div>
    )
}
