import { PageWrapper } from "@/components/marketing/page-wrapper";

const BADGE_STYLES: Record<string, React.CSSProperties> = {
  New: {
    background: "rgba(139,92,246,0.15)",
    border: "1px solid rgba(139,92,246,0.35)",
    color: "#a78bfa",
  },
  Fix: {
    background: "rgba(239,68,68,0.12)",
    border: "1px solid rgba(239,68,68,0.3)",
    color: "#f87171",
  },
  Improvement: {
    background: "rgba(6,182,212,0.12)",
    border: "1px solid rgba(6,182,212,0.3)",
    color: "#22d3ee",
  },
};

type BadgeType = "New" | "Fix" | "Improvement";

interface ChangeEntry {
  badge: BadgeType;
  text: string;
}

interface Release {
  version: string;
  date: string;
  summary: string;
  changes: ChangeEntry[];
}

const RELEASES: Release[] = [
  {
    version: "v0.3.0",
    date: "May 2025",
    summary: "Suggestion chips, improved onboarding, and major performance improvements.",
    changes: [
      { badge: "New", text: "Suggestion chips on the welcome screen — guide users with pre-built prompts." },
      { badge: "New", text: "Bot knowledge completeness score visible in settings." },
      { badge: "New", text: "Referral system — invite friends and earn credits." },
      { badge: "Improvement", text: "Widget load time reduced by 60% through lazy loading." },
      { badge: "Improvement", text: "Redesigned onboarding flow — users reach their first bot 2× faster." },
      { badge: "Fix", text: "Fixed mobile keyboard overlapping the chat input on iOS Safari." },
      { badge: "Fix", text: "Resolved rare race condition causing duplicate messages on reconnect." },
    ],
  },
  {
    version: "v0.2.0",
    date: "April 2025",
    summary: "Billing, Stripe integration, and the new landing page redesign.",
    changes: [
      { badge: "New", text: "Stripe billing — subscribe, upgrade, and manage your plan from the dashboard." },
      { badge: "New", text: "Usage analytics dashboard with token counts and conversation trends." },
      { badge: "New", text: "Embed widget now supports custom colors and font families." },
      { badge: "Improvement", text: "Full landing page redesign with dark theme and improved conversion flow." },
      { badge: "Improvement", text: "API response caching — repeated questions answered 3× faster." },
      { badge: "Fix", text: "Fixed bot settings not saving on first creation in Firefox." },
      { badge: "Fix", text: "Corrected plan limits not enforcing correctly on the Free tier." },
    ],
  },
  {
    version: "v0.1.0",
    date: "March 2025",
    summary: "Initial launch — bot creation, embed widget, and knowledge base.",
    changes: [
      { badge: "New", text: "Bot builder — create AI chatbots with a custom system prompt and persona." },
      { badge: "New", text: "Knowledge base — upload documents and URLs to ground your bot's responses." },
      { badge: "New", text: "Embeddable widget with one-line JavaScript install." },
      { badge: "New", text: "Conversation history — view and search past chats per bot." },
      { badge: "New", text: "Supabase-backed authentication with Google OAuth." },
      { badge: "Improvement", text: "OpenAI GPT-4o integration for fast, high-quality responses." },
    ],
  },
];

function Badge({ type }: { type: BadgeType }) {
  return (
    <span style={{
      ...BADGE_STYLES[type],
      padding: "0.2rem 0.625rem",
      borderRadius: "2rem",
      fontSize: "0.6875rem",
      fontWeight: 600,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      display: "inline-block",
      whiteSpace: "nowrap",
    }}>
      {type}
    </span>
  );
}

export default function ChangelogPage() {
  return (
    <PageWrapper>
      <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: "2rem", padding: "0.25rem 1rem", marginBottom: "1.5rem",
          }}>
            <span style={{ fontSize: "0.75rem", color: "#8b5cf6", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Changelog</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "#f1f5f9", marginBottom: "1rem", lineHeight: 1.2 }}>
            What&apos;s new
          </h1>
          <p style={{ fontSize: "1.0625rem", color: "#94a3b8", maxWidth: "32rem", margin: "0 auto" }}>
            Every improvement, fix, and new feature — in one place.
          </p>
        </div>

        {/* Releases */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {RELEASES.map((release, i) => (
            <div key={release.version} style={{ display: "flex", gap: "2rem", paddingBottom: "3rem" }}>
              {/* Timeline */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{
                  width: "2.75rem", height: "2.75rem", borderRadius: "50%",
                  background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, color: "#fff", fontSize: "0.6875rem",
                  flexShrink: 0,
                }}>
                  {release.version.replace("v", "")}
                </div>
                {i < RELEASES.length - 1 && (
                  <div style={{
                    width: "1px", flex: 1, marginTop: "0.5rem",
                    background: "linear-gradient(to bottom, rgba(139,92,246,0.3), transparent)",
                  }} />
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1, paddingTop: "0.25rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.25rem", flexWrap: "wrap" }}>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f1f5f9", margin: 0 }}>{release.version}</h2>
                  <span style={{ fontSize: "0.8125rem", color: "#475569" }}>{release.date}</span>
                </div>
                <p style={{ fontSize: "0.9375rem", color: "#94a3b8", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                  {release.summary}
                </p>
                <div style={{
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "0.875rem", padding: "1.25rem",
                  display: "flex", flexDirection: "column", gap: "0.875rem",
                }}>
                  {release.changes.map((change, ci) => (
                    <div key={ci} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <Badge type={change.badge} />
                      <span style={{ fontSize: "0.9375rem", color: "#cbd5e1", lineHeight: 1.55, paddingTop: "0.05rem" }}>{change.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "3rem", textAlign: "center",
        }}>
          <p style={{ color: "#94a3b8", marginBottom: "1rem", fontSize: "0.9375rem" }}>
            Get notified when we ship something new
          </p>
          <div style={{ display: "flex", gap: "0.5rem", maxWidth: "26rem", margin: "0 auto" }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                flex: 1, padding: "0.625rem 1rem", borderRadius: "0.5rem",
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                color: "#f1f5f9", fontSize: "0.875rem", outline: "none", minWidth: 0,
              }}
            />
            <button style={{
              padding: "0.625rem 1.25rem", borderRadius: "0.5rem",
              background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
              border: "none", color: "#fff", fontWeight: 600, fontSize: "0.875rem",
              cursor: "pointer", whiteSpace: "nowrap",
            }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
