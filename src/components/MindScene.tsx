"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import CardArt, { type CardArtKind } from "./CardArt";
import styles from "./MindScene.module.css";

/*
 * Three-quarter view skull, drawn like an architectural section.
 * Skull outlines are authored in "reference" coordinates (a 1052 × 1200 drawing
 * facing right) and mapped into scene space mirrored, so the skull faces left.
 * The camera is the SVG viewBox, animated in JS so line weights stay constant
 * on screen while we zoom into the opening between the lifted cap and brain.
 */

// --- geometry helpers -------------------------------------------------------

type Pt = [number, number];
type Ellipse = { cx: number; cy: number; rx: number; ry: number; rot: number };

const fmt = ([x, y]: Pt) => `${x.toFixed(1)} ${y.toFixed(1)}`;

/** Map every "x y" pair in an absolute-command path through f. */
const mapPath = (d: string, f: (x: number, y: number) => Pt) =>
  d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => fmt(f(Number(x), Number(y))));

/** Reference drawing → scene space (mirrored so the face looks left). */
const ref = (d: string) => mapPath(d, (x, y) => [520 - 0.42 * x, 30 + 0.42 * y]);
const refPt = (x: number, y: number): Pt => [520 - 0.42 * x, 30 + 0.42 * y];

const ellPt = (e: Ellipse, deg: number): Pt => {
  const t = (deg * Math.PI) / 180;
  const r = (e.rot * Math.PI) / 180;
  return [
    e.cx + e.rx * Math.cos(t) * Math.cos(r) - e.ry * Math.sin(t) * Math.sin(r),
    e.cy + e.rx * Math.cos(t) * Math.sin(r) + e.ry * Math.sin(t) * Math.cos(r),
  ];
};

/** Arc from deg0 to deg1 as line segments; `move` starts a new subpath. */
const arc = (e: Ellipse, deg0: number, deg1: number, move = true, n = 56) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const p = ellPt(e, deg0 + ((deg1 - deg0) * i) / n);
    return `${i === 0 && move ? "M" : "L"} ${fmt(p)}`;
  }).join(" ");

const fullEllipse = (e: Ellipse) => `${arc(e, 0, 360)} Z`;

const hatch = (x0: number, x1: number, step: number, yTop: number, yBottom: number, lean: number) =>
  Array.from({ length: Math.ceil((x1 - x0) / step) }, (_, i) => {
    const x = x0 + i * step;
    return `M ${x} ${yBottom} L ${x + lean} ${yTop}`;
  }).join(" ");

// --- the cut -------------------------------------------------------------------

// Where the cut plane meets the forehead and the back of the head
const CUT_FRONT = refPt(975, 270);
const CUT_BACK = refPt(45, 265);

const RIM: Ellipse = {
  cx: (CUT_FRONT[0] + CUT_BACK[0]) / 2,
  cy: (CUT_FRONT[1] + CUT_BACK[1]) / 2,
  rx: Math.hypot(CUT_BACK[0] - CUT_FRONT[0], CUT_BACK[1] - CUT_FRONT[1]) / 2,
  ry: 40,
  rot: (Math.atan2(CUT_BACK[1] - CUT_FRONT[1], CUT_BACK[0] - CUT_FRONT[0]) * 180) / Math.PI,
};
const INNER: Ellipse = { ...RIM, rx: RIM.rx - 12, ry: RIM.ry - 6 };

const LIFT = { y: -230, rot: -5 };

// --- shapes ------------------------------------------------------------------

const CAP_OUTLINE = ref(
  "M 975 270 C 960 215 945 195 920 170 C 830 60 700 5 560 6 C 380 8 220 70 120 180 C 85 215 58 240 45 265",
);
const CAP_FILL = `${CAP_OUTLINE} ${arc(RIM, 0, 180, false)} Z`;

// Cranium below the cut, including the upper jaw; ends back at the forehead
const CRANIUM = ref(
  "M 45 265 C 18 350 8 470 15 560 C 25 680 60 780 130 825 C 170 850 230 860 300 845 " +
    "C 330 838 350 838 362 845 C 420 830 480 805 560 825 C 600 835 620 880 630 932 L 960 935 " +
    "C 950 890 945 840 950 803 L 990 803 C 1030 800 1050 775 1045 740 C 1040 705 1010 680 1005 660 " +
    "C 1000 640 1015 610 1035 575 C 1050 540 1055 510 1040 490 C 1000 430 985 340 975 270",
);
const CRANIUM_FILL = `${CRANIUM} ${arc(RIM, 180, 0, false)} Z`;

