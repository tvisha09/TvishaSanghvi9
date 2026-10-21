/*
 * Wastonic's bin, redrawn as live SVG in its own style: a dark charcoal
 * tower with a glowing green rim and recycle mark, matching the deck's own
 * annotated product render.
 */
import styles from "./wastonic.module.css";

export default function WastonicBin({ className }: { className?: string }) {
  return (
    <svg className={`${styles.bin} ${className ?? ""}`} viewBox="0 0 200 320" fill="none" aria-hidden="true">
      {/* Banner poster, tilted back */}
      <path d="M58 16l84-10 6 46-90 8z" fill="#eef3ea" stroke="#1a1a1a" strokeWidth="2" />
      <rect x="68" y="18" width="64" height="4" rx="2" fill="#70c090" />
      <rect x="68" y="27" width="48" height="3" rx="1.5" fill="#9aa39a" />
      <rect x="68" y="34" width="54" height="3" rx="1.5" fill="#9aa39a" />

      {/* Bin body */}
      <path d="M36 72h128l-8 216a10 10 0 0 1-10 9H54a10 10 0 0 1-10-9z" fill="#202024" />
      <path d="M36 72h128l-2 20H38z" fill="#2c2c30" />

      {/* Glowing rim at the lid seam */}
      <path d="M34 72h132" stroke="#70c090" strokeWidth="4" strokeLinecap="round" className={styles.binGlow} />

      {/* Screen on the lid */}
      <rect x="78" y="80" width="44" height="26" rx="3" fill="#101012" stroke="#70c090" strokeWidth="1.5" />
      <rect x="84" y="88" width="32" height="4" rx="2" fill="#70c090" opacity="0.8" />
      <rect x="84" y="96" width="20" height="3" rx="1.5" fill="#70c090" opacity="0.5" />

      {/* WASTONIC wordmark */}
      <text x="100" y="150" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontWeight="700" fontSize="15" letterSpacing="1" fill="#f3f3f0">
        WASTONIC
      </text>

      {/* Recycle mark */}
      <g transform="translate(100 185)" stroke="#f3f3f0" strokeWidth="2.5" strokeLinejoin="round" fill="none">
        <path d="M0 -22l9 15h-18z" />
        <path d="M-19 11l9-16 9 16z" transform="rotate(120)" />
        <path d="M-19 11l9-16 9 16z" transform="rotate(240)" />
      </g>

      {/* Kabadiwala access door */}
      <rect x="48" y="220" width="30" height="56" rx="4" stroke="#70c090" strokeWidth="1.5" opacity="0.7" />
      <circle cx="73" cy="248" r="2" fill="#70c090" opacity="0.7" />

      {/* Society sticker */}
      <circle cx="140" cy="235" r="16" fill="#2c2c30" stroke="#70c090" strokeWidth="1.5" />
      <path d="M133 235h14M140 228v14" stroke="#70c090" strokeWidth="1.5" />

      {/* Caster wheels */}
      <circle cx="60" cy="300" r="10" fill="#101012" stroke="#f3f3f0" strokeWidth="2" />
      <circle cx="140" cy="300" r="10" fill="#101012" stroke="#f3f3f0" strokeWidth="2" />
    </svg>
  );
}
