"use client";
import { useEffect, useRef, useState } from "react";
import { ai, building, daily, deployments, education, experience, products, stack } from "@/app/lib/portfolio";
import { mk } from "./icons";
import { AIHub } from "./Diagrams";
import { Card, ClickCard, Icon } from "./ui";

/* ---------- career as a git graph ---------- */
export function Career() {
  const G = useRef<HTMLDivElement>(null), rail = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const draw = () => {
      const svg = rail.current!, g = G.current!; svg.innerHTML = "";
      const top = g.getBoundingClientRect().top;
      const nodes = [...g.querySelectorAll<HTMLElement>("[data-node]")].map((el) => ({ k: el.dataset.node!, y: el.getBoundingClientRect().top - top + (el.dataset.node === "merge" ? 9 : 30) }));
      if (!nodes.length) return;
      mk("line", { x1: 20, y1: nodes[0].y, x2: 20, y2: nodes[nodes.length - 1].y, stroke: "#3ee6ff", "stroke-opacity": 0.45, "stroke-width": 2 }, svg);
      const m = nodes.find((n) => n.k === "merge"), n0 = nodes.find((n) => n.k === "0"), n1 = nodes.find((n) => n.k === "1");
      if (m && n1 && n0) mk("path", { d: `M20 ${n1.y} C 46 ${n1.y - 30}, 46 ${m.y + 30}, 46 ${m.y} C 46 ${m.y - 30}, 20 ${n0.y + 60}, 20 ${n0.y + 40}`, stroke: "#ffb547", "stroke-width": 2, fill: "none", "stroke-opacity": 0.85 }, svg);
      nodes.forEach((n) => {
        if (n.k === "merge") { mk("circle", { cx: 46, cy: n.y, r: 6, fill: "#05080d", stroke: "#ffb547", "stroke-width": 2 }, svg); return; }
        const head = n.k === "0";
        mk("circle", { cx: 20, cy: n.y, r: head ? 8 : 6, fill: head ? "#3ee6ff" : "#05080d", stroke: "#3ee6ff", "stroke-width": 2 }, svg);
        if (head && !reduce) { const r = mk("circle", { cx: 20, cy: n.y, r: 8, fill: "none", stroke: "#3ee6ff" }, svg); mk("animate", { attributeName: "r", values: "8;18;8", dur: "2.4s", repeatCount: "indefinite" }, r); mk("animate", { attributeName: "stroke-opacity", values: ".8;0;.8", dur: "2.4s", repeatCount: "indefinite" }, r); }
      });
    };
    draw();
    const ro = new ResizeObserver(draw); ro.observe(G.current!);
    G.current!.querySelectorAll(".reveal").forEach((el) => el.addEventListener("transitionend", draw, { once: true }));
    document.fonts?.ready.then(draw);
    return () => ro.disconnect();
  }, []);
  const shas = ["a1f9c3e", "5d02b7a", "7c2e0b4"];
  return (
    <section id="exp"><div className="wrap">
      <div className="head reveal"><p className="eyebrow">{"// git log --graph career"}</p><h2>Engineer → team lead.</h2></div>
      <div className="graph" ref={G}>
        <svg className="rail" ref={rail} />
        {experience.map((e, i) => (
          <div key={e.role}>
            {i === 1 && <div className="merge reveal" data-node="merge">⇡ merge: promote engineer → team-lead <span>· {experience[0].period.split("–")[0].trim()}</span></div>}
            <article className="commit reveal" data-node={i}>
              <p className="sha">{shas[i]}{i === 0 && <em>HEAD → main</em>}</p>
              <h3>{e.role}</h3><p className="meta">{e.company} · {e.period}</p>
              <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </article>
          </div>
        ))}
        <article className="commit reveal" data-node="root"><p className="sha">0000001 (root)</p><h3>{education.degree}</h3><p className="meta">{education.school} · {education.period}</p></article>
      </div>
    </div></section>
  );
}

/* ---------- platforms ---------- */
export function Platforms() {
  return (
    <section id="platforms"><div className="wrap">
      <div className="head reveal"><p className="eyebrow">{"// kubectl get deploy -n infrax"}</p><h2>Platforms I ship &amp; run.</h2></div>
      <div className="pods">
        {products.map((p, i) => (
          <Card key={p.title} className={`pod panel reveal k-${p.kind}${i === 0 ? " flag" : ""}`}>
            <div className="st"><b>Running</b><span>{p.tag.split(" · ")[0]}</span></div>
            <div className="pod-h"><Icon name={p.icon} k={p.kind} /><div><h3>{p.title}</h3><p className="pod-cat">{p.tag}</p></div></div>
            <p className="pod-tl">{p.tagline}</p>
            <div className="chips">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
          </Card>
        ))}
      </div>
    </div></section>
  );
}

