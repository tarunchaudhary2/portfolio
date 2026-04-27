"use client";
import React, { useEffect, useState } from 'react';
import { Github, Dribbble, X, Lock, ExternalLink } from 'lucide-react';
import { sectionPadding } from '../styles/styles';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../logo/logoImg';

type ProjectDetails = {
  overview: string;
  features: string[];
  techStack: string[];
  architecture?: string;
};

type ProjectData = {
  icon: React.ReactNode;
  title: string;
  description: string;
  image?: string;
  githubLink?: string;
  dribbbleLink?: string;
  privateRepo?: boolean;
  details: ProjectDetails;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ProjectCard = ({ project, onClick }: { project: ProjectData; onClick: () => void }) => {
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <motion.div
      variants={fadeInUp}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      className="bg-white/10 border border-white/20 backdrop-blur-lg shadow-lg p-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-white/20 mx-auto flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      <div>
        <div className="text-purple-600 mb-4">{project.icon}</div>

        {project.image && (
          <div className="mb-4 overflow-hidden rounded-xl flex justify-center items-center">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-contain scale-90"
            />
          </div>
        )}

        <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
        <p className="text-gray-300 text-sm">{project.description}</p>
      </div>

      <div className="flex flex-row flex-wrap gap-4 mt-4">
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={stop}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            <span className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-all duration-300">
              <Github size={16} />
            </span>
            GitHub
          </a>
        )}
        {project.privateRepo && (
          <span className="flex items-center gap-2 text-sm text-gray-400">
            <span className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
              <Lock size={16} />
            </span>
            Private Repo
          </span>
        )}
        {project.dribbbleLink && (
          <a
            href={project.dribbbleLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={stop}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            <span className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-all duration-300">
              <Dribbble size={16} />
            </span>
            Website
          </a>
        )}
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }: { project: ProjectData | null; onClose: () => void }) => {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            >
              <X size={18} />
            </button>

            {project.image && (
              <div className="overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-800 to-black flex justify-center items-center p-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="max-h-72 w-auto object-contain"
                />
              </div>
            )}

            <div className="p-6 md:p-8 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">{project.title}</h2>

              <section className="mb-6">
                <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-2">Overview</h3>
                <p className="text-gray-300 leading-relaxed">{project.details.overview}</p>
              </section>

              {project.details.architecture && (
                <section className="mb-6">
                  <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-2">Architecture</h3>
                  <p className="text-gray-300 leading-relaxed">{project.details.architecture}</p>
                </section>
              )}

              <section className="mb-6">
                <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-2">Key Features</h3>
                <ul className="list-disc list-outside pl-5 space-y-1 text-gray-300 marker:text-purple-400">
                  {project.details.features.map((f, i) => (
                    <li key={i} className="pl-1">{f}</li>
                  ))}
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.details.techStack.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-purple-600/20 border border-purple-500/40 text-purple-200 text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </section>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-purple-600 transition text-sm text-white"
                  >
                    <Github size={16} /> GitHub
                  </a>
                )}
                {project.privateRepo && (
                  <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-sm text-gray-400">
                    <Lock size={16} /> Source — Private Repo
                  </span>
                )}
                {project.dribbbleLink && (
                  <a
                    href={project.dribbbleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-sm text-white"
                  >
                    <ExternalLink size={16} /> Visit Site
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Projects = () => {
  const [openProject, setOpenProject] = useState<ProjectData | null>(null);

  const projects: ProjectData[] = [
    {
      icon: <Logo />,
      title: "🎥 InfraX VMS — Video Management System",
      description:
        "Multi-tenant Video Management System for traffic and surveillance: RTSP → WebRTC live streaming, MediaMTX-driven fMP4 recording, timeline playback, and a 100+ camera video wall.",
      image: "/images/VMS.png",
      dribbbleLink: "https://develop.vms.infraxai.cloud/live",
      privateRepo: true,
      details: {
        overview:
          "InfraX VMS is a multi-tenant Video Management System built at InfraX.AI for traffic monitoring, airport surveillance, mall security, and any large-scale camera deployment. The system is built around four independent, horizontally-scalable subsystems — Live Streaming, Video Wall, Recording, and Playback — and is designed to scale to 1000+ cameras while keeping live-stream latency fully isolated from the recording pipeline.",
        architecture:
          "RTSP cameras feed MediaMTX nodes (passthrough/copy mode, ~100 cameras per node) which expose WebRTC (primary) and HLS (fallback) outputs through a Fastify proxy. Recording uses MediaMTX's built-in fMP4 format — crash-safe with a 1-second RPO and 15-minute segments. Each finalized segment fires an HTTP hook to a Node.js upload worker that SHA-256-hashes the file and stores it in MinIO with metadata in PostgreSQL + TimescaleDB. Redis serves as the service registry, motion-event bus, and node-health tracker. A React 19 + Vite client renders the live view, video wall, and an HTML5 <video> playback page with timeline scrubber, segment navigator, and speed control.",
        features: [
          "Live streaming via WebRTC (primary) with HLS fallback, proxied through Fastify",
          "Video wall up to 100 cameras using individual WebRTC tiles with adaptive sub-stream selection",
          "MediaMTX built-in fMP4 recording — crash-safe with a 1-second RPO and 15-minute segments",
          "Multi-tenant per-tenant configurable retention (NHAI 90-day compliance on roadmap)",
          "Object-based storage on MinIO with hot/cold tiering and SHA-256 integrity hashes",
          "Playback UI with timeline scrubber, segment seek, fullscreen, and 0.5×–8× speed control",
          "PTZ control via ONVIF, Hikvision ISAPI, Dahua, and generic HTTP",
          "Horizontal scaling — add MediaMTX nodes via Service Registry to handle more cameras",
          "Crash recovery — startup scan finds un-uploaded segments, upload pipeline retries with exponential backoff",
          "Deployed via Docker Compose, Helm/Kubernetes, and Terraform on GCP (Workload Identity + Artifact Registry)",
        ],
        techStack: [
          "React 19",
          "TypeScript",
          "Vite",
          "Tailwind CSS",
          "Fastify 4",
          "Node.js (ESM)",
          "Socket.IO",
          "MediaMTX",
          "FFmpeg",
          "WebRTC",
          "HLS.js",
          "MinIO",
          "PostgreSQL 16",
          "TimescaleDB",
          "Redis 7",
          "ONVIF",
          "Docker",
          "Kubernetes",
          "Helm",
          "Terraform",
          "GCP",
          "Prometheus",
          "Grafana",
        ],
      },
    },
    {
      icon: <Logo />,
      title: "🚦 Advanced Traffic Management System (ATMS)",
      description:
        "Production multi-service traffic platform at InfraX.AI: real-time incident detection, e-challan automation, and a LangGraph AI agent for natural-language ops.",
      image: "/images/ATMS.png",
      dribbbleLink: "https://dev.infraxai.cloud/dashboard",
      privateRepo: true,
      details: {
        overview:
          "Production multi-service Advanced Traffic Management System built at InfraX.AI for highway traffic monitoring, incident management, and automated enforcement. Deployed for clients such as Trans-Haryana, ATMS combines a Node.js + Socket.IO backend, a React 19 + TypeScript control-room UI (~87k LOC), and a Python LangGraph AI agent backed by an MCP server exposing 100+ tools for natural-language operations.",
        architecture:
          "Three-tier hybrid architecture: a Node.js/Express backend for REST + WebSocket business logic with Sequelize/Mongoose models; a React/TypeScript SPA for control-room operators using Zustand + TanStack Query; and a Python LangGraph AI agent that calls a Node MCP server (100+ ATMS tools) with role-aware execution and SQLite session persistence. Multi-database storage — MySQL (transactional), MongoDB (documents), Redis (hot caches), MinIO (S3-compatible blobs). Deployed three ways: Docker Compose for dev, Kubernetes via Azure Pipelines for enterprise prod, and bare-metal k8s with a local registry for air-gapped environments — all behind Nginx with automated Let's Encrypt TLS.",
        features: [
          "VIDS — Video Incident Detection (wrong-way driving, stalled vehicles, pedestrians, reverse traffic)",
          "VSDS — Vehicle Speed Detection with ANPR (Automatic Number Plate Recognition)",
          "ATCC — Automatic Traffic Counter & Classifier (volumes, classes, peak-hour analysis)",
          "Automated e-challan generation with image evidence and full payment lifecycle",
          "RPO (Road Police Officer) field operations — assignment, location tracking, incident workflow",
          "Real-time control-room dashboards with Socket.IO push (incidents, traffic, weather)",
          "Conversational AI assistant — LangGraph plan/execute/finalize loop over 100+ MCP tools",
          "Role-based access control at the agent layer (admin / operator / RPO / viewer)",
          "PDF & Excel report generation with trend analytics and exportable dashboards",
          "External feed ingestion via secured POST /api/external/{route} (VIDS / VSDS / ATCC)",
        ],
        techStack: [
          "Node.js",
          "Express",
          "Socket.IO",
          "React 19",
          "TypeScript",
          "Vite",
          "Tailwind CSS",
          "Zustand",
          "TanStack Query",
          "Python 3.12",
          "LangGraph",
          "FastAPI",
          "MCP",
          "MySQL 8",
          "MongoDB",
          "Redis",
          "MinIO",
          "MQTT",
          "Docker",
          "Kubernetes",
          "Longhorn",
          "Nginx",
          "Azure DevOps",
          "Let's Encrypt",
        ],
      },
    },
    {
      icon: <Logo />,
      title: "🎬 Fandora — Content IP Investment Platform",
      description:
        "India-first Web3 platform for fractional, tokenised investment in creative content (films, music, web series). Escrow-backed payments, KYC-compliant onboarding, and on-chain XRC-20 tokens on the XDC network.",
      image: "/images/Fandora.png",
      dribbbleLink: "https://fandora.app/",
      privateRepo: true,
      details: {
        overview:
          "Fandora is an India-based, Web3-enabled content-IP investment platform that lets retail investors take fractional ownership in creative projects — films, music, web series, sponsorships, and live events. It connects investors, creators/producers, and platform operators through KYC-compliant onboarding (PAN, Aadhaar, video KYC), third-party escrow (Escrow Pay India), a wallet ledger, and on-chain XRC-20 tokens on the XDC Apothem network.",
        architecture:
          "Mono-repo with four workspaces: a Node.js/Express + Sequelize backend (58 domain models, RabbitMQ workers, Socket.IO + SSE), a Next.js 15 investor frontend, a React 19 + Vite admin SPA, and a Terraform/Helm-managed GKE deployment in asia-south2 (Mumbai). MySQL 8, Redis 7, and RabbitMQ 4 run in-cluster via Bitnami Helm charts; AWS S3 / GCS handle media; External Secrets Operator syncs 23+ Google Secret Manager entries hourly. On-chain logic uses Solidity contracts — FactoryCore, XRC20Project, OrderManager, Escrow — with Pinata + IPFS for immutable project documents. A static egress NAT IP lets payment partners (Cashfree, Escrow Pay India) whitelist Fandora's outbound traffic.",
        features: [
          "Fractional, tokenised investment in films, music, web series, sponsorships, and live events",
          "Multi-step KYC: PAN, Aadhaar, video verification, and bank-account verification (Cashfree + Passbase)",
          "Two-stage payments — ~20% Expression of Interest followed by final payment — via Cashfree and Razorpay",
          "Escrow-protected fund flow via Escrow Pay India with a wallet ledger in MySQL",
          "On-chain XRC-20 token issuance on XDC Apothem with smart-contract escrow and order management",
          "In-browser DocuSeal contract e-signing",
          "Investor portfolio with revenue/royalty distribution and exit tracking",
          "Admin SPA for project approval, KYC oversight, fee management, royalty distribution, and company/cast/crew records",
          "Real-time updates via Socket.IO and Server-Sent Events",
          "Async jobs (emails, reconciliations, notifications) via RabbitMQ + node-cron",
        ],
        techStack: [
          "Next.js 15",
          "React 18",
          "TypeScript",
          "Tailwind CSS",
          "ShadCN / Radix",
          "Zustand",
          "TanStack Query",
          "Express 4",
          "Node.js 18",
          "Sequelize",
          "Socket.IO",
          "MySQL 8",
          "Redis 7",
          "RabbitMQ 4",
          "Solidity",
          "XDC Apothem",
          "ethers.js",
          "Pinata / IPFS",
          "Cashfree",
          "Razorpay",
          "DocuSeal",
          "Passbase",
          "Terraform",
          "Helm",
          "GKE",
          "GCP",
          "External Secrets Operator",
          "GitHub Actions",
        ],
      },
    },
    {
      icon: <Logo />,
      title: " 📝 Todo Application",
      description:
        "React Todo app demonstrating Docker containerization and an AWS + Jenkins CI/CD pipeline from development to production.",
      image: "/images/todoappss.png",
      githubLink: "https://github.com/tarunchaudhary2/todoapp",
      dribbbleLink: "https://todoapp-nine-henna.vercel.app/",
      details: {
        overview:
          "Modern To-Do application built with React, demonstrating full application-lifecycle management — from development to production deployment — using Docker containerization and an AWS DevOps CI/CD pipeline driven by Jenkins.",
        features: [
          "Add, update, and delete tasks",
          "Mark tasks as completed",
          "Light/dark mode support",
          "Task filtering: All / Active / Completed",
          "Responsive UI compatible with desktop, tablet, and mobile",
          "Containerized with Docker for portability and reproducibility",
          "Automated CI/CD pipeline with AWS DevOps and Jenkins",
        ],
        techStack: ["React", "JavaScript", "CSS", "Docker", "Jenkins", "AWS", "Vercel"],
      },
    },
    {
      icon: <Logo />,
      title: "💼 Portfolio",
      description:
        "Personal portfolio site built with Next.js 15, React 19, Tailwind CSS, and Framer Motion. Fully responsive and deployed on Vercel.",
      image: "/images/portfolioss.png",
      githubLink: "https://github.com/tarunchaudhary2/portfolio",
      dribbbleLink: "https://portfolio-two-xi-39.vercel.app/",
      details: {
        overview:
          "Personal portfolio website built with Next.js 15 and React 19 to showcase my experience, services, skills, projects, and certifications. Styled with Tailwind CSS, animated with Framer Motion and Lottie, fully responsive across desktop, tablet, and mobile, and deployed on Vercel.",
        features: [
          "Animated hero, about, services, skills, and projects sections",
          "Dark theme with smooth section transitions powered by Framer Motion",
          "Lottie animations for tech-stack icons (AWS, Azure, Kubernetes, Docker, Terraform, etc.)",
          "EmailJS-powered contact form",
          "SCSS modules + Tailwind CSS for styling",
          "Responsive layout for desktop, tablet, and mobile",
          "Deployed on Vercel with automatic builds on every push",
        ],
        techStack: [
          "Next.js 15",
          "React 19",
          "TypeScript",
          "Tailwind CSS",
          "SCSS",
          "Framer Motion",
          "Lottie",
          "EmailJS",
          "Vercel",
        ],
      },
    },
  ];

  return (
    <>
      <motion.div
        id="projects"
        className={`${sectionPadding} bg-gradient-to-br from-black via-gray-900 to-black text-white py-28`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="container relative px-4 max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2">My Projects</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Innovative web and cloud applications designed to improve productivity, deliver seamless user experiences, and showcase modern development best practices.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.2 },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                onClick={() => setOpenProject(project)}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </>
  );
};

export default Projects;
