import { PageWrapper } from "@/components/marketing/page-wrapper";

interface RoadmapItem {
  title: string;
  desc: string;
  tag?: string;
}

interface Column {
  label: string;
  color: string;
  bg: string;
  border: string;
  dot: string;
  items: RoadmapItem[];
}

const COLUMNS: Column[] = [
  {
    label: "Shipped",
    color: "#4ade80",
    bg: "rgba(74,222,128,0.08)",
    border: "rgba(74,222,128,0.2)",
    dot: "#4ade80",
    items: [
      { title: "AI Text Generation", desc: "GPT-4o powered responses with custom system prompts and persona control." },
      { title: "Conversation History", desc: "Full searchable history of every chat session, stored per bot." },
      { title: "Billing & Subscriptions", desc: "Stripe-powered plans with usage metering and plan enforcement." },
      { title: "Embeddable Widget", desc: "One-line JS snippet to embed your chatbot on any website." },
      { title: "Knowledge Base", desc: "Upload documents and URLs to ground your bot in your own content." },
    ],
  },
  {
    label: "In Progress",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.2)",
    dot: "#fbbf24",
    items: [
      { title: "Image Generation", desc: "Let your bots generate images via DALL·E 3 or Stable Diffusion.", tag: "Q3 2025" },
      { title: "API Access", desc: "Programmatic REST API so developers can build on top of Nocodly AI.", tag: "Q3 2025" },
      { title: "Advanced Analytics", desc: "Deeper conversation insights — intent detection, drop-off analysis.", tag: "Q3 2025" },
    ],
  },
  {
    label: "Planned",
    color: "#94a3b8",
    bg: "rgba(148,163,184,0.06)",
    border: "rgba(148,163,184,0.15)",
    dot: "#94a3b8",
    items: [
      { title: "Fine-Tuning", desc: "Train models on your own data for domain-specific accuracy.", tag: "Q4 2025" },
      { title: "Agents", desc: "Multi-step autonomous agents that can browse, search, and take actions.", tag: "Q4 2025" },
      { title: "Voice", desc: "Voice-enabled bots with speech-to-text and text-to-speech support.", tag: "2026" },
      { title: "Multi-language UI", desc: "Full localization — serve users in their native language automatically.", tag: "2026" },
      { title: "Team Collaboration", desc: "Invite teammates, assign roles, and co-manage bots together.", tag: "2026" },
    ],
  },
];

export default function RoadmapPage() {
  return (
    <PageWrapper>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: "2rem", padding: "0.25rem 1rem", marginBottom: "1.5rem",
          }}>
            <span style={{ fontSize: "0.75rem", color: "#8b5cf6", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Roadmap</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "#f1f5f9", marginBottom: "1rem", lineHeight: 1.2 }}>
            Where we&apos;re headed
          </h1>
          <p style={{ fontSize: "1.0625rem", color: "#94a3b8", maxWidth: "38rem", margin: "0 auto" }}>
            A transparent look at what we&apos;ve built, what we&apos;re working on, and what&apos;s coming next.
          </p>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginBottom: "3rem", flexWrap: "wrap" }}>
          {COLUMNS.map((col) => (
            <div key={col.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: col.dot }} />
              <span style={{ fontSize: "0.8125rem", color: "#94a3b8" }}>{col.label}</span>
            </div>
          ))}
        </div>

        {/* Columns */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
          {COLUMNS.map((col) => (
            <div key={col.label}>
              {/* Column header */}
              <div style={{
                display: "flex", alignItems: "center", gap: "0.625rem",
                padding: "0.625rem 1rem", borderRadius: "0.625rem",
                background: col.bg, border: `1px solid ${col.border}`,
                marginBottom: "0.875rem",
              }}>
                <div style={{ width: "0.625rem", height: "0.625rem", borderRadius: "50%", background: col.dot, flexShrink: 0 }} />
                <span style={{ fontWeight: 600, color: col.color, fontSize: "0.9375rem" }}>{col.label}</span>
                <span style={{
                  marginLeft: "auto", background: "rgba(255,255,255,0.08)",
                  borderRadius: "2rem", padding: "0.1rem 0.5rem",
                  fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600,
                }}>
                  {col.items.length}
                </span>
              </div>

              {/* Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {col.items.map((item) => (
                  <div key={item.title} style={{
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "0.875rem", padding: "1.125rem",
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.375rem" }}>
                      <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#f1f5f9", margin: 0 }}>{item.title}</h3>
                      {item.tag && (
                        <span style={{
                          fontSize: "0.6875rem", color: "#475569",
                          background: "rgba(255,255,255,0.05)", borderRadius: "2rem",
                          padding: "0.15rem 0.5rem", whiteSpace: "nowrap", flexShrink: 0,
                        }}>
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: "0.8125rem", color: "#94a3b8", lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Feedback CTA */}
        <div style={{
          marginTop: "4rem", textAlign: "center",
          background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)",
          borderRadius: "1rem", padding: "2.5rem",
        }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.5rem" }}>
            Want something on the roadmap?
          </h3>
          <p style={{ color: "#94a3b8", marginBottom: "1.25rem", fontSize: "0.9375rem" }}>
            We prioritize features based on real user feedback. Tell us what you need.
          </p>
          <a href="/contact" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
            color: "#fff", fontWeight: 600, fontSize: "0.9375rem",
            padding: "0.625rem 1.5rem", borderRadius: "0.625rem", textDecoration: "none",
          }}>
            Request a feature
          </a>
        </div>
      </div>
    </PageWrapper>
  );
}
