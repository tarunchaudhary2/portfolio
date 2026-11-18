"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { profile, type Detail } from "@/app/lib/portfolio";
import { ClickCard, Icon } from "./ui";

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const sv = (icon: string, label: string, detail: string, cmd?: string) => ({ icon, label, detail, cmd });

const SERVICES: (Detail & { line: string })[] = [
  { title: "Kubernetes platforms", flow: "layers", phaseFlow: "rail", icon: "helm", kind: "c", tag: "Service", service: true,
    line: "Bare-metal or cloud clusters, Helm releases, ingress and stateful workloads that survive failures.",
    summary: "Design and set up Kubernetes for production — on your own servers or on GKE, EKS or AKS — and leave your team able to run it.",
    why: "Your services run on hand-built VMs or a cluster nobody fully understands, and every deploy feels risky.",
    stats: [["Bare metal", "or managed cloud"], ["Tested", "backup & restore"], ["Runbooks", "for your team"]],
    stepsTitle: "What gets built",
    steps: [sv("iac", "Assess", "Review workloads, traffic and the failure points that hurt today."), sv("helm", "Cluster", "Set up the cluster with ingress, TLS and sensible defaults."), sv("loop", "Releases", "Package each service with Helm or kustomize."), sv("tsdb", "State", "Run databases and storage with backups you've actually restored."), sv("monitor", "Operate", "Dashboards, alerts and runbooks for day two.")],
    pointsTitle: "What you get", points: ["A production cluster with ingress and TLS", "Helm charts for your services", "Backup and restore, tested", "Runbooks and a handover session"],
    chips: ["Kubernetes", "Helm", "kustomize", "ingress-nginx", "GKE", "EKS"] },
  { title: "CI/CD pipelines", flow: "rail", phaseFlow: "ladder", icon: "loop", kind: "c", tag: "Service", service: true,
    line: "Gated pipelines with tests, image scanning, atomic deploys and automatic rollback.",
    summary: "Pipelines that make shipping boring: every change built, tested, scanned and rolled out safely.",
    why: "Releases are manual, slow, or occasionally take production down.",
    stats: [["Every", "change gated"], ["Atomic", "deploys"], ["Auto", "rollback"]],
    stepsTitle: "The pipeline",
    steps: [sv("commit", "Commit", "Pull request checks and code review."), sv("cube", "Build", "Container image built with cached layers, tagged by commit."), sv("shieldok", "Test & scan", "Tests, lint and an image vulnerability scan."), sv("tag", "Release", "Versioned chart or artifact pushed."), sv("rocket", "Deploy", "Atomic rollout with health checks and automatic rollback.")],
    pointsTitle: "What you get", points: ["Pipeline as code in your repo", "Quality and security gates", "dev → staging → prod promotion", "Rollback on failed health checks"],
    chips: ["Azure Pipelines", "GitHub Actions", "Jenkins", "Helm"] },
  { title: "LLM gateway & AI ops", flow: "hub", phaseFlow: "cards", icon: "gateway", kind: "v", tag: "Service", service: true,
    line: "One gateway for every model — keys, budgets, routing and fallbacks — plus agents with safe, read-only tools.",
    summary: "Put AI features into production without every team wiring up its own model keys and retries.",
    why: "Several teams call LLMs directly, keys are scattered and nobody can see the bill until it arrives.",
    stats: [["1", "endpoint for all models"], ["Per-team", "keys & budgets"], ["Fallbacks", "on errors"]],
    stepsTitle: "What gets built",
    steps: [sv("agent", "Inventory", "Find every place that calls a model today."), sv("gateway", "Gateway", "Deploy LiteLLM with keys per team or feature."), sv("twins", "Routing", "Pick models per task and add fallbacks."), sv("monitor", "Visibility", "Dashboards for spend, latency and errors."), sv("tunnel", "Agents", "Optional read-only MCP tools for your agents.")],
    pointsTitle: "What you get", points: ["LiteLLM deployed and monitored", "Per-team keys and budgets", "A fallback policy", "Optional MCP tools for agents"],
    chips: ["LiteLLM", "Vertex AI", "OpenAI-compatible", "Ollama", "MCP"] },
  { title: "Video & edge AI", flow: "cards", phaseFlow: "orbit", icon: "edgechip", kind: "a", tag: "Service", service: true,
    line: "Camera streaming at scale and computer vision on edge boxes, updated over the air.",
    summary: "Live video in the browser and AI on cameras at remote sites — built to keep working on unreliable networks.",
    why: "You need many cameras in a browser with low delay, or AI running on-site where bandwidth is poor.",
    stats: [["100+", "cameras streamed"], ["Low-latency", "WebRTC"], ["OTA", "updates"]],
    stepsTitle: "What gets built",
    steps: [sv("cctv", "Cameras", "Onboard RTSP/ONVIF cameras."), sv("stream", "Stream", "Relay to browsers over WebRTC and HLS."), sv("edgechip", "Edge AI", "Run detection models on site."), sv("ota", "Updates", "Ship models and fixes over the air."), sv("monitor", "Monitor", "Know when a camera or box drops.")],
    pointsTitle: "What you get", points: ["RTSP → WebRTC/HLS streaming", "Recording and timeline playback", "Edge inference on OpenVINO/Jetson", "Remote updates with rollback"],
    chips: ["MediaMTX", "WebRTC", "HLS", "OpenVINO", "Jetson", "MQTT"] },
  { title: "Observability", flow: "terminal", phaseFlow: "snake", icon: "monitor", kind: "g", tag: "Service", service: true,
    line: "Dashboards and alerts that tell you about problems before your customers do.",
    summary: "Metrics, dashboards and alert routing across cloud, cluster and edge — with a fix linked to every alert.",
    why: "You find out about outages from customers, or alerts fire so often that everyone ignores them.",
    stats: [["Every", "service on a dashboard"], ["Actionable", "alerts only"], ["RCA", "template"]],
    stepsTitle: "What gets built",
    steps: [sv("monitor", "Collect", "Exporters on hosts, clusters and apps.", "helm upgrade --install kube-prometheus-stack prometheus-community/kube-prometheus-stack -n monitoring"), sv("tsdb", "Store", "Prometheus or Zabbix, sized for your data.", "promtool check config prometheus.yml"), sv("sparkles", "Visualise", "Grafana dashboards per service.", "kubectl -n monitoring apply -f dashboards/"), sv("callbox", "Alert", "Rules with sane thresholds, routed to on-call.", "amtool check-config alertmanager.yml"), sv("iac", "Runbooks", "Each alert links to what to do about it.", "promtool check rules rules/*.yml")],
    pointsTitle: "What you get", points: ["Dashboards per service", "Tuned alert rules", "On-call routing", "Incident and RCA template"],
    chips: ["Prometheus", "Grafana", "Zabbix", "CloudWatch"] },
  { title: "Cloud & IaC", flow: "ladder", phaseFlow: "layers", icon: "cloud", kind: "c", tag: "Service", service: true,
    line: "Terraform or CloudFormation for AWS, GCP and Azure, reviewed like code.",
    summary: "Cloud infrastructure declared in code — reproducible, reviewable and cheaper to run.",
    why: "Your cloud was clicked together over time and nobody is sure what's running or what it costs.",
    stats: [["3", "clouds supported"], ["Reviewed", "infra changes"], ["Cost", "& drift checks"]],
    stepsTitle: "What gets built",
    steps: [sv("cloud", "Audit", "Map what exists and what it costs."), sv("iac", "Codify", "Write Terraform or CloudFormation for it."), sv("commit", "Review", "Every change goes through a pull request."), sv("loop", "Apply", "Pipelines apply approved changes."), sv("monitor", "Watch", "Cost and drift alerts.")],
    pointsTitle: "What you get", points: ["IaC for your existing stack", "Reviewed, repeatable changes", "Cost and drift checks"],
    chips: ["Terraform", "CloudFormation", "AWS", "GCP", "Azure"] },
];

