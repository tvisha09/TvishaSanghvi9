import type { CSSProperties, ReactNode } from "react";
import Reveal from "../Reveal";
import { Crop, type Box } from "./Case";
import styles from "./Diagrams.module.css";

/*
 * Diagram components rebuilt from the original slides as live HTML/SVG:
 * donuts, pictograms, a stakeholder ring map, personas, layered stacks,
 * 2×2 evaluation matrices and a wall of concept sketches.
 */

/** Ring chart showing part of a whole, with the figure in the middle. */
export function Donut({ part, total, label, text }: { part: number; total: number; label?: string; text: ReactNode }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <Reveal className={styles.donut}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={r} className={styles.donutTrack} />
        <circle
          cx="50"
          cy="50"
          r={r}
          className={styles.donutValue}
          style={{ "--dash": `${(part / total) * c} ${c}` } as CSSProperties}
        />
      </svg>
      <div className={styles.donutCenter}>
        <span className={styles.donutPart}>{part}</span>
        <span className={styles.donutTotal}>{label ?? `of ${total}`}</span>
      </div>
      <p className={styles.donutText}>{text}</p>
    </Reveal>
  );
}

export function Donuts({ children }: { children: ReactNode }) {
  return <div className={styles.donuts}>{children}</div>;
}

/** One figure per person, grouped and toned by category. */
export function Pictogram({ groups }: { groups: { label: string; count: number; tone: 1 | 2 | 3 }[] }) {
  return (
    <Reveal>
      <figure className={styles.picto}>
        <div className={styles.pictoGrid} aria-hidden="true">
          {groups.flatMap((g) =>
            Array.from({ length: g.count }, (_, i) => (
              <svg key={`${g.label}-${i}`} viewBox="0 0 10 16" className={styles[`tone${g.tone}`]}>
                <circle cx="5" cy="3" r="2.6" />
                <path d="M1.2 15.5 V9.5 Q1.2 6.6 5 6.6 Q8.8 6.6 8.8 9.5 V15.5 Z" />
              </svg>
            )),
          )}
        </div>
        <figcaption className={styles.pictoLegend}>
          {groups.map((g) => (
            <span key={g.label}>
              <i className={styles[`tone${g.tone}`]} />
              {g.label} <b>{g.count}</b>
            </span>
          ))}
        </figcaption>
      </figure>
    </Reveal>
  );
}

