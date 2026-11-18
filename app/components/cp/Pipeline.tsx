"use client";
import { useEffect, useRef, useState } from "react";
import { Icon, MoreButton } from "./ui";
import type { Detail } from "@/app/lib/portfolio";

type St = "q" | "run" | "ok" | "fail" | "warn" | "skip" | "roll";
type Step = { i: number; st: St; chip: string; log: string };
type Scenario = { id: string; label: string; mark: string; steps: Step[]; end: [string, St] };

const STAGES = [["commit", "PR checks · review", "commit"], ["build", "docker buildx · cache", "cube"], ["test", "unit · scan · lint", "shieldok"], ["release", "helm package · push", "tag"], ["deploy", "atomic upgrade · verify", "rocket"]];

const ok = (i: number, chip: string, log: string): Step => ({ i, st: "ok", chip, log });
const base = [ok(0, "✓ 12s", "PR approved · checks green"), ok(1, "✓ 1m 40s", "image built · layer cache hit 14/16")];

// Illustrative runs; durations and counts are examples, not real metrics.
const SCENARIOS: Scenario[] = [
  { id: "release", label: "Release", mark: "✓", steps: [...base, ok(2, "✓ 2m 05s", "312 tests passed · 0 critical vulns"), ok(3, "✓ 28s", "chart pushed · cygnus 4.2.0"), ok(4, "✓ 1m 12s", "helm upgrade --atomic · 6/6 pods healthy")], end: ["✓ deployed to production · zero downtime", "ok"] },
  { id: "tests", label: "Failed tests", mark: "✗", steps: [...base, { i: 2, st: "fail", chip: "✗ 2 failed", log: "2 tests failed in the reconnect suite" }, { i: 3, st: "skip", chip: "skipped", log: "release skipped" }, { i: 4, st: "skip", chip: "skipped", log: "deploy skipped" }], end: ["✗ pipeline stopped · PR blocked, author notified", "fail"] },
  { id: "cve", label: "Vulnerability", mark: "⚠", steps: [...base, { i: 2, st: "warn", chip: "⚠ blocked", log: "image scan: critical CVE in base image" }, { i: 3, st: "skip", chip: "held", log: "release held" }, { i: 4, st: "skip", chip: "held", log: "deploy held" }], end: ["⚠ release held until the base image is patched", "warn"] },
  { id: "rollback", label: "Auto-rollback", mark: "↺", steps: [...base, ok(2, "✓ 2m 05s", "312 tests passed"), ok(3, "✓ 28s", "chart pushed · cygnus 4.2.1"), { i: 4, st: "fail", chip: "✗ unhealthy", log: "readiness probe failing on 2/6 new pods" }, { i: 4, st: "roll", chip: "↺ rolled back", log: "helm rollback → 4.2.0 · traffic restored" }], end: ["↺ auto-rollback complete · RCA ticket opened", "roll"] },
];

const DETAIL: Detail = {
  title: "What each gate checks", kind: "g", icon: "shieldok", tag: "Release pipeline", flow: "layers",
  summary: "Every change goes through the same gates. If any gate fails, nothing reaches production.",
  why: "Production runs live highway control rooms. A bad release isn't an inconvenience — it's an operator without video during an incident.",
  stats: [["5", "gates per change"], ["Atomic", "upgrades"], ["Auto", "rollback"]],
  stepsTitle: "The gates",
  steps: [
    { icon: "commit", label: "Commit", detail: "Pull request checks, code review approval and branch protection." },
    { icon: "cube", label: "Build", detail: "Container image built with cached layers and tagged by commit." },
    { icon: "shieldok", label: "Test", detail: "Unit and integration tests, lint and an image vulnerability scan." },
    { icon: "tag", label: "Release", detail: "A versioned Helm chart is pushed to the registry." },
    { icon: "rocket", label: "Deploy", detail: "Atomic upgrade with readiness checks; failing pods trigger a rollback." },
  ],
  pointsTitle: "What the tabs show", points: ["Release — the normal path to production", "Failed tests — the PR is blocked", "Vulnerability — the release is held", "Auto-rollback — a bad deploy is undone on its own"],
};

const KIND: Record<St, string> = { q: "n", run: "a", ok: "g", fail: "r", warn: "a", skip: "n", roll: "v" };

