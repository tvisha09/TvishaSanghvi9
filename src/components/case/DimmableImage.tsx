"use client";

/* eslint-disable @next/next/no-img-element -- a static diagram image, not worth next/image here */

import { useId, useState, type CSSProperties } from "react";
import Reveal from "../Reveal";
import styles from "./DimmableImage.module.css";

export type CoreNode = { label: string; x: number; y: number; w?: number };
export type CoreLink = { from: string; to: string; dashed?: boolean; bend?: number };

/**
 * A diagram image with a toggle that swaps in a focused overlay: a dark
 * panel holding just the core nodes, named in `core`, connected by arrows —
 * the same picture, reduced to what matters, rather than just dimming parts
 * of the original.
 */
export default function DimmableImage({
  src,
  alt,
  ratio,
  toggleLabel,
  core,
  links = [],
}: {
  src: string;
  alt: string;
  /** Natural width / height, so the frame reserves the right space before the image loads. */
  ratio: number;
  toggleLabel: string;
  /** The core stakeholders, positioned in percent of the frame, shown on the overlay. */
  core: CoreNode[];
  /** Arrows between core nodes, drawn on the overlay. */
  links?: CoreLink[];
}) {
  const [on, setOn] = useState(false);
  const uid = useId();
  const nodes = new Map(core.map((n) => [n.label, n]));

  return (
    <Reveal>
      <div className={styles.wrap}>
        <div className={styles.toggleRow}>
          <span className={styles.toggleLabel}>{toggleLabel}</span>
          <button
            type="button"
            role="switch"
            aria-checked={on}
            className={`${styles.switch} ${on ? styles.switchOn : ""}`}
            onClick={() => setOn((v) => !v)}
          >
            <span className={styles.knob} />
          </button>
        </div>
        <div className={styles.frame} style={{ aspectRatio: ratio }}>
          <img src={src} alt={alt} loading="lazy" decoding="async" />
          <div className={styles.overlay} aria-hidden={!on}>
            {/* Just the tint fades in; the lines and pills below are drawn fully solid */}
            <span className={`${styles.scrim} ${on ? styles.scrimOn : ""}`} />
            {on && (
              <>
                <svg className={styles.links} viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <marker id={`${uid}-arrow`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
                      <path d="M0 0L10 5L0 10z" className={styles.arrowHead} />
                    </marker>
                  </defs>
                  {links.map((l) => {
                    const a = nodes.get(l.from);
                    const b = nodes.get(l.to);
                    if (!a || !b) return null;
                    const mx = (a.x + b.x) / 2 + (l.bend ?? 0);
                    const my = (a.y + b.y) / 2;
                    const path = l.bend ? `M${a.x} ${a.y} Q${mx} ${my} ${b.x} ${b.y}` : `M${a.x} ${a.y} L${b.x} ${b.y}`;
                    return (
                      <path
                        key={`${l.from}-${l.to}`}
                        d={path}
                        className={`${styles.link} ${l.dashed ? styles.linkDashed : ""}`}
                        markerStart={`url(#${uid}-arrow)`}
                        markerEnd={`url(#${uid}-arrow)`}
                      />
                    );
                  })}
                </svg>
                {core.map((n) => (
                  <span
                    key={n.label}
                    className={styles.corePill}
                    style={{ left: `${n.x}%`, top: `${n.y}%`, maxWidth: n.w ? `${n.w}%` : undefined } as CSSProperties}
                  >
                    {n.label}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
