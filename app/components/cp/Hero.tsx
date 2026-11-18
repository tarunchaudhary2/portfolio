"use client";
import { useEffect, useRef, useState } from "react";
import { profile, team } from "@/app/lib/portfolio";
import { yearsOfExperience } from "@/app/lib/experience";
import { github } from "@/app/lib/github";
import { Card, Icon } from "./ui";


function Counter({ n, suffix }: { n: number; suffix: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const o = new IntersectionObserver((e) => {
      if (!e[0].isIntersecting) return; o.disconnect();
      if (reduce) { el.textContent = n.toLocaleString("en-US") + suffix; return; }
      let t0 = 0;
      const f = (t: number) => { t0 ||= t; const p = Math.min((t - t0) / 1500, 1); el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))).toLocaleString("en-US") + (p === 1 ? suffix : ""); if (p < 1) requestAnimationFrame(f); };
      requestAnimationFrame(f);
    });
    o.observe(el);
    return () => o.disconnect();
  }, [n, suffix]);
  return <b ref={ref}>0</b>;
}

/* ---------- KPI mini-visuals ---------- */
function YearsViz() {
  const X = (y: number, m: number) => 12 + ((y + m / 12 - 2023) / 4) * 176;
  const now = new Date(), xn = X(now.getFullYear(), now.getMonth());
  const marks: [number, string, string][] = [[X(2023, 5), "#3ee6ff", "LTIMindtree"], [X(2025, 8), "#46f08c", "NaturNest AI"], [X(2026, 8), "#2ff0c4", "Team Lead"]];
  return (
    <svg className="viz" viewBox="0 0 200 44" aria-hidden="true">
      <line x1="12" y1="18" x2="188" y2="18" className="vz-track" />
      <line x1={marks[0][0]} y1="18" x2={xn} y2="18" className="vz-fill" pathLength={1} />
      {[2023, 2024, 2025, 2026].map((y) => <text key={y} x={X(y, 0)} y="40" className="vz-lbl">{"'" + String(y).slice(2)}</text>)}
      {marks.map(([x, c, t]) => <circle key={t} cx={x} cy="18" r="4" fill="#05080d" stroke={c} strokeWidth="2"><title>{t}</title></circle>)}
      <circle cx={xn} cy="18" r="3.5" fill="#3ee6ff" className="vz-head" />
    </svg>
  );
}

const ROLE_ICON = ["cube", "monitor", "tsdb", "neural", "copilot", "iac", "agent", "gantry"];
const ROLE_KIND = ["c", "c", "c", "v", "a", "g", "v", "a"] as const;

// Standup round: the highlight steps through each role in the team.
function TeamViz() {
  const [at, setAt] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setAt((a) => (a + 1) % team.length), 1700);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="tv" aria-hidden="true" style={{ ["--p" as string]: at / (team.length - 1) }}>
      <div className="tv-row">
        <i className="tv-line"><b /></i>
        {team.map((t, i) => (
          <span key={t} className={`tv-ic${i === at ? " on" : ""}`} title={t}><Icon name={ROLE_ICON[i]} k={i === at ? ROLE_KIND[i] : "n"} /></span>
        ))}
      </div>
      <p className="tv-cap" key={at}>→ {team[at].toLowerCase()}</p>
    </div>
  );
}

function RoadViz() {
  const cars = [[14, 0, 3.6], [30, -1.6, 4.4], [14, -2.4, 3.1], [30, -3.3, 5.2]];
  return (
    <svg className="viz" viewBox="0 0 200 44" aria-hidden="true">
      <line x1="0" y1="7" x2="200" y2="7" className="vz-edge" />
      <line x1="0" y1="22" x2="200" y2="22" className="vz-lane" />
      <line x1="0" y1="37" x2="200" y2="37" className="vz-edge" />
      <g className="vz-gantry"><line x1="140" y1="2" x2="140" y2="42" /><rect x="136" y="0" width="8" height="5" rx="1.5" /></g>
      <rect x="128" y="7" width="24" height="30" className="vz-scan" />
      {cars.map(([y, d, s], i) => (
        <rect key={i} x="-14" y={y - 4} width="12" height="8" rx="2.5" className="vz-car" style={{ animationDuration: `${s}s`, animationDelay: `${d}s` }} />
      ))}
    </svg>
  );
}

