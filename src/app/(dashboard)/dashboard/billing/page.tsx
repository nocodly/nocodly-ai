"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Sparkles, CreditCard, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PLANS } from "@/lib/stripe";
// PLANS is a static const — no server client needed

const CURRENT_PLAN = "free";

export default function BillingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string, planKey: string) => {
    setLoading(planKey);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error ?? "Checkout failed");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-4xl">
      <DashboardHeader
        title="Billing & Plans"
        description="Manage your subscription and usage limits."
      />

      {/* Current plan card */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-purple-400" />
              Current Plan
            </CardTitle>
            <Badge variant="default">Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/2 border border-white/5">
            <div>
              <div className="text-lg font-bold text-slate-100 mb-1">Free Tier</div>
              <div className="text-sm text-slate-500">10 generations · 5K tokens per month</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-100">$0</div>
              <div className="text-xs text-slate-500">/ month</div>
            </div>
          </div>

          {/* Usage */}
          <div className="mt-4 space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>Generations used</span>
                <span className="text-slate-300">3 / 10</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[30%] rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>Tokens used</span>
                <span className="text-slate-300">890 / 5K</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[18%] rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plans */}
      <h2 className="text-lg font-semibold text-slate-200 mb-4">Upgrade your plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Object.entries(PLANS).map(([key, plan], i) => {
          const isPro = key === "pro";
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Card
                className={`relative overflow-hidden ${isPro ? "border-purple-500/30 shadow-[0_0_40px_rgba(139,92,246,0.1)]" : ""}`}
              >
                {isPro && (
                  <>
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <Badge>Most Popular</Badge>
                    </div>
                  </>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    {isPro ? (
                      <Sparkles className="w-4 h-4 text-purple-400" />
                    ) : (
                      <Zap className="w-4 h-4 text-cyan-400" />
                    )}
                    <CardTitle>{plan.name}</CardTitle>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-slate-100">${plan.price}</span>
                    <span className="text-slate-500 text-sm">/ month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-400">
                        <Check className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={isPro ? "default" : "outline"}
                    onClick={() => handleCheckout(plan.priceId, key)}
                    disabled={loading === key || CURRENT_PLAN === key}
                  >
                    {loading === key ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                    ) : CURRENT_PLAN === key ? (
                      "Current Plan"
                    ) : (
                      <>Upgrade to {plan.name} <ArrowRight className="w-4 h-4" /></>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Billing history */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10 text-slate-600 text-sm">
            No invoices yet. They&apos;ll appear here once you subscribe.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
