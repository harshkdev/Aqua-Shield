"use client";

import dynamic from "next/dynamic";
import AquaNavbar from "@/components/aquashield/AquaNavbar";
import HeroSection from "@/components/aquashield/HeroSection";
import FeaturesSection from "@/components/aquashield/FeaturesSection";
import HowItWorks from "@/components/aquashield/HowItWorks";
import AIInsights from "@/components/aquashield/AIInsights";
import TechnologySection from "@/components/aquashield/TechnologySection";
import StatsSection from "@/components/aquashield/StatsSection";
import CTASection from "@/components/aquashield/CTASection";
import AquaFooter from "@/components/aquashield/AquaFooter";
import CursorEffects from "@/components/aquashield/CursorEffects";

// Dynamic import for DashboardPreview (contains Leaflet which needs SSR disabled)
const DashboardPreview = dynamic(
  () => import("@/components/aquashield/DashboardPreview"),
  {
    ssr: false,
    loading: () => (
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="h-[600px] rounded-3xl bg-[#0F2035]/80 animate-pulse" />
        </div>
      </section>
    ),
  }
);

export default function LandingPage() {
  return (
    <>
      <CursorEffects />
      <AquaNavbar />

      <section id="home">
        <HeroSection />
      </section>

      <FeaturesSection />
      <HowItWorks />
      <DashboardPreview />
      <AIInsights />
      <TechnologySection />
      <StatsSection />
      <CTASection />
      <AquaFooter />
    </>
  );
}
