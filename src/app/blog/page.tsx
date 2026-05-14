import { PageWrapper } from "@/components/marketing/page-wrapper";

export default function BlogPage() {
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
            <span style={{ fontSize: "0.75rem", color: "#8b5cf6", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Blog</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "#f1f5f9", marginBottom: "1rem", lineHeight: 1.2 }}>
            Stories, tutorials &amp; updates
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#94a3b8", maxWidth: "36rem", margin: "0 auto" }}>
            Deep dives into AI, product building, and the future of work — from the team at Nocodly AI.
          </p>
        </div>

        {/* Empty state */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "5rem 2rem", textAlign: "center",
        }}>
          {/* Illustration */}
          <div style={{ position: "relative", marginBottom: "2.5rem" }}>
            <div style={{
              width: "8rem", height: "8rem", borderRadius: "50%",
              background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto",
            }}>
              <span style={{ fontSize: "3.5rem" }}>✏️</span>
            </div>
            {/* Floating dots */}
            <div style={{
              position: "absolute", top: "0.5rem", right: "-1rem",
              width: "0.75rem", height: "0.75rem", borderRadius: "50%",
              background: "rgba(139,92,246,0.4)",
            }} />
            <div style={{
              position: "absolute", bottom: "0", left: "-1.25rem",
              width: "0.5rem", height: "0.5rem", borderRadius: "50%",
              background: "rgba(6,182,212,0.4)",
            }} />
          </div>

          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem" }}>
            No posts yet — we&apos;re writing!
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "#94a3b8", maxWidth: "30rem", lineHeight: 1.65, marginBottom: "2.5rem" }}>
            Our first posts are in the works. Subscribe below to be notified when we publish — expect practical guides, product updates, and thoughts on building with AI.
          </p>

          {/* Subscribe CTA */}
          <div style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "1rem", padding: "2rem", width: "100%", maxWidth: "28rem",
          }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "0.5rem" }}>
              Get notified when we publish
            </h3>
            <p style={{ fontSize: "0.8125rem", color: "#94a3b8", marginBottom: "1.25rem" }}>
              No spam. Unsubscribe any time.
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="email"
                placeholder="you@example.com"
                style={{
                  flex: 1, padding: "0.625rem 1rem", borderRadius: "0.5rem",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "#f1f5f9", fontSize: "0.875rem", outline: "none",
                  minWidth: 0,
                }}
              />
              <button style={{
                padding: "0.625rem 1.25rem", borderRadius: "0.5rem",
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                border: "none", color: "#fff", fontWeight: 600, fontSize: "0.875rem",
                cursor: "pointer", whiteSpace: "nowrap",
              }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Topics preview */}
        <div style={{ marginTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "3rem" }}>
          <h3 style={{ fontWeight: 600, color: "#475569", textAlign: "center", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.75rem" }}>
            Topics we&apos;ll cover
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", justifyContent: "center" }}>
            {["AI Chatbots", "Product Updates", "Tutorials", "Customer Success", "No-Code", "LLMs", "Automation", "Behind the Build"].map((tag) => (
              <span key={tag} style={{
                padding: "0.375rem 0.875rem", borderRadius: "2rem",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                color: "#94a3b8", fontSize: "0.8125rem",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
