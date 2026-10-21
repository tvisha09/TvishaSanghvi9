/**
 * Epoch's wordmark, redrawn as vector: a blocky italic "EPOCH" in mint
 * green with its crimson drop-shadow offset behind it, as on the deck's own
 * "Introducing... Epoch" slide.
 */
export default function EpochLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 420 110" aria-label="Epoch">
      <g transform="skewX(-9)">
        <text
          x="14"
          y="80"
          fontFamily="var(--font-block), sans-serif"
          fontSize="76"
          fill="#b82840"
        >
          EPOCH
        </text>
        <text
          x="8"
          y="74"
          fontFamily="var(--font-block), sans-serif"
          fontSize="76"
          fill="#90d880"
        >
          EPOCH
        </text>
      </g>
    </svg>
  );
}