/** Concentric stakeholder map: one ring per level, labels placed by angle. */
export function Rings({
  center,
  levels,
}: {
  center: string;
  levels: { name: string; text: string; items: { label: string; angle: number }[] }[];
}) {
  // Kept inside the box so labels on the outer ring never clip
  const radii = [19, 30, 40];
  return (
    <div className={styles.rings}>
      <Reveal className={styles.ringsMap}>
        <svg viewBox="-50 -50 100 100" aria-hidden="true">
          {radii
            .slice(0, levels.length)
            .reverse()
            .map((r, i) => (
              <circle key={r} r={r} className={styles[`ring${levels.length - i}`]} />
            ))}
          <circle r="11" className={styles.ringCore} />
          {[0, 45, 90, 135].map((a) => (
            <line
              key={a}
              x1={-48 * Math.cos((a * Math.PI) / 180)}
              y1={-48 * Math.sin((a * Math.PI) / 180)}
              x2={48 * Math.cos((a * Math.PI) / 180)}
              y2={48 * Math.sin((a * Math.PI) / 180)}
              className={styles.ringSpoke}
            />
          ))}
          {levels.flatMap((lvl, li) =>
            lvl.items.map((it) => {
              const t = (it.angle * Math.PI) / 180;
              return <circle key={it.label} cx={radii[li] * Math.cos(t)} cy={radii[li] * Math.sin(t)} r="1.4" className={styles.ringDot} />;
            }),
          )}
        </svg>
        <span className={styles.ringCenterLabel}>{center}</span>
        {levels.flatMap((lvl, li) =>
          lvl.items.map((it) => {
            const t = (it.angle * Math.PI) / 180;
            const x = 50 + radii[li] * Math.cos(t);
            const y = 50 + radii[li] * Math.sin(t);
            return (
              <span key={it.label} className={styles.ringLabel} style={{ left: `${x}%`, top: `${y}%` }}>
                {it.label}
              </span>
            );
          }),
        )}
      </Reveal>
      <ol className={styles.ringsLegend}>
        {levels.map((lvl, i) => (
          <li key={lvl.name}>
            <Reveal delay={i * 0.06}>
              <span className={`${styles.ringSwatch} ${styles[`ring${i + 1}`]}`} />
              <h3>{lvl.name}</h3>
              <p>{lvl.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

type PersonaProps = {
  name: string;
  role: string;
  quote: string;
  facts: [string, string][];
  bio: string;
  goals: string[];
  frustrations: string[];
  traits: { label: string; value: number }[];
  photo: { id: string; w: number; h: number; box: Box };
};

export function Persona(p: PersonaProps) {
  return (
    <Reveal>
      <article className={styles.persona}>
        <div className={styles.personaSide}>
          <div className={styles.personaPhoto}>
            <Crop id={p.photo.id} w={p.photo.w} h={p.photo.h} box={p.photo.box} alt={`${p.name}, persona portrait`} framed={false} />
          </div>
          <p className={styles.personaRole}>{p.role}</p>
          <h3 className={styles.personaName}>{p.name}</h3>
          <dl className={styles.personaFacts}>
            {p.facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <ul className={styles.traits}>
            {p.traits.map((t) => (
              <li key={t.label} style={{ "--v": t.value / 100 } as CSSProperties}>
                <span>{t.label}</span>
                <i />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.personaMain}>
          <p className={styles.personaQuote}>“{p.quote}”</p>
          <p className={styles.personaBio}>{p.bio}</p>
          <div className={styles.personaLists}>
            <div>
              <h4>Goals</h4>
              <ul>
                {p.goals.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Frustrations</h4>
              <ul>
                {p.frustrations.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/** Stacked isometric planes, top to bottom, each with a label and note. */
export function Layers({ items }: { items: { title: string; text: ReactNode }[] }) {
  return (
    <ol className={styles.layers}>
      {items.map((it, i) => (
        <li key={it.title} style={{ "--i": i, "--n": items.length } as CSSProperties}>
          <Reveal delay={i * 0.08} className={styles.layer}>
            <span className={styles.layerPlane} aria-hidden="true" />
            <div>
              <span className={styles.layerNum}>L{items.length - i}</span>
              <h3>{it.title}</h3>
              <div className={styles.layerText}>{it.text}</div>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

type Quadrant = "tl" | "tr" | "bl" | "br";

/**
 * 2×2 evaluation matrix. Items sit in their quadrant; the ideal quadrant is
 * inked so the survivors read at a glance.
 */
export function Matrix({
  round,
  title,
  x,
  y,
  ideal,
  items,
}: {
  round: string;
  title: string;
  x: { label: string; low: string; high: string };
  y: { label: string; low: string; high: string };
  ideal: Quadrant;
  items: Record<Quadrant, string[]>;
}) {
  const order: Quadrant[] = ["tl", "tr", "bl", "br"];
  return (
    <Reveal>
      <figure className={styles.matrix}>
        <figcaption className={styles.matrixHead}>
          <span className={styles.matrixRound}>{round}</span>
          <span className={styles.matrixTitle}>{title}</span>
        </figcaption>
        <div className={styles.matrixBody}>
          <span className={styles.matrixY}>
            <b>{y.label}</b>
            <i>
              {y.low} → {y.high}
            </i>
          </span>
          <div className={styles.matrixGrid}>
            {order.map((q) => (
              <div key={q} className={`${styles.matrixCell} ${q === ideal ? styles.matrixIdeal : ""}`}>
                {q === ideal && <span className={styles.matrixTag}>Ideal</span>}
                <ul>
                  {items[q].map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <span className={styles.matrixX}>
            <b>{x.label}</b>
            <i>
              {x.low} → {x.high}
            </i>
          </span>
        </div>
      </figure>
    </Reveal>
  );
}

/**
 * A task flow read left to right: each step is a screen (circle) or an
 * action (diamond); a step can list side branches beneath it.
 */
export function Flow({
  n,
  title,
  steps,
}: {
  n: string;
  title: string;
  steps: { label: string; kind?: "screen" | "action"; branches?: string[] }[];
}) {
  return (
    <Reveal>
      <figure className={styles.flow}>
        <figcaption className={styles.matrixHead}>
          <span className={styles.matrixRound}>Task flow {n}</span>
          <span className={styles.matrixTitle}>{title}</span>
        </figcaption>
        <ol className={styles.flowSteps}>
          {steps.map((s, i) => (
            <li key={s.label}>
              <span className={`${styles.flowNode} ${s.kind === "action" ? styles.flowAction : styles.flowScreen}`}>
                <span>{s.label}</span>
              </span>
              {s.branches && (
                <ul className={styles.flowBranches}>
                  {s.branches.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
              {i < steps.length - 1 && <span className={styles.flowArrow} aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </figure>
    </Reveal>
  );
}

/** Colour roles as tonal ramps, from the full colour down to a tint. */
export function Palette({ colors }: { colors: { role: string; hex: string }[] }) {
  return (
    <Reveal>
      <div className={styles.palette}>
        {colors.map((c) => (
          <figure key={c.role} className={styles.swatchCol}>
            {[1, 0.8, 0.6, 0.4, 0.2, 0.08].map((a) => (
              <span
                key={a}
                className={styles.swatch}
                style={{ background: `color-mix(in srgb, ${c.hex} ${a * 100}%, white)` }}
              />
            ))}
            <figcaption>
              <b>{c.role}</b>
              <span>{c.hex.toUpperCase()}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Reveal>
  );
}

/** Typeface specimen with a type scale. */
export function TypeSpecimen({
  faces,
  scale,
}: {
  faces: { role: string; name: string; family: string; weights: string[] }[];
  scale: { style: string; weight: string; size: string }[];
}) {
  return (
    <Reveal>
      <div className={styles.specimen}>
        {faces.map((f) => (
          <div key={f.name} className={styles.face}>
            <span className={styles.matrixRound}>{f.role}</span>
            <p className={styles.faceName} style={{ fontFamily: f.family }}>
              {f.name}
            </p>
            <p className={styles.faceGlyphs} style={{ fontFamily: f.family }}>
              Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0123456789
            </p>
            <ul className={styles.faceWeights}>
              {f.weights.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        ))}
        <table className={styles.scale}>
          <tbody>
            {scale.map((s) => (
              <tr key={s.style}>
                <th scope="row">{s.style}</th>
                <td>{s.weight}</td>
                <td>{s.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

/** Columns of tags, e.g. the data points each actor needs at each stage. */
export function TagColumns({
  title,
  columns,
}: {
  title?: string;
  columns: { heading: string; tags: string[] }[];
}) {
  return (
    <Reveal>
      <figure className={styles.tagCols}>
        {title && (
          <figcaption className={styles.matrixHead}>
            <span className={styles.matrixTitle}>{title}</span>
          </figcaption>
        )}
        <div className={styles.tagGrid} style={{ "--n": columns.length } as CSSProperties}>
          {columns.map((c) => (
            <div key={c.heading}>
              <h4 className={styles.tagHeading}>{c.heading}</h4>
              <ul className={styles.tags}>
                {c.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </figure>
    </Reveal>
  );
}

type TreeNode = { label: string; children?: TreeNode[] };

/** Site map: a root with branches, each branch a nested list. */
export function Tree({ root, branches }: { root: string; branches: TreeNode[] }) {
  const render = (nodes: TreeNode[]) => (
    <ul>
      {nodes.map((n) => (
        <li key={n.label}>
          <span>{n.label}</span>
          {n.children && render(n.children)}
        </li>
      ))}
    </ul>
  );
  return (
    <Reveal>
      <figure className={styles.tree}>
        <p className={styles.treeRoot}>{root}</p>
        <div className={styles.treeBranches} style={{ "--n": branches.length } as CSSProperties}>
          {branches.map((b) => (
            <div key={b.label} className={styles.treeBranch}>
              <h4>{b.label}</h4>
              {b.children && render(b.children)}
            </div>
          ))}
        </div>
      </figure>
    </Reveal>
  );
}

const OCTALYSIS = [
  "Epic meaning",
  "Empowerment",
  "Social influence",
  "Unpredictability",
  "Avoidance",
  "Scarcity",
  "Ownership",
  "Accomplishment",
];

/**
 * Octalysis radar: the eight core drives scored 0–10, as an octagon. `values`
 * follow the standard order, clockwise from Epic Meaning at the top.
 */
export function Octalysis({ title, note, values }: { title: string; note?: string; values: number[] }) {
  const R = 40;
  const pt = (i: number, r: number) => {
    const a = (-90 + i * 45) * (Math.PI / 180);
    return [r * Math.cos(a), r * Math.sin(a)];
  };
  const ring = (r: number) => OCTALYSIS.map((_, i) => pt(i, r).join(",")).join(" ");
  const shape = values.map((v, i) => pt(i, (Math.max(0, v) / 10) * R).join(",")).join(" ");
  return (
    <Reveal>
      <figure className={styles.octa}>
        <figcaption className={styles.matrixHead}>
          <span className={styles.matrixTitle}>{title}</span>
          {note && <span className={styles.matrixRound}>{note}</span>}
        </figcaption>
        <div className={styles.octaBody}>
          <svg viewBox="-62 -52 124 104" aria-hidden="true">
            {[0.25, 0.5, 0.75, 1].map((k) => (
              <polygon key={k} points={ring(R * k)} className={styles.octaGrid} />
            ))}
            {OCTALYSIS.map((_, i) => {
              const [x, y] = pt(i, R);
              return <line key={i} x1="0" y1="0" x2={x} y2={y} className={styles.octaGrid} />;
            })}
            <polygon points={shape} className={styles.octaShape} />
            {OCTALYSIS.map((label, i) => {
              const [x, y] = pt(i, R + 6);
              const anchor = Math.abs(x) < 1 ? "middle" : x > 0 ? "start" : "end";
              return (
                <text key={label} x={x} y={y + 1.5} textAnchor={anchor} className={styles.octaLabel}>
                  {label}
                </text>
              );
            })}
          </svg>
          <dl className={styles.octaScores}>
            {OCTALYSIS.map((label, i) => (
              <div key={label} className={values[i] >= 5 ? styles.octaHigh : undefined}>
                <dt>{label}</dt>
                <dd>{values[i] > 0 ? values[i] : "–"}</dd>
              </div>
            ))}
          </dl>
        </div>
      </figure>
    </Reveal>
  );
}

/** Habit loop: cue → routine → reward, read clockwise. */
export function HabitLoop({ cue, routine, reward }: { cue: string; routine: string; reward: string }) {
  const parts = [
    { k: "Cue", v: cue },
    { k: "Routine", v: routine },
    { k: "Reward", v: reward },
  ];
  return (
    <Reveal>
      <ol className={styles.loop}>
        {parts.map((p, i) => (
          <li key={p.k}>
            <span className={styles.loopKey}>
              {String(i + 1).padStart(2, "0")} {p.k}
            </span>
            <p>{p.v}</p>
            <span className={styles.loopArrow} aria-hidden="true">
              {i < parts.length - 1 ? "→" : "↺"}
            </span>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

/** Grid of concept cards: a crop of the original sketch, name and one line. */
export function ConceptWall({
  items,
}: {
  items: { n: number; name: string; text: string; sketch: { id: string; w: number; h: number; box: Box } }[];
}) {
  return (
    <ol className={styles.wall}>
      {items.map((c, i) => (
        <li key={c.n}>
          <Reveal delay={(i % 4) * 0.05} className={styles.concept}>
            <div className={styles.conceptSketch}>
              <Crop id={c.sketch.id} w={c.sketch.w} h={c.sketch.h} box={c.sketch.box} alt={`Sketch of ${c.name}`} framed={false} />
            </div>
            <span className={styles.conceptNum}>C{String(c.n).padStart(2, "0")}</span>
            <h3 className={styles.conceptName}>{c.name}</h3>
            <p className={styles.conceptText}>{c.text}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

type RatedConcept = {
  title: string;
  text: ReactNode;
  image: { id: string; w: number; h: number; box: Box; alt: string };
  ratings: { label: string; value: number }[];
  chosen?: boolean;
};

/** Concept cards side by side: an image, a name, one line and Low–High rating bars. */
export function RatedConcepts({ items }: { items: RatedConcept[] }) {
  const frame = 4 / 3;
  return (
    <ol className={styles.rated}>
      {items.map((c, i) => {
        const ratio = (c.image.box.w * c.image.w) / (c.image.box.h * c.image.h);
        // Fit the crop inside the frame: full width if it's wider, otherwise narrower and centred
        const width = ratio >= frame ? 100 : (ratio / frame) * 100;
        return (
          <li key={c.title}>
            <Reveal delay={i * 0.06} className={`${styles.ratedCard} ${c.chosen ? styles.ratedChosen : ""}`}>
              {c.chosen && <span className={styles.ratedBadge}>Chosen</span>}
              <div className={styles.ratedImage}>
                <div style={{ width: `${width}%` }}>
                  <Crop id={c.image.id} w={c.image.w} h={c.image.h} box={c.image.box} alt={c.image.alt} framed={false} />
                </div>
              </div>
              <h3 className={styles.ratedTitle}>{c.title}</h3>
              <p className={styles.ratedText}>{c.text}</p>
              <dl className={styles.ratedBars}>
                <div className={styles.ratedScale} aria-hidden="true">
                  <span />
                  <span>Low</span>
                  <span>High</span>
                </div>
                {c.ratings.map((r) => (
                  <div key={r.label} className={styles.ratedRow}>
                    <dt>{r.label}</dt>
                    <dd>
                      <span className={styles.ratedTrack} role="img" aria-label={`${Math.round(r.value * 100)}%`}>
                        <span style={{ width: `${r.value * 100}%` }} />
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Secondary research + primary research = the insight. Three stacked cards
 * joined by a "+" and a "=", so the arithmetic of how each insight was
 * reached reads at a glance, instead of as three unlabelled cards in a row.
 */
export function InsightEquation({
  secondary,
  primary,
  insight,
}: {
  secondary: { title: string; text: ReactNode };
  primary: { title: string; text: ReactNode };
  insight: { title: string; text: ReactNode };
}) {
  const parts = [
    { tag: "Secondary", ...secondary },
    { tag: "Primary", ...primary },
  ];
  return (
    <Reveal>
      <div className={styles.equation}>
        {parts.map((p, i) => (
          <div key={p.tag} className={styles.eqGroup}>
            <div className={styles.eqCard}>
              <span className={styles.eqTag}>{p.tag}</span>
              <h3 className={styles.eqTitle}>{p.title}</h3>
              <p className={styles.eqText}>{p.text}</p>
            </div>
            <span className={styles.eqOp} aria-hidden="true">
              {i === 0 ? "+" : "="}
            </span>
          </div>
        ))}
        <div className={`${styles.eqCard} ${styles.eqInsight}`}>
          <span className={styles.eqTag}>Insight</span>
          <h3 className={styles.eqTitle}>{insight.title}</h3>
          <p className={styles.eqText}>{insight.text}</p>
        </div>
      </div>
    </Reveal>
  );
}
