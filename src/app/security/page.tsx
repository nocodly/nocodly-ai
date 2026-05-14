import { PageWrapper } from "@/components/marketing/page-wrapper";

const FEATURES = [
  {
    icon: "🔒",
    title: "Encryption at Rest",
    badge: "Active",
    badgeColor: "#4ade80",
    badgeBg: "rgba(74,222,128,0.12)",
    desc: "All data stored in our Supabase-backed database is encrypted using AES-256. Backups are also encrypted and stored in geographically redundant locations.",
  },
  {
    icon: "🔐",
    title: "Encryption in Transit",
    badge: "Active",
    badgeColor: "#4ade80",
    badgeBg: "rgba(74,222,128,0.12)",
    desc: "All communication between your browser, our servers, and third-party APIs is protected by TLS 1.2 or higher. We enforce HTTPS-only and use HSTS headers.",
  },
  {
    icon: "🛡️",
    title: "Two-Factor Authentication",
    badge: "Active",
    badgeColor: "#4ade80",
    badgeBg: "rgba(74,222,128,0.12)",
    desc: "2FA is available for all accounts via authenticator app (TOTP). We strongly recommend enabling it to protect your account from unauthorized access.",
  },
  {
    icon: "🏢",
    title: "Data Isolation",
    badge: "Active",
    badgeColor: "#4ade80",
    badgeBg: "rgba(74,222,128,0.12)",
    desc: "Each user's data is logically isolated via row-level security (RLS) policies in Supabase. Bots, conversations, and knowledge base data are strictly scoped to the account owner.",
  },
  {
    icon: "📋",
    title: "SOC 2 Compliance",
    badge: "Coming Soon",
    badgeColor: "#fbbf24",
    badgeBg: "rgba(251,191,36,0.1)",
    desc: "We are actively working towards SOC 2 Type II certification. In the meantime, we follow SOC 2 principles for availability, confidentiality, and security.",
  },
  {
    icon: "🔑",
    title: "Secret Management",
    badge: "Active",
    badgeColor: "#4ade80",
    badgeBg: "rgba(74,222,128,0.12)",
    desc: "API keys and secrets are stored as encrypted environment variables and never exposed in client-side code. We use automated secret rotation for critical credentials.",
  },
];

const PRACTICES = [
  "Regular dependency audits and automated vulnerability scanning",
  "Principle of least privilege applied to all internal service accounts",
  "Production access restricted to a minimal set of engineers",
  "Automated backups with point-in-time recovery",
  "Incident response playbooks with defined escalation paths",
  "Security review integrated into our development workflow",
];

export default function SecurityPage() {
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
            <span style={{ fontSize: "0.75rem", color: "#8b5cf6", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Security</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "#f1f5f9", marginBottom: "1rem", lineHeight: 1.2 }}>
            Built with security first
          </h1>
          <p style={{ fontSize: "1.0625rem", color: "#94a3b8", maxWidth: "40rem", margin: "0 auto", lineHeight: 1.7 }}>
            We take the security of your data seriously. From encryption to access controls, here&apos;s how we protect you and your users.
          </p>
        </div>

        {/* Feature grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "4rem" }}>
          {FEATURES.map((feat) => (
            <div key={feat.title} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "1rem", padding: "1.75rem",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{ fontSize: "1.75rem" }}>{feat.icon}</span>
                <span style={{
                  padding: "0.2rem 0.625rem", borderRadius: "2rem", fontSize: "0.6875rem",
                  fontWeight: 600, background: feat.badgeBg, color: feat.badgeColor,
                  border: `1px solid ${feat.badgeColor}33`,
                }}>
                  {feat.badge}
                </span>
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "0.5rem" }}>{feat.title}</h3>
              <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.65 }}>{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Security practices */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "1.25rem", padding: "2.5rem", marginBottom: "3rem",
        }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "1.5rem" }}>
            Security practices
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {PRACTICES.map((practice) => (
              <li key={practice} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <span style={{ color: "#8b5cf6", flexShrink: 0, marginTop: "0.1rem" }}>✓</span>
                <span style={{ fontSize: "0.9375rem", color: "#94a3b8" }}>{practice}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Vulnerability disclosure */}
        <div style={{
          background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)",
          borderRadius: "1rem", padding: "2rem", textAlign: "center",
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🔍</div>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.5rem" }}>
            Found a vulnerability?
          </h3>
          <p style={{ color: "#94a3b8", marginBottom: "1.25rem", fontSize: "0.9375rem", maxWidth: "32rem", margin: "0 auto 1.25rem" }}>
            We appreciate responsible disclosure. If you discover a security issue, please report it to us privately before making it public.
          </p>
          <a href="mailto:security@nocodly.ai" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
            color: "#fff", fontWeight: 600, fontSize: "0.9375rem",
            padding: "0.625rem 1.5rem", borderRadius: "0.625rem", textDecoration: "none",
          }}>
            Report a vulnerability
          </a>
        </div>
      </div>
    </PageWrapper>
  );
}
