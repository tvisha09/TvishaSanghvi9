import styles from "./CardArt.module.css";

export type CardArtKind = "eye" | "stack" | "peak";

/*
 * Minimal line illustrations for the three home cards. Each has a resting
 * state and a hover state, driven by the card link's :hover in the CSS:
 *   eye   – a closed eye that opens and looks around (About me)
 *   stack – a stack of frames that fans out (Projects)
 *   peak  – a mountain whose trail draws to the summit as a flag rises (Experience)
 */
export default function CardArt({ kind }: { kind: CardArtKind }) {
  return (
    <svg className={styles.art} viewBox="0 0 120 90" aria-hidden="true">
      {kind === "eye" && <Eye />}
      {kind === "stack" && <Stack />}
      {kind === "peak" && <Peak />}
    </svg>
  );
}

function Eye() {
  return (
    <>
      <g className={styles.eyeClosed}>
        <path d="M18 44 Q60 68 102 44" />
        <path d="M34 53 L30 61 M47 57 L45 66 M60 58.5 L60 68 M73 57 L75 66 M86 53 L90 61" />
      </g>
      <g className={styles.eyeOpen}>
        <path d="M18 44 Q60 8 102 44 Q60 80 18 44 Z" className={styles.paper} />
        <g className={styles.iris}>
          <circle cx="60" cy="44" r="14" />
          <circle cx="60" cy="44" r="5.5" className={styles.ink} />
          <circle cx="64.5" cy="39.5" r="2" className={styles.paperDot} />
        </g>
      </g>
    </>
  );
}

function Stack() {
  return (
    <>
      <g className={`${styles.sheet} ${styles.sheetBack}`}>
        <rect x="30" y="22" width="60" height="44" className={styles.paper} />
      </g>
      <g className={`${styles.sheet} ${styles.sheetMid}`}>
        <rect x="30" y="22" width="60" height="44" className={styles.paper} />
        <path d="M38 32 H70 M38 39 H62" className={styles.thin} />
      </g>
      <g className={`${styles.sheet} ${styles.sheetFront}`}>
        <rect x="30" y="22" width="60" height="44" className={styles.paper} />
        <circle cx="74" cy="33" r="4" />
        <path d="M36 60 L50 44 L59 53 L66 47 L84 60" />
      </g>
    </>
  );
}

function Peak() {
  return (
    <>
      <circle cx="26" cy="26" r="6" className={styles.sun} />
      <path d="M8 78 L40 36 L54 52 L74 22 L112 78" />
      <path d="M4 78 H116" className={styles.thin} />
      {/* Dotted trail at rest; a solid line draws over it on hover */}
      <path d="M30 78 Q46 68 52 60 Q60 50 66 40 Q70 31 74 22" className={styles.trail} />
      <path d="M30 78 Q46 68 52 60 Q60 50 66 40 Q70 31 74 22" className={styles.trailDrawn} pathLength={1} />
      <g className={styles.flag}>
        <path d="M74 22 V7" />
        <path d="M74 7 L87 10.5 L74 14 Z" className={styles.ink} />
      </g>
    </>
  );
}
