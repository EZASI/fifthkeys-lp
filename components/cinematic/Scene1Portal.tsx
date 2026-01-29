"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BootSequence, { GlitchText } from "./effects/BootSequence";
import { Hologram3D } from "./effects/HoloCard";
import { ScrambleCounter } from "./effects/ScrambleText";
import MagneticButton from "./effects/MagneticButton";
import { ArrowRight, Play } from "lucide-react";

export default function Scene1Portal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bootComplete, setBootComplete] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Dashboard transforms
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.6, 1, 1.15]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3], [12, 0]);
  const brightness = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);
  
  // Text transforms
  const headlineOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0.25, 0.4], [60, 0]);
  
  // Keyhole vignette
  const vignetteOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Keyhole Vignette Mask */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-30"
          style={{ 
            opacity: vignetteOpacity,
            background: `radial-gradient(circle at center, transparent 0%, transparent 20%, rgba(2, 6, 23, 0.95) 35%, #020617 50%)`,
          }}
        />

        {/* Dashboard with Boot Sequence */}
        <BootSequence duration={2500} onComplete={() => setBootComplete(true)}>
          <Hologram3D className="w-[1000px] max-w-[95vw]">
            <motion.div
              style={{ 
                scale,
                rotateX,
                filter: useTransform(brightness, (b) => `brightness(${b})`),
              }}
            >
              {/* Dashboard Frame - Holographic Glass */}
              <div 
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(10, 14, 30, 0.7)",
                  backdropFilter: "blur(20px)",
                  boxShadow: `
                    inset 0 0 40px rgba(0, 217, 255, 0.1),
                    0 0 80px rgba(0, 217, 255, 0.15),
                    0 25px 50px rgba(0, 0, 0, 0.5)
                  `,
                }}
              >
                {/* Gradient Border */}
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    padding: "1px",
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.02))",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                  }}
                />

                {/* Corner Brackets */}
                <svg className="absolute top-3 left-3 w-5 h-5 text-primary/60" viewBox="0 0 20 20">
                  <path d="M0 8V0h8" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <svg className="absolute top-3 right-3 w-5 h-5 text-primary/60" viewBox="0 0 20 20">
                  <path d="M20 8V0h-8" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <svg className="absolute bottom-3 left-3 w-5 h-5 text-primary/60" viewBox="0 0 20 20">
                  <path d="M0 12v8h8" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <svg className="absolute bottom-3 right-3 w-5 h-5 text-primary/60" viewBox="0 0 20 20">
                  <path d="M20 12v8h-8" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>

                {/* Top edge shine */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                    FIFTHKEYS.OS v2.0 // OPERATIONAL
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-8">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <div className="text-xs font-mono text-primary/60 uppercase tracking-wider mb-2">
                        ▸ TOTAL.REVENUE // MONTHLY
                      </div>
                      <ScrambleCounter 
                        value={4280000}
                        prefix="¥"
                        className="text-4xl font-bold text-white tracking-tight"
                        duration={2500}
                      />
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono text-primary/60 uppercase tracking-wider mb-2">
                        ▸ DIRECT.BOOKING.RATIO
                      </div>
                      <ScrambleCounter 
                        value={58}
                        suffix="%"
                        className="text-2xl font-bold text-primary"
                        duration={2000}
                      />
                    </div>
                  </div>

                  {/* Chart Bars with glow */}
                  <div className="h-44 flex items-end justify-between gap-2 mb-8">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <motion.div 
                        key={i} 
                        className="flex-1 rounded-t relative overflow-hidden"
                        initial={{ height: 0 }}
                        animate={{ height: bootComplete ? `${h}%` : 0 }}
                        transition={{ delay: 2.5 + i * 0.05, duration: 0.8, ease: "easeOut" }}
                        style={{
                          background: "linear-gradient(to top, rgba(0, 217, 255, 0.2), rgba(0, 217, 255, 0.8))",
                          boxShadow: "0 0 20px rgba(0, 217, 255, 0.3)",
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Stats Row */}
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { label: "OCCUPANCY", value: 87, suffix: "%" },
                      { label: "ADR", value: 18500, prefix: "¥" },
                      { label: "REVPAR", value: 16095, prefix: "¥" },
                      { label: "AI.ACTIONS", value: 1247 },
                    ].map((stat, i) => (
                      <div 
                        key={i} 
                        className="relative rounded-xl p-4"
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.05)",
                        }}
                      >
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-1">
                          {stat.label}
                        </div>
                        <ScrambleCounter 
                          value={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                          className="text-lg font-bold text-white"
                          duration={1800 + i * 200}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </Hologram3D>
        </BootSequence>

        {/* Headline that fades in */}
        <motion.div 
          className="absolute bottom-32 left-0 right-0 text-center z-20 px-6"
          style={{ opacity: headlineOpacity, y: headlineY }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-white mb-6">
            <GlitchText>The OS for Hotels.</GlitchText>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 font-mono mb-10 max-w-2xl mx-auto">
            ホテルを動かすオペレーティングシステム
          </p>
          
          {/* CTA Buttons with Magnetic Effect */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton 
              className="px-8 py-4 bg-gradient-to-b from-primary to-[#00B8D9] text-[#020617] font-mono font-bold uppercase tracking-wider rounded-xl shadow-[0_0_30px_rgba(0,217,255,0.4)] flex items-center gap-2"
            >
              Start Free <ArrowRight className="w-5 h-5" />
            </MagneticButton>
            <MagneticButton 
              className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-mono uppercase tracking-wider rounded-xl flex items-center gap-2"
            >
              <Play className="w-4 h-4" /> Watch Demo
            </MagneticButton>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        >
          <span className="text-xs font-mono uppercase tracking-wider">Scroll to Enter</span>
          <motion.div 
            className="w-6 h-10 border border-white/30 rounded-full flex items-start justify-center p-1"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div 
              className="w-1.5 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(0,217,255,0.8)]"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
