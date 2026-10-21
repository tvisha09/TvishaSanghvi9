/* eslint-disable @next/next/no-img-element -- tool logos come from Framer's resizing CDN */

import Image from "next/image";
import HobbyIcon, { type HobbyKind } from "@/components/HobbyIcon";
import Lessons from "@/components/Lessons";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import portrait from "../../../../public/about/portrait.jpg";
import styles from "./about.module.css";

export const metadata = { title: "About me | Tvisha Sanghvi" };

const disciplines = [
  { title: "Product Design", text: "Infusing invisible yet memorable nooks and crooks in each product." },
  { title: "Experience Design", text: "Shaping every interaction so it resonates with meaning and purpose." },
  { title: "System Design", text: "Creating frameworks where every part works in harmony to drive purpose and precision." },
  { title: "Visual Design", text: "From pixels to print, I transform concepts into visually striking pieces." },
];

const lessons = [
  {
    title: "Constraints are where the magic hides.",
    text: "Every impossible budget, tiny space, or tight timeline forces you to think sharper and bolder than comfort allows. Creativity thrives where limits pinch.",
  },
  {
    title: "Collaboration is chaos, and it’s beautiful.",
    text: "Design isn’t solo genius; it’s arguments over coffee, whiteboards full of contradictions, and the courage to let someone else’s idea outshine yours for the sake of the whole.",
  },
  {
    title: "The system is always bigger than the product.",
    text: "A chair isn’t just a chair, it’s material sourcing, manufacturing ethics, shipping emissions, and where it ends up when it breaks. Experience design taught me to see ripples, not just objects.",
  },
];

/**
 * The tools strip, "the colors in my life", in the order of the original site.
 * Several logo files carry their own empty padding, so `box` is where the
 * visible mark sits inside the file (in percent) and `file` is the file's
 * pixel size: the strip crops to the mark, so every one renders at the same size.
 * Logos not on the original site are served locally from `src`.
 */
const tools = [
  { name: "Arduino", id: "GnbMRXVSBhgp2gM0NleDNwNtSm0.png", box: [3.5, 3.7, 93, 93], file: [512, 512] },
  { name: "VS Code", id: "CL6l8OOt9oSxJD6pOidcWgwYig.png", box: [0, 0.2, 100, 99.6], file: [512, 512] },
  { name: "Cursor", src: "/about/cursor.svg", box: [6.1, 0, 87.8, 100], file: [24, 24] },
  { name: "Rhino", id: "d3AuaF3twascNuCrVB5ghzB624w.png", box: [4.9, 4.9, 90.2, 90.2], file: [512, 512] },
  { name: "Figma", id: "D4iQe9Bg40caaRRj0VheFZBIGw.png", box: [19.9, 19.9, 60.2, 60.2], file: [512, 512] },
  { name: "Illustrator", id: "BGw9BKzeCpmksfbQ6LoMF0JA0.png", box: [17.2, 0, 64.3, 100], file: [512, 320] },
  { name: "SketchUp", id: "FTBbTgrpZt4kL3AQmYXD2sBkik.png", box: [9, 5.9, 82, 88.7], file: [256, 256] },
  { name: "Character Animator", id: "QBRJv5xqReIiMA0xYwQkMtEodo.png", box: [0, 0, 100, 100], file: [227, 222] },
  { name: "Premiere Pro", id: "F7l4niEjS5sNS5KPmiwjw55474.png", box: [27.1, 16.4, 45.7, 67.2], file: [512, 341] },
  { name: "DaVinci Resolve", id: "V8SWf4JXlrrRGOAg4xjJeAn6yY.png", box: [20.3, 20.3, 59.4, 59.4], file: [512, 512] },
  { name: "Photoshop", id: "1nYaymMNEX5ZPa6yRI87o1heCMo.png", box: [22.5, 2.4, 55.1, 95.1], file: [512, 288] },
  { name: "Unity", id: "5hG7auDhuCDqhC8ahdARpMsmyM.png", box: [2.1, 17.8, 89.1, 64.5], file: [329, 512] },
  { name: "After Effects", id: "GA9LZ7Fipe0tvPgWxleho1SMM.png", box: [27.1, 16.4, 45.7, 67.2], file: [512, 341] },
];

const languages = ["English", "Hindi", "Marathi", "Gujarati", "Korean", "Kutchi"];

const hobbies: { title: string; icon: HobbyKind }[] = [
  { title: "Trekking / Hiking", icon: "trekking" },
  { title: "Sketching / Painting", icon: "sketching" },
  { title: "Crocheting", icon: "crocheting" },
  { title: "Photography", icon: "photography" },
  { title: "Sculpture making", icon: "sculpture" },
  { title: "3D CAD modelling", icon: "cad" },
];