const MANDIBLE = ref(
  "M 340 790 C 360 800 365 830 362 845 C 380 880 400 960 420 1040 C 430 1080 450 1095 500 1110 " +
    "C 580 1130 650 1170 700 1195 C 780 1215 880 1215 940 1195 C 965 1185 968 1150 965 1120 " +
    "C 963 1090 962 1075 960 1062 L 640 1045 C 600 1000 565 930 552 860 C 550 840 556 830 566 826 " +
    "C 500 850 400 840 340 790 Z",
);
const JAW_HINGE = refPt(340, 790);

const NEAR_ORBIT = ref(
  "M 515 525 C 560 485 620 440 690 425 C 720 430 745 470 745 500 C 745 560 740 610 735 640 " +
    "C 720 665 650 690 620 690 C 580 690 545 670 525 655 C 510 620 510 570 515 525 Z",
);
const FAR_ORBIT = ref(
  "M 870 510 C 885 470 920 455 940 460 C 960 480 990 500 1005 520 C 1010 560 1005 620 995 655 " +
    "C 960 660 930 660 900 658 C 870 650 860 600 865 560 C 866 540 868 525 870 510 Z",
);
const NOSE = ref(
  "M 855 575 C 875 585 890 640 900 700 C 908 750 900 775 870 795 C 840 805 800 795 780 780 " +
    "C 768 765 770 745 778 725 C 790 700 815 640 830 610 C 838 590 845 578 855 575 Z",
);
const EAR = ref(
  "M 220 700 C 240 680 270 672 290 690 C 320 710 325 740 310 760 C 290 768 250 760 230 745 C 215 735 215 715 220 700 Z",
);
const NOTCH = ref(
  "M 390 760 C 400 750 420 755 440 770 C 470 790 495 810 500 820 C 480 830 450 835 420 825 C 395 812 382 790 390 760 Z",
);
const JAW_VOID = ref(
  "M 566 828 C 610 820 650 840 660 870 C 668 900 650 940 630 975 L 620 975 C 590 960 560 910 552 860 Z",
);

/** Teeth from the front (x = 960) to the back (x ≈ 630), narrowing with depth. */
const teeth = (upper: boolean) => {
  const n = 8;
  const weights = Array.from({ length: n }, (_, i) => 1 - i * 0.07);
  const total = weights.reduce((a, b) => a + b, 0);
  let x = 960;
  return weights.map((w, i) => {
    const b = x;
    const a = x - (330 * w) / total;
    x = a;
    const depth = i / n;
    if (upper) {
      const top = 935 - depth * 6;
      const bot = top + 55 - depth * 10;
      return ref(`M ${a} ${top} L ${a} ${bot - 10} Q ${a} ${bot} ${a + 10} ${bot} L ${b - 10} ${bot} Q ${b} ${bot} ${b} ${bot - 10} L ${b} ${top} Z`);
    }
    const gum = 1058 - depth * 16;
    const tip = 994 - depth * 4;
    return ref(`M ${a} ${gum} L ${a} ${tip + 10} Q ${a} ${tip} ${a + 10} ${tip} L ${b - 10} ${tip} Q ${b} ${tip} ${b} ${tip + 10} L ${b} ${gum} Z`);
  });
};
const UPPER_TEETH = teeth(true);
const LOWER_TEETH = teeth(false);

const BRAIN_DOME = `M ${fmt(ellPt(INNER, 180))} C 118 95 200 64 300 62 C 400 60 492 92 ${fmt(ellPt(INNER, 0))}`;
const BRAIN_FILL = `${BRAIN_DOME} ${arc(INNER, 0, 180, false)} Z`;
const BRAIN_TOP = 62;

/** Brain folds were laid out on a smaller dome; stretch them onto this one. */
const fold = (d: string) => mapPath(d, (x, y) => [123 + (x - 141) * 1.27, 62 + (y - 90) * 1.13]);

// Cut plane line, extended past the skull like a section mark
const CUT_SLOPE = (CUT_BACK[1] - CUT_FRONT[1]) / (CUT_BACK[0] - CUT_FRONT[0]);
const CUT_L: Pt = [40, CUT_FRONT[1] + CUT_SLOPE * (40 - CUT_FRONT[0])];
const CUT_R: Pt = [570, CUT_BACK[1] + CUT_SLOPE * (570 - CUT_BACK[0])];

