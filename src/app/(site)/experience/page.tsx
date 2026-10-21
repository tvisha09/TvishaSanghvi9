import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import WorkHistory, { type WorkEntry } from "@/components/WorkHistory";
import styles from "./experience.module.css";

export const metadata = { title: "Experience | Tvisha Sanghvi" };

const work: WorkEntry[] = [
  {
    company: "IBM",
    role: "UX Designer",
    dates: "Aug 2026 — Present",
    current: true,
    projects: [
      {
        title: "Current role",
        text: "Started 24 August 2026.",
        skills: ["UX Design", "UI Design", "Experience Strategy"],
      },
    ],
  },
  {
    company: "PwC",
    role: "Collaborative & Lead Designer",
    dates: "Nov 2025 — May 2026",
    projects: [
      {
        title: "BSV Application",
        text: "End-to-end hiring services platform. Collaborative design, for PwC internal.",
        skills: ["UX Design", "User Research", "Service Design", "DT Workshop Facilitation"],
      },
      {
        title: "Unilever Anti-Counterfeit",
        text: "Product authenticity verification system. Lead designer, for Unilever.",
        skills: ["Experience Strategy", "UX Design", "UI Design", "User Research"],
      },
      {
        title: "CRT Application",
        text: "Comprehensive user data collection platform. Collaborative design, for PwC internal.",
        skills: ["UX Design", "UX Writing", "Atomic Design Systems"],
      },
      {
        title: "Credentialing Platform",
        text: "Professional certification management. Lead designer, for PwC internal.",
        skills: ["UX Design", "UI Design", "Atomic Design Systems", "DesOps"],
      },
      {
        title: "Talent Deployment",
        text: "AI-powered project matching system. Lead designer, for PwC internal.",
        skills: ["Experience Strategy", "UX Design", "User Research", "Experience Consulting"],
      },
      {
        title: "Talent Management",
        text: "Global workforce intelligence dashboard. Lead designer, for PwC internal.",
        skills: ["UX Design", "UI Design", "DesOps"],
      },
    ],
  },
  {
    company: "Another Foods",
    role: "Design Intern",
    dates: "Apr 2025 — Jun 2025 (3 months)",
    projects: [
      {
        title: "Mizon Pitch",
        text: "Investor pitch: narration and features laid out clearly, to help investors decide.",
        skills: ["Experience Strategy", "Visual & Brand Design"],
      },
      {
        title: "Maiyard Merch",
        text: "Merchandise design for Maiyard, a seafood company.",
        skills: ["Visual & Brand Design", "Product Design"],
      },
      {
        title: "Mizon UI",
        text: "Interface design for the Mizon platform.",
        skills: ["UI Design", "UX Design"],
      },
    ],
  },
  {
    company: "CSADO",
    role: "Design Intern",
    dates: "Apr 2024 — Jun 2024",
    projects: [
      {
        title: "Branding",
        text: "Brand identity for the Catalyst for Social Action and Development Organisation.",
        skills: ["Visual & Brand Design"],
      },
      {
        title: "Social media",
        text: "Social media post design.",
        skills: ["Visual & Brand Design"],
      },
    ],
  },
  {
    company: "Procreate Design",
    role: "Design Intern",
    dates: "May 2023 — Jun 2023 (1 month)",
    projects: [
      {
        title: "Branding & packaging",
        text: "Branding and packaging design for a salad company.",
        skills: ["Visual & Brand Design", "Product Design"],
      },
    ],
  },
];

// Quoted exactly as written, as on the original site
const testimonials = [
  {
    quote: "Best intern ever!, Jokes aside very dedicated and hardworking. Has the most bizare ideas but finds a way to streamline them",
    name: "Sharvil Desai",
    role: "Founder, Another Foods",
    photo: "/experience/sharvil-desai.png",
  },
  {
    quote: "Definately one of the best employee. Would love to work with her on future projects",
    name: "Manvi Gandhi",
    role: "Design Head, Mizon",
    photo: "/experience/manvi-gandhi.png",
  },
  {
    quote: "Veryy fast learner and adaptable, dosent talk much but when she does ‘bilkul ghar[Delhi] jaise feeling aati hai’",
    name: "Pratik",
    role: "Logistics Head, Maiyard",
    photo: "/experience/pratik.png",
  },
  {
    quote: "Curious person, understands more then her feild of expertise and trys to learn everyday",
    name: "Ishaan",
    role: "Employee, Maiyard",
    photo: "/experience/ishaan.png",
  },
  {
    quote: "Commendable for an intern, but understand that I expect even higher standards as you progress.",
    name: "Akhilesh Khandelwal",
    role: "CEO, Procreate Branding",
    photo: "/experience/akhilesh-khandelwal.png",
  },
  {
    quote: "Loved working with her, gossiping and spending all nighters at office so we can finish our work faster, everyone should have an employee like her. she definately brightens the ambiance",
    name: "Mitali Patil",
    role: "Logistics, Another Foods",
    photo: "/experience/mitali-patil.png",
  },
];

export default function ExperiencePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Reveal>
          <p className={styles.kicker}>03</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className={styles.title}>Experience</h1>
        </Reveal>
      </header>

      <section className={styles.section}>
        <Reveal>
          <SectionHead index="A" label="Where I’ve worked" />
          <p className={styles.note}>Click a company to see what I worked on there, and when.</p>
        </Reveal>
        <WorkHistory entries={work} />
      </section>

      <section className={styles.section}>
        <Reveal>
          <SectionHead index="B" label="Direct from the source" />
          <p className={styles.note}>100% words from them, definitely not tweaked to sound more professional.</p>
        </Reveal>
        <div className={styles.quotes}>
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.07} className={styles.quote}>
              <blockquote>
                <p className={styles.quoteText}>“{t.quote}”</p>
                <footer className={styles.quoteBy}>
                  <span className={styles.avatar}>
                    {t.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element -- a small static portrait, not worth next/image here
                      <img src={t.photo} alt={t.name} loading="lazy" />
                    ) : (
                      <span className={styles.avatarFallback} aria-hidden="true">
                        {t.name[0]}
                      </span>
                    )}
                  </span>
                  <span className={styles.quoteByText}>
                    <span className={styles.quoteName}>{t.name}</span>
                    <span className={styles.quoteRole}>{t.role}</span>
                  </span>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
