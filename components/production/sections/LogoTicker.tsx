"use client";

import { motion } from "framer-motion";

const LOGOS = ["Marriott", "Hyatt", "CitizenM", "Ace Hotel", "Hilton", "Four Seasons"];

export default function LogoTicker() {
  return (
    <div className="py-12 border-y border-brand-white/5 bg-[#020C1B]">
      <div className="max-w-7xl mx-auto px-6 overflow-hidden">
        <p className="text-center text-sm font-mono text-brand-slate/50 mb-8 uppercase tracking-widest">
          Trusted by modern hoteliers
        </p>
        <div className="flex relative">
          <motion.div
            className="flex gap-16 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <span
                key={i}
                className="text-2xl font-heading font-bold text-brand-slate/30"
              >
                {logo}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
