"use client";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/app/lib/portfolio";

const LINKS = [
  ["pipeline", "pipeline"], ["arch-s", "architecture"], ["exp", "git log"], ["platforms", "platforms"], ["building", "projects"],
  ["ai", "ai"], ["services", "services"], ["field", "field"], ["stack-s", "stack"], ["contact", "contact"],
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cur, setCur] = useState("");
  useEffect(() => {
    const on = () => {
      setScrolled(scrollY > 20);
      let c = "";
      document.querySelectorAll("main section").forEach((s) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) c = s.id; });
      setCur(c);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <nav className={`top${scrolled ? " scrolled" : ""}${open ? " open" : ""}`}>
      <div className="wrap">
        <span className="ctx"><i />ctx: tarun@prod</span>
        <ul>
          {LINKS.map(([id, t]) => (
            <li key={id}><a href={`#${id}`} className={cur === id ? "on" : ""} onClick={() => setOpen(false)}>{t}</a></li>
          ))}
        </ul>
        <button className="menu" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /></button>
      </div>
    </nav>
  );
}

// Adds .in to .reveal elements as they scroll into view.
export function Reveal() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el, i) => { (el as HTMLElement).style.transitionDelay = (i % 3) * 0.08 + "s"; io.observe(el); });
    // Pause CSS and SVG animations in sections that are off-screen; most of the per-frame cost on phones.
    const vis = new IntersectionObserver((es) => es.forEach((e) => {
      e.target.classList.toggle("off", !e.isIntersecting);
      e.target.querySelectorAll("svg").forEach((s) => (e.isIntersecting ? s.unpauseAnimations() : s.pauseAnimations()));
    }), { rootMargin: "150px 0px" });
    document.querySelectorAll("main > section, main > header, footer").forEach((el) => vis.observe(el));
    return () => { io.disconnect(); vis.disconnect(); };
  }, []);
  return null;
}

// Background: a slowly drifting service mesh (cyan = infra, violet = AI).
export function Mesh() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, x = c.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    type N = { x: number; y: number; vx: number; vy: number; r: number; ai: boolean };
    let W = 0, H = 0, dpr = 1, nodes: N[] = [], raf = 0, mx = -1e4, my = -1e4;
    const pk: { a: N; b: N; t: number; ai: boolean }[] = [];
    // Phones get fewer nodes, 1x pixels and a lower frame rate; the background stays subtle either way.
    const small = matchMedia("(max-width: 760px), (pointer: coarse)").matches;
    const step = small ? 50 : 33;
    let lastW = 0;
    const init = () => {
      if (innerWidth === lastW && nodes.length) { H = c.height = innerHeight * dpr; return; } // mobile toolbar resize: keep nodes
      lastW = innerWidth;
      dpr = small ? 1 : Math.min(devicePixelRatio || 1, 1.25); W = c.width = innerWidth * dpr; H = c.height = innerHeight * dpr;
      const n = small ? 22 : Math.round(Math.min(80, Math.max(30, (innerWidth * innerHeight) / 18000)));
      nodes = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.14 * dpr, vy: (Math.random() - 0.5) * 0.14 * dpr, r: (Math.random() * 1.4 + 0.8) * dpr, ai: Math.random() < 0.18 }));
    };
    const move = (e: PointerEvent) => { mx = e.clientX * dpr; my = e.clientY * dpr; };
    let last = 0;
    const frame = (now = 0) => {
      if (!reduce) raf = requestAnimationFrame(frame);
      if (document.hidden || now - last < step) return; // background runs at 20-30fps
      last = now;
      x.clearRect(0, 0, W, H); const L = 150 * dpr;
      if (!reduce) for (const n of nodes) { n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > W) n.vx *= -1; if (n.y < 0 || n.y > H) n.vy *= -1; }
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j], dd = Math.hypot(a.x - b.x, a.y - b.y);
        if (dd < L) {
          const near = Math.max(0, 1 - Math.hypot((a.x + b.x) / 2 - mx, (a.y + b.y) / 2 - my) / (220 * dpr));
          x.strokeStyle = a.ai && b.ai ? `rgba(47,240,196,${(1 - dd / L) * 0.22 + near * 0.25})` : `rgba(62,230,255,${(1 - dd / L) * 0.13 + near * 0.25})`;
          x.lineWidth = dpr * 0.8; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke();
          if (!reduce && Math.random() < 0.0009) pk.push({ a, b, t: 0, ai: a.ai && b.ai });
        }
      }
      for (const n of nodes) { x.fillStyle = n.ai ? "rgba(47,240,196,.7)" : "rgba(62,230,255,.5)"; x.beginPath(); x.arc(n.x, n.y, n.r, 0, 7); x.fill(); }
      for (let i = pk.length - 1; i >= 0; i--) {
        const p = pk[i]; p.t += 0.02; if (p.t >= 1) { pk.splice(i, 1); continue; }
        const px = p.a.x + (p.b.x - p.a.x) * p.t, py = p.a.y + (p.b.y - p.a.y) * p.t;
        const g = x.createRadialGradient(px, py, 0, px, py, 7 * dpr), col = p.ai ? "47,240,196" : "70,240,140";
        g.addColorStop(0, `rgba(${col},.95)`); g.addColorStop(1, `rgba(${col},0)`); x.fillStyle = g; x.beginPath(); x.arc(px, py, 7 * dpr, 0, 7); x.fill();
      }
    };
    init(); frame(1e9);
    addEventListener("resize", init); addEventListener("pointermove", move);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", init); removeEventListener("pointermove", move); };
  }, []);
  return (<><canvas id="mesh" ref={ref} aria-hidden="true" /><div className="bg-fade" /></>);
}

export function Footer() {
  return (
    <footer><div className="wrap"><span>© {new Date().getFullYear()} {profile.name}</span><span>exit 0</span></div></footer>
  );
}
