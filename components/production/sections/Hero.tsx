"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#0A192F]" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold/5 blur-[120px] rounded-full translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-heading font-bold text-5xl md:text-7xl text-brand-white leading-tight mb-6">
            Take Back <br />
            <span className="text-brand-gold">Your Bookings.</span>
          </h1>
          <p className="text-xl text-brand-slate mb-10 leading-relaxed max-w-lg">
            The AI-powered operating system for modern hotels. Maximize direct bookings. Minimize OTA fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/demo"
              className="px-8 py-4 bg-brand-gold text-[#0A192F] font-bold rounded-lg hover:bg-brand-goldLight transition-colors flex items-center justify-center gap-2"
            >
              Start Your OS Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 border border-brand-slate/30 text-brand-white font-medium rounded-lg hover:bg-brand-white/5 transition-colors flex items-center justify-center"
            >
              Calculate Savings
            </Link>
          </div>
        </motion.div>

        {/* Visual Element (3D Dashboard Mockup Placeholder) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-[4/3] rounded-2xl bg-[#112240] border border-brand-gold/20 shadow-2xl p-6 overflow-hidden group">
            {/* Dashboard UI Simulation */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-[#0A192F] border-b border-brand-white/5 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-500/20" />
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-4">
              <div className="col-span-2 h-32 rounded-lg bg-gradient-to-br from-brand-gold/10 to-transparent border border-brand-gold/10 p-4">
                <div className="text-xs text-brand-gold uppercase tracking-wider mb-1">Direct Revenue</div>
                <div className="text-3xl font-mono text-brand-white">$124,592</div>
                <div className="text-xs text-green-400 mt-2 flex items-center gap-1">▲ 18% vs last month</div>
              </div>
              <div className="h-32 rounded-lg bg-[#0A192F]/50 border border-brand-white/5 p-4">
                <div className="text-xs text-brand-slate uppercase tracking-wider mb-1">Occupancy</div>
                <div className="text-2xl font-mono text-brand-white">88%</div>
              </div>
              <div className="h-32 rounded-lg bg-[#0A192F]/50 border border-brand-white/5 p-4">
                <div className="text-xs text-brand-slate uppercase tracking-wider mb-1">OTA Savings</div>
                <div className="text-2xl font-mono text-brand-white">$4,200</div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div 
              className="absolute -bottom-6 -right-6 bg-brand-gold text-[#0A192F] px-6 py-3 rounded-lg font-bold shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Recovered Revenue
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