function CamViz() {
  const ref = useRef<SVGGElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cells = [...ref.current!.querySelectorAll("rect")];
    const id = setInterval(() => {
      const c = cells[(Math.random() * cells.length) | 0];
      c.classList.toggle("on");
      if (Math.random() < 0.12) { const d = cells[(Math.random() * cells.length) | 0]; d.classList.add("det"); setTimeout(() => d.classList.remove("det"), 900); }
    }, 160);
    return () => clearInterval(id);
  }, []);
  return (
    <svg className="viz" viewBox="0 0 200 44" aria-hidden="true">
      <g ref={ref}>
        {Array.from({ length: 48 }, (_, i) => (
          <rect key={i} x={2 + (i % 16) * 12.4} y={2 + Math.floor(i / 16) * 14} width="10" height="11" rx="2" className={`vz-cam${i % 3 ? " on" : ""}`} />
        ))}
      </g>
    </svg>
  );
}

/* ---------- GitHub activity tiles ---------- */
const level = (v: number, max: number) => (v === 0 ? 0 : Math.min(4, 1 + Math.floor((v / max) * 3.999)));

// Two-row contribution heatmap (work, personal) that lights up week by week.
function CommitViz() {
  const rows: [string, number[], string][] = [["work", github.weeksWork, "c"], ["personal", github.weeksPersonal, "g"]];
  const n = github.weeksWork.length, cw = 10, gap = 2.4, x0 = 58;
  return (
    <svg className="viz gh-heat" viewBox={`0 0 ${x0 + n * (cw + gap)} 40`} aria-hidden="true">
      {rows.map(([label, weeks, k], r) => {
        const max = Math.max(...weeks, 1);
        return (
          <g key={label}>
            <text x="0" y={r * 19 + 10} className="vz-lbl gh-lbl">{label}</text>
            {weeks.map((v, i) => (
              <rect key={i} x={x0 + i * (cw + gap)} y={r * 19 + 1} width={cw} height={13} rx="2.5" className={`gh-c gh-${k}${level(v, max)}`} style={{ animationDelay: `${i * 0.025}s` }}><title>{`${v} contributions`}</title></rect>
            ))}
          </g>
        );
      })}
      <rect x={x0} y="0" width="22" height="30" className="gh-scan" />
    </svg>
  );
}

// Feature branches peel off main and merge back, one after another.
function MergeViz() {
  const B = [[60, 150], [130, 230], [210, 300], [280, 380], [350, 440], [420, 510]];
  const br = ([a, b]: number[]) => `M${a} 30 C ${a + 18} 30, ${a + 18} 10, ${a + 36} 10 L ${b - 36} 10 C ${b - 18} 10, ${b - 18} 30, ${b} 30`;
  return (
    <svg className="viz gh-merge" viewBox="0 0 560 40" aria-hidden="true">
      <line x1="8" y1="30" x2="552" y2="30" className="gm-main" />
      {B.map((b, i) => (
        <g key={i}>
          <path d={br(b)} className="gm-br" />
          <circle r="3.2" className="gm-dot"><animateMotion dur="6s" begin={`${-6 + i}s`} repeatCount="indefinite" path={br(b)} keyPoints="0;1;1" keyTimes="0;.5;1" calcMode="linear" /></circle>
          <circle cx={b[1]} cy="30" r="4.5" className="gm-merge" style={{ animationDelay: `${i - 3}s` }} />
          <circle cx={b[0]} cy="30" r="3" className="gm-fork" />
        </g>
      ))}
      <text x="552" y="22" className="vz-lbl gm-tag">main</text>
    </svg>
  );
}

