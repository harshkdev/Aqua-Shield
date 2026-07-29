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
        className="group relative h-full rounded-2xl p-8 bg-[#0F2035]/70 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(0,194,209,0.2)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#00C2D1]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_200%]" />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0B4F8C] to-[#00C2D1] flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-md">
            <feature.icon className="w-7 h-7 text-white" />
          </div>
          
          <h3 className="font-display font-bold text-xl text-white mb-3">
            {feature.title}
          </h3>
          
          <p className="text-slate-300 text-sm leading-relaxed flex-1">
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
    <section id="features" className="py-28 bg-[#07162B] relative overflow-hidden">
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#00C2D1]/10 rounded-full blur-[130px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-cyan-400/25 text-[#00C2D1] text-xs font-semibold uppercase tracking-wider mb-5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C2D1] animate-pulse" />
            Core Features
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Intelligent Features for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2D1] via-[#33E8F5] to-emerald-400">Smarter Water Management</span>
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
