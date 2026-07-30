"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Globe, Link2, Share2, Mail } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Features', href: '#features' },
    { name: 'Workflow', href: '#how-it-works' },
    { name: 'Predictions', href: '#insights' },
    { name: 'Technology', href: '#technology' },
  ],
  company: [
    { name: 'About Us', href: '#home' },
    { name: 'Careers', href: '#' },
    { name: 'Press & Media', href: '#' },
    { name: 'Security', href: '#' },
    { name: 'Contact', href: '#contact' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'System Status', href: '#' },
    { name: 'Privacy Policy', href: '#' },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  },
};

export default function AquaFooter() {
  return (
    <footer className="relative pt-20 bg-[#F2FAFD] dark:bg-[#07162B] text-slate-900 dark:text-white border-t border-slate-200 dark:border-white/10 overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-slate-200 dark:border-white/10"
        >
          {/* Brand Column (Col 1-2) */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B4F8C] to-[#00C2D1] flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <span className="font-display text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                AquaShield<span className="text-[#00C2D1] ml-0.5">AI</span>
              </span>
            </div>
            
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-sm font-sans">
              Continuous AI-powered water quality intelligence and disease prediction platform for safer municipal water supplies.
            </p>

            <div className="flex items-center gap-3">
              {[Globe, Link2, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-slate-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-white/60 hover:text-[#00C2D1] dark:hover:text-[#00C2D1] hover:border-[#00C2D1]/40 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns (Col 3, 4, 5) */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="font-display font-bold text-sm tracking-wide uppercase text-slate-900 dark:text-white">Product</h4>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="font-display font-bold text-sm tracking-wide uppercase text-slate-900 dark:text-white">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="font-display font-bold text-sm tracking-wide uppercase text-slate-900 dark:text-white">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} AquaShield AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
