"use client";

import Reveal from "@/components/Reveal";
import styles from "./greenly.module.css";

/*
 * The value-exchange diamond: Supplier, Farmer, Logistics and Customer at
 * the four corners, connected by every edge and both diagonals, each
 * carrying the core value that flows along it.
 */

const CORE_VALUES = [
  { key: "reliability", label: "Reliability", color: "#e8923c" },
  { key: "transparency", label: "Transparency", color: "#e0b23c" },
  { key: "efficiency", label: "In Time Efficiency", color: "#8bc34a" },
  { key: "networking", label: "Networking", color: "#4ecdc4" },
  { key: "sustainability", label: "Sustainability", color: "#4ab8e8" },
] as const;

type ValueKey = (typeof CORE_VALUES)[number]["key"];

function ValueIcon({ value, color }: { value: ValueKey; color: string }) {
  const common = {
    width: "100%",
    height: "100%",
    fill: "none",
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (value) {
    case "reliability":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M7 11v9H4v-9zM7 11l2.5-6.5a1.8 1.8 0 0 1 3.3 1.4L11.5 11H18a2 2 0 0 1 2 2.4l-1.3 6A2 2 0 0 1 16.7 21H9a2 2 0 0 1-2-2v-8z" />
        </svg>
      );
    case "transparency":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 12.5l2 2 5-5" />
        </svg>
      );
    case "efficiency":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l3 2" />
          <path d="M8 3l3 2M16 3l-3 2" />
        </svg>
      );
    case "networking":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="6" cy="7" r="2" />
          <circle cx="18" cy="7" r="2" />
          <circle cx="12" cy="18" r="2" />
          <path d="M7.6 8.2L10.5 16M16.4 8.2L13.5 16M8 7h8" />
        </svg>
      );
    case "sustainability":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M12 21c-5-2-7-6-7-10a7 7 0 0 1 14 0c0 4-2 8-7 10z" />
          <path d="M12 21V9" />
        </svg>
      );
  }
}

/** A double-headed arrow between two corners, with a value icon at its midpoint. */
function Edge({
  from,
  to,
  value,
  labelAt = 0.5,
  offset = 0,
}: {
  from: [number, number];
  to: [number, number];
  value: ValueKey;
  /** Where along the line (0–1) the icon sits; nudge off-centre when two edges would otherwise overlap. */
  labelAt?: number;
  /** Perpendicular nudge (percent of frame) so icons on crossing lines don't collide. */
  offset?: number;
}) {
  const cv = CORE_VALUES.find((v) => v.key === value)!;
  const [x1, y1] = from;
  const [x2, y2] = to;
  const mx = x1 + (x2 - x1) * labelAt;
  const my = y1 + (y2 - y1) * labelAt;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = (-dy / len) * offset;
  const ny = (dx / len) * offset;
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className={styles.veLine} markerStart="url(#ve-arrow)" markerEnd="url(#ve-arrow)" />
      <foreignObject x={mx + nx - 3} y={my + ny - 3} width="6" height="6" className={styles.veIconBox}>
        <ValueIcon value={cv.key} color={cv.color} />
      </foreignObject>
    </>
  );
}

export default function GreenlyValueExchange() {
  const customer: [number, number] = [8, 50];
  const supplier: [number, number] = [50, 8];
  const farmer: [number, number] = [92, 50];
  const logistics: [number, number] = [50, 92];

  return (
    <Reveal>
      <div className={styles.valueExchange}>
        <div className={styles.veDiagram}>
          <svg viewBox="0 0 100 100" className={styles.veSvg}>
            <defs>
              <marker id="ve-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M1 1l7 4-7 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </marker>
            </defs>
            {/* Each pair of corners is one line; where two values flow along it, two icons
                sit well apart (near each end) rather than both near the midpoint, since
                the horizontal and vertical lines cross right through the diamond's centre. */}
            <Edge from={customer} to={supplier} value="sustainability" offset={-3} />
            <Edge from={supplier} to={farmer} value="sustainability" offset={3} />
            <Edge from={customer} to={farmer} value="transparency" labelAt={0.28} offset={-3.5} />
            <Edge from={customer} to={farmer} value="networking" labelAt={0.72} offset={-3.5} />
            <Edge from={supplier} to={logistics} value="reliability" labelAt={0.28} offset={3} />
            <Edge from={supplier} to={logistics} value="networking" labelAt={0.72} offset={-3} />
            <Edge from={logistics} to={farmer} value="reliability" labelAt={0.32} offset={3} />
            <Edge from={logistics} to={farmer} value="networking" labelAt={0.68} offset={-3} />
            <Edge from={logistics} to={customer} value="efficiency" offset={3} />
          </svg>
          <span className={`${styles.veNode} ${styles.veTop}`}>Supplier</span>
          <span className={`${styles.veNode} ${styles.veLeft}`}>Customer</span>
          <span className={`${styles.veNode} ${styles.veRight}`}>Farmer</span>
          <span className={`${styles.veNode} ${styles.veBottom}`}>Logistics</span>
        </div>
        <div className={styles.veLegend}>
          <h4>Core Values</h4>
          <ul>
            {CORE_VALUES.map((v) => (
              <li key={v.key}>
                <span className={styles.veLegendIcon}>
                  <ValueIcon value={v.key} color={v.color} />
                </span>
                <span style={{ color: v.color }}>{v.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
