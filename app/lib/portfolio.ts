// Public portfolio copy. Keep client names, contract details and internal hostnames out of this file.

export type Kind = "c" | "v" | "g" | "a";

export type Step = { icon: string; label: string; detail: string; cmd?: string };
export type Flow = "rail" | "orbit" | "snake" | "terminal" | "layers" | "hub" | "cards" | "ladder";

export type Detail = {
  title: string;
  kind: Kind;
  icon?: string;
  tag?: string;
  summary: string;
  why?: string;
  stats?: [string, string][];
  stepsTitle?: string;
  steps?: Step[];
  pointsTitle?: string;
  points?: string[];
  chips?: string[];
  service?: boolean;
  flow?: Flow;
  phaseFlow?: Flow;
};

export const profile = {
  name: "Tarun Chaudhary",
  role: "Team Lead",
  company: "NaturNest AI · InfraX AI",
  email: "imtarunchaudhary2@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/imtarunchaudhary2",
    github: "https://github.com/tarunchaudhary2",
  },
  tagline:
    "I lead a cross-functional team that builds and runs InfraX AI's highway and video platforms 24×7 — from bare-metal Kubernetes and roadside edge boxes to the LLM gateway behind our AI features.",
};

export const team = [
  "Full-stack developers",
  "Frontend developers",
  "Backend developers",
  "AI engineers",
  "Sales & marketing",
  "Interns",
  "AI Beings",
  "Site operations",
];

export type Experience = { role: string; company: string; period: string; points: string[] };

export const experience: Experience[] = [
  {
    role: "Team Lead",
    company: "NaturNest AI · InfraX AI",
    period: "Sep 2026 – Present",
    points: [
      "Lead a cross-functional team: full-stack, frontend and backend developers, AI engineers, sales & marketing, interns, AI Beings, and site operations (operations lead and operators).",
      "Run daily standups, task assignment, 1:1s, access approvals and the PR review/merge gate.",
      "Own production releases for Cygnus and Plexus — develop → main promotion, prod deploys and rollback calls.",
      "Run incident response and root-cause analysis across live customer sites.",
      "Rolled out AI co-developers to the team and automated the daily standup draft.",
      "Drive architecture for worker autoscaling and large-scale camera federation.",
      "Support presales with solution architecture, sizing and technical proposals.",
    ],
  },
  {
    role: "DevOps Engineer",
    company: "NaturNest AI · InfraX AI",
    period: "Sep 2025 – Sep 2026",
    points: [
      "Built CI/CD on Azure Pipelines and GitHub Actions with Helm and kustomize releases to bare-metal Kubernetes.",
      "Ran stateful workloads — MySQL, PostgreSQL/TimescaleDB, Redis, MongoDB, MinIO — with automated backups.",
      "Scaled MediaMTX RTSP → WebRTC/HLS streaming to 100+ cameras.",
      "Took end-to-end ownership of the production LiteLLM gateway in front of Vertex AI.",
      "Deployed and calibrated roadside edge boxes (OpenVINO, Jetson) for ANPR and incident detection.",
      "Secured sites with IPsec site-to-site VPN, Cloudflare Tunnel/Access and mTLS.",
    ],
  },
  {
    role: "Engineer – Cloud & Infra Services",
    company: "LTIMindtree",
    period: "Jun 2023 – Sep 2025",
    points: [
      "Azure DevOps CI/CD with Terraform and AWS CloudFormation for cloud provisioning.",
      "Docker and EKS deployments on AWS for scalable, reliable services.",
      "PowerShell and Bash automation integrated with Prometheus, Grafana and CloudWatch.",
      "Administered Linux environments, build artifacts and secure delivery.",
    ],
  },
];

export const education = {
  degree: "Bachelor of Computer Applications",
  school: "GLA University, Mathura",
  period: "2020 – 2023",
};

export type Product = { title: string; tag: string; kind: Kind; icon: string; tagline: string; stack: string[] };

