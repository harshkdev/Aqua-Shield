"use client";

import React, { useRef, useState, MouseEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, Brain, Map, Bell, BarChart3, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Activity,
    title: "Real-time Water Monitoring",
    description: "Monitor water quality parameters in real-time with IoT sensors deployed across water sources."
  },
  {
    icon: Brain,
    title: "AI Risk Prediction",
    description: "Advanced machine learning models predict contamination risks up to 72 hours in advance."
  },
  {
    icon: Map,
    title: "Interactive GIS Maps",
    description: "Visualize water quality data on interactive geographic maps with custom overlays."
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Automated alerts when water quality parameters exceed safe thresholds."
  },
  {
    icon: BarChart3,
    title: "Environmental Analytics",
    description: "Comprehensive analytics dashboard with historical trends and environmental correlations."
  },
  {
    icon: TrendingUp,
    title: "Historical Trends",
    description: "Track water quality patterns over time to identify seasonal variations and long-term trends."
  }
];

const FeatureCard = ({ feature, index }: { feature: any, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -5;
    const rotateYValue = ((x - centerX) / centerX) * 5;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const isEven = index % 2 === 0;

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: isEven ? -40 : 40 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" as const 
      }
    }
  };

  return (
    <motion.div variants={itemVariants}>
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.1s ease-out, box-shadow 0.3s ease'
        }}
        className="group relative h-full rounded-3xl p-8 bg-white/90 dark:bg-[#0F2035]/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-400/40 shadow-sm hover:shadow-xl flex flex-col justify-between"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#00C2D1]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_200%]" />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#0B4F8C] to-[#00C2D1] flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300 shadow-md">
            <feature.icon className="w-6 h-6 text-white" />
          </div>
          
          <h3 className="font-outfit font-semibold text-xl text-[#05223D] dark:text-white mb-3">
            {feature.title}
          </h3>
          
          <p className="text-slate-600 dark:text-slate-300 font-inter text-sm leading-relaxed flex-1">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-28 bg-[#F4F9FD] dark:bg-[#07162B] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#00C2D1]/10 rounded-full blur-[130px] pointer-events-none" />
      
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
            <span>Core Features</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-outfit font-light text-[#05223D] dark:text-white mb-6 tracking-tight leading-[1.18]">
            Intelligent Features for <span className="text-[#009FAB] dark:text-[#00C2D1] font-light">Smarter Water Management</span>
          </h2>
        </motion.div>

        <motion.div 
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
