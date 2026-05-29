"use client";

import { Sparkles, Database, CreditCard, Shield, Zap, BarChart3, Code2, Globe } from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "GPT-4o Powered",
    description: "Access the latest OpenAI models for blazing-fast, high-quality text generation with full context understanding.",
    color: "purple",
  },
  {
    icon: Database,
    title: "Supabase Backend",
    description: "Your data stays yours. Encrypted storage, real-time sync, and row-level security out of the box.",
    color: "cyan",
  },
  {
    icon: CreditCard,
    title: "Stripe Billing",
    description: "Flexible subscription plans with Stripe Checkout, webhooks, and customer portal — production-ready.",
    color: "purple",
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description: "Track token consumption, generation history, and usage trends with beautiful real-time charts.",
    color: "cyan",
  },
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Sub-200ms responses with streaming output. Watch your AI-generated content appear in real time.",
    color: "purple",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant infrastructure, encrypted at rest and in transit. Auth handled by Supabase.",
    color: "cyan",
  },
  {
    icon: Code2,
    title: "API Access",
    description: "Integrate Nocodly AI into your own products via our REST API. Full TypeScript SDK included.",
    color: "purple",
  },
  {
    icon: Globe,
    title: "Edge Deployment",
    description: "Deployed globally on Vercel Edge Network. Serverless functions close to every user.",
    color: "cyan",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" style={{ position: "relative", padding: "6rem 0" }}>
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span
            className="badge mb-4 inline-block"
            style={{ display: "inline-block", marginBottom: "1rem", animation: "fadeInUp 0.5s ease both" }}
          >
            Everything you need
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "#f1f5f9",
              marginBottom: "1rem",
              animation: "fadeInUp 0.4s ease both",
              animationDelay: "0.05s",
            }}
          >
            Built for production,{" "}
            <span className="gradient-text">from day one</span>
          </h2>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "1.125rem",
              maxWidth: "36rem",
              margin: "0 auto",
              animation: "fadeInUp 0.4s ease both",
              animationDelay: "0.1s",
            }}
          >
            A complete SaaS stack with AI, auth, billing, and analytics — so you can focus on your product.
          </p>
        </div>

        {/* Grid */}
        <div className="features-grid">
          {FEATURES.map(({ icon: Icon, title, description, color }, i) => {
            const isPurple = color === "purple";
            return (
              <div
                key={title}
                className={`glass glass-hover spotlight ${isPurple ? "feature-glow-purple" : "feature-glow-cyan"}`}
                style={{
                  borderRadius: "0.75rem",
                  padding: "1.25rem",
                  cursor: "default",
                  transition: "all 0.2s",
                  animation: "fadeInUp 0.4s ease both",
                  animationDelay: `${i * 0.05}s`,
                }}
              >
                <div
                  className={isPurple ? "feature-icon-purple" : "feature-icon-cyan"}
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <Icon style={{ width: "1.25rem", height: "1.25rem" }} />
                </div>
                <h3 style={{ fontWeight: 600, color: "#f1f5f9", marginBottom: "0.5rem", fontSize: "0.875rem" }}>{title}</h3>
                <p style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: 1.6 }}>{description}</p>
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
        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        @media (max-width: 1024px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .features-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
