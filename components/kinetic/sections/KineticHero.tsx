"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import DecryptText from "../effects/DecryptText";
import WireframeConstruct from "../effects/WireframeConstruct";
import DriftContainer, { Orbital } from "../effects/DriftContainer";
import { ScrambleCounter } from "@/components/cinematic/effects/ScrambleText";
import { InlineNeuralStream } from "../effects/NeuralStream";
import { Globe, Cpu, Wifi, Database, Zap, Shield, ArrowRight, Play } from "lucide-react";

const SATELLITE_ICONS = [
  { Icon: Globe, label: "PMS", color: "text-blue-400" },
  { Icon: Cpu, label: "AI", color: "text-primary" },
  { Icon: Wifi, label: "IoT", color: "text-green-400" },
  { Icon: Database, label: "CRM", color: "text-purple-400" },
  { Icon: Zap, label: "REV", color: "text-amber-400" },
  { Icon: Shield, label: "SEC", color: "text-red-400" },
];

export default function KineticHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const coreScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const coreOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* System Status Bar */}
        <div className="absolute top-24 left-8 right-8 flex justify-between items-center text-[10px] font-mono text-white/30 uppercase tracking-widest">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              SYS_OPERATIONAL
            </span>
            <span className="text-white/20">|</span>
            <span>FIFTHKEYS.OS // V4.2.0</span>
          </div>
          <InlineNeuralStream />
        </div>

        {/* Holographic Core */}
        <motion.div 
          className="relative"
          style={{ scale: coreScale, opacity: coreOpacity }}
        >
          {/* Orbital Satellites */}
          {SATELLITE_ICONS.map((sat, i) => (
            <Orbital 
              key={i}
              radius={180 + (i % 2) * 60}
              duration={15 + i * 3}
              startAngle={i * 60}
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-slate-950/80 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center gap-1"
                whileHover={{ scale: 1.2, borderColor: "rgba(0, 217, 255, 0.5)" }}
              >
                <sat.Icon className={`w-5 h-5 ${sat.color}`} />
                <span className="text-[8px] font-mono text-white/50">{sat.label}</span>
              </motion.div>
            </Orbital>
          ))}

          {/* Connection Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ width: 500, height: 500, left: -250, top: -250 }}>
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const r = 180 + (i % 2) * 60;
              const x2 = 250 + Math.sin(rad) * r;
              const y2 = 250 - Math.cos(rad) * r;
              
              return (
                <motion.line
                  key={i}
                  x1="250"
                  y1="250"
                  x2={x2}
                  y2={y2}
                  stroke="rgba(0, 217, 255, 0.2)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                />
              );
            })}
          </svg>

          {/* Central Core */}
          <DriftContainer amplitude={8} duration={8}>
            <WireframeConstruct className="w-64 h-64" delay={0.5} glowColor="rgba(0, 217, 255, 0.6)">
              <div className="w-full h-full flex flex-col items-center justify-center p-8">
                {/* Animated Logo */}
                <motion.div
                  className="text-6xl font-bold text-primary mb-4"
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(0, 217, 255, 0.5)",
                      "0 0 40px rgba(0, 217, 255, 0.8)",
                      "0 0 20px rgba(0, 217, 255, 0.5)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  F
                </motion.div>
                
                {/* Core Stats */}
                <div className="text-center">
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">
                    ACTIVE_HOTELS
                  </div>
                  <ScrambleCounter 
                    value={547}
                    className="text-2xl font-bold text-white"
                    duration={2000}
                  />
                </div>
                
                {/* Status Indicator */}
                <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-green-400">
                  <motion.span
                    className="w-2 h-2 bg-green-500 rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  CORE_ONLINE
                </div>
              </div>
            </WireframeConstruct>
          </DriftContainer>
        </motion.div>

        {/* Main Headline */}
        <div className="absolute bottom-32 left-0 right-0 text-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-white mb-6">
              <DecryptText delay={1800} duration={1000}>
                THE OS FOR HOTELS
              </DecryptText>
            </h1>
            
            <p className="text-lg md:text-xl text-white/50 font-mono max-w-2xl mx-auto mb-10">
              <DecryptText delay={2500} duration={800}>
                ホテルを動かすオペレーティングシステム // MAXIMIZE_DIRECT // MINIMIZE_OTA
              </DecryptText>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                className="group relative px-8 py-4 bg-primary text-[#020617] font-mono font-bold uppercase tracking-wider rounded-xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-cursor="pointer"
              >
                {/* Inner shine */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                <span className="relative flex items-center gap-2">
                  INITIALIZE <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              
              <motion.button
                className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-mono uppercase tracking-wider rounded-xl flex items-center gap-2"
                whileHover={{ scale: 1.02, borderColor: "rgba(0, 217, 255, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                data-cursor="pointer"
              >
                <Play className="w-4 h-4" /> VIEW_DEMO
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
            SCROLL_TO_ENGAGE
          </span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
            animate={{ scaleY: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
