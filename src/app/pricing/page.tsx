import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Sparkles, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for Nocodly AI. Start free, upgrade when you need more.",
};

const FREE_FEATURES = [
  "10 AI generations/month",
  "5K tokens included",
  "GPT-4o Mini model",
  "Generation history",
  "Community support",
];

const PLANS = [
  {
    key: "free",
    name: "Free",
    price: 0,
    description: "Perfect for trying out Nocodly AI",
    icon: Zap,
    iconColor: "text-cyan-400",
    features: FREE_FEATURES,
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
    iconColor: "text-purple-400",
    features: [
      "100 AI generations/month",
      "50K tokens included",
      "GPT-4o Mini model",
      "Save & export history",
      "Email support",
      "API access (coming soon)",
    ],
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
    iconColor: "text-purple-400",
    features: [
      "500 AI generations/month",
      "250K tokens included",
      "GPT-4o model",
      "Priority processing",
      "Full API access",
      "Custom system prompts",
      "Priority support",
      "Usage analytics",
    ],
    cta: "Start Pro",
    href: "/register?plan=pro",
    popular: true,
  },
];

const FAQ = [
  {
    q: "Can I change plans anytime?",
    a: "Yes — upgrade or downgrade anytime. Changes take effect immediately and are prorated.",
  },
  {
    q: "What happens if I exceed my token limit?",
    a: "Generations will be paused until your quota resets next month. Upgrade anytime to continue.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "The Free tier lets you explore core features without a credit card. No trial needed.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards through Stripe — Visa, Mastercard, Amex, and more.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#09090f]">
      <Navbar />

      <div className="pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="badge mb-4 inline-block">Pricing</span>
            <h1 className="text-5xl font-bold text-slate-100 mb-4">
              Simple, transparent{" "}
              <span className="gradient-text">pricing</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Start free. Upgrade when you need more. No hidden fees, no surprises.
            </p>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
            {PLANS.map(({ key, name, price, description, icon: Icon, iconColor, features, cta, href, popular }) => (
              <div
                key={key}
                className={`relative glass rounded-2xl p-6 flex flex-col ${
                  popular
                    ? "border-purple-500/30 shadow-[0_0_40px_rgba(139,92,246,0.12)]"
                    : "border-white/8"
                }`}
              >
                {popular && (
                  <>
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent rounded-t-2xl" />
                    <div className="absolute top-5 right-5">
                      <Badge>Most Popular</Badge>
                    </div>
                  </>
                )}

                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${
                  popular ? "bg-purple-500/12 border-purple-500/20" : "bg-white/4 border-white/8"
                }`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>

                <h2 className="text-xl font-bold text-slate-100 mb-1">{name}</h2>
                <p className="text-xs text-slate-500 mb-5">{description}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-slate-100">${price}</span>
                  <span className="text-slate-500 text-sm">/ month</span>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-400">
                      <Check className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={popular ? "default" : "outline"}
                  className="w-full"
                  asChild
                >
                  <Link href={href} className="flex items-center justify-center gap-2">
                    {cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-100 text-center mb-8">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {FAQ.map(({ q, a }) => (
                <div
                  key={q}
                  className="glass rounded-xl p-5 border border-white/6"
                >
                  <h3 className="text-sm font-semibold text-slate-200 mb-2">{q}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
