"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "10M+", label: "Tokens generated" },
  { value: "50K+", label: "Active users" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "<200ms", label: "Avg response time" },
];

export function StatsSection() {
  return (
    <section className="py-16 border-y border-white/5 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/3 via-transparent to-cyan-500/3" />
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">{value}</div>
              <div className="text-sm text-slate-500">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
