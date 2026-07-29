"use client";

import { motion } from "framer-motion";
import { Brain, Wifi, TrendingUp, MapPin, Cloud, Zap } from "lucide-react";

const technologies = [
  {
    title: "Artificial Intelligence",
    description: "Deep learning models trained on millions of water quality data points",
    icon: Brain,
  },
  {
    title: "Internet of Things",
    description: "Connected sensor networks with real-time data transmission",
    icon: Wifi,
  },
  {
    title: "Predictive Analytics",
    description: "Statistical models forecasting contamination risks",
    icon: TrendingUp,
  },
  {
    title: "GIS Mapping",
    description: "Geographic information systems for spatial analysis",
    icon: MapPin,
  },
  {
    title: "Cloud Infrastructure",
    description: "Scalable cloud architecture for reliable data processing",
    icon: Cloud,
  },
  {
    title: "Real-time Processing",
    description: "Stream processing for instant data analysis",
    icon: Zap,
  },
];

export default function TechnologySection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <section id="technology" className="py-28 bg-[#F0F8FF] dark:bg-[#07162B] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00C2D1]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/25 dark:border-cyan-400/25 bg-white/80 dark:bg-white/[0.05] text-[#00A8B5] dark:text-[#00C2D1] text-xs font-semibold uppercase tracking-wider mb-5 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C2D1] animate-pulse" />
            Cutting-Edge Tech
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[54px] font-outfit font-light text-[#0B2545] dark:text-white mb-6 tracking-tight leading-[1.18]"
          >
            Powered by Next-Gen <span className="text-[#009FAB] dark:text-[#00C2D1] font-light">Technology</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[17px] sm:text-[18px] text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-sans leading-[1.7]"
          >
            Our architecture combines sensor networks, spatial GIS modeling, and predictive neural networks for end-to-end water safety.
          </motion.p>
        </div>

        {/* 3x2 Grid with glowing border cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.title}
              variants={cardVariants}
              className="group relative p-8 rounded-2xl bg-white dark:bg-[#0F2035]/90 border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:border-[#00C2D1]/40 shadow-lg hover:shadow-2xl hover:-translate-y-1 cursor-pointer overflow-hidden backdrop-blur-xl"
            >
              {/* Card top subtle line animation */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00C2D1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#00A8B5] dark:text-[#00C2D1] mb-6 group-hover:scale-110 group-hover:bg-[#00C2D1]/10 transition-all duration-300">
                <tech.icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-medium font-outfit text-slate-900 dark:text-white mb-3 group-hover:text-[#00A8B5] dark:group-hover:text-[#00C2D1] transition-colors">
                {tech.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
