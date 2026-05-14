"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Sparkles, History, CreditCard,
  Settings, LogOut, ChevronRight, X,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

const NAV = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Generate", icon: Sparkles, href: "/dashboard/generate" },
  { label: "History", icon: History, href: "/dashboard/history" },
  { label: "Billing", icon: CreditCard, href: "/dashboard/billing" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <>
      <aside className={`sidebar-wrap ${open ? "open" : ""}`}>
        {/* Logo */}
        <div style={{ padding: "1.25rem", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
            <div style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 12px rgba(139,92,246,0.35)" }}>
              <Sparkles style={{ width: "1rem", height: "1rem", color: "#fff" }} />
            </div>
            <div>
              <span style={{ fontWeight: 600, color: "#f1f5f9", fontSize: "0.875rem" }}>Nocodly</span>
              <span className="gradient-text" style={{ fontWeight: 600, fontSize: "0.875rem" }}> AI</span>
            </div>
          </Link>
          {/* Close btn — mobile only */}
          <button onClick={onClose} className="sidebar-close-btn" style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", padding: "0.25rem" }}>
            <X style={{ width: "1.25rem", height: "1.25rem" }} />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.125rem" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "#334155", textTransform: "uppercase", letterSpacing: "0.08em", padding: "0.5rem 0.75rem 0.5rem" }}>
            Menu
          </p>
          {NAV.map(({ label, icon: Icon, href }) => {
            const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                style={{
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  padding: "0.625rem 0.75rem", borderRadius: "0.5rem",
                  fontSize: "0.875rem", textDecoration: "none", transition: "all 0.15s ease",
                  background: active ? "rgba(139,92,246,0.12)" : "transparent",
                  color: active ? "#c4b5fd" : "#64748b",
                  fontWeight: active ? 500 : 400,
                  boxShadow: active ? "inset 0 0 0 1px rgba(139,92,246,0.15)" : "none",
                }}
                onMouseEnter={(e) => { if (!active) { e.currentTarget.style.color = "#e2e8f0"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; } }}
                onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "transparent"; } }}
              >
                <Icon style={{ width: "1rem", height: "1rem", flexShrink: 0, color: active ? "#a78bfa" : "#475569" }} />
                <span style={{ flex: 1 }}>{label}</span>
                {active && <ChevronRight style={{ width: "0.75rem", height: "0.75rem", color: "#7c3aed" }} />}
              </Link>
            );
          })}
        </nav>

        {/* Plan badge */}
        <div style={{ margin: "0 0.75rem 0.75rem", padding: "0.875rem", borderRadius: "0.75rem", background: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(6,182,212,0.05))", border: "1px solid rgba(139,92,246,0.12)" }}>
          <div style={{ fontSize: "0.7rem", color: "#64748b", marginBottom: "0.25rem" }}>Current Plan</div>
          <div className="gradient-text" style={{ fontSize: "0.875rem", fontWeight: 600 }}>Free Tier</div>
          <Link href="/dashboard/billing" onClick={onClose} style={{ marginTop: "0.5rem", fontSize: "0.7rem", color: "#a78bfa", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.25rem" }}>
            Upgrade to Pro <ChevronRight style={{ width: "0.625rem", height: "0.625rem" }} />
          </Link>
        </div>

        {/* Sign out */}
        <div style={{ padding: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <button onClick={handleSignOut} style={{
            width: "100%", display: "flex", alignItems: "center", gap: "0.75rem",
            padding: "0.625rem 0.75rem", borderRadius: "0.5rem", fontSize: "0.875rem",
            color: "#64748b", background: "none", border: "none", cursor: "pointer", transition: "all 0.15s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#f87171"; e.currentTarget.style.background = "rgba(239,68,68,0.05)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "transparent"; }}
          >
            <LogOut style={{ width: "1rem", height: "1rem" }} />
            Sign out
          </button>
        </div>
      </aside>

      <style>{`
        .sidebar-wrap {
          width: 15rem;
          flex-shrink: 0;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(255,255,255,0.05);
          background: rgba(9,9,15,0.85);
          backdrop-filter: blur(20px);
        }
        .sidebar-close-btn { display: none; }
        @media (max-width: 1023px) {
          .sidebar-wrap {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            z-index: 50;
            transform: translateX(-100%);
            transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
            width: 16rem;
          }
          .sidebar-wrap.open {
            transform: translateX(0);
          }
          .sidebar-close-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
