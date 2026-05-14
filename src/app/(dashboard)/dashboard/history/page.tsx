"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Search, Copy, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { formatDate, truncate } from "@/lib/utils";

const MOCK_HISTORY = [
  { id: "1", prompt: "Write a product launch email for a B2B SaaS tool targeting project managers", output: "Subject: Introducing the Project Tool That Your Team Actually Wants to Use\n\nHi [First Name],\n\nWe know you're busy. Your team is busy. And the last thing anyone needs is another tool that takes weeks to learn and months to adopt.\n\nThat's why we built [Product Name] differently...", tokens: 420, model: "gpt-4o-mini", created_at: new Date(Date.now() - 7200000).toISOString() },
  { id: "2", prompt: "Generate 5 LinkedIn post ideas about remote work productivity", output: "1. The 'No-Meeting Wednesday' experiment: How our team 2x'd deep work output in 30 days\n\n2. Remote work myths debunked: Why your best employees don't need to be in the office to do their best work\n\n3. The virtual water cooler problem: 3 creative ways we've built team culture without a physical office...", tokens: 280, model: "gpt-4o-mini", created_at: new Date(Date.now() - 18000000).toISOString() },
  { id: "3", prompt: "Create a landing page hero copy for Nocodly AI, a SaaS dashboard", output: "Headline: AI that works as fast as you think\n\nSubheadline: Nocodly AI turns your ideas into polished content, code, and copy — in seconds. No prompt engineering degree required.\n\nCTA: Start generating for free →\n\nSocial proof: Trusted by 10,000+ builders and creators", tokens: 510, model: "gpt-4o-mini", created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: "4", prompt: "Summarize this quarterly report in 3 bullet points", output: "• Revenue grew 34% YoY, driven by enterprise expansion and new mid-market acquisitions in EMEA.\n• Customer acquisition cost (CAC) decreased by 18% following optimization of paid channels and referral program launch.\n• Churn rate stabilized at 2.1% MoM after customer success team expansion and proactive health-score monitoring.", tokens: 190, model: "gpt-4o-mini", created_at: new Date(Date.now() - 172800000).toISOString() },
];

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = MOCK_HISTORY.filter(
    (item) =>
      item.prompt.toLowerCase().includes(search.toLowerCase()) ||
      item.output.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="max-w-4xl">
      <DashboardHeader
        title="Generation History"
        description="Browse and search all your past AI generations."
      />

      {/* Search + filter */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search prompts or outputs..."
            className="pl-9"
          />
        </div>
        <Badge variant="default">{filtered.length} results</Badge>
      </div>

      {/* History list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-white/3 border border-white/8 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-5 h-5 text-slate-600" />
              </div>
              <p className="text-slate-500 text-sm">No generations found</p>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <a href="/dashboard/generate">Create your first generation</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
            >
              <Card>
                <CardContent>
                  {/* Header row */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-200 leading-snug">
                        {expanded === item.id ? item.prompt : truncate(item.prompt, 90)}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs text-slate-600">{formatDate(item.created_at)}</span>
                        <span className="text-slate-700">·</span>
                        <Badge variant="info">{item.tokens} tokens</Badge>
                        <Badge variant="default">{item.model}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleCopy(item.output)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-all"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-all"
                      >
                        {expanded === item.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded output */}
                  {expanded === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 p-4 rounded-xl bg-white/2 border border-white/5 text-sm text-slate-400 leading-relaxed whitespace-pre-wrap"
                    >
                      {item.output}
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
