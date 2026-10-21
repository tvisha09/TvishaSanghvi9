import type { ReactNode } from "react";
import styles from "./searaksha.module.css";

/*
 * Floating illustrations for SeaRaksha, drawn as live SVG in the deck's flat
 * style: fishermen, boats, nets and divers on a pale-teal sea. Each sits in
 * a chapter's sticky header and fades out at the edges so it floats on the
 * page. Waves roll, boats bob, fish leap and bubbles rise.
 */

export type SceneName = "line" | "net" | "basket" | "divers" | "cast";

const W = 1200;
const H = 400;

const c = {
  skin: "#c08a62",
  hair: "#2b2b2b",
  green: "#9cc56a",
  leaf: "#6aa86b",
  pale: "#c8d98a",
  teal: "#3f7f86",
  deep: "#2f6b74",
  deeper: "#24545c",
  wood: "#a8774d",
  woodDark: "#8a5f3b",
  dark: "#2b3a3a",
  sun: "#f6e07f",
  cloud: "#e2edef",
  sea1: "#dbe9eb",
  sea2: "#c2d8dc",
  sea3: "#a7c8cd",
};

/** A sine-like wave twice the scene's width, so it can scroll seamlessly. */
function wavePath(y: number, amp: number, len = 200) {
  let d = `M0 ${y}`;
  for (let x = 0; x < W * 2; x += len) d += ` q ${len / 4} ${-amp} ${len / 2} 0 q ${len / 4} ${amp} ${len / 2} 0`;
  return `${d} V ${H} H 0 Z`;
}

function Wave({ y, amp, fill, speed }: { y: number; amp: number; fill: string; speed: 1 | 2 | 3 }) {
  return <path d={wavePath(y, amp)} fill={fill} className={styles[`drift${speed}`]} />;
}

function Cloud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g className={styles.cloud}>
      <g transform={`translate(${x} ${y}) scale(${s})`} fill={c.cloud}>
        <ellipse cx="0" cy="0" rx="46" ry="22" />
        <ellipse cx="38" cy="-14" rx="34" ry="26" />
        <ellipse cx="78" cy="2" rx="40" ry="20" />
        <rect x="-30" y="0" width="140" height="20" rx="10" />
      </g>
    </g>
  );
}

/** A small fish, facing left. */
function Fish({ x, y, s = 1, fill = c.deep, flip = false }: { x: number; y: number; s?: number; fill?: string; flip?: boolean }) {
  return (
    <path
      d="M-14 0 Q-4 -8 8 -3 L16 -8 L14 0 L16 8 L8 3 Q-4 8 -14 0 Z"
      fill={fill}
      transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}
    />
  );
}

/** Arms and rope as round-capped strokes. */
function Limb({ d, w = 10, color = c.skin }: { d: string; w?: number; color?: string }) {
  return <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />;
}

function Seaweed({ x, y, h = 70 }: { x: number; y: number; h?: number }) {
  return (
    <g className={styles.sway}>
      <path
        d={`M${x} ${y} q -14 ${-h * 0.3} 0 ${-h * 0.55} q 14 ${-h * 0.25} 0 ${-h * 0.45}`}
        fill="none"
        stroke={c.deep}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d={`M${x + 12} ${y} q 12 ${-h * 0.25} 0 ${-h * 0.45} q -10 ${-h * 0.2} 2 ${-h * 0.35}`}
        fill="none"
        stroke={c.teal}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  );
}

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={`${id}-mesh`} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <path d="M0 0H12M0 0V12" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.4" />
      </pattern>
      <pattern id={`${id}-meshDark`} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <path d="M0 0H12M0 0V12" stroke={c.deep} strokeOpacity="0.5" strokeWidth="1.2" />
      </pattern>
      {/* Soft edges, so the scene dissolves into the page */}
      <radialGradient id={`${id}-fade`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0.62" stopColor="#fff" />
        <stop offset="1" stopColor="#000" />
      </radialGradient>
    </defs>
  );
}

/* ---------- Scenes ---------- */

