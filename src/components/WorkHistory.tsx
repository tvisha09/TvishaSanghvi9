"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import styles from "./WorkHistory.module.css";

export type WorkProject = { title: string; text?: string; skills?: string[] };

export type WorkEntry = {
  company: string;
  role: string;
  dates: string;
  current?: boolean;
  projects: WorkProject[];
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Work history as a dropdown list, in the same bold-block index style as the
 * Projects page: closed by default, the current role open first. Opening a
 * company reveals its timeline and the kinds of projects worked on there.
 */
export default function WorkHistory({ entries }: { entries: WorkEntry[] }) {
  const [open, setOpen] = useState<number | null>(entries.findIndex((e) => e.current));

  return (
    <ol className={styles.list}>
      {entries.map((e, i) => {
        const isOpen = open === i;
        return (
          <li key={e.company}>
            <Reveal delay={i * 0.06} className={styles.entry}>
              <button
                type="button"
                className={styles.head}
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className={styles.index}>{pad(i + 1)}</span>
                <span className={styles.heading}>
                  <span className={styles.company}>
                    {e.company}
                    {e.current && <span className={styles.badge}>Current</span>}
                  </span>
                  <span className={styles.role}>{e.role}</span>
                </span>
                <span className={styles.dates}>{e.dates}</span>
                <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`} aria-hidden="true">
                  ↓
                </span>
              </button>
              <div className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}>
                <div className={styles.panelInner}>
                  <ul className={styles.projects}>
                    {e.projects.map((p) => (
                      <li key={p.title}>
                        <span className={styles.projectTitle}>{p.title}</span>
                        {p.text && <span className={styles.projectText}>{p.text}</span>}
                        {p.skills && p.skills.length > 0 && (
                          <ul className={styles.skills}>
                            {p.skills.map((s) => (
                              <li key={s}>{s}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
