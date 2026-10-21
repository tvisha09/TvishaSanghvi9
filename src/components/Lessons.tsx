"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import styles from "./Lessons.module.css";

type Lesson = { title: string; text: string };

/*
 * Lessons on a vertical timeline. As you scroll, the line fills from the top,
 * each dot lights up when the line reaches it, and its card slides in from its
 * side. Cards tilt toward the cursor while hovered.
 */
export default function Lessons({ lessons }: { lessons: Lesson[] }) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = [...list.querySelectorAll<HTMLElement>("[data-lesson]")];
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      // The line's tip follows a point 60% of the way down the screen
      const tip = window.innerHeight * 0.6 - rect.top;
      const progress = Math.min(1, Math.max(0, tip / rect.height));
      list.style.setProperty("--progress", progress.toFixed(4));

      for (const item of items) {
        const dotY = item.offsetTop + 28;
        item.classList.toggle(styles.reached, tip >= dotY);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
    card.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
    card.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
    card.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
  };

  const untilt = (e: PointerEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <div ref={listRef} className={styles.timeline}>
      <span className={styles.track} aria-hidden="true">
        <span className={styles.fill} />
      </span>
      <ol className={styles.list}>
        {lessons.map((l, i) => (
          <li key={l.title} data-lesson className={`${styles.item} ${i % 2 ? styles.right : styles.left}`}>
            <span className={styles.dot} aria-hidden="true" />
            <div className={styles.card} onPointerMove={tilt} onPointerLeave={untilt}>
              <span className={styles.num}>Lesson #{i + 1}</span>
              <h3 className={styles.title}>{l.title}</h3>
              <p className={styles.text}>{l.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
