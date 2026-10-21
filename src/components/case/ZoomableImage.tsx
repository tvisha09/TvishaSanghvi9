"use client";

/* eslint-disable @next/next/no-img-element -- a static diagram image, not worth next/image here */

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import Reveal from "../Reveal";
import styles from "./ZoomableImage.module.css";

const MIN = 1;
const MAX = 4;
const STEP = 0.6;

/**
 * A diagram too dense to read at card width: pinch, scroll-wheel or the
 * +/− buttons zoom in, drag pans around while zoomed, and a reset button
 * returns to the fitted view.
 */
export type LegendItem = { icon: ReactNode; text: string; muted?: boolean };

export default function ZoomableImage({
  src,
  alt,
  ratio,
  caption,
  legend,
}: {
  src: string;
  alt: string;
  /** Natural width / height, so the frame reserves the right space before the image loads. */
  ratio: number;
  caption?: string;
  /** A fixed key, pinned to the top-left corner regardless of zoom or pan. */
  legend?: LegendItem[];
}) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const dragging = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const clampPos = (x: number, y: number, s: number) => {
    const frame = frameRef.current;
    if (!frame) return { x, y };
    const maxX = (frame.clientWidth * (s - 1)) / 2;
    const maxY = (frame.clientHeight * (s - 1)) / 2;
    return { x: Math.min(maxX, Math.max(-maxX, x)), y: Math.min(maxY, Math.max(-maxY, y)) };
  };

  const zoomTo = (next: number) => {
    const s = Math.min(MAX, Math.max(MIN, next));
    scaleRef.current = s;
    setScale(s);
    setPos((p) => clampPos(p.x, p.y, s));
  };

  // Attached manually (not as a React prop) so it can call preventDefault:
  // React's onWheel is a passive listener and can't block the page scroll.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      zoomTo(scaleRef.current - e.deltaY * 0.0025);
    };
    frame.addEventListener("wheel", handler, { passive: false });
    return () => frame.removeEventListener("wheel", handler);
    // zoomTo reads scaleRef rather than closing over scale, so it's stable; the ESLint rule can't see that.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = (e: PointerEvent) => {
    if (scale === 1) return;
    dragging.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!dragging.current) return;
    const d = dragging.current;
    const next = clampPos(d.px + (e.clientX - d.x), d.py + (e.clientY - d.y), scale);
    setPos(next);
  };

  const onPointerUp = () => {
    dragging.current = null;
  };

  const reset = () => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  };

  return (
    <Reveal>
      <figure className={styles.wrap}>
        <div
          ref={frameRef}
          className={styles.frame}
          style={{ aspectRatio: ratio }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            className={scale > 1 ? styles.grabbing : undefined}
            style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})` }}
          />
        </div>
        {legend && legend.length > 0 && (
          <ul className={styles.legend}>
            {legend.map((item, i) => (
              <li key={i} className={item.muted ? styles.legendMuted : undefined}>
                <span className={styles.legendIcon} aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        )}
        <div className={styles.controls}>
          {caption && <span className={styles.caption}>{caption}</span>}
          <div className={styles.buttons}>
            <button type="button" onClick={() => zoomTo(scale - STEP)} disabled={scale <= MIN} aria-label="Zoom out">
              −
            </button>
            <span className={styles.pct}>{Math.round(scale * 100)}%</span>
            <button type="button" onClick={() => zoomTo(scale + STEP)} disabled={scale >= MAX} aria-label="Zoom in">
              +
            </button>
            <button type="button" className={styles.reset} onClick={reset} disabled={scale === 1}>
              Reset
            </button>
          </div>
        </div>
      </figure>
    </Reveal>
  );
}
