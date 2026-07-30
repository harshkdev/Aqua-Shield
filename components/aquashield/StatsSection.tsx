"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Droplets, Database, Brain, MapPin } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

const stats = [
  {
    value: 500,
    suffix: "+",
    label: "Water Sources Monitored",
    icon: Droplets,
  },
  {
    value: 10,
    suffix: "M+",
    label: "Sensor Data Points Processed",
    icon: Database,
  },
  {
    value: 50,
    suffix: "K+",
    label: "Predictions Generated",
    icon: Brain,
  },
  {
    value: 120,
    suffix: "+",
    label: "Active Monitoring Locations",
    icon: MapPin,
  },
];

export default function StatsSection() {
  const { theme } = useTheme();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 relative overflow-hidden bg-transparent transition-colors duration-500">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: "easeOut" }}
              className="relative bg-white/90 dark:bg-[#0F2035]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 text-center group overflow-hidden hover:border-cyan-500/40 dark:hover:border-cyan-400/40 hover:-translate-y-1 transition-all duration-300 shadow-lg"
            >
              <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4F8C] to-[#00C2D1] flex items-center justify-center mb-4 border border-cyan-400/20 shadow-md">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white mb-2 tracking-tight flex items-center justify-center">
                {inView ? (
                  <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>
              
              <div className="text-sm font-semibold text-slate-600 dark:text-slate-300 font-sans">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
