"use client";
import { useEffect, useRef } from "react";
import { glyph, mk } from "./icons";
import { MoreButton } from "./ui";
import type { Detail } from "@/app/lib/portfolio";

const C = { cyan: "#3ee6ff", violet: "#2ff0c4", green: "#46f08c", amber: "#ffb547", dim: "#6f8196", text: "#e3ebf4", bg: "#0a1018" };

type Path = { p: SVGPathElement; len: number; c: string };
type Dot = { g: SVGElement; parts: SVGElement[]; o: Path; t: number; v: number; onEnd?: () => void };

// Moving request "comets": a soft halo plus a short fading tail.
type Vis = { on: boolean };

// Each path is sampled once; per-frame lookups are array reads instead of getPointAtLength calls.
const SAMPLES = 96;
const sampleCache = new WeakMap<SVGPathElement, Float32Array>();
function samples(o: Path) {
  let a = sampleCache.get(o.p);
  if (!a) {
    a = new Float32Array((SAMPLES + 1) * 2);
    for (let i = 0; i <= SAMPLES; i++) { const pt = o.p.getPointAtLength((i / SAMPLES) * o.len); a[i * 2] = pt.x; a[i * 2 + 1] = pt.y; }
    sampleCache.set(o.p, a);
  }
  return a;
}
function pointAt(a: Float32Array, t: number) {
  const f = Math.min(Math.max(t, 0), 1) * SAMPLES, i = Math.min(Math.floor(f), SAMPLES - 1), k = f - i;
  return [a[i * 2] + (a[i * 2 + 2] - a[i * 2]) * k, a[i * 2 + 1] + (a[i * 2 + 3] - a[i * 2 + 1]) * k];
}

function comets(layer: SVGElement, spacing: number, vis: Vis) {
  const dots: (Dot & { s: Float32Array })[] = [];
  let raf = 0;
  const add = (o: Path, delay = 0, v = 0.012, onEnd?: () => void) => {
    const g = mk("g", { opacity: 0 }, layer);
    const parts = ([[10, 0.14], [4.6, 1], [2.8, 0.55]] as const).map(([r, op]) => mk("circle", { r, fill: o.c, "fill-opacity": op, cx: -20, cy: -20 }, g));
    dots.push({ g, parts, o, t: -delay, v, onEnd, s: samples(o) });
  };
  const tick = () => {
    raf = requestAnimationFrame(tick);
    if (!vis.on) return;
    for (let i = dots.length - 1; i >= 0; i--) {
      const q = dots[i]; q.t += q.v; if (q.t < 0) continue; q.g.setAttribute("opacity", "1");
      if (q.t >= 1) { q.onEnd?.(); q.g.remove(); dots.splice(i, 1); continue; }
      q.parts.forEach((c, k) => {
        const tt = q.t - Math.max(0, k - 1) * spacing;
        if (tt < 0) { c.setAttribute("visibility", "hidden"); return; } // tail stays hidden until it has room
        c.setAttribute("visibility", "visible");
        const [x, y] = pointAt(q.s, tt * 1); c.setAttribute("cx", x.toFixed(1)); c.setAttribute("cy", y.toFixed(1));
      });
    }
  };
  raf = requestAnimationFrame(tick);
  return { add, stop: () => cancelAnimationFrame(raf) };
}

// Builds the diagram for the current width; animation pauses while off-screen or in a hidden tab.
function useResponsiveBuild(build: (narrow: boolean, reduce: boolean, vis: Vis) => () => void) {
  const ref = useRef<SVGSVGElement>(null);
  const buildRef = useRef(build);
  buildRef.current = build;
  useEffect(() => {
    const svg = ref.current!, host = svg.parentElement!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const vis: Vis = { on: false };
    let inView = false;
    const sync = () => { vis.on = inView && !document.hidden; if (vis.on) svg.unpauseAnimations(); else svg.pauseAnimations(); };
    let narrow = host.clientWidth < 720, cleanup = buildRef.current(narrow, reduce, vis), t: ReturnType<typeof setTimeout>;
    sync();
    const ro = new ResizeObserver(() => { clearTimeout(t); t = setTimeout(() => { const n = host.clientWidth < 720; if (n !== narrow) { narrow = n; cleanup(); cleanup = buildRef.current(n, reduce, vis); sync(); } }, 150); });
    ro.observe(host);
    const io = new IntersectionObserver((e) => { inView = e[0].isIntersecting; sync(); }, { rootMargin: "100px" });
    io.observe(host);
    document.addEventListener("visibilitychange", sync);
    return () => { ro.disconnect(); io.disconnect(); document.removeEventListener("visibilitychange", sync); clearTimeout(t); cleanup(); };
  }, []);
  return ref;
}

