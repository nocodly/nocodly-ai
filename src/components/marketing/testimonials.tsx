"use client";

import { motion } from "framer-motion";

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
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/3 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-100 mb-3"
          >
            Loved by builders
          </motion.h2>
          <p className="text-slate-400">Trusted by startups shipping real products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map(({ text, author, role, avatar, color }, i) => (
            <motion.div
              key={author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass rounded-xl p-6 glass-hover spotlight flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array(5).fill(0).map((_, j) => (
                  <span key={j} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-5">
                &ldquo;{text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                  color === "purple"
                    ? "bg-purple-500/20 text-purple-300"
                    : "bg-cyan-500/20 text-cyan-300"
                }`}>
                  {avatar}
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-200">{author}</div>
                  <div className="text-xs text-slate-500">{role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
