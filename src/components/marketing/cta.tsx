"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section style={{ padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: "56rem", marginLeft: "auto", marginRight: "auto" }}>
        <div
          className="glass"
          style={{
            position: "relative",
            borderRadius: "1rem",
            overflow: "hidden",
            border: "1px solid rgba(139,92,246,0.15)",
            padding: "4rem",
            textAlign: "center",
            animation: "fadeInUp 0.55s ease both",
          }}
        >
          {/* Background glow */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(139,92,246,0.08), transparent, rgba(6,182,212,0.08))", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(139,92,246,0.4), transparent)" }} />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 10 }}>
            <div
              className="badge"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <Sparkles style={{ width: "0.875rem", height: "0.875rem", color: "#a78bfa" }} />
              No credit card required
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 700,
                color: "#f1f5f9",
                marginBottom: "1rem",
                lineHeight: 1.15,
              }}
            >
              Start building with
              <br />
              <span className="gradient-text">Nocodly AI today</span>
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "1.125rem", marginBottom: "2rem", maxWidth: "32rem", margin: "0 auto 2rem" }}>
              Join thousands of developers and teams already shipping faster with AI-powered workflows.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
              <Button size="xl" asChild>
                <Link href="/register" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  Get started for free
                  <ArrowRight style={{ width: "1rem", height: "1rem" }} />
                </Link>
              </Button>
              <Button size="xl" variant="ghost" asChild>
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
