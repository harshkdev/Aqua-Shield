"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CheckCircle, Radio, AlertCircle, ShieldAlert, Cpu, Sparkles, MapPin, Clock, CloudRain, Activity, Thermometer, Droplets, Check, CheckCircle2, Biohazard, ArrowUpRight, TrendingUp } from 'lucide-react';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div className="h-[380px] w-full rounded-2xl bg-slate-100 dark:bg-[#0F2035]/90 animate-pulse border border-slate-200 dark:border-slate-700/80" />
});

// 7-Day Trend Analytics Data for 5 Selectable Metrics
const trendDataMap = {
  pH: [
    { day: 'Mon', val: 7.4 }, { day: 'Tue', val: 7.3 }, { day: 'Wed', val: 7.2 },
    { day: 'Thu', val: 7.1 }, { day: 'Fri', val: 7.2 }, { day: 'Sat', val: 7.3 }, { day: 'Sun', val: 7.2 }
  ],
  Turbidity: [
    { day: 'Mon', val: 3.2 }, { day: 'Tue', val: 3.8 }, { day: 'Wed', val: 4.5 },
    { day: 'Thu', val: 8.4 }, { day: 'Fri', val: 8.9 }, { day: 'Sat', val: 7.8 }, { day: 'Sun', val: 6.5 }
  ],
  Temp: [
    { day: 'Mon', val: 23.5 }, { day: 'Tue', val: 23.8 }, { day: 'Wed', val: 24.0 },
    { day: 'Thu', val: 24.5 }, { day: 'Fri', val: 24.8 }, { day: 'Sat', val: 24.3 }, { day: 'Sun', val: 24.1 }
  ],
  WQI: [
    { day: 'Mon', val: 88 }, { day: 'Tue', val: 85 }, { day: 'Wed', val: 80 },
    { day: 'Thu', val: 74 }, { day: 'Fri', val: 72 }, { day: 'Sat', val: 76 }, { day: 'Sun', val: 82 }
  ],
  Risk: [
    { day: 'Mon', val: 15 }, { day: 'Tue', val: 20 }, { day: 'Wed', val: 28 },
    { day: 'Thu', val: 63 }, { day: 'Fri', val: 68 }, { day: 'Sat', val: 58 }, { day: 'Sun', val: 48 }
  ]
};

// AI Disease Outbreak Predictions — Professional Enterprise Schema (No Emojis)
const diseasePredictions = [
  { 
    id: 'add',
    name: 'Acute Diarrheal Disease', 
    icon: Biohazard, 
    prob: 76, 
    trend: '↑ 12%',
    risk: 'HIGH RISK', 
    highlight: true, 
    confidence: '96%',
    color: 'from-red-500 to-rose-600', 
    badgeClass: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30' 
  },
  { 
    id: 'tf',
    name: 'Typhoid Fever', 
    icon: Activity, 
    prob: 42, 
    trend: '↑ 5%',
    risk: 'MODERATE', 
    highlight: false, 
    confidence: '94%',
    color: 'from-amber-400 to-amber-500', 
    badgeClass: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30' 
  },
  { 
    id: 'bd',
    name: 'Bacillary Dysentery', 
    icon: ShieldAlert, 
    prob: 31, 
    trend: '↓ 2%',
    risk: 'MODERATE', 
    highlight: false, 
    confidence: '92%',
    color: 'from-amber-400 to-amber-500', 
    badgeClass: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30' 
  },
  { 
    id: 'ch',
    name: 'Cholera Outbreak Risk', 
    icon: Droplets, 
    prob: 18, 
    trend: '↓ 4%',
    risk: 'LOW RISK', 
    highlight: false, 
    confidence: '97%',
    color: 'from-emerald-400 to-cyan-500', 
    badgeClass: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' 
  },
  { 
    id: 'ha',
    name: 'Hepatitis A Infection', 
    icon: AlertTriangle, 
    prob: 12, 
    trend: '→ 0%',
    risk: 'LOW RISK', 
    highlight: false, 
    confidence: '95%',
    color: 'from-emerald-400 to-cyan-500', 
    badgeClass: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' 
  },
];