/* ---------- personal projects in build ---------- */
function Hint({ hints }: { hints: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((x) => (x + 1) % hints.length), 2400);
    return () => clearInterval(id);
  }, [hints.length]);
  return <p className="bd-hint"><span className="bd-spin" aria-hidden="true" /><span key={i} className="bd-hint-t">{hints[i]}…</span></p>;
}

export function Building() {
  return (
    <section id="building"><div className="wrap">
      <div className="head reveal"><p className="eyebrow">{"// git checkout -b side-projects"}</p><h2>Building now.</h2>
        <p className="lead">A few personal projects taking shape outside work. More soon.</p></div>
      <div className="bld">
        {building.map((b, n) => (
          <Card key={b.title} className={`bd panel reveal k-${b.kind}`} style={{ ["--d" as string]: `${-n * 1.3}s` }}>
            <i className="bd-sweep" aria-hidden="true" />
            <div className="bd-top">
              <span className="bd-ic"><Icon name={b.icon} k={b.kind} /></span>
              <span className={`bd-st s-${b.status.split(" ")[0].toLowerCase()}`}><i />{b.status}</span>
            </div>
            <p className="bd-tag">{b.tag}</p>
            <h3>{b.title}</h3>
            <p className="bd-desc">{b.teaser}</p>
            <Hint hints={b.hints} />
          </Card>
        ))}
      </div>
    </div></section>
  );
}

/* ---------- AI ---------- */
export function AISection() {
  return (
    <section id="ai"><div className="wrap">
      <div className="head reveal"><p className="eyebrow" style={{ color: "var(--violet)" }}>{"// ai & llm"}</p><h2>Putting AI to work.</h2>
        <p className="lead">I run the gateway every AI feature calls, and I&apos;ve built AI into how the team works. The caption under the diagram explains each request as it happens.</p></div>
      <AIHub />
      <div className="glow-grid">
        {ai.map((a, i) => (
          <ClickCard key={a.title} detail={a} className={`gcard reveal${a.kind === "c" ? " c" : ""}`}>
            <span className="n">{String(i + 1).padStart(2, "0")}</span>
            <div className="orb"><Icon name={a.icon!} k={a.kind} /></div>
            <h4>{a.title}</h4><p>{a.desc}</p>
          </ClickCard>
        ))}
      </div>
    </div></section>
  );
}

/* ---------- field + day ---------- */
export function Field() {
  const [hot, setHot] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setHot((h) => (h + 1) % daily.length), 1600);
    return () => clearInterval(id);
  }, []);
  const times = ["09:30", "10:00", "11:00", "12:00", "14:00", "15:30", "17:00", "*/5"];
  return (
    <section id="field"><div className="wrap">
      <div className="two">
        <div>
          <div className="head reveal"><p className="eyebrow">{"// kubectl get sites"}</p><h2>In the field.</h2></div>
          <div className="sites">
            {deployments.map((d) => (
              <Card key={d.title} className="site panel reveal">
                <span className="s" />
                <div><p className="cl">{d.tag}</p><h4>{d.title}</h4><p>{d.summary}</p></div>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <div className="head reveal"><p className="eyebrow">{"// crontab -l"}</p><h2>A day in the job.</h2></div>
          <ol className="cron panel reveal">{daily.map((t, i) => <li key={t} className={i === hot ? "hot" : ""}><span>{times[i]}</span>{t}</li>)}</ol>
        </div>
      </div>
    </div></section>
  );
}

/* ---------- stack ---------- */
const mono = (t: string) => t.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).replace(/^./, (c) => c.toUpperCase());

export function Stack() {
  const tools = stack.reduce((n, g) => n + g.tools.length, 0);
  return (
    <section id="stack-s"><div className="wrap">
      <div className="head reveal"><p className="eyebrow">{"// values.yaml"}</p><h2>Stack.</h2></div>
      <div className="stack-sum reveal"><span><b>{stack.length}</b>domains</span><span><b>{tools}</b>tools in production use</span><span><b>3</b>clouds + bare metal</span></div>
      <div className="bento">
        {stack.map((g, i) => (
          <Card key={g.name}
            className={`sg reveal${g.wide ? " wide" : ""}${g.kind === "v" ? " ai" : g.kind === "g" ? " ok" : ""}`} style={{ ["--d" as string]: `${-i * 0.7}s` }}>
            <header><span className="ic"><Icon name={g.icon} k={g.kind} /></span><div><h4>{g.name}</h4><small>{g.sub}</small></div><span className="cnt">{String(g.tools.length).padStart(2, "0")}</span></header>
            <div className="tools">{g.tools.map((s) => <span key={s}><i>{mono(s)}</i>{s}</span>)}</div>
          </Card>
        ))}
      </div>
    </div></section>
  );
}