export function Services() {
  return (
    <section id="services"><div className="wrap">
      <div className="head reveal"><p className="eyebrow">{"// helm install tarun"}</p><h2>What I can help with.</h2>
        <p className="lead">Available for consulting and freelance DevOps work. Click a card for details.</p></div>
      <div className="svc">
        {SERVICES.map((s) => (
          <ClickCard key={s.title} detail={s} className={`gcard reveal${s.kind === "v" ? "" : s.kind === "g" ? " g" : s.kind === "a" ? " a" : " c"}`}>
            <div className="orb"><Icon name={s.icon!} k={s.kind} /></div>
            <h4>{s.title}</h4><p>{s.line}</p>
          </ClickCard>
        ))}
      </div>
    </div></section>
  );
}

// Quick topics stay visible; the rest live in a searchable, grouped picker.
const QUICK = ["Kubernetes", "CI/CD", "LLM gateway", "Observability", "Cloud & IaC"];
const GROUPS: [string, string[]][] = [
  ["Platform", ["Kubernetes", "CI/CD", "GitOps", "Helm & packaging", "Docker & containers", "Bare-metal clusters"]],
  ["Cloud", ["Cloud & IaC", "AWS", "GCP", "Azure", "Cost optimisation", "Cloud migration"]],
  ["Reliability", ["Observability", "Incident response", "SRE & on-call", "Backups & DR", "Security & hardening"]],
  ["AI", ["LLM gateway", "AI agents & MCP", "AI co-developers for teams", "Local & open models", "Computer vision"]],
  ["Video & edge", ["Video & edge AI", "Video streaming", "Edge devices", "OTA updates"]],
  ["Work with me", ["Full-time role", "Consulting", "Speaking or collab", "Something else"]],
];
const ALL = GROUPS.flatMap(([, t]) => t);
const SHOW_EXTRA = 2;
const topicFor = (title: string) => ALL.find((t) => t.toLowerCase() === title.toLowerCase()) ?? ALL.find((t) => title.toLowerCase().includes(t.split(" ")[0].toLowerCase())) ?? "Something else";

