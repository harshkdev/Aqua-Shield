"use client";

import React, { useRef, useEffect } from 'react';

interface WaveBackgroundProps {
  isDark?: boolean;
}

export default function WaveBackground({ isDark = true }: WaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speedModifier = prefersReducedMotion ? 0.15 : 0.35;

    // 1. Water Bubbles (Slow upward drift with gentle lateral sway)
    const bubbles = Array.from({ length: 18 }, () => ({
      x: Math.random() * (canvas.width || 1200),
      y: Math.random() * (canvas.height || 800),
      radius: Math.random() * 3.5 + 2.0, // 2px to 5.5px
      opacity: Math.random() * 0.08 + 0.04, // 4% to 12%
      speed: Math.random() * 0.22 + 0.12,
      swayOffset: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.01 + 0.005,
    }));

    // 2. Water Drop Ripples (Expanding concentric rings)
    const ripples = [
      { rx: 0.22, ry: 0.42, offset: 0, speed: 0.0018 },
      { rx: 0.78, ry: 0.58, offset: 0.5, speed: 0.0015 },
    ];

    const render = () => {
      time += 0.0025 * speedModifier;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Base Navy Background Fill
      ctx.fillStyle = isDark ? '#07162B' : '#F4F9FD';
      ctx.fillRect(0, 0, width, height);

      // MESH GRADIENT LAYER: Ultra-slow ambient lighting (40-60s per cycle)
      const cx1 = width * (0.35 + Math.sin(time * 0.1) * 0.15);
      const cy1 = height * (0.3 + Math.cos(time * 0.08) * 0.12);
      const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, width * 0.65);
      
      if (isDark) {
        g1.addColorStop(0, 'rgba(0, 194, 209, 0.08)');
        g1.addColorStop(0.5, 'rgba(11, 79, 140, 0.04)');
        g1.addColorStop(1, 'transparent');
      } else {
        g1.addColorStop(0, 'rgba(0, 194, 209, 0.10)');
        g1.addColorStop(0.6, 'rgba(197, 237, 255, 0.35)');
        g1.addColorStop(1, 'transparent');
      }
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const cx2 = width * (0.75 + Math.cos(time * 0.07) * 0.12);
      const cy2 = height * (0.6 + Math.sin(time * 0.09) * 0.15);
      const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, width * 0.55);
      g2.addColorStop(0, isDark ? 'rgba(11, 79, 140, 0.06)' : 'rgba(0, 194, 209, 0.06)');
      g2.addColorStop(1, 'transparent');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // FEATURE 1: Animated Flowing Wave Lines (2-3 thin, semi-transparent undulations at 5-10% opacity)
      ctx.save();
      for (let wIdx = 0; wIdx < 3; wIdx++) {
        ctx.beginPath();
        const waveAlpha = isDark ? 0.05 + wIdx * 0.02 : 0.06 + wIdx * 0.02;
        ctx.strokeStyle = isDark 
          ? `rgba(0, 194, 209, ${waveAlpha})` 
          : `rgba(11, 79, 140, ${waveAlpha * 1.3})`;
        ctx.lineWidth = 1.2;

        const baseWaveY = height * (0.28 + wIdx * 0.22);
        const waveFreq = 0.0015 + wIdx * 0.0004;
        const waveSpeed = time * (0.35 + wIdx * 0.15);

        for (let x = 0; x <= width; x += 20) {
          const y = baseWaveY + 
                    Math.sin(x * waveFreq + waveSpeed) * (18 + wIdx * 8) +
                    Math.cos(x * (waveFreq * 1.5) - waveSpeed * 0.7) * 10;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      // FEATURE 2: Water Drop Ripple Effect (Soft concentric rings gently expanding & fading)
      ctx.save();
      ripples.forEach(r => {
        const centerPX = r.rx * width;
        const centerPY = r.ry * height;
        
        // Progress 0 to 1
        const cycleProgress = (time * r.speed * 8 + r.offset) % 1;
        const radius = cycleProgress * 160 + 15; // 15px to 175px expansion
        const fadeAlpha = Math.sin(cycleProgress * Math.PI) * (isDark ? 0.07 : 0.06);

        if (fadeAlpha > 0.005) {
          // Inner Ring
          ctx.beginPath();
          ctx.arc(centerPX, centerPY, radius, 0, Math.PI * 2);
          ctx.strokeStyle = isDark ? `rgba(0, 194, 209, ${fadeAlpha})` : `rgba(11, 79, 140, ${fadeAlpha})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();

          // Outer Ring (Slightly larger, lower opacity)
          if (radius > 35) {
            ctx.beginPath();
            ctx.arc(centerPX, centerPY, radius * 0.7, 0, Math.PI * 2);
            ctx.strokeStyle = isDark ? `rgba(0, 194, 209, ${fadeAlpha * 0.5})` : `rgba(11, 79, 140, ${fadeAlpha * 0.5})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });
      ctx.restore();

      // FEATURE 3: Translucent Water Bubbles (Drifting upward with subtle swaying)
      bubbles.forEach((b) => {
        b.y -= b.speed;
        b.swayOffset += b.swaySpeed;
        const currentX = b.x + Math.sin(b.swayOffset) * 12;

        if (b.y < -20) {
          b.y = height + 20;
          b.x = Math.random() * width;
        }

        ctx.save();
        // Bubble Fill
        ctx.beginPath();
        ctx.arc(currentX, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark 
          ? `rgba(0, 194, 209, ${b.opacity})` 
          : `rgba(11, 79, 140, ${b.opacity * 1.2})`;
        ctx.fill();

        // Bubble Specular Edge/Highlight
        ctx.beginPath();
        ctx.arc(currentX - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = isDark 
          ? `rgba(255, 255, 255, ${b.opacity * 1.5})` 
          : `rgba(255, 255, 255, ${b.opacity * 2.0})`;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
