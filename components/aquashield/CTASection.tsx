"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const staticBubbles = [
  { id: 1, size: 24, left: '12%', duration: 18, delay: 0, deltaX: 15 },
  { id: 2, size: 14, left: '28%', duration: 22, delay: 3, deltaX: -20 },
  { id: 3, size: 30, left: '44%', duration: 16, delay: 1, deltaX: 25 },
  { id: 4, size: 18, left: '58%', duration: 24, delay: 4, deltaX: -15 },
  { id: 5, size: 22, left: '72%', duration: 19, delay: 2, deltaX: 18 },
  { id: 6, size: 16, left: '85%', duration: 21, delay: 5, deltaX: -22 },
  { id: 7, size: 28, left: '35%', duration: 17, delay: 2.5, deltaX: 12 },
  { id: 8, size: 12, left: '92%', duration: 25, delay: 1.5, deltaX: -18 },
];

export default function CTASection() {
  return (
    <section id="cta" className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-br from-[#07162B] via-[#063561] to-[#0B4F8C]">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00C2D1]/15 rounded-full blur-[150px] pointer-events-none" />

      {/* Floating Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {staticBubbles.map((b) => (
          <motion.div
            key={b.id}
            className="absolute rounded-full bg-cyan-400/20 backdrop-blur-sm"
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: b.left,
              bottom: "-50px",
            }}
            animate={{
              y: [0, -900],
              x: [0, b.deltaX, -b.deltaX, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: b.duration,
              repeat: Infinity,
              delay: b.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <motion.div 
          className="text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-cyan-400/30 text-[#00C2D1] text-xs font-semibold uppercase tracking-wider mb-6 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C2D1] animate-pulse" />
            Get Started Today
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display text-white mb-6 leading-tight tracking-tight">
            Smarter Water Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2D1] via-[#33E8F5] to-emerald-400">Starts Here.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-medium">
            Join communities and enterprise partners worldwide who trust AquaShield AI for safer water decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <button className="h-13 px-8 rounded-xl bg-gradient-to-r from-[#0B4F8C] via-[#009FAB] to-[#00C2D1] text-white font-semibold text-base flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_0_30px_rgba(0,194,209,0.35)] hover:shadow-[0_0_45px_rgba(0,194,209,0.55)] hover:-translate-y-0.5 active:translate-y-0">
              <span>Explore Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button className="h-13 px-8 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 hover:border-white/40 text-white font-semibold text-base flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:translate-y-0">
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
