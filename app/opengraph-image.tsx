import { ImageResponse } from "next/og";
import { profile } from "./lib/portfolio";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TAGS = ["Kubernetes", "CI/CD", "LLM gateway", "Edge AI", "Observability"];

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px 84px",
        backgroundColor: "#05080d", backgroundImage: "radial-gradient(circle at 80% 20%, rgba(47,240,196,.25), transparent 45%), radial-gradient(circle at 10% 90%, rgba(62,230,255,.2), transparent 45%)", color: "#e3ebf4" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 26, color: "#46f08c" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#46f08c" }} />ctx: tarun@prod
        </div>
        <div style={{ fontSize: 104, fontWeight: 800, letterSpacing: -4, marginTop: 28, lineHeight: 1 }}>{profile.name}</div>
        <div style={{ fontSize: 40, color: "#3ee6ff", marginTop: 22 }}>{`${profile.role} · ${profile.company}`}</div>
        <div style={{ display: "flex", gap: 14, marginTop: 44 }}>
          {TAGS.map((t) => (
            <div key={t} style={{ fontSize: 26, padding: "10px 20px", borderRadius: 12, border: "1px solid #22324a", color: "#b9c6d4" }}>{t}</div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