/* ---------------- architecture ---------------- */
type Z = { k: string; c: string; k8s?: boolean; n: [string, string, string, string, string?][] };
const ZONES: Z[] = [
  { k: "FIELD", c: C.amber, n: [["cam", "Cameras", "RTSP · ONVIF", "cctv"], ["gan", "Gantry sensors", "ANPR · radar", "gantry"], ["ecb", "Call boxes", "voice · SIP", "callbox"]] },
  { k: "EDGE AI", c: C.cyan, n: [["edge", "Edge boxes", "OpenVINO · Jetson", "edgechip"], ["ota", "OTA updates", "fleet rollout", "ota"]] },
  { k: "SECURE LINK", c: C.cyan, n: [["vpn", "Site tunnels", "IPsec · mTLS", "tunnel"]] },
  { k: "K8S PLATFORM", c: C.cyan, k8s: true, n: [["ing", "Ingress", "nginx · TLS", "ingress"], ["vms", "Streaming", "MediaMTX · WebRTC", "stream"], ["cyg", "Cygnus", "VMS · video", "cygnus"], ["ai", "AI features", "agents · MCP", "sparkles", C.violet]] },
  { k: "DATA & AI", c: C.cyan, n: [["pg", "Postgres", "TimescaleDB · MySQL", "tsdb"], ["rd", "Redis · MinIO", "cache · objects", "cache"], ["gw", "LLM gateway", "LiteLLM", "gateway", C.violet], ["llm", "Models", "Vertex AI · Ollama", "neural", C.violet]] },
];
// Short labels for the compact (phone) layout.
const SHORT: Record<string, string> = { gan: "Gantry", ecb: "Call box", edge: "Edge box", ota: "OTA", vpn: "Tunnels", vms: "Streams", ai: "AI", rd: "Cache", gw: "LLM gw" };
const LINKS: [string, string, string][] = [["cam", "edge", "video frames"], ["gan", "edge", "plate reads"], ["ota", "edge", "updates"], ["edge", "vpn", "events"], ["ecb", "vpn", "calls"], ["vpn", "ing", "API traffic"], ["vpn", "cyg", "events"], ["vpn", "vms", "streams"], ["cyg", "pg", "time-series"], ["cyg", "rd", "cache"], ["vms", "rd", "recordings"], ["cyg", "ai", "AI request"], ["ai", "gw", "prompt"], ["gw", "llm", "model call"]];

const ARCH_DETAIL: Detail = {
  title: "From the roadside to the cloud", kind: "c", icon: "cygnus", tag: "Platform architecture", flow: "snake",
  summary: "How data moves from a camera on a highway to an operator's screen — and where AI comes in.",
  why: "Roadside bandwidth is scarce and sites can go offline, so the intelligence sits at the edge and only events and streams travel back.",
  stats: [["5", "layers"], ["1", "gateway for all AI"], ["24×7", "operations"]],
  stepsTitle: "Follow one event",
  steps: [
    { icon: "cctv", label: "Field", detail: "Cameras, gantry sensors and call boxes capture what happens on the road." },
    { icon: "edgechip", label: "Edge AI", detail: "Boxes at the roadside detect vehicles and incidents and read plates on the spot." },
    { icon: "tunnel", label: "Secure link", detail: "Only events and streams travel back, inside encrypted site tunnels." },
    { icon: "cygnus", label: "Platform", detail: "Cygnus on bare-metal Kubernetes turns events into alerts; streaming serves live video." },
    { icon: "gateway", label: "Data & AI", detail: "Time-series, cache and recordings are stored; AI features call models through one gateway." },
  ],
  pointsTitle: "Colours", points: ["Amber — field devices", "Cyan — infrastructure traffic", "Mint — AI and LLM traffic", "Green dot — service healthy"],
};