/** A fisherman in a bucket hat, sitting in a long boat, fishing with a line. */
function LineScene() {
  return (
    <>
      <circle cx="640" cy="262" r="92" fill={c.sun} />
      <Cloud x={520} y={90} s={1.1} />
      <Cloud x={1010} y={70} s={0.8} />
      <Wave y={232} amp={10} fill={c.sea1} speed={1} />
      <Wave y={252} amp={12} fill={c.sea2} speed={2} />
      <g className={styles.leap}>
        <Fish x={700} y={238} s={1.6} fill={c.teal} />
      </g>
      <g className={styles.bob}>
        <g transform="translate(110 186)">
          {/* Line from rod tip into the water */}
          <path d="M330 -72 Q470 -70 560 64" fill="none" stroke={c.dark} strokeOpacity="0.7" strokeWidth="1.4" />
          <path
            d="M10 50 L430 50 Q470 40 495 -6 L506 -1 Q492 60 440 86 L42 86 Q14 80 10 50 Z"
            fill={c.deep}
          />
          <path d="M14 56 L436 56 Q468 46 490 10" fill="none" stroke={c.teal} strokeWidth="6" />
          {/* Fisherman */}
          <path d="M190 52 Q236 18 262 46 L258 54 Z" fill={c.dark} />
          <path d="M150 54 L160 -20 Q182 -32 206 -18 L214 54 Z" fill={c.green} />
          <Limb d="M198 -14 Q226 6 252 -2" />
          <Limb d="M166 -10 Q214 14 248 6" />
          <path d="M250 0 L332 -72" stroke="#3a2a1a" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="182" cy="-44" r="18" fill={c.skin} />
          <ellipse cx="182" cy="-58" rx="31" ry="6.5" fill={c.pale} />
          <path d="M165 -58 Q167 -82 182 -82 Q197 -82 199 -58 Z" fill={c.pale} />
          <path d="M165 -60 H199" stroke={c.leaf} strokeWidth="3" />
        </g>
      </g>
      <Wave y={274} amp={9} fill={c.sea3} speed={3} />
    </>
  );
}

/** A fisherman standing in a green boat, hauling a heavy net aboard. */
function NetScene({ id }: { id: string }) {
  return (
    <>
      <Cloud x={600} y={110} s={1.2} />
      <Cloud x={960} y={150} s={0.9} />
      <Wave y={226} amp={10} fill={c.sea1} speed={1} />
      <Wave y={246} amp={12} fill={c.sea2} speed={2} />
      <g className={styles.bob}>
        <g transform="translate(120 180)">
          {/* Net hanging over the side into the water */}
          <path d="M110 -112 L152 -98 L178 40 L126 104 L28 108 L-24 66 L56 -56 Z" fill={c.deep} />
          <path d="M110 -112 L152 -98 L178 40 L126 104 L28 108 L-24 66 L56 -56 Z" fill={`url(#${id}-mesh)`} />
          <path
            d="M-12 -16 L4 -12 Q30 20 62 22 L384 22 Q396 24 398 42 L380 82 L62 82 Q16 72 -12 -16 Z"
            fill={c.leaf}
          />
          <path d="M4 -12 Q30 20 62 22 L384 22" fill="none" stroke="#4c8a4f" strokeWidth="7" />
          {/* Fisherman, leaning back against the weight */}
          <path d="M226 22 L232 -54 L264 -54 L268 22 Z" fill={c.dark} />
          <path d="M228 -50 L224 -124 Q246 -138 268 -126 L270 -50 Z" fill={c.green} />
          <Limb d="M234 -116 Q184 -122 118 -108" />
          <Limb d="M262 -110 Q194 -100 124 -96" />
          <circle cx="250" cy="-148" r="17" fill={c.skin} />
          <path d="M233 -150 Q236 -168 252 -167 Q268 -166 268 -150 Q256 -158 233 -150 Z" fill={c.hair} />
        </g>
      </g>
      <Wave y={270} amp={9} fill={c.sea3} speed={3} />
      <Seaweed x={1110} y={400} h={110} />
      <Seaweed x={1150} y={400} h={80} />
    </>
  );
}

