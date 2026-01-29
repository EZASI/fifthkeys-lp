"use client";

import { motion } from "framer-motion";
import HolographicGlobe from "./HolographicGlobe";
import LightPathBorder from "../effects/LightPathBorder";
import { ArrowRight, Play } from "lucide-react";

export default function GrowthHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Content */}
        <div className="relative z-10">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-biolume-cyan/10 border border-biolume-cyan/20 mb-8"
          >
            <span className="w-2 h-2 bg-biolume-cyan rounded-full animate-pulse" />
            <span className="text-[11px] font-mono text-biolume-cyan uppercase tracking-widest">
              GROWTH_INFRASTRUCTURE // ACTIVE
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-white mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
              Zero Cost.
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-biolume-cyan to-biolume-teal">
              Pure Growth.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-white/50 mb-8 max-w-lg font-light"
          >
            Traditional software drains your revenue. FifthKeys is performance infrastructure—we only earn when you earn.
          </motion.p>

          {/* Value Props */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-6 mb-10"
          >
            {[
              { label: "FIXED_COST", value: "¥0" },
              { label: "SETUP_FEE", value: "¥0" },
              { label: "HIDDEN_FEES", value: "¥0" },
            ].map((prop, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold font-mono text-biolume-emerald">
                  {prop.value}
                </div>
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                  {prop.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-b from-biolume-cyan to-biolume-teal text-obsidian-core font-semibold rounded-xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
              <span className="relative flex items-center gap-2">
                Start Growing <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
            
            <motion.button
              className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-medium rounded-xl flex items-center justify-center gap-2"
              whileHover={{ borderColor: "rgba(0, 217, 255, 0.3)" }}
            >
              <Play className="w-4 h-4" /> See It Work
            </motion.button>
          </motion.div>
        </div>

        {/* Right: Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative"
        >
          <LightPathBorder className="p-8 rounded-3xl">
            <HolographicGlobe />
          </LightPathBorder>
          
          {/* Floating Label */}
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-obsidian-surface/90 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
              JAPAN_NETWORK // LIVE
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
          SCROLL_TO_EXPLORE
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-biolume-cyan to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