// --- strokes -----------------------------------------------------------------

/** Stroke timings below are authored on a slower clock and compressed by this. */
const TIME = 0.5;

type Weight = "heavy" | "medium" | "light";
type Stroke = { d: string; w: Weight; delay: number; dur?: number };

const craniumStrokes: Stroke[] = [
  { d: CRANIUM, w: "heavy", delay: 0.5, dur: 1.7 },
  { d: arc(RIM, 180, 0), w: "heavy", delay: 0.6, dur: 1.2 },
  { d: NEAR_ORBIT, w: "medium", delay: 0.9 },
  { d: FAR_ORBIT, w: "medium", delay: 0.95 },
  { d: NOSE, w: "medium", delay: 1.05 },
  { d: EAR, w: "medium", delay: 1.2 },
  { d: NOTCH, w: "medium", delay: 1.25 },
  { d: ref("M 470 495 C 460 540 440 570 440 600 C 445 630 470 650 490 680"), w: "medium", delay: 1.0 },
  { d: ref("M 220 625 C 270 615 310 640 335 665 C 370 700 420 710 470 670"), w: "medium", delay: 1.1 },
  { d: ref("M 325 735 C 390 745 430 760 460 785 C 490 810 520 820 560 825"), w: "medium", delay: 1.15 },
  { d: ref("M 390 300 C 400 340 430 370 470 380 C 500 388 530 395 555 395"), w: "light", delay: 1.2 },
  { d: ref("M 555 395 C 545 420 520 440 490 450"), w: "light", delay: 1.3 },
  { d: ref("M 478 455 C 470 470 470 485 490 500"), w: "light", delay: 1.35 },
  { d: ref("M 645 385 C 680 360 720 350 750 395"), w: "light", delay: 1.3 },
  { d: ref("M 850 440 C 880 410 920 390 940 395 C 950 405 955 415 960 425"), w: "light", delay: 1.35 },
  { d: ref("M 805 440 C 812 470 812 500 810 520"), w: "light", delay: 1.4 },
  { d: ref("M 790 525 C 805 520 820 515 830 510"), w: "light", delay: 1.4 },
  { d: ref("M 740 670 C 730 700 715 720 705 725"), w: "light", delay: 1.45 },
  { d: ref("M 680 740 C 660 760 640 780 640 800"), w: "light", delay: 1.5 },
  { d: ref("M 720 795 C 705 820 690 840 690 850"), w: "light", delay: 1.5 },
  { d: ref("M 50 570 C 60 640 80 700 105 725"), w: "light", delay: 1.4 },
  { d: ref("M 210 790 C 240 785 280 800 320 810"), w: "light", delay: 1.5 },
  ...UPPER_TEETH.map((d, i) => ({ d, w: "light" as const, delay: 1.4 + i * 0.05, dur: 0.6 })),
];

const jawStrokes: Stroke[] = [
  { d: MANDIBLE, w: "heavy", delay: 0.7, dur: 1.6 },
  { d: JAW_VOID, w: "medium", delay: 1.2 },
  ...LOWER_TEETH.map((d, i) => ({ d, w: "light" as const, delay: 1.5 + i * 0.05, dur: 0.6 })),
];

const capStrokes: Stroke[] = [
  { d: CAP_OUTLINE, w: "heavy", delay: 0.5, dur: 1.4 },
  { d: arc(RIM, 180, 0), w: "heavy", delay: 0.6, dur: 1.2 },
  { d: ref("M 340 135 C 325 170 320 230 335 250 C 345 262 355 268 365 270"), w: "light", delay: 1.3 },
  { d: ref("M 600 12 C 590 90 600 180 640 262"), w: "light", delay: 1.4 },
];