const beliefs = [
  "Creativity",
  "Expression",
  "Individuality",
  "Innovation",
  "Quality",
  "Beauty",
  "Customization",
  "Personalization",
  "Inspiration",
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      {/* Intro */}
      <section className={styles.intro}>
        <Reveal className={styles.portraitWrap}>
          <figure className={styles.portrait}>
            <Image
              src={portrait}
              alt="Tvisha Sanghvi standing on a hillside above the sea"
              fill
              preload
              placeholder="blur"
              sizes="(max-width: 860px) 60vw, 320px"
              style={{ objectFit: "cover", objectPosition: "54% 62%" }}
            />
          </figure>
          <figcaption className={styles.caption}>Fig. 01 / The designer, mid-thought</figcaption>
        </Reveal>

        <div className={styles.introText}>
          <Reveal>
            <p className={styles.kicker}>Creative Director</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.title}>
              Hiii! I’m
              <br />
              Tvisha Sanghvi
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={styles.bio}>
              A passionate paradox that constantly switches between form and function, uncertainty and creation. I
              thrive on complexity but chase simplicity like a holy grail. Every product I touch must tell a story:
              clear, intuitive, and compelling. When I build, I build for humans, for the reduction of friction in real
              lives and the beauty of seamless solutions.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Disciplines */}
      <section className={styles.section}>
        <Reveal>
          <SectionHead index="A" label="What I do" />
        </Reveal>
        <div className={styles.disciplines}>
          {disciplines.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.07} className={styles.discipline}>
              <span className={styles.num}>0{i + 1}</span>
              <h2 className={styles.disciplineTitle}>{d.title}</h2>
              <p className={styles.disciplineText}>{d.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section className={styles.section} aria-label="Languages">
        <Reveal>
          <SectionHead index="B" label="Languages" />
          <p className={styles.note}>Six, so far.</p>
        </Reveal>
        <ul className={styles.languages}>
          {languages.map((l, i) => (
            <Reveal key={l} delay={i * 0.05} className={styles.language}>
              <span className={styles.languageNum}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.languageName}>{l}</span>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Tools: an endless strip of logos that pauses on hover */}
      <section className={styles.section} aria-label="The colors in my life">
        <Reveal>
          <SectionHead index="C" label="The colors in my life" />
          <p className={styles.note}>The tools I paint with.</p>
        </Reveal>
        <div className={`${styles.marquee} ${styles.toolStrip}`}>
          {[0, 1].map((copy) => (
            <ul key={copy} className={`${styles.marqueeTrack} ${styles.toolTrack}`} aria-hidden={copy === 1}>
              {tools.map((t) => {
                const [bx, by, bw, bh] = t.box;
                // The mark's true size in pixels, then fit it in a square: the longer side fills it
                const mw = (bw / 100) * t.file[0];
                const mh = (bh / 100) * t.file[1];
                const fitW = mw >= mh ? 100 : (mw / mh) * 100;
                const fitH = mh >= mw ? 100 : (mh / mw) * 100;
                return (
                  <li key={t.name} className={styles.tool}>
                    <span className={styles.toolMark}>
                      <span
                        className={styles.toolCrop}
                        style={{ width: `${fitW}%`, height: `${fitH}%` }}
                      >
                        <img
                          src={"src" in t ? t.src : `https://framerusercontent.com/images/${t.id}?scale-down-to=512`}
                          alt={copy === 0 ? t.name : ""}
                          loading="lazy"
                          decoding="async"
                          style={{
                            width: `${10000 / bw}%`,
                            height: `${10000 / bh}%`,
                            left: `${(-bx / bw) * 100}%`,
                            top: `${(-by / bh) * 100}%`,
                          }}
                        />
                      </span>
                    </span>
                    <span className={styles.toolName}>{t.name}</span>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </section>

      {/* Lessons */}
      <section className={styles.section}>
        <Reveal>
          <SectionHead index="D" label="Design lessons I learnt along the way" />
          <p className={styles.note}>Firsthand experiences that shaped my thinking.</p>
        </Reveal>
        <Lessons lessons={lessons} />
      </section>

      {/* Hobbies */}
      <section className={styles.section} aria-label="Outside of work">
        <Reveal>
          <SectionHead index="E" label="Outside of work" />
          <p className={styles.note}>Making things with my hands, mostly.</p>
        </Reveal>
        <div className={styles.hobbies}>
          {hobbies.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.06} className={styles.hobby}>
              <HobbyIcon kind={h.icon} className={styles.hobbyIcon} />
              <span className={styles.hobbyTitle}>{h.title}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Beliefs */}
      <section className={styles.section} aria-label="I believe in">
        <Reveal>
          <SectionHead index="F" label="I believe in" />
        </Reveal>
        <div className={styles.marquee}>
          {[0, 1].map((copy) => (
            <ul key={copy} className={styles.marqueeTrack} aria-hidden={copy === 1}>
              {beliefs.map((b, i) => (
                <li key={b} className={i % 2 ? styles.outline : undefined}>
                  {b}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>
    </main>
  );
}
