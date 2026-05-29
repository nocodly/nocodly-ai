"use client";

const TESTIMONIALS = [
  {
    text: "Nocodly AI cut our content creation time by 70%. The dashboard is incredibly intuitive — we onboarded our whole team in an afternoon.",
    author: "Sarah Chen",
    role: "Head of Product, Forma",
    avatar: "SC",
    color: "purple",
  },
  {
    text: "Finally, an AI SaaS that doesn't feel like a toy. The Stripe integration and usage tracking work exactly as expected in production.",
    author: "Marcus Webb",
    role: "CTO, LaunchStack",
    avatar: "MW",
    color: "cyan",
  },
  {
    text: "We switched from building our own OpenAI wrapper to Nocodly AI. Saved us 3 months of engineering time. Absolutely worth it.",
    author: "Priya Nair",
    role: "Founder, Nexova",
    avatar: "PN",
    color: "purple",
  },
];

export function TestimonialsSection() {
  return (
    <section style={{ position: "relative", padding: "6rem 0" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent, rgba(139,92,246,0.03), transparent)", pointerEvents: "none" }} />
      <div className="section-container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.875rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "#f1f5f9",
              marginBottom: "0.75rem",
              animation: "fadeInUp 0.4s ease both",
            }}
          >
            Loved by builders
          </h2>
          <p style={{ color: "#94a3b8" }}>Trusted by startups shipping real products</p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map(({ text, author, role, avatar, color }, i) => {
            const isPurple = color === "purple";
            return (
              <div
                key={author}
                className="glass glass-hover spotlight"
                style={{
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  animation: "fadeInUp 0.4s ease both",
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                {/* Stars */}
                <div style={{ display: "flex", gap: "0.125rem", marginBottom: "1rem" }}>
                  {Array(5).fill(0).map((_, j) => (
                    <span key={j} style={{ color: "#facc15", fontSize: "0.875rem" }}>★</span>
                  ))}
                </div>

                <p style={{ color: "#cbd5e1", fontSize: "0.875rem", lineHeight: 1.7, flex: 1, marginBottom: "1.25rem" }}>
                  &ldquo;{text}&rdquo;
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{
                    width: "2.25rem",
                    height: "2.25rem",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    background: isPurple ? "rgba(139,92,246,0.2)" : "rgba(6,182,212,0.2)",
                    color: isPurple ? "#c4b5fd" : "#67e8f9",
                  }}>
                    {avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "#e2e8f0" }}>{author}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 768px) {
          .testimonials-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