function TopicPicker({ topics, toggle }: { topics: string[]; toggle: (t: string) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const dlg = useRef<HTMLDialogElement>(null);
  // Picker opens as a modal in the top layer, so it never overflows the card or sits under the footer.
  useEffect(() => {
    const d = dlg.current; if (!d) return;
    const root = document.documentElement;
    if (open && !d.open) { d.showModal(); root.style.overflow = "hidden"; }
    if (!open && d.open) d.close();
    return () => { root.style.overflow = ""; };
  }, [open]);
  // Only a couple of extra picks show as pills so the form never grows; the rest collapse into "+N more".
  const extra = topics.filter((t) => !QUICK.includes(t));
  const pill = (t: string, x = false) => (
    <button type="button" key={t} className={topics.includes(t) ? "on" : ""} aria-pressed={topics.includes(t)} onClick={() => toggle(t)}>{t}{x && <b aria-hidden="true"> ×</b>}</button>
  );
  return (
    <div className="tk-topics">
      <p className="tk-legend">topics <span>pick any</span></p>
      <div className="tk-pills">
        {QUICK.map((t) => pill(t))}
        {extra.slice(0, SHOW_EXTRA).map((t) => pill(t, true))}
        {extra.length > SHOW_EXTRA && <button type="button" className="on tk-count" onClick={() => setOpen(true)}>+{extra.length - SHOW_EXTRA} more</button>}
        <button type="button" className="tk-more" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "close" : `＋ more topics (${ALL.length - QUICK.length})`}</button>
      </div>
      <dialog ref={dlg} className="tk-pop" aria-label="All topics" onClose={() => setOpen(false)} onClick={(e) => { if (e.target === dlg.current) setOpen(false); }}>
        {open && <div className="tk-pop-in">
          <p className="tk-pop-h">All topics <button type="button" className="pop-x" aria-label="Close" onClick={() => setOpen(false)}>×</button></p>
          <input className="tk-search" placeholder="Search topics…" value={q} onChange={(e) => setQ(e.target.value)} autoFocus />
          <div className="tk-groups">
            {GROUPS.map(([g, ts]) => {
              const shown = ts.filter((t) => t.toLowerCase().includes(q.toLowerCase()));
              return shown.length ? <div key={g}><p>{g}</p><div className="tk-pills">{shown.map((t) => pill(t))}</div></div> : null;
            })}
          </div>
          <p className="tk-pop-foot">{topics.length} selected<button type="button" onClick={() => setOpen(false)}>done</button></p>
        </div>}
      </dialog>
    </div>
  );
}
const yamlStr = (v: string, ph: string) => (v.trim() ? JSON.stringify(v.trim()) : `<${ph}>`);

