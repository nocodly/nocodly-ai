"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section style={{ position: "relative", overflow: "hidden", paddingTop: "8rem", paddingBottom: "4rem" }}>
      {/* Aurora background */}
      <div className="aurora" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern" style={{ opacity: 0.6 }} />

      {/* Radial fade */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 0%, #09090f 70%)", pointerEvents: "none" }} />

      {/* Glowing orbs */}
      <div style={{ position: "absolute", top: "25%", left: "25%", width: "24rem", height: "24rem", background: "rgba(139,92,246,0.1)", borderRadius: "50%", filter: "blur(64px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "33%", right: "25%", width: "16rem", height: "16rem", background: "rgba(6,182,212,0.08)", borderRadius: "50%", filter: "blur(64px)", pointerEvents: "none" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "2rem" }}
        >
          <span className="badge" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="glow-dot" />
            Now in public beta — free to start
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{
            fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "#f1f5f9",
            marginBottom: "1.5rem",
          }}
        >
          AI that actually{" "}
          <span className="gradient-text-animated">works for you</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          style={{
            fontSize: "1.125rem",
            color: "#94a3b8",
            maxWidth: "40rem",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          Nocodly AI gives your team a powerful AI workspace — text generation,
          smart automation, and analytics. From idea to production in minutes.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "3rem" }}
        >
          <Link
            href="/register"
            className="btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 2rem",
              borderRadius: "0.625rem",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              color: "#fff",
            }}
          >
            Start for free
            <ArrowRight style={{ width: "1rem", height: "1rem" }} />
          </Link>
          <Link
            href="#features"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.875rem 2rem",
              borderRadius: "0.625rem",
              fontSize: "1rem",
              fontWeight: 500,
              textDecoration: "none",
              color: "#cbd5e1",
              border: "1px solid rgba(139,92,246,0.3)",
              background: "transparent",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.6)"; e.currentTarget.style.background = "rgba(139,92,246,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)"; e.currentTarget.style.background = "transparent"; }}
          >
            See how it works
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}
        >
          {[
            { icon: Zap, text: "No credit card required" },
            { icon: Shield, text: "SOC 2 compliant" },
            { icon: Sparkles, text: "Powered by GPT-4o" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.875rem", color: "#64748b" }}>
              <Icon style={{ width: "0.875rem", height: "0.875rem", color: "#a78bfa" }} />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ marginTop: "4rem", position: "relative" }}
        >
          {/* Glow */}
          <div style={{ position: "absolute", inset: "-1rem", background: "linear-gradient(to bottom, rgba(139,92,246,0.08), transparent)", borderRadius: "1.5rem", filter: "blur(20px)" }} />

          {/* Mock dashboard */}
          <div className="glass" style={{ position: "relative", borderRadius: "1rem", border: "1px solid rgba(139,92,246,0.15)", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>
            {/* Window bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
              <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "rgba(239,68,68,0.5)" }} />
              <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "rgba(234,179,8,0.5)" }} />
              <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "rgba(34,197,94,0.5)" }} />
              <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <div style={{ width: "10rem", height: "1.25rem", borderRadius: "0.375rem", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "0.7rem", color: "#475569" }}>app.nocodly.ai</span>
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div style={{ display: "flex", height: "20rem" }}>
              {/* Sidebar */}
              <div style={{ width: "11rem", borderRight: "1px solid rgba(255,255,255,0.05)", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                {[
                  { label: "Dashboard", active: true },
                  { label: "Generate", active: false },
                  { label: "History", active: false },
                  { label: "Settings", active: false },
                ].map(({ label, active }) => (
                  <div key={label} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.75rem",
                    background: active ? "rgba(139,92,246,0.15)" : "transparent",
                    color: active ? "#c4b5fd" : "#475569",
                  }}>
                    <div style={{ width: "0.375rem", height: "0.375rem", borderRadius: "50%", background: active ? "#a78bfa" : "#334155" }} />
                    {label}
                  </div>
                ))}
              </div>

              {/* Main */}
              <div style={{ flex: 1, padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
                  {[
                    { label: "Generations", value: "342" },
                    { label: "Tokens Used", value: "12.8K" },
                    { label: "Plan", value: "Starter" },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "0.5rem", padding: "0.75rem", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ fontSize: "0.7rem", color: "#475569", marginBottom: "0.25rem" }}>{label}</div>
                      <div className="gradient-text" style={{ fontSize: "0.875rem", fontWeight: 600 }}>{value}</div>
                    </div>
                  ))}
                </div>

                {/* AI prompt */}
                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "0.5rem", padding: "0.75rem", border: "1px solid rgba(139,92,246,0.1)" }}>
                  <div style={{ fontSize: "0.7rem", color: "#475569", marginBottom: "0.5rem" }}>AI Prompt</div>
                  <div className="shimmer" style={{ height: "3rem", borderRadius: "0.375rem" }} />
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
                    <div className="btn-primary" style={{ width: "5rem", height: "1.5rem", borderRadius: "0.375rem", opacity: 0.8 }} />
                  </div>
                </div>

                {/* Lines */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {[80, 60, 90].map((w, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ width: "1.5rem", height: "1.5rem", borderRadius: "50%", background: "rgba(139,92,246,0.2)", flexShrink: 0 }} />
                      <div style={{ height: "0.75rem", borderRadius: "0.25rem", background: "rgba(255,255,255,0.04)", width: `${w}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