const explainabilityFactors = [
  'Turbidity increased sharply (+24% in 4 hours)',
  'Heavy rainfall forecast (12 mm / 24h catchment)',
  'Dissolved Oxygen decreased below safe limit (4.8 mg/L)',
  'Community health complaints received from Sector 4',
  'Historical Yamuna Basin outbreak pattern matched (96% fit)',
];

const recommendedActions = [
  'Inspect downstream water intake pipeline at Sector B',
  'Collect additional automated water samples for lab bio-assay',
  'Notify Municipal Water Authority advisory communication channel',
  'Increase sensor telemetry polling frequency to 15-minute intervals',
];

const groupedLiveParameters = [
  { label: 'pH Level', value: '7.2', status: 'Safe', level: 'green', updated: '18s ago' },
  { label: 'Temperature', value: '24.8°C', status: 'Safe', level: 'green', updated: '18s ago' },
  { label: 'Turbidity', value: '8.4 NTU', status: 'Moderate', level: 'amber', updated: '18s ago' },
  { label: 'TDS (Solids)', value: '310 ppm', status: 'Safe', level: 'green', updated: '18s ago' },
  { label: 'Dissolved Oxygen', value: '4.8 mg/L', status: 'High Risk', level: 'red', updated: '18s ago' },
  { label: 'Conductivity', value: '420 µS/cm', status: 'Safe', level: 'green', updated: '18s ago' },
  { label: 'Water Level', value: '2.8 m', status: 'Safe', level: 'green', updated: '18s ago' },
  { label: 'Sensor Status', value: 'Online', status: '14 Active', level: 'green', updated: 'Live' },
];

const recentTimelineAlerts = [
  { time: '10:18', text: 'High Turbidity Detected', detail: 'Station 12 Intake', badge: 'High Risk', level: 'red' },
  { time: '10:24', text: 'Heavy Rainfall Forecast Updated', detail: '12 mm / 24h expected', badge: 'Moderate', level: 'amber' },
  { time: '10:31', text: 'AI Risk Recalculated (+24%)', detail: 'Acute Diarrheal Probability 76%', badge: 'Warning', level: 'orange' },
  { time: '10:34', text: 'Alert Sent to Municipal Authority', detail: 'Delhi Water Board Advisory', badge: 'Dispatched', level: 'green' },
];

function CountUp({ end, duration = 2, decimals = 0, suffix = "" }: { end: number, duration?: number, decimals?: number, suffix?: string }) {
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

  return <span ref={ref}>{value.toFixed(decimals)}{suffix}</span>;
}

