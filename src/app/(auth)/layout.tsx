import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid-pattern" style={{ minHeight: "100vh", background: "#09090f", display: "flex", flexDirection: "column" }}>
      {/* Aurora */}
      <div className="aurora" />

      {/* Logo */}
      <div style={{ position: "relative", zIndex: 10, padding: "1.5rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }} className="group">
          <div
            className="group-hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all"
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "0.5rem",
              background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 12px rgba(139,92,246,0.4)",
            }}
          >
            <Sparkles style={{ width: "1rem", height: "1rem", color: "#fff" }} />
          </div>
          <span className="font-semibold text-slate-100">
            Nocodly <span className="gradient-text">AI</span>
          </span>
        </Link>
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem 1rem 4rem" }}>
        {children}
      </div>
    </div>
  );
}
