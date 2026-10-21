"use client";

/* eslint-disable @next/next/no-img-element -- panels are cropped from Framer's resizing CDN */

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { imageUrl } from "@/data/projects";
import type { Box } from "./Case";
import styles from "./Storybook.module.css";

export type Page = { id: string; w: number; h: number; box: Box; alt: string; caption: string };

const pad = (n: number) => String(n).padStart(2, "0");

/** One cropped panel, drawn to fill its page. */
function PanelImg({ page }: { page: Page }) {
  const { id, box } = page;
  return (
    <img
      src={imageUrl(id, 2048)}
      alt={page.alt}
      loading="lazy"
      decoding="async"
      style={{
        width: `${(100 / box.w) * 100}%`,
        height: `${(100 / box.h) * 100}%`,
        left: `${(-box.x / box.w) * 100}%`,
        top: `${(-box.y / box.h) * 100}%`,
      }}
    />
  );
}

/**
 * A storyboard as a book you flip through, one panel per page. Pages turn
 * with a real paper-flip motion: the leaving page rotates away about the
 * spine and, because its back face is hidden, the next page shows through
 * partway round rather than needing a second drawn face.
 */
export default function Storybook({ pages, title }: { pages: Page[]; title?: string }) {
  const [index, setIndex] = useState(0);
  // The page mid-flip, its direction, and whether it has started animating yet
  const [turn, setTurn] = useState<{ dir: "next" | "prev"; page: number } | null>(null);
  const [go, setGo] = useState(false);
  const liveRef = useRef<HTMLDivElement>(null);

  const last = pages.length - 1;

  const flip = (dir: "next" | "prev") => {
    if (turn) return; // one flip at a time
    if (dir === "next" && index >= last) return;
    if (dir === "prev" && index <= 0) return;
    setGo(false);
    setTurn({ dir, page: dir === "next" ? index : index - 1 });
  };

  // Commit the start angle on one frame, then trigger the CSS transition on the next
  useEffect(() => {
    if (!turn) return;
    const raf = requestAnimationFrame(() => setGo(true));
    return () => cancelAnimationFrame(raf);
  }, [turn]);

  const onTurnEnd = () => {
    if (!turn) return;
    setIndex(turn.dir === "next" ? turn.page + 1 : turn.page);
    setTurn(null);
    setGo(false);
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") flip("next");
    if (e.key === "ArrowLeft") flip("prev");
  };

  const resting = pages[index];
  const ratio = (resting.box.w * resting.w) / (resting.box.h * resting.h);

  return (
    <figure className={styles.book} onKeyDown={onKey} tabIndex={0} aria-roledescription="storybook">
      {title && <figcaption className={styles.title}>{title}</figcaption>}
      <div className={styles.stage} style={{ aspectRatio: ratio }}>
        {/* Resting page: hidden mid-flip, when the moving page is drawn instead */}
        {!turn && (
          <div className={styles.page}>
            <PanelImg page={resting} />
          </div>
        )}

        {turn && (
          <>
            {/* The page being revealed sits flat underneath */}
            <div className={styles.page} style={{ zIndex: 1 }}>
              <PanelImg page={pages[turn.dir === "next" ? turn.page + 1 : turn.page]} />
            </div>
            {/* The page being turned, rotating about the spine */}
            <div
              className={styles.page}
              style={
                {
                  zIndex: 2,
                  transform: `rotateY(${
                    turn.dir === "next" ? (go ? -165 : 0) : go ? 0 : -165
                  }deg)`,
                } as CSSProperties
              }
              onTransitionEnd={onTurnEnd}
            >
              <PanelImg page={pages[turn.page]} />
              <span className={styles.shade} aria-hidden="true" style={{ "--shade": go ? 1 : 0 } as CSSProperties} />
            </div>
          </>
        )}

        <button type="button" className={styles.zoneLeft} onClick={() => flip("prev")} aria-label="Previous page" disabled={index === 0} />
        <button type="button" className={styles.zoneRight} onClick={() => flip("next")} aria-label="Next page" disabled={index === last} />
      </div>

      <figcaption className={styles.caption} ref={liveRef} aria-live="polite">
        {resting.caption}
      </figcaption>

      <div className={styles.controls}>
        <button type="button" onClick={() => flip("prev")} disabled={index === 0 || !!turn} aria-label="Previous page">
          ←
        </button>
        <span className={styles.count}>
          {pad(index + 1)} / {pad(pages.length)}
        </span>
        <button type="button" onClick={() => flip("next")} disabled={index === last || !!turn} aria-label="Next page">
          →
        </button>
      </div>
    </figure>
  );
}
