"use client";

import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Check, Zap, Sparkles, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

const PLANS = [
  {
    key: "free",
    name: "Free",
    price: 0,
    description: "Perfect for trying out Nocodly AI",
    icon: Zap,
    color: "#06b6d4",
    features: ["10 AI generations/month", "5K tokens included", "GPT-4o Mini model", "Generation history", "Community support"],
    cta: "Get started free",
    href: "/register",
    popular: false,
  },
  {
    key: "starter",
    name: "Starter",
    price: 9,
    description: "For individuals shipping side projects",
    icon: Sparkles,
    color: "#a78bfa",
    features: ["100 AI generations/month", "50K tokens included", "GPT-4o Mini model", "Save & export history", "Email support", "API access (coming soon)"],
    cta: "Start Starter",
    href: "/register?plan=starter",
    popular: false,
  },
  {
    key: "pro",
    name: "Pro",
    price: 29,
    description: "For teams that need serious AI power",
    icon: Sparkles,
    color: "#a78bfa",
    features: ["500 AI generations/month", "250K tokens included", "GPT-4o model", "Priority processing", "Full API access", "Custom system prompts", "Priority support", "Usage analytics"],
    cta: "Start Pro",
    href: "/register?plan=pro",
    popular: true,
  },
];

const FAQ = [
  { q: "Can I change plans anytime?", a: "Yes — upgrade or downgrade anytime. Changes take effect immediately and are prorated." },
  { q: "What happens if I exceed my token limit?", a: "Generations will be paused until your quota resets next month. Upgrade anytime to continue." },
  { q: "Is there a free trial for paid plans?", a: "The Free tier lets you explore core features without a credit card. No trial needed." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards through Stripe — Visa, Mastercard, Amex, and more." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{ padding: "1.25rem 1.5rem", borderRadius: "0.875rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", cursor: "pointer" }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#e2e8f0", margin: 0 }}>{q}</h3>
        <ChevronDown style={{ width: "1rem", height: "1rem", color: "#475569", flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
      </div>
      {open && <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.7, marginTop: "0.75rem", marginBottom: 0 }}>{a}</p>}
    </div>
  );
}

export default function PricingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#09090f", overflowX: "hidden" }}>
      <Navbar />

      <div style={{ paddingTop: "8rem", paddingBottom: "6rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{
              display: "inline-block", marginBottom: "1rem",
              fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em",
              color: "#a78bfa", background: "rgba(139,92,246,0.1)",
              padding: "0.375rem 0.875rem", borderRadius: "9999px",
              border: "1px solid rgba(139,92,246,0.2)",
            }}>Pricing</span>
            <h1 style={{ fontSize: "clamp(2.25rem,5vw,3.5rem)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 1rem", lineHeight: 1.15 }}>
              Simple, transparent{" "}
              <span style={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>pricing</span>
            </h1>
            <p style={{ fontSize: "1.0625rem", color: "#64748b", maxWidth: "30rem", margin: "0 auto" }}>
              Start free. Upgrade when you need more. No hidden fees, no surprises.
            </p>
          </div>

          {/* Plans */}
          <div className="pricing-grid" style={{ display: "grid", gap: "1.5rem", marginBottom: "5rem" }}>
            {PLANS.map(({ key, name, price, description, icon: Icon, color, features, cta, href, popular }) => (
              <div key={key} style={{
                position: "relative", display: "flex", flexDirection: "column", padding: "2rem",
                borderRadius: "1.25rem",
                background: popular ? "rgba(139,92,246,0.06)" : "rgba(255,255,255,0.02)",
                border: popular ? "1px solid rgba(139,92,246,0.25)" : "1px solid rgba(255,255,255,0.07)",
                boxShadow: popular ? "0 0 60px rgba(139,92,246,0.1)" : "none",
              }}>
                {popular && (
                  <>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg,transparent,rgba(139,92,246,0.6),transparent)", borderRadius: "1.25rem 1.25rem 0 0" }} />
                    <div style={{ position: "absolute", top: "1.25rem", right: "1.25rem", fontSize: "0.6875rem", fontWeight: 700, color: "#a78bfa", background: "rgba(139,92,246,0.15)", padding: "0.25rem 0.75rem", borderRadius: "9999px", border: "1px solid rgba(139,92,246,0.3)" }}>Most Popular</div>
                  </>
                )}

                <div style={{
                  width: "2.75rem", height: "2.75rem", borderRadius: "0.75rem", marginBottom: "1.25rem", flexShrink: 0,
                  background: popular ? "rgba(139,92,246,0.1)" : "rgba(6,182,212,0.1)",
                  border: popular ? "1px solid rgba(139,92,246,0.2)" : "1px solid rgba(6,182,212,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon style={{ width: "1.25rem", height: "1.25rem", color }} />
                </div>

                <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "#f1f5f9", margin: "0 0 0.25rem" }}>{name}</h2>
                <p style={{ fontSize: "0.8125rem", color: "#475569", margin: "0 0 1.5rem" }}>{description}</p>

                <div style={{ display: "flex", alignItems: "baseline", gap: "0.375rem", marginBottom: "1.75rem" }}>
                  <span style={{ fontSize: "3rem", fontWeight: 800, color: "#f1f5f9", lineHeight: 1 }}>${price}</span>
                  <span style={{ fontSize: "0.875rem", color: "#475569" }}>/ month</span>
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
                  {features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.625rem", fontSize: "0.875rem", color: "#94a3b8" }}>
                      <Check style={{ width: "0.875rem", height: "0.875rem", color: "#8b5cf6", flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href={href}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                    padding: "0.75rem 1.5rem", borderRadius: "0.625rem",
                    fontSize: "0.9375rem", fontWeight: 600, textDecoration: "none",
                    background: popular ? "linear-gradient(135deg,#8b5cf6,#06b6d4)" : "transparent",
                    color: popular ? "#fff" : "#94a3b8",
                    border: popular ? "none" : "1px solid rgba(255,255,255,0.12)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                >
                  {cta} <ArrowRight style={{ width: "1rem", height: "1rem" }} />
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div style={{ maxWidth: "44rem", margin: "0 auto" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#f1f5f9", textAlign: "center", marginBottom: "2rem" }}>
              Frequently asked questions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {FAQ.map((item) => <FaqItem key={item.q} {...item} />)}
            </div>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <p style={{ fontSize: "0.875rem", color: "#475569" }}>
                Still have questions?{" "}
                <a href="mailto:support@nocodly.com" style={{ color: "#a78bfa", textDecoration: "none" }}>
                  support@nocodly.com
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>

      <Footer />

      <style>{`
        .pricing-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 900px) {
          .pricing-grid { grid-template-columns: 1fr !important; max-width: 28rem; margin-left: auto; margin-right: auto; }
        }
      `}</style>
    </div>
  );
}
