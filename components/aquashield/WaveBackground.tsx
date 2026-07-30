"use client";

import React, { useRef } from "react";
import { useInView } from "react-intersection-observer";

interface WaveBackgroundProps {
  isDark?: boolean;
  mouseX?: number;
  mouseY?: number;
}

// 3-LAYER BUBBLE SYSTEM GENERATOR
// Layer 1: Background (20 tiny, blurred, slow particles)
const bgBubbles = Array.from({ length: 20 }, (_, i) => ({
  id: `bg-${i}`,
  size: 2 + (i % 4), // 2px - 5px
  left: `${(i * 4.9 + 2.5) % 94}%`,
  duration: 22 + (i % 11), // 22s - 32s
  delay: -((i % 7) * 2.5 + 0.8), // negative delays
  deltaX: (i % 2 === 0 ? 1 : -1) * (10 + (i % 14)),
  opacityStart: 0.08,
  opacityMid: 0.16,
  opacityMid2: 0.12,
  scaleStart: 0.85,
  scaleMid: 1.15,
  scaleMid2: 0.9,
  scaleEnd: 1.05,
  blur: 2.0,
  glow: false,
}));

// Layer 2: Middle (15 medium particles)
const midBubbles = Array.from({ length: 15 }, (_, i) => ({
  id: `mid-${i}`,
  size: 6 + (i % 5), // 6px - 10px
  left: `${(i * 6.4 + 4.2) % 92}%`,
  duration: 14 + (i % 9), // 14s - 22s
  delay: -((i % 6) * 2.1 + 0.4),
  deltaX: (i % 2 === 0 ? 1 : -1) * (12 + (i % 16)),
  opacityStart: 0.14,
  opacityMid: 0.32,
  opacityMid2: 0.22,
  scaleStart: 0.9,
  scaleMid: 1.2,
  scaleMid2: 0.95,
  scaleEnd: 1.1,
  blur: 0.8,
  glow: false,
}));

// Layer 3: Foreground (8 glowing glass particles)
const fgBubbles = Array.from({ length: 8 }, (_, i) => ({
  id: `fg-${i}`,
  size: 10 + (i % 7), // 10px - 16px
  left: `${(i * 11.8 + 6.0) % 88}%`,
  duration: 9 + (i % 6), // 9s - 14s
  delay: -((i % 5) * 1.8 + 0.3),
  deltaX: (i % 2 === 0 ? 1 : -1) * (16 + (i % 18)),
  opacityStart: 0.3,
  opacityMid: 0.6,
  opacityMid2: 0.45,
  scaleStart: 0.92,
  scaleMid: 1.25,
  scaleMid2: 0.96,
  scaleEnd: 1.15,
  blur: 0,
  glow: true,
}));

const referenceBubbles = [
  { id: 1, size: 10, left: '39.5%', top: '3%', duration: 7, delay: -1.2, deltaX: 14, deltaY: 22 },
  { id: 2, size: 12, left: '23.2%', top: '26%', duration: 9, delay: -3.5, deltaX: -16, deltaY: 26 },
  { id: 3, size: 11, left: '6.8%', top: '45.5%', duration: 8, delay: -0.8, deltaX: 18, deltaY: 20 },
  { id: 4, size: 8, left: '31.4%', top: '84%', duration: 6.5, delay: -4.2, deltaX: -12, deltaY: 24 },
  { id: 5, size: 9, left: '79.2%', top: '7.8%', duration: 10, delay: -2.1, deltaX: 16, deltaY: 28 },
  { id: 6, size: 10, left: '63.2%', top: '28.5%', duration: 7.5, delay: -5.0, deltaX: -18, deltaY: 22 },
  { id: 7, size: 7, left: '64.1%', top: '38.2%', duration: 8.5, delay: -1.8, deltaX: 14, deltaY: 25 },
  { id: 8, size: 6, left: '71.1%', top: '87.8%', duration: 9.5, delay: -4.8, deltaX: -15, deltaY: 20 },
  { id: 9, size: 9, left: '15.4%', top: '65.2%', duration: 8.0, delay: -2.7, deltaX: 16, deltaY: 24 },
  { id: 10, size: 11, left: '86.2%', top: '52.0%', duration: 9.0, delay: -4.1, deltaX: -14, deltaY: 26 },
  { id: 11, size: 8, left: '52.0%', top: '72.4%', duration: 7.2, delay: -1.5, deltaX: 15, deltaY: 22 },
  { id: 12, size: 10, left: '44.8%', top: '18.2%', duration: 8.8, delay: -3.2, deltaX: -13, deltaY: 24 },
];

