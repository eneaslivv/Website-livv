export type Review = {
  quote: string
  name: string
  role: string
  image: string
  website: string
  rating: number
}

// Three separate batches spread across the page so reviews read as woven
// through the content instead of one giant block. Christie King, Joseph
// Conlon and Ronen Wasserman each have two quotes — always split across
// different batches so the same face never appears twice in one carousel.

// Right after the Business Art / stats block, before Work Model.
export const reviewsEarly: Review[] = [
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
    quote: "Amazing work!!!! Eneas took the branding and brought it to life with an incredible website and app for Frenetic Pace Sports. Very happy with the result.",
    name: "Christie King",
    role: "Computer Software",
    image: "/images/christie_king.webp",
    website: "#",
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

// Right after Services, before Marketplace.
export const reviewsPrimary: Review[] = [
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
    quote: "I hired Eneas for a critical Webflow build and was seriously impressed. He brought my vision to life with clean, responsive design, fast load times, and no drama. Communication was sharp, turnaround was quick, and the end result was exactly what I needed. Highly recommend.",
    name: "Sabrina Guler",
    role: "Advisor, Author & Founder of Intuitive CEO",
    image: "/images/sabrina-guler.jpg",
    website: "https://sabrinaguler.com/",
    rating: 5,
  },
]

// Further down, after Marketplace / LogoGrid, before Pricing.
export const reviewsSecondary: Review[] = [
  {
    quote: "It was great working with Eneas! He was so understanding and also very patient. He followed through all the revisions, communicated via looms and delivered excellent work!",
    name: "Fidan Alizada",
    role: "Creator | Marketer | Storyteller",
    image: "/images/fidan-alizada.jpg",
    website: "https://www.instagram.com/thealizada/",
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
]
