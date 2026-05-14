"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

interface HeaderProps {
  title: string;
  description?: string;
}

export function DashboardHeader({ title, description }: HeaderProps) {
  const [initials, setInitials] = useState("U");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      const name = user.user_metadata?.full_name || user.email || "";
      const parts = name.split(/[\s@]/);
      setInitials(parts.filter(Boolean).map((p: string) => p[0]).join("").toUpperCase().slice(0, 2) || "U");
    });
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f1f5f9" }}>{title}</h1>
        {description && <p style={{ fontSize: "0.875rem", color: "#475569", marginTop: "0.125rem" }}>{description}</p>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <button
          onClick={() => toast.info("Search coming soon!")}
          style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.5rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", color: "#475569", cursor: "pointer", transition: "all 0.15s" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#e2e8f0"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#475569"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
        >
          <Search style={{ width: "1rem", height: "1rem" }} />
        </button>
        <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.5rem", background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.75rem", fontWeight: 700, cursor: "default", boxShadow: "0 0 10px rgba(139,92,246,0.3)" }}>
          {initials}
        </div>
      </div>
    </div>
  );
}
