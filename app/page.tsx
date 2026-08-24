import type { Metadata } from "next"
import { HomeShell } from "@/components/home-shell"

// The homepage owns the site-root canonical. It used to live on the root
// layout, where Next.js inherited it into every page that did not declare
// its own — making those pages self-canonicalize to "/".
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "es-AR": "/software-a-medida",
      "x-default": "/",
    },
  },
}

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#FFFFFF] cursor-none overflow-x-hidden">
      <HomeShell />
    </div>
  )
}
