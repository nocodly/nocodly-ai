import { PageWrapper } from "@/components/marketing/page-wrapper";

const COOKIE_TYPES = [
  {
    icon: "⚙️",
    name: "Essential Cookies",
    badge: "Always Active",
    badgeColor: "#4ade80",
    badgeBg: "rgba(74,222,128,0.12)",
    desc: "These cookies are required for the service to function. They keep you logged in, maintain your session state, and protect against cross-site request forgery (CSRF). You cannot opt out of essential cookies — without them, Nocodly AI cannot work.",
    examples: ["Session token", "CSRF protection token", "Authentication state"],
  },
  {
    icon: "📊",
    name: "Analytics Cookies",
    badge: "Coming Soon",
    badgeColor: "#fbbf24",
    badgeBg: "rgba(251,191,36,0.1)",
    desc: "Analytics cookies help us understand how users interact with Nocodly AI — which features are popular, where users drop off, and how to improve the product. We plan to use privacy-friendly analytics (no cross-site tracking, no fingerprinting). When enabled, you will be asked for consent first.",
    examples: ["Page views", "Feature usage", "Session duration"],
  },
  {
    icon: "🎛️",
    name: "Functional Cookies",
    badge: "Optional",
    badgeColor: "#06b6d4",
    badgeBg: "rgba(6,182,212,0.1)",
    desc: "Functional cookies remember your preferences to give you a more personalized experience. This includes things like your last-selected bot, UI preferences, and language settings. You can disable these — the service will still work, but some preferences won't be saved between sessions.",
    examples: ["UI theme preference", "Last selected bot", "Dashboard layout"],
  },
];

export default function CookiesPage() {
  return (
    <PageWrapper>
      <div style={{ maxWidth: "52rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Hero */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: "2rem", padding: "0.25rem 1rem", marginBottom: "1.5rem",
          }}>
            <span style={{ fontSize: "0.75rem", color: "#8b5cf6", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Legal</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem", lineHeight: 1.2 }}>
            Cookie Policy
          </h1>
          <p style={{ color: "#475569", fontSize: "0.875rem" }}>Last updated: May 2025</p>
          <p style={{ color: "#94a3b8", marginTop: "0.75rem", lineHeight: 1.7 }}>
            Nocodly AI uses cookies to make the service work and to understand how it&apos;s being used. We keep it minimal — no advertising networks, no third-party trackers. Here&apos;s exactly what we use and why.
          </p>
        </div>

        {/* What is a cookie */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "1rem", padding: "1.5rem", marginBottom: "2.5rem",
        }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "0.5rem" }}>What is a cookie?</h2>
          <p style={{ fontSize: "0.9375rem", color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
            Cookies are small text files stored by your browser when you visit a website. They allow the site to remember information about your visit — like whether you&apos;re logged in — so you don&apos;t have to re-enter it every time. Cookies can&apos;t run code or carry viruses.
          </p>
        </div>

        {/* Cookie types */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "3rem" }}>
          {COOKIE_TYPES.map((type) => (
            <div key={type.name} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "1rem", padding: "1.75rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "0.875rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "1.5rem" }}>{type.icon}</span>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#f1f5f9", margin: 0, flex: 1 }}>{type.name}</h3>
                <span style={{
                  padding: "0.2rem 0.625rem", borderRadius: "2rem", fontSize: "0.6875rem",
                  fontWeight: 600, background: type.badgeBg, color: type.badgeColor,
                  border: `1px solid ${type.badgeColor}33`,
                }}>
                  {type.badge}
                </span>
              </div>
              <p style={{ fontSize: "0.9375rem", color: "#94a3b8", lineHeight: 1.65, marginBottom: "1rem" }}>{type.desc}</p>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>Examples</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {type.examples.map((ex) => (
                    <span key={ex} style={{
                      padding: "0.25rem 0.75rem", borderRadius: "2rem",
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                      color: "#64748b", fontSize: "0.8125rem",
                    }}>
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Managing cookies */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "1rem", padding: "1.75rem", marginBottom: "2rem",
        }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "0.75rem" }}>Managing your cookies</h2>
          <p style={{ fontSize: "0.9375rem", color: "#94a3b8", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. Note that blocking essential cookies will prevent Nocodly AI from working correctly.
          </p>
          <p style={{ fontSize: "0.9375rem", color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
            For questions about our cookie use, contact us at <span style={{ color: "#8b5cf6" }}>privacy@nocodly.ai</span>.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
