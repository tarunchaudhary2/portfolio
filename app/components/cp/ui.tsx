"use client";
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState, KeyboardEvent, MouseEvent } from "react";
import { ICX } from "./icons";
import { FlowView } from "./flows";
import type { Detail, Kind, Step } from "@/app/lib/portfolio";

export function Icon({ name, k = "c", className = "" }: { name: string; k?: Kind | "n" | "r"; className?: string }) {
  return (
    <svg className={`ix k-${k} ${className}`} viewBox="0 0 32 32" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICX[name] || "" }} />
  );
}

export function useReduced() {
  const [r, setR] = useState(false);
  useEffect(() => setR(matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return r;
}

const grad = (id: string, a: string, b: string, c: string) => (
  <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="3" y1="3" x2="29" y2="29">
    <stop offset="0" stopColor={a} /><stop offset=".5" stopColor={b} /><stop offset="1" stopColor={c} />
  </linearGradient>
);
const fill = (id: string, a: string, b: string, o1: number, o2: number) => (
  <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="4" y1="4" x2="28" y2="28">
    <stop offset="0" stopColor={a} stopOpacity={o1} /><stop offset="1" stopColor={b} stopOpacity={o2} />
  </linearGradient>
);
const blob = (id: string, c: string, o: number) => (
  <radialGradient id={id}><stop offset="0" stopColor={c} stopOpacity={o} /><stop offset="1" stopColor={c} stopOpacity="0" /></radialGradient>
);

// Shared gradients referenced by every icon and diagram on the page.
export function IconDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        {grad("gi-c", "#c8fbff", "#3ee6ff", "#1f8fff")}
        {grad("gi-v", "#d4fff3", "#4ff5cf", "#13c8a8")}
        {grad("gi-g", "#d2ffe4", "#46f08c", "#16b8a0")}
        {grad("gi-a", "#fff0c9", "#ffb547", "#ff7a3d")}
        {grad("gi-r", "#ffd3d8", "#ff5d6c", "#d92d4a")}
        {fill("gf-c", "#3ee6ff", "#1f8fff", 0.55, 0.06)}
        {fill("gf-v", "#5ef7d3", "#13c8a8", 0.6, 0.08)}
        {fill("gf-g", "#46f08c", "#16b8a0", 0.5, 0.06)}
        {fill("gf-a", "#ffc66b", "#ff7a3d", 0.55, 0.07)}
        {fill("gf-r", "#ff8a96", "#d92d4a", 0.55, 0.07)}
        {blob("rb-c", "#3ee6ff", 0.32)}
        {blob("rb-v", "#2ff0c4", 0.38)}
        {blob("rb-a", "#ffb547", 0.3)}
        {blob("rb-g", "#46f08c", 0.3)}
      </defs>
    </svg>
  );
}

/* ---------- popup ---------- */
const PopupCtx = createContext<(d: Detail) => void>(() => {});
export const usePopup = () => useContext(PopupCtx);

const PHASES: Step[] = [
  { icon: "voice", label: "Intro call", detail: "A short call to understand the problem, the constraints and what good looks like." },
  { icon: "iac", label: "Plan", detail: "A written plan with scope, approach and an estimate — before any work starts." },
  { icon: "helm", label: "Build", detail: "Hands-on work in your environment, with progress you can see every few days." },
  { icon: "shieldok", label: "Hand over", detail: "Docs, runbooks and a walkthrough so your team owns it from day one." },
];

