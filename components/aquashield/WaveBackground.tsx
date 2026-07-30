"use client";

import React, { useRef } from "react";
import { useInView } from "react-intersection-observer";

interface WaveBackgroundProps {
  isDark?: boolean;
  mouseX?: number;
  mouseY?: number;
}

const glassBubbles = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  size: 10 + ((i * 11) % 60),
  left: `${(i * 9.5) % 92 + 4}%`,
  duration: 18 + (i % 12),
  delay: (i % 6) * 1.2,
  deltaX: (i % 2 === 0 ? 1 : -1) * (8 + (i % 18)),
  opacity: 0.06 + (i % 3) * 0.03,
}));

const dustParticles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  size: 2 + (i % 4),
  left: `${(i * 6.5) % 96 + 2}%`,
  top: `${(i * 7.2) % 90 + 5}%`,
  duration: 14 + (i % 10),
  delay: (i % 8) * 0.6,
  deltaX: (i % 2 === 0 ? 1 : -1) * (6 + (i % 10)),
}));

const referenceBubbles = [
  { id: 1, size: 10, left: '39.5%', top: '3%' },
  { id: 2, size: 12, left: '23.2%', top: '26%' },
  { id: 3, size: 11, left: '6.8%', top: '45.5%' },
  { id: 4, size: 8, left: '31.4%', top: '84%' },
  { id: 5, size: 9, left: '79.2%', top: '7.8%' },
  { id: 6, size: 10, left: '63.2%', top: '28.5%' },
  { id: 7, size: 7, left: '64.1%', top: '38.2%' },
  { id: 8, size: 6, left: '71.1%', top: '87.8%' },
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
      {/* LAYER 1: Base Ambient Gradient Backdrop */}
      <div 
        className="absolute inset-0 transition-opacity duration-700 bg-[#F2FAFD] dark:bg-[#07162B] bg-[radial-gradient(circle_at_15%_25%,rgba(186,242,252,0.85)_0%,transparent_55%),radial-gradient(circle_at_85%_15%,rgba(204,245,255,0.9)_0%,transparent_50%),radial-gradient(circle_at_75%_75%,rgba(215,248,255,0.75)_0%,transparent_55%)] dark:bg-[radial-gradient(circle_at_20%_25%,rgba(0,194,209,0.12)_0%,transparent_55%),radial-gradient(circle_at_80%_20%,rgba(0,194,209,0.1)_0%,transparent_55%),radial-gradient(circle_at_70%_70%,rgba(11,79,140,0.15)_0%,transparent_60%)]"
      />

      <div
        className="absolute top-1/2 right-[12%] w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none"
        style={{
          background: "rgba(0, 200, 255, 0.12)",
          transform: `translate3d(${mouseX * 0.1}px, calc(-50% + ${mouseY * 0.1}px), 0)`,
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          transform: `translate3d(${mouseX * 0.35}px, ${mouseY * 0.35}px, 0)`,
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {glassBubbles.map((b) => (
          <div
            key={b.id}
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: b.left,
              opacity: b.opacity,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              ["--bubble-x" as string]: `${b.deltaX}px`,
            }}
            className="absolute bottom-[-80px] rounded-full backdrop-blur-[3px] border pointer-events-none wave-bubble bg-gradient-to-br from-white/40 via-cyan-300/20 to-transparent border-cyan-300/30 dark:from-cyan-400/20 dark:via-cyan-400/5 dark:to-transparent dark:border-cyan-400/20"
          />
        ))}
      </div>

      <div className="absolute inset-0">
        {dustParticles.map((p) => (
          <div
            key={p.id}
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: p.left,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              ["--dust-x" as string]: `${p.deltaX}px`,
            }}
            className="wave-dust absolute rounded-full pointer-events-none bg-[#009FAB]/25 dark:bg-cyan-300/25"
          />
        ))}
      </div>

      {/* LAYER 6: Reference Cyan Dots */}
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
            }}
            className="absolute rounded-full bg-[#00C2D1] shadow-[0_0_10px_rgba(0,194,209,0.5)] dark:bg-[#33E8F5] dark:shadow-[0_0_10px_rgba(51,232,245,0.7)]"
          />
        ))}
      </div>

      {/* LAYER 7: 3 Overlapping Parallax Water Waves at Bottom */}
      <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none z-10 overflow-hidden">
        {/* Wave 1 */}
        <svg 
          className="wave-sway absolute bottom-0 w-full h-20 opacity-10 dark:opacity-5" 
          viewBox="0 0 1440 120" 
          fill="none" 
          preserveAspectRatio="none"
        >
          <path
            d="M0 50 C 360 90, 720 20, 1080 70 C 1260 40, 1380 15, 1440 45 L1440 120 L0 120 Z"
            fill="#0B4F8C"
          />
        </svg>

        {/* Wave 2 */}
        <svg 
          className="wave-sway-reverse absolute bottom-0 w-full h-20 opacity-15 dark:opacity-10" 
          viewBox="0 0 1440 120" 
          fill="none" 
          preserveAspectRatio="none"
        >
          <path
            d="M0 60 C 360 20, 720 100, 1080 40 C 1260 10, 1380 70, 1440 60 L1440 120 L0 120 Z"
            fill="url(#waveGrad2)"
          />
          <defs>
            <linearGradient id="waveGrad2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00C2D1" />
              <stop offset="50%" stopColor="#33E8F5" />
              <stop offset="100%" stopColor="#009FAB" />
            </linearGradient>
          </defs>
        </svg>

        {/* Wave 3 */}
        <svg 
          className="wave-sway absolute bottom-0 w-full h-16 opacity-20 dark:opacity-15" 
          viewBox="0 0 1440 120" 
          fill="none" 
          preserveAspectRatio="none"
        >
          <path
            d="M0 70 C 360 40, 720 80, 1080 50 C 1260 30, 1380 60, 1440 70 L1440 120 L0 120 Z"
            fill="url(#waveGrad3)"
          />
          <defs>
            <linearGradient id="waveGrad3" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#33E8F5" />
              <stop offset="100%" stopColor="#00C2D1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

    </div>
  );
}
