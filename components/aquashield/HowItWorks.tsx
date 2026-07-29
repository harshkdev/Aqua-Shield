"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Droplets, Radio, Cloud, Brain, AlertTriangle, LayoutDashboard } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Water Sources",
    description: "Rivers, lakes, groundwater, and reservoirs",
    icon: Droplets,
  },
  {
    id: 2,
    title: "Smart Sensors",
    description: "IoT sensors measuring quality parameters",
    icon: Radio,
  },
  {
    id: 3,
    title: "Cloud Platform",
    description: "Secure data ingestion and processing",
    icon: Cloud,
  },
  {
    id: 4,
    title: "AI Analysis",
    description: "Machine learning models analyze patterns",
    icon: Brain,
  },
  {
    id: 5,
    title: "Risk Prediction",
    description: "Contamination risk scores generated",
    icon: AlertTriangle,
  },
  {
    id: 6,
    title: "Dashboard & Alerts",
    description: "Real-time alerts and visualization",
    icon: LayoutDashboard,
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <section id="how-it-works" className="py-28 bg-[#F0F8FF] dark:bg-[#07162B] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/25 dark:border-cyan-400/25 bg-white/80 dark:bg-white/[0.05] text-[#00A8B5] dark:text-[#00C2D1] text-xs font-semibold uppercase tracking-wider mb-5 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C2D1] animate-pulse" />
            End-to-End Pipeline
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight"
          >
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B4F8C] via-[#00A8B5] to-emerald-500">AquaShield AI</span> Works
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed"
          >
            From raw water telemetry to instant municipal advisories in 6 streamlined steps.
          </motion.p>
        </div>

        {/* 6 Connected Steps Grid */}
        <div ref={containerRef} className="max-w-6xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative"
          >
            {steps.map((step) => (
              <motion.div
                key={step.id}
                variants={stepVariants}
                className="relative bg-white/90 dark:bg-[#0F2035]/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 dark:border-white/10 flex flex-col justify-between group hover:border-cyan-500/50 dark:hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:-translate-y-1.5"
              >
                {/* Step Number Badge */}
                <div className="flex justify-between items-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:bg-[#00C2D1]/10 transition-colors">
                    <step.icon className="w-6 h-6 text-[#00C2D1]" />
                  </div>
                  <span className="font-display font-bold text-2xl text-slate-400 dark:text-white/20 group-hover:text-[#00C2D1] transition-colors">
                    0{step.id}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Progress bar accent */}
                <div className="w-full h-1 bg-slate-200 dark:bg-white/5 rounded-full mt-6 overflow-hidden">
                  <div className="w-0 group-hover:w-full h-full bg-gradient-to-r from-[#0B4F8C] to-[#00C2D1] transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
