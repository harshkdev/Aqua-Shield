"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Droplets, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'Technology', href: '#technology' },
  { name: 'Dashboard', href: '#dashboard' },
  { name: 'Contact', href: '#contact' },
];

export default function AquaNavbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const observers = navLinks.map(link => {
      const element = document.getElementById(link.href.substring(1));
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(link.href.substring(1));
            }
          });
        },
        { rootMargin: '-40% 0px -40% 0px' }
      );

      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach(obs => {
        if (obs?.observer && obs?.element) {
          obs.observer.unobserve(obs.element);
        }
      });
    };
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'shadow-[0_4px_30px_rgba(0,194,209,0.08)]'
          : ''
      }`}
      style={{
        background: isScrolled
          ? theme === 'dark' ? 'rgba(7, 22, 43, 0.85)' : 'rgba(244, 249, 253, 0.88)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: isScrolled
          ? theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(11, 79, 140, 0.12)'
          : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center" style={{ height: '78px' }}>
          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center gap-2.5 cursor-pointer group"
            onClick={() => {
              const home = document.getElementById('home');
              if (home) home.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0B4F8C] to-[#00C2D1] flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              AquaShield<span className="text-[#00C2D1] ml-0.5">AI</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`relative px-4 py-2 text-[13px] font-medium rounded-lg transition-all duration-300 ${
                  activeSection === link.href.substring(1)
                    ? 'text-[#00C2D1]'
                    : 'text-slate-700 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
                }`}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#00C2D1] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => toggleTheme()}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/8 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-[18px] h-[18px] text-amber-400" /> : <Moon className="w-[18px] h-[18px] text-slate-700" />}
              </button>
            )}
            <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0B4F8C] to-[#00A8B5] text-white text-[13px] font-inter font-semibold transition-all duration-200 shadow-sm hover:shadow-[0_4px_20px_rgba(0,194,209,0.3)] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => toggleTheme()}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 dark:text-white/60"
              >
                {theme === 'dark' ? <Sun className="w-[18px] h-[18px] text-amber-400" /> : <Moon className="w-[18px] h-[18px] text-slate-700" />}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/8 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm z-50 md:hidden p-6 flex flex-col"
              style={{
                background: theme === 'dark' ? 'rgba(7, 22, 43, 0.95)' : 'rgba(244, 249, 253, 0.98)',
                backdropFilter: 'blur(24px)',
                borderLeft: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(11, 79, 140, 0.12)',
              }}
            >
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-[#00C2D1]" />
                  <span className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    AquaShield
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/8"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-1 flex-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      activeSection === link.href.substring(1)
                        ? 'text-[#00C2D1] bg-[#00C2D1]/8'
                        : 'text-slate-700 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/8">
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0B4F8C] to-[#00A8B5] text-white text-sm font-semibold shadow-lg shadow-cyan-500/20">
                  Get Started
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
