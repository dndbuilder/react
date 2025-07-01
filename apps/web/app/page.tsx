import { Header } from "./_components/header";
import { HeroSection } from "./_components/hero-section";
import { FeaturesSection } from "./_components/features-section";
import { PremiumFeaturesShowcase } from "./_components/premium-features-showcase";
import { DemoSection } from "./_components/demo-section";
import { PricingSection } from "./_components/pricing-section";
import { InstallationSection } from "./_components/installation-section";
import { CtaSection } from "./_components/cta-section";
import { Footer } from "./_components/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <PremiumFeaturesShowcase />
      <DemoSection />
      <PricingSection />
      <InstallationSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
