"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface WaveBackgroundProps {
  isDark?: boolean;
}

export default function WaveBackground({ isDark = true }: WaveBackgroundProps) {
  // 5 Translucent Circular Water Bubbles (20px to 80px diameter)
  const bubbleConfigs = [
    { id: 1, size: 75, left: '12%', duration: 18, delay: 0 },
    { id: 2, size: 40, left: '32%', duration: 22, delay: 4 },
    { id: 3, size: 85, left: '54%', duration: 20, delay: 2 },
    { id: 4, size: 30, left: '74%', duration: 16, delay: 7 },
    { id: 5, size: 60, left: '88%', duration: 24, delay: 5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base Soft Ambient Mesh Lighting (NO lines or grids) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          isDark
            ? 'bg-[#07162B] bg-[radial-gradient(ellipse_at_30%_30%,rgba(0,194,209,0.08)_0%,transparent_60%),radial-gradient(ellipse_at_75%_65%,rgba(11,79,140,0.06)_0%,transparent_60%)]'
            : 'bg-[#F4F9FD] bg-[radial-gradient(ellipse_at_30%_30%,rgba(0,194,209,0.12)_0%,transparent_60%),radial-gradient(ellipse_at_75%_65%,rgba(197,237,255,0.4)_0%,transparent_60%)]'
        }`}
      />

      {/* 5 Circular Animated Bubbles (Slow upward drift 15-25s, staggered, ~10-15% opacity) */}
      {bubbleConfigs.map((b) => (
        <motion.div
          key={b.id}
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: b.left,
          }}
          className={`absolute bottom-[-100px] rounded-full backdrop-blur-[1px] pointer-events-none ${
            isDark
              ? 'bg-[radial-gradient(circle_at_30%_30%,rgba(0,194,209,0.22),rgba(0,194,209,0.02)_75%)] border border-cyan-400/15 shadow-[0_0_15px_rgba(0,194,209,0.1)]'
              : 'bg-[radial-gradient(circle_at_30%_30%,rgba(11,79,140,0.18),rgba(0,194,209,0.03)_75%)] border border-blue-400/20 shadow-[0_0_15px_rgba(11,79,140,0.08)]'
          }`}
          animate={{
            y: ['0vh', '-125vh'],
            x: [0, 14, -14, 0],
          }}
          transition={{
            y: {
              duration: b.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: b.delay,
            },
            x: {
              duration: b.duration * 0.45,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        />
      ))}
    </div>
  );
}
