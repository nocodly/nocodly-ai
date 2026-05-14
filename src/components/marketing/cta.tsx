"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass rounded-2xl p-10 sm:p-16 text-center overflow-hidden border border-purple-500/15"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 via-transparent to-cyan-500/8" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

          {/* Content */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 badge mb-6">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              No credit card required
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-4 leading-tight">
              Start building with
              <br />
              <span className="gradient-text">Nocodly AI today</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
              Join thousands of developers and teams already shipping faster with AI-powered workflows.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" asChild>
                <Link href="/register" className="flex items-center gap-2">
                  Get started for free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="xl" variant="ghost" asChild>
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