export function PopupProvider({ children }: { children: ReactNode }) {
  const [d, setD] = useState<Detail | null>(null);
  const ref = useRef<HTMLDialogElement>(null);
  const open = useCallback((x: Detail) => setD(x), []);
  useEffect(() => {
    const dlg = ref.current;
    if (d && dlg && !dlg.open) {
      dlg.showModal();
      // Open at the top and focus the close button instead of the first control further down.
      dlg.scrollTop = 0;
      dlg.querySelector<HTMLButtonElement>(".pop-x")?.focus({ preventScroll: true });
    }
    // Lock page scroll while the popup is open; restore on close.
    const root = document.documentElement;
    if (d) { root.style.overflow = "hidden"; root.style.scrollbarGutter = "stable"; }
    return () => { root.style.overflow = ""; root.style.scrollbarGutter = ""; };
  }, [d]);
  const close = () => ref.current?.close();
  const discuss = () => {
    close();
    dispatchEvent(new CustomEvent("prefill-subject", { detail: d?.title }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <PopupCtx.Provider value={open}>
      {children}
      <dialog
        ref={ref}
        className={`pop k-${d?.kind ?? "c"}`}
        onClose={() => { if (!ref.current?.open) setD(null); }}
        onClick={(e) => { if (e.target === ref.current) close(); }}
        aria-labelledby="pop-title"
      >
        {d && (
          <div className={`pop-in${d.steps || d.service ? " two" : ""}`} key={d.title}>
            <div className="pop-main">
              <header className="pop-sec" style={{ ["--s" as string]: 0 }}>
                {d.icon && <span className="pop-ic"><i /><Icon name={d.icon} k={d.kind} /></span>}
                <div>
                  {d.tag && <p className="pop-tag">{d.tag}</p>}
                  <h3 id="pop-title">{d.title}</h3>
                </div>
              </header>
              <p className="pop-sum pop-sec" style={{ ["--s" as string]: 1 }}>{d.summary}</p>
              {d.stats && (
                <div className="pop-stats pop-sec" style={{ ["--s" as string]: 2 }}>
                  {d.stats.map(([v, l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}
                </div>
              )}
              {d.why && <blockquote className="pop-why pop-sec" style={{ ["--s" as string]: 3 }}><span>{d.service ? "Good fit if" : "Why it matters"}</span>{d.why}</blockquote>}
              {d.points && (d.service || !d.steps) && (
                <div className="pop-sec" style={{ ["--s" as string]: 4 }}>
                  <p className="pop-h">{d.pointsTitle ?? "My part"}</p>
                  <ul className="pop-pts">{d.points.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
              )}
              {d.chips && <div className="chips pop-sec" style={{ ["--s" as string]: 5 }}>{d.chips.map((c) => <span key={c}>{c}</span>)}</div>}
              {d.service && <button className="btn pop-cta pop-sec" style={{ ["--s" as string]: 6 }} onClick={discuss}>$ discuss this project →</button>}
            </div>
            {(d.steps || d.service) && (
              <div className="pop-side">
                {d.steps && (
                  <div className="pop-sec" style={{ ["--s" as string]: 2 }}>
                    <p className="pop-h">{d.stepsTitle ?? "How it works"}</p>
                    <FlowView style={d.flow} steps={d.steps} kind={d.kind} center={d.icon} />
                  </div>
                )}
                {d.points && !d.service && (
                  <div className="pop-sec" style={{ ["--s" as string]: 4 }}>
                  <p className="pop-h">{d.pointsTitle ?? "My part"}</p>
                  <ul className="pop-pts">{d.points.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
                )}
                {d.service && (
                  <div className="pop-sec pop-phases" style={{ ["--s" as string]: 4 }}>
                    <p className="pop-h">How we&apos;d work together</p>
                    <FlowView style={d.phaseFlow ?? "rail"} steps={PHASES} kind="g" />
                  </div>
                )}
              </div>
            )}
            <button className="pop-x" onClick={close} aria-label="Close">×</button>
          </div>
        )}
      </dialog>
    </PopupCtx.Provider>
  );
}

// Expand icon (arrows to top-left and bottom-right).
export function MoreButton({ detail, label }: { detail: Detail; label?: string }) {
  const open = usePopup();
  return (
    <button
      className="more"
      aria-label={label ?? `More about ${detail.title}`}
      onClick={(e) => { e.stopPropagation(); open(detail); }}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 6.5v-4h4M2.5 2.5l4.5 4.5M13.5 9.5v4h-4M13.5 13.5L9 9" /></svg>
    </button>
  );
}

const spot = (e: MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
  e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
};

// Plain card with a cursor spotlight.
export function Card({ className = "", children, style }: { className?: string; children: ReactNode; style?: React.CSSProperties }) {
  return <article className={className} style={style} onPointerMove={spot}>{children}</article>;
}

// Whole card opens the popup on click; the corner button is the keyboard-accessible control.
export function ClickCard({ detail, className = "", children, style }: { detail: Detail; className?: string; children: ReactNode; style?: React.CSSProperties }) {
  const open = usePopup();
  const onKey = (e: KeyboardEvent<HTMLElement>) => { if (e.key === "Enter" && e.target === e.currentTarget) open(detail); };
  return (
    <article className={`card ${className}`} style={style} onClick={() => open(detail)} onKeyDown={onKey} onPointerMove={spot}>
      {children}
      <MoreButton detail={detail} />
    </article>
  );
}
