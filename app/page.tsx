import { HeroExperience } from "@/components/marketing/hero-experience";
import { PlatformSection } from "@/components/marketing/platform-section";
import { ConnectionSection } from "@/components/marketing/connection-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { AudienceSection } from "@/components/marketing/audience-section";
import { SiteNavbar } from "@/components/marketing/site-navbar";
import { PricingSection } from "@/components/marketing/pricing-section";
import { RoadmapSection } from "@/components/marketing/roadmap-section";
import { PaymentIntegrations } from "@/components/marketing/payment-integrations";
import { FaqSection } from "@/components/marketing/faq-section";
import { SiteEnding } from "@/components/marketing/site-ending";

export default function Home() {
  return (
    <main id="top">
      <SiteNavbar />
      <HeroExperience />
      <PlatformSection />
      <ConnectionSection />
      <FeaturesSection />
      <AudienceSection />
      <PricingSection />
      <PaymentIntegrations />
      <RoadmapSection />
      <FaqSection />
      <SiteEnding />
    </main>
  );
}
