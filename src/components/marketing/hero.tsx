"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex items-center justify-center pt-32 pb-16 overflow-hidden">
      {/* Aurora background */}
      <div className="aurora" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* Radial fade overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#09090f] pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 0%, #09090f 70%)" }} />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="badge">
            <span className="glow-dot mr-2" />
            Now in public beta — free to start
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          AI that actually{" "}
          <span className="gradient-text-animated">works for you</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Nocodly AI gives your team a powerful AI workspace — text generation,
          smart automation, and analytics. From idea to production in minutes.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Button size="xl" asChild>
            <Link href="/register" className="flex items-center gap-2">
              Start for free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button size="xl" variant="outline" asChild>
            <Link href="#features">See how it works</Link>
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500"
        >
          {[
            { icon: Zap, text: "No credit card required" },
            { icon: Shield, text: "SOC 2 compliant" },
            { icon: Sparkles, text: "Powered by GPT-4o" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5 text-purple-400" />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 relative"
        >
          {/* Glow behind preview */}
          <div className="absolute -inset-4 bg-gradient-to-b from-purple-500/10 to-transparent rounded-2xl blur-2xl" />

          {/* Mock dashboard */}
          <div className="relative glass rounded-2xl border border-purple-500/15 overflow-hidden shadow-2xl shadow-black/60">
            {/* Window bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <div className="flex-1 mx-4">
                <div className="mx-auto w-40 h-5 rounded-md bg-white/4 flex items-center justify-center">
                  <span className="text-xs text-slate-600">app.nocodly.ai</span>
                </div>
              </div>
            </div>

            {/* Dashboard content mockup */}
            <div className="flex h-80">
              {/* Sidebar */}
              <div className="w-48 border-r border-white/5 p-4 space-y-1 hidden sm:block">
                {["Dashboard", "Generate", "History", "Settings"].map((item, i) => (
                  <div
                    key={item}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
                      i === 0
                        ? "bg-purple-500/15 text-purple-300"
                        : "text-slate-500"
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-purple-400" : "bg-slate-600"}`} />
                    {item}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-4 space-y-4">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Generations", value: "1,248" },
                    { label: "Tokens Used", value: "48.2K" },
                    { label: "This Month", value: "Pro" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/3 rounded-lg p-3 border border-white/5">
                      <div className="text-xs text-slate-500 mb-1">{label}</div>
                      <div className="text-sm font-semibold gradient-text">{value}</div>
                    </div>
                  ))}
                </div>

                {/* AI prompt area */}
                <div className="bg-white/3 rounded-lg p-3 border border-purple-500/10">
                  <div className="text-xs text-slate-500 mb-2">AI Prompt</div>
                  <div className="h-12 bg-white/3 rounded-md shimmer" />
                  <div className="flex justify-end mt-2">
                    <div className="w-20 h-6 rounded-md btn-primary opacity-80" />
                  </div>
                </div>

                {/* Recent generations */}
                <div className="space-y-2">
                  {[85, 65, 90].map((w, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex-shrink-0" />
                      <div className="flex-1 h-3 rounded bg-white/4" style={{ width: `${w}%` }} />
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
