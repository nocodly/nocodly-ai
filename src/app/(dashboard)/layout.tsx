"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Menu, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#09090f", display: "flex" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
          className="mobile-overlay"
        />
      )}

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main style={{ flex: 1, minWidth: 0, overflowX: "hidden" }}>
        {/* Mobile top bar */}
        <div className="mobile-topbar" style={{
          display: "none", alignItems: "center", justifyContent: "space-between",
          padding: "1rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(9,9,15,0.95)", backdropFilter: "blur(12px)",
          position: "sticky", top: 0, zIndex: 30,
        }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <div style={{ width: "1.75rem", height: "1.75rem", borderRadius: "0.5rem", background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles style={{ width: "0.875rem", height: "0.875rem", color: "#fff" }} />
            </div>
            <span style={{ fontWeight: 600, color: "#f1f5f9", fontSize: "0.9375rem" }}>
              Nocodly <span className="gradient-text">AI</span>
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(true)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.5rem", padding: "0.4rem", cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Menu style={{ width: "1.25rem", height: "1.25rem" }} />
          </button>
        </div>

        <div style={{ padding: "2rem" }} className="dashboard-content">
          {children}
        </div>
      </main>

      <style>{`
        @media (max-width: 1023px) {
          .mobile-topbar { display: flex !important; }
          .dashboard-content { padding: 1.25rem !important; }
        }
      `}</style>
    </div>
  );
}