// Brand name first, category underneath (e.g. Plexus · ATMS). Names follow the canonical product list.
export const products: Product[] = [
  { title: "Cygnus", tag: "VMS · video management", kind: "c", icon: "cygnus", tagline: "Every camera, one screen — live, recorded and searchable.", stack: ["Kubernetes", "MediaMTX", "WebRTC", "TimescaleDB", "MinIO"] },
  { title: "Plexus", tag: "ATMS · traffic management", kind: "c", icon: "gantry", tagline: "The highway's control room, running 24×7.", stack: ["Node.js", "MySQL", "Redis", "Azure Pipelines"] },
  { title: "Dhrishya", tag: "VIDES · roadside AI", kind: "c", icon: "vision", tagline: "AI eyes at the roadside.", stack: ["OpenVINO", "Jetson", "YOLO", "MQTT"] },
  { title: "AstraAlert", tag: "ECB · emergency call boxes", kind: "a", icon: "callbox", tagline: "Help is one press away.", stack: ["Voice", "Whisper", "TTS"] },
  { title: "WayKeep", tag: "Ops · field operations", kind: "g", icon: "iac", tagline: "Keeps the road crews moving.", stack: ["Work orders", "Assets", "Attendance"] },
  { title: "Nexus", tag: "Agents · AI engine", kind: "v", icon: "neural", tagline: "The mind behind our AI agents.", stack: ["AI agents", "Operator approval"] },
  { title: "Halley", tag: "MLFF · free-flow tolling", kind: "c", icon: "gantry", tagline: "Tolling at highway speed.", stack: ["FASTag", "ANPR"] },
  { title: "Fareline", tag: "Toll · plaza", kind: "a", icon: "tag", tagline: "Every toll lane, one system.", stack: ["FASTag", "UPI", "Cash"] },
  { title: "Dwaar", tag: "Access & parking", kind: "g", icon: "tunnel", tagline: "One gate for entry, exit and parking.", stack: ["Access", "Parking"] },
  { title: "Vega", tag: "ANPR · low-cost", kind: "c", icon: "cctv", tagline: "Plate reading that fits in your palm.", stack: ["Raspberry Pi", "ANPR"] },
  { title: "Edge OTA & base OS", tag: "Edge · fleet updates", kind: "c", icon: "ota", tagline: "Updates without the road trip.", stack: ["Linux", "systemd", "OTA"] },
];

export type Building = { title: string; tag: string; status: "In build" | "Live beta" | "POC"; icon: string; kind: Kind; teaser: string; hints: string[] };

// Personal projects in progress: teaser copy only, no implementation details.
export const building: Building[] = [
  { title: "Monarch", tag: "Markets", status: "In build", icon: "monitor", kind: "g",
    teaser: "Your AI research desk for the markets.",
    hints: ["reading the markets", "learning every day", "paper trades only"] },
  { title: "Frontera", tag: "Real estate", status: "Live beta", icon: "ingress", kind: "c",
    teaser: "Your always-on home finder.",
    hints: ["always searching", "finding homes worth a call", "more cities soon"] },
  { title: "Rakshak", tag: "Home security", status: "POC", icon: "tunnel", kind: "a",
    teaser: "Your home's cameras, safely in your pocket.",
    hints: ["watching over homes", "family-first", "coming to mobile"] },
  { title: "One-Place", tag: "Growth for local businesses", status: "In build", icon: "agent", kind: "v",
    teaser: "Helping local businesses get found online.",
    hints: ["finding businesses", "telling their story", "launching soon"] },
];

export type AiItem = Detail & { desc: string };

