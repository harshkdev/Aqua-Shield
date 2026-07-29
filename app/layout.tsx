import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL("https://aquashield.ai"),
  title: {
    default: "AquaShield AI — AI-Powered Water Intelligence Platform",
    template: "%s | AquaShield AI",
  },
  description:
    "Predict water risks before they become health risks. AI-powered water intelligence combining real-time sensor monitoring, predictive analytics, and smart alerts.",
  keywords: [
    "AquaShield AI",
    "water quality monitoring",
    "AI water prediction",
    "water safety platform",
    "IoT water sensors",
    "environmental analytics",
  ],
  authors: [{ name: "AquaShield AI Team" }],
  creator: "AquaShield AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aquashield.ai",
    siteName: "AquaShield AI",
    title: "AquaShield AI — Predict Water Risks Before They Become Health Risks",
    description:
      "AI-powered water intelligence platform with real-time monitoring, predictive analytics, and smart alerts.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AquaShield AI Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AquaShield AI — AI-Powered Water Intelligence",
    description:
      "Predict water risks before they become health risks. Real-time monitoring & AI predictions.",
    creator: "@aquashieldai",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#0B4F8C",
          colorBackground: "#0F2035",
        },
      }}
    >
      <html lang="en" className="dark" suppressHydrationWarning>
        <body className="antialiased font-sans">
          <ThemeProvider>
            <main>{children}</main>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-aqua)",
                  borderRadius: "12px",
                  backdropFilter: "blur(12px)",
                },
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
