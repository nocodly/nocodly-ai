"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Search, Copy, Trash2, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { formatDate, truncate } from "@/lib/utils";

interface Generation {
  id: string;
  prompt: string;
  output: string;
  tokens_used: number;
  model: string;
  created_at: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("generations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setHistory(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    const { error } = await supabase.from("generations").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete");
    } else {
      setHistory((prev) => prev.filter((item) => item.id !== id));
      toast.success("Deleted");
    }
    setDeleting(null);
  };

  const filtered = history.filter(
    (item) =>
      item.prompt.toLowerCase().includes(search.toLowerCase()) ||
      item.output.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "56rem" }}>
      <DashboardHeader title="Generation History" description="Browse and search all your past AI generations." />

      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", width: "1rem", height: "1rem", color: "#64748b" }} />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search prompts or outputs..."
            style={{ paddingLeft: "2.25rem" }}
          />
        </div>
        {!loading && <Badge variant="default">{filtered.length} results</Badge>}
      </div>

      {/* List */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
          <Loader2 style={{ width: "2rem", height: "2rem", color: "#a78bfa", animation: "spin 1s linear infinite" }} />
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent style={{ paddingTop: "4rem", paddingBottom: "4rem", textAlign: "center" }}>
            <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem" }}>
              <Sparkles style={{ width: "1.25rem", height: "1.25rem", color: "#334155" }} />
            </div>
            <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "1rem" }}>
              {search ? "No results found" : "No generations yet"}
            </p>
            {!search && (
              <Button variant="outline" size="sm" asChild>
                <a href="/dashboard/generate">Create your first generation</a>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2, delay: i < 10 ? i * 0.04 : 0 }}
              >
                <Card>
                  <CardContent>
                    {/* Header row */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <div style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.125rem" }}>
                        <Sparkles style={{ width: "0.875rem", height: "0.875rem", color: "#a78bfa" }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#e2e8f0", lineHeight: 1.4 }}>
                          {expanded === item.id ? item.prompt : truncate(item.prompt, 90)}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.375rem", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "0.7rem", color: "#334155" }}>{formatDate(item.created_at)}</span>
                          <span style={{ color: "#1e293b" }}>·</span>
                          <Badge variant="info">{item.tokens_used} tokens</Badge>
                          <Badge variant="default">{item.model}</Badge>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", flexShrink: 0 }}>
                        <button onClick={() => handleCopy(item.output)} style={{ width: "1.75rem", height: "1.75rem", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", color: "#475569", background: "none", border: "none", cursor: "pointer", transition: "all 0.15s" }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = "#e2e8f0"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = "#475569"; e.currentTarget.style.background = "none"; }}>
                          <Copy style={{ width: "0.875rem", height: "0.875rem" }} />
                        </button>
                        <button onClick={() => handleDelete(item.id)} disabled={deleting === item.id} style={{ width: "1.75rem", height: "1.75rem", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", color: "#475569", background: "none", border: "none", cursor: "pointer", transition: "all 0.15s", opacity: deleting === item.id ? 0.5 : 1 }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = "#f87171"; e.currentTarget.style.background = "rgba(239,68,68,0.05)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = "#475569"; e.currentTarget.style.background = "none"; }}>
                          {deleting === item.id ? <Loader2 style={{ width: "0.875rem", height: "0.875rem", animation: "spin 1s linear infinite" }} /> : <Trash2 style={{ width: "0.875rem", height: "0.875rem" }} />}
                        </button>
                        <button onClick={() => setExpanded(expanded === item.id ? null : item.id)} style={{ width: "1.75rem", height: "1.75rem", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", color: "#475569", background: "none", border: "none", cursor: "pointer", transition: "all 0.15s" }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = "#e2e8f0"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = "#475569"; e.currentTarget.style.background = "none"; }}>
                          {expanded === item.id ? <ChevronUp style={{ width: "0.875rem", height: "0.875rem" }} /> : <ChevronDown style={{ width: "0.875rem", height: "0.875rem" }} />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded output */}
                    {expanded === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ marginTop: "1rem", padding: "1rem", borderRadius: "0.75rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.7, whiteSpace: "pre-wrap", maxHeight: "20rem", overflowY: "auto" }}
                      >
                        {item.output}
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
