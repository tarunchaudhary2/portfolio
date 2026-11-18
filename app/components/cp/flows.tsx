"use client";
import { useEffect, useRef, useState } from "react";
import { ICX } from "./icons";
import type { Flow, Kind, Step } from "@/app/lib/portfolio";

type P = { steps: Step[]; kind: Kind; center?: string };

const Ico = ({ name, k }: { name: string; k: string }) => (
  <svg className={`ix k-${k}`} viewBox="0 0 32 32" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICX[name] || "" }} />
);

// Cycles through steps; pauses while hovered; click jumps to a step.
function useCycle(n: number, ms = 2600) {
  const [at, setAt] = useState(0);
  const [hold, setHold] = useState(false);
  useEffect(() => {
    if (hold || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setAt((a) => (a + 1) % n), ms);
    return () => clearInterval(id);
  }, [hold, n, ms]);
  return { at, setAt, hover: { onMouseEnter: () => setHold(true), onMouseLeave: () => setHold(false) } };
}

const num = (i: number) => String(i + 1).padStart(2, "0");
const Cap = ({ s, i }: { s: Step; i: number }) => <p className="f-cap" key={i}><b>{num(i)} · {s.label}</b>{s.detail}</p>;

/* 1. rail: horizontal track, packet runs into the active step */
function Rail({ steps, kind }: P) {
  const { at, setAt, hover } = useCycle(steps.length);
  return (
    <div className="flowbox f-rail" {...hover}>
      <div className="fr-row">
        {steps.map((x, i) => (
          <div key={x.label} className={`fr-cell${i < at ? " done" : ""}${i === at ? " on" : ""}`}>
            {i > 0 && <i className="fr-link"><b /></i>}
            <button className="fr-node" onClick={() => setAt(i)} aria-label={`Step ${i + 1}: ${x.label}`}>
              <span className="fr-ic"><Ico name={x.icon} k={i <= at ? kind : "n"} /></span><span className="fr-lbl">{x.label}</span>
            </button>
          </div>
        ))}
      </div>
      <Cap s={steps[at]} i={at} />
    </div>
  );
}

/* 2. orbit: steps ride a ring, the active one swings to the top */
function Orbit({ steps, kind }: P) {
  const { at, setAt, hover } = useCycle(steps.length);
  const n = steps.length, rot = (-360 / n) * at;
  return (
    <div className="flowbox f-orbit" {...hover}>
      <div className="fo-stage">
        <div className="fo-ring" style={{ transform: `rotate(${rot}deg)` }}>
          {steps.map((x, i) => {
            const a = (360 / n) * i;
            return (
              <button key={x.label} className={`fo-node${i === at ? " on" : ""}`} onClick={() => setAt(i)} aria-label={`Step ${i + 1}: ${x.label}`}
                style={{ transform: `rotate(${a}deg) translateY(calc(-1 * var(--or))) rotate(${-a - rot}deg)` }}>
                <Ico name={x.icon} k={i === at ? kind : "n"} />
              </button>
            );
          })}
        </div>
        <div className="fo-core" key={at}><b>{num(at)}</b><span>{steps[at].label}</span></div>
      </div>
      <p className="f-cap" key={"c" + at}>{steps[at].detail}</p>
    </div>
  );
}

/* 3. snake: a winding path; a comet travels the segment into the active step */
function Snake({ steps, kind }: P) {
  const { at, setAt, hover } = useCycle(steps.length);
  const n = steps.length, W = 520, H = 130;
  const pts = steps.map((_, i) => ({ x: 34 + (i * (W - 68)) / (n - 1), y: i % 2 ? 98 : 34 }));
  const seg = (i: number) => { const a = pts[i - 1], b = pts[i], m = (a.x + b.x) / 2; return `M${a.x} ${a.y} C ${m} ${a.y}, ${m} ${b.y}, ${b.x} ${b.y}`; };
  const mot = useRef<SVGAnimateMotionElement>(null);
  useEffect(() => { try { mot.current?.beginElement(); } catch { /* SMIL unsupported */ } }, [at]);
  return (
    <div className="flowbox f-snake" {...hover}>
      <div className="fs-stage">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          {pts.slice(1).map((_, k) => <path key={k} d={seg(k + 1)} className={k + 1 <= at ? "lit" : ""} vectorEffect="non-scaling-stroke" />)}
          {at > 0 && (
            <circle r="5" className="fs-comet" key={at}>
              <animateMotion ref={mot} dur="1.1s" begin="indefinite" fill="freeze" path={seg(at)} />
            </circle>
          )}
        </svg>
        {steps.map((x, i) => (
          <button key={x.label} className={`fs-node${i === at ? " on" : ""}${i < at ? " done" : ""}`} onClick={() => setAt(i)} aria-label={`Step ${i + 1}: ${x.label}`}
            style={{ left: `${(pts[i].x / W) * 100}%`, top: `${(pts[i].y / H) * 100}%` }}>
            <Ico name={x.icon} k={i <= at ? kind : "n"} /><span>{x.label}</span>
          </button>
        ))}
      </div>
      <Cap s={steps[at]} i={at} />
    </div>
  );
}