/** A fisherman in waders leaning over a round basket of fish. */
function BasketScene() {
  return (
    <>
      <Cloud x={70} y={80} s={0.9} />
      <Cloud x={640} y={120} s={1.1} />
      <Wave y={240} amp={10} fill={c.sea1} speed={1} />
      <Wave y={262} amp={12} fill={c.sea2} speed={2} />
      <g className={styles.bob}>
        {/* Fisherman behind the basket */}
        <path d="M248 300 L242 190 Q276 168 312 182 L332 300 Z" fill={c.teal} />
        <path d="M262 300 L265 226 L318 226 L324 300 Z" fill="#8fb7bf" />
        <path d="M268 228 L256 188 M314 228 L304 184" stroke={c.dark} strokeWidth="5" strokeLinecap="round" />
        <Limb d="M252 196 Q236 240 252 288" />
        <Limb d="M308 192 Q336 236 328 284" />
        <circle cx="282" cy="160" r="19" fill={c.skin} />
        <ellipse cx="282" cy="146" rx="33" ry="7" fill="#4d808d" />
        <path d="M264 146 Q266 122 282 122 Q298 122 300 146 Z" fill="#4d808d" />
        {/* Basket of fish */}
        <ellipse cx="290" cy="298" rx="162" ry="38" fill={c.deep} />
        <ellipse cx="290" cy="290" rx="146" ry="26" fill={c.deeper} />
        <ellipse cx="290" cy="290" rx="146" ry="26" fill="none" stroke={c.pale} strokeWidth="3" />
        <Fish x={232} y={290} s={1.5} fill={c.pale} />
        <Fish x={318} y={286} s={1.4} fill={c.pale} flip />
        <Fish x={282} y={296} s={1.2} fill="#b5c77a" />
      </g>
      <Wave y={318} amp={8} fill={c.sea3} speed={3} />
      <g className={styles.swim}>
        <Fish x={210} y={352} s={1.2} fill={c.pale} />
        <Fish x={268} y={366} s={1} fill="#b5c77a" flip />
        <Fish x={330} y={350} s={1.3} fill={c.pale} />
        <Fish x={392} y={370} s={1} fill="#b5c77a" />
      </g>
    </>
  );
}

/** Two divers below the surface, among fish and rising bubbles. */
function DiversScene() {
  const bubbles = (x: number, y: number) =>
    [0, 1, 2].map((i) => (
      <circle
        key={i}
        cx={x + i * 6}
        cy={y}
        r={3 + i * 1.5}
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        className={styles.bubble}
        style={{ animationDelay: `${i * 0.9}s` }}
      />
    ));
  return (
    <>
      <Cloud x={800} y={70} s={1} />
      <Wave y={128} amp={10} fill={c.sea1} speed={1} />
      <Wave y={146} amp={12} fill={c.sea2} speed={2} />
      {/* Light falling through the water */}
      <path d="M520 150 L600 150 L520 400 L380 400 Z M760 150 L820 150 L820 400 L700 400 Z" fill="#ffffff" opacity="0.18" />
      <rect y="260" width={W} height="140" fill={c.sea3} opacity="0.35" />
      <g className={styles.swim}>
        <Fish x={160} y={300} fill={c.teal} />
        <Fish x={190} y={318} s={0.8} fill={c.teal} />
        <Fish x={140} y={330} s={0.9} fill={c.teal} />
        <Fish x={1080} y={250} fill="#7d9ea3" />
        <Fish x={1110} y={268} s={0.8} fill="#7d9ea3" />
        <Fish x={1060} y={284} s={0.9} fill="#7d9ea3" />
      </g>
      {/* Diver in a green shirt, trailing a line */}
      <g className={styles.glide}>
        <g transform="translate(560 300) rotate(-6)">
          <path d="M-52 -18 L-230 34" stroke={c.leaf} strokeWidth="2" />
          <Limb d="M18 -4 Q-14 -16 -52 -18" />
          <path d="M12 -14 L92 -12 L96 14 L10 14 Z" fill={c.green} />
          <path d="M92 -12 L126 -8 L126 16 L96 14 Z" fill="#2e4078" />
          <Limb d="M124 -2 L184 -8" w={11} />
          <Limb d="M124 10 L180 22" w={11} />
          <path d="M182 -10 L232 -30 L226 -2 Z M178 20 L230 14 L214 40 Z" fill={c.dark} />
          <circle cx="0" cy="0" r="16" fill={c.skin} />
          <rect x="-16" y="-7" width="18" height="11" rx="3" fill={c.dark} />
          <rect x="-13" y="-5" width="12" height="7" rx="2" fill="#a4eafc" />
          <path d="M6 -14 L10 -34" stroke={c.dark} strokeWidth="3" strokeLinecap="round" />
        </g>
        {bubbles(566, 262)}
      </g>
      {/* Diver in a teal wetsuit, holding a long pole */}
      <g className={styles.glide} style={{ animationDelay: "-2s" }}>
        <g transform="translate(900 236) rotate(24)">
          <path d="M-10 6 L200 96" stroke={c.dark} strokeWidth="3" />
          <path d="M8 -14 L90 -14 L94 14 L6 14 Z" fill={c.teal} />
          <Limb d="M14 2 Q30 22 60 30" color={c.teal} w={11} />
          <Limb d="M92 -4 L150 -16" w={11} color={c.teal} />
          <Limb d="M92 8 L148 16" w={11} color={c.teal} />
          <path d="M148 -18 L196 -40 L192 -10 Z M146 14 L196 6 L182 34 Z" fill={c.dark} />
          <circle cx="0" cy="0" r="16" fill={c.skin} />
          <path d="M-14 -6 Q0 -22 14 -8 L12 -2 Q0 -14 -12 0 Z" fill={c.hair} />
          <rect x="-16" y="-4" width="18" height="10" rx="3" fill={c.dark} />
          <rect x="-13" y="-2" width="12" height="6" rx="2" fill="#a4eafc" />
        </g>
        {bubbles(888, 210)}
      </g>
      <Seaweed x={60} y={400} h={100} />
      <Seaweed x={1170} y={400} h={90} />
    </>
  );
}

