"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, TrendingUp, Clock, ArrowRight, BarChart3, Loader2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { formatDate, truncate } from "@/lib/utils";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

interface Generation {
  id: string;
  prompt: string;
  output: string;
  tokens_used: number;
  model: string;
  created_at: string;
}

interface UsageData {
  total_generations: number;
  tokens_used: number;
}

function getRelativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function buildChartData(generations: Generation[]) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const now = new Date();
  const result = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (6 - i));
    return { day: days[d.getDay()], tokens: 0, date: d.toDateString() };
  });
  generations.forEach((g) => {
    const gDate = new Date(g.created_at).toDateString();
    const slot = result.find((r) => r.date === gDate);
    if (slot) slot.tokens += g.tokens_used;
  });
  return result;
}

export default function DashboardPage() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [{ data: gens }, { data: usageRow }] = await Promise.all([
        supabase.from("generations").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(50),
        supabase.from("usage_tracking").select("*").eq("user_id", user.id).single(),
      ]);

      setGenerations(gens || []);
      setUsage(usageRow || { total_generations: 0, tokens_used: 0 });
      setLoading(false);
    };
    load();
  }, []);

  const totalGens = usage?.total_generations ?? generations.length;
  const tokensUsed = usage?.tokens_used ?? generations.reduce((s, g) => s + g.tokens_used, 0);
  const lastGen = generations[0];
  const chartData = buildChartData(generations);
  const recentGens = generations.slice(0, 5);

  const STATS = [
    { label: "Total Generations", value: loading ? "—" : String(totalGens), change: loading ? "" : totalGens === 0 ? "No generations yet" : "All time", icon: Sparkles, color: "purple" },
    { label: "Tokens Used", value: loading ? "—" : tokensUsed >= 1000 ? `${(tokensUsed / 1000).toFixed(1)}K` : String(tokensUsed), change: "of 50K monthly limit", icon: Zap, color: "cyan" },
    { label: "This Week", value: loading ? "—" : String(generations.filter(g => Date.now() - new Date(g.created_at).getTime() < 7 * 86400000).length), change: "generations", icon: TrendingUp, color: "purple" },
    { label: "Last Generation", value: loading ? "—" : lastGen ? getRelativeTime(lastGen.created_at) : "Never", change: lastGen ? truncate(lastGen.prompt, 30) : "Generate something!", icon: Clock, color: "cyan" },
  ];

  const tokenLimit = 50000;
  const usagePct = Math.min(Math.round((tokensUsed / tokenLimit) * 100), 100);

  return (
    <div style={{ maxWidth: "80rem" }}>
      <DashboardHeader title="Dashboard" description="Here's what's happening with your AI usage." />

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {STATS.map(({ label, value, change, icon: Icon, color }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.07 }}>
            <Card glow className="relative overflow-hidden">
              <div style={{ position: "absolute", top: 0, right: 0, width: "5rem", height: "5rem", background: "linear-gradient(135deg, rgba(139,92,246,0.05), transparent)", borderRadius: "50%", filter: "blur(20px)" }} />
              <CardContent>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <p style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 500 }}>{label}</p>
                  <div style={{
                    width: "2rem", height: "2rem", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center",
                    background: color === "purple" ? "rgba(139,92,246,0.12)" : "rgba(6,182,212,0.12)",
                    color: color === "purple" ? "#a78bfa" : "#22d3ee",
                    border: `1px solid ${color === "purple" ? "rgba(139,92,246,0.2)" : "rgba(6,182,212,0.2)"}`,
                  }}>
                    {loading ? <Loader2 style={{ width: "0.875rem", height: "0.875rem", animation: "spin 1s linear infinite" }} /> : <Icon style={{ width: "0.875rem", height: "0.875rem" }} />}
                  </div>
                </div>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.25rem" }}>{value}</div>
                <div style={{ fontSize: "0.7rem", color: "#475569" }}>{change}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Chart + quick actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem", marginBottom: "1.5rem" }} className="chart-grid">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }} className="chart-col">
          <Card>
            <CardHeader>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <CardTitle style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <BarChart3 style={{ width: "1rem", height: "1rem", color: "#a78bfa" }} />
                  Token Usage
                </CardTitle>
                <Badge>Last 7 days</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div style={{ height: "12.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Loader2 style={{ width: "2rem", height: "2rem", color: "#a78bfa", animation: "spin 1s linear infinite" }} />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                    <defs>
                      <linearGradient id="tokenGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#0f0f1a", border: "1px solid rgba(139,92,246,0.2)", borderRadius: "8px", fontSize: "12px", color: "#f8fafc" }} />
                    <Area type="monotone" dataKey="tokens" stroke="#8b5cf6" strokeWidth={2} fill="url(#tokenGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.35 }} className="actions-col">
          <Card style={{ height: "100%" }}>
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <Button className="w-full" style={{ justifyContent: "space-between" }} asChild>
                  <Link href="/dashboard/generate" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    New Generation <ArrowRight style={{ width: "1rem", height: "1rem" }} />
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" style={{ justifyContent: "space-between" }} asChild>
                  <Link href="/dashboard/history" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    View History <ArrowRight style={{ width: "1rem", height: "1rem" }} />
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" style={{ justifyContent: "space-between" }} asChild>
                  <Link href="/dashboard/billing" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    Upgrade Plan <ArrowRight style={{ width: "1rem", height: "1rem" }} />
                  </Link>
                </Button>
                <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#475569", marginBottom: "0.5rem" }}>
                    <span>Monthly usage</span>
                    <span style={{ color: "#cbd5e1" }}>{tokensUsed.toLocaleString()} / {tokenLimit.toLocaleString()}</span>
                  </div>
                  <div style={{ width: "100%", height: "0.5rem", background: "rgba(255,255,255,0.05)", borderRadius: "9999px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${usagePct}%`, background: "linear-gradient(to right, #8b5cf6, #06b6d4)", borderRadius: "9999px", transition: "width 0.5s ease" }} />
                  </div>
                  <p style={{ fontSize: "0.7rem", color: "#334155", marginTop: "0.375rem" }}>{usagePct}% used · resets monthly</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent generations */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
        <Card>
          <CardHeader>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <CardTitle>Recent Generations</CardTitle>
              <Button variant="ghost" size="sm" asChild><Link href="/dashboard/history">View all</Link></Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
                <Loader2 style={{ width: "1.5rem", height: "1.5rem", color: "#a78bfa", animation: "spin 1s linear infinite" }} />
              </div>
            ) : recentGens.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem" }}>
                  <Sparkles style={{ width: "1.25rem", height: "1.25rem", color: "#334155" }} />
                </div>
                <p style={{ fontSize: "0.875rem", color: "#475569", marginBottom: "1rem" }}>No generations yet</p>
                <Button size="sm" asChild><Link href="/dashboard/generate">Create your first generation</Link></Button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {recentGens.map(({ id, prompt, tokens_used, created_at }) => (
                  <div key={id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem", borderRadius: "0.75rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", cursor: "pointer", transition: "background 0.15s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                  >
                    <div style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Sparkles style={{ width: "0.875rem", height: "0.875rem", color: "#a78bfa" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "0.875rem", color: "#cbd5e1", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{prompt}</p>
                      <p style={{ fontSize: "0.75rem", color: "#334155", marginTop: "0.125rem" }}>{tokens_used} tokens · {formatDate(created_at)}</p>
                    </div>
                    <Badge variant="success">Done</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (min-width: 1024px) {
          .chart-grid { grid-template-columns: 2fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
