"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Droplets, Brain, Target, Zap } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

const useTypingEffect = (text: string, startTyping: boolean, speed = 35) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    if (!startTyping) {
      setDisplayedText("");
      return;
    }
    
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(intervalId);
      }
    }, speed);
    
    return () => clearInterval(intervalId);
  }, [text, startTyping, speed]);
  
  return displayedText;
};

function CountUp({ end, duration = 2, decimals = 0, suffix = "", prefix = "" }: { end: number, duration?: number, decimals?: number, suffix?: string, prefix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, end, {
        duration,
        onUpdate: (v) => setValue(v)
      });
      return () => controls.stop();
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{prefix}{value.toFixed(decimals)}{suffix}</span>;
}

export default function AIInsights() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();

  const aiText = `Water Quality Analysis\n━━━━━━━━━━━━━━━━━━━━\n\nStatus: Stable ✓\n\nRainfall Forecast: ↑ 32%\n\nContamination Risk: Medium ⚠\n\nPrediction:\nContamination probability will increase\nwithin the next 48 hours.\n\nConfidence: 94%`;
  
  const typedText = useTypingEffect(aiText, isInView);

  const insightCards = [
    { id: 1, title: 'Water Sources', value: 523, suffix: '', icon: Droplets, subtitle: 'Active Monitoring', color: 'text-emerald-500 dark:text-emerald-400', glow: 'group-hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]' },
    { id: 2, title: 'Predictions', value: 12847, suffix: '', icon: Brain, subtitle: 'Generated This Month', color: 'text-[#00C2D1]', glow: 'group-hover:shadow-[0_0_25px_rgba(0,194,209,0.25)]' },
    { id: 3, title: 'Accuracy', value: 94.7, decimals: 1, suffix: '%', icon: Target, subtitle: 'Model Precision', color: 'text-emerald-500 dark:text-emerald-400', glow: 'group-hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]' },
    { id: 4, title: 'Alert Speed', value: 1.8, decimals: 1, suffix: 'm', icon: Zap, subtitle: 'Avg Response Time', color: 'text-amber-500 dark:text-amber-400', glow: 'group-hover:shadow-[0_0_25px_rgba(245,158,11,0.25)]' },
  ];

  return (
    <section id="insights" className="py-28 relative overflow-hidden bg-transparent transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/25 dark:border-cyan-400/25 bg-white/80 dark:bg-white/[0.05] text-[#00A8B5] dark:text-[#00C2D1] text-xs font-semibold uppercase tracking-wider mb-5 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C2D1] animate-pulse" />
            AI Analysis
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[54px] font-outfit font-light text-[#0B2545] dark:text-white mb-6 tracking-tight leading-[1.18]"
          >
            Intelligent Insights, <span className="text-[#009FAB] dark:text-[#00C2D1] font-light">Automated</span>
          </motion.h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          
          {/* Simulated Terminal Widget (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 bg-slate-900 dark:bg-[#06172B] rounded-2xl border border-slate-700/80 shadow-2xl p-6 relative overflow-hidden font-mono text-xs text-cyan-400 border-l-4 border-l-[#00C2D1]"
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-slate-400 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-semibold tracking-wider text-slate-300">AQUASHIELD_AI_CORE_V4</span>
            </div>

            <pre className="whitespace-pre-wrap font-mono leading-relaxed text-slate-200 min-h-[220px]">
              {typedText}
              <span className="animate-pulse text-[#00C2D1]">▌</span>
            </pre>
          </motion.div>

          {/* 2x2 Metric Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {insightCards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className={`group p-6 rounded-2xl bg-white dark:bg-[#0F2035]/90 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-[#00C2D1]/40 ${card.glow} cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-outfit uppercase tracking-wider">{card.title}</span>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-700 dark:text-slate-200 group-hover:scale-110 transition-transform">
                    <card.icon className="w-5 h-5 text-[#00C2D1]" />
                  </div>
                </div>

                <div className={`text-3xl font-outfit font-semibold ${card.color} tracking-tight mb-1 tabular-nums`}>
                  <CountUp end={card.value} decimals={card.decimals || 0} suffix={card.suffix} />
                </div>

                <span className="text-xs text-slate-500 dark:text-slate-400 font-sans">{card.subtitle}</span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
