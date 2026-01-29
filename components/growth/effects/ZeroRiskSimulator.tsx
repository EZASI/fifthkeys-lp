"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { GlassPanel } from "./LightPathBorder";

/**
 * ZeroRiskSimulator
 * 
 * A 'Balance Scale' UI visualizing the shift from fixed costs to performance model.
 * 
 * Physics:
 * - Left Side: "Monthly Fees" (Heavy stone blocks) - Sink down, then shatter
 * - Right Side: "Performance Model" (Glowing energy) - Rise up, pulsate
 * - As user scrolls, heavy blocks crack, fragment, and evaporate
 * - Scale tips from left-heavy to balanced
 */

const FIXED_COSTS = [
  { label: "PMS License", amount: "¥45,000/月" },
  { label: "Channel Mgr", amount: "¥25,000/月" },
  { label: "Booking Engine", amount: "¥15,000/月" },
  { label: "Support Fees", amount: "¥10,000/月" },
];

export default function ZeroRiskSimulator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"heavy" | "cracking" | "balanced">("heavy");
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scale tilt: -15deg (left heavy) -> 0deg (balanced)
  const scaleTilt = useTransform(scrollYProgress, [0.2, 0.6], [-12, 0]);
  const leftOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const rightGlow = useTransform(scrollYProgress, [0.4, 0.7], [0.2, 1]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v < 0.3) setPhase("heavy");
      else if (v < 0.5) setPhase("cracking");
      else setPhase("balanced");
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[600px] flex flex-col items-center justify-center py-20"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">
          COST_ANALYSIS // SIMULATION_MODE
        </div>
        <h3 className="text-3xl font-semibold tracking-tight text-white">
          The Weight of Fixed Costs
        </h3>
      </div>

      {/* Scale Visualization */}
      <div className="relative w-full max-w-4xl px-8">
        {/* Fulcrum */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-8 h-24 bg-gradient-to-t from-white/10 to-transparent" />
        <div className="absolute left-1/2 bottom-24 -translate-x-1/2 w-4 h-4 rotate-45 bg-white/20" />

        {/* Scale Bar */}
        <motion.div 
          className="relative h-2 bg-gradient-to-r from-biolume-rose/50 via-white/10 to-biolume-emerald/50 rounded-full"
          style={{ 
            rotate: scaleTilt,
            transformOrigin: "center bottom",
          }}
        >
          {/* Left Pan (Fixed Costs) */}
          <motion.div 
            className="absolute -left-4 -top-40 w-64"
            style={{ opacity: leftOpacity }}
          >
            <div className="text-[10px] font-mono text-biolume-rose uppercase tracking-widest mb-4 text-center">
              LEGACY_MODEL // FIXED_COST
            </div>
            
            <div className="space-y-2">
              <AnimatePresence>
                {phase !== "balanced" && FIXED_COSTS.map((cost, i) => (
                  <motion.div
                    key={cost.label}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={phase === "cracking" ? {
                      opacity: [1, 0.5, 0],
                      scale: [1, 1.1, 0],
                      rotate: [0, Math.random() * 10 - 5, Math.random() * 30 - 15],
                      x: Math.random() * 100 - 50,
                      y: Math.random() * 50 + 50,
                    } : {}}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ 
                      delay: i * 0.1,
                      duration: 0.5,
                    }}
                    className="bg-obsidian-mist/80 backdrop-blur border border-biolume-rose/30 rounded-lg p-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/60">{cost.label}</span>
                      <span className="text-sm font-mono text-biolume-rose">{cost.amount}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {phase === "heavy" && (
              <div className="mt-4 text-center">
                <div className="text-2xl font-bold font-mono text-biolume-rose">¥95,000</div>
                <div className="text-[10px] font-mono text-white/30">MONTHLY_BURN</div>
              </div>
            )}
          </motion.div>

          {/* Right Pan (Performance Model) */}
          <motion.div 
            className="absolute -right-4 -top-40 w-64"
            style={{ opacity: rightGlow }}
          >
            <div className="text-[10px] font-mono text-biolume-emerald uppercase tracking-widest mb-4 text-center">
              FIFTHKEYS // PERFORMANCE
            </div>
            
            <GlassPanel className="p-6 rounded-xl">
              <div className="text-center">
                <motion.div
                  className="text-4xl font-bold font-mono text-biolume-cyan mb-2"
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(0, 217, 255, 0.3)",
                      "0 0 40px rgba(0, 217, 255, 0.6)",
                      "0 0 20px rgba(0, 217, 255, 0.3)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ¥0
                </motion.div>
                <div className="text-[10px] font-mono text-white/30 mb-4">FIXED_COST</div>
                
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4" />
                
                <div className="text-sm text-white/60 mb-2">You earn → We earn</div>
                <div className="text-[10px] font-mono text-biolume-amber">
                  REVENUE_SHARE: 3% // DIRECT_ONLY
                </div>
              </div>
            </GlassPanel>
            
            {phase === "balanced" && (
              <motion.div 
                className="mt-4 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-lg font-semibold text-biolume-emerald">
                  Aligned Incentives
                </div>
                <div className="text-[10px] font-mono text-white/30">
                  WE_GROW_TOGETHER
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Status Message */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        animate={{
          opacity: phase === "balanced" ? 1 : 0.5,
        }}
      >
        <div className="text-xs font-mono text-white/40">
          STATUS: {phase === "heavy" ? "ANALYZING_OVERHEAD" : phase === "cracking" ? "ELIMINATING_WASTE" : "EQUILIBRIUM_ACHIEVED"}
        </div>
      </motion.div>
    </div>
  );
}
