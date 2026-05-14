"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "500K+", label: "Tokens generated" },
  { value: "2,400+", label: "Active users" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "<180ms", label: "Avg response time" },
];

export function StatsSection() {
  return (
    <section style={{ position: "relative", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "4rem 0" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(139,92,246,0.03), transparent, rgba(6,182,212,0.03))" }} />
      <div className="section-container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }}>
          {STATS.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{ textAlign: "center" }}
            >
              <div className="gradient-text" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: "0.25rem" }}>{value}</div>
              <div style={{ fontSize: "0.875rem", color: "#64748b" }}>{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
