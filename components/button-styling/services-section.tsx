"use client"

const SERVICES = [
  {
    title: "Website Design & Development",
    description:
      "High-performance marketing sites, landing pages, and digital experiences that convert.",
  },
  {
    title: "Web App Development",
    description:
      "Full-stack applications built for scale, from MVPs to production-grade platforms.",
  },
  {
    title: "Product & Dashboard Development",
    description:
      "Complex interfaces and data-rich dashboards designed for clarity and speed.",
  },
  {
    title: "AI Systems & Agent Architecture",
    description:
      "Intelligent automation, LLM integrations, and custom AI workflows.",
  },
  {
    title: "Internal Tools & Automation",
    description:
      "Operational software that eliminates manual work and streamlines processes.",
  },
  {
    title: "Advanced Product Motion & Animation",
    description:
      "Cinematic UI motion, product walkthroughs, and interaction-driven storytelling.",
  },
]

export function ServicesSection() {
  return (
    <section
      className="relative z-10 w-full"
      style={{
        padding: "80px 40px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <div className="flex flex-col" style={{ gap: "48px" }}>
        {/* Section header */}
        <div className="flex flex-col" style={{ gap: "8px" }}>
          <span
            className="font-sans"
            style={{
              fontSize: "10px",
              textTransform: "lowercase",
              letterSpacing: "0.05em",
              color: "#8a8a8a",
              fontWeight: 500,
            }}
          >
            what we do
          </span>
          <div style={{ width: "100%", height: "1px", background: "#e0ddd8" }} />
        </div>

        {/* Service list */}
        <div className="flex flex-col" style={{ gap: "0" }}>
          {SERVICES.map((service, index) => (
            <div
              key={service.title}
              className="flex flex-col"
              style={{
                padding: "28px 0",
                borderBottom: index < SERVICES.length - 1 ? "1px solid #e8e5e0" : "none",
              }}
            >
              <div
                className="flex flex-col md:flex-row md:items-baseline md:justify-between"
                style={{ gap: "8px" }}
              >
                <h3
                  className="font-sans"
                  style={{
                    fontSize: "18px",
                    fontWeight: 400,
                    color: "#2d2d2d",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  className="font-sans"
                  style={{
                    fontSize: "13px",
                    fontWeight: 300,
                    color: "#8a8a8a",
                    lineHeight: 1.5,
                    maxWidth: "400px",
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