const BOOT: [string, string][] = [["d", "$ "], ["c", "kubectl apply -f tarun.yaml\n"], ["ok", "✓ "], ["", "namespace/infrax configured\n"], ["ok", "✓ "], ["", "deployment/cygnus rolled out\n"],
  ["ok", "✓ "], ["", "statefulset/postgres-timescale ready\n"], ["ok", "✓ "], ["", "daemonset/edge-anpr synced\n"], ["v", "✓ "], ["", "service/llm-gateway routing\n"],
  ["a", "⟳ "], ["", "team: dev · ai · ops · sales — standup 09:30\n"], ["ok", "✓ "], ["", "uptime {Y}+ years · 0 restarts\n"], ["d", "$ "], ["c", "whoami\n"], ["", "tarun — team lead\n"], ["d", "$ "]];

function Terminal({ yrs }: { yrs: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const b = ref.current!; b.innerHTML = "";
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let alive = true;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));
    (async () => {
      await sleep(400);
      for (const [c, t0] of BOOT) {
        if (!alive) return;
        const t = t0.replace("{Y}", String(yrs)), s = document.createElement("span"); if (c) s.className = c; b.appendChild(s);
        for (const ch of t) { if (!alive) return; s.textContent += ch; if (!reduce) await sleep(c === "c" ? 26 : 7); }
        await sleep(110);
      }
      const k = document.createElement("span"); k.className = "caret"; b.appendChild(k);
    })();
    return () => { alive = false; };
  }, [yrs]);
  return <div id="boot" ref={ref} />;
}

export default function Hero() {
  const yrs = yearsOfExperience();
  const [first, last] = profile.name.split(" ");
  let d = 0;
  const letters = (w: string) => [...w].map((ch, i) => <span key={i} className="l" style={{ animationDelay: 0.15 + d++ * 0.04 + "s" }}>{ch}</span>);
  const kpis: { n: number; s: string; label: string; viz: React.ReactNode }[] = [
    { n: yrs, s: "+", label: "years in DevOps", viz: <YearsViz /> },
    { n: team.length, s: "", label: "roles in my team", viz: <TeamViz /> },
    { n: 5, s: "M+", label: "vehicles processed", viz: <RoadViz /> },
    { n: 100, s: "+", label: "cameras streamed live", viz: <CamViz /> },
  ];
  return (
    <header className="hero"><div className="wrap">
      <div className="hero-grid">
        <div>
          <span className="status"><i />all systems operational</span>
          <h1 className="name" aria-label={profile.name}>
            <span className="w">{letters(first)}</span><br /><span className="w last">{letters(last)}</span>
          </h1>
          <p className="role">{profile.role} <span>@</span> {profile.company}</p>
          <p className="tagline">{profile.tagline}</p>
          <div className="cta"><a className="btn" href="#contact">$ hire --me</a><a className="btn ghost" href="#exp">git log --career</a></div>
        </div>
        <div className="term panel">
          <div className="term-bar"><i /><i /><i /><span>~/tarun — zsh</span></div>
          <Terminal yrs={yrs} />
        </div>
      </div>
      <div className="kpis">
        {kpis.map((k) => (
          <Card key={k.label} className="kpi panel reveal">
            <Counter n={k.n} suffix={k.s} />
            <span className="kl">{k.label}</span>
            {k.viz}
          </Card>
        ))}
        <Card className="kpi wide panel reveal">
          <div className="gh-top"><div><Counter n={Math.floor((github.work.contributionsYear + github.personal.contributionsYear) / 100) * 100} suffix="+" /><span className="kl">commits &amp; contributions · last 12 months</span></div>
            <p className="gh-split"><span><i className="c" />work {github.work.contributionsYear.toLocaleString("en-US")}</span><span><i className="g" />personal {github.personal.contributionsYear.toLocaleString("en-US")}</span></p></div>
          <CommitViz />
        </Card>
        <Card className="kpi wide panel reveal">
          <div className="gh-top"><div><Counter n={Math.floor((github.work.prsMerged + github.personal.prsMerged) / 100) * 100} suffix="+" /><span className="kl">pull requests merged</span></div>
            <p className="gh-split"><span><i className="c" />work {github.work.prsMerged}</span><span><i className="g" />personal {github.personal.prsMerged}</span></p></div>
          <MergeViz />
        </Card>
      </div>
      <p className="gh-note reveal">GitHub activity across work and personal accounts · snapshot {github.snapshot}</p>
    </div></header>
  );
}