export default function WaveBackground({
  mouseX = 0,
  mouseY = 0,
}: WaveBackgroundProps) {
  const { ref, inView } = useInView({ rootMargin: "200px 0px", threshold: 0 });

  return (
    <div
      ref={ref}
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0${inView ? "" : " wave-paused"}`}
    >
      {/* REQUIREMENT 1: Hero Background Depth (Multi-layered radial gradients) */}
      <div 
        className="absolute inset-0 transition-opacity duration-700 bg-[#F2FAFD] dark:bg-[#07162B]"
      />

      {/* Layer 1: Center Soft Brightening Radial Highlight */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.75)_0%,transparent_55%)] dark:bg-[radial-gradient(circle_at_50%_25%,rgba(0,194,209,0.12)_0%,transparent_55%)]"
      />

      {/* Layer 2: Subtle Ambient Cyan Light Diffusion */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(186,242,252,0.6)_0%,transparent_50%),radial-gradient(circle_at_85%_20%,rgba(204,245,255,0.7)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_25%,rgba(0,194,209,0.08)_0%,transparent_55%),radial-gradient(circle_at_80%_20%,rgba(11,79,140,0.14)_0%,transparent_55%)]"
      />

      {/* Layer 3: 2-4% Darkened Corner Vignette */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_60%,rgba(7,22,43,0.04)_100%)] dark:bg-[radial-gradient(ellipse_at_50%_50%,transparent_60%,rgba(0,0,0,0.22)_100%)]"
      />

      {/* REQUIREMENT 3: Underwater Caustic Light Patterns (2-3% opacity, ultra-slow movement) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-100">
        <svg className="w-full h-full animate-caustics pointer-events-none opacity-[0.025]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="causticsPattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 0 10 Q 5 0 10 10 T 20 10" fill="none" stroke="#00C2D1" strokeWidth="0.4" opacity="0.6" />
              <path d="M 10 0 Q 15 10 20 0 T 30 0" fill="none" stroke="#33E8F5" strokeWidth="0.3" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#causticsPattern)" />
        </svg>
      </div>

      <div
        className="absolute top-1/2 right-[12%] w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none"
        style={{
          background: "rgba(0, 200, 255, 0.08)",
          transform: `translate3d(${mouseX * 0.1}px, calc(-50% + ${mouseY * 0.1}px), 0)`,
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* REQUIREMENT 2: 3-Layer Premium Underwater Bubble System */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translate3d(${mouseX * 0.25}px, ${mouseY * 0.25}px, 0)`,
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Layer 1: Background 20 Tiny Particles */}
        {bgBubbles.map((b) => (
          <div
            key={b.id}
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: b.left,
              filter: `blur(${b.blur}px)`,
              ['--bubble-duration' as string]: `${b.duration}s`,
              ['--bubble-delay' as string]: `${b.delay}s`,
              ['--bubble-x' as string]: `${b.deltaX}px`,
              ['--bubble-opacity-start' as string]: b.opacityStart,
              ['--bubble-opacity-mid' as string]: b.opacityMid,
              ['--bubble-opacity-mid2' as string]: b.opacityMid2,
              ['--bubble-scale-start' as string]: b.scaleStart,
              ['--bubble-scale-mid' as string]: b.scaleMid,
              ['--bubble-scale-mid2' as string]: b.scaleMid2,
              ['--bubble-scale-end' as string]: b.scaleEnd,
            } as React.CSSProperties}
            className="underwater-bubble absolute bottom-[-60px] rounded-full pointer-events-none bg-cyan-500/20 dark:bg-cyan-300/15"
          />
        ))}

        {/* Layer 2: Middle 15 Particles */}
        {midBubbles.map((b) => (
          <div
            key={b.id}
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: b.left,
              filter: `blur(${b.blur}px)`,
              ['--bubble-duration' as string]: `${b.duration}s`,
              ['--bubble-delay' as string]: `${b.delay}s`,
              ['--bubble-x' as string]: `${b.deltaX}px`,
              ['--bubble-opacity-start' as string]: b.opacityStart,
              ['--bubble-opacity-mid' as string]: b.opacityMid,
              ['--bubble-opacity-mid2' as string]: b.opacityMid2,
              ['--bubble-scale-start' as string]: b.scaleStart,
              ['--bubble-scale-mid' as string]: b.scaleMid,
              ['--bubble-scale-mid2' as string]: b.scaleMid2,
              ['--bubble-scale-end' as string]: b.scaleEnd,
            } as React.CSSProperties}
            className="underwater-bubble absolute bottom-[-70px] rounded-full pointer-events-none bg-gradient-to-br from-white/30 via-cyan-300/20 to-transparent border border-cyan-300/25 dark:from-cyan-400/15 dark:via-cyan-400/5 dark:border-cyan-400/20"
          />
        ))}

        {/* Layer 3: Foreground 8 Glowing Particles */}
        {fgBubbles.map((b) => (
          <div
            key={b.id}
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: b.left,
              ['--bubble-duration' as string]: `${b.duration}s`,
              ['--bubble-delay' as string]: `${b.delay}s`,
              ['--bubble-x' as string]: `${b.deltaX}px`,
              ['--bubble-opacity-start' as string]: b.opacityStart,
              ['--bubble-opacity-mid' as string]: b.opacityMid,
              ['--bubble-opacity-mid2' as string]: b.opacityMid2,
              ['--bubble-scale-start' as string]: b.scaleStart,
              ['--bubble-scale-mid' as string]: b.scaleMid,
              ['--bubble-scale-mid2' as string]: b.scaleMid2,
              ['--bubble-scale-end' as string]: b.scaleEnd,
            } as React.CSSProperties}
            className="underwater-bubble absolute bottom-[-80px] rounded-full pointer-events-none bg-gradient-to-br from-white/60 via-[#00C2D1]/40 to-transparent border border-white/50 shadow-[0_0_12px_rgba(0,194,209,0.4)] dark:from-cyan-300/40 dark:via-cyan-400/20 dark:border-cyan-300/40 dark:shadow-[0_0_12px_rgba(51,232,245,0.5)]"
          />
        ))}
      </div>

      {/* LAYER 4: Ambient Floating Cyan Reference Bubbles */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          transform: `translate3d(${mouseX * 0.12}px, ${mouseY * 0.12}px, 0px)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {referenceBubbles.map((b) => (
          <div
            key={b.id}
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: b.left,
              top: b.top,
              '--dot-x': `${b.deltaX}px`,
              '--dot-y': `${b.deltaY}px`,
              '--dot-duration': `${b.duration}s`,
              '--dot-delay': `${b.delay}s`,
            } as React.CSSProperties}
            className="cyan-dot-bubble absolute rounded-full bg-[#00C2D1] shadow-[0_0_10px_rgba(0,194,209,0.4)] dark:bg-[#33E8F5] dark:shadow-[0_0_10px_rgba(51,232,245,0.6)]"
          />
        ))}
      </div>
    </div>
  );
}