export default function Pipeline() {
  const [sc, setSc] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [seen, setSeen] = useState(false);
  const [run, setRun] = useState(0);
  const [st, setSt] = useState<St[]>(Array(5).fill("q"));
  const [chips, setChips] = useState<string[]>(Array(5).fill("queued"));
  const [p, setP] = useState(0);
  const [instant, setInstant] = useState(true);
  const [log, setLog] = useState<[string, string][]>([["", "› waiting for a commit…"]]);
  const [end, setEnd] = useState<St | "">("");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const o = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setSeen(true); o.disconnect(); } }, { threshold: 0.3 });
    o.observe(ref.current!);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    if (!seen) return;
    let alive = true;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));
    const S = SCENARIOS[sc];
    (async () => {
      setInstant(true); setP(0); setSt(Array(5).fill("q")); setChips(Array(5).fill("queued")); setEnd(""); setLog([["", `› ${S.label.toLowerCase()} run started`]]);
      await sleep(80); if (!alive) return; setInstant(false); await sleep(420);
      for (const step of S.steps) {
        if (!alive) return;
        const running = step.st !== "skip" && step.st !== "roll";
        if (running) {
          setSt((a) => a.map((v, k) => (k === step.i ? "run" : v))); setChips((a) => a.map((v, k) => (k === step.i ? "running" : v)));
          setP(step.i / 4); await sleep(1200); if (!alive) return;
        } else if (step.st === "roll") { setP((step.i - 1) / 4); await sleep(900); if (!alive) return; }
        else await sleep(250);
        setSt((a) => a.map((v, k) => (k === step.i ? step.st : v))); setChips((a) => a.map((v, k) => (k === step.i ? step.chip : v)));
        const tone = step.st === "ok" ? "ok" : step.st === "fail" ? "err" : step.st === "warn" ? "warn" : step.st === "roll" ? "roll" : "dim";
        setLog((l) => [...l.slice(-3), [tone, `› ${step.log}`]]);
      }
      setEnd(S.end[1]); setLog((l) => [...l.slice(-3), [S.end[1] === "ok" ? "ok" : S.end[1] === "fail" ? "err" : S.end[1] === "warn" ? "warn" : "roll", S.end[0]]]);
      if (reduce) return;
      await sleep(3200); if (!alive) return;
      if (pinned) setRun((r) => r + 1); else setSc((x) => (x + 1) % SCENARIOS.length);
    })();
    return () => { alive = false; };
  }, [sc, pinned, seen, run]);

  return (
    <section id="pipeline" ref={ref}><div className="wrap">
      <div className="head reveal"><p className="eyebrow">{"// how I ship"}</p><h2>Every commit, all the way to prod.</h2>
        <p className="lead">Release gates I run for the team: every change is built, scanned, packaged and rolled out atomically — and when something breaks, it stops or rolls back on its own.</p></div>
      <div className="pipe panel reveal">
        <div className="tabs" role="tablist" aria-label="Pipeline scenarios">
          {SCENARIOS.map((s, i) => (
            <button key={s.id} role="tab" aria-selected={sc === i} className={`tab t-${s.id}${sc === i ? " on" : ""}`} onClick={() => { setPinned(true); setSc(i); }}>
              <b>{s.mark}</b>{s.label}
            </button>
          ))}
          <span className="tab-auto">{pinned ? <button onClick={() => setPinned(false)}>▶ auto-play</button> : "auto-playing"}</span>
        </div>
        <div className={`track${instant ? " instant" : ""}${end ? " end-" + end : ""}`} style={{ ["--p" as string]: p }}>
          <div className="prail"><i className="fill" /><b className="comet" /></div>
          {STAGES.map(([h, d, ic], i) => (
            <div key={h} className={`stn s-${st[i]}`}>
              <div className="pring"><Icon name={ic} k={KIND[st[i]] as "n"} /></div>
              <div className="txt"><h4>{h}</h4><p>{d}</p><span className="t">{chips[i]}</span></div>
            </div>
          ))}
        </div>
        <div className="pipe-foot">
          <ol className="plog" aria-live="polite">{log.map(([k, t], i) => <li key={i + t} className={k}>{t}</li>)}</ol>
          <div className="strat">strategy: <b>atomic · rollback-on-fail</b></div>
        </div>
        <MoreButton detail={DETAIL} label="How the release pipeline works" />
      </div>
    </div></section>
  );
}
