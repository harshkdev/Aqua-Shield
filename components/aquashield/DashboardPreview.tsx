"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CheckCircle, Radio, AlertCircle, ShieldAlert, Cpu, Sparkles, MapPin, Clock, CloudRain, Activity, Thermometer, Droplets, Check, CheckCircle2, Biohazard, ArrowUpRight, TrendingUp, FlaskConical } from 'lucide-react';
import { AnimatedCard } from '@/components/aquashield/AnimatedCard';
import dynamic from 'next/dynamic';
import { useTheme } from '@/components/providers/ThemeProvider';

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
  { label: 'pH Level', num: '7.2', unit: '', status: 'Safe', level: 'green', updated: '18s ago' },
  { label: 'Temperature', num: '24.8', unit: '°C', status: 'Safe', level: 'green', updated: '18s ago' },
  { label: 'Turbidity', num: '8.4', unit: 'NTU', status: 'Moderate', level: 'amber', updated: '18s ago' },
  { label: 'TDS (Solids)', num: '310', unit: 'ppm', status: 'Safe', level: 'green', updated: '18s ago' },
  { label: 'Dissolved Oxygen', num: '4.8', unit: 'mg/L', status: 'High Risk', level: 'red', updated: '18s ago' },
  { label: 'Conductivity', num: '420', unit: 'µS/cm', status: 'Safe', level: 'green', updated: '18s ago' },
  { label: 'Water Level', num: '2.8', unit: 'm', status: 'Safe', level: 'green', updated: '18s ago' },
  { label: 'Sensor Status', num: 'Online', unit: '', status: '14 Active', level: 'green', updated: 'Live' },
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
  const { theme } = useTheme();

  return (
    <section id="dashboard" className="py-28 relative overflow-hidden bg-transparent transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/25 dark:border-cyan-400/25 bg-white/80 dark:bg-[#132338]/90 text-[#00A8B5] dark:text-[#00C2D1] font-semibold text-xs uppercase tracking-wider mb-4 backdrop-blur-md"
          >
            <Radio className="w-3.5 h-3.5 text-[#00C2D1] animate-pulse" />
            <span>AI Water Intelligence Command Center</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[54px] font-outfit font-light text-[#05223D] dark:text-white mb-4 tracking-tight leading-[1.18]"
          >
            Municipal Water <span className="text-[#009FAB] dark:text-[#00C2D1] font-light">Command Center</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="text-[17px] sm:text-[18px] text-slate-600 dark:text-slate-300 font-sans leading-[1.7] max-w-2xl mx-auto"
          >
            Real-time water quality monitoring, neural disease outbreak prediction, explainable risk drivers, and prescriptive municipal action workflows.
          </motion.p>
        </div>

        {/* Master Stable Dashboard Container (Requirement 4: Soft elevation, cyan ambient glow, atmospheric blur) */}
        <div className="relative">
          {/* Soft Atmospheric Blur & Cyan Glow Underneath */}
          <div className="absolute -inset-4 bg-gradient-to-b from-[#00C2D1]/12 via-[#00C2D1]/5 to-transparent rounded-[36px] blur-[45px] pointer-events-none -z-10" />

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white/95 dark:bg-[#0F2035]/95 backdrop-blur-[20px] rounded-[28px] p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-[0_20px_50px_rgba(7,22,43,0.08),0_8px_20px_rgba(0,194,209,0.06)] dark:shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85),0_15px_35px_-10px_rgba(0,194,209,0.12)] overflow-hidden"
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
            
            {/* ROW 1 — EXECUTIVE SUMMARY (4 Refined Stat Cards with Border-Radius Hierarchy) */}
            <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1: Water Quality Index (Safe 2% Tint) */}
              <AnimatedCard className="bg-emerald-500/[0.015] dark:bg-emerald-500/[0.04] backdrop-blur-xl p-5 sm:p-6 rounded-[20px] border border-slate-200/50 dark:border-slate-800/50 shadow-[0_10px_30px_-5px_rgba(7,22,43,0.05)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:scale-[1.01] hover:border-[#00C2D1]/50 hover:shadow-[0_14px_40px_-5px_rgba(0,194,209,0.14)] transition-all duration-250 ease-out flex flex-col justify-between cursor-pointer group">
                {/* Tier 1: Top Label & Minimal Outline Icon */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider font-outfit text-slate-500 dark:text-slate-400">
                    Water Quality Index
                  </span>
                  <Droplets className="w-4.5 h-4.5 text-slate-400 dark:text-slate-500 group-hover:text-[#00C2D1] transition-colors" />
                </div>

                {/* Tier 2: Hero Number + Thick Semicircular Arc Gauge */}
                <div className="flex items-end justify-between my-2">
                  <div>
                    <div className="text-3xl sm:text-[36px] font-extrabold font-mono tracking-tight tabular-nums text-slate-900 dark:text-white">
                      82
                    </div>
                  </div>
                  {/* Semicircular Arc Gauge */}
                  <div className="w-20 h-12 flex items-center justify-center">
                    <svg className="w-20 h-12" viewBox="0 0 80 46">
                      <defs>
                        <linearGradient id="wqiArcGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#0B4F8C" />
                          <stop offset="100%" stopColor="#00C2D1" />
                        </linearGradient>
                      </defs>
                      <path d="M 10 40 A 30 30 0 0 1 70 40" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-slate-200 dark:text-slate-800" />
                      <motion.path
                        d="M 10 40 A 30 30 0 0 1 70 40"
                        fill="none"
                        stroke="url(#wqiArcGrad)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="94.25"
                        initial={{ strokeDashoffset: 94.25 }}
                        animate={isInView ? { strokeDashoffset: 94.25 * (1 - 0.82) } : {}}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                  </div>
                </div>

                {/* Tier 3: Muted Subtext */}
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1 block">
                  Status: Good · 100 max scale
                </span>
              </AnimatedCard>

              {/* Card 2: AI Risk Score (Moderate 2% Tint) */}
              <AnimatedCard className="bg-amber-500/[0.025] dark:bg-amber-500/[0.06] backdrop-blur-xl p-5 sm:p-6 rounded-[20px] border border-amber-500/25 dark:border-amber-500/30 shadow-[0_10px_30px_-5px_rgba(7,22,43,0.05)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:scale-[1.01] hover:border-amber-500/50 hover:shadow-[0_14px_40px_-5px_rgba(245,158,11,0.15)] transition-all duration-250 ease-out flex flex-col justify-between cursor-pointer group">
                {/* Tier 1: Top Label & Minimal Outline Icon */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider font-outfit text-slate-500 dark:text-slate-400">
                    AI Risk Score
                  </span>
                  <Sparkles className="w-4.5 h-4.5 text-slate-400 dark:text-slate-500 group-hover:text-amber-500 transition-colors" />
                </div>

                {/* Tier 2: Hero Number + Thick Semicircular Arc Gauge */}
                <div className="flex items-end justify-between my-2">
                  <div>
                    <div className="text-3xl sm:text-[36px] font-extrabold font-mono tracking-tight tabular-nums text-slate-900 dark:text-white">
                      63%
                    </div>
                  </div>
                  {/* Severity Arc Gauge */}
                  <div className="w-20 h-12 flex items-center justify-center">
                    <svg className="w-20 h-12" viewBox="0 0 80 46">
                      <defs>
                        <linearGradient id="riskArcGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#F59E0B" />
                          <stop offset="100%" stopColor="#EF4444" />
                        </linearGradient>
                      </defs>
                      <path d="M 10 40 A 30 30 0 0 1 70 40" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-slate-200 dark:text-slate-800" />
                      <motion.path
                        d="M 10 40 A 30 30 0 0 1 70 40"
                        fill="none"
                        stroke="url(#riskArcGrad)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="94.25"
                        initial={{ strokeDashoffset: 94.25 }}
                        animate={isInView ? { strokeDashoffset: 94.25 * (1 - 0.63) } : {}}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                  </div>
                </div>

                {/* Tier 3: Muted Subtext */}
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1 block">
                  Status: Moderate · 96% confidence
                </span>
              </AnimatedCard>

              {/* Card 3: Active Alerts (High Risk 3% Tint) */}
              <AnimatedCard className="bg-red-500/[0.03] dark:bg-red-500/[0.07] backdrop-blur-xl p-5 sm:p-6 rounded-[20px] border border-red-500/30 dark:border-red-500/40 shadow-[0_10px_30px_-5px_rgba(7,22,43,0.05)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:scale-[1.01] hover:border-red-500/50 hover:shadow-[0_14px_40px_-5px_rgba(239,68,68,0.15)] transition-all duration-250 ease-out flex flex-col justify-between cursor-pointer group">
                {/* Tier 1: Top Label & Minimal Outline Icon */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider font-outfit text-slate-500 dark:text-slate-400">
                    Active Alerts
                  </span>
                  <AlertTriangle className="w-4.5 h-4.5 text-slate-400 dark:text-slate-500 group-hover:text-red-500 transition-colors" />
                </div>

                {/* Tier 2: Hero Number */}
                <div className="my-1">
                  <div className="text-3xl sm:text-[36px] font-extrabold font-mono tracking-tight tabular-nums text-slate-900 dark:text-white">
                    3
                  </div>
                </div>

                {/* Tier 3: Muted Subtext */}
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1 block">
                  1 critical · 2 moderate warnings
                </span>
              </AnimatedCard>

              {/* Card 4: Live Sensors (Safe 2% Tint) */}
              <AnimatedCard className="bg-emerald-500/[0.015] dark:bg-emerald-500/[0.04] backdrop-blur-xl p-5 sm:p-6 rounded-[20px] border border-slate-200/50 dark:border-slate-800/50 shadow-[0_10px_30px_-5px_rgba(7,22,43,0.05)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:scale-[1.01] hover:border-emerald-500/50 hover:shadow-[0_14px_40px_-5px_rgba(16,185,129,0.15)] transition-all duration-250 ease-out flex flex-col justify-between cursor-pointer group">
                {/* Tier 1: Top Label & Minimal Outline Icon */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider font-outfit text-slate-500 dark:text-slate-400">
                    Live Sensors
                  </span>
                  <Cpu className="w-4.5 h-4.5 text-slate-400 dark:text-slate-500 group-hover:text-emerald-500 transition-colors" />
                </div>

                {/* Tier 2: Hero Number */}
                <div className="my-1">
                  <div className="text-3xl sm:text-[36px] font-extrabold font-mono tracking-tight tabular-nums text-slate-900 dark:text-white">
                    14
                  </div>
                </div>

                {/* Tier 3: Muted Subtext */}
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1 block">
                  14 probes online · 1 maintenance
                </span>
              </AnimatedCard>

            </div>

            {/* ROW 2 — DISEASE PREDICTION & AI EXPLAINABILITY (The Centerpiece) */}
            <div className="col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Disease Outbreak Probability Cards (Col 7) */}
              <AnimatedCard className="lg:col-span-7 bg-[#F8FAFC] dark:bg-[#132338]/90 backdrop-blur-xl rounded-[22px] p-6 sm:p-7 border border-slate-200/50 dark:border-slate-800/50 shadow-[0_10px_30px_-5px_rgba(7,22,43,0.06)] dark:shadow-[0_12px_36px_-5px_rgba(0,0,0,0.5)] flex flex-col justify-between">
                <div>
                  {/* Header (Requirement 9: Icon highlight box & divider) */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-slate-200/50 dark:border-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#00C2D1]/10 border border-[#00C2D1]/25 flex items-center justify-center text-[#00C2D1]">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[20px] sm:text-[22px] font-bold font-display text-slate-900 dark:text-white tracking-tight">
                          AI Disease Outbreak Prediction
                        </h3>
                        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 font-sans">Multi-pathogen predictive risk model</p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right font-sans">
                      <span className="text-xs font-semibold text-slate-900 dark:text-white font-sans block">AI Prediction Engine</span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">Updated 18s ago • Model Confidence: 96%</span>
                    </div>
                  </div>

                  {/* Multi-Line Enterprise Cards */}
                  <div className="space-y-3.5 font-sans">
                    {diseasePredictions.map((d) => {
                      const IconComponent = d.icon;
                      return (
                        <AnimatedCard 
                          key={d.id} 
                          className={`p-4.5 rounded-[18px] border transition-all duration-250 hover:-translate-y-1 hover:scale-[1.005] cursor-pointer ${
                            d.highlight 
                              ? 'bg-red-500/[0.03] dark:bg-red-500/[0.07] border-red-500/30 dark:border-red-500/40 shadow-sm' 
                              : 'bg-white/80 dark:bg-[#0A1628]/80 border-slate-200/50 dark:border-slate-800/50 hover:border-[#00C2D1]/40 hover:shadow-[0_8px_20px_rgba(0,194,209,0.1)]'
                          }`}
                        >
                          {/* Card Top Row: Icon + Disease Name & Status Capsule Badge */}
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                d.highlight ? 'bg-red-500/15 text-red-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                              }`}>
                                <IconComponent className="w-4 h-4" strokeWidth={2} />
                              </div>
                              <span className="text-[16px] font-semibold text-slate-900 dark:text-white font-sans tracking-tight">
                                {d.name}
                              </span>
                            </div>

                            {/* Softer Enterprise Status Badge (Req 8) */}
                            <span className={`text-[10px] font-semibold px-3 py-0.5 rounded-full border tracking-wide uppercase font-sans ${d.badgeClass}`}>
                              {d.risk}
                            </span>
                          </div>

                          {/* Card Middle Row: Predicted Probability Label + Percentage */}
                          <div className="flex items-end justify-between gap-4 mb-2">
                            <div>
                              <span className="text-xs font-medium text-slate-400 dark:text-slate-500 block mb-0.5">Predicted Probability</span>
                              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                                Trend <span className={d.highlight ? 'text-red-500 font-bold' : 'text-slate-400'}>{d.trend}</span>
                              </span>
                            </div>

                            <div className="text-[30px] font-bold font-mono tabular-nums text-slate-900 dark:text-white tracking-tight">
                              {d.prob}%
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full h-1.5 bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden mb-1.5">
                            <motion.div 
                              className={`h-full bg-gradient-to-r ${d.color} rounded-full`}
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${d.prob}%` } : {}}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                            />
                          </div>

                          {/* Bottom Meta Row */}
                          <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-mono pt-1">
                            <span>Confidence: {d.confidence}</span>
                            <span>Window: 48 Hours</span>
                          </div>
                        </AnimatedCard>
                      );
                    })}
                  </div>
                </div>
              </AnimatedCard>

              {/* AI Explanation & Recommended Actions (Col 5) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Explainable AI Reasoning Panel */}
                <AnimatedCard className="bg-[#F8FAFC] dark:bg-[#132338]/90 backdrop-blur-xl rounded-[22px] p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-[0_10px_30px_-5px_rgba(7,22,43,0.06)] dark:shadow-[0_12px_36px_-5px_rgba(0,0,0,0.5)]">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200/50 dark:border-slate-800/50">
                    <h4 className="text-[17px] font-bold font-sans text-slate-900 dark:text-white">Why did AI predict this?</h4>
                    <span className="px-3 py-0.5 rounded-full bg-cyan-500/10 text-[#00C2D1] border border-cyan-500/20 text-xs font-mono">Explainable AI</span>
                  </div>

                  <ul className="space-y-2 text-xs font-sans text-slate-700 dark:text-slate-300">
                    {[
                      { factor: 'Turbidity increased sharply (+24% in 4h)', source: 'Sensor Network' },
                      { factor: 'Heavy rainfall forecast (12 mm / 24h)', source: 'Weather API' },
                      { factor: 'Dissolved Oxygen below limit (4.8 mg/L)', source: 'Sensor Network' },
                      { factor: 'Community health reports from Sector 4', source: 'Community' },
                      { factor: 'Historical Yamuna Basin pattern matched', source: 'AI Model' },
                    ].map((item, i) => (
                      <li key={i} className="flex items-center justify-between gap-2 bg-white/80 dark:bg-[#0A1628]/80 px-3.5 py-2.5 rounded-[14px] border border-slate-200/50 dark:border-slate-800/50">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00C2D1] flex-shrink-0" />
                          <span className="text-xs text-slate-700 dark:text-slate-300">{item.factor}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700/60 whitespace-nowrap">
                          {item.source}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AnimatedCard>

                {/* Recommended Actions Panel */}
                <AnimatedCard className="bg-[#F8FAFC] dark:bg-[#132338]/90 backdrop-blur-xl rounded-[22px] p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-[0_10px_30px_-5px_rgba(7,22,43,0.06)] dark:shadow-[0_12px_36px_-5px_rgba(0,0,0,0.5)] flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200/50 dark:border-slate-800/50">
                      <h4 className="text-[17px] font-bold font-sans text-slate-900 dark:text-white">Recommended Actions</h4>
                      <span className="px-3 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-semibold uppercase font-mono">Urgency: HIGH</span>
                    </div>

                    <ul className="space-y-2 text-xs font-sans text-slate-700 dark:text-slate-300">
                      {recommendedActions.map((action, i) => (
                        <li key={i} className="flex items-center gap-2.5 bg-white/80 dark:bg-[#0A1628]/80 px-3.5 py-2.5 rounded-[14px] border border-slate-200/50 dark:border-slate-800/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                          <span className="text-xs text-slate-700 dark:text-slate-300">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/50 flex justify-between items-center text-xs">
                    <span className="text-slate-400 dark:text-slate-500 font-mono">Advisory Dispatch Ready</span>
                    <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0B4F8C] to-[#00A8B5] text-white font-semibold text-xs shadow-sm hover:shadow-cyan-500/20 transition-all cursor-pointer hover:-translate-y-0.5">
                      Dispatch Advisory →
                    </button>
                  </div>
                </AnimatedCard>

              </div>

            </div>

            {/* ROW 3 — LIVE WATER PARAMETERS MATRIX & WEATHER CONTEXT */}
            <div className="col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Grouped Live Water Parameters Matrix (Col 8) */}
              <AnimatedCard className="lg:col-span-8 bg-[#F8FAFC] dark:bg-[#132338]/90 backdrop-blur-xl rounded-[22px] p-6 sm:p-7 border border-slate-200/50 dark:border-slate-800/50 shadow-[0_10px_30px_-5px_rgba(7,22,43,0.06)] dark:shadow-[0_12px_36px_-5px_rgba(0,0,0,0.5)] flex flex-col justify-between">
                <div>
                  {/* Header with Animated Live Ping Status Line */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-slate-200/50 dark:border-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#00C2D1]/10 border border-[#00C2D1]/25 flex items-center justify-center text-[#00C2D1]">
                        <Activity className="w-5 h-5" />
                      </div>
                      <h3 className="text-[20px] sm:text-[22px] font-bold font-display text-slate-900 dark:text-white">
                        Live Water Parameters Matrix
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 bg-white/90 dark:bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span>Last Updated 18s ago • 14 Nodes Online</span>
                    </div>
                  </div>

                  {/* Logically Grouped Parameters (3 Rows x 3 Columns = 9 Cards Total) */}
                  <div className="space-y-6">
                    {[
                      {
                        group: 'Chemical Parameters',
                        icon: FlaskConical,
                        items: [
                          { label: 'pH Level', num: '7.2', unit: '', status: 'Safe', level: 'green', trend: '↗ Stable', sparkline: 'M 2 10 L 10 9 L 18 11 L 26 8 L 34 9 L 42 7' },
                          { label: 'TDS (Solids)', num: '310', unit: 'ppm', status: 'Safe', level: 'green', trend: '→ Stable', sparkline: 'M 2 8 L 10 8 L 18 9 L 26 8 L 34 8 L 42 8' },
                          { label: 'Conductivity', num: '420', unit: 'µS/cm', status: 'Safe', level: 'green', trend: '↗ Stable', sparkline: 'M 2 12 L 10 10 L 18 9 L 26 8 L 34 7 L 42 6' },
                        ]
                      },
                      {
                        group: 'Physical Parameters',
                        icon: Thermometer,
                        items: [
                          { label: 'Temperature', num: '24.8', unit: '°C', status: 'Safe', level: 'green', trend: '→ Stable', sparkline: 'M 2 8 L 10 9 L 18 8 L 26 8 L 34 9 L 42 8' },
                          { label: 'Turbidity', num: '8.4', unit: 'NTU', status: 'Moderate', level: 'amber', trend: '↑ +24%', sparkline: 'M 2 12 L 10 11 L 18 9 L 26 6 L 34 4 L 42 2' },
                          { label: 'Water Level', num: '2.8', unit: 'm', status: 'Safe', level: 'green', trend: '↓ Falling', sparkline: 'M 2 4 L 10 5 L 18 7 L 26 9 L 34 11 L 42 12' },
                        ]
                      },
                      {
                        group: 'Biological Parameters',
                        icon: Biohazard,
                        items: [
                          { label: 'Dissolved Oxygen', num: '4.8', unit: 'mg/L', status: 'High Risk', level: 'red', trend: '↓ -12%', sparkline: 'M 2 4 L 10 6 L 18 8 L 26 10 L 34 12 L 42 14' },
                          { label: 'ORP (Redox)', num: '345', unit: 'mV', status: 'Safe', level: 'green', trend: '↗ +15 mV', sparkline: 'M 2 12 L 10 10 L 18 8 L 26 7 L 34 6 L 42 5' },
                          { label: 'Sensor Network', num: '14/14', unit: 'nodes', status: 'Healthy', level: 'green', trend: '● 100% Online', sparkline: 'M 2 8 L 10 8 L 18 8 L 26 8 L 34 8 L 42 8' },
                        ]
                      }
                    ].map((category, catIdx) => {
                      const CategoryIcon = category.icon;
                      return (
                        <div key={category.group}>
                          {/* Requirement 9: Section Header Enhancement */}
                          <div className="flex items-center gap-2.5 mb-3">
                            <div className="w-7 h-7 rounded-lg bg-[#00C2D1]/10 border border-[#00C2D1]/20 flex items-center justify-center text-[#00C2D1]">
                              <CategoryIcon className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 font-sans uppercase tracking-wider">
                              {category.group}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                            {category.items.map((p, pIdx) => (
                              <AnimatedCard 
                                key={p.label} 
                                delay={catIdx * 0.08 + pIdx * 0.04}
                                className={`p-4.5 rounded-[18px] border transition-all duration-250 ease-out flex flex-col justify-between cursor-pointer group hover:-translate-y-1 hover:scale-[1.01] ${
                                  p.level === 'red'
                                    ? 'bg-red-500/[0.03] dark:bg-red-500/[0.07] border-red-500/30 hover:border-red-500/50 shadow-sm hover:shadow-[0_12px_30px_rgba(239,68,68,0.12)]'
                                    : p.level === 'amber'
                                    ? 'bg-amber-500/[0.025] dark:bg-amber-500/[0.06] border-amber-500/30 hover:border-amber-500/50 shadow-sm hover:shadow-[0_12px_30px_rgba(245,158,11,0.12)]'
                                    : 'bg-white/90 dark:bg-slate-900/80 border-slate-200/50 dark:border-slate-800/50 hover:border-[#00C2D1]/50 hover:shadow-[0_12px_30px_rgba(0,194,209,0.12)]'
                                }`}
                              >
                                <div>
                                  <div className="flex justify-between items-center mb-1.5">
                                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 font-sans group-hover:text-[#00C2D1] transition-colors">{p.label}</span>
                                    {/* Requirement 8: Softer Status Badge */}
                                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                                      p.level === 'green' ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : p.level === 'amber' ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20'
                                    }`}>{p.status}</span>
                                  </div>

                                  {/* Requirement 4: Numbers Emphasis */}
                                  <div className="flex items-baseline gap-1.5 my-1">
                                    <span className="text-3xl sm:text-[34px] font-extrabold font-mono tracking-tight tabular-nums text-slate-900 dark:text-white">
                                      {p.num}
                                    </span>
                                    {p.unit && (
                                      <span className="text-xs font-medium font-mono text-slate-400 dark:text-slate-500">
                                        {p.unit}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Tiny Trend Sparkline Indicator */}
                                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500 mt-2 pt-2 border-t border-slate-200/40 dark:border-slate-800/40">
                                  <span className={`font-semibold ${
                                    p.level === 'red' ? 'text-red-500' : p.level === 'amber' ? 'text-amber-500' : 'text-slate-600 dark:text-slate-300'
                                  }`}>{p.trend}</span>
                                  {/* Micro SVG Animated Sparkline */}
                                  <svg className="w-11 h-4 overflow-visible" viewBox="0 0 44 16">
                                    <motion.path 
                                      d={p.sparkline} 
                                      fill="none" 
                                      stroke={p.level === 'red' ? '#EF4444' : p.level === 'amber' ? '#F59E0B' : '#00C2D1'} 
                                      strokeWidth="2" 
                                      strokeLinecap="round"
                                      initial={{ pathLength: 0, opacity: 0 }}
                                      whileInView={{ pathLength: 1, opacity: 1 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 1.2, delay: 0.2 + pIdx * 0.05, ease: "easeOut" }}
                                    />
                                  </svg>
                                </div>
                              </AnimatedCard>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AnimatedCard>

              {/* Live Weather Context Panel (Requirement 5: Card Breathing Space & Padding Polish) */}
              <AnimatedCard className="lg:col-span-4 bg-[#F8FAFC] dark:bg-[#132338]/90 backdrop-blur-xl rounded-[22px] p-6 sm:p-7 border border-slate-200/50 dark:border-slate-800/50 shadow-[0_10px_30px_-5px_rgba(7,22,43,0.06)] dark:shadow-[0_12px_36px_-5px_rgba(0,0,0,0.5)] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-200/50 dark:border-slate-800/50">
                    <h4 className="text-[17px] font-bold font-display text-slate-900 dark:text-white flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#00C2D1]/10 border border-[#00C2D1]/20 flex items-center justify-center text-[#00C2D1]">
                        <CloudRain className="w-4 h-4" />
                      </div>
                      Weather Context
                    </h4>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">Live API</span>
                  </div>

                  {/* 8-Metric Weather Grid with Micro-Trends */}
                  <div className="grid grid-cols-2 gap-3 text-sm font-sans mb-5">
                    {[
                      { label: 'Temperature', num: '28', unit: '°C', sub: '▲ +1.2°C today' },
                      { label: 'Humidity', num: '82', unit: '%', sub: '▼ -3%' },
                      { label: 'Rainfall (24h)', num: '12', unit: 'mm', sub: 'Last 24h', isHighlight: true },
                      { label: 'Wind Speed', num: '18', unit: 'km/h', sub: 'NE Direction' },
                      { label: 'Air Quality', num: '42', unit: 'AQI', sub: 'Good · Low Risk' },
                      { label: 'Pressure', num: '1013', unit: 'hPa', sub: '→ Stable' },
                      { label: 'UV Index', num: '6', unit: 'High', sub: '▲ Peak at 2 PM' },
                      { label: 'Cloud Cover', num: '75', unit: '%', sub: '▲ +5%' },
                    ].map((item) => (
                      <div key={item.label} className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-[16px] border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between hover:border-[#00C2D1]/40 hover:-translate-y-0.5 transition-all duration-200">
                        <span className="text-slate-400 dark:text-slate-500 text-[11px] font-sans block">{item.label}</span>
                        <div className="flex items-baseline gap-1 my-0.5">
                          <span className={`text-[22px] font-bold font-mono tracking-tight tabular-nums ${item.isHighlight ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-900 dark:text-white'}`}>
                            {item.num}
                          </span>
                          <span className="text-[11px] font-medium font-mono text-slate-400 dark:text-slate-500">
                            {item.unit}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 block mt-0.5">{item.sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Forecast Alert Insight Panel */}
                <div className="p-4 rounded-[18px] bg-amber-500/[0.05] dark:bg-amber-500/[0.08] border border-amber-500/25 text-xs font-sans space-y-1.5">
                  <div className="flex items-center justify-between font-semibold text-amber-600 dark:text-amber-400">
                    <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-outfit">
                      <AlertTriangle className="w-3.5 h-3.5" /> Forecast Alert
                    </span>
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30">
                      AI Confidence: 94%
                    </span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-semibold leading-snug">
                    Heavy rainfall expected tonight (12 mm / 24h).
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    AI predicts a <strong className="text-amber-600 dark:text-amber-400 font-semibold">moderate increase in contamination probability</strong> due to expected catchment surface runoff.
                  </p>
                </div>
              </AnimatedCard>

            </div>
            <div className="col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Dark Interactive GIS Map (Col 7) */}
              <AnimatedCard className="lg:col-span-7 flex flex-col justify-between">
                <MapComponent />
              </AnimatedCard>

              {/* 7-Day Trend Analytics with Metric Selector (Col 5) */}
              <AnimatedCard className="lg:col-span-5 bg-[#F8FAFC] dark:bg-[#132338]/90 backdrop-blur-xl rounded-[22px] p-6 sm:p-7 border border-slate-200/50 dark:border-slate-800/50 shadow-[0_10px_30px_-5px_rgba(7,22,43,0.06)] dark:shadow-[0_12px_36px_-5px_rgba(0,0,0,0.5)] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200/50 dark:border-slate-800/50">
                    <h3 className="text-[20px] sm:text-[22px] font-bold font-display text-slate-900 dark:text-white flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#00C2D1]/10 border border-[#00C2D1]/20 flex items-center justify-center text-[#00C2D1]">
                        <Activity className="w-4 h-4" />
                      </div>
                      Trend Analytics
                    </h3>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">Last 7 Days</span>
                  </div>

                  {/* Metric Tab Selector (Requirement 7: Premium Pill Effect) */}
                  <div className="flex items-center gap-1.5 mb-4 bg-white/80 dark:bg-slate-900/80 p-1.5 rounded-[14px] border border-slate-200/50 dark:border-slate-800/50 text-xs">
                    {(['pH', 'Turbidity', 'Temp', 'WQI', 'Risk'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTrendTab(tab)}
                        className={`flex-1 py-1.5 rounded-lg font-semibold transition-all duration-200 cursor-pointer ${
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
                            <stop offset="5%" stopColor="#00C2D1" stopOpacity={0.35}/>
                            <stop offset="95%" stopColor="#00C2D1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(7, 22, 43, 0.95)', backdropFilter: 'blur(16px)', border: '1px solid rgba(0,194,209,0.3)', borderRadius: '14px', color: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="val" stroke="#00C2D1" strokeWidth={3} fillOpacity={1} fill="url(#trendTabGrad)" name={activeTrendTab} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200/50 dark:border-slate-800/50 font-sans">
                  <span>{activeTrendTab} trend tracking active</span>
                  <span className="text-[#00C2D1] font-semibold">7-Day Animated Curve</span>
                </div>
              </AnimatedCard>

            </div>

            {/* ROW 5 — RECENT ALERTS TIMELINE & FOOTER STATUS (Requirement 10: Increased Breathing Room) */}
            <div className="col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Recent Alerts Timeline Cards (Col 12) */}
              <AnimatedCard className="col-span-12 bg-[#F8FAFC] dark:bg-[#132338]/90 backdrop-blur-xl rounded-[22px] p-6 sm:p-7 border border-slate-200/50 dark:border-slate-800/50 shadow-[0_10px_30px_-5px_rgba(7,22,43,0.06)] dark:shadow-[0_12px_36px_-5px_rgba(0,0,0,0.5)]">
                <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-200/50 dark:border-slate-800/50">
                  <h3 className="text-[20px] sm:text-[22px] font-bold font-display text-slate-900 dark:text-white flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#00C2D1]/10 border border-[#00C2D1]/20 flex items-center justify-center text-[#00C2D1]">
                      <Clock className="w-4 h-4" />
                    </div>
                    Recent Alerts Timeline
                  </h3>
                  <span className="text-xs text-[#00C2D1] font-semibold cursor-pointer hover:underline font-sans">Full Audit Log →</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
                  {recentTimelineAlerts.map((item, idx) => (
                    <div key={idx} className="bg-white/80 dark:bg-slate-900/80 p-4.5 rounded-[18px] border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between transition-all duration-250 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:border-[#00C2D1]/40 hover:shadow-[0_8px_20px_rgba(0,194,209,0.1)] cursor-pointer">
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="font-mono text-xs font-bold text-[#00C2D1]">{item.time}</span>
                        <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                          item.level === 'red' ? 'bg-red-500/10 text-red-500 border-red-500/20' : item.level === 'amber' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20'
                        }`}>{item.badge}</span>
                      </div>
                      <h5 className="font-sans font-bold text-xs text-slate-900 dark:text-white leading-snug">{item.text}</h5>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 font-sans mt-1.5 block">{item.detail}</span>
                    </div>
                  ))}
                </div>
              </AnimatedCard>

            </div>

            {/* FOOTER STATUS BAR */}
            <AnimatedCard className="col-span-12 pt-6 border-t border-slate-200/50 dark:border-slate-800/50 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-sans">
              <div className="bg-[#F8FAFC] dark:bg-slate-900/60 p-4 rounded-[18px] border border-slate-200/50 dark:border-slate-800/50">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400 block mb-1 font-sans">Total Monitoring Stations</span>
                <span className="text-[24px] sm:text-[26px] font-bold text-slate-900 dark:text-white font-display tabular-nums">1,240</span>
              </div>
              <div className="bg-[#F8FAFC] dark:bg-slate-900/60 p-4 rounded-[18px] border border-slate-200/50 dark:border-slate-800/50">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400 block mb-1 font-sans">Data Points Today</span>
                <span className="text-[24px] sm:text-[26px] font-bold text-slate-900 dark:text-white font-display tabular-nums">8.6 Million</span>
              </div>
              <div className="bg-[#F8FAFC] dark:bg-slate-900/60 p-4 rounded-[18px] border border-slate-200/50 dark:border-slate-800/50">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400 block mb-1 font-sans">Predictions Generated</span>
                <span className="text-[24px] sm:text-[26px] font-bold text-slate-900 dark:text-white font-display tabular-nums">1,423</span>
              </div>
              <div className="bg-[#F8FAFC] dark:bg-slate-900/60 p-4 rounded-[18px] border border-slate-200/50 dark:border-slate-800/50">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400 block mb-1 font-sans">Average Response Time</span>
                <span className="text-[24px] sm:text-[26px] font-bold text-slate-900 dark:text-white font-display tabular-nums">1.8 Seconds</span>
              </div>
            </AnimatedCard>

          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
}
