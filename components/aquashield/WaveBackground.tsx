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
    const speedModifier = prefersReducedMotion ? 0.15 : 0.45;

    // 15 Micro Ambient Droplet Particles
    const particles = Array.from({ length: 14 }, () => ({
      x: Math.random() * (canvas.width || 1200),
      y: Math.random() * (canvas.height || 800),
      radius: Math.random() * 2 + 1.5, // 1.5px - 3.5px
      opacity: Math.random() * 0.15 + 0.05, // 5% - 20%
      speed: Math.random() * 0.2 + 0.1,
      fadeSpeed: Math.random() * 0.002 + 0.001,
      fadeIn: Math.random() > 0.5
    }));

    const render = () => {
      time += 0.003 * speedModifier;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // 1. Ambient Shifting Base Color
      ctx.fillStyle = isDark ? '#07162B' : '#F0F8FF';
      ctx.fillRect(0, 0, width, height);

      // 2. Ambient Shifting Mesh Gradient (30-60s per cycle)
      const cx1 = width * 0.3 + Math.sin(time * 0.3) * 80;
      const cy1 = height * 0.35 + Math.cos(time * 0.25) * 60;
      const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, width * 0.55);
      
      if (isDark) {
        g1.addColorStop(0, 'rgba(0, 194, 209, 0.07)');
        g1.addColorStop(0.5, 'rgba(11, 79, 140, 0.04)');
        g1.addColorStop(1, 'transparent');
      } else {
        g1.addColorStop(0, 'rgba(0, 194, 209, 0.12)');
        g1.addColorStop(0.6, 'rgba(214, 243, 255, 0.4)');
        g1.addColorStop(1, 'transparent');
      }
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      // 3. Technical Grid Overlay (2-3% Opacity)
      ctx.save();
      const gridAlpha = 0.02 + Math.sin(time * 0.8) * 0.008; // 1.2% - 2.8%
      ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${gridAlpha})` : `rgba(11, 79, 140, ${gridAlpha * 1.5})`;
      ctx.lineWidth = 1;
      const gridSize = 48;
      
      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
      ctx.restore();

      // 4. Animated Ocean Light Caustics (Sunlight Refraction Curves - 5-8% Opacity)
      ctx.save();
      ctx.lineWidth = 1.2;
      for (let c = 0; c < 3; c++) {
        ctx.beginPath();
        ctx.strokeStyle = isDark 
          ? `rgba(0, 194, 209, ${0.04 + c * 0.015})` 
          : `rgba(11, 79, 140, ${0.05 + c * 0.02})`;
        
        const yOffset = height * (0.25 + c * 0.2);
        for (let x = 0; x <= width; x += 25) {
          const y = Math.sin(x * 0.002 + time * (0.8 + c * 0.3) + c * 1.5) * (15 + c * 8) +
                    Math.cos(x * 0.004 - time * 0.5) * 10 + yOffset;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      // 5. Atmospheric Floating Micro Particles (Max 14 particles, slow drift)
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        if (p.fadeIn) {
          p.opacity += p.fadeSpeed;
          if (p.opacity >= 0.18) p.fadeIn = false;
        } else {
          p.opacity -= p.fadeSpeed;
          if (p.opacity <= 0.04) p.fadeIn = true;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(0, 194, 209, ${p.opacity})` : `rgba(11, 79, 140, ${p.opacity * 1.2})`;
        ctx.fill();
      });

      // 6. AI Data Pulse Sweep (Occurs every 10-12s, <8% opacity)
      const cycle = (time * 0.15) % 1; // 0 to 1
      if (cycle < 0.3) {
        const pulseY = height * (cycle / 0.3);
        const pulseGrad = ctx.createLinearGradient(0, pulseY - 20, 0, pulseY + 20);
        const pAlpha = (1 - Math.abs((cycle / 0.3) - 0.5) * 2) * 0.06; // max 6%
        
        pulseGrad.addColorStop(0, 'transparent');
        pulseGrad.addColorStop(0.5, isDark ? `rgba(0, 194, 209, ${pAlpha})` : `rgba(11, 79, 140, ${pAlpha})`);
        pulseGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = pulseGrad;
        ctx.fillRect(0, pulseY - 20, width, 40);
      }

      // 7. Calm Lake Surface Sine Wave Layer at Bottom
      const baseWaveY = height * 0.82;
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 20) {
        const y = Math.sin(x * 0.0015 + time * 0.6) * 12 + baseWaveY;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.fillStyle = isDark ? 'rgba(6, 53, 97, 0.08)' : 'rgba(197, 237, 255, 0.3)';
      ctx.fill();

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
