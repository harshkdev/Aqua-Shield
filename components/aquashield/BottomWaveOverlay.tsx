"use client";

import React from "react";

// =============================================================================
// BottomWaveOverlay — Fixed Ocean Wave Overlay (z-30)
//
// Rendered at fixed bottom-0 z-30 IN FRONT of all section content (z-10).
// As the user scrolls, all page elements (cards, text, buttons) pass
// physically BEHIND this ocean wave surface instead of in front of it.
// =============================================================================

export default function BottomWaveOverlay() {
  return (
    <div
      className="fixed bottom-0 inset-x-0 h-28 sm:h-32 pointer-events-none z-30 overflow-hidden"
      aria-hidden="true"
    >
      {/* Wave 1: Deep Cyan Parallax Wave */}
      <svg
        className="wave-sway absolute bottom-0 w-[200%] h-24 sm:h-28 opacity-40 dark:opacity-30"
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 50 C 360 90, 720 20, 1080 70 C 1260 40, 1380 15, 1440 45 L1440 120 L0 120 Z"
          fill="#0B4F8C"
        />
      </svg>

      {/* Wave 2: Vibrant Aqua Gradient Swaying Wave */}
      <svg
        className="wave-sway-reverse absolute bottom-0 w-[200%] h-24 sm:h-28 opacity-60 dark:opacity-45"
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 60 C 360 20, 720 100, 1080 40 C 1260 10, 1380 70, 1440 60 L1440 120 L0 120 Z"
          fill="url(#fixedWaveGrad2)"
        />
        <defs>
          <linearGradient id="fixedWaveGrad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00C2D1" />
            <stop offset="50%" stopColor="#33E8F5" />
            <stop offset="100%" stopColor="#009FAB" />
          </linearGradient>
        </defs>
      </svg>

      {/* Wave 3: Foreground Bright Cyan Glowing Water Surface */}
      <svg
        className="wave-sway absolute bottom-0 w-[200%] h-20 sm:h-24 opacity-80 dark:opacity-70"
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 70 C 360 40, 720 80, 1080 50 C 1260 30, 1380 60, 1440 70 L1440 120 L0 120 Z"
          fill="url(#fixedWaveGrad3)"
        />
        <defs>
          <linearGradient id="fixedWaveGrad3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#33E8F5" />
            <stop offset="50%" stopColor="#00C2D1" />
            <stop offset="100%" stopColor="#009FAB" />
          </linearGradient>
        </defs>
      </svg>

      {/* Bottom Water Shadow Edge */}
      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#009FAB]/20 to-transparent pointer-events-none" />
    </div>
  );
}
