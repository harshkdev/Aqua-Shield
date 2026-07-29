"use client";

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Play, ShieldCheck, Droplet, Radio, AlertTriangle, TrendingUp, Sparkles } from 'lucide-react';
import WaveBackground from './WaveBackground';
import { useTheme } from '@/components/providers/ThemeProvider';

function CountUpValue({ end, duration = 1.5 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // Easing out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{count}</>;
}

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  // Subtle 3-5px mouse parallax (NO 3D tilt)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 25 };
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Map mouse position relative to center: range -4px to +4px
    const offsetX = ((clientX / innerWidth) - 0.5) * 8;
    const offsetY = ((clientY / innerHeight) - 0.5) * 8;
    mouseX.set(offsetX);
    mouseY.set(offsetY);
  };

  const pageLoadTransition = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] as const
  };

  return (
    <section 
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#F4F9FD] dark:bg-[#07162B] transition-colors duration-500 pt-28 pb-16"
    >
      {/* 5-Layer Atmospheric Background Canvas */}
      <WaveBackground isDark={theme === 'dark'} />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 relative z-20 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* ================= LEFT SIDE: Hero Messaging ================= */}
          <div className="w-full lg:w-[48%] flex flex-col items-start text-left space-y-8">
            
            {/* Unified Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, ...pageLoadTransition }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/25 dark:border-cyan-400/25 bg-white/90 dark:bg-[#0F2035]/90 text-[#0B4F8C] dark:text-[#00C2D1] text-xs font-inter font-medium backdrop-blur-md shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00C2D1]" />
              <span>AI-Powered Water Intelligence</span>
            </motion.div>

            {/* Headline — Matches Exact Reference Photo: Font Outfit Light (300 weight), 60px size, #05223D color */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...pageLoadTransition }}
              className="text-4xl sm:text-5xl lg:text-[60px] font-outfit font-light text-[#05223D] dark:text-white tracking-tight leading-[1.12]"
            >
              Predict Water Risks <br className="hidden sm:inline" />
              Before They Become <br className="hidden sm:inline" />
              <span className="text-[#009FAB] dark:text-[#00C2D1] font-light">Health Risks</span>
            </motion.h1>

            {/* Subheadline — Matches Reference Photo Font & Copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ...pageLoadTransition }}
              className="text-[17px] sm:text-[18px] text-slate-600 dark:text-slate-300 font-outfit font-light leading-[1.65] max-w-[540px]"
            >
              Real-time sensor monitoring, environmental insights, and predictive analytics — combined into smart alerts that help communities make safer decisions about the water they depend on.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ...pageLoadTransition }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-1"
            >
              <button className="group relative h-13 px-7 rounded-xl bg-gradient-to-r from-[#0B4F8C] via-[#009FAB] to-[#00C2D1] text-white font-inter font-semibold text-sm flex items-center justify-center gap-2.5 transition-all duration-200 shadow-[0_4px_20px_rgba(0,194,209,0.25)] hover:shadow-[0_6px_28px_rgba(0,194,209,0.4)] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#00C2D1]/40">
                <span className="relative z-10 font-inter">Explore Platform</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="h-13 px-7 rounded-xl bg-white dark:bg-[#0F2035] hover:bg-slate-50 dark:hover:bg-[#132338] border border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200 font-inter font-semibold text-sm flex items-center justify-center gap-2.5 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00C2D1]/40">
                <Play className="w-4 h-4 text-[#00C2D1] fill-[#00C2D1]" />
                <span className="font-inter">View Live Dashboard</span>
              </button>
            </motion.div>

            {/* Real-time Telemetry Metrics Summary Row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, ...pageLoadTransition }}
              className="flex flex-wrap items-center gap-y-2 gap-x-8 pt-4 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800/80 w-full font-inter"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-inter font-bold text-slate-900 dark:text-white tabular-nums">1,240</span>
                <span className="text-slate-500 dark:text-slate-400 font-medium">sources monitored</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <span className="font-inter font-bold text-slate-900 dark:text-white tabular-nums">8.6M</span>
                <span className="text-slate-500 dark:text-slate-400 font-medium">data points / day</span>
              </div>
            </motion.div>

          </div>

          {/* ================= RIGHT SIDE: Dashboard & Floating Cards ================= */}
          <div className="w-full lg:w-[52%] relative mt-6 lg:mt-0">
            
            {/* Dashboard Ambient Glow Behind Panel (Pulsing 98% - 100%) */}
            <motion.div 
              className="absolute inset-0 bg-[#00C2D1]/15 dark:bg-[#00C2D1]/20 rounded-full blur-[110px] pointer-events-none -z-10"
              animate={{ scale: [0.98, 1, 0.98], opacity: [0.7, 0.9, 0.7] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Parallax Container (3-5px translation, NO TILT) */}
            <motion.div
              style={{ x: parallaxX, y: parallaxY }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, ...pageLoadTransition }}
              className="relative w-full max-w-xl mx-auto py-6 px-2"
            >

              {/* FLOATING CARD 1: Water Quality (Top-Left, 4px vertical float, 6s cycle) */}
              <motion.div 
                initial={{ opacity: 0, x: -16, y: -16 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  y: [0, -4, 0] 
                }}
                transition={{ 
                  opacity: { delay: 0.6, duration: 0.5 },
                  x: { delay: 0.6, duration: 0.5 },
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -top-2 -left-2 sm:-top-5 sm:-left-5 z-30 bg-white/95 dark:bg-[#0F2035]/95 backdrop-blur-xl border border-slate-200 dark:border-emerald-500/30 rounded-2xl p-3.5 shadow-lg flex items-center gap-3 transition-shadow hover:shadow-xl cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                  <Droplet className="w-5 h-5 fill-emerald-500/20" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-inter font-medium text-slate-400 tracking-wider">Water Quality</div>
                  <div className="text-sm font-inter font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="font-inter font-bold tabular-nums text-emerald-500 dark:text-emerald-400">
                      {isMounted ? <CountUpValue end={82} /> : 82}
                    </span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-inter font-medium bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">Good</span>
                  </div>
                </div>
              </motion.div>

              {/* FLOATING CARD 2: Sensors (Top-Right, 4px vertical float, 5.5s cycle) */}
              <motion.div 
                initial={{ opacity: 0, x: 16, y: -16 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  y: [0, -4, 0] 
                }}
                transition={{ 
                  opacity: { delay: 0.7, duration: 0.5 },
                  x: { delay: 0.7, duration: 0.5 },
                  y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                }}
                className="absolute -top-2 -right-2 sm:-top-5 sm:-right-5 z-30 bg-white/95 dark:bg-[#0F2035]/95 backdrop-blur-xl border border-slate-200 dark:border-cyan-400/30 rounded-2xl p-3.5 shadow-lg flex items-center gap-3 transition-shadow hover:shadow-xl cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-inter font-medium text-slate-400 tracking-wider">Sensors</span>
                    <span className="text-[9px] font-inter font-semibold text-emerald-500 dark:text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded-full border border-emerald-500/30">LIVE</span>
                  </div>
                  <div className="text-sm font-inter font-bold text-slate-900 dark:text-white tabular-nums">
                    {isMounted ? <CountUpValue end={6} /> : 6}/7 <span className="text-xs font-inter font-normal text-slate-500 dark:text-slate-400">Online</span>
                  </div>
                </div>
              </motion.div>

              {/* MAIN MONITOR PANEL IN THE BACK */}
              <div 
                className="relative z-10 bg-white/95 dark:bg-[#0F2035]/95 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-cyan-500/20 shadow-2xl dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] p-5 sm:p-7 overflow-hidden"
              >
                {/* Specular Top Edge Reflection Highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 dark:via-cyan-400/30 to-transparent pointer-events-none" />

                {/* AI Processing Faint Cyan Light Pulse (Occurs every ~12s across dashboard) */}
                <motion.div
                  className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent pointer-events-none -z-0"
                  animate={{ left: ['-20%', '120%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 9, ease: "easeInOut" }}
                />

                {/* Station Top Header */}
                <div className="flex justify-between items-center pb-4 mb-5 border-b border-slate-200 dark:border-slate-800/80 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#00C2D1]/15 border border-[#00C2D1]/30 flex items-center justify-center text-[#00C2D1]">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-inter font-semibold text-[#0A1E38] dark:text-white tracking-wide">Yamuna Basin Station #402</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-inter font-normal">Live GIS Sensor Telemetry Stream</p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25 text-xs font-inter font-medium backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span>Active Telemetry</span>
                  </div>
                </div>

                {/* CORE FEATURE: Disease Prediction · next 48h Widget */}
                <div className="bg-slate-50 dark:bg-[#132338]/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 mb-4 relative overflow-hidden shadow-inner z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-inter font-semibold text-[#0A1E38] dark:text-white">Disease Prediction · next 48h</h5>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-inter font-normal">Neural model connects water contaminants to health outcomes</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-inter font-bold text-amber-500 dark:text-amber-400 tabular-nums">
                        Risk Score: {isMounted ? <CountUpValue end={63} /> : 63}/100
                      </span>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-inter font-medium">Moderate Health Risk</div>
                    </div>
                  </div>

                  {/* Soft Severity Gradient Progress Fill (One-time animate) */}
                  <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800/90 rounded-full overflow-hidden relative mb-4">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '63%' }}
                      transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>

                  {/* Disease Risk Forecast Bar Chart (One-time animate) */}
                  <div className="flex items-end justify-between gap-2 h-16 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                    {[
                      { label: '00h', val: 25, color: 'bg-cyan-400' },
                      { label: '12h', val: 35, color: 'bg-cyan-400' },
                      { label: '24h', val: 50, color: 'bg-amber-400' },
                      { label: '36h', val: 65, color: 'bg-amber-500' },
                      { label: '48h', val: 82, color: 'bg-rose-500' },
                    ].map((bar, i) => (
                      <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-slate-200 dark:bg-slate-800/80 rounded-t-md h-12 flex items-end overflow-hidden">
                          <motion.div 
                            className={`w-full ${bar.color} rounded-t-md`}
                            initial={{ height: 0 }}
                            animate={isMounted ? { height: `${bar.val}%` } : {}}
                            transition={{ delay: 0.8 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                        <span className="text-[9px] font-inter font-medium text-slate-500 dark:text-slate-400">{bar.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Telemetry Summary Cards */}
                <div className="grid grid-cols-3 gap-3 text-center relative z-10">
                  <div className="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-inter font-medium block">pH Level</span>
                    <span className="text-xs font-inter font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">7.2</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-[#1E2510]/50 p-2.5 rounded-xl border border-slate-200 dark:border-amber-500/20">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-inter font-medium block">Turbidity</span>
                    <span className="text-xs font-inter font-bold text-amber-600 dark:text-amber-400 tabular-nums">8.4 NTU</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-[#281313]/50 p-2.5 rounded-xl border border-slate-200 dark:border-rose-500/20">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-inter font-medium block">Dissolved O₂</span>
                    <span className="text-xs font-inter font-bold text-rose-600 dark:text-rose-400 tabular-nums">4.8 mg/L</span>
                  </div>
                </div>

              </div>

              {/* FLOATING CARD 3: Active Alerts (Bottom-Right, 4px vertical float, 7s cycle) */}
              <motion.div 
                initial={{ opacity: 0, x: 16, y: 16 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  y: [0, -4, 0] 
                }}
                transition={{ 
                  opacity: { delay: 0.8, duration: 0.5 },
                  x: { delay: 0.8, duration: 0.5 },
                  y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }
                }}
                className="absolute -bottom-2 -right-2 sm:-bottom-5 sm:-right-5 z-30 bg-white/95 dark:bg-[#0F2035]/95 backdrop-blur-xl border border-slate-200 dark:border-rose-500/30 rounded-2xl p-3.5 shadow-lg flex items-center gap-3 transition-shadow hover:shadow-xl cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-500">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-inter font-medium text-slate-400 tracking-wider">Active Alerts</div>
                  <div className="text-sm font-inter font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="font-inter font-bold tabular-nums text-rose-500 dark:text-rose-400">03</span>
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-inter font-medium bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30">2 warnings</span>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