export function Architecture() {
  const capRef = useRef<HTMLParagraphElement>(null);
  const ref = useResponsiveBuild((narrow, reduce, vis) => {
    const svg = ref.current!; svg.innerHTML = "";
    const W = narrow ? 660 : 1200, H = narrow ? 600 : 600, R = narrow ? 26 : 26, colW = narrow ? 128 : 235, bandW = narrow ? 122 : 208;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    const defs = mk("defs", {}, svg), bands = mk("g", {}, svg), gl = mk("g", {}, svg), gn = mk("g", {}, svg), gd = mk("g", {}, svg);
    const tx = (x: number, y: number, t: string, c: string, sz: number, w = 0, anc = "middle", par: Element = gn) => { const e = mk("text", { x, y, "text-anchor": anc, fill: c, "font-size": sz, "font-weight": w || 400, "font-family": w ? "var(--sans)" : "var(--mono)", "letter-spacing": w ? 0 : 0.4 }, par); e.textContent = t; return e; };
    type Node = { x: number; y: number; z: number; col: string; ic: string; name: string; sub: string };
    const N: Record<string, Node> = {};
    ZONES.forEach((z, zi) => {
      const n = z.n.length; let band;
      const cx = (narrow ? 70 : 130) + zi * colW; band = { x: cx - bandW / 2, y: 30, w: bandW, h: H - 46 };
      z.n.forEach(([id, name, sub, ic, col], j) => (N[id] = { x: cx, y: (narrow ? 112 : 118) + ((j + 0.5) * (H - (narrow ? 160 : 170))) / n, z: zi, col: col || z.c, ic, name: narrow ? SHORT[id] || name : name, sub }));
      const lg = mk("linearGradient", { id: "bz" + zi, x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
      mk("stop", { offset: 0, "stop-color": z.c, "stop-opacity": z.k8s ? 0.09 : 0.06 }, lg); mk("stop", { offset: 1, "stop-color": z.c, "stop-opacity": 0 }, lg);
      mk("rect", { x: band.x, y: band.y, width: band.w, height: band.h, rx: 18, fill: `url(#bz${zi})`, stroke: z.c, "stroke-opacity": z.k8s ? 0.35 : 0.1, "stroke-dasharray": z.k8s ? "5 6" : "none" }, bands);
      tx(band.x + band.w / 2, band.y + 28, narrow ? z.k.replace("SECURE LINK", "SECURE").replace("K8S PLATFORM", "K8S") : z.k, z.c, narrow ? 16 : 11.5, 0, "middle", bands);
      if (z.k8s) tx(band.x + band.w / 2, band.y + band.h - 14, narrow ? "bare metal" : "bare-metal kubernetes", C.dim, narrow ? 13 : 11, 0, "middle", bands);
    });
    const curve = (a: Node, b: Node) => {
      const bulge = narrow ? 34 : 56;
      if (a.z === b.z) return `M${a.x + R} ${a.y} C ${a.x + R + bulge} ${a.y}, ${b.x + R + bulge} ${b.y}, ${b.x + R} ${b.y}`;
      const x1 = a.x + R, x2 = b.x - R, m = (x1 + x2) / 2; return `M${x1} ${a.y} C ${m} ${a.y}, ${m} ${b.y}, ${x2} ${b.y}`;
    };
    const paths = LINKS.map(([a, b], i) => {
      const A = N[a], B = N[b], c = B.col === C.violet ? C.violet : A.col === C.amber ? C.amber : C.cyan;
      const g = mk("linearGradient", { id: "al" + i, gradientUnits: "userSpaceOnUse", x1: A.x, y1: A.y, x2: B.x, y2: B.y }, defs);
      mk("stop", { offset: 0, "stop-color": A.col }, g); mk("stop", { offset: 1, "stop-color": B.col }, g);
      const d = curve(A, B); mk("path", { d, fill: "none", stroke: `url(#al${i})`, "stroke-width": 7, "stroke-opacity": 0.06 }, gl);
      const p = mk("path", { d, fill: "none", stroke: `url(#al${i})`, "stroke-width": 1.5, "stroke-opacity": 0.5 }, gl) as SVGPathElement;
      return { p, len: p.getTotalLength(), c };
    });
    Object.values(N).forEach((n) => {
      glyph(gn, n.x, n.y, n.ic, n.col, narrow ? 48 : 46, reduce || narrow);
      const hd = mk("circle", { cx: n.x + R * 0.85, cy: n.y - R * 0.8, r: 3, fill: n.col === C.amber ? C.amber : C.green, stroke: C.bg, "stroke-width": 1.5 }, gn);
      if (!reduce && !narrow) mk("animate", { attributeName: "opacity", values: "1;.35;1", dur: 1.6 + Math.random() * 1.6 + "s", repeatCount: "indefinite" }, hd);
      tx(n.x, n.y + R + (narrow ? 22 : 20), n.name, C.text, narrow ? 19 : 14, 600); if (!narrow) tx(n.x, n.y + R + 36, n.sub, C.dim, 11);
    });
    if (reduce) return () => {};
    const cm = comets(gd as SVGElement, 0.03, vis);
    const id = setInterval(() => {
      if (!vis.on) return;
      const i = (Math.random() * paths.length) | 0, [a, b, what] = LINKS[i];
      cm.add(paths[i], 0, 0.007 + Math.random() * 0.006);
      if (capRef.current && Math.random() < 0.25) capRef.current.textContent = `▸ ${N[a].name} → ${N[b].name}: ${what}`;
    }, narrow ? 360 : 200);
    return () => { clearInterval(id); cm.stop(); };
  });
  return (
    <section id="arch-s"><div className="wrap">
      <div className="head reveal"><p className="eyebrow">{"// what I run"}</p><h2>From the roadside to the cloud.</h2>
        <p className="lead">The platform my team operates: cameras and gantry edge boxes feed bare-metal Kubernetes over secure links, and every AI feature goes through one LLM gateway.</p></div>
      <div className="arch panel reveal">
        <svg id="arch" ref={ref} role="img" aria-label="Platform architecture: field devices feed edge AI boxes, which connect over secure tunnels to bare-metal Kubernetes running Cygnus, data stores and the LLM gateway" />
        <p className="dcap" ref={capRef} aria-hidden="true">▸ watching traffic…</p>
        <div className="legend"><span><i style={{ background: "var(--amber)" }} />field devices</span><span><i style={{ background: "var(--cyan)" }} />infra traffic</span><span><i style={{ background: "var(--violet)" }} />AI / LLM traffic</span><span><i style={{ background: "var(--green)" }} />healthy</span></div>
        <MoreButton detail={ARCH_DETAIL} label="Explain the architecture" />
      </div>
    </div></section>
  );
}

/* ---------------- AI hub ---------------- */
const CALLERS: [string, string, string, string][] = [["Cygnus", "AI features", "cygnus", "summarise an incident for the operator"], ["Agents", "MCP tools", "agent", "look up a site's status, read-only"], ["Ops copilots", "runbooks · RCA", "copilot", "draft a root-cause summary"], ["Voice agent", "call boxes", "voice", "understand a caller's request"]];
const MODELS: [string, string, string][] = [["Gemini", "Google", "twins"], ["Vertex AI", "managed", "vertex"], ["Ollama", "local · open", "local"]];
const ROLES = ["keys", "routing", "fallbacks", "budgets"];

export const HUB_DETAIL: Detail = {
  title: "How an AI request flows", kind: "v", icon: "gateway", tag: "LLM gateway", flow: "orbit",
  summary: "No feature talks to a model provider directly. Everything goes through one gateway that the team runs.",
  why: "One place to swap models, cap spend and survive a provider outage — without touching application code.",
  stats: [["4", "kinds of callers"], ["3", "model backends"], ["1", "gateway"]],
  stepsTitle: "One request, step by step",
  steps: [
    { icon: "cygnus", label: "Caller", detail: "A Cygnus feature, an agent, an ops copilot or the voice agent sends a request with its own key." },
    { icon: "tunnel", label: "Keys", detail: "The gateway checks who is calling and which models they may use." },
    { icon: "monitor", label: "Budgets", detail: "Rate limits and spend for that key are checked." },
    { icon: "gateway", label: "Routing", detail: "It picks the model for the job — Gemini, Vertex AI, or a local model on Ollama." },
    { icon: "twins", label: "Fallbacks", detail: "On a timeout or error it retries on the next model." },
    { icon: "tsdb", label: "Logged", detail: "The answer goes back and usage is logged per key." },
  ],
};

export function AIHub() {
  const capRef = useRef<HTMLParagraphElement>(null);
  const ref = useResponsiveBuild((narrow, reduce, vis) => {
    const svg = ref.current!; svg.innerHTML = "";
    const W = narrow ? 480 : 1200, H = narrow ? 520 : 560; svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    const cx = W / 2, cy = H / 2 + (narrow ? 0 : 10), R = narrow ? 52 : 78, V = C.violet, Cy = C.cyan;
    const defs = mk("defs", {}, svg);
    const rg = mk("radialGradient", { id: "hcore" }, defs);
    mk("stop", { offset: 0, "stop-color": V, "stop-opacity": 0.55 }, rg); mk("stop", { offset: 0.55, "stop-color": V, "stop-opacity": 0.12 }, rg); mk("stop", { offset: 1, "stop-color": V, "stop-opacity": 0 }, rg);
    const gl = mk("g", {}, svg), gn = mk("g", {}, svg), gd = mk("g", {}, svg);
    const place = (n: number, side: number) => Array.from({ length: n }, (_, i) => {
      if (narrow) return { x: side < 0 ? 52 : W - 52, y: 60 + ((i + 0.5) * (H - 120)) / n };
      const a = (i - (n - 1) / 2) * (n > 3 ? 0.46 : 0.52); return { x: cx + side * (Math.cos(a) * 400), y: cy + Math.sin(a) * 300 };
    });
    const cp = place(CALLERS.length, -1), mp = place(MODELS.length, 1);
    const grad = (id: string, c1: string, c2: string, a: { x: number; y: number }, b: { x: number; y: number }) => { const g = mk("linearGradient", { id, gradientUnits: "userSpaceOnUse", x1: a.x, y1: a.y, x2: b.x, y2: b.y }, defs); mk("stop", { offset: 0, "stop-color": c1 }, g); mk("stop", { offset: 1, "stop-color": c2 }, g); return `url(#${id})`; };
    type P = { x: number; y: number };
    const curve = (a: P, b: P) => `M${a.x} ${a.y} C ${(a.x + b.x) / 2} ${a.y}, ${(a.x + b.x) / 2} ${b.y}, ${b.x} ${b.y}`;
    const edge = (p: P, q: P, c1: string, c2: string, id: string, c: string) => {
      const st = grad(id, c1, c2, p, q); mk("path", { d: curve(p, q), fill: "none", stroke: st, "stroke-width": 6, "stroke-opacity": 0.07 }, gl);
      const el = mk("path", { d: curve(p, q), fill: "none", stroke: st, "stroke-width": 1.6, "stroke-opacity": 0.55, "stroke-dasharray": "2 6" }, gl) as SVGPathElement;
      if (!reduce && !narrow) mk("animate", { attributeName: "stroke-dashoffset", from: 16, to: 0, dur: "1.2s", repeatCount: "indefinite" }, el);
      return { p: el, len: el.getTotalLength(), c };
    };
    const rim = (p: P) => ({ x: cx + Math.sign(p.x - cx) * (R + 2), y: cy + (p.y - cy) * 0.25 });
    const off = (p: P, d: number) => ({ x: p.x + d * Math.sign(cx - p.x), y: p.y });
    const inE = cp.map((p, i) => edge(off(p, 32), rim(p), Cy, V, "hi" + i, Cy)), outE = mp.map((p, i) => edge(rim(p), off(p, 32), V, V, "ho" + i, V));
    mk("circle", { cx, cy, r: R * 2.1, fill: "url(#hcore)" }, gn);
    const ring = (r: number, dash: string, dur: number, dir: number, op: number) => { const g = mk("g", {}, gn); mk("circle", { cx, cy, r, fill: "none", stroke: V, "stroke-opacity": op, "stroke-width": 1.2, "stroke-dasharray": dash }, g); if (!reduce) mk("animateTransform", { attributeName: "transform", type: "rotate", from: `0 ${cx} ${cy}`, to: `${dir * 360} ${cx} ${cy}`, dur: dur + "s", repeatCount: "indefinite" }, g); };
    ring(R + 30, "1 7", 40, 1, 0.6); ring(R + 16, "60 14 6 14", 24, -1, 0.45);
    const tx = (x: number, y: number, t: string, c: string, sz: number, w = 0, anc = "middle") => { const e = mk("text", { x, y, "text-anchor": anc, fill: c, "font-size": sz, "font-weight": w || 400, "font-family": w ? "var(--sans)" : "var(--mono)" }, gn); e.textContent = t; return e; };
    const roleDots: SVGElement[] = [];
    ROLES.forEach((t, i) => {
      const a = ([-125, -55, 55, 125][i] * Math.PI) / 180, rx = cx + Math.cos(a) * (R + 30), ry = cy + Math.sin(a) * (R + 30);
      roleDots.push(mk("circle", { cx: rx, cy: ry, r: 4, fill: C.green }, gn));
      if (!narrow) tx(rx + (Math.cos(a) > 0 ? 10 : -10), ry + 4, t, C.dim, 12, 0, Math.cos(a) > 0 ? "start" : "end");
    });
    const pulse = mk("circle", { cx, cy, r: R, fill: "none", stroke: V, "stroke-width": 2, "stroke-opacity": 0 }, gn);
    mk("circle", { cx, cy, r: R, fill: C.bg, stroke: V, "stroke-width": 1.6 }, gn);
    mk("circle", { cx, cy, r: R - 8, fill: "none", stroke: V, "stroke-opacity": 0.25 }, gn);
    tx(cx, cy - 4, "LiteLLM", C.text, narrow ? 18 : 22, 700); tx(cx, cy + 16, "gateway", V, narrow ? 12 : 12);
    const node = (p: P, name: string, sub: string, ic: string, col: string, side: number) => {
      glyph(gn, p.x, p.y, ic, col, narrow ? 44 : 52, reduce || narrow);
      if (narrow) tx(p.x, p.y + 42, name, C.text, 15, 600);
      else { const x = p.x + side * 42, anc = side < 0 ? "end" : "start"; tx(x, p.y - 2, name, C.text, 15, 600, anc); tx(x, p.y + 16, sub, C.dim, 11.5, 0, anc); }
    };
    cp.forEach((p, i) => node(p, CALLERS[i][0], CALLERS[i][1], CALLERS[i][2], Cy, -1));
    mp.forEach((p, i) => node(p, MODELS[i][0], MODELS[i][1], MODELS[i][2], V, 1));
    if (reduce) return () => {};
    const cm = comets(gd as SVGElement, 0.025, vis);
    let pt = 0, raf = 0;
    const flash = (k: number) => { roleDots.forEach((d, j) => d.setAttribute("r", j === k ? "6.5" : "4")); };
    const id = setInterval(() => {
      if (!vis.on) return;
      const i = (Math.random() * CALLERS.length) | 0, fb = Math.random() < 0.2;
      const j = fb ? 1 : (Math.random() * MODELS.length) | 0;
      if (capRef.current) capRef.current.innerHTML = fb
        ? `<b>${CALLERS[i][0]}</b> → LiteLLM → <s>Gemini</s> timed out · <b class="v">fallback to Vertex AI</b> — ${CALLERS[i][3]}`
        : `<b>${CALLERS[i][0]}</b> → LiteLLM → <b class="v">${MODELS[j][0]}</b> — ${CALLERS[i][3]}`;
      cm.add(inE[i], 0, 0.012, () => { pt = 1; flash(fb ? 2 : 1); });
      if (fb) cm.add({ ...outE[0], c: C.amber }, 1.05, 0.02);
      cm.add(outE[j], fb ? 1.6 : 1.05, 0.012, () => flash(-1));
    }, 1600);
    const tick = () => { if (vis.on && pt > 0) { pulse.setAttribute("r", String(R + (1 - pt) * 26)); pulse.setAttribute("stroke-opacity", String(pt * 0.8)); pt = Math.max(0, pt - 0.025); } raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { clearInterval(id); cm.stop(); cancelAnimationFrame(raf); };
  });
  return (
    <div className="hub panel reveal">
      <div className="cap"><span><i style={{ background: "var(--cyan)" }} />callers</span><span><i style={{ background: "var(--violet)" }} />models</span></div>
      <svg id="hub" ref={ref} role="img" aria-label="AI request flow: product features and agents call the LiteLLM gateway, which routes to Gemini, Vertex AI and local Ollama models" />
      <p className="dcap hubcap" ref={capRef} aria-hidden="true">▸ waiting for a request…</p>
      <MoreButton detail={HUB_DETAIL} label="How an AI request flows" />
    </div>
  );
}
