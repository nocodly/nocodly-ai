import { PageWrapper } from "@/components/marketing/page-wrapper";

const SECTIONS = [
  {
    title: "Information We Collect",
    content: `We collect information you provide directly, such as your name, email address, and payment information when you create an account or subscribe to a plan. We also automatically collect usage data including pages visited, features used, and interaction logs to improve the product. Device and browser information may be collected to help us diagnose issues and optimize performance.`,
  },
  {
    title: "How We Use Your Information",
    content: `We use your information to provide, maintain, and improve the Nocodly AI service. Your data is used to process payments, send service notifications, and respond to support requests. We may use aggregated, anonymized data to understand product trends and guide our roadmap decisions.`,
  },
  {
    title: "Data Sharing",
    content: `We do not sell your personal information to third parties. We share data only with trusted service providers who help us operate the platform — such as Stripe for payments, Supabase for database infrastructure, and OpenAI for AI processing — all under strict data processing agreements. We may disclose information if required by law or to protect our legal rights.`,
  },
  {
    title: "Data Retention & Security",
    content: `We retain your data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time. All data is encrypted in transit using TLS 1.2+ and at rest using AES-256. We apply access controls and conduct regular security reviews to protect your information.`,
  },
  {
    title: "Your Rights",
    content: `Depending on your location, you may have rights to access, correct, or delete your personal data. EU and UK residents have rights under GDPR, including the right to data portability and to object to processing. To exercise your rights, contact us at support@nocodly.com. We will respond within 30 days.`,
  },
  {
    title: "Cookies",
    content: `We use essential cookies to keep you logged in and maintain your session. We may use analytics cookies to understand how users interact with our product — you can opt out at any time via our cookie settings. We do not use advertising or tracking cookies. See our Cookie Policy for full details.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by email or via a prominent notice on our website. Continued use of the service after changes take effect constitutes acceptance of the updated policy. This policy was last updated in May 2025.`,
  },
  {
    title: "Contact",
    content: `If you have questions about this Privacy Policy or how we handle your data, please contact us at support@nocodly.com. For general inquiries, visit our Contact page or join our Discord community.`,
  },
];

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <div style={{ maxWidth: "52rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Hero */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: "2rem", padding: "0.25rem 1rem", marginBottom: "1.5rem",
          }}>
            <span style={{ fontSize: "0.75rem", color: "#8b5cf6", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Legal</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem", lineHeight: 1.2 }}>
            Privacy Policy
          </h1>
          <p style={{ color: "#475569", fontSize: "0.875rem" }}>Last updated: May 2025</p>
          <p style={{ color: "#94a3b8", marginTop: "0.75rem", lineHeight: 1.7 }}>
            Your privacy matters to us. This policy explains what data we collect, why we collect it, and how we protect it. We aim to be transparent and straightforward — no legalese.
          </p>
        </div>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {SECTIONS.map((section, i) => (
            <div key={section.title} style={{
              borderTop: i === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              padding: "2rem 0",
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "2rem",
            }}>
              <div>
                <h2 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#8b5cf6", margin: 0, lineHeight: 1.4 }}>
                  {section.title}
                </h2>
              </div>
              <div>
                <p style={{ fontSize: "0.9375rem", color: "#94a3b8", lineHeight: 1.75, margin: 0 }}>
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact footer */}
        <div style={{
          marginTop: "3rem", padding: "1.5rem", borderRadius: "0.875rem",
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
          display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap",
        }}>
          <span style={{ fontSize: "1.5rem" }}>📬</span>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#f1f5f9", fontWeight: 600, marginBottom: "0.25rem", fontSize: "0.9375rem" }}>Questions about your data?</p>
            <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>Email us at <span style={{ color: "#8b5cf6" }}>support@nocodly.com</span> and we&apos;ll respond within 30 days.</p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