export default function Contact() {
  const [f, setF] = useState({ fullName: "", email: "", subject: "", message: "" });
  const [topics, setTopics] = useState<string[]>([QUICK[0]]);
  const toggle = (t: string) => setTopics((x) => (x.includes(t) ? x.filter((y) => y !== t) : [...x, t]));
  const topic = topics.length ? topics.join(", ") : "Something else";
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const [ticket, setTicket] = useState("");
  useEffect(() => { if (publicKey) emailjs.init(publicKey); }, []);
  useEffect(() => {
    const on = (e: Event) => { const t = (e as CustomEvent<string>).detail; setTopics((x) => (x.includes(topicFor(t)) ? x : [...x, topicFor(t)])); setF((x) => ({ ...x, subject: x.subject || `Help with ${t}` })); };
    addEventListener("prefill-subject", on);
    return () => removeEventListener("prefill-subject", on);
  }, []);
  const on = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [e.target.name]: e.target.value });
  const submit = async (e: FormEvent) => {
    e.preventDefault(); setError("");
    if (!serviceId || !templateId || !publicKey) { setError("The form isn't configured yet — please email me directly."); return; }
    setState("sending");
    try {
      // The ticket id goes into the email subject so it matches what the visitor sees.
      const id = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;
      await emailjs.send(serviceId, templateId, {
        title: `${id} · [${topic}] ${f.subject}`, ticket: id, topics: topic, subject: f.subject,
        name: f.fullName, email: f.email, message: f.message,
        sent_at: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }) + " IST",
      }, publicKey);
      setTicket(id);
      setState("sent"); setF({ fullName: "", email: "", subject: "", message: "" });
      setTimeout(() => setState("idle"), 6000);
    } catch {
      setError("Couldn't send the message. Please try again or email me."); setState("idle");
    }
  };
  const msgLine = f.message.trim().split("\n")[0] ?? "";
  return (
    <section className="contact" id="contact"><div className="wrap">
      <p className="eyebrow reveal">{"// open a ticket"}</p>
      <h2 className="reveal">Let&apos;s ship <em>something reliable.</em></h2>
      <p className="lead reveal tk-lead">Tell me what you&apos;re building or what keeps breaking. Pick one or more topics, add a few lines, and it lands straight in my inbox.</p>

      <div className="tk reveal">
        <aside className="tk-side">
          <div className="tk-yaml">
            <div className="tk-bar"><i /><i /><i /><span>ticket.yaml</span><b className={state}>{state === "sent" ? "sent" : state === "sending" ? "applying…" : "draft"}</b></div>
            <pre aria-hidden="true">
<span className="k">apiVersion</span>: tarun.dev/v1{"\n"}
<span className="k">kind</span>: Ticket{"\n"}
<span className="k">metadata</span>:{"\n"}
{"  "}<span className="k">from</span>: <span className={f.fullName ? "v" : "ph"}>{yamlStr(f.fullName, "your-name")}</span>{"\n"}
{"  "}<span className="k">replyTo</span>: <span className={f.email ? "v" : "ph"}>{yamlStr(f.email, "you@company.com")}</span>{"\n"}
<span className="k">spec</span>:{"\n"}
{"  "}<span className="k">topics</span>: <span className="t">[{topics.slice(0, 3).join(", ")}{topics.length > 3 ? `, +${topics.length - 3} more` : ""}]</span>{"\n"}
{"  "}<span className="k">subject</span>: <span className={f.subject ? "v" : "ph"}>{yamlStr(f.subject, "short summary")}</span>{"\n"}
{"  "}<span className="k">message</span>: <span className={msgLine ? "v" : "ph"}>{msgLine ? JSON.stringify(msgLine.length > 42 ? msgLine.slice(0, 42) + "…" : msgLine) : "<what's going on>"}</span><i className="tk-caret" />{"\n"}
<span className="k">status</span>: <span className={state === "sent" ? "ok" : "d"}>{state === "sent" ? `accepted · ${ticket}` : "pending"}</span>
            </pre>
          </div>
          <div className="tk-links">
            <a href={`mailto:${profile.email}`}><Icon name="tunnel" k="c" /><span><b>Email</b>{profile.email}</span></a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener"><Icon name="copilot" k="g" /><span><b>LinkedIn</b>/in/imtarunchaudhary2</span></a>
            <a href={profile.links.github} target="_blank" rel="noopener"><Icon name="commit" k="v" /><span><b>GitHub</b>@tarunchaudhary2</span></a>
          </div>
        </aside>

        <form className="tk-form" onSubmit={submit}>
          {state === "sent" ? (
            <div className="tk-done" role="status">
              <svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" /><path d="M15 27l7 7 15-15" /></svg>
              <h3>Ticket {ticket} received</h3>
              <p>Thanks — I&apos;ll get back to you by email.</p>
            </div>
          ) : (
            <>
              <TopicPicker topics={topics} toggle={toggle} />
              <div className="tk-row">
                <label className="tk-f"><input name="fullName" value={f.fullName} onChange={on} required autoComplete="name" placeholder=" " /><span>Your name</span></label>
                <label className="tk-f"><input name="email" type="email" value={f.email} onChange={on} required autoComplete="email" placeholder=" " /><span>Email</span></label>
              </div>
              <label className="tk-f"><input name="subject" value={f.subject} onChange={on} required placeholder=" " /><span>Subject</span></label>
              <label className="tk-f tk-msg"><textarea name="message" rows={5} value={f.message} onChange={on} required placeholder=" " maxLength={2000} /><span>What&apos;s going on?</span><em>{f.message.length}/2000</em></label>
              <div className="tk-send">
                <span className={error ? "err" : ""} aria-live="polite">{error || "Replies come from my personal email."}</span>
                <button className={`btn tk-btn${state === "sending" ? " busy" : ""}`} type="submit" disabled={state === "sending"}>
                  <i />{state === "sending" ? "applying…" : "$ kubectl apply -f ticket.yaml"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div></section>
  );
}
