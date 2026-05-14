"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

interface HeaderProps {
  title: string;
  description?: string;
}

export function DashboardHeader({ title, description }: HeaderProps) {
  const [initials, setInitials] = useState("U");
  const router = useRouter();

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
      <button
        onClick={() => router.push("/dashboard/settings")}
        title="Settings"
        style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.5rem", background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 0 10px rgba(139,92,246,0.3)", border: "none", transition: "opacity 0.15s" }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
      >
        {initials}
      </button>
    </div>
  );
}
