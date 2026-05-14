"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, TrendingUp, Clock, ArrowRight, BarChart3 } from "lucide-react";
import Link from "next/link";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const CHART_DATA = [
  { day: "Mon", tokens: 1200 },
  { day: "Tue", tokens: 3400 },
  { day: "Wed", tokens: 2800 },
  { day: "Thu", tokens: 5200 },
  { day: "Fri", tokens: 4100 },
  { day: "Sat", tokens: 2600 },
  { day: "Sun", tokens: 3800 },
];

const STATS = [
  {
    label: "Total Generations",
    value: "248",
    change: "+12 today",
    icon: Sparkles,
    color: "purple",
  },
  {
    label: "Tokens Used",
    value: "18.4K",
    change: "of 50K limit",
    icon: Zap,
    color: "cyan",
  },
  {
    label: "Avg Quality Score",
    value: "94%",
    change: "+3% this week",
    icon: TrendingUp,
    color: "purple",
  },
  {
    label: "Last Generation",
    value: "2h ago",
    change: "Blog post intro",
    icon: Clock,
    color: "cyan",
  },
];

const RECENT = [
  { prompt: "Write a product launch email for a B2B SaaS tool", tokens: 420, time: "2h ago", status: "success" },
  { prompt: "Generate 5 LinkedIn post ideas about remote work", tokens: 280, time: "5h ago", status: "success" },
  { prompt: "Create a landing page hero copy for Nocodly AI", tokens: 510, time: "1d ago", status: "success" },
  { prompt: "Summarize this quarterly report in 3 bullet points", tokens: 190, time: "2d ago", status: "success" },
];

const colorMap = {
  purple: "bg-purple-500/12 text-purple-400 border-purple-500/20",
  cyan: "bg-cyan-500/12 text-cyan-400 border-cyan-500/20",
};

export default function DashboardPage() {
  return (
    <div className="max-w-7xl">
      <DashboardHeader
        title="Dashboard"
        description="Welcome back — here's what's happening with your AI usage."
      />

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {STATS.map(({ label, value, change, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
          >
            <Card glow className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-2xl" />
              <CardContent>
                <div className="flex items-start justify-between mb-4">
                  <p className="text-xs text-slate-500 font-medium">{label}</p>
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${colorMap[color as keyof typeof colorMap]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-100 mb-1">{value}</div>
                <div className="text-xs text-slate-500">{change}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Chart + recent */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Usage chart */}
        <motion.div
          className="xl:col-span-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-400" />
                  Token Usage
                </CardTitle>
                <Badge>This week</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={CHART_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="tokenGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 11, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#0f0f1a",
                      border: "1px solid rgba(139,92,246,0.2)",
                      borderRadius: "8px",
                      fontSize: "12px",
                      color: "#f8fafc",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="tokens"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fill="url(#tokenGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-between" asChild>
                <Link href="/dashboard/generate">
                  New Generation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="/dashboard/history">
                  View History
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="/dashboard/billing">
                  Upgrade Plan
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              {/* Usage progress */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex justify-between text-xs text-slate-500 mb-2">
                  <span>Monthly usage</span>
                  <span className="text-slate-300">18.4K / 50K</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                    style={{ width: "37%" }}
                  />
                </div>
                <p className="text-xs text-slate-600 mt-1.5">37% used · resets June 1</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent generations */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Generations</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/history">View all</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {RECENT.map(({ prompt, tokens, time, status }) => (
                <div
                  key={prompt}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white/2 border border-white/4 hover:bg-white/4 transition-colors group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/15 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-300 truncate">{prompt}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{tokens} tokens · {time}</p>
                  </div>
                  <Badge variant="success">Done</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
