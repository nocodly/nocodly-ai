"use client";

import { motion } from "framer-motion";
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

const colorMap = {
  purple: {
    icon: "feature-icon-purple",
    glow: "feature-glow-purple",
  },
  cyan: {
    icon: "feature-icon-cyan",
    glow: "feature-glow-cyan",
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="badge mb-4 inline-block"
          >
            Everything you need
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-4xl sm:text-5xl font-bold text-slate-100 mb-4"
          >
            Built for production,{" "}
            <span className="gradient-text">from day one</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            A complete SaaS stack with AI, auth, billing, and analytics — so you can focus on your product.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map(({ icon: Icon, title, description, color }, i) => {
            const styles = colorMap[color as keyof typeof colorMap];
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`glass rounded-xl p-5 glass-hover spotlight cursor-default ${styles.glow} transition-all duration-200`}
              >
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center mb-4 ${styles.icon}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-100 mb-2 text-sm">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
