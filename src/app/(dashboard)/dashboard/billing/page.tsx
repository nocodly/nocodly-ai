"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Zap, Sparkles, CreditCard, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { PLANS } from "@/lib/stripe";

interface Usage {
  total_generations: number;
  tokens_used: number;
}

export default function BillingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [usage, setUsage] = useState<Usage>({ total_generations: 0, tokens_used: 0 });
  const [loadingUsage, setLoadingUsage] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await (supabase as any)
        .from("usage_tracking")
        .select("total_generations, tokens_used")
        .eq("user_id", user.id)
        .single() as { data: Usage | null };
      if (data) setUsage(data);
      setLoadingUsage(false);
    };
    load();
  }, []);

  const handleCheckout = async (priceId: string, planKey: string) => {
    if (!priceId) {
      toast.info("Stripe payments coming soon! Contact support@nocodly.com to upgrade.");
      return;
    }
    setLoadingPlan(planKey);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token ? { "Authorization": `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error ?? "Checkout failed");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoadingPlan(null);
    }
  };

  const genLimit = 10;
  const tokenLimit = 5000;
  const genPct = Math.min(Math.round((usage.total_generations / genLimit) * 100), 100);
  const tokenPct = Math.min(Math.round((usage.tokens_used / tokenLimit) * 100), 100);

  return (
    <div style={{ maxWidth: "56rem" }}>
      <DashboardHeader title="Billing & Plans" description="Manage your subscription and usage limits." />

      {/* Current plan */}
      <div style={{ animation: "fadeInUp 0.3s ease both" }}>
        <Card style={{ marginBottom: "2rem" }}>
          <CardHeader>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <CardTitle style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CreditCard style={{ width: "1rem", height: "1rem", color: "#a78bfa" }} />
                Current Plan
              </CardTitle>
              <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#22d3ee", background: "rgba(6,182,212,0.1)", padding: "0.25rem 0.625rem", borderRadius: "9999px", border: "1px solid rgba(6,182,212,0.2)" }}>
                Active
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", borderRadius: "0.875rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: "1.25rem" }}>
              <div>
                <div style={{ fontSize: "1.125rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.25rem" }}>Free Tier</div>
                <div style={{ fontSize: "0.8125rem", color: "#475569" }}>10 generations · 5K tokens per month</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#f1f5f9" }}>$0</div>
                <div style={{ fontSize: "0.75rem", color: "#475569" }}>/ month</div>
              </div>
            </div>

            {loadingUsage ? (
              <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
                <Loader2 style={{ width: "1.25rem", height: "1.25rem", color: "#a78bfa", animation: "spin 1s linear infinite" }} />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#475569", marginBottom: "0.375rem" }}>
                    <span>Generations used</span>
                    <span style={{ color: "#cbd5e1" }}>{usage.total_generations} / {genLimit}</span>
                  </div>
                  <div style={{ width: "100%", height: "0.5rem", background: "rgba(255,255,255,0.05)", borderRadius: "9999px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${genPct}%`, background: "linear-gradient(to right,#8b5cf6,#06b6d4)", borderRadius: "9999px", transition: "width 0.5s ease" }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#475569", marginBottom: "0.375rem" }}>
                    <span>Tokens used</span>
                    <span style={{ color: "#cbd5e1" }}>{usage.tokens_used.toLocaleString()} / {tokenLimit.toLocaleString()}</span>
                  </div>
                  <div style={{ width: "100%", height: "0.5rem", background: "rgba(255,255,255,0.05)", borderRadius: "9999px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${tokenPct}%`, background: "linear-gradient(to right,#8b5cf6,#06b6d4)", borderRadius: "9999px", transition: "width 0.5s ease" }} />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upgrade plans */}
      <p style={{ fontSize: "1.0625rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "1rem" }}>Upgrade your plan</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }} className="billing-grid">
        {Object.entries(PLANS).map(([key, plan], i) => {
          const isPro = key === "pro";
          return (
            <div
              key={key}
              style={{
                display: "flex",
                animation: "fadeInUp 0.3s ease both",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <Card style={{
                position: "relative", flex: 1,
                border: isPro ? "1px solid rgba(139,92,246,0.25)" : undefined,
                boxShadow: isPro ? "0 0 40px rgba(139,92,246,0.1)" : undefined,
              }}>
                {isPro && (
                  <>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg,transparent,rgba(139,92,246,0.5),transparent)", borderRadius: "0.75rem 0.75rem 0 0" }} />
                    <div style={{ position: "absolute", top: "1rem", right: "1rem", fontSize: "0.6875rem", fontWeight: 700, color: "#a78bfa", background: "rgba(139,92,246,0.15)", padding: "0.25rem 0.625rem", borderRadius: "9999px", border: "1px solid rgba(139,92,246,0.3)" }}>Most Popular</div>
                  </>
                )}
                <CardHeader>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    {isPro
                      ? <Sparkles style={{ width: "1rem", height: "1rem", color: "#a78bfa" }} />
                      : <Zap style={{ width: "1rem", height: "1rem", color: "#22d3ee" }} />
                    }
                    <CardTitle>{plan.name}</CardTitle>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
                    <span style={{ fontSize: "2rem", fontWeight: 800, color: "#f1f5f9" }}>${plan.price}</span>
                    <span style={{ fontSize: "0.875rem", color: "#475569" }}>/ month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    {plan.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "#94a3b8" }}>
                        <Check style={{ width: "0.875rem", height: "0.875rem", color: "#8b5cf6", flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    style={{ width: "100%", justifyContent: "center", display: "flex", alignItems: "center", gap: "0.375rem" }}
                    variant={isPro ? "default" : "outline"}
                    onClick={() => handleCheckout(plan.priceId, key)}
                    disabled={loadingPlan === key}
                  >
                    {loadingPlan === key
                      ? <><Loader2 style={{ width: "1rem", height: "1rem", animation: "spin 1s linear infinite" }} /> Processing...</>
                      : <>Upgrade to {plan.name} <ArrowRight style={{ width: "1rem", height: "1rem" }} /></>
                    }
                  </Button>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Billing history */}
      <div style={{ marginTop: "2rem", animation: "fadeInUp 0.3s ease both", animationDelay: "0.3s" }}>
        <Card>
          <CardHeader><CardTitle>Billing History</CardTitle></CardHeader>
          <CardContent>
            <div style={{ textAlign: "center", padding: "2.5rem 0", fontSize: "0.875rem", color: "#334155" }}>
              No invoices yet. They&apos;ll appear here once you subscribe.
            </div>
          </CardContent>
        </Card>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 640px) { .billing-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
