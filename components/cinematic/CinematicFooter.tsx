"use client";

import { Github, Twitter, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function CinematicFooter() {
  const links = {
    product: ["Features", "Pricing", "Integrations", "Changelog"],
    company: ["About", "Careers", "Press", "Partners"],
    resources: ["Documentation", "API Reference", "Status", "Support"],
    legal: ["Privacy", "Terms", "Security", "Compliance"],
  };

  return (
    <footer className="relative border-t border-white/10">

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute -top-0.5 -left-0.5 w-2 h-2 border-l border-t border-primary/50" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 border-r border-t border-primary/50" />
                <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 border-l border-b border-primary/50" />
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 border-r border-b border-primary/50" />
                <div className="w-10 h-10 bg-[#0A0E1A] border border-primary/30 rounded-lg flex items-center justify-center text-primary font-bold text-xl">
                  F
                </div>
              </div>
              <div>
                <div className="font-bold text-white tracking-tight">FIFTHKEYS</div>
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Hotel OS</div>
              </div>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-xs font-mono">
              The AI-powered operating system for modern hotels. Maximize direct bookings. Minimize OTA fees.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:border-primary/30 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      className="text-sm text-white/50 hover:text-white transition-colors font-mono"
                      whileHover={{ x: 4 }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
          <p className="text-xs font-mono text-white/30">
            © 2026 FifthKeys Inc. All rights reserved.
          </p>
          
          {/* System Status */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs font-mono text-white/50">
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
