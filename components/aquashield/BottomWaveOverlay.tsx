"use client";

import React from "react";

// =============================================================================
// BottomWaveOverlay — Fixed Living Ocean Surface Wave Overlay (z-30)
//
// 4 Calm Layered Ocean Waves with varying amplitudes, speeds, and soft blur.
// Fixed at bottom-0 z-30 in front of all section content (z-10).
// Content passes naturally underneath/behind the water surface line.
// =============================================================================

export default function BottomWaveOverlay() {
  return (
    <div
      className="fixed bottom-0 inset-x-0 h-28 sm:h-32 pointer-events-none z-30 overflow-hidden"
      aria-hidden="true"
    >
      {/* Wave Layer 1: Deepest Background Wave (blurred, slow 22s) */}
      <svg
        className="wave-sway-1 absolute bottom-0 w-[200%] h-24 sm:h-28 opacity-35 dark:opacity-25 blur-[1.5px]"
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 55 C 360 85, 720 25, 1080 65 C 1260 42, 1380 18, 1440 48 L1440 120 L0 120 Z"
          fill="#0B4F8C"
        />
      </svg>

      {/* Wave Layer 2: Mid-Background Aqua Gradient Wave (16s) */}
      <svg
        className="wave-sway-2 absolute bottom-0 w-[200%] h-24 sm:h-28 opacity-55 dark:opacity-40"
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 65 C 360 25, 720 95, 1080 45 C 1260 15, 1380 65, 1440 55 L1440 120 L0 120 Z"
          fill="url(#calmWaveGrad2)"
        />
        <defs>
          <linearGradient id="calmWaveGrad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#009FAB" />
            <stop offset="50%" stopColor="#00C2D1" />
            <stop offset="100%" stopColor="#0B4F8C" />
          </linearGradient>
        </defs>
      </svg>

      {/* Wave Layer 3: Foreground Main Water Crest Wave (11s) */}
      <svg
        className="wave-sway-3 absolute bottom-0 w-[200%] h-20 sm:h-24 opacity-85 dark:opacity-75"
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 72 C 360 45, 720 85, 1080 52 C 1260 32, 1380 62, 1440 72 L1440 120 L0 120 Z"
          fill="url(#calmWaveGrad3)"
        />
        <defs>
          <linearGradient id="calmWaveGrad3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#33E8F5" />
            <stop offset="50%" stopColor="#00C2D1" />
            <stop offset="100%" stopColor="#009FAB" />
          </linearGradient>
        </defs>
      </svg>

      {/* Wave Layer 4: Ambient Foam Highlight Crest Edge Line */}
      <svg
        className="wave-sway-3 absolute bottom-0 w-[200%] h-20 sm:h-24 opacity-90"
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 72 C 360 45, 720 85, 1080 52 C 1260 32, 1380 62, 1440 72"
          fill="none"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="1.2"
        />
      </svg>

      {/* Bottom Water Shadow Depth Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-[#009FAB]/25 dark:from-[#07162B]/80 to-transparent pointer-events-none" />
    </div>
  );
}

