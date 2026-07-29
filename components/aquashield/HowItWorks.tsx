"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Waves, Cpu, Cloud, Brain, ShieldAlert, LayoutGrid } from "lucide-react";

const pipelineSteps = [
  {
    id: "01",
    title: "Water Sources",
    icon: Waves,
  },
  {
    id: "02",
    title: "Smart Sensors",
    icon: Cpu,
  },
  {
    id: "03",
    title: "Cloud Platform",
    icon: Cloud,
  },
  {
    id: "04",
    title: "AI Analysis",
    icon: Brain,
  },
  {
    id: "05",
    title: "Risk Prediction",
    icon: ShieldAlert,
  },
  {
    id: "06",
    title: "Dashboard & Alerts",
    icon: LayoutGrid,
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  
  // Pipeline Data Pulse animation step index
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-[#F4F9FD] dark:bg-[#07162B] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
      <div className="max-w-[1300px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        
        {/* Original Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/25 dark:border-cyan-400/25 bg-white/90 dark:bg-[#0F2035]/90 text-[#0B4F8C] dark:text-[#00C2D1] text-xs font-inter font-medium backdrop-blur-md shadow-sm mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#00C2D1] animate-pulse" />
            <span>End-to-End Pipeline</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[54px] font-outfit font-light text-[#05223D] dark:text-white mb-4 tracking-tight leading-[1.18]"
          >
            How <span className="text-[#009FAB] dark:text-[#00C2D1] font-light">AquaShield AI</span> Works
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[17px] sm:text-[18px] text-slate-600 dark:text-slate-300 font-outfit font-light max-w-2xl mx-auto leading-[1.65]"
          >
            From raw water telemetry to predictive health advisories in 6 connected pipeline stages.
          </motion.p>
        </div>

        {/* 6-Node Horizontal Pipeline */}
        <div ref={containerRef} className="relative py-6">
          
          {/* Continuous Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[38%] left-[6%] right-[6%] h-[2px] bg-cyan-200/80 dark:bg-cyan-900/40 z-0">
            {/* Animated Telemetry Pulse Dot traveling along pipeline */}
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-[#00C2D1] to-transparent w-28 shadow-[0_0_14px_#00C2D1]"
              animate={{ left: `${(activeStep / 5) * 80}%` }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
          </div>

          {/* 6 Pipeline Nodes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4 relative z-10">
            {pipelineSteps.map((step, idx) => {
              const IconComponent = step.icon;
              const isActive = activeStep === idx;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  {/* Cubic White Node Card with Top-Right Circle Badge */}
                  <div className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-white dark:bg-[#0F2035] shadow-[0_12px_30px_rgba(0,194,209,0.25)] border-2 border-[#00C2D1] scale-105' 
                      : 'bg-white dark:bg-[#0F2035]/90 shadow-[0_10px_25px_rgba(0,120,180,0.06)] dark:shadow-none border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:border-cyan-300 dark:hover:border-cyan-700 hover:-translate-y-1'
                  }`}>
                    
                    {/* Top-Right Badge (01, 02, 03, 04, 05, 06) */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#05223D] dark:bg-[#00C2D1] text-white dark:text-[#05223D] text-[10px] font-mono font-bold flex items-center justify-center shadow-md border-2 border-white dark:border-[#07162B]">
                      {step.id}
                    </div>

                    {/* Centered Outline Icon */}
                    <IconComponent className={`w-8 h-8 transition-colors duration-300 ${
                      isActive ? 'text-[#00C2D1]' : 'text-[#0B4F8C] dark:text-[#00C2D1]'
                    }`} strokeWidth={1.8} />
                  </div>

                  {/* Node Label Below */}
                  <span className="text-sm font-semibold font-outfit text-[#05223D] dark:text-slate-200 mt-4 text-center tracking-tight group-hover:text-[#00C2D1] transition-colors">
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
