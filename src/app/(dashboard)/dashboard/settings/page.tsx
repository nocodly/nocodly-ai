"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { User, Bell, Shield, Loader2, Save } from "lucide-react";

interface Profile {
  fullName: string;
  email: string;
  company: string;
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      style={{
        width: "2.75rem", height: "1.5rem", borderRadius: "9999px", position: "relative",
        flexShrink: 0, border: "none", cursor: "pointer", transition: "background 0.2s ease",
        background: checked ? "linear-gradient(to right, #8b5cf6, #06b6d4)" : "rgba(255,255,255,0.1)",
      }}
      aria-checked={checked}
      role="switch"
    >
      <span style={{
        position: "absolute", top: "0.125rem",
        left: checked ? "calc(100% - 1.375rem)" : "0.125rem",
        width: "1.25rem", height: "1.25rem", borderRadius: "50%",
        background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        transition: "left 0.2s ease",
      }} />
    </button>
  );
}

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>({ fullName: "", email: "", company: "" });
  const [notifications, setNotifications] = useState({
    usageAlerts: true,
    weeklyDigest: true,
    productUpdates: false,
  });

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: prof } = await supabase
        .from("profiles")
        .select("full_name, company")
        .eq("id", user.id)
        .single();

      setProfile({
        fullName: prof?.full_name || user.user_metadata?.full_name || "",
        email: user.email || "",
        company: prof?.company || "",
      });
      setLoading(false);
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("profiles")
        .update({ full_name: profile.fullName, company: profile.company, updated_at: new Date().toISOString() })
        .eq("id", user.id);

      if (error) throw error;
      toast.success("Profile saved!");
    } catch {
      toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const initials = profile.fullName
    ? profile.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : profile.email?.[0]?.toUpperCase() || "U";

  return (
    <div style={{ maxWidth: "42rem" }}>
      <DashboardHeader title="Settings" description="Manage your account preferences and notifications." />

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Profile */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <User style={{ width: "1rem", height: "1rem", color: "#a78bfa" }} />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
                  <Loader2 style={{ width: "1.5rem", height: "1.5rem", color: "#a78bfa", animation: "spin 1s linear infinite" }} />
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {/* Avatar row */}
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                    <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.125rem", fontWeight: 700, boxShadow: "0 0 16px rgba(139,92,246,0.3)", flexShrink: 0 }}>
                      {initials}
                    </div>
                    <div>
                      <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#e2e8f0" }}>{profile.fullName || "—"}</p>
                      <p style={{ fontSize: "0.75rem", color: "#64748b" }}>{profile.email}</p>
                    </div>
                  </div>

                  {/* Fields */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="settings-grid">
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, color: "#64748b", marginBottom: "0.375rem" }}>Full Name</label>
                      <Input value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} placeholder="Your name" />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, color: "#64748b", marginBottom: "0.375rem" }}>Company</label>
                      <Input value={profile.company} onChange={(e) => setProfile({ ...profile, company: e.target.value })} placeholder="Your company" />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, color: "#64748b", marginBottom: "0.375rem" }}>Email</label>
                    <Input value={profile.email} type="email" disabled style={{ opacity: 0.6, cursor: "not-allowed" }} />
                    <p style={{ fontSize: "0.7rem", color: "#334155", marginTop: "0.375rem" }}>Email cannot be changed here. Contact support.</p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={handleSave} disabled={saving}>
                      {saving
                        ? <><Loader2 style={{ width: "1rem", height: "1rem", animation: "spin 1s linear infinite" }} /> Saving...</>
                        : <><Save style={{ width: "1rem", height: "1rem" }} /> Save Profile</>
                      }
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Bell style={{ width: "1rem", height: "1rem", color: "#22d3ee" }} />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  { key: "usageAlerts", label: "Usage Alerts", desc: "Notify when you reach 80% of your monthly limit" },
                  { key: "weeklyDigest", label: "Weekly Digest", desc: "Summary of your AI usage and top generations" },
                  { key: "productUpdates", label: "Product Updates", desc: "New features, improvements, and announcements" },
                ].map(({ key, label, desc }, i, arr) => (
                  <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.875rem 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <div>
                      <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#cbd5e1" }}>{label}</p>
                      <p style={{ fontSize: "0.75rem", color: "#475569", marginTop: "0.125rem" }}>{desc}</p>
                    </div>
                    <Toggle
                      checked={notifications[key as keyof typeof notifications]}
                      onChange={() => setNotifications({ ...notifications, [key]: !notifications[key as keyof typeof notifications] })}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Danger zone */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card style={{ border: "1px solid rgba(239,68,68,0.15)" }}>
            <CardHeader>
              <CardTitle style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f87171" }}>
                <Shield style={{ width: "1rem", height: "1rem" }} />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", borderRadius: "0.75rem", background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.1)" }}>
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#e2e8f0" }}>Delete Account</p>
                  <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.125rem" }}>Permanently delete your account and all data. This cannot be undone.</p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => toast.error("Please contact support to delete your account.")}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) { .settings-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
