"use client";

/* eslint-disable @next/next/no-img-element -- screens are cropped from Framer's resizing CDN */

import { useState, type CSSProperties, type KeyboardEvent } from "react";
import { imageUrl } from "@/data/projects";
import type { Box } from "./Case";
import styles from "./Phones.module.css";

type Screen = {
  label: string;
  id: string;
  w: number;
  h: number;
  box: Box;
  alt: string;
  /** One line on what the screen is for. */
  text: string;
  /** The features on it, and what each one stands for. */
  features: { name: string; text: string }[];
};

/** How far back each earlier screen sits behind the current one. */
const depth = [
  { x: 0, scale: 1, opacity: 1 },
  { x: -38, scale: 0.86, opacity: 0.55 },
  { x: -66, scale: 0.74, opacity: 0.3 },
];

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * High-fidelity screens as a stepper: the current phone stands in front with
 * the previous two fanned out behind it, and its features are explained
 * alongside. Moves only when the reader picks a step, a phone or an arrow.
 */
export default function Phones({ screens }: { screens: Screen[] }) {
  const [active, setActive] = useState(0);
  const go = (i: number) => setActive((i + screens.length) % screens.length);
  const screen = screens[active];

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(active + 1);
    if (e.key === "ArrowLeft") go(active - 1);
  };

  return (
    <div className={styles.showcase} onKeyDown={onKey}>
      <ol className={styles.steps} style={{ "--n": screens.length } as CSSProperties}>
        {screens.map((s, i) => (
          <li key={s.label}>
            <button
              type="button"
              className={`${styles.step} ${i <= active ? styles.done : ""} ${i === active ? styles.current : ""}`}
              onClick={() => go(i)}
              aria-current={i === active ? "step" : undefined}
            >
              <span className={styles.dot}>{i === active ? i + 1 : ""}</span>
              <span className={styles.stepLabel}>{s.label}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className={styles.body}>
        <div className={styles.stage}>
          {screens.map((s, i) => {
            const back = active - i;
            const place = back >= 0 && back < depth.length ? depth[back] : null;
            const ratio = (s.box.w * s.w) / (s.box.h * s.h);
            return (
              <figure
                key={s.label}
                className={`${styles.phone} ${back > 0 && place ? styles.behind : ""}`}
                aria-hidden={i !== active}
                onClick={back > 0 && place ? () => go(i) : undefined}
                style={
                  {
                    aspectRatio: ratio,
                    zIndex: depth.length - (place ? back : depth.length),
                    opacity: place ? place.opacity : 0,
                    transform: place
                      ? `translateX(${place.x}%) scale(${place.scale})`
                      : `translateX(${back < 0 ? 30 : -80}%) scale(0.7)`,
                  } as CSSProperties
                }
              >
                <img
                  src={imageUrl(s.id, 2048)}
                  alt={s.alt}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: `${(100 / s.box.w) * 100}%`,
                    height: `${(100 / s.box.h) * 100}%`,
                    left: `${(-s.box.x / s.box.w) * 100}%`,
                    top: `${(-s.box.y / s.box.h) * 100}%`,
                  }}
                />
              </figure>
            );
          })}
        </div>

        {/* Keyed so the text animates in fresh for every screen */}
        <div key={screen.label} className={styles.info} aria-live="polite">
          <p className={styles.count}>
            {pad(active + 1)} / {pad(screens.length)}
          </p>
          <h4 className={styles.name}>{screen.label}</h4>
          <p className={styles.text}>{screen.text}</p>
          <ul className={styles.features}>
            {screen.features.map((f, i) => (
              <li key={f.name} style={{ "--i": i } as CSSProperties}>
                <b>{f.name}</b>
                <span>{f.text}</span>
              </li>
            ))}
          </ul>
          <div className={styles.arrows}>
            <button type="button" onClick={() => go(active - 1)} aria-label="Previous screen">
              ←
            </button>
            <button type="button" onClick={() => go(active + 1)} aria-label="Next screen">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
