"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Sparkles, Copy, Download, RefreshCw, Loader2, Zap, ChevronDown } from "lucide-react";

const TEMPLATES = [
  { label: "Blog Post Intro", prompt: "Write an engaging introduction for a blog post about {topic}. Make it hook the reader immediately." },
  { label: "Product Description", prompt: "Write a compelling product description for {product}. Focus on benefits and value proposition." },
  { label: "Email Subject Lines", prompt: "Generate 10 creative email subject lines for a {campaign_type} campaign. Include emojis where appropriate." },
  { label: "LinkedIn Post", prompt: "Write a professional yet engaging LinkedIn post about {topic}. Include a call-to-action." },
  { label: "Social Media Copy", prompt: "Create 5 social media posts for {platform} promoting {product_or_service}." },
];

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState(0);
  const [showTemplates, setShowTemplates] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Generation failed");
      }
      const data = await res.json();
      setOutput(data.text);
      setTokens(data.tokens);
      toast.success(`Generated! ${data.tokens} tokens used.`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nocodly-ai-output.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl">
      <DashboardHeader
        title="AI Generator"
        description="Transform your prompts into polished content with GPT-4o Mini."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input panel */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-400" />
                  Your Prompt
                </CardTitle>
                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  Templates <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showTemplates ? "rotate-180" : ""}`} />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Templates */}
              {showTemplates && (
                <div className="mb-4 grid grid-cols-1 gap-1.5">
                  {TEMPLATES.map(({ label, prompt: tmpl }) => (
                    <button
                      key={label}
                      onClick={() => { setPrompt(tmpl); setShowTemplates(false); }}
                      className="text-left px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors border border-white/5"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}

              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to generate…&#10;&#10;Example: Write a compelling product description for a project management SaaS tool targeted at remote teams."
                className="min-h-[260px] mb-4"
              />

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">{prompt.length} characters</span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { setPrompt(""); setOutput(""); }}
                    disabled={!prompt && !output}
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                    Clear
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleGenerate}
                    disabled={loading || !prompt.trim()}
                  >
                    {loading ? (
                      <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Generating...</>
                    ) : (
                      <><Sparkles className="w-3.5 h-3.5 mr-1.5" /> Generate</>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Output panel */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Output
                </CardTitle>
                {tokens > 0 && (
                  <Badge variant="info">{tokens} tokens</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="min-h-[260px] flex flex-col items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                  </div>
                  <div className="space-y-2 w-full">
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-5/6" />
                    <div className="skeleton h-4 w-4/6" />
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-3/4" />
                  </div>
                </div>
              ) : output ? (
                <>
                  <div className="min-h-[260px] mb-4 p-4 rounded-xl bg-white/2 border border-white/5 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap overflow-auto max-h-[400px]">
                    {output}
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownload}>
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      Download
                    </Button>
                    <Button size="sm" onClick={handleGenerate}>
                      <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                      Regenerate
                    </Button>
                  </div>
                </>
              ) : (
                <div className="min-h-[260px] flex flex-col items-center justify-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/3 border border-white/8 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-slate-600" />
                  </div>
                  <p className="text-sm text-slate-600">Your generated content will appear here.</p>
                  <p className="text-xs text-slate-700">Enter a prompt and click Generate.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
