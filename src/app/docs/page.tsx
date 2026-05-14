import { PageWrapper } from "@/components/marketing/page-wrapper";

const DOC_SECTIONS = [
  {
    icon: "🚀",
    title: "Getting Started",
    desc: "Install Nocodly AI, create your first bot, and go live in under 5 minutes.",
    links: ["Quick Start", "Installation", "Your First Bot"],
  },
  {
    icon: "📖",
    title: "API Reference",
    desc: "Full REST API documentation with request/response examples for every endpoint.",
    links: ["Authentication", "Endpoints", "Rate Limits"],
  },
  {
    icon: "🗺️",
    title: "Guides",
    desc: "Step-by-step tutorials for common use-cases, integrations, and advanced setups.",
    links: ["Embed Widget", "Webhooks", "Custom Prompts"],
  },
  {
    icon: "💡",
    title: "Examples",
    desc: "Real-world example projects to copy, fork, and deploy as your own.",
    links: ["Customer Support Bot", "Lead Qualifier", "FAQ Assistant"],
  },
];

export default function DocsPage() {
  return (
    <PageWrapper>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: "2rem", padding: "0.25rem 1rem", marginBottom: "1.5rem",
          }}>
            <span style={{ fontSize: "0.75rem", color: "#8b5cf6", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Documentation</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "#f1f5f9", marginBottom: "1rem", lineHeight: 1.2 }}>
            Everything you need to build
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#94a3b8", maxWidth: "36rem", margin: "0 auto 2rem" }}>
            Comprehensive documentation, guides, and API references to help you integrate Nocodly AI into your product.
          </p>
          {/* Search bar (decorative) */}
          <div style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "0.75rem", padding: "0.75rem 1.25rem", maxWidth: "28rem", margin: "0 auto",
          }}>
            <span style={{ color: "#475569", fontSize: "1rem" }}>🔍</span>
            <span style={{ color: "#475569", fontSize: "0.9375rem" }}>Search documentation…</span>
          </div>
        </div>

        {/* Doc section grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "4rem" }}>
          {DOC_SECTIONS.map((section) => (
            <div key={section.title} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "1rem", padding: "1.75rem",
              transition: "border-color 0.2s, background 0.2s",
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,92,246,0.3)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(139,92,246,0.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{section.icon}</div>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "0.5rem" }}>{section.title}</h3>
              <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.6, marginBottom: "1.25rem" }}>{section.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {section.links.map((link) => (
                  <li key={link} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ color: "#8b5cf6", fontSize: "0.75rem" }}>→</span>
                    <span style={{ fontSize: "0.875rem", color: "#64748b" }}>{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Coming soon notice */}
        <div style={{
          background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.25)",
          borderRadius: "1rem", padding: "2rem", textAlign: "center",
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🏗️</div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "0.5rem" }}>
            Full docs coming soon
          </h3>
          <p style={{ color: "#94a3b8", marginBottom: "1.25rem", fontSize: "0.9375rem" }}>
            We&apos;re actively writing our documentation. In the meantime, join our Discord community for help and answers.
          </p>
          <a
            href="https://discord.gg/"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
              color: "#fff", fontWeight: 600, fontSize: "0.9375rem",
              padding: "0.625rem 1.5rem", borderRadius: "0.625rem",
              textDecoration: "none",
            }}
          >
            Join Discord
          </a>
        </div>
      </div>
    </PageWrapper>
  );
}
