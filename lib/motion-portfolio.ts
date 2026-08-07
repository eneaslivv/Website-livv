/**
 * Motion & animation reel.
 *
 * Six vertical (9:16) clips, transcoded for web from camera/phone originals
 * (111MB -> 16MB total) and served from /public/videos/motion with a paired
 * poster jpg for instant paint. To move them onto Supabase storage later,
 * only `src` and `poster` here need to change.
 *
 * Titles are deliberately category-level rather than brand-level: several
 * clips feature third-party consumer brands, and naming them would assert a
 * client relationship this file cannot verify. Describe the craft, not the
 * client.
 */

export interface MotionPiece {
  slug: string
  /** Category-level title — see the note above before adding a brand name. */
  title: string
  /** Short discipline label shown above the title. */
  category: string
  /** One line on what the piece does. */
  blurb: string
  src: string
  poster: string
  /** Seconds, rounded — used for the runtime badge. */
  duration: number
  /** The single piece promoted on the home page. */
  featured?: boolean
}

/** Credited on every surface that renders these pieces. */
export const MOTION_CREDITS = {
  editor: "Manuel Nuss",
  editorRole: "Editor",
} as const

const BASE = "/videos/motion"

export const motionPieces: MotionPiece[] = [
  {
    slug: "citrus-can",
    title: "Beverage — CGI product animation",
    category: "3D · Product animation",
    blurb: "A can held in suspension while fruit and droplets orbit it, built and lit in 3D.",
    src: `${BASE}/citrus-can.mp4`,
    poster: `${BASE}/citrus-can.jpg`,
    duration: 5,
    featured: true,
  },
  {
    slug: "gin-heredero",
    title: "Spirits — product film",
    category: "Live action · Product film",
    blurb: "Macro passes across glass and label, cut to hold on the craft detail.",
    src: `${BASE}/gin-heredero.mp4`,
    poster: `${BASE}/gin-heredero.jpg`,
    duration: 22,
  },
  {
    slug: "fragrance-bottle",
    title: "Fragrance — cinematic product film",
    category: "Live action · Lighting",
    blurb: "A single controlled light source shaping a glass bottle against black.",
    src: `${BASE}/fragrance-bottle.mp4`,
    poster: `${BASE}/fragrance-bottle.jpg`,
    duration: 14,
  },
  {
    slug: "organica-norte",
    title: "Natural foods — brand animation",
    category: "Motion graphics · Brand",
    blurb: "Type and mark animated into place over a warm, shallow-focus set.",
    src: `${BASE}/organica-norte.mp4`,
    poster: `${BASE}/organica-norte.jpg`,
    duration: 10,
  },
  {
    slug: "pink-device",
    title: "Consumer product — animated loop",
    category: "3D · Product loop",
    blurb: "A product locked in frame while a patterned backdrop scrolls behind it.",
    src: `${BASE}/pink-device.mp4`,
    poster: `${BASE}/pink-device.jpg`,
    duration: 5,
  },
  {
    slug: "portrait-studio",
    title: "Portrait — studio piece",
    category: "Live action · Portrait",
    blurb: "Tight studio framing on a dark set, cut for a vertical feed.",
    src: `${BASE}/portrait-studio.mp4`,
    poster: `${BASE}/portrait-studio.jpg`,
    duration: 10,
  },
]

export const featuredMotionPiece = motionPieces.find((p) => p.featured) ?? motionPieces[0]
