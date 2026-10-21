/* eslint-disable @next/next/no-img-element -- images come from Framer's resizing CDN */

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { imageSrcSet, imageUrl, readTime, type Project } from "@/data/projects";
import Reveal from "./Reveal";
import styles from "./ProjectShowcase.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/** Length of the longest word, so the title can be sized to never split one. */
const longestWord = (text: string) => Math.max(...text.split(/\s+/).map((w) => w.length));

/*
 * Project header: title, subtitle, a short text and a spec strip on the left,
 * the framed cover on the right. Used as the hero on each project page and,
 * with `href`, as a linked entry on the Projects index.
 */
export default function ProjectShowcase({
  project,
  position,
  total,
  text,
  href,
  heading: Heading = "h2",
  eager = false,
}: {
  project: Project;
  position: number;
  total: number;
  text: string;
  href?: string;
  heading?: "h1" | "h2";
  eager?: boolean;
}) {
  const kindLabel = project.kind === "main" ? "Case study" : "Side quest";
  // The cover repeats the title link, so it stays out of the tab order and accessibility tree
  const linked = (node: ReactNode, coverClass?: string) =>
    href ? (
      <Link
        href={href}
        className={coverClass}
        {...(coverClass ? { tabIndex: -1, "aria-hidden": true } : {})}
      >
        {node}
      </Link>
    ) : (
      node
    );

  return (
    <article className={`${styles.showcase} ${href ? styles.entry : ""}`}>
      <div className={styles.text} style={{ "--chars": longestWord(project.title) } as CSSProperties}>
        <Reveal>
          <p className={styles.kicker}>
            {kindLabel} {pad(position)} / {pad(total)}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <Heading className={styles.title}>{linked(project.title)}</Heading>
        </Reveal>
        <Reveal delay={0.12}>
          <p className={styles.subtitle}>{project.subtitle}</p>
        </Reveal>
        <Reveal delay={0.18}>
          <p className={styles.description}>{text}</p>
        </Reveal>
        <Reveal delay={0.24}>
          <dl className={styles.spec}>
            <div>
              <dt>Disciplines</dt>
              <dd>{project.tags.join(" / ")}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{kindLabel}</dd>
            </div>
            <div>
              <dt>Read time</dt>
              <dd>{readTime(project)}</dd>
            </div>
          </dl>
        </Reveal>
        {href && (
          <Reveal delay={0.3}>
            <Link href={href} className={styles.cta}>
              View project <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        )}
      </div>

      <Reveal delay={0.1} className={styles.coverWrap}>
        {linked(
          <figure className={styles.cover}>
            <img
              src={imageUrl(project.cover.id, 1024)}
              srcSet={imageSrcSet(project.cover.id)}
              sizes="(max-width: 860px) 92vw, 520px"
              width={project.cover.w}
              height={project.cover.h}
              alt={`${project.title} cover`}
              loading={eager ? "eager" : "lazy"}
            />
            <span className={styles.scan} aria-hidden="true" />
          </figure>,
          styles.coverLink,
        )}
        <p className={styles.coverCaption}>
          <span>IMG_{pad(position)}</span>
          <span>Cover</span>
        </p>
      </Reveal>
    </article>
  );
}
