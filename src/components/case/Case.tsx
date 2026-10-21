/* eslint-disable @next/next/no-img-element -- images come from Framer's resizing CDN */

import type { CSSProperties, ReactNode } from "react";
import { imageUrl } from "@/data/projects";
import Reveal from "../Reveal";
import Bars from "./Bars";
import styles from "./Case.module.css";

/*
 * Building blocks for native case studies: chapters, prose, stats, tables,
 * charts, insights and crops of the original slide artwork. Each project's
 * case study composes these in its own file under src/case-studies/.
 */

/** Two-column chapter: sticky index + title on the left, content on the right. */
export function Chapter({
  n,
  title,
  kicker,
  art,
  children,
}: {
  n: string;
  title: string;
  kicker?: string;
  /** An illustration that floats under the heading as the chapter scrolls by. */
  art?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className={styles.chapter} aria-labelledby={`ch-${n}`}>
      <header className={styles.chapterHead}>
        <span className={styles.chapterNum}>{n}</span>
        <h2 id={`ch-${n}`} className={styles.chapterTitle}>
          {title}
        </h2>
        {kicker && <p className={styles.chapterKicker}>{kicker}</p>}
        {art && <div className={styles.chapterArt}>{art}</div>}
      </header>
      <div className={styles.chapterBody}>{children}</div>
    </section>
  );
}

/** Lead paragraph, set larger in the serif. */
export function Lead({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <p className={styles.lead}>{children}</p>
    </Reveal>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <div className={styles.prose}>{children}</div>
    </Reveal>
  );
}

/** Small mono label above a block. */
export function Label({ children }: { children: ReactNode }) {
  return <p className={styles.label}>{children}</p>;
}

/** Row of big numbers. */
export function Stats({ items }: { items: { value: string; label: string; note?: string }[] }) {
  return (
    <dl className={styles.stats}>
      {items.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.06} className={styles.stat}>
          <dt>{s.label}</dt>
          <dd>
            <span className={styles.statValue}>{s.value}</span>
            {s.note && <span className={styles.statNote}>{s.note}</span>}
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}

export function Table({ head, rows, caption }: { head: string[]; rows: ReactNode[][]; caption?: string }) {
  // If any row label is a sentence, set them all as text rather than block caps
  const longLabels = rows.some((r) => typeof r[0] === "string" && r[0].length > 32);
  return (
    <Reveal>
      <figure className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) =>
                  j === 0 ? (
                    <th
                      key={j}
                      scope="row"
                      className={longLabels ? styles.long : undefined}
                    >
                      {c}
                    </th>
                  ) : (
                    <td key={j}>{c}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      </figure>
    </Reveal>
  );
}

/** Horizontal bar chart; bars grow in when scrolled into view. */
export function BarChart({
  title,
  data,
  unit = "%",
  max,
  caption,
}: {
  title: string;
  data: { label: string; value: number }[];
  unit?: string;
  max?: number;
  caption?: string;
}) {
  return (
    <Reveal>
      <figure className={styles.chart}>
        <figcaption className={styles.chartTitle}>{title}</figcaption>
        <Bars data={data} unit={unit} max={max ?? Math.max(...data.map((d) => d.value))} />
        {caption && <p className={styles.caption}>{caption}</p>}
      </figure>
    </Reveal>
  );
}

/** Numbered insight or finding cards. */
export function Cards({ items, columns = 3 }: { items: { title: string; text: ReactNode; tag?: string }[]; columns?: 2 | 3 }) {
  return (
    <ol className={styles.cards} style={{ "--cols": columns } as CSSProperties}>
      {items.map((c, i) => (
        <li key={c.title}>
          <Reveal delay={(i % columns) * 0.06} className={styles.card}>
            <span className={styles.cardIndex}>
              {c.tag ?? String(i + 1).padStart(2, "0")}
            </span>
            <h3 className={styles.cardTitle}>{c.title}</h3>
            <div className={styles.cardText}>{c.text}</div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/** A pulled quote, e.g. from an interview. */
export function Quote({ children, by }: { children: ReactNode; by?: string }) {
  return (
    <Reveal>
      <blockquote className={styles.quote}>
        <p>“{children}”</p>
        {by && <footer>{by}</footer>}
      </blockquote>
    </Reveal>
  );
}

/** The problem statement / "How might we", set as a framed callout. */
export function Callout({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Reveal>
      <div className={styles.callout}>
        <span className={styles.calloutLabel}>{label}</span>
        <p className={styles.calloutText}>{children}</p>
      </div>
    </Reveal>
  );
}

/** Numbered horizontal process. */
export function Steps({ items }: { items: { title: string; text?: ReactNode }[] }) {
  return (
    <ol className={styles.steps}>
      {items.map((s, i) => (
        <li key={s.title}>
          <Reveal delay={i * 0.05} className={styles.step}>
            <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className={styles.stepTitle}>{s.title}</h3>
            {s.text && <div className={styles.stepText}>{s.text}</div>}
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/** Journey map: stages across the top, rows of observations beneath. */
export function Journey({ stages, rows }: { stages: string[]; rows: { label: string; cells: ReactNode[] }[] }) {
  return (
    <Reveal>
      <div className={styles.journeyWrap}>
        <table className={styles.journey}>
          <thead>
            <tr>
              <th />
              {stages.map((s, i) => (
                <th key={s} scope="col">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                {r.cells.map((c, i) => (
                  <td key={i}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

export type Box = { x: number; y: number; w: number; h: number };

/**
 * A crop of an original slide, so screens, renders and photos can be reused
 * without showing the whole slide. `box` is in percent of the slide.
 */
export function Crop({
  id,
  w,
  h,
  box,
  alt,
  caption,
  framed = true,
}: {
  /** A Framer CDN image id, or a path under /public (starting with "/") for local artwork. */
  id: string;
  w: number;
  h: number;
  box: Box;
  alt: string;
  caption?: string;
  framed?: boolean;
}) {
  const ratio = (box.w * w) / (box.h * h);
  const src = id.startsWith("/") ? id : imageUrl(id, 2048);
  return (
    <Reveal>
      <figure className={`${styles.crop} ${framed ? styles.framed : ""}`}>
        <div className={styles.cropWindow} style={{ aspectRatio: ratio }}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            style={{
              width: `${(100 / box.w) * 100}%`,
              height: `${(100 / box.h) * 100}%`,
              left: `${(-box.x / box.w) * 100}%`,
              top: `${(-box.y / box.h) * 100}%`,
            }}
          />
        </div>
        {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      </figure>
    </Reveal>
  );
}

/**
 * Lay out several crops side by side. `phones` keeps the columns on narrow
 * screens so small UI crops stay near their native size instead of blowing up.
 */
export function Gallery({
  children,
  columns = 3,
  phones = false,
}: {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  phones?: boolean;
}) {
  return (
    <div className={`${styles.gallery} ${phones ? styles.phones : ""}`} style={{ "--cols": columns } as CSSProperties}>
      {children}
    </div>
  );
}

/** Two columns of content, e.g. text beside a crop. */
export function Split({ children, reverse = false }: { children: ReactNode; reverse?: boolean }) {
  return <div className={`${styles.split} ${reverse ? styles.reverse : ""}`}>{children}</div>;
}
