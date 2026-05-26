"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Sparkles, Copy, Download, RefreshCw, Loader2, Zap, ChevronDown,
  Clock, Image, Mic, Code2, Globe, Layers,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

const TEMPLATES = [
  { label: "Blog Post Intro", prompt: "Write an engaging introduction for a blog post about {topic}. Make it hook the reader immediately." },
  { label: "Product Description", prompt: "Write a compelling product description for {product}. Focus on benefits and value proposition." },
  { label: "Email Subject Lines", prompt: "Generate 10 creative email subject lines for a {campaign_type} campaign. Include emojis where appropriate." },
  { label: "LinkedIn Post", prompt: "Write a professional yet engaging LinkedIn post about {topic}. Include a call-to-action." },
  { label: "Social Media Copy", prompt: "Create 5 social media posts for {platform} promoting {product_or_service}." },
  { label: "Cold Email", prompt: "Write a cold outreach email to a potential client in the {industry} industry. Keep it short and focused on value." },
];

const MODELS = [
  { id: "gpt-4o-mini", name: "GPT-4o Mini", desc: "Fast & efficient", badge: "Active", color: "#a78bfa" },
  { id: "gpt-4o", name: "GPT-4o", desc: "Most capable OpenAI", badge: "Soon", color: "#64748b" },
  { id: "claude-3", name: "Claude 3.5 Sonnet", desc: "Anthropic's best", badge: "Soon", color: "#64748b" },
  { id: "gemini", name: "Gemini 1.5 Pro", desc: "Google's model", badge: "Soon", color: "#64748b" },
];

