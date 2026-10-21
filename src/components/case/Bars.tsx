"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./Case.module.css";

/** Bars that grow to their value the first time they scroll into view. */
export default function Bars({ data, unit, max }: { data: { label: string; value: number }[]; unit: string; max: number }) {
  const ref = useRef<HTMLUListElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ul ref={ref} className={`${styles.bars} ${shown ? styles.barsShown : ""}`}>
      {data.map((d, i) => (
        <li key={d.label} style={{ "--v": d.value / max, "--i": i } as CSSProperties}>
          <span className={styles.barLabel}>{d.label}</span>
          <span className={styles.barTrack}>
            <span className={styles.barFill} />
          </span>
          <span className={styles.barValue}>
            {d.value}
            {unit}
          </span>
        </li>
      ))}
    </ul>
  );
}
