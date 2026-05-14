import { PageWrapper } from "@/components/marketing/page-wrapper";

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    content: `By accessing or using Nocodly AI, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use the service. We may update these terms from time to time, and continued use of the service constitutes acceptance of any changes.`,
  },
  {
    title: "Use of Service",
    content: `You may use Nocodly AI only for lawful purposes and in accordance with these terms. You agree not to use the service to transmit harmful, offensive, or illegal content, to attempt to gain unauthorized access to systems, or to interfere with other users. We reserve the right to terminate accounts that violate these standards.`,
  },
  {
    title: "Your Account",
    content: `You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must promptly notify us if you suspect unauthorized access. Accounts must be created by humans — bot-generated accounts are not permitted. You must be at least 16 years old to use the service.`,
  },
  {
    title: "Payments & Subscriptions",
    content: `Paid plans are billed on a monthly or annual basis via Stripe. Subscriptions renew automatically unless cancelled before the renewal date. Refunds are provided at our discretion and evaluated case-by-case — contact support within 7 days of a charge if you believe you were billed in error. We reserve the right to change pricing with 30 days notice.`,
  },
  {
    title: "Intellectual Property",
    content: `The Nocodly AI platform, including its design, code, and brand assets, is owned by Nocodly AI and protected by applicable intellectual property laws. Content you create using the service remains yours. By using the service, you grant us a limited license to process your content to provide and improve the service.`,
  },
  {
    title: "Termination",
    content: `You may cancel your account at any time from the dashboard. We may suspend or terminate your account if you violate these terms, engage in fraudulent activity, or fail to pay for a paid plan. Upon termination, your access to the service ends and your data may be deleted after a grace period of 30 days.`,
  },
  {
    title: "Limitation of Liability",
    content: `To the maximum extent permitted by law, Nocodly AI shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service. Our total liability to you shall not exceed the amount you paid us in the 12 months prior to the claim. The service is provided "as is" without warranties of any kind.`,
  },
  {
    title: "Governing Law",
    content: `These terms are governed by the laws of the jurisdiction in which Nocodly AI is incorporated. Any disputes shall be resolved through binding arbitration before a mutually agreed arbitrator. Nothing in these terms limits your rights under applicable consumer protection laws in your jurisdiction.`,
  },
  {
    title: "Contact",
    content: `For questions about these Terms of Service, contact us at legal@nocodly.ai or visit our Contact page. We aim to respond to all legal inquiries within 5 business days.`,
  },
];

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p style={{ color: "#475569", fontSize: "0.875rem" }}>Last updated: May 2025</p>
          <p style={{ color: "#94a3b8", marginTop: "0.75rem", lineHeight: 1.7 }}>
            Please read these terms carefully before using Nocodly AI. They cover your rights, responsibilities, and how we handle your account.
          </p>
        </div>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column" }}>
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
                <div style={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.05)", borderRadius: "0.375rem",
                  padding: "0.15rem 0.5rem", fontSize: "0.7rem", color: "#475569",
                  fontWeight: 600, marginBottom: "0.5rem",
                }}>
                  §{i + 1}
                </div>
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
          <span style={{ fontSize: "1.5rem" }}>📋</span>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#f1f5f9", fontWeight: 600, marginBottom: "0.25rem", fontSize: "0.9375rem" }}>Questions about these terms?</p>
            <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>Email us at <span style={{ color: "#8b5cf6" }}>legal@nocodly.ai</span> and we&apos;ll respond promptly.</p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
