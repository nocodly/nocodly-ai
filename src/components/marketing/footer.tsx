"use client";

import Link from "next/link";
import { Sparkles, ExternalLink, AtSign } from "lucide-react";

const PRODUCT_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Changelog", href: "/changelog" },
  { label: "Roadmap", href: "/roadmap" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Security", href: "/security" },
  { label: "Cookies", href: "/cookies" },
];

function FooterLinkList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 style={{
        fontSize: "0.6875rem", fontWeight: 600, color: "#cbd5e1",
        textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem",
      }}>
        {title}
      </h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              style={{ fontSize: "0.875rem", color: "#475569", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#cbd5e1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#475569"; }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.05)",
      paddingTop: "3rem",
      paddingBottom: "3rem",
      marginTop: "5rem",
    }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Top grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "2rem",
          marginBottom: "2.5rem",
        }}>
          {/* Brand col — spans 1 column on desktop */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <div style={{
                width: "1.75rem", height: "1.75rem", borderRadius: "0.5rem",
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Sparkles style={{ width: "0.875rem", height: "0.875rem", color: "#fff" }} />
              </div>
              <span style={{ fontWeight: 600, color: "#f1f5f9", fontSize: "0.9375rem" }}>
                Nocodly{" "}
                <span style={{ background: "linear-gradient(135deg, #8b5cf6, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  AI
                </span>
              </span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "#475569", lineHeight: 1.6, maxWidth: "11rem", marginBottom: "1rem" }}>
              AI-powered SaaS platform for modern teams.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Link href="#" style={{ color: "#475569", textDecoration: "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#cbd5e1"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#475569"; }}
              >
                <ExternalLink style={{ width: "1rem", height: "1rem" }} />
              </Link>
              <Link href="#" style={{ color: "#475569", textDecoration: "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#cbd5e1"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#475569"; }}
              >
                <AtSign style={{ width: "1rem", height: "1rem" }} />
              </Link>
            </div>
          </div>

          <FooterLinkList title="Product" links={PRODUCT_LINKS} />
          <FooterLinkList title="Company" links={COMPANY_LINKS} />
          <FooterLinkList title="Legal" links={LEGAL_LINKS} />
        </div>

        {/* Responsive overrides for mobile */}
        <style>{`
          @media (max-width: 767px) {
            .footer-grid { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingTop: "1.5rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}>
          <p style={{ fontSize: "0.75rem", color: "#334155" }}>
            © {new Date().getFullYear()} Nocodly AI. All rights reserved.
          </p>
          <p style={{ fontSize: "0.75rem", color: "#334155" }}>
            Built with Next.js, Supabase &amp; OpenAI
          </p>
        </div>
      </div>
    </footer>
  );
}
