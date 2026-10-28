import { HeroExperience } from "@/components/marketing/hero-experience";
import { PlatformSection } from "@/components/marketing/platform-section";
import { ConnectionSection } from "@/components/marketing/connection-section";

export default function Home() {
  return (
    <main>
      <HeroExperience />
      <PlatformSection />
      <ConnectionSection />
    </main>
  );
}
