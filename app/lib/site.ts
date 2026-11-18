import { profile, stack } from "./portfolio";

// Canonical origin for metadata, sitemap and structured data. NEXT_PUBLIC_SITE_URL wins;
// on Vercel it falls back to the project's production domain, locally to the dev server.
const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || (vercelProd ? `https://${vercelProd}` : "http://localhost:3001")).replace(/\/$/, "");

export const seo = {
  title: "Tarun Chaudhary — Team Lead & DevOps Engineer | Kubernetes, CI/CD, LLM Ops",
  description:
    "Team Lead at NaturNest AI (InfraX AI). DevOps for Kubernetes, CI/CD, observability, video streaming, edge AI and LLM gateways. Available for DevOps consulting and freelance projects.",
  keywords: [
    "Tarun Chaudhary", "DevOps engineer", "DevOps consultant", "freelance DevOps", "Team Lead", "Kubernetes", "bare-metal Kubernetes",
    "Helm", "CI/CD", "Azure Pipelines", "GitHub Actions", "Terraform", "LiteLLM", "LLM gateway", "MLOps", "edge AI", "OpenVINO",
    "Jetson", "WebRTC streaming", "MediaMTX", "Prometheus", "Grafana", "GCP", "AWS", "Azure", "India",
  ],
};

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: profile.name,
        url: siteUrl,
        email: `mailto:${profile.email}`,
        jobTitle: profile.role,
        worksFor: { "@type": "Organization", name: "NaturNest AI" },
        alumniOf: { "@type": "CollegeOrUniversity", name: "GLA University" },
        sameAs: [profile.links.linkedin, profile.links.github],
        knowsAbout: stack.flatMap((g) => g.tools),
      },
      {
        "@type": "ProfessionalService",
        name: `${profile.name} — DevOps consulting`,
        url: `${siteUrl}/#services`,
        provider: { "@id": `${siteUrl}/#person` },
        areaServed: "Worldwide",
        serviceType: ["Kubernetes platforms", "CI/CD pipelines", "LLM gateway & AI ops", "Video & edge AI", "Observability", "Cloud & IaC"],
      },
      { "@type": "WebSite", name: profile.name, url: siteUrl, inLanguage: "en" },
    ],
  };
}