export const ai: AiItem[] = [
  {
    title: "LLM gateway in production", kind: "v", icon: "gateway", tag: "AI platform", flow: "hub",
    desc: "Own the LiteLLM gateway in front of Vertex AI / Gemini — routing, keys and uptime for every AI feature.",
    summary: "Every AI feature in our products calls one gateway that my team runs, instead of talking to model providers directly.",
    why: "Without a gateway, every feature carries its own provider keys, retries and cost tracking. One gateway makes models swappable and spend visible.",
    stats: [["1", "endpoint for every model"], ["3", "model backends"], ["0", "provider keys inside apps"]],
    steps: [
      { icon: "cygnus", label: "Request", detail: "A feature or agent sends a standard, OpenAI-compatible request with its own virtual key." },
      { icon: "tunnel", label: "Auth", detail: "The gateway checks the key and which models that caller is allowed to use." },
      { icon: "monitor", label: "Budget", detail: "Rate limits and per-key spend caps are enforced before anything is billed." },
      { icon: "gateway", label: "Route", detail: "The request goes to the model chosen for that kind of job — fast, managed or local." },
      { icon: "twins", label: "Fallback", detail: "If a model times out or errors, the gateway retries on the next one automatically." },
      { icon: "tsdb", label: "Log", detail: "Latency, tokens and cost are recorded per key and shown on dashboards." },
    ],
    pointsTitle: "What I own", points: ["Deploying and upgrading the gateway", "Key, budget and routing policy", "Uptime and latency monitoring", "Onboarding new features onto it"],
    chips: ["LiteLLM", "Vertex AI", "Gemini", "Ollama", "Kubernetes"],
  },
  {
    title: "AI co-developers for the team", kind: "v", icon: "copilot", tag: "How the team works", flow: "terminal",
    desc: "Run always-on AI engineering partners (AI Beings on Claude Code + Codex) with shared memory, wired into the team's chat, and rolled one out to each teammate.",
    summary: "Every engineer on my team has an AI Being — a persistent AI co-developer with its own memory, tools and permissions. It drafts, investigates and runs routine work; people decide, review and merge.",
    why: "A small team covers video, edge, data and AI at once. Beings take the repetitive load — triage, drafts, reports, follow-ups — so people spend their time on decisions, design and review.",
    stats: [["1:1", "a Being for every engineer"], ["Shared", "memory across machines"], ["100%", "human-reviewed merges"]],
    stepsTitle: "A day with a Being",
    steps: [
      { icon: "copilot", label: "Morning brief", cmd: 'gh pr list --search "review-requested:@me"', detail: "Reads overnight alerts, PRs and chat, then drafts the standup and today's priorities." },
      { icon: "agent", label: "Pick up work", cmd: "gh issue view 482 --comments", detail: "Takes a ticket in a domain session — video, edge, data — with the lead Being coordinating." },
      { icon: "tsdb", label: "Recall", cmd: 'git -C .beings pull && grep -ri "rollback" memory/', detail: "Pulls decisions, conventions and past fixes from shared memory synced across every machine." },
      { icon: "commit", label: "Draft & PR", cmd: "gh pr create --draft --fill", detail: "Drafts code, tests and notes, then opens a pull request for its owner to review." },
      { icon: "callbox", label: "Report back", cmd: 'curl -sX POST "$TEAMS_WEBHOOK" -d @status.json', detail: "Posts short status updates in the team chat and flags anything that needs a human." },
    ],
    pointsTitle: "How it's wired in",
    points: [
      "Lives in the team chat: Microsoft Teams and Telegram",
      "Shared memory, synced across every machine",
      "Acts on its owner's accounts with scoped permission",
      "Runs recurring work: standups, PR triage, alert summaries, release notes",
      "Tiered autonomy: risky or external actions need approval",
      "No AI co-authors, no secrets in output, every merge human-reviewed",
    ],
    chips: ["Claude Code", "Codex", "MCP", "Microsoft Teams", "Telegram", "Git-synced memory"],
  },
  {
    title: "Agent tooling (MCP)", kind: "v", icon: "agent", tag: "Agents", flow: "snake",
    desc: "Prototyped a read-only MCP server so AI agents can query Cygnus safely.",
    summary: "A Model Context Protocol server that lets AI agents look things up in Cygnus without being able to change anything.",
    why: "Agents are useful when they can see live data — and risky if they can act on it. Read-only tools give the first without the second.",
    stats: [["Read-only", "by design"], ["0", "write tools"], ["MCP", "open standard"]],
    steps: [
      { icon: "agent", label: "Question", detail: "An agent needs live data — for example, which cameras at a site are offline." },
      { icon: "tunnel", label: "MCP call", detail: "It calls a tool exposed by the MCP server instead of touching the database." },
      { icon: "shieldok", label: "Guardrails", detail: "Only allow-listed, read-only queries exist, with scoped credentials." },
      { icon: "cygnus", label: "Cygnus API", detail: "The tool queries the Cygnus API and returns structured data." },
      { icon: "sparkles", label: "Answer", detail: "The agent answers with real data — and has no way to change anything." },
    ],
    pointsTitle: "Design choices", points: ["Allow-listed tools instead of raw database access", "Scoped, read-only credentials", "Responses shaped for language models"],
    chips: ["MCP", "LLM agents", "Cygnus API"],
  },
  {
    title: "Computer vision at the edge", kind: "c", icon: "vision", tag: "Roadside AI", flow: "cards",
    desc: "YOLO detection, CRNN/SVTR plate OCR and fire/smoke models on OpenVINO and Jetson; ANPR evaluation targeting 99.5% character accuracy.",
    summary: "Models that run on small boxes at the roadside, with no GPU server in the loop.",
    why: "Highways don't have reliable bandwidth. Running models at the roadside means only events travel — not hours of raw video.",
    stats: [["99.5%", "character-accuracy target"], ["Edge", "no server GPU needed"], ["3", "model families"]],
    steps: [
      { icon: "cctv", label: "Frame", detail: "The gantry camera captures a frame as a vehicle passes." },
      { icon: "edgechip", label: "Detect", detail: "YOLO finds the vehicle and its number plate on the edge box." },
      { icon: "vision", label: "Read", detail: "CRNN/SVTR OCR reads the plate characters." },
      { icon: "shieldok", label: "Score", detail: "Every read gets a confidence score; low scores are flagged for review." },
      { icon: "ota", label: "Send", detail: "The event goes upstream over MQTT; improved models arrive over the air." },
    ],
    pointsTitle: "What I do", points: ["Deploy and calibrate boxes on site", "Evaluate ANPR accuracy against labelled data", "Retrain for local plates and lighting", "Convert models for OpenVINO and ONNX"],
    chips: ["YOLO", "CRNN/SVTR", "OpenVINO", "Jetson", "ONNX", "MQTT"],
  },
  {
    title: "Speech", kind: "v", icon: "voice", tag: "Voice agent research", flow: "orbit",
    desc: "Whisper / faster-whisper GPU benchmarks for the call-box voice agent.",
    summary: "Research for a voice agent on roadside emergency call boxes.",
    why: "Call boxes are used in stressful moments. A voice agent must understand noisy, accented speech fast enough to feel like a conversation — and hand over to a person instantly.",
    stats: [["GPU", "benchmarks run"], ["2", "Whisper variants compared"], ["Human", "always in the loop"]],
    steps: [
      { icon: "callbox", label: "Call", detail: "A caller presses the call box at the roadside." },
      { icon: "voice", label: "Transcribe", detail: "Whisper turns the caller's speech into text." },
      { icon: "agent", label: "Understand", detail: "An agent works out what the caller needs." },
      { icon: "stream", label: "Reply", detail: "Text-to-speech answers the caller." },
      { icon: "copilot", label: "Hand off", detail: "An operator can take over at any point." },
    ],
    pointsTitle: "Status", points: ["Benchmarked Whisper vs faster-whisper on GPU", "Comparing text-to-speech options", "Designing the operator hand-off"],
    chips: ["Whisper", "faster-whisper", "TTS", "GPU"],
  },
  {
    title: "Local & open models", kind: "v", icon: "local", tag: "Private AI", flow: "ladder",
    desc: "Ollama and local LLMs; designed a GPU server plan for running open models and LoRA fine-tuning in-house.",
    summary: "Running open models on our own hardware for private or offline work.",
    why: "Some data shouldn't leave the building, and some sites go offline. Local models cover both — and fine-tuning makes them fit our domain.",
    stats: [["0", "bytes leave the network"], ["LoRA", "fine-tuning pipeline designed"], ["Open", "weights only"]],
    steps: [
      { icon: "gateway", label: "Request", detail: "A private or offline request reaches the gateway." },
      { icon: "local", label: "Ollama", detail: "It's routed to an open model on our own GPU server." },
      { icon: "neural", label: "Fine-tune", detail: "LoRA fine-tuning on our own data, with an evaluation step, designed for the in-house GPU server." },
      { icon: "shieldok", label: "Private", detail: "Data and weights stay on our hardware." },
    ],
    pointsTitle: "What I designed", points: ["GPU server sizing and budget", "Model selection for our tasks", "Fine-tuning pipeline with evaluation"],
    chips: ["Ollama", "Open LLMs", "LoRA", "GPU"],
  },
];