const COMING_SOON = [
  { icon: Image, label: "Image Generation", desc: "DALL-E 3 & Midjourney API" },
  { icon: Mic, label: "Voice & Audio", desc: "Text-to-speech, transcription" },
  { icon: Code2, label: "Code Assistant", desc: "Specialized coding models" },
  { icon: Globe, label: "Web Browsing", desc: "AI with real-time web access" },
  { icon: Layers, label: "Fine-tuning", desc: "Train on your own data" },
  { icon: Sparkles, label: "AI Agents", desc: "Autonomous multi-step tasks" },
];

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState(0);
  const [showTemplates, setShowTemplates] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) { toast.error("Please enter a prompt first"); return; }
    setLoading(true); setOutput("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token ? { "Authorization": `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error ?? "Generation failed"); }
      const data = await res.json();
      setOutput(data.text); setTokens(data.tokens);
      toast.success(`Generated! ${data.tokens} tokens used.`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally { setLoading(false); }
  };

  const handleCopy = () => { navigator.clipboard.writeText(output); toast.success("Copied!"); };
  const handleDownload = () => {
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(new Blob([output], { type: "text/plain" })), download: "nocodly-ai-output.txt" });
    a.click();
  };

  return (
    <div style={{ maxWidth: "72rem" }}>
      <DashboardHeader title="AI Generator" description="Transform your prompts into polished content with GPT-4o Mini." />

      {/* Model selector */}
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#334155", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>Model</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          {MODELS.map((m) => (
            <div key={m.id} style={{
              display: "flex", alignItems: "center", gap: "0.625rem",
              padding: "0.5rem 0.875rem", borderRadius: "0.625rem",
              background: m.badge === "Active" ? "rgba(139,92,246,0.1)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${m.badge === "Active" ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.06)"}`,
              cursor: m.badge === "Active" ? "default" : "not-allowed",
              opacity: m.badge === "Soon" ? 0.6 : 1,
            }}>
              <Sparkles style={{ width: "0.875rem", height: "0.875rem", color: m.color }} />
              <div>
                <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: m.badge === "Active" ? "#c4b5fd" : "#475569" }}>{m.name}</span>
                <span style={{ fontSize: "0.7rem", color: "#334155", marginLeft: "0.375rem" }}>{m.desc}</span>
              </div>
              <span style={{
                fontSize: "0.625rem", fontWeight: 600, padding: "0.125rem 0.5rem", borderRadius: "9999px",
                background: m.badge === "Active" ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.06)",
                color: m.badge === "Active" ? "#a78bfa" : "#475569",
                border: `1px solid ${m.badge === "Active" ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.08)"}`,
              }}>
                {m.badge === "Active" ? "✓ Active" : "Coming Soon"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Generator */}
      <div style={{ display: "grid", gap: "1.5rem", marginBottom: "2rem" }} className="gen-grid">
        {/* Input */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Card style={{ height: "100%" }}>
            <CardHeader>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <CardTitle style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Zap style={{ width: "1rem", height: "1rem", color: "#a78bfa" }} />
                  Your Prompt
                </CardTitle>
                <button onClick={() => setShowTemplates(!showTemplates)} style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.75rem", color: "#475569", background: "none", border: "none", cursor: "pointer", transition: "color 0.15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#cbd5e1"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#475569"; }}>
                  Templates <ChevronDown style={{ width: "0.875rem", height: "0.875rem", transform: showTemplates ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              {showTemplates && (
                <div style={{ marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  {TEMPLATES.map(({ label, prompt: tmpl }) => (
                    <button key={label} onClick={() => { setPrompt(tmpl); setShowTemplates(false); }}
                      style={{ textAlign: "left", padding: "0.5rem 0.75rem", borderRadius: "0.5rem", fontSize: "0.75rem", color: "#64748b", background: "none", border: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", transition: "all 0.15s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#e2e8f0"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "none"; }}>
                      {label}
                    </button>
                  ))}
                </div>
              )}
              <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)}
                placeholder={"Describe what you want to generate…\n\nExample: Write a compelling product description for a project management SaaS tool targeted at remote teams."}
                style={{ minHeight: "16rem", marginBottom: "1rem" }}
              />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.75rem", color: "#334155" }}>{prompt.length} chars</span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Button variant="ghost" size="sm" onClick={() => { setPrompt(""); setOutput(""); }} disabled={!prompt && !output}>
                    <RefreshCw style={{ width: "0.875rem", height: "0.875rem", marginRight: "0.375rem" }} /> Clear
                  </Button>
                  <Button size="sm" onClick={handleGenerate} disabled={loading || !prompt.trim()}>
                    {loading
                      ? <><Loader2 style={{ width: "0.875rem", height: "0.875rem", marginRight: "0.375rem", animation: "spin 1s linear infinite" }} /> Generating...</>
                      : <><Sparkles style={{ width: "0.875rem", height: "0.875rem", marginRight: "0.375rem" }} /> Generate</>
                    }
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Output */}
        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Card style={{ height: "100%" }}>
            <CardHeader>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <CardTitle style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Sparkles style={{ width: "1rem", height: "1rem", color: "#22d3ee" }} />
                  Output
                </CardTitle>
                {tokens > 0 && (
                  <span style={{ fontSize: "0.75rem", padding: "0.125rem 0.625rem", borderRadius: "9999px", background: "rgba(6,182,212,0.12)", color: "#22d3ee", border: "1px solid rgba(6,182,212,0.2)" }}>
                    {tokens} tokens
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div style={{ minHeight: "16rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                  <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Loader2 style={{ width: "1.5rem", height: "1.5rem", color: "#a78bfa", animation: "spin 1s linear infinite" }} />
                  </div>
                  <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {[100, 83, 67, 100, 75].map((w, i) => (
                      <div key={i} className="skeleton" style={{ height: "1rem", width: `${w}%` }} />
                    ))}
                  </div>
                </div>
              ) : output ? (
                <>
                  <div style={{ minHeight: "16rem", marginBottom: "1rem", padding: "1rem", borderRadius: "0.75rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", fontSize: "0.875rem", color: "#cbd5e1", lineHeight: 1.7, whiteSpace: "pre-wrap", overflowY: "auto", maxHeight: "25rem" }}>
                    {output}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      <Copy style={{ width: "0.875rem", height: "0.875rem", marginRight: "0.375rem" }} /> Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownload}>
                      <Download style={{ width: "0.875rem", height: "0.875rem", marginRight: "0.375rem" }} /> Download
                    </Button>
                    <Button size="sm" onClick={handleGenerate}>
                      <RefreshCw style={{ width: "0.875rem", height: "0.875rem", marginRight: "0.375rem" }} /> Regenerate
                    </Button>
                  </div>
                </>
              ) : (
                <div style={{ minHeight: "16rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "0.75rem" }}>
                  <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Sparkles style={{ width: "1.25rem", height: "1.25rem", color: "#334155" }} />
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "#334155" }}>Your generated content will appear here.</p>
                  <p style={{ fontSize: "0.75rem", color: "#1e293b" }}>Enter a prompt and click Generate.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Coming soon features */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1rem" }}>
          <Clock style={{ width: "1rem", height: "1rem", color: "#475569" }} />
          <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#64748b" }}>Coming Soon</h2>
          <span style={{ fontSize: "0.7rem", padding: "0.125rem 0.5rem", borderRadius: "9999px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "#334155" }}>
            In development
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem" }}>
          {COMING_SOON.map(({ icon: Icon, label, desc }) => (
            <div key={label} style={{
              display: "flex", alignItems: "flex-start", gap: "0.75rem",
              padding: "1rem", borderRadius: "0.75rem",
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
              opacity: 0.6,
            }}>
              <div style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon style={{ width: "0.875rem", height: "0.875rem", color: "#475569" }} />
              </div>
              <div>
                <p style={{ fontSize: "0.8125rem", fontWeight: 500, color: "#475569" }}>{label}</p>
                <p style={{ fontSize: "0.7rem", color: "#334155", marginTop: "0.125rem" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .gen-grid { grid-template-columns: 1fr; }
        @media (min-width: 1024px) { .gen-grid { grid-template-columns: 1fr 1fr; } }
      `}</style>
    </div>
  );
}
