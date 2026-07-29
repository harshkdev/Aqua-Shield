"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Activity, Map, Bell, BarChart3, Users, Droplets } from 'lucide-react';

const PlatformOverview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const slideLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };
  
  const slideRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section id="platform" className="py-28 bg-[#F4F9FD] dark:bg-[#07162B] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00C2D1]/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0B4F8C]/15 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/25 dark:border-cyan-400/25 bg-white/90 dark:bg-[#0F2035]/90 text-[#0B4F8C] dark:text-[#00C2D1] text-xs font-inter font-medium backdrop-blur-md shadow-sm mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C2D1] animate-pulse" />
            <span>Platform Overview</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-outfit font-light text-[#05223D] dark:text-white mb-6 tracking-tight leading-[1.18]">
            Everything You Need for <span className="text-[#009FAB] dark:text-[#00C2D1] font-light">Water Intelligence</span>
          </h2>
          <p className="text-[17px] sm:text-[18px] text-slate-600 dark:text-slate-300 font-outfit font-light leading-[1.65]">
            A unified ecosystem combining real-time IoT sensors, advanced AI predictions, and actionable analytics to protect water resources.
          </p>
        </motion.div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(240px,auto)]"
        >
          {/* Row 1: AI Prediction (span 2) */}
          <motion.div variants={fadeUp} className="md:col-span-2 row-span-2 group relative rounded-3xl bg-white/90 dark:bg-[#0F2035]/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 p-8 overflow-hidden hover:-translate-y-1.5 transition-all duration-300 hover:border-cyan-400/40 shadow-sm hover:shadow-xl">
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4F8C] to-[#00C2D1] flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300 shadow-md">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-outfit font-semibold text-2xl text-[#05223D] dark:text-white mb-3">AI Prediction Engine</h3>
              <p className="text-slate-600 dark:text-slate-300 font-inter text-sm max-w-md leading-relaxed">
                Proprietary neural networks analyze historical and real-time data to forecast contamination events up to 72 hours before they occur, allowing proactive mitigation.
              </p>
              
              <div className="mt-8 flex-1 relative min-h-[120px] rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] overflow-hidden flex items-center justify-center border border-slate-200 dark:border-white/10">
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 80 Q 150 20 250 80 T 450 80" fill="transparent" stroke="#00C2D1" strokeWidth="2" strokeDasharray="5 5" />
                  <circle cx="50" cy="80" r="4" fill="#0B4F8C" className="animate-pulse" />
                  <circle cx="250" cy="80" r="6" fill="#00C2D1" className="animate-pulse" />
                  <circle cx="450" cy="80" r="4" fill="#0B4F8C" className="animate-pulse" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Row 1: Real-time Monitoring (span 1) */}
          <motion.div variants={fadeUp} className="md:col-span-1 row-span-1 group relative rounded-3xl bg-white/90 dark:bg-[#0F2035]/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 p-8 overflow-hidden hover:-translate-y-1.5 transition-all duration-300 hover:border-cyan-400/40 shadow-sm hover:shadow-xl">
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4F8C] to-[#00C2D1] flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300 shadow-md">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-outfit font-semibold text-xl text-[#05223D] dark:text-white mb-3">Real-time Monitoring</h3>
              <p className="text-slate-600 dark:text-slate-300 font-inter text-sm leading-relaxed">
                Continuous ingestion of telemetry from multi-parameter IoT probes.
              </p>
              
              <div className="mt-auto pt-6 flex items-end justify-between">
                <div>
                  <div className="text-3xl font-outfit font-bold text-[#05223D] dark:text-white">7.2</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">pH Level</div>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-2.5 py-1 rounded-full text-xs font-semibold border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </div>
              </div>
            </div>
          </motion.div>

          {/* Row 2: GIS Mapping (span 1) */}
          <motion.div variants={slideLeft} className="md:col-span-1 row-span-1 group relative rounded-3xl bg-white/90 dark:bg-[#0F2035]/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 p-8 overflow-hidden hover:-translate-y-1.5 transition-all duration-300 hover:border-cyan-400/40 shadow-sm hover:shadow-xl">
             <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4F8C] to-[#00C2D1] flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300 shadow-md">
                <Map className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-outfit font-semibold text-xl text-[#05223D] dark:text-white mb-2">GIS Mapping</h3>
              <p className="text-slate-600 dark:text-slate-300 font-inter text-sm flex-1 leading-relaxed">Spatial analysis with topographic overlays.</p>
              
              <div className="w-full h-20 mt-4 rounded-xl overflow-hidden relative border border-slate-200 dark:border-white/10">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00C2D1]/20 via-transparent to-[#0B4F8C]/30" />
                <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-[#00C2D1] rounded-full border-2 border-white shadow-lg animate-bounce" />
                <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-amber-400 rounded-full border-2 border-white shadow-lg animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Row 2: Smart Alerts (span 1) */}
          <motion.div variants={slideRight} className="md:col-span-1 row-span-1 group relative rounded-3xl bg-white/90 dark:bg-[#0F2035]/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 p-8 overflow-hidden hover:-translate-y-1.5 transition-all duration-300 hover:border-cyan-400/40 shadow-sm hover:shadow-xl">
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4F8C] to-[#00C2D1] flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300 shadow-md">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-outfit font-semibold text-xl text-[#05223D] dark:text-white mb-2">Smart Alerts</h3>
              <p className="text-slate-600 dark:text-slate-300 font-inter text-sm mb-4 leading-relaxed">Multi-channel notifications when thresholds are breached.</p>
              
              <div className="mt-auto relative h-14 w-full flex justify-center">
                <div className="absolute bottom-0 w-full h-12 bg-amber-500/15 rounded-lg border border-amber-500/30 flex items-center px-4 gap-3 z-10">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <div className="text-xs text-amber-700 dark:text-amber-300 font-semibold">Anomaly Triggered</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Row 2: Analytics (span 1) */}
          <motion.div variants={slideRight} className="md:col-span-1 row-span-1 group relative rounded-3xl bg-white/90 dark:bg-[#0F2035]/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 p-8 overflow-hidden hover:-translate-y-1.5 transition-all duration-300 hover:border-cyan-400/40 shadow-sm hover:shadow-xl">
             <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4F8C] to-[#00C2D1] flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300 shadow-md">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-outfit font-semibold text-xl text-[#05223D] dark:text-white mb-2">Analytics</h3>
              <p className="text-slate-600 dark:text-slate-300 font-inter text-sm mb-4 leading-relaxed">Deep insights and automated reporting.</p>
              
              <div className="mt-auto flex items-end gap-2 h-16 w-full px-2">
                {[40, 70, 45, 90, 60, 80].map((height, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-[#0B4F8C] to-[#00C2D1] rounded-t-sm opacity-80 group-hover:opacity-100 transition-all duration-300" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Row 3: Community (span 1) */}
          <motion.div variants={scaleIn} className="md:col-span-1 row-span-1 group relative rounded-3xl bg-white/90 dark:bg-[#0F2035]/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 p-8 overflow-hidden hover:-translate-y-1.5 transition-all duration-300 hover:border-cyan-400/40 shadow-sm hover:shadow-xl">
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4F8C] to-[#00C2D1] flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300 shadow-md">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-outfit font-semibold text-xl text-[#05223D] dark:text-white mb-2">Community Reporting</h3>
              <p className="text-slate-600 dark:text-slate-300 font-inter text-sm mb-6 leading-relaxed">Crowdsourced observations to validate sensor data.</p>
              
              <div className="mt-auto flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0F2035] bg-slate-700 flex items-center justify-center text-xs font-medium overflow-hidden z-10 relative">
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="Avatar" className="w-full h-full" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Row 3: Visual Showcase (span 2) */}
          <motion.div variants={scaleIn} className="md:col-span-2 row-span-1 group relative rounded-3xl bg-gradient-to-br from-[#0B4F8C]/80 to-[#0A1628] backdrop-blur-xl border border-white/10 p-8 overflow-hidden hover:-translate-y-1.5 transition-all duration-300 hover:shadow-xl hover:shadow-[#00C2D1]/15 flex flex-col md:flex-row items-center gap-8">
            <div className="relative z-10 flex-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-4 group-hover:rotate-6 transition-transform duration-300">
                <Droplets className="w-6 h-6 text-[#00C2D1]" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">Unified Command Dashboard</h3>
              <p className="text-blue-100/80 mb-6 text-sm leading-relaxed">
                Bring all your water quality data into a single, intuitive interface. Track KPIs, manage sensors, and generate compliance reports with one click.
              </p>
              <button className="px-5 py-2.5 rounded-xl bg-[#00C2D1] text-[#07162B] font-bold text-sm hover:bg-[#33E8F5] transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/20">
                Explore Dashboard
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
            
            <div className="flex-1 w-full relative h-48 rounded-xl bg-[#0F2035]/90 border border-white/10 shadow-inner overflow-hidden p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="h-16 rounded-lg bg-white/5 border border-white/5 p-3 flex flex-col justify-between">
                  <div className="w-1/2 h-2 bg-white/20 rounded" />
                  <div className="w-3/4 h-4 bg-[#00C2D1]/80 rounded" />
                </div>
                <div className="h-16 rounded-lg bg-white/5 border border-white/5 p-3 flex flex-col justify-between">
                  <div className="w-1/2 h-2 bg-white/20 rounded" />
                  <div className="w-1/2 h-4 bg-emerald-400/80 rounded" />
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default PlatformOverview;