/* 4. terminal: one command at a time; finished steps collapse into a tick line */
function Terminal({ steps, kind }: P) {
  const { at, hover } = useCycle(steps.length, 3200);
  const x = steps[at];
  return (
    <div className={`flowbox f-term t-${kind}`} {...hover}>
      <div className="ft-bar"><i /><i /><i /><span>being@team — zsh</span><b>{num(at)}/{num(steps.length - 1)}</b></div>
      <div className="ft-body">
        <p className="ft-done">{steps.slice(0, at).map((d) => <span key={d.label}>✓ {d.label.toLowerCase()}</span>)}{at === 0 && <span className="idle">new session</span>}</p>
        <div className="ft-line now" key={at}>
          <p className="ft-note"># {x.label.toLowerCase()}</p>
          <p className="ft-cmd"><span>$</span><em>{x.cmd ?? x.label.toLowerCase()}</em></p>
          <p className="ft-out">{x.detail}</p>
        </div>
      </div>
    </div>
  );
}

/* 5. layers: stacked rows; the active row expands and fills */
function Layers({ steps, kind }: P) {
  const { at, setAt, hover } = useCycle(steps.length, 2800);
  return (
    <div className="flowbox f-layers" {...hover}>
      {steps.map((x, i) => (
        <button key={x.label} className={`fl-row${i === at ? " on" : ""}${i < at ? " done" : ""}`} onClick={() => setAt(i)} style={{ ["--d" as string]: i }}>
          <span className="fl-ic"><Ico name={x.icon} k={i <= at ? kind : "n"} /></span>
          <span className="fl-txt"><b>{x.label}</b><span>{x.detail}</span></span>
          <span className="fl-n">{num(i)}</span>
        </button>
      ))}
    </div>
  );
}

/* 6. hub: a centre icon with spokes; a pulse runs out to the active step */
function Hub({ steps, kind, center }: P) {
  const { at, setAt, hover } = useCycle(steps.length);
  const n = steps.length, cx = 260, cy = 170, R = 122;
  const pos = steps.map((_, i) => { const a = Math.PI + (Math.PI * (i + 0.5)) / n; return { x: cx + Math.cos(a) * R * 1.75, y: cy + Math.sin(a) * R }; });
  return (
    <div className="flowbox f-hub" {...hover}>
      <div className="fh-stage">
        <svg viewBox="0 0 520 214" preserveAspectRatio="none" aria-hidden="true">
          {pos.map((p, i) => <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} className={i === at ? "on" : i < at ? "done" : ""} vectorEffect="non-scaling-stroke" />)}
        </svg>
        <span className="fh-core"><Ico name={center || steps[0].icon} k={kind} /></span>
        {pos.map((p, i) => (
          <button key={steps[i].label} className={`fh-node${i === at ? " on" : ""}`} onClick={() => setAt(i)} aria-label={`Step ${i + 1}: ${steps[i].label}`}
            style={{ left: `${(p.x / 520) * 100}%`, top: `${(p.y / 214) * 100}%` }}>
            <Ico name={steps[i].icon} k={i === at ? kind : "n"} /><span>{steps[i].label}</span>
          </button>
        ))}
      </div>
      <Cap s={steps[at]} i={at} />
    </div>
  );
}

/* 7. cards: one big card per step, sliding in; next step previewed */
function Cards({ steps, kind }: P) {
  const { at, setAt, hover } = useCycle(steps.length, 3000);
  const s = steps[at], nx = steps[(at + 1) % steps.length];
  return (
    <div className="flowbox f-cards" {...hover}>
      <div className="fc-card" key={at}>
        <span className="fc-ic"><Ico name={s.icon} k={kind} /></span>
        <div><p className="fc-n">step {num(at)} / {num(steps.length - 1)}</p><h5>{s.label}</h5><p>{s.detail}</p></div>
        <i className="fc-time" />
      </div>
      <div className="fc-foot">
        <div className="fc-dots">{steps.map((x, i) => <button key={x.label} className={i === at ? "on" : ""} onClick={() => setAt(i)} aria-label={`Step ${i + 1}: ${x.label}`} />)}</div>
        <span className="fc-next">next → {nx.label}</span>
      </div>
    </div>
  );
}

/* 8. ladder: vertical line fills down; every step stays readable */
function Ladder({ steps, kind }: P) {
  const { at, setAt, hover } = useCycle(steps.length);
  return (
    <div className="flowbox f-ladder" {...hover} style={{ ["--p" as string]: at / Math.max(1, steps.length - 1) }}>
      <i className="fd-line"><b /></i>
      {steps.map((x, i) => (
        <button key={x.label} className={`fd-row${i === at ? " on" : ""}${i < at ? " done" : ""}`} onClick={() => setAt(i)}>
          <span className="fd-ic"><Ico name={x.icon} k={i <= at ? kind : "n"} /></span>
          <span className="fd-txt"><b>{x.label}{i < at && <em> ✓</em>}</b><span>{x.detail}</span></span>
        </button>
      ))}
    </div>
  );
}

export function FlowView({ style = "rail", ...p }: P & { style?: Flow }) {
  const C = { rail: Rail, orbit: Orbit, snake: Snake, terminal: Terminal, layers: Layers, hub: Hub, cards: Cards, ladder: Ladder }[style];
  return <C {...p} />;
}
