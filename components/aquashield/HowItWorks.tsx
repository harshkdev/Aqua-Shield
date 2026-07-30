"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Waves, Cpu, Cloud, Brain, ShieldAlert, LayoutGrid } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

const pipelineSteps = [
  { id: "01", title: "Water Sources", icon: Waves },
  { id: "02", title: "Smart Sensors", icon: Cpu },
  { id: "03", title: "Cloud Platform", icon: Cloud },
  { id: "04", title: "AI Analysis", icon: Brain },
  { id: "05", title: "Risk Prediction", icon: ShieldAlert },
  { id: "06", title: "Dashboard & Alerts", icon: LayoutGrid },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Active step loop for data stream pulse
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="how-it-works" 
      className="py-28 sm:py-36 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500 bg-transparent"
    >
      <div className="max-w-[1300px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/25 dark:border-cyan-400/25 bg-white/80 dark:bg-[#0F2035]/80 text-[#0B4F8C] dark:text-[#00C2D1] text-xs font-inter font-medium backdrop-blur-xl shadow-sm mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#00C2D1] animate-pulse" />
            <span>End-to-End Pipeline</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-[54px] font-outfit font-light text-[#05223D] dark:text-white mb-4 tracking-tight leading-[1.18]"
          >
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2D1] to-[#009FAB] font-light">AquaShield AI</span> Works
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-[17px] sm:text-[18px] text-slate-600 dark:text-slate-300 font-outfit font-light max-w-2xl mx-auto leading-[1.65]"
          >
            From raw water telemetry to predictive health advisories in 6 connected pipeline stages.
          </motion.p>
        </div>

        {/* 6-Node Horizontal Pipeline */}
        <div ref={containerRef} className="relative py-6">
          
          {/* Continuous Flowing Water Data Line (Desktop) */}
          <div className="hidden lg:block absolute top-[38%] left-[6%] right-[6%] h-[2.5px] bg-gradient-to-r from-cyan-400/20 via-cyan-500/40 to-cyan-400/20 rounded-full z-0 overflow-hidden shadow-[0_0_10px_rgba(0,194,209,0.3)]">
            
            {/* Flowing Water Gradient Stream */}
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-[#00C2D1] via-[#33E8F5] to-transparent w-40 shadow-[0_0_16px_#00C2D1]"
              animate={{ left: `${(activeStep / 5) * 80}%` }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Traveling Light Particle */}
            <motion.div
              className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white to-transparent"
              animate={{ left: ['-10%', '110%'] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* 6 Pipeline Nodes Grid */}
          <div 
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4 relative z-10"
          >
            {pipelineSteps.map((step, idx) => {
              const IconComponent = step.icon;
              const isActive = activeStep === idx;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 24, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.9 }}
                  transition={{ delay: idx * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  {/* Card Container with 3D Tilt, Lift by 8px, Scale 1.03 & Active Breathing Glow */}
                  <motion.div 
                    animate={isActive ? { y: [0, -4, 0] } : { y: 0 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl flex items-center justify-center transition-all duration-350 ease-out transform-gpu group-hover:-translate-y-2 group-hover:scale-[1.03] group-hover:rotate-2 ${
                      isActive 
                        ? 'bg-white/95 dark:bg-[#0F2035]/95 shadow-[0_15px_35px_rgba(0,194,209,0.35)] border-2 border-[#00C2D1] backdrop-blur-[20px]' 
                        : 'bg-white/78 dark:bg-[#0F2035]/85 backdrop-blur-[20px] shadow-[0_10px_25px_rgba(0,120,180,0.08)] dark:shadow-none border border-white/60 dark:border-slate-800 group-hover:shadow-[0_20px_40px_rgba(0,194,209,0.2)] group-hover:border-[#00C2D1]'
                    }`}
                  >
                    {/* Active Step Shimmer Tracer */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none"
                        animate={{ left: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                    
                    {/* Top-Right Badge (01, 02, 03, 04, 05, 06) */}
                    <div className={`absolute -top-2 -right-2 w-6.5 h-6.5 rounded-full text-[10px] font-mono font-bold flex items-center justify-center shadow-md border-2 transition-transform duration-300 group-hover:scale-110 ${
                      isActive 
                        ? 'bg-[#00C2D1] text-[#05223D] border-white dark:border-[#07162B] shadow-[0_0_10px_rgba(0,194,209,0.6)]' 
                        : 'bg-[#05223D] dark:bg-[#00C2D1] text-white dark:text-[#05223D] border-white dark:border-[#07162B]'
                    }`}>
                      {step.id}
                    </div>

                    {/* Centered Icon (Scales from 1 to 1.15 on Hover) */}
                    <IconComponent className={`w-8 h-8 transition-all duration-300 group-hover:scale-115 ${
                      isActive 
                        ? 'text-[#00C2D1] drop-shadow-[0_0_8px_rgba(0,194,209,0.6)]' 
                        : 'text-[#0B4F8C] dark:text-[#00C2D1] group-hover:text-[#00C2D1]'
                    }`} strokeWidth={1.8} />
                  </motion.div>

                  {/* Node Label Below */}
                  <span className={`text-sm font-semibold font-outfit mt-4 text-center tracking-tight transition-colors duration-300 group-hover:text-[#00C2D1] ${
                    isActive 
                      ? 'text-[#00C2D1] dark:text-[#00C2D1] font-bold drop-shadow-[0_0_8px_rgba(0,194,209,0.4)]' 
                      : 'text-[#05223D] dark:text-slate-200'
                  }`}>
                    {step.title}
                  </span>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>

    </section>
  );
}