/** A fisherman in a turban, standing in a wooden rowboat, casting a wide net. */
function CastScene({ id }: { id: string }) {
  return (
    <>
      <circle cx="1120" cy="250" r="64" fill={c.sun} />
      <Cloud x={680} y={80} s={1} />
      <Wave y={236} amp={10} fill={c.sea1} speed={1} />
      <Wave y={256} amp={12} fill={c.sea2} speed={2} />
      <g className={styles.cast}>
        <path d="M886 46 Q760 -4 604 70 Q612 190 706 262 Q808 176 886 46 Z" fill="#ffffff" opacity="0.6" />
        <path d="M886 46 Q760 -4 604 70 Q612 190 706 262 Q808 176 886 46 Z" fill={`url(#${id}-meshDark)`} />
        <path d="M604 70 Q612 190 706 262" fill="none" stroke={c.deep} strokeOpacity="0.6" strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" />
      </g>
      <g className={styles.bob}>
        <g transform="translate(840 200)">
          <path d="M200 8 L262 92" stroke={c.woodDark} strokeWidth="5" strokeLinecap="round" />
          <path d="M0 30 L250 30 Q240 76 200 86 L40 86 Q8 72 0 30 Z" fill={c.wood} />
          <path d="M8 46 H244 M18 62 H234" stroke={c.woodDark} strokeWidth="2.5" />
          {/* Fisherman */}
          <path d="M96 30 L100 -50 L130 -50 L134 30 Z" fill={c.green} />
          <path d="M96 -46 L98 -116 Q118 -128 138 -116 L134 -46 Z" fill={c.teal} />
          <Limb d="M104 -110 Q74 -140 46 -152" />
          <Limb d="M130 -108 Q92 -150 56 -160" />
          <circle cx="118" cy="-138" r="16" fill={c.skin} />
          <path d="M100 -144 Q102 -166 120 -166 Q138 -166 136 -146 Q120 -152 100 -144 Z" fill={c.leaf} />
        </g>
      </g>
      <Wave y={278} amp={9} fill={c.sea3} speed={3} />
    </>
  );
}

const scenes: Record<SceneName, { art: (p: { id: string }) => ReactNode; view: [number, number, number, number] }> = {
  line: { art: LineScene, view: [90, 120, 680, 250] },
  net: { art: NetScene, view: [50, 10, 540, 340] },
  basket: { art: BasketScene, view: [90, 100, 400, 290] },
  divers: { art: DiversScene, view: [380, 120, 780, 270] },
  cast: { art: CastScene, view: [580, 20, 620, 330] },
};

/** One floating illustration, with its own patch of sea. */
export default function SeaArt({ scene, title }: { scene: SceneName; title: string }) {
  const id = `sea-${scene}`;
  const { art: Art, view } = scenes[scene];
  const [x, y, w, h] = view;
  return (
    <svg className={styles.art} viewBox={view.join(" ")} role="img" aria-label={title}>
      <Defs id={id} />
      <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x={x} y={y} width={w} height={h}>
        <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-fade)`} />
      </mask>
      <g mask={`url(#${id}-mask)`}>
        <Art id={id} />
      </g>
    </svg>
  );
}
