"use client";

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Play, MapPin, FlaskConical, Brain, Send, Clock, TrendingUp, Sparkles } from 'lucide-react';
import WaveBackground from './WaveBackground';
import { useTheme } from '@/components/providers/ThemeProvider';

function CountUpValue({ end, duration = 1.5 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
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

  // Multi-Depth Mouse Parallax Springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 20 };
  const rawMouseX = useSpring(mouseX, springConfig);
  const rawMouseY = useSpring(mouseY, springConfig);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsMounted(true);
    const unsubscribeX = rawMouseX.on("change", (x) => setMousePos((prev) => ({ ...prev, x })));
    const unsubscribeY = rawMouseY.on("change", (y) => setMousePos((prev) => ({ ...prev, y })));
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [rawMouseX, rawMouseY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const offsetX = ((clientX / innerWidth) - 0.5) * 50;
    const offsetY = ((clientY / innerHeight) - 0.5) * 50;
    mouseX.set(offsetX);
    mouseY.set(offsetY);
  };

  const wordAnimationVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 + i * 0.05,
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const line1Words = ["Predict", "Water", "Risks"];
  const line2Words = ["Before", "They", "Become"];

  return (
    <section 
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-transparent transition-colors duration-500 pt-28 pb-16"
    >

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 relative z-20 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* ================= LEFT SIDE: Hero Messaging ================= */}
          <div className="w-full lg:w-[48%] flex flex-col items-start text-left space-y-8">
            
            {/* Unified Status Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/25 dark:border-cyan-400/25 bg-white/80 dark:bg-[#0F2035]/80 text-[#0B4F8C] dark:text-[#00C2D1] text-xs font-inter font-medium backdrop-blur-xl shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00C2D1] animate-pulse" />
              <span>AI-Powered Water Intelligence</span>
            </motion.div>

            {/* Headline with Flowing Aqua Gradient */}
            <motion.h1 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-[60px] font-outfit font-light text-[#0B2545] dark:text-white tracking-tight leading-[1.12]"
            >
              Predict Water Risks <br className="hidden sm:inline" />
              Before They Become{" "}
              <span className="font-light text-transparent bg-clip-text bg-gradient-to-r from-[#00C2D1] via-[#1DD3F8] to-[#009FAB] animate-gradient-flow inline-block">
                Health Risks
              </span>
            </motion.h1>

            {/* Subheadline Description */}
            <motion.p 
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.20, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-[17px] sm:text-[18px] text-[#61748A] dark:text-slate-300 font-outfit font-light leading-[1.65] max-w-[540px]"
            >
              Real-time sensor telemetry, environmental AI insights, and predictive contamination advisories — combined into smart alerts that help communities make safer decisions.
            </motion.p>

            {/* Premium CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-1"
            >
              {/* Primary Button */}
              <button className="group relative h-13 px-7 rounded-xl bg-gradient-to-r from-[#0B4F8C] via-[#009FAB] to-[#00C2D1] text-white font-inter font-semibold text-sm flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_4px_20px_rgba(0,194,209,0.25)] hover:shadow-[0_0_35px_rgba(0,194,209,0.45)] hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.98] cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#00C2D1]/40">
                <span className="relative z-10 font-inter">Explore Platform</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>

              {/* Secondary Glass Button */}
              <button className="group h-13 px-7 rounded-xl bg-white/78 dark:bg-[#0F2035]/85 hover:bg-white/95 dark:hover:bg-[#132338] border border-white/55 dark:border-slate-700/80 hover:border-cyan-400/50 text-[#0B2545] dark:text-slate-200 font-inter font-semibold text-sm flex items-center justify-center gap-2.5 backdrop-blur-[20px] transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00C2D1]/40">
                <Play className="w-4 h-4 text-[#00C2D1] fill-[#00C2D1] group-hover:rotate-[5deg] transition-transform duration-300" />
                <span className="font-inter">View Live Dashboard</span>
              </button>
            </motion.div>

            {/* Real-time Telemetry Metrics Summary Row */}
            <motion.div 
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-y-2 gap-x-8 pt-4 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-200/60 dark:border-slate-800/80 w-full font-inter"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-inter font-bold text-[#0B2545] dark:text-white tabular-nums">1,240</span>
                <span className="text-[#61748A] dark:text-slate-400 font-medium">sources monitored</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <span className="font-inter font-bold text-[#0B2545] dark:text-white tabular-nums">8.6M</span>
                <span className="text-[#61748A] dark:text-slate-400 font-medium">data points / day</span>
              </div>
            </motion.div>

          </div>

          {/* ================= RIGHT SIDE: Outbreak Prevention Timeline ================= */}
          <div className="w-full lg:w-[52%] relative mt-6 lg:mt-0">
            
            {/* Ambient Radial Glow Behind Panel (rgba(0,200,255,0.12), blur 180px) */}
            <motion.div 
              className="absolute inset-0 bg-[#00C2D1]/15 dark:bg-[#00C2D1]/20 rounded-full blur-[180px] pointer-events-none -z-10"
              animate={{ scale: [0.98, 1.05, 0.98], opacity: [0.7, 0.95, 0.7] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Mouse Parallax Container (10px move) */}
            <div
              style={{ 
                transform: `translate3d(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px, 0px)`,
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="relative w-full max-w-xl mx-auto py-4 px-2"
            >

              {/* MAIN HERO CARD CONTAINER (Entire Dashboard Floats Upwards with Smooth Entrance) */}
              <motion.div 
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 bg-white/78 dark:bg-[#0F2035]/85 backdrop-blur-[20px] rounded-3xl border border-white/55 dark:border-cyan-500/20 shadow-2xl dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] p-5 sm:p-7 overflow-hidden transition-shadow duration-300 hover:shadow-[0_30px_70px_-15px_rgba(0,194,209,0.25)]"
              >
                {/* Specular Top Edge Reflection Highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 dark:via-cyan-400/40 to-transparent pointer-events-none" />

                {/* AI Processing Faint Cyan Light Pulse */}
                <motion.div
                  className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent pointer-events-none -z-0"
                  animate={{ left: ['-20%', '120%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 9, ease: "easeInOut" }}
                />

                {/* 1. TOP CONTEXT CARD: Real Northeast India Location */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.30, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex justify-between items-center pb-4 mb-4 border-b border-slate-200/60 dark:border-slate-800/80 relative z-10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8.5 h-8.5 rounded-xl bg-[#00C2D1]/15 border border-[#00C2D1]/30 flex items-center justify-center text-[#00C2D1]">
                      <MapPin className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-inter font-bold text-[#0B2545] dark:text-white tracking-wide">
                        Majuli River Station · Assam
                      </h4>
                      <p className="text-[11px] text-[#61748A] dark:text-slate-400 font-inter font-medium">
                        Serving 2,400 residents · 6 villages
                      </p>
                    </div>
                  </div>

                  {/* Live Badge Breathing Pulse Every 2s */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 text-xs font-inter font-medium backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                    </span>
                    <span className="font-mono text-[11px] font-semibold">Live GIS Sensor Stream</span>
                  </div>
                </motion.div>

                {/* 2. CENTER HERO CARD: "Cholera Outbreak Risk · Next 72h" */}
                <motion.div 
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.40, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-slate-50/90 dark:bg-[#132338]/90 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-800 mb-4 relative overflow-hidden shadow-inner z-10"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7.5 h-7.5 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs sm:text-sm font-inter font-bold text-[#0B2545] dark:text-white">
                          Cholera Outbreak Risk · Next 72h
                        </h5>
                        <p className="text-[10px] sm:text-[11px] text-[#61748A] dark:text-slate-400 font-inter font-normal">
                          Neural model connects water contaminants to health outcomes
                        </p>
                      </div>
                    </div>

                    {/* Smooth Counting Risk Score (0 -> 63) */}
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs sm:text-sm font-inter font-bold text-amber-500 dark:text-amber-400 tabular-nums">
                        Risk Score: 63/100
                      </span>
                      <div className="text-[10px] text-[#61748A] dark:text-slate-400 font-inter font-semibold">
                        Moderate Health Risk
                      </div>
                    </div>
                  </div>

                  {/* Soft Severity Gradient Progress Bar with 5s Shimmer Animation */}
                  <div className="w-full h-2.5 bg-slate-200/80 dark:bg-slate-800/90 rounded-full overflow-hidden relative mb-4">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-500 rounded-full relative"
                      initial={{ width: 0 }}
                      animate={{ width: '63%' }}
                      transition={{ delay: 0.65, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Shimmer tracer moving across every 5s */}
                      <motion.div
                        className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                        animate={{ left: ['-20%', '120%'] }}
                        transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                      />
                    </motion.div>
                  </div>

                  {/* Forecast Bars Growing Upward (Looping every 8s) */}
                  <div className="flex items-end justify-between gap-2 h-16 pt-2 border-t border-slate-200/60 dark:border-slate-800/80">
                    {[
                      { label: '00h', val: 25, color: 'bg-cyan-400' },
                      { label: '18h', val: 35, color: 'bg-cyan-400' },
                      { label: '36h', val: 50, color: 'bg-amber-400' },
                      { label: '54h', val: 65, color: 'bg-amber-500' },
                      { label: '72h', val: 82, color: 'bg-rose-500' },
                    ].map((bar, i) => (
                      <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-slate-200/80 dark:bg-slate-800/80 rounded-t-md h-12 flex items-end overflow-hidden">
                          <motion.div 
                            className={`w-full ${bar.color} rounded-t-md`}
                            initial={{ height: 0 }}
                            animate={{ height: ['0%', `${bar.val}%`, `${bar.val}%`] }}
                            transition={{ delay: 0.75 + i * 0.1, duration: 1.2, repeat: Infinity, repeatDelay: 6.8, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                        <span className="text-[9px] font-inter font-medium text-[#61748A] dark:text-slate-400">{bar.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* 3. HORIZONTAL 3-STEP "EARLY WARNING CHAIN" STRIP */}
                <div className="mb-4 relative z-10">
                  <div className="text-[10px] font-inter font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                    Early Warning Chain
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 relative">
                    {/* Animated Neural Flow Connection Line */}
                    <div className="hidden sm:block absolute top-1/2 left-6 right-6 h-[1.5px] bg-gradient-to-r from-cyan-500/40 via-amber-500/40 to-emerald-500/40 -translate-y-1/2 z-0" />

                    {/* Step 1 */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.52, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -2 }}
                      className="relative z-10 bg-white/90 dark:bg-[#132338]/95 p-3 rounded-xl border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between hover:border-cyan-400/50 transition-all shadow-sm cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-md bg-cyan-500/15 text-cyan-500 flex items-center justify-center">
                            <FlaskConical className="w-3 h-3" />
                          </div>
                          <span className="text-[11px] font-inter font-bold text-[#0B2545] dark:text-white">
                            Contaminant Detected
                          </span>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-[#00C2D1] shadow-[0_0_6px_rgba(0,194,209,0.8)]" />
                      </div>
                      <p className="text-[10px] text-[#61748A] dark:text-slate-400 font-inter font-normal leading-snug">
                        Turbidity spike + E. coli indicators, Sector 4
                      </p>
                    </motion.div>

                    {/* Step 2 */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.62, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -2 }}
                      className="relative z-10 bg-white/90 dark:bg-[#132338]/95 p-3 rounded-xl border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between hover:border-amber-400/50 transition-all shadow-sm cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-md bg-amber-500/15 text-amber-500 flex items-center justify-center">
                            <Brain className="w-3 h-3" />
                          </div>
                          <span className="text-[11px] font-inter font-bold text-[#0B2545] dark:text-white">
                            AI Correlation
                          </span>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
                      </div>
                      <p className="text-[10px] text-[#61748A] dark:text-slate-400 font-inter font-normal leading-snug">
                        Matches pre-outbreak pattern · 94% confidence
                      </p>
                    </motion.div>

                    {/* Step 3 */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.72, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -2 }}
                      className="relative z-10 bg-white/90 dark:bg-[#132338]/95 p-3 rounded-xl border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between hover:border-emerald-400/50 transition-all shadow-sm cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-md bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                            <Send className="w-3 h-3" />
                          </div>
                          <span className="text-[11px] font-inter font-bold text-[#0B2545] dark:text-white">
                            Alert Dispatched
                          </span>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                      </div>
                      <p className="text-[10px] text-[#61748A] dark:text-slate-400 font-inter font-normal leading-snug">
                        SMS sent to 3 ASHA workers · 340 households warned
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* 4. BOTTOM IMPACT STRIP: Highlighted Banner */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.82, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 via-cyan-500/5 to-transparent border-l-4 border-[#00C2D1] border-y border-r border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-xs font-inter relative z-10 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#00C2D1] flex-shrink-0" />
                    <span className="font-bold text-[#0B2545] dark:text-white text-[12px]">
                      72-hour early warning
                    </span>
                    <span className="text-slate-400 dark:text-slate-500 font-medium">vs. reactive detection</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#00C2D1] bg-[#00C2D1]/10 px-2 py-0.5 rounded-md border border-[#00C2D1]/20">
                    PROACTIVE AI
                  </span>
                </motion.div>

              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
