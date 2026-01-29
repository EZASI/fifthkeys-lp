"use client";

import { motion } from "framer-motion";
import DecryptText from "../effects/DecryptText";
import WireframeConstruct from "../effects/WireframeConstruct";
import { ScrambleCounter } from "@/components/cinematic/effects/ScrambleText";
import { ArrowRight, Sparkles } from "lucide-react";

export default function KineticCTA() {
  return (
    <section className="relative py-32">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
        {/* Icon */}
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 mb-10"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <WireframeConstruct className="w-full h-full rounded-2xl" glowColor="rgba(0, 217, 255, 0.6)">
            <div className="w-full h-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          </WireframeConstruct>
        </motion.div>

        {/* Headline */}
        <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-6">
          <DecryptText delay={200} duration={1200}>
            READY TO UPGRADE?
          </DecryptText>
        </h2>
        
        <p className="text-xl text-white/50 font-mono mb-12 max-w-2xl mx-auto">
          <DecryptText delay={600}>
            Join 500+ hotels already running on the future.
            Zero risk. Zero setup fees.
          </DecryptText>
        </p>

        {/* Stats Row */}
        <div className="flex justify-center gap-12 mb-12">
          {[
            { value: 58, suffix: "%", label: "DIRECT_BOOKINGS", prefix: "+" },
            { value: 85, suffix: "%", label: "OTA_COMMISSION", prefix: "-" },
            { value: 3, suffix: "x", label: "ROI" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <ScrambleCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="text-4xl font-bold text-primary font-mono"
                duration={2000}
              />
              <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          className="group relative px-12 py-5 bg-primary text-[#020617] font-mono font-bold uppercase tracking-wider rounded-xl overflow-hidden text-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-cursor="pointer"
        >
          {/* Inner shine */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
          {/* Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-primary/50 to-transparent blur-xl" />
          <span className="relative flex items-center gap-3">
            INITIALIZE_TRIAL
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </span>
        </motion.button>
        
        <p className="mt-6 text-sm font-mono text-white/30">
          NO_CREDIT_CARD // 30_DAY_ACCESS // FULL_FEATURES
        </p>

        {/* Trust Badges */}
        <div className="flex justify-center gap-8 mt-16 text-[10px] font-mono text-white/20 uppercase tracking-widest">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500/50 rounded-full" />
            SOC2_COMPLIANT
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500/50 rounded-full" />
            GDPR_READY
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500/50 rounded-full" />
            99.9%_UPTIME
          </span>
        </div>
      </div>
    </section>
  );
}