export const deployments = [
  { title: "Highway corridors", tag: "Transport", summary: "Traffic management and 24×7 control rooms running on our platform." },
  { title: "Industrial sites", tag: "Industry", summary: "On-site video analytics that recovers on its own after power cuts." },
  { title: "Managed DevOps", tag: "Enterprise", summary: "CI/CD pipelines and cloud delivery for enterprise customers." },
];

export const daily = [
  "Standups & task assignment across the team",
  "PR review and merge gate",
  "Production releases & rollbacks",
  "Incident response and root cause",
  "Edge-box rollouts at live sites",
  "Scaling & architecture design",
  "Presales architecture & sizing",
  "LLM gateway operations",
];

export type StackGroup = { name: string; icon: string; sub: string; wide?: boolean; kind: Kind; tools: string[]; note: string };

export const stack: StackGroup[] = [
  { name: "Cloud", icon: "cloud", sub: "providers", kind: "c", tools: ["Azure", "GCP", "AWS"], note: "Vertex AI and GKE on GCP, EKS and CloudWatch on AWS, Azure DevOps and Pipelines on Azure." },
  { name: "Kubernetes", icon: "helm", sub: "orchestration", wide: true, kind: "c", tools: ["Bare-metal K8s", "Helm", "kustomize", "ingress-nginx", "GKE", "EKS"], note: "Production runs on bare-metal clusters; Helm and kustomize package every release." },
  { name: "CI/CD", icon: "loop", sub: "delivery", kind: "c", tools: ["Azure Pipelines", "GitHub Actions", "Jenkins"], note: "Every merge is built, scanned and released through a gated pipeline." },
  { name: "IaC", icon: "iac", sub: "provisioning", kind: "c", tools: ["Terraform", "CloudFormation"], note: "Cloud resources are declared in code and reviewed like any other change." },
  { name: "Data", icon: "tsdb", sub: "stateful workloads", wide: true, kind: "c", tools: ["MySQL", "PostgreSQL", "TimescaleDB", "Redis", "MongoDB", "MinIO"], note: "Stateful services on Kubernetes with automated backups; TimescaleDB for traffic time-series." },
  { name: "Video", icon: "stream", sub: "streaming", kind: "c", tools: ["MediaMTX", "WebRTC", "HLS", "ffmpeg", "ONVIF/RTSP"], note: "Camera streams in over RTSP, out to browsers over WebRTC and HLS." },
  { name: "Edge", icon: "edgechip", sub: "roadside compute", kind: "c", tools: ["OpenVINO", "Jetson", "ONNX", "MQTT", "systemd"], note: "Models run on roadside boxes; MQTT carries events back." },
  { name: "AI / LLM", icon: "sparkles", sub: "models & agents", wide: true, kind: "v", tools: ["LiteLLM", "Vertex AI", "Gemini", "Ollama", "MCP", "Claude Code", "Whisper", "YOLO"], note: "One gateway for every model, agents with read-only tools, and AI co-developers for the team." },
  { name: "Network & security", icon: "tunnel", sub: "zero-trust links", kind: "c", tools: ["IPsec VPN", "FortiGate", "Cloudflare Tunnel", "mTLS"], note: "Sites connect over encrypted tunnels; services authenticate each other." },
  { name: "Observability", icon: "monitor", sub: "metrics & alerts", wide: true, kind: "g", tools: ["Prometheus", "Grafana", "Zabbix", "CloudWatch"], note: "Metrics, dashboards and alerts across cloud, cluster and edge." },
  { name: "Scripting", icon: "terminal", sub: "automation", kind: "c", tools: ["Bash", "Python", "PowerShell", "Node.js"], note: "Glue for backups, rollouts and day-to-day automation." },
];

export const careerStart = new Date(2023, 5, 1);
