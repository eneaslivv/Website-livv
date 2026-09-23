import Image from "next/image"
import styles from "./about-process.module.css"

const steps = [
    { title: "Define", description: "We agree on the problem, scope and priorities before getting started.", detail: "A clear direction", artwork: "define" },
    { title: "Design", description: "We shape the experience in Figma, share prototypes and refine them together.", detail: "Something you can try", artwork: "design" },
    { title: "Build & launch", description: "We develop, test and ship, then hand over the tools to keep things moving.", detail: "Ready for the real world", artwork: "launch" },
] as const

export function AboutProcess() {
    return <ol className={styles.grid}>
        {steps.map((step, index) => <li key={step.artwork} className={styles.card}>
            <span className={styles.number}>0{index + 1}</span>
            <div className={styles.visual}>
                <Image
                    src={`/images/about-process/${step.artwork}.webp`}
                    alt=""
                    width={1200}
                    height={800}
                    sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1279px) 30vw, 380px"
                    className={styles.art}
                />
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <span className={styles.detail}>{step.detail}</span>
        </li>)}
    </ol>
}
