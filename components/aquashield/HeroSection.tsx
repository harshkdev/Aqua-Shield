"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ShieldCheck, Droplet, Radio, AlertTriangle, Activity, TrendingUp, Sparkles } from 'lucide-react';
import WaveBackground from './WaveBackground';
import { useTheme } from '@/components/providers/ThemeProvider';

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      id="home"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#F0F8FF] dark:bg-[#07162B] transition-colors duration-500 pt-28 pb-16"
    >
      {/* Cinematic Background Canvas with Ocean Light Caustics, Ambient Mesh, Grid & Particles */}
      <WaveBackground isDark={theme === 'dark'} />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 relative z-20 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-14">
          
          {/* ================= LEFT SIDE (48%) ================= */}
          <div className="w-full lg:w-[48%] flex flex-col items-start text-left space-y-7">
            
            {/* Shared Unified Status Chip */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 dark:border-cyan-400/30 bg-white/80 dark:bg-[#132338]/90 text-[#009FAB] dark:text-[#00C2D1] text-xs font-semibold backdrop-blur-md shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00C2D1]" />
              <span>AI-Powered Water Intelligence</span>
            </motion.div>

            {/* Headline — Matches Reference Photo Font (Outfit Weight 300 Light), Copy & Colors */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-[66px] font-outfit font-light text-[#0B2545] dark:text-white tracking-tight leading-[1.12] mb-1"
            >
              Predict Water Risks <br className="hidden sm:inline" />
              Before They Become <br className="hidden sm:inline" />
              <span className="text-[#009FAB] dark:text-[#00C2D1] font-light">Health Risks</span>
            </motion.h1>

            {/* Subheadline — Matches Reference Photo Font & Copy */}
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-[17px] sm:text-[18px] text-slate-600 dark:text-slate-300 font-sans leading-[1.65] max-w-[540px]"
            >
              Real-time sensor monitoring, environmental insights, and predictive analytics — combined into smart alerts that help communities make safer decisions about the water they depend on.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-1"
            >
              <button className="group relative h-13 px-7 rounded-xl bg-gradient-to-r from-[#0B4F8C] via-[#009FAB] to-[#00C2D1] text-white font-semibold text-sm flex items-center justify-center gap-2.5 transition-all duration-200 shadow-[0_0_25px_rgba(0,194,209,0.25)] hover:shadow-[0_0_35px_rgba(0,194,209,0.45)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#00C2D1]/40">
                <span className="relative z-10 font-sans">Explore Platform</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="h-13 px-7 rounded-xl bg-white dark:bg-[#132338]/90 hover:bg-slate-50 dark:hover:bg-[#1E314B] border border-slate-300 dark:border-slate-700/80 hover:border-slate-400 dark:hover:border-slate-500 text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center justify-center gap-2.5 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00C2D1]/40">
                <Play className="w-4 h-4 text-[#00C2D1] fill-[#00C2D1]" />
                <span className="font-sans">View Live Dashboard</span>
              </button>
            </motion.div>

            {/* Real-sounding Metrics Row (Left-aligned under CTA buttons) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap items-center gap-y-2 gap-x-8 pt-4 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-300 dark:border-slate-800/80 w-full font-sans"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-bold text-slate-900 dark:text-white font-mono tabular-nums">1,240</span>
                <span className="text-slate-500 dark:text-slate-400">sources monitored</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <span className="font-bold text-slate-900 dark:text-white font-mono tabular-nums">8.6M</span>
                <span className="text-slate-500 dark:text-slate-400">data points / day</span>
              </div>
            </motion.div>

          </div>

          {/* ================= RIGHT SIDE (52% Layered Overlapping Cards Composition) ================= */}
          <div className="w-full lg:w-[52%] relative mt-8 lg:mt-0">
            
            {/* Dashboard Ambient Radial Glow (Pulsing 95% - 100%) */}
            <motion.div 
              className="absolute inset-0 bg-[#00C2D1]/15 dark:bg-[#00C2D1]/20 rounded-full blur-[110px] pointer-events-none -z-10"
              animate={{ scale: [0.95, 1, 0.95], opacity: [0.6, 0.85, 0.6] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl mx-auto py-6 px-2"
            >

              {/* FLOATING CARD 1: Water Quality (Top-Left Overlapping) */}
              <motion.div 
                initial={{ opacity: 0, x: -20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -top-2 -left-2 sm:-top-5 sm:-left-5 z-30 bg-white/95 dark:bg-[#0F2035]/95 backdrop-blur-xl border border-slate-200 dark:border-emerald-500/40 rounded-2xl p-3.5 shadow-xl flex items-center gap-3 transition-transform hover:-translate-y-1 duration-250 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                  <Droplet className="w-5 h-5 fill-emerald-500/20" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400 tracking-wider">Water Quality</div>
                  <div className="text-sm font-outfit font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="font-mono tabular-nums text-emerald-500 dark:text-emerald-400">82</span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">Good</span>
                  </div>
                </div>
              </motion.div>

              {/* FLOATING CARD 2: Sensors (Top-Right Overlapping) */}
              <motion.div 
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute -top-2 -right-2 sm:-top-5 sm:-right-5 z-30 bg-white/95 dark:bg-[#0F2035]/95 backdrop-blur-xl border border-slate-200 dark:border-cyan-400/40 rounded-2xl p-3.5 shadow-xl flex items-center gap-3 transition-transform hover:-translate-y-1 duration-250 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
                  <Radio className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400 tracking-wider">Sensors</span>
                    <span className="text-[9px] font-bold text-emerald-500 dark:text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded-full border border-emerald-500/30">LIVE</span>
                  </div>
                  <div className="text-sm font-outfit font-semibold text-slate-900 dark:text-white font-mono tabular-nums">
                    6/7 <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-sans">Online</span>
                  </div>
                </div>
              </motion.div>

              {/* MAIN MONITOR PANEL IN THE BACK */}
              <motion.div 
                className="relative z-10 bg-white/95 dark:bg-[#0F2035]/95 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-2xl dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] p-5 sm:p-7 overflow-hidden"
              >
                {/* Station Top Header */}
                <div className="flex justify-between items-center pb-4 mb-5 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#00C2D1]/15 border border-[#00C2D1]/30 flex items-center justify-center text-[#00C2D1]">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#0B2545] dark:text-white font-outfit tracking-wide">Yamuna Basin Station #402</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-300 font-sans">Live GIS Sensor Telemetry Stream</p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-semibold backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span>Active Telemetry</span>
                  </div>
                </div>

                {/* CORE FEATURE: Disease Prediction · next 48h Widget */}
                <div className="bg-slate-50 dark:bg-[#132338]/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 mb-4 relative overflow-hidden shadow-inner">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-semibold text-[#0B2545] dark:text-white font-outfit">Disease Prediction · next 48h</h5>
                        <p className="text-[10px] text-slate-500 dark:text-slate-300 font-sans">Neural prediction model connects water contaminants to health risk outcome</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-amber-500 dark:text-amber-400 font-mono tabular-nums">Risk Score: 63/100</span>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Moderate Health Risk</div>
                    </div>
                  </div>

                  {/* Cyan-to-Red Risk Severity Gradient Bar */}
                  <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative mb-4">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-cyan-400 via-amber-400 to-red-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '63%' }}
                      transition={{ delay: 0.8, duration: 1.2 }}
                    />
                  </div>

                  {/* Upward Trending Disease Risk Bar Chart */}
                  <div className="flex items-end justify-between gap-2 h-16 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                    {[
                      { label: '00h', val: 25, color: 'bg-cyan-400' },
                      { label: '12h', val: 35, color: 'bg-cyan-400' },
                      { label: '24h', val: 50, color: 'bg-amber-400' },
                      { label: '36h', val: 65, color: 'bg-amber-500' },
                      { label: '48h', val: 82, color: 'bg-red-500' },
                    ].map((bar, i) => (
                      <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-t-md h-12 flex items-end overflow-hidden">
                          <motion.div 
                            className={`w-full ${bar.color} rounded-t-md`}
                            initial={{ height: 0 }}
                            animate={isMounted ? { height: `${bar.val}%` } : {}}
                            transition={{ delay: 0.9 + i * 0.1, duration: 0.8 }}
                          />
                        </div>
                        <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400">{bar.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Telemetry Summary Bar */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans block">pH Level</span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">7.2</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-[#1E2510] p-2.5 rounded-xl border border-slate-200 dark:border-amber-500/20">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans block">Turbidity</span>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono tabular-nums">8.4 NTU</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-[#281313] p-2.5 rounded-xl border border-slate-200 dark:border-red-500/20">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans block">Dissolved O₂</span>
                    <span className="text-xs font-bold text-red-600 dark:text-red-400 font-mono tabular-nums">4.8 mg/L</span>
                  </div>
                </div>

              </motion.div>

              {/* FLOATING CARD 3: Active Alerts (Bottom-Right Overlapping) */}
              <motion.div 
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-2 -right-2 sm:-bottom-5 sm:-right-5 z-30 bg-white/95 dark:bg-[#0F2035]/95 backdrop-blur-xl border border-slate-200 dark:border-red-500/40 rounded-2xl p-3.5 shadow-xl flex items-center gap-3 transition-transform hover:-translate-y-1 duration-250 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-500">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400 tracking-wider">Active Alerts</div>
                  <div className="text-sm font-outfit font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="font-mono tabular-nums text-red-500 dark:text-red-400">03</span>
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30">2 warnings</span>
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