export default function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTrendTab, setActiveTrendTab] = useState<'pH' | 'Turbidity' | 'Temp' | 'WQI' | 'Risk'>('Turbidity');

  return (
    <section id="dashboard" className="py-28 relative overflow-hidden bg-[#F0F8FF] dark:bg-[#07162B] transition-colors duration-500">
      
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/25 dark:border-cyan-400/25 bg-white/80 dark:bg-[#132338]/90 text-[#00A8B5] dark:text-[#00C2D1] font-semibold text-xs uppercase tracking-wider mb-4 backdrop-blur-md"
          >
            <Radio className="w-3.5 h-3.5 text-[#00C2D1] animate-pulse" />
            <span>AI Water Intelligence Command Center</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[54px] font-outfit font-light text-[#0B2545] dark:text-white mb-4 tracking-tight leading-[1.18]"
          >
            Municipal Water <span className="text-[#009FAB] dark:text-[#00C2D1] font-light">Command Center</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[17px] sm:text-[18px] text-slate-600 dark:text-slate-300 font-sans leading-[1.7] max-w-2xl mx-auto"
          >
            Real-time water quality monitoring, neural disease outbreak prediction, explainable risk drivers, and prescriptive municipal action workflows.
          </motion.p>
        </div>

        {/* Master Stable Dashboard Container — NO rotation or tilt */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white/95 dark:bg-[#0F2035]/95 backdrop-blur-[20px] rounded-[28px] p-6 sm:p-8 border border-slate-200 dark:border-slate-700/80 shadow-2xl dark:shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0B4F8C] to-[#00C2D1] flex items-center justify-center text-white shadow-md">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-normal text-[#0B2545] dark:text-white font-outfit tracking-wide flex items-center gap-2">
                  Yamuna Basin Monitoring Station #402
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400">Delhi, India</span>
                </h4>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-300 font-sans mt-0.5">
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> ● Online
                  </span>
                  <span>• Updated 18 seconds ago</span>
                  <span>• 14 Active Sensor Nodes</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs font-semibold uppercase tracking-wider font-outfit text-slate-400">Water Quality Status</div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-semibold font-outfit">
                  GOOD
                </span>
              </div>
              <div className="text-right pl-4 border-l border-slate-200 dark:border-slate-800">
                <div className="text-xs font-semibold uppercase tracking-wider font-outfit text-slate-400">Last AI Prediction</div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 font-sans">2 minutes ago</span>
              </div>
            </div>
          </div>

          {/* 12-Column Grid Layout */}
          <div className="grid grid-cols-12 gap-6 relative z-10">
            
            {/* ROW 1 — EXECUTIVE SUMMARY (4 Cards) */}
            <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              
              {/* Card 1: Water Quality Index */}
              <div className="bg-slate-50 dark:bg-[#132338]/90 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-between transition-all duration-250 hover:-translate-y-1 hover:shadow-xl hover:border-[#00C2D1]/40 cursor-pointer">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider font-outfit text-slate-400 block mb-1">Water Quality Index</span>
                  <div className="text-3xl font-outfit font-semibold text-slate-900 dark:text-white tabular-nums">
                    <CountUp end={82} /> <span className="text-sm font-normal text-slate-400">/ 100</span>
                  </div>
                  <span className="inline-block text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full mt-1.5 border border-emerald-500/30">Good</span>
                </div>

                {/* Animated Circular Gauge */}
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="32" cy="32" r="26" stroke="rgba(0,0,0,0.08)" className="dark:stroke-white/10" strokeWidth="6" fill="none" />
                    <motion.circle
                      cx="32" cy="32" r="26"
                      stroke="#10B981"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="163.36"
                      initial={{ strokeDashoffset: 163.36 }}
                      animate={isInView ? { strokeDashoffset: 163.36 * (1 - 0.82) } : {}}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-emerald-500 font-mono">82%</div>
                </div>
              </div>

              {/* Card 2: AI Risk Score */}
              <div className="bg-slate-50 dark:bg-[#132338]/90 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-between transition-all duration-250 hover:-translate-y-1 hover:shadow-xl hover:border-[#00C2D1]/40 cursor-pointer">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider font-outfit text-slate-400 block mb-1">AI Risk Score</span>
                  <div className="text-2xl font-outfit font-semibold text-amber-500 dark:text-amber-400">
                    Moderate <span className="text-sm font-bold text-slate-700 dark:text-slate-200 font-mono tabular-nums">(63%)</span>
                  </div>
                  <span className="inline-block text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">Confidence 96%</span>
                </div>

                {/* Animated Radial Gauge */}
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="32" cy="32" r="26" stroke="rgba(0,0,0,0.08)" className="dark:stroke-white/10" strokeWidth="6" fill="none" />
                    <motion.circle
                      cx="32" cy="32" r="26"
                      stroke="#F59E0B"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="163.36"
                      initial={{ strokeDashoffset: 163.36 }}
                      animate={isInView ? { strokeDashoffset: 163.36 * (1 - 0.63) } : {}}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-amber-500 font-mono">63%</div>
                </div>
              </div>

              {/* Card 3: Active Alerts */}
              <div className="bg-slate-50 dark:bg-[#132338]/90 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-between transition-all duration-250 hover:-translate-y-1 hover:shadow-xl hover:border-[#00C2D1]/40 cursor-pointer">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider font-outfit text-slate-400 block mb-1">Active Alerts</span>
                  <div className="text-3xl font-outfit font-semibold text-amber-500 dark:text-amber-400 tabular-nums">
                    3 <span className="text-sm font-normal text-slate-400 font-sans">Warnings</span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mt-1 flex items-center gap-2">
                    <span className="text-red-500 font-bold">1 Critical</span>
                    <span>•</span>
                    <span className="text-amber-500 font-bold">2 Moderate</span>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500">
                  <AlertTriangle className="w-6 h-6" />
                </div>
              </div>

              {/* Card 4: Live Sensors */}
              <div className="bg-slate-50 dark:bg-[#132338]/90 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-between transition-all duration-250 hover:-translate-y-1 hover:shadow-xl hover:border-[#00C2D1]/40 cursor-pointer">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider font-outfit text-slate-400 block mb-1">Live Sensors</span>
                  <div className="text-3xl font-outfit font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                    14 <span className="text-sm font-normal text-slate-400 font-sans">Online</span>
                  </div>
                  <span className="inline-block text-[11px] font-semibold text-amber-500 mt-1">1 Maintenance</span>
                </div>

                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                  <Cpu className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* ROW 2 — DISEASE PREDICTION & AI EXPLAINABILITY (The Centerpiece) */}
            <div className="col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Disease Outbreak Probability Cards (Col 7) */}
              <div className="lg:col-span-7 bg-slate-50 dark:bg-[#132338]/90 backdrop-blur-xl rounded-[22px] p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col justify-between">
                <div>
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#00C2D1]/15 border border-[#00C2D1]/30 flex items-center justify-center text-[#00C2D1]">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-medium font-outfit text-slate-900 dark:text-white tracking-tight">
                          AI Disease Outbreak Prediction
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">Multi-pathogen predictive risk model</p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right font-sans">
                      <span className="text-xs font-semibold text-slate-900 dark:text-white font-outfit block">AI Prediction Engine</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Updated 18s ago • Model Confidence: 96%</span>
                    </div>
                  </div>

                  {/* Multi-Line Enterprise Cards */}
                  <div className="space-y-4 font-sans">
                    {diseasePredictions.map((d) => {
                      const IconComponent = d.icon;
                      return (
                        <div 
                          key={d.id} 
                          className={`p-5 rounded-[18px] border transition-all duration-250 hover:-translate-y-1 hover:shadow-md cursor-pointer ${
                            d.highlight 
                              ? 'bg-red-500/[0.03] dark:bg-red-500/[0.06] border-red-500/40 dark:border-red-500/50 shadow-sm ring-1 ring-red-500/20' 
                              : 'bg-white dark:bg-[#0A1628]/80 border-slate-200 dark:border-slate-800/90'
                          }`}
                        >
                          {/* Card Top Row: Icon + Disease Name & Status Capsule Badge */}
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                d.highlight ? 'bg-red-500/15 text-red-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                              }`}>
                                <IconComponent className="w-4.5 h-4.5" strokeWidth={2} />
                              </div>
                              <span className="text-[17px] font-semibold text-slate-900 dark:text-white font-sans tracking-tight">
                                {d.name}
                              </span>
                            </div>

                            <span className={`text-xs font-bold px-3 py-1 rounded-full border tracking-wide uppercase font-outfit ${d.badgeClass}`}>
                              {d.risk}
                            </span>
                          </div>

                          {/* Card Middle Row: Predicted Probability Label + Percentage */}
                          <div className="flex items-end justify-between gap-4 mb-2.5">
                            <div>
                              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-0.5">Predicted Probability</span>
                              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono">
                                Trend <span className={d.highlight ? 'text-red-500 font-bold' : 'text-slate-500'}>{d.trend}</span>
                              </span>
                            </div>

                            <div className="text-3xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white tracking-tight">
                              {d.prob}%
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-2">
                            <motion.div 
                              className={`h-full bg-gradient-to-r ${d.color} rounded-full`}
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${d.prob}%` } : {}}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                            />
                          </div>

                          {/* Bottom Meta Row */}
                          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono pt-1">
                            <span>Confidence Score: {d.confidence}</span>
                            <span>Forecast Window: 48 Hours</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* AI Explanation & Recommended Actions (Col 5) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* AI Explanation Panel */}
                <div className="bg-slate-50 dark:bg-[#132338]/90 backdrop-blur-xl rounded-[22px] p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium font-outfit text-slate-900 dark:text-white">Why did AI predict this?</h4>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-semibold">Confidence 96%</span>
                  </div>

                  <ul className="space-y-2.5 text-sm font-sans text-slate-700 dark:text-slate-300">
                    {explainabilityFactors.map((factor, i) => (
                      <li key={i} className="flex items-center gap-2.5 bg-white dark:bg-[#0A1628]/80 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Actions Panel */}
                <div className="bg-slate-50 dark:bg-[#132338]/90 backdrop-blur-xl rounded-[22px] p-6 border border-slate-200 dark:border-slate-800 shadow-lg flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-medium font-outfit text-slate-900 dark:text-white">Recommended Actions</h4>
                      <span className="px-3 py-1 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30 text-xs font-semibold uppercase font-outfit">Urgency: HIGH</span>
                    </div>

                    <ul className="space-y-2.5 text-sm font-sans text-slate-700 dark:text-slate-300">
                      {recommendedActions.map((action, i) => (
                        <li key={i} className="flex items-center gap-2.5 bg-white dark:bg-[#0A1628]/80 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                          <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-mono">Advisory Dispatch Ready</span>
                    <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0B4F8C] to-[#00A8B5] text-white font-semibold text-xs shadow-sm hover:shadow-cyan-500/20 transition-all cursor-pointer">
                      Dispatch Advisory →
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* ROW 3 — LIVE WATER PARAMETERS MATRIX & WEATHER */}
            <div className="col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Grouped Live Water Parameters Matrix (Col 8) */}
              <div className="lg:col-span-8 bg-slate-50 dark:bg-[#132338]/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium font-outfit text-slate-900 dark:text-white flex items-center gap-2">
                    <Activity className="w-4.5 h-4.5 text-[#00C2D1]" />
                    Live Water Parameters Matrix
                  </h3>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold font-mono">14 Sensor Nodes Online</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  {groupedLiveParameters.map((p) => (
                    <div key={p.label} className="bg-white dark:bg-slate-900/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-all duration-200 hover:border-[#00C2D1]/40">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-semibold text-slate-400 font-outfit block">{p.label}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-full ${
                            p.level === 'green' ? 'text-emerald-500 bg-emerald-500/10' : p.level === 'amber' ? 'text-amber-500 bg-amber-500/10' : 'text-red-500 bg-red-500/10'
                          }`}>{p.status}</span>
                        </div>
                        <div className="text-2xl font-outfit font-semibold text-slate-900 dark:text-white tabular-nums my-0.5">{p.value}</div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono block mt-1">Updated {p.updated}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Weather Panel (Col 4) */}
              <div className="lg:col-span-4 bg-slate-50 dark:bg-[#132338]/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium font-outfit text-slate-900 dark:text-white flex items-center gap-2">
                      <CloudRain className="w-4.5 h-4.5 text-[#00C2D1]" />
                      Weather Context
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Live API</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm font-sans mb-3">
                    <div className="bg-white dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 text-xs block">Temperature</span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums">28°C</span>
                    </div>
                    <div className="bg-white dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 text-xs block">Humidity</span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums">82%</span>
                    </div>
                    <div className="bg-white dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 text-xs block">Rainfall</span>
                      <span className="text-lg font-bold text-cyan-600 dark:text-cyan-400 font-mono tabular-nums">12 mm</span>
                    </div>
                    <div className="bg-white dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 text-xs block">Wind</span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums">18 km/h</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-600 dark:text-amber-400 text-center font-sans">
                  Forecast: Heavy Rain Expected Tonight
                </div>
              </div>

            </div>

            {/* ROW 4 — GIS MONITORING & TREND ANALYTICS */}
            <div className="col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Dark Interactive GIS Map (Col 7) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <MapComponent />
              </div>

              {/* 7-Day Trend Analytics with Metric Selector (Col 5) */}
              <div className="lg:col-span-5 bg-slate-50 dark:bg-[#132338]/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium font-outfit text-slate-900 dark:text-white">Trend Analytics</h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Last 7 Days</span>
                  </div>

                  {/* Metric Tab Selector */}
                  <div className="flex items-center gap-1.5 mb-4 bg-white dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                    {(['pH', 'Turbidity', 'Temp', 'WQI', 'Risk'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTrendTab(tab)}
                        className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                          activeTrendTab === tab
                            ? 'bg-[#00C2D1] text-white shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendDataMap[activeTrendTab]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="trendTabGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00C2D1" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#00C2D1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(7, 22, 43, 0.95)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,194,209,0.3)', borderRadius: '12px', color: '#fff' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="val" stroke="#00C2D1" strokeWidth={3} fillOpacity={1} fill="url(#trendTabGrad)" name={activeTrendTab} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-300 pt-3 border-t border-slate-200 dark:border-slate-800 font-sans">
                  <span>{activeTrendTab} trend tracking active</span>
                  <span className="text-[#00C2D1] font-semibold">7-Day Animated Curve</span>
                </div>
              </div>

            </div>

            {/* ROW 5 — RECENT ALERTS TIMELINE & FOOTER STATUS */}
            <div className="col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Recent Alerts Timeline Cards (Col 12) */}
              <div className="col-span-12 bg-slate-50 dark:bg-[#132338]/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium font-outfit text-slate-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-4.5 h-4.5 text-[#00C2D1]" />
                    Recent Alerts Timeline
                  </h3>
                  <span className="text-xs text-[#00C2D1] font-semibold cursor-pointer hover:underline font-sans">Full Audit Log →</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {recentTimelineAlerts.map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900/80 p-4.5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-all duration-250 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-mono text-xs font-bold text-[#00C2D1]">{item.time}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          item.level === 'red' ? 'bg-red-500/15 text-red-500 border-red-500/30' : item.level === 'amber' ? 'bg-amber-500/15 text-amber-500 border-amber-500/30' : 'bg-cyan-500/15 text-cyan-500 border-cyan-500/30'
                        }`}>{item.badge}</span>
                      </div>
                      <h5 className="font-outfit font-medium text-xs text-slate-900 dark:text-white">{item.text}</h5>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-sans mt-1">{item.detail}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* FOOTER STATUS BAR */}
            <div className="col-span-12 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-sans">
              <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1 font-outfit">Total Monitoring Stations</span>
                <span className="text-2xl font-semibold text-slate-900 dark:text-white font-outfit tabular-nums">1,240</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1 font-outfit">Data Points Today</span>
                <span className="text-2xl font-semibold text-slate-900 dark:text-white font-outfit tabular-nums">8.6 Million</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1 font-outfit">Predictions Generated</span>
                <span className="text-2xl font-semibold text-slate-900 dark:text-white font-outfit tabular-nums">1,423</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1 font-outfit">Average Response Time</span>
                <span className="text-2xl font-semibold text-slate-900 dark:text-white font-outfit tabular-nums">1.8 Seconds</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