const brainStrokes: Stroke[] = [
  { d: BRAIN_DOME, w: "heavy", delay: 2.9, dur: 1.1 },
  { d: "M 140 136 C 175 92 260 76 330 78 C 400 80 455 100 478 125", w: "medium", delay: 3.0, dur: 1.0 },
  ...[
    "M 190 150 C 200 160 192 172 205 180",
    "M 225 128 C 232 145 222 158 236 168 C 246 176 240 186 248 192",
    "M 268 116 C 270 134 284 140 280 156 C 276 170 290 176 288 192",
    "M 310 110 C 306 128 320 136 316 152 C 312 166 326 172 324 186",
    "M 352 114 C 352 130 364 138 360 152 C 356 164 368 170 366 180",
    "M 392 128 C 390 140 400 148 398 160 C 396 168 404 172 404 176",
    "M 200 165 C 215 158 225 166 240 160",
    "M 285 168 C 300 160 312 170 330 162",
    "M 340 140 C 352 132 366 140 380 134",
    "M 250 140 C 262 134 272 142 286 136",
    "M 200 120 C 210 112 222 116 230 108",
    "M 280 98 C 290 94 300 99 312 95",
    "M 360 104 C 372 104 380 110 392 112",
  ].map((d, i) => ({ d: fold(d), w: "light" as const, delay: 3.1 + i * 0.05, dur: 0.7 })),
];

function Lines({ strokes }: { strokes: Stroke[] }) {
  return (
    <>
      {strokes.map((s, i) => (
        <path
          key={i}
          d={s.d}
          pathLength={1}
          className={`${styles.ink} ${styles[s.w]} ${styles.draw}`}
          style={{ "--d": `${s.delay * TIME}s`, "--dur": `${(s.dur ?? 0.9) * TIME}s` } as CSSProperties}
        />
      ))}
    </>
  );
}

// --- camera ------------------------------------------------------------------

const START = { cx: 299, cy: 288, h: 600, w: 500 }; // whole skull in frame

// Lowest point of the lifted cap's underside, then the top of the brain
const capLow = (() => {
  const r = (LIFT.rot * Math.PI) / 180;
  return RIM.cy + RIM.ry * Math.cos(r) + LIFT.y;
})();
const GAP = { cx: RIM.cx, top: capLow, bottom: BRAIN_TOP };
const GAP_SHARE = 0.36; // the gap fills this much of the screen height at the end

// Milliseconds after "Access my mind"; the starfield warp (Starfield.tsx) follows T_ZOOM
const T_DRAW_END = 1300;
const T_ZOOM = [1550, 2650];

const easeInOut = (t: number) => (t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2);
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

const cards: { href: string; n: string; title: string; arc: "side" | "top"; tilt: string; art: CardArtKind }[] = [
  { href: "/about", n: "01", title: "About me", arc: "side", tilt: "-7deg", art: "eye" },
  { href: "/projects", n: "02", title: "Projects", arc: "top", tilt: "0deg", art: "stack" },
  { href: "/experience", n: "03", title: "Experience", arc: "side", tilt: "7deg", art: "peak" },
];

const transformOrigin = ([x, y]: Pt) => `${x.toFixed(1)}px ${y.toFixed(1)}px`;

