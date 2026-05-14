"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Sparkles, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      transition: "all 0.3s ease",
      background: scrolled ? "rgba(9,9,15,0.9)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.2)" : "none",
    }}>
      <nav style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem", height: "4rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
          <div style={{
            width: "2rem", height: "2rem", borderRadius: "0.5rem",
            background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 12px rgba(139,92,246,0.4)",
          }}>
            <Sparkles style={{ width: "1rem", height: "1rem", color: "#fff" }} />
          </div>
          <span style={{ fontWeight: 600, color: "#f1f5f9", fontSize: "1.0625rem" }}>
            Nocodly <span className="gradient-text">AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="desktop-nav">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} style={{ fontSize: "0.875rem", color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#f1f5f9"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#94a3b8"; }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }} className="desktop-nav">
          <Link href="/login" style={{
            padding: "0.5rem 1rem", borderRadius: "0.5rem", fontSize: "0.875rem",
            color: "#94a3b8", textDecoration: "none", transition: "all 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#f1f5f9"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.background = "transparent"; }}
          >
            Sign in
          </Link>
          <Link href="/register" className="btn-primary" style={{
            padding: "0.5rem 1.125rem", borderRadius: "0.5rem", fontSize: "0.875rem",
            fontWeight: 600, textDecoration: "none", color: "#fff",
            display: "inline-flex", alignItems: "center",
          }}>
            Get started free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="mobile-menu-btn"
          style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: "0.25rem" }}
        >
          {open
            ? <X style={{ width: "1.5rem", height: "1.5rem" }} />
            : <Menu style={{ width: "1.5rem", height: "1.5rem" }} />
          }
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: "rgba(9,9,15,0.97)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "0.5rem 1.5rem 1.25rem",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setOpen(false)}
                style={{ padding: "0.75rem 0", fontSize: "0.9375rem", color: "#94a3b8", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
            <Link href="/login" style={{
              padding: "0.75rem 1rem", borderRadius: "0.5rem", fontSize: "0.9375rem",
              color: "#cbd5e1", textDecoration: "none", textAlign: "center",
              border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)",
            }}>
              Sign in
            </Link>
            <Link href="/register" className="btn-primary" style={{
              padding: "0.75rem 1rem", borderRadius: "0.5rem", fontSize: "0.9375rem",
              fontWeight: 600, textDecoration: "none", color: "#fff", textAlign: "center",
              display: "block",
            }}>
              Get started free
            </Link>
          </div>
        </div>
      )}

      {/* Hide/show desktop vs mobile */}
      <style>{`
        .desktop-nav { display: flex; }
        .mobile-menu-btn { display: none; }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
