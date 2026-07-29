import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AquaShield AI — Predict Water Risks Before They Become Health Risks",
  description:
    "AI-powered water intelligence platform combining real-time sensor monitoring, environmental insights, predictive analytics, and smart alerts to help communities make safer decisions.",
  keywords: [
    "water quality monitoring",
    "AI water prediction",
    "water safety",
    "IoT sensors",
    "environmental analytics",
    "water contamination",
    "GIS mapping",
    "predictive analytics",
  ],
  openGraph: {
    type: "website",
    title: "AquaShield AI — AI-Powered Water Intelligence",
    description:
      "Predict water risks before they become health risks. Real-time monitoring, AI predictions, and smart alerts for safer water.",
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
