import { HeroSection } from './_components/hero-section';
import { FeaturesSection } from './_components/features-section';
import { PremiumFeaturesShowcase } from './_components/premium-features-showcase';
import { DemoSection } from './_components/demo-section';
import { PricingSection } from './_components/pricing-section';
import { InstallationSection } from './_components/installation-section';
import { CtaSection } from './_components/cta-section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Builder - Create Beautiful Pages with Drag and Drop',
  description:
    'Build stunning, responsive web pages without coding using our intuitive drag-and-drop page builder.',
  openGraph: {
    images: [
      {
        url: '/images/home-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Page Builder Homepage',
      },
    ],
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <HeroSection />
      <FeaturesSection />
      <PremiumFeaturesShowcase />
      <DemoSection />
      <PricingSection />
      <InstallationSection />
      <CtaSection />
    </div>
  );
}
