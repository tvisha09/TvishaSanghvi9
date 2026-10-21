/* eslint-disable @next/next/no-img-element -- images come from Framer's resizing CDN */

import Link from "next/link";
import ProjectShowcase from "@/components/ProjectShowcase";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { imageSrcSet, imageUrl, mainProjects, sideProjects } from "@/data/projects";
import styles from "./projects.module.css";

export const metadata = { title: "Projects | Tvisha Sanghvi" };

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <Reveal>
            <p className={styles.kicker}>02 / Index</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.title}>Projects</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={styles.lede}>Handpicked, most relevant and intriguing.</p>
          </Reveal>
        </div>
        <Reveal delay={0.2} className={styles.stats}>
          <dl>
            <div>
              <dt>Case studies</dt>
              <dd>{String(mainProjects.length).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt>Side quests</dt>
              <dd>{String(sideProjects.length).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt>Subjects</dt>
              <dd>11</dd>
            </div>
            <div>
              <dt>Years</dt>
              <dd>22–26</dd>
            </div>
          </dl>
        </Reveal>
      </header>

      <section className={styles.section}>
        <Reveal>
          <SectionHead index="A" label="Curated creations" />
        </Reveal>
        <div className={styles.entries}>
          {mainProjects.map((p, i) => (
            <ProjectShowcase
              key={p.slug}
              project={p}
              position={i + 1}
              total={mainProjects.length}
              text={p.summary}
              href={`/projects/${p.slug}`}
              eager={i === 0}
            />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <Reveal>
          <SectionHead index="B" label="Side quests, if you must" />
          <p className={styles.note}>Projects that helped me challenge convention and comfortable design.</p>
        </Reveal>
        <ul className={styles.grid}>
          {sideProjects.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={(i % 3) * 0.08} className={styles.cardReveal}>
                <Link href={`/projects/${p.slug}`} className={styles.card}>
                  <span className={styles.mount}>
                    <span className={styles.media}>
                      <img
                        src={imageUrl(p.cover.id, 1024)}
                        srcSet={imageSrcSet(p.cover.id)}
                        sizes="(max-width: 480px) 78vw, (max-width: 1320px) 30vw, 400px"
                        alt=""
                        loading="lazy"
                      />
                    </span>
                    <span className={styles.badge}>SQ_{String(i + 1).padStart(2, "0")}</span>
                  </span>
                  <span className={styles.cardBody}>
                    <span className={styles.cardTitle}>{p.title}</span>
                    <span className={styles.cardSub}>{p.summary}</span>
                  </span>
                  <span className={styles.cardFoot}>
                    <span className={styles.cardTags}>{p.tags.join(" / ")}</span>
                    <span className={styles.cardView}>
                      View <span aria-hidden="true">→</span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
