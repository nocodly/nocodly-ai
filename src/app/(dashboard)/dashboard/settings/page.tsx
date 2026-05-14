"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { User, Bell, Shield, Loader2, Save } from "lucide-react";

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john@company.com",
    company: "Acme Corp",
  });

  const [notifications, setNotifications] = useState({
    usageAlerts: true,
    weeklyDigest: true,
    productUpdates: false,
  });

  const handleSaveProfile = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setSaving(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="max-w-2xl">
      <DashboardHeader
        title="Settings"
        description="Manage your account preferences and notifications."
      />

      <div className="space-y-6">
        {/* Profile */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-4 h-4 text-purple-400" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-lg font-bold shadow-[0_0_16px_rgba(139,92,246,0.3)]">
                  {profile.fullName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">{profile.fullName}</p>
                  <p className="text-xs text-slate-500">{profile.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Full Name</label>
                  <Input
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Company</label>
                  <Input
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
                <Input
                  value={profile.email}
                  type="email"
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveProfile} disabled={saving}>
                  {saving ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                  ) : (
                    <><Save className="w-4 h-4" /> Save Profile</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-cyan-400" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "usageAlerts", label: "Usage Alerts", desc: "Notify when you reach 80% of your monthly limit" },
                { key: "weeklyDigest", label: "Weekly Digest", desc: "Summary of your AI usage and top generations" },
                { key: "productUpdates", label: "Product Updates", desc: "New features, improvements, and announcements" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-300">{label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, [key]: !notifications[key as keyof typeof notifications] })}
                    className={`w-10 h-5 rounded-full transition-all duration-200 relative flex-shrink-0 ${
                      notifications[key as keyof typeof notifications]
                        ? "bg-gradient-to-r from-purple-500 to-cyan-500"
                        : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                        notifications[key as keyof typeof notifications] ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Danger zone */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-red-500/15">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Shield className="w-4 h-4" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                <div>
                  <p className="text-sm font-medium text-slate-200">Delete Account</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Permanently delete your account and all data. This cannot be undone.
                  </p>
                </div>
                <Button variant="destructive" size="sm">Delete</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