export default function MindScene() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now() - (reduced ? 10_000 : 0);
    let frame = 0;

    const render = (now: number) => {
      const elapsed = now - t0;
      const { clientWidth: pw, clientHeight: ph } = svg;
      const aspect = pw / ph;

      const h0 = Math.max(START.h, START.w / aspect);
      const hf = (GAP.bottom - GAP.top) / GAP_SHARE;
      const cyf = (GAP.top + GAP.bottom) / 2;

      // Gentle push-in while drawing, then the dive into the opening
      const pre = h0 * (1.2 - 0.2 * easeOut(clamp01(elapsed / T_DRAW_END)));
      const z = easeInOut(clamp01((elapsed - T_ZOOM[0]) / (T_ZOOM[1] - T_ZOOM[0])));
      const h = pre * (hf / pre) ** z;
      // Keep the target point steady on screen as we zoom toward it
      const p = (1 - h / pre) / (1 - hf / pre);
      const cx = START.cx + (GAP.cx - START.cx) * p;
      const cy = START.cy + (cyf - START.cy) * p;
      const w = h * aspect;

      svg.setAttribute("viewBox", `${cx - w / 2} ${cy - h / 2} ${w} ${h}`);
      svg.style.setProperty("--k", String(h / ph));

      if (elapsed < T_ZOOM[1]) frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    const onResize = () => render(performance.now());
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className={styles.scene}>
      <svg
        ref={svgRef}
        className={styles.svg}
        viewBox={`${START.cx - START.w / 2} ${START.cy - START.h / 2} ${START.w} ${START.h}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        style={
          {
            "--cap-origin": transformOrigin([RIM.cx, RIM.cy]),
            "--jaw-origin": transformOrigin(JAW_HINGE),
            "--lift-y": `${LIFT.y}px`,
            "--lift-rot": `${LIFT.rot}deg`,
          } as CSSProperties
        }
      >
        <defs>
          <clipPath id="ms-cranium">
            <path d={CRANIUM_FILL} />
          </clipPath>
          <clipPath id="ms-cap">
            <path d={CAP_FILL} />
          </clipPath>
          <clipPath id="ms-inner">
            <path d={fullEllipse(INNER)} />
          </clipPath>
        </defs>

        {/* Construction lines */}
        <g className={styles.construction}>
          <path d={`M ${fmt(CUT_L)} L ${fmt(CUT_R)}`} className={styles.centerline} />
          <path d={`M ${RIM.cx} -20 L ${RIM.cx} 560`} className={styles.centerline} />
          <circle cx={RIM.cx} cy={RIM.cy} r={215} className={styles.hair} />
          {[CUT_L, CUT_R].map(([x, y]) => (
            <g key={x}>
              <circle cx={x} cy={y} r={9} className={styles.hair} />
              <text x={x} y={y + 3.2} className={styles.mark}>
                A
              </text>
            </g>
          ))}
        </g>

        {/* Cranium */}
        <path d={CRANIUM_FILL} className={styles.bone} />
        <g clipPath="url(#ms-cranium)">
          <path d={hatch(440, 530, 6, 150, 400, 22)} className={`${styles.ink} ${styles.hatch}`} />
        </g>
        <path d={EAR} className={styles.tone} />
        <path d={NOTCH} className={styles.tone} />
        <path d={NEAR_ORBIT} className={styles.void} />
        <path d={FAR_ORBIT} className={styles.void} />
        <path d={NOSE} className={styles.void} />
        {UPPER_TEETH.map((d) => (
          <path key={d} d={d} className={styles.tooth} />
        ))}
        <Lines strokes={craniumStrokes} />

        {/* Lower jaw: falls away as the camera dives in */}
        <g className={styles.jaw}>
          <path d={MANDIBLE} className={styles.bone} />
          <path d={JAW_VOID} className={styles.void} />
          {LOWER_TEETH.map((d) => (
            <path key={d} d={d} className={styles.tooth} />
          ))}
          <Lines strokes={jawStrokes} />
        </g>

        {/* The cut, the brain, then the near half of the cut in front of it */}
        <path d={`${fullEllipse(RIM)} ${fullEllipse(INNER)}`} className={styles.poche} fillRule="evenodd" />
        <path d={BRAIN_FILL} className={styles.brain} />
        <Lines strokes={brainStrokes} />
        <path d={`${arc(RIM, 180, 0)} ${arc(INNER, 0, 180, false)} Z`} className={styles.poche} />
        <path d={arc(INNER, 0, 180)} className={`${styles.ink} ${styles.light} ${styles.afterLift}`} />

        {/* Cranium cap */}
        <g className={styles.cap}>
          <path d={CAP_FILL} className={styles.bone} />
          <g clipPath="url(#ms-cap)">
            <path d={hatch(430, 530, 6, 20, 200, 18)} className={`${styles.ink} ${styles.hatch}`} />
          </g>
          <Lines strokes={capStrokes} />
          <g className={styles.underside}>
            <path d={fullEllipse(RIM)} className={styles.boneSolid} />
            <g clipPath="url(#ms-inner)">
              <path d={hatch(100, 520, 5, 90, 200, -14)} className={`${styles.ink} ${styles.hatch}`} />
            </g>
            <path d={`${fullEllipse(RIM)} ${fullEllipse(INNER)}`} className={styles.pocheSolid} fillRule="evenodd" />
            <path d={fullEllipse(RIM)} className={`${styles.ink} ${styles.heavy}`} />
            <path d={fullEllipse(INNER)} className={`${styles.ink} ${styles.light}`} />
          </g>
        </g>
      </svg>

      <nav className={styles.cards} aria-label="Sections">
        {cards.map((c, i) => (
          <Link
            key={c.href}
            href={c.href}
            className={`${styles.card} ${c.arc === "side" ? styles.side : ""}`}
            style={{ "--d": `${2.4 + i * 0.08}s`, "--tilt": c.tilt } as CSSProperties}
          >
            <span className={styles.cardTop}>
              <span className={styles.cardNum}>{c.n}</span>
              <span className={styles.cardArrow} aria-hidden="true">
                →
              </span>
            </span>
            <span className={styles.cardArt}>
              <CardArt kind={c.art} />
            </span>
            <span className={styles.cardTitle}>{c.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
