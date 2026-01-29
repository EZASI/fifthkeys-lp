"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";

export default function CinematicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Header becomes more visible as you scroll
  const headerBg = useTransform(
    scrollY,
    [0, 300],
    ["rgba(2, 6, 23, 0)", "rgba(2, 6, 23, 0.9)"]
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 300],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]
  );

  const navLinks = [
    { href: "#features", label: "機能" },
    { href: "#economics", label: "料金" },
    { href: "#cases", label: "事例" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{ 
          backgroundColor: headerBg,
          borderBottom: useTransform(headerBorder, (v) => `1px solid ${v}`),
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo with HUD styling */}
            <motion.a 
              href="#" 
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                {/* HUD corners */}
                <div className="absolute -top-0.5 -left-0.5 w-2 h-2 border-l border-t border-primary/50" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 border-r border-t border-primary/50" />
                <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 border-l border-b border-primary/50" />
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 border-r border-b border-primary/50" />
                
                <div className="w-9 h-9 bg-[#0A0E1A] border border-primary/30 rounded-lg flex items-center justify-center text-primary font-bold shadow-[0_0_20px_rgba(0,217,255,0.2)]">
                  F
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white tracking-tight">
                  FIFTHKEYS
                </span>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                  Hotel OS v2.0
                </span>
              </div>
            </motion.a>

            {/* Desktop Nav with HUD styling */}
            <nav className="hidden md:flex items-center">
              <div className="flex items-center gap-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-2 py-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-white/60 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <motion.button 
                className="text-sm font-mono text-white/60 hover:text-white transition-colors uppercase tracking-wider"
                whileHover={{ scale: 1.02 }}
              >
                Login
              </motion.button>
              <Button variant="primary" size="sm" className="font-mono uppercase tracking-wider">
                Start Free
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-white/60 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-[#020617] pt-24 px-6 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-lg font-mono text-white/80 py-3 border-b border-white/10 uppercase tracking-wider"
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-6 space-y-4">
                <Button variant="primary" size="lg" className="w-full font-mono uppercase tracking-wider">
                  Start Free
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
