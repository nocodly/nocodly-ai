import { PageWrapper } from "@/components/marketing/page-wrapper";

const VALUES = [
  {
    icon: "⚡",
    title: "Speed",
    desc: "We move fast and ship often. Features go from idea to production in days, not months. We believe momentum compounds.",
  },
  {
    icon: "✦",
    title: "Simplicity",
    desc: "Complex problems deserve simple solutions. We obsess over the user experience and ruthlessly cut anything that adds friction.",
  },
  {
    icon: "💪",
    title: "Power",
    desc: "Simple doesn't mean limited. We give users the full power of modern AI without requiring a PhD to operate it.",
  },
];

const TEAM = [
  {
    name: "Alex Rivera",
    role: "Co-founder & CEO",
    avatar: "AR",
    bio: "Previously led product at two B2B SaaS companies. Passionate about making AI accessible to everyone.",
  },
  {
    name: "Sam Chen",
    role: "Co-founder & CTO",
    avatar: "SC",
    bio: "Full-stack engineer with 8 years building scalable systems. Loves clean APIs and elegant architecture.",
  },
  {
    name: "Jordan Mills",
    role: "Head of Design",
    avatar: "JM",
    bio: "Designed products used by millions. Believes great design is invisible — it just works and feels right.",
  },
];

export default function AboutPage() {
  return (
    <PageWrapper>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: "2rem", padding: "0.25rem 1rem", marginBottom: "1.5rem",
          }}>
            <span style={{ fontSize: "0.75rem", color: "#8b5cf6", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>About Us</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "#f1f5f9", marginBottom: "1.25rem", lineHeight: 1.2 }}>
            We&apos;re building the future<br />of AI-powered work
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#94a3b8", maxWidth: "42rem", margin: "0 auto", lineHeight: 1.7 }}>
            Nocodly AI started with a simple frustration: building AI-powered products required either deep ML expertise or expensive agencies. We set out to change that — making powerful AI accessible to every builder, regardless of technical background.
          </p>
        </div>

        {/* Mission */}
        <div style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(6,182,212,0.08))",
          border: "1px solid rgba(139,92,246,0.2)",
          borderRadius: "1.25rem", padding: "2.5rem", marginBottom: "5rem", textAlign: "center",
        }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem" }}>Our Mission</h2>
          <p style={{ fontSize: "1.0625rem", color: "#94a3b8", lineHeight: 1.7, maxWidth: "40rem", margin: "0 auto" }}>
            To give every team — from solo founders to growing startups — the AI superpowers that were previously only available to tech giants. No code required. No compromises.
          </p>
        </div>

        {/* Values */}
        <div style={{ marginBottom: "5rem" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#f1f5f9", textAlign: "center", marginBottom: "2.5rem" }}>
            What we believe
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {VALUES.map((v) => (
              <div key={v.title} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "1rem", padding: "2rem",
              }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{v.icon}</div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "0.5rem" }}>{v.title}</h3>
                <p style={{ fontSize: "0.9375rem", color: "#94a3b8", lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#f1f5f9", textAlign: "center", marginBottom: "0.75rem" }}>
            The team
          </h2>
          <p style={{ textAlign: "center", color: "#94a3b8", marginBottom: "2.5rem", fontSize: "0.9375rem" }}>
            A small, focused team obsessed with building the best product possible.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {TEAM.map((member) => (
              <div key={member.name} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "1rem", padding: "2rem", textAlign: "center",
              }}>
                <div style={{
                  width: "3.5rem", height: "3.5rem", borderRadius: "50%",
                  background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1rem", fontWeight: 700, color: "#fff", fontSize: "1rem",
                }}>
                  {member.avatar}
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "0.25rem" }}>{member.name}</h3>
                <p style={{ fontSize: "0.8125rem", color: "#8b5cf6", fontWeight: 500, marginBottom: "0.75rem" }}>{member.role}</p>
                <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.6 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "3rem" }}>
          <p style={{ color: "#94a3b8", marginBottom: "1.25rem" }}>
            Interested in joining us?
          </p>
          <a href="/contact" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
            color: "#fff", fontWeight: 600, fontSize: "0.9375rem",
            padding: "0.625rem 1.5rem", borderRadius: "0.625rem", textDecoration: "none",
          }}>
            Get in touch
          </a>
        </div>
      </div>
    </PageWrapper>
  );
}
