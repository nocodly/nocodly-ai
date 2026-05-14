"use client";

import { useState } from "react";
import { PageWrapper } from "@/components/marketing/page-wrapper";

const INFO_CARDS = [
  {
    icon: "✉️",
    title: "Email us",
    detail: "support@nocodly.com",
    sub: "We read every message",
  },
  {
    icon: "⏱️",
    title: "Response time",
    detail: "Within 24 hours",
    sub: "Mon – Fri, usually faster",
  },
  {
    icon: "💬",
    title: "Community",
    detail: "Join our Discord",
    sub: "Get help from the community",
  },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

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
            <span style={{ fontSize: "0.75rem", color: "#8b5cf6", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Contact</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "#f1f5f9", marginBottom: "1rem", lineHeight: 1.2 }}>
            Get in touch
          </h1>
          <p style={{ fontSize: "1.0625rem", color: "#94a3b8", maxWidth: "36rem", margin: "0 auto" }}>
            Have a question, a feature idea, or just want to say hello? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Info cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
          {INFO_CARDS.map((card) => (
            <div key={card.title} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "1rem", padding: "1.5rem", textAlign: "center",
            }}>
              <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>{card.icon}</div>
              <h3 style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#94a3b8", marginBottom: "0.375rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{card.title}</h3>
              <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "0.25rem" }}>{card.detail}</p>
              <p style={{ fontSize: "0.8125rem", color: "#475569" }}>{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{ maxWidth: "42rem", margin: "0 auto" }}>
          <div style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "1.25rem", padding: "2.5rem",
          }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.5rem" }}>Message sent!</h3>
                <p style={{ color: "#94a3b8" }}>We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, color: "#94a3b8", marginBottom: "0.375rem" }}>
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      style={{
                        width: "100%", padding: "0.625rem 0.875rem", borderRadius: "0.5rem",
                        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                        color: "#f1f5f9", fontSize: "0.9375rem", outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, color: "#94a3b8", marginBottom: "0.375rem" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      required
                      style={{
                        width: "100%", padding: "0.625rem 0.875rem", borderRadius: "0.5rem",
                        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                        color: "#f1f5f9", fontSize: "0.9375rem", outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, color: "#94a3b8", marginBottom: "0.375rem" }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="What's this about?"
                    style={{
                      width: "100%", padding: "0.625rem 0.875rem", borderRadius: "0.5rem",
                      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                      color: "#f1f5f9", fontSize: "0.9375rem", outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, color: "#94a3b8", marginBottom: "0.375rem" }}>
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us what's on your mind…"
                    rows={6}
                    required
                    style={{
                      width: "100%", padding: "0.625rem 0.875rem", borderRadius: "0.5rem",
                      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                      color: "#f1f5f9", fontSize: "0.9375rem", outline: "none",
                      resize: "vertical", boxSizing: "border-box", fontFamily: "inherit",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: "0.75rem 2rem", borderRadius: "0.625rem",
                    background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                    border: "none", color: "#fff", fontWeight: 600, fontSize: "1rem",
                    cursor: "pointer", width: "100%",
                  }}
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
