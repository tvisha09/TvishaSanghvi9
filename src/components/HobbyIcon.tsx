export type HobbyKind = "trekking" | "sketching" | "crocheting" | "photography" | "sculpture" | "cad";

/**
 * Small line illustrations for the hobbies strip, in the same architectural,
 * single-weight line style as the landing cards (CardArt) and the Epoch lab
 * set: no fill, just strokes, with the odd accent dot.
 */
export default function HobbyIcon({ kind, className }: { kind: HobbyKind; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {kind === "trekking" && <Trekking />}
      {kind === "sketching" && <Sketching />}
      {kind === "crocheting" && <Crocheting />}
      {kind === "photography" && <Photography />}
      {kind === "sculpture" && <Sculpture />}
      {kind === "cad" && <Cad />}
    </svg>
  );
}

/** Two peaks with a flag at the summit, a trail switching back up the near slope. */
function Trekking() {
  return (
    <>
      <path d="M6 46 L22 18 L30 30 L40 12 L58 46 Z" />
      <path d="M40 12 L40 6 L46 8.5 L40 12" />
      <path d="M14 46 Q20 38 18 32 Q25 30 24 24" strokeDasharray="2.4 2.6" />
    </>
  );
}

/** A pencil, mid-stroke on a tilted pad, with a little swatch of shading. */
function Sketching() {
  return (
    <>
      <rect x="12" y="14" width="30" height="38" rx="2" transform="rotate(-8 27 33)" />
      <path d="M20 44 Q28 30 36 22" transform="rotate(-8 27 33)" />
      <path d="M44 42 L54 52 L48 56 L42 50 Z" />
      <path d="M50 48 L52 50" />
    </>
  );
}

/** A crochet hook mid-stitch through a looping chain, with a yarn ball. */
function Crocheting() {
  return (
    <>
      <circle cx="18" cy="42" r="9" />
      <path d="M12 38 Q18 42 24 38 M11 44 Q18 47 25 44 M14 34 Q18 38 22 48" />
      <path d="M27 38 L48 20" />
      <path d="M48 20 Q53 17 51 13 Q49 10 46 13 L44 17" />
      <path d="M30 34 Q36 30 34 24" strokeDasharray="2.2 2.4" />
    </>
  );
}

/** A camera body with a lens ring, viewfinder bump and shutter dial. */
function Photography() {
  return (
    <>
      <rect x="8" y="22" width="48" height="32" rx="4" />
      <path d="M22 22 L26 14 H38 L42 22" />
      <circle cx="32" cy="38" r="11" />
      <circle cx="32" cy="38" r="5" />
      <circle cx="47" cy="29" r="2" />
    </>
  );
}

/** A chisel shaping a rough bust on a stand, with a few carved facets. */
function Sculpture() {
  return (
    <>
      <path d="M22 54 H42 L40 46 H24 Z" />
      <path d="M26 46 Q22 32 28 22 Q32 12 40 16 Q46 20 42 30 Q46 36 38 46 Z" />
      <path d="M30 22 L34 28 M32 32 L38 34" strokeDasharray="2 2.4" />
      <path d="M48 20 L56 12" />
      <path d="M56 12 L52 10 L50 14 Z" />
    </>
  );
}

/** An isometric cube over a wireframe grid, like a modelled form taking shape. */
function Cad() {
  return (
    <>
      <path d="M8 46 L8 30 L24 22 L24 38 Z" />
      <path d="M24 38 L40 46 L40 30 L24 22" />
      <path d="M8 30 L24 22 L40 30 L24 38 L8 30" />
      <path d="M24 38 L24 22 M8 30 L24 38 L40 30" strokeDasharray="2 2.4" opacity="0.6" />
      <path d="M46 14 L58 14 M46 20 L54 20 M46 26 L58 26" />
    </>
  );
}
