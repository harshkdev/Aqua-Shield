"use client";

import { useEffect, useState } from "react";
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
import WaveBackground from "@/components/aquashield/WaveBackground";
import BottomWaveOverlay from "@/components/aquashield/BottomWaveOverlay";
import { useTheme } from "@/components/providers/ThemeProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

import DashboardPreview from "@/components/aquashield/DashboardPreview";

export default function LandingPage() {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <SmoothScrollProvider>
      <div className={`relative min-h-screen bg-[#F2FAFD] dark:bg-[#07162B] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-[0.995]"}`}>
        {/* 1 Single Global GPU-Accelerated Atmospheric Backdrop (0% CPU Footprint) */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <WaveBackground />
        </div>

        {/* 2 Fixed Ocean Wave Overlay at Bottom (z-30 IN FRONT of all section elements z-10) */}
        <BottomWaveOverlay />

        <div className="relative z-10">
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
        </div>
      </div>
    </SmoothScrollProvider>
  );
}

