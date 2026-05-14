import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { HeroSection } from "@/components/marketing/hero";
import { FeaturesSection } from "@/components/marketing/features";
import { StatsSection } from "@/components/marketing/stats";
import { TestimonialsSection } from "@/components/marketing/testimonials";
import { CtaSection } from "@/components/marketing/cta";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090f] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
