"use client";

import { useId } from "react";
import Reveal from "@/components/Reveal";
import styles from "./swadisht.module.css";

/*
 * The donor journey map, in the deck's own layout: phases spanning one or
 * more sub-stages, a scrollable mustard-and-peach grid, and an emotion
 * curve plotted (not just described) across the stages, instead of just
 * described in a line of prose.
 */

export type JourneyPhase = { label: string; stages: string[] };
export type JourneyRow = { label: string; cells: string[] };

const EMOJI = ["😐", "🤔", "🤔", "🙂", "😄"];

export default function SwadishtJourney({
  phases,
  emotions,
  rows,
}: {
  phases: JourneyPhase[];
  /** One mood value per stage, 0–1, plotted as the curve. */
  emotions: number[];
  /** Rows in display order; the chart renders where a row is named "Emotions". */
  rows: JourneyRow[];
}) {
  const uid = useId();
  const stages = phases.flatMap((p) => p.stages);
  const n = stages.length;
  const colW = 100 / n;

  // A smooth-ish path through the emotion points, in a 0–100 x 0–100 box
  const pts = emotions.map((v, i) => [colW * (i + 0.5), 100 - v * 100] as const);
  const path = pts.reduce((d, [x, y], i) => (i === 0 ? `M${x} ${y}` : `${d} L${x} ${y}`), "");
  const areaPath = `${path} L${pts[pts.length - 1][0]} 100 L${pts[0][0]} 100 Z`;

  return (
    <Reveal>
      <div className={styles.journeyWrap}>
        <table className={styles.journeyTable}>
          <thead>
            <tr>
              <th className={styles.journeyCorner} scope="col">
                Phases
              </th>
              {phases.map((p) => (
                <th key={p.label} colSpan={p.stages.length} className={styles.journeyPhase} scope="colgroup">
                  {p.label}
                </th>
              ))}
            </tr>
            <tr>
              <th className={styles.journeyCorner} scope="col" />
              {stages.map((s) => (
                <th key={s} className={styles.journeyStage} scope="col">
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) =>
              r.label === "Emotions" ? (
                <tr key={r.label}>
                  <th className={styles.journeyRowLabel} scope="row">
                    {r.label}
                  </th>
                  <td colSpan={n} className={styles.journeyEmotionCell}>
                    <div className={styles.journeyEmotion}>
                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.journeyEmotionSvg}>
                        <defs>
                          <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#f6bc5e" stopOpacity="0.9" />
                            <stop offset="1" stopColor="#f6bc5e" stopOpacity="0.15" />
                          </linearGradient>
                        </defs>
                        <line x1="0" y1="55" x2="100" y2="40" className={styles.journeyBaseline} vectorEffect="non-scaling-stroke" />
                        <path d={areaPath} fill={`url(#${uid}-fill)`} />
                        <path d={path} className={styles.journeyEmotionLine} vectorEffect="non-scaling-stroke" />
                      </svg>
                      {pts.map(([x, y], i) => (
                        <span key={i} className={styles.journeyEmoji} style={{ left: `${x}%`, top: `${y}%` }}>
                          {EMOJI[Math.min(i, EMOJI.length - 1)]}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={r.label}>
                  <th className={styles.journeyRowLabel} scope="row">
                    {r.label}
                  </th>
                  {r.cells.map((c, i) => (
                    <td key={i} className={styles.journeyCell}>
                      {c}
                    </td>
                  ))}
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}
