import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#09090f", overflowX: "hidden" }}>
      <Navbar />
      <main style={{ paddingTop: "6rem", paddingBottom: "4rem" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
