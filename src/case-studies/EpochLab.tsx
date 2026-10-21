/*
 * Epoch's lab-equipment illustration, redrawn as live SVG in the deck's own
 * line style: a retort stand holding a conical flask of amber liquid, a
 * round-bottom flask of light-blue liquid over a Bunsen burner, and a rack
 * of three test tubes, with lilac sparkle dots rising like vapour.
 */
import styles from "./epoch.module.css";

export default function EpochLab({ className }: { className?: string }) {
  const ink = "#2a2a2a";
  return (
    <svg className={`${styles.lab} ${className ?? ""}`} viewBox="0 0 300 260" fill="none" aria-hidden="true">
      {/* Rising sparkle dots */}
      <g className={styles.labVapour} fill="#b89cf0">
        <circle cx="238" cy="30" r="4" />
        <circle cx="256" cy="14" r="3" />
        <circle cx="222" cy="12" r="2.5" />
        <circle cx="266" cy="44" r="2.5" />
        <circle cx="248" cy="58" r="3.5" />
        <circle cx="212" cy="34" r="2" />
        <path d="M274 70l4 4-4 4-4-4z" />
        <path d="M232 76l3 3-3 3-3-3z" />
      </g>

      {/* Retort stand: base, post, clamp arm */}
      <path d="M24 240h56" stroke={ink} strokeWidth="4" strokeLinecap="round" />
      <path d="M52 240V60" stroke={ink} strokeWidth="4" strokeLinecap="round" />
      <path d="M52 92h38" stroke={ink} strokeWidth="4" strokeLinecap="round" />
      <circle cx="52" cy="60" r="4" fill={ink} />

      {/* Conical (Erlenmeyer) flask, amber liquid, hanging from the clamp */}
      <path
        d="M78 92v26l-14 40a8 8 0 0 0 7.5 11h33a8 8 0 0 0 7.5-11l-14-40V92z"
        stroke={ink}
        strokeWidth="3.5"
        fill="#fff"
      />
      <path d="M69 142h41" stroke={ink} strokeWidth="3" />
      <path d="M70.5 146.5l-6.5 18.5a8 8 0 0 0 7.5 11h33a8 8 0 0 0 7.5-11l-6.5-18.5z" fill="#f4b94c" />
      <path d="M74 90h22" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />

      {/* Round-bottom flask with light-blue liquid, over the burner */}
      <circle cx="158" cy="178" r="34" stroke={ink} strokeWidth="3.5" fill="#fff" />
      <path d="M146 118v24M170 118v24" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M144 118h28" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M130 190a28 28 0 0 0 56 0z" fill="#bfe3f2" />

      {/* Bunsen burner stand and flame */}
      <path d="M138 240h40" stroke={ink} strokeWidth="4" strokeLinecap="round" />
      <path d="M158 240v-18" stroke={ink} strokeWidth="4" strokeLinecap="round" />
      <path d="M148 222h20l-4 10h-12z" fill="#fff" stroke={ink} strokeWidth="3" />
      <path
        d="M158 196c-7 8-9 15-5 21 1-4 3-6 5-7 2 3 1 7-1 10 7-2 11-9 7-17-1 3-2 4-3 4 1-5-1-8-3-11z"
        fill="#f4b94c"
      />

      {/* Test-tube rack with three tubes: cream, blue, cream */}
      <path d="M206 232h70" stroke={ink} strokeWidth="4" strokeLinecap="round" />
      <path d="M212 232v-14h58v14" stroke={ink} strokeWidth="3.5" />
      <g strokeWidth="3" stroke={ink}>
        <path d="M218 218v-82a7 7 0 0 1 14 0v82" fill="#fff" />
        <path d="M234 218v-82a7 7 0 0 1 14 0v82" fill="#fff" />
        <path d="M250 218v-82a7 7 0 0 1 14 0v82" fill="#fff" />
      </g>
      <path d="M219 170a6.5 6.5 0 0 0 6 7h3a6.5 6.5 0 0 0 6-7v38h-15z" fill="#f1e3b8" />
      <path d="M235 150a6.5 6.5 0 0 0 6 7h3a6.5 6.5 0 0 0 6-7v58h-15z" fill="#bfe3f2" />
      <path d="M251 182a6.5 6.5 0 0 0 6 7h3a6.5 6.5 0 0 0 6-7v26h-15z" fill="#f1e3b8" />
    </svg>
  );
}
